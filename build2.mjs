// 반도체 백과 빌더 — content/entries/<영역>/<주제>/<슬러그>.md → v2/
// 설계: DESIGN.md (영역 4 > 주제(허브형·목록형) > 항목, 3단 통일). 기존 build.mjs(강의노트)는 전환까지 병행 유지.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { marked } from 'marked';
import katex from 'katex';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const r = p => path.join(ROOT, p);
const OUT = r('v2');
for (const d of ['e', 'd', 't', 'tag']) fs.mkdirSync(path.join(OUT, d), { recursive: true });

// ── 분류 체계 (DESIGN.md와 일치시킬 것) ──────────────────────────
export const DOMAINS = [
  { id: 'process', name: '공정', desc: '만드는 방법 — 웨이퍼 위에 구조를 쌓고, 새기고, 깎는 모든 공정.', topics: [
    { id: 'flow', name: '집적 흐름' }, { id: 'patterning', name: '패터닝' }, { id: 'etch', name: '식각' },
    { id: 'film-planarization', name: '막 형성·평탄화' }, { id: 'doping-thermal-cleaning', name: '도핑·열처리·세정' } ] },
  { id: 'structure-materials', name: '구조·재료', desc: '무엇을 만드나 — 소자의 구조와, 그 구조를 이루는 물질 그 자체.', topics: [
    { id: 'transistor', name: '트랜지스터' }, { id: 'spacer', name: '스페이서' }, { id: 'memory', name: '메모리' },
    { id: 'packaging', name: '패키징' }, { id: 'dielectrics', name: '절연막' }, { id: 'substrate-semiconductor-metal', name: '기판·반도체·금속' } ] },
  { id: 'metrology', name: '계측·분석', desc: '재는 방법 — 형상·두께·조성·결함·전기와 플라즈마를 재는 계측·분석 기법. 주제는 측정 대상별로 묶고, 원리 묶음(전자빔·X선·광학·탐침)은 태그로 단다.', topics: [
    { id: 'shape-dimension', name: '형상·치수' }, { id: 'film-thickness', name: '박막 두께' }, { id: 'composition', name: '조성·화학' },
    { id: 'defect-contamination', name: '결함·오염' }, { id: 'electrical', name: '전기 측정' }, { id: 'plasma-diagnostics', name: '플라즈마 진단' } ] },
  { id: 'principles-ops', name: '원리·운영', desc: '왜 일어나는가(원리)와 어떻게 굴리는가(운영).', topics: [
    { id: 'plasma', name: '플라즈마' }, { id: 'surface-selectivity', name: '표면 반응·선택비' }, { id: 'yield-quality', name: '수율·품질' } ] },
];
const domainOf = id => DOMAINS.find(d => d.id === id);
const domainName = id => (domainOf(id) || {}).name || id;
const topicOf = (d, t) => (domainOf(d) || { topics: [] }).topics.find(x => x.id === t);
const topicName = e => e.domainHub ? '영역 허브' : (topicOf(e.domain, e.topic) || {}).name || e.topic || '';
const topicPage = (d, t) => `t/${d}--${t}.html`;

// ── 그림 번들 (build.mjs와 동일 방식) ─────────────────────────────
await esbuild.build({
  entryPoints: [r('src/diagrams.jsx')], bundle: true, format: 'esm', platform: 'node',
  outfile: r('.build/diagrams.mjs'), jsxFactory: '__h', inject: [r('src/jsx-shim.js')], logLevel: 'warning',
});
const { byCaption } = await import(r('.build/diagrams.mjs') + `?t=${Date.now()}`);

const LICENSES = {
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/', 'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/', 'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 2.5': 'https://creativecommons.org/licenses/by-sa/2.5/', 'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC0': 'https://creativecommons.org/publicdomain/zero/1.0/',
};
const escA = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const slimSvg = svg => svg.replace(/\b(d|points|transform|cx|cy|x|y|x1|x2|y1|y2)="([^"]*)"/g,
  (_, a, v) => `${a}="${v.replace(/\d+\.\d+/g, n => String(Math.round(parseFloat(n) * 10) / 10))}"`);
const FIG_RE = /&#91;embedded content: (.+?)\\?\]|^\*\*\\?\[이미지\\?\]\*\* \\?\[(.+?)\\?\]\((https:\/\/commons\.wikimedia\.org\/wiki\/File:[^)\s]+)\)\s*·\s*(.+)$/gm;

// ── 항목 읽기 ────────────────────────────────────────────────────
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
function parseEntry(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) { console.warn('⚠ 프론트매터 없음:', file); return null; }
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([\w-]+):\s*(.+)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  const slug = path.basename(file, '.md');
  const e = {
    slug, title: fm.title || slug, en: fm.en || '',
    domain: fm.domain || '', topic: fm.topic || '',
    order: Number.isFinite(parseInt(fm.order, 10)) ? parseInt(fm.order, 10) : 99,
    hub: fm.hub === 'true', domainHub: fm.domain_hub === 'true',
    tags: (fm.tags || '').split(',').map(s => s.trim()).filter(Boolean),
    body: raw.slice(m[0].length),
    dir: path.dirname(file),
  };
  if (!domainOf(e.domain)) console.warn(`⚠ [${slug}] 알 수 없는 domain:`, e.domain);
  else if (!e.domainHub && !topicOf(e.domain, e.topic)) console.warn(`⚠ [${slug}] 알 수 없는 topic:`, e.topic);
  return e;
}
const entries = walk(r('content/entries')).map(parseEntry).filter(Boolean);
const byTitle = new Map(), bySlug = new Map();
for (const e of entries) { byTitle.set(e.title, e); bySlug.set(e.slug, e); if (e.en) byTitle.set(e.en, e); }
const resolveWiki = name => byTitle.get(name.trim()) || bySlug.get(name.trim().toLowerCase());
const topicEntries = (d, t) => entries.filter(e => e.domain === d && e.topic === t).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

// ── 렌더링 ───────────────────────────────────────────────────────
const hSlug = t => t.replace(/<[^>]+>/g, '').trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 40);
marked.use({ gfm: true, renderer: { heading({ tokens, depth, text }) { return `<h${depth} id="${hSlug(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`; } } });
// 취소선 파싱 끄기 — 숫자 범위 표기(4~4.5, 2.2~3.0)의 ~가 GFM 취소선으로 렌더돼 본문에 줄이 그어지는 문제 (이슈 #1 검토).
// 백과 본문에 의도적 취소선은 없으므로 전역으로 끈다 (DESIGN.md 빌드 규칙에도 명시).
marked.use({ tokenizer: { del() { return undefined; } } });

const PROTECT = /<(a|h[1-6]|code|pre)\b[^>]*>[\s\S]*?<\/\1>/g;
function onText(src, fn) {
  const kept = [];
  let s = src.replace(PROTECT, m => `@@KEEP${kept.push(m) - 1}@@`);
  s = s.split(/(<[^>]+>)/).map(part => part.startsWith('<') ? part : fn(part)).join('');
  return s.replace(/@@KEEP(\d+)@@/g, (_, i) => kept[+i]);
}

const outLinks = new Map();   // slug -> Set(연결된 slug)
const missLinks = new Map();  // slug -> [없는 제목]
function renderEntry(e) {
  const slots = [];
  const slot = html => `@@SLOT${slots.push(html) - 1}@@`;
  let figNo = 0;
  // 로컬 이미지: ![캡션](img/파일.png) → 항목 옆 img/ 파일을 v2/assets/<slug>/로 복사해 figure로
  let md = e.body.replace(/^!\[([^\]]*)\]\((img\/[^)\s]+)\)[ \t]*$/gm, (_, cap, rel) => {
    const srcF = path.join(e.dir, rel);
    if (!fs.existsSync(srcF)) { console.warn(`⚠ [${e.slug}] 로컬 이미지 없음:`, rel); return ''; }
    figNo += 1;
    const outDir = path.join(OUT, 'assets', e.slug);
    fs.mkdirSync(outDir, { recursive: true });
    const base = path.basename(rel);
    fs.copyFileSync(srcF, path.join(outDir, base));
    return '\n' + slot(`<figure class="fig photo"><img src="../assets/${e.slug}/${base}" alt="${escA(cap)}" loading="lazy" decoding="async"><figcaption>그림 ${figNo}. ${cap}</figcaption></figure>`) + '\n';
  });
  md = md.replace(FIG_RE, (_, caption, imgCap, fileUrl, credit) => {
    if (caption) {
      const key = Object.keys(byCaption).find(k => caption.startsWith(k));
      if (!key) { console.warn(`⚠ [${e.slug}] 그림을 찾지 못함:`, caption); return ''; }
      figNo += 1;
      const svg = slimSvg(byCaption[key]().__html);
      return '\n' + slot(`<figure class="fig">${svg}<figcaption>그림 ${figNo}. ${caption}</figcaption></figure>`) + '\n';
    }
    figNo += 1;
    const file = fileUrl.split('/wiki/File:')[1];
    const src = `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=1400`;
    const lic = Object.keys(LICENSES).sort((a, b) => b.length - a.length).find(l => credit.includes(l));
    const creditHtml = lic ? credit.trim().replace(lic, `<a href="${LICENSES[lic]}" target="_blank" rel="noopener">${lic}</a>`) : credit.trim();
    return '\n' + slot(`<figure class="fig photo"><img src="${src}" alt="${escA(imgCap)}" loading="lazy" decoding="async"><figcaption>그림 ${figNo}. ${imgCap}<span class="credit">${creditHtml} · <a href="${fileUrl}" target="_blank" rel="noopener">Wikimedia Commons</a></span></figcaption></figure>`) + '\n';
  });
  md = md.replace(/```latex\n([\s\S]*?)```/g, (_, tex) => '\n' + slot(`<div class="math">${katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false })}</div>`) + '\n');
  // 위키 링크는 마크다운 처리 전에 슬롯으로 치환한다 — 뒤에 괄호가 붙은 [[CMP]](평탄화)를 marked가 일반 링크로
  // 해석해 깨진 링크(e/평탄화)를 만드는 문제를 막기 위해서다 (이슈 #1 검토). 헤딩·코드 안의 [[...]]는 본문에 없다.
  const linked = new Set(), missing = [];
  md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m0, name, label) => {
    const target = resolveWiki(name);
    if (!target) { missing.push(name.trim()); return slot(`<span class="wiki-missing">${label || name}</span>`); }
    if (target.slug !== e.slug) linked.add(target.slug);
    return slot(`<a class="wiki" href="${target.slug}.html">${label || name}</a>`);
  });
  let html = marked.parse(md);
  html = html.replace(/<p>(@@SLOT\d+@@)<\/p>/g, '$1');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');
  outLinks.set(e.slug, linked);
  if (missing.length) missLinks.set(e.slug, missing);
  html = html.replace(/@@SLOT(\d+)@@/g, (_, i) => slots[+i]);
  return html;
}

const css = fs.readFileSync(r('src/wiki.css'), 'utf8');
// KaTeX 공식 CSS (v2/assets/katex/katex.min.css) — 수식 구조(분수·첨자 배치, MathML 숨김)에 필수라
// 수식이 있는 페이지 head에서만 링크한다. 폰트 파일은 바이너리라 스냅샷 push가 안 되므로,
// @font-face는 woff2만 data URI로 내장해 파일 없이 자기완결로 동작하게 한다.
{
  const katexDir = path.join(OUT, 'assets', 'katex');
  fs.mkdirSync(katexDir, { recursive: true });
  const katexCss = fs.readFileSync(r('node_modules/katex/dist/katex.min.css'), 'utf8')
    .replace(/src:url\(fonts\/(.+?)\.woff2\) format\("woff2"\),url\(fonts\/.+?\.woff\) format\("woff"\),url\(fonts\/.+?\.ttf\) format\("truetype"\)/g,
      (_, name) => `src:url(data:font/woff2;base64,${fs.readFileSync(r(`node_modules/katex/dist/fonts/${name}.woff2`)).toString('base64')}) format("woff2")`);
  if (katexCss.includes('url(fonts/')) console.warn('⚠ KaTeX CSS 폰트 내장 실패: url(fonts/) 잔존');
  fs.writeFileSync(path.join(katexDir, 'katex.min.css'), katexCss);
}
const hasMath = html => (html || '').includes('class="katex');
// 구조 재편 페이지 (영역·주제·태그·사이드 트리·이전/다음) 전용 보충 스타일
const extraCss = `
main.wide { max-width: 1180px; }
.layout { display: grid; grid-template-columns: 232px minmax(0, 1fr); gap: 28px; align-items: start; }
.side { position: sticky; top: 64px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 14px 16px; font-size: 13.5px; max-height: calc(100vh - 84px); overflow-y: auto; }
.side .tn { margin-bottom: 12px; }
.side .tn-d a { font-weight: 800; color: var(--ink); font-size: 14.5px; }
.side .tn-t { margin: 5px 0 0 10px; }
.side .tn-t > a { color: var(--sub); }
.side .tn-t.open > a { color: var(--accent); font-weight: 700; }
.side ul { list-style: none; margin: 4px 0 2px; padding-left: 10px; border-left: 2px solid var(--line); }
.side li { margin: 3px 0; }
.side li a { color: var(--sub); }
.side li.cur a { color: var(--accent); font-weight: 700; }
@media (max-width: 900px) { .layout { grid-template-columns: minmax(0, 1fr); } .side { position: static; max-height: none; } }
.prevnext { display: flex; justify-content: space-between; gap: 10px; margin-top: 18px; }
.prevnext a { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 9px 14px; font-size: 14px; }
.badge { background: var(--accent-soft); color: var(--accent); border-radius: 999px; padding: 1px 9px; font-size: 12px; font-weight: 700; vertical-align: middle; white-space: nowrap; }
.badge.list { background: var(--chip); color: var(--sub); }
.dtiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; margin-top: 14px; }
.dtile { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; }
.dtile .t { font-size: 20px; font-weight: 800; }
.dtile .t a { color: var(--ink); }
.dtile .c { color: var(--sub); font-size: 13px; margin-top: 2px; }
.dtile p { color: var(--sub); font-size: 14px; margin: 8px 0 10px; }
.tchips { display: flex; flex-wrap: wrap; gap: 6px; }
.tchips a { background: var(--chip); border-radius: 999px; padding: 2px 11px; font-size: 12.5px; color: var(--sub); }
.tchips a:hover { background: var(--accent-soft); color: var(--accent); text-decoration: none; }
ol.tlist { list-style: none; counter-reset: tl; margin: 14px 0; padding: 0; }
ol.tlist li { counter-increment: tl; background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 12px 16px; margin: 8px 0; }
ol.tlist li::before { content: counter(tl); float: left; font-size: 20px; font-weight: 800; color: var(--accent); margin-right: 12px; line-height: 1.3; }
ol.tlist .t { font-weight: 700; font-size: 16px; }
ol.tlist .e { color: var(--sub); font-size: 12.5px; }
ol.tlist .d { color: var(--sub); font-size: 13.5px; margin-top: 4px; }
.tagrows { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.tagrows a { background: var(--card); border: 1px solid var(--line); border-radius: 999px; padding: 6px 14px; color: var(--ink); font-size: 14px; }
.tagrows a:hover { border-color: var(--accent); text-decoration: none; }
.side-toggle { display: none; }
@media (max-width: 900px) {
  .side-toggle { display: block; width: 100%; background: none; border: 0; font: inherit; font-size: 14.5px; font-weight: 800; text-align: left; padding: 0; cursor: pointer; color: var(--ink); }
  .side .side-body { display: none; margin-top: 10px; }
  .side.open .side-body { display: block; }
}
.pathline { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 13px 18px; margin-top: 12px; font-size: 14.5px; line-height: 1.9; }
.pathline .pl-t { font-weight: 800; margin-right: 6px; white-space: nowrap; }
details.allfold > summary { cursor: pointer; font-weight: 700; font-size: 15.5px; padding: 12px 2px 4px; }
`;
const updated = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
const plain = s => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const head = (title, prefix, math = false) => `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>${math ? `<link rel="stylesheet" href="${prefix}assets/katex/katex.min.css">` : ''}<style>${css}${extraCss}</style></head>
<body>
<header class="top"><div class="in"><a class="brand" href="${prefix}index.html">반도체 백과</a><span class="tag">지식창고 · 재편 프리뷰</span></div></header>`;
const foot = `<footer class="bot">반도체 백과 · ${updated} 기준 · 프리뷰 빌드 (기존 강의노트는 <a href="../index.html">루트 페이지</a>)</footer>
</body></html>`;
const footOpen = foot.replace(/\n<\/body><\/html>$/, ''); // 스크립트가 뒤에 오는 항목 페이지용 (닫는 태그 제외)

const bodies = new Map();
for (const e of entries) bodies.set(e.slug, renderEntry(e));
// 역링크
const backlinks = new Map(entries.map(e => [e.slug, []]));
for (const [from, set] of outLinks) for (const to of set) backlinks.get(to)?.push(bySlug.get(from));
const defOf = e => { const m = bodies.get(e.slug).match(/<blockquote>\s*<p>([\s\S]*?)<\/p>/); return m ? plain(m[1]) : ''; };
// 태그 사용 횟수 — 2회 이상 쓰인 태그만 태그 페이지·목록에 노출하고, 1회용 태그는 항목 페이지에 링크 없는 칩으로만 표시한다 (이슈 #1 검토)
const tagCount = new Map();
for (const e of entries) for (const t of e.tags) tagCount.set(t, (tagCount.get(t) || 0) + 1);
const tagChip = t => (tagCount.get(t) || 0) >= 2
  ? `<a class="chip" href="../tag/${encodeURIComponent(t)}.html">#${t}</a>`
  : `<span class="chip">#${t}</span>`;
// 허브 개요: 정의 인용 + '## 개요' 절 (개요로 시작하는 h2)까지만. 개요 절이 없는 허브는 정의 + 첫 문단으로 폴백한다.
const hubFallbacks = [];
const overviewOf = (html, slug) => {
  const bq = (html.match(/<blockquote>[\s\S]*?<\/blockquote>/) || [''])[0];
  const segs = html.split(/(?=<h2 )/);
  const gae = segs.find(s => s.startsWith('<h2') && plain(s.slice(0, s.indexOf('</h2>'))).startsWith('개요'));
  if (gae) return bq + gae;
  hubFallbacks.push(slug);
  const firstPara = ((segs[0] || '').replace(bq, '').match(/<p>[\s\S]*?<\/p>/) || [''])[0];
  return bq + firstPara;
};
// 항목 본문을 e/ 밖의 페이지(영역·주제)에 삽입할 때 위키 링크의 기준 경로를 ../e/로 재조정
// (로컬 이미지 ../assets/ 경로는 모든 페이지가 v2 바로 아래 한 단계라 그대로 맞는다)
const rebaseBody = html => html.replace(/<a class="wiki" href="/g, '<a class="wiki" href="../e/');

// ── 왼쪽 트리 (전 페이지 공통 — 현재 영역·주제만 펼침) ────────────
// P: 페이지 위치별 링크 빌더 { d: 영역, t: 주제, e: 항목 }
const P_E = { d: id => `../d/${id}.html`, t: (x, y) => `../${topicPage(x, y)}`, e: s => `${s}.html` };
const P_SUB = { d: id => `../d/${id}.html`, t: (x, y) => `../${topicPage(x, y)}`, e: s => `../e/${s}.html` };
const P_ROOT = { d: id => `d/${id}.html`, t: (x, y) => topicPage(x, y), e: s => `e/${s}.html` };
function treeHtml(cur, P) {
  cur = cur || {};
  return DOMAINS.map(d => {
    const list = entries.filter(e => e.domain === d.id);
    const head = `<div class="tn-d"><a href="${P.d(d.id)}">${d.name}</a> <span class="count">${list.length}</span></div>`;
    if (d.id !== cur.domain) return `<div class="tn">${head}</div>`;
    const dHub = list.find(e => e.domainHub);
    const hubLine = dHub ? `<div class="tn-t${cur.domainHub ? ' open' : ''}"><a href="${P.e(dHub.slug)}">${dHub.title}</a></div>` : '';
    const topics = d.topics.map(t => {
      const items = topicEntries(d.id, t.id);
      if (t.id === cur.topic && !cur.domainHub) {
        return `<div class="tn-t open"><a href="${P.t(d.id, t.id)}">${t.name}</a><ul>${items.map(x => `<li${x.slug === cur.slug ? ' class="cur"' : ''}><a href="${P.e(x.slug)}">${x.title}</a></li>`).join('')}</ul></div>`;
      }
      return `<div class="tn-t"><a href="${P.t(d.id, t.id)}">${t.name}</a></div>`;
    }).join('');
    return `<div class="tn">${head}${hubLine}${topics}</div>`;
  }).join('');
}
const sideHtml = (cur, P) => `<aside class="side" id="sideNav"><button class="side-toggle" id="sideToggle" type="button" aria-expanded="false">목차 ▾</button><div class="side-body">${treeHtml(cur, P)}</div></aside>`;
const sideScript = `<script>
(function () {
  var st = document.getElementById('sideToggle'), sn = document.getElementById('sideNav');
  if (st && sn) st.addEventListener('click', function () {
    var open = sn.classList.toggle('open');
    st.setAttribute('aria-expanded', String(open));
    st.textContent = open ? '목차 ▴' : '목차 ▾';
  });
})();
</script>
</body></html>`;

// ── 항목 페이지 ──────────────────────────────────────────────────
for (const e of entries) {
  const outs = [...(outLinks.get(e.slug) || [])].map(s => bySlug.get(s)).filter(Boolean);
  const backs = backlinks.get(e.slug) || [];
  const siblings = e.topic ? topicEntries(e.domain, e.topic).filter(x => x.slug !== e.slug) : [];
  const linkList = list => list.length ? `<ul>${list.map(x => `<li><a href="${x.slug}.html">${x.title}</a> <span style="color:var(--sub)">— ${domainName(x.domain)} &gt; ${topicName(x)}</span></li>`).join('')}</ul>` : '<p style="color:var(--sub)">없음</p>';
  const sibs = e.topic ? topicEntries(e.domain, e.topic) : [];
  const idx = sibs.findIndex(x => x.slug === e.slug);
  const prev = idx > 0 ? sibs[idx - 1] : null, next = idx >= 0 && idx < sibs.length - 1 ? sibs[idx + 1] : null;
  const prevNext = (prev || next) ? `<nav class="prevnext">${prev ? `<a href="${prev.slug}.html">← 이전 · ${prev.title}</a>` : '<span></span>'}${next ? `<a href="${next.slug}.html">다음 · ${next.title} →</a>` : '<span></span>'}</nav>` : '';
  const crumb = e.domainHub
    ? `<a href="../index.html">대문</a> › <a href="../d/${e.domain}.html">${domainName(e.domain)}</a> › ${e.title}`
    : `<a href="../index.html">대문</a> › <a href="../d/${e.domain}.html">${domainName(e.domain)}</a> › <a href="../${topicPage(e.domain, e.topic)}">${topicName(e)}</a> › ${e.title}`;
  const page = `${head(`${e.title} — 반도체 백과`, '../', hasMath(bodies.get(e.slug)))}
<main class="wide">
 <div class="layout">
  ${sideHtml(e, P_E)}
  <div class="content">
  <div class="crumb">${crumb}</div>
  <h1 class="title">${e.title}</h1>
  ${e.en ? `<div class="en">${e.en}</div>` : ''}
  <div class="meta"><span class="chip cat">${domainName(e.domain)} &gt; ${topicName(e)}</span>${e.hub ? '<span class="badge">주제 허브</span>' : ''}${e.domainHub ? '<span class="badge">영역 허브</span>' : ''}${e.tags.map(tagChip).join('')}</div>
  <button id="favBtn" class="fav-btn" type="button">☆ 즐겨찾기</button>
  <article>${bodies.get(e.slug)}</article>
  ${prevNext}
  <div class="links-box"><h3>이 항목에서 링크한 항목</h3>${linkList(outs)}<h3>이 항목을 링크한 항목</h3>${linkList(backs)}${siblings.length ? `<h3>같은 주제의 다른 항목</h3>${linkList(siblings)}` : ''}</div>
  </div>
 </div>
</main>
${footOpen}
<script>
(function () {
  var st = document.getElementById('sideToggle'), sn = document.getElementById('sideNav');
  if (st && sn) st.addEventListener('click', function () {
    var open = sn.classList.toggle('open');
    st.setAttribute('aria-expanded', String(open));
    st.textContent = open ? '목차 ▴' : '목차 ▾';
  });
  var slug = "${e.slug}", KEY = 'wiki-favs', btn = document.getElementById('favBtn');
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function paint() { var on = load().indexOf(slug) >= 0; btn.textContent = on ? '★ 즐겨찾기' : '☆ 즐겨찾기'; btn.classList.toggle('on', on); }
  btn.addEventListener('click', function () {
    var f = load();
    f = f.indexOf(slug) >= 0 ? f.filter(function (s) { return s !== slug; }) : f.concat(slug);
    try { localStorage.setItem(KEY, JSON.stringify(f)); } catch (e) {}
    paint();
  });
  paint();
})();
</script>
</body></html>`;
  fs.writeFileSync(path.join(OUT, 'e', `${e.slug}.html`), page);
}

// ── 영역 페이지 ──────────────────────────────────────────────────
for (const d of DOMAINS) {
  const list = entries.filter(e => e.domain === d.id);
  const dHub = list.find(e => e.domainHub);
  const topicCards = d.topics.map(t => {
    const items = topicEntries(d.id, t.id);
    const hub = items.find(x => x.hub);
    return `<a class="card" href="../${topicPage(d.id, t.id)}"><div class="t">${t.name} <span class="badge${hub ? '' : ' list'}">${hub ? '허브형' : '목록형'}</span></div><div class="e">${items.length}개 항목${hub ? ` · 허브: ${hub.title}` : ''}</div><div class="d">${items.map(x => x.title).join(' · ')}</div></a>`;
  }).join('');
  const page = `${head(`${d.name} — 반도체 백과`, '../', dHub ? hasMath(bodies.get(dHub.slug)) : false)}
<main class="wide">
 <div class="layout">
  ${sideHtml({ domain: d.id, topic: null, slug: null, domainHub: false }, P_SUB)}
  <div class="content">
  <div class="crumb"><a href="../index.html">대문</a> › ${d.name}</div>
  <h1 class="title">${d.name}</h1>
  <p style="color:var(--sub)">${d.desc} 전체 ${list.length}개 항목 · 주제 ${d.topics.length}개.</p>
  ${dHub ? `<article>${rebaseBody(bodies.get(dHub.slug))}</article><p class="count">영역 허브 항목 <a href="../e/${dHub.slug}.html">${dHub.title}</a>의 본문입니다. 항목 페이지에서도 볼 수 있습니다.</p>` : ''}
  <section class="cat-sec"><h2>주제</h2><div class="cards">${topicCards}</div></section>
  </div>
 </div>
</main>
${footOpen}
${sideScript}`;
  fs.writeFileSync(path.join(OUT, 'd', `${d.id}.html`), page);
}

// ── 주제 페이지 ──────────────────────────────────────────────────
for (const d of DOMAINS) for (const t of d.topics) {
  const items = topicEntries(d.id, t.id);
  const hub = items.find(x => x.hub);
  // 읽는 순서 목록에서 허브 자신은 제외한다 — 허브는 위 개요와 전문 읽기 링크가 맡는다 (이슈 #1 검토)
  const listItems = hub ? items.filter(x => !x.hub) : items;
  const listHtml = `<ol class="tlist">${listItems.map(x => `<li><a href="../e/${x.slug}.html"><span class="t">${x.title}</span></a><div class="e">${x.en}</div><div class="d">${escA(defOf(x))}</div></li>`).join('')}</ol>`;
  const overview = hub
    ? `<article>${rebaseBody(overviewOf(bodies.get(hub.slug), hub.slug))}</article><p class="count">위 내용은 이 주제의 허브 항목 <a href="../e/${hub.slug}.html">${hub.title}</a>의 정의와 개요까지만 실었다. <a href="../e/${hub.slug}.html">전문 읽기 →</a></p>`
    : `<p class="count">목록형 주제 — 총론(허브) 항목 없이, 아래 항목 목록이 곧 주제 페이지입니다.</p>`;
  const page = `${head(`${t.name} — ${d.name} · 반도체 백과`, '../', hasMath(overview))}
<main class="wide">
 <div class="layout">
  ${sideHtml({ domain: d.id, topic: t.id, slug: null, domainHub: false }, P_SUB)}
  <div class="content">
  <div class="crumb"><a href="../index.html">대문</a> › <a href="../d/${d.id}.html">${d.name}</a> › ${t.name}</div>
  <h1 class="title">${t.name} <span class="badge${hub ? '' : ' list'}">${hub ? '허브형' : '목록형'}</span></h1>
  <p style="color:var(--sub)">${d.name} 영역의 주제 · 전체 ${items.length}개 항목을 읽는 순서대로.</p>
  ${overview}
  <h2 style="font-size:20px;margin-top:26px">읽는 순서</h2>
  ${listHtml}
  </div>
 </div>
</main>
${footOpen}
${sideScript}`;
  fs.writeFileSync(path.join(OUT, 't', `${d.id}--${t.id}.html`), page);
}

// ── 태그 페이지 (횡단 묶음) ──────────────────────────────────────
const tagMap = new Map();
for (const e of entries) for (const t of e.tags) { if (!tagMap.has(t)) tagMap.set(t, []); tagMap.get(t).push(e); }
const tagList = [...tagMap.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'ko'));
// 노출 규칙: 2개 이상 항목에 쓰인 태그만 목록·페이지를 만든다. 1회용 태그는 항목 페이지의 링크 없는 칩으로만 남는다.
const exposedTags = tagList.filter(([, list]) => list.length >= 2);
const tagsPage = `${head('태그 — 반도체 백과', '')}
<main class="wide">
 <div class="layout">
  ${sideHtml(null, P_ROOT)}
  <div class="content">
  <div class="crumb"><a href="index.html">대문</a> › 태그</div>
  <h1 class="title">태그</h1>
  <p style="color:var(--sub)">위계를 가로지르는 횡단 묶음은 태그가 맡는다. 전체 ${tagList.length}개 태그 중 2개 이상 항목에 쓰인 ${exposedTags.length}개만 모았다 (1개 항목에만 쓰인 태그는 항목 페이지에 텍스트 칩으로만 표시).</p>
  <div class="tagrows">${exposedTags.map(([t, list]) => `<a href="tag/${encodeURIComponent(t)}.html">#${t} <span class="count">${list.length}</span></a>`).join('')}</div>
  </div>
 </div>
</main>
<footer class="bot">반도체 백과 · ${updated} 기준 · 프리뷰 빌드</footer>
${sideScript}`;
fs.writeFileSync(path.join(OUT, 'tags.html'), tagsPage);
for (const [t, list] of exposedTags) {
  const sections = DOMAINS.map(d => {
    const items = list.filter(e => e.domain === d.id).sort((a, b) => a.order - b.order);
    if (!items.length) return '';
    return `<div class="sub-name">${d.name}</div><div class="cards">${items.map(x => `<a class="card" href="../e/${x.slug}.html"><div class="t">${x.title}</div><div class="e">${x.en}</div><div class="d">${escA(defOf(x))}</div></a>`).join('')}</div>`;
  }).join('');
  const page = `${head(`#${t} — 반도체 백과`, '../')}
<main class="wide">
 <div class="layout">
  ${sideHtml(null, P_SUB)}
  <div class="content">
  <div class="crumb"><a href="../index.html">대문</a> › <a href="../tags.html">태그</a> › #${t}</div>
  <h1 class="title">#${t}</h1>
  <p style="color:var(--sub)">${list.length}개 항목에 붙은 태그.</p>
  ${sections}
  </div>
 </div>
</main>
${footOpen}
${sideScript}`;
  fs.writeFileSync(path.join(OUT, 'tag', `${t}.html`), page);
}

// ── 대문 ─────────────────────────────────────────────────────────
const tiles = DOMAINS.map(d => {
  const list = entries.filter(e => e.domain === d.id);
  return `<div class="dtile"><div class="t"><a href="d/${d.id}.html">${d.name}</a></div><div class="c">${list.length}개 항목 · 주제 ${d.topics.length}개</div><p>${d.desc}</p><div class="tchips">${d.topics.map(t => `<a href="${topicPage(d.id, t.id)}">${t.name}</a>`).join('')}</div></div>`;
}).join('');
const domainSections = DOMAINS.map(d => {
  const list = entries.filter(e => e.domain === d.id);
  if (!list.length) return '';
  const dHub = list.find(e => e.domainHub);
  const card = x => `<a class="card" href="e/${x.slug}.html"><div class="t">${x.title}</div><div class="e">${x.en}</div><div class="d">${escA(defOf(x))}</div></a>`;
  const hubBlock = dHub ? `<div class="sub-name">영역 허브</div><div class="cards">${card(dHub)}</div>` : '';
  const topicBlocks = d.topics.map(t => {
    const items = topicEntries(d.id, t.id);
    if (!items.length) return '';
    return `<div class="sub-name"><a href="${topicPage(d.id, t.id)}" style="color:inherit">${t.name}</a></div><div class="cards">${items.map(card).join('')}</div>`;
  }).join('');
  return `<section class="cat-sec"><h2><a href="d/${d.id}.html" style="color:inherit">${d.name}</a> <span class="count">${list.length}개 항목</span></h2>${hubBlock}${topicBlocks}</section>`;
}).join('');
// 입문 경로 — 처음 읽는 순서 (허브 항목 위주). 실제 항목으로만 구성한다.
const introPath = [
  [byTitle.get('반도체 제조 전체 흐름'), '반도체 제조 전체 흐름'],
  [byTitle.get('리소그래피'), '리소그래피'],
  [byTitle.get('건식 식각'), '건식 식각'],
  [bySlug.get('ale'), 'ALE'],
  [bySlug.get('metrology-overview'), '계측 개요'],
].filter(([x]) => x);
const pathLine = `<div class="pathline"><span class="pl-t">입문 경로</span>${introPath.map(([x, label]) => `<a href="e/${x.slug}.html">${label}</a>`).join(' → ')}</div>`;
const indexPage = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>반도체 백과</title><style>${css}${extraCss}</style></head>
<body>
<header class="top"><div class="in"><span class="brand">반도체 백과</span><span class="tag">지식창고 · 재편 프리뷰</span></div></header>
<main class="wide">
 <div class="layout">
  ${sideHtml(null, P_ROOT)}
  <div class="content">
  <div class="hero"><h1>반도체 백과</h1><p>반도체 공정의 모든 것을 항목 단위로 쌓는 지식창고. 전체 ${entries.length}개 항목 (재편 진행 중 — 기존 강의노트는 <a href="../index.html">여기</a>). 위계를 가로지르는 묶음은 <a href="tags.html">태그</a>에서.</p></div>
  <div class="dtiles">${tiles}</div>
  ${pathLine}
  <div class="search"><input id="q" type="search" placeholder="항목 검색 — 예: 엘립소미터, 식각, SiOCN" autocomplete="off"><div id="results"></div></div>
  <div class="tabs"><button class="tab on" id="tabAll" type="button">전체 분류</button><button class="tab" id="tabFav" type="button">★ 즐겨찾기</button></div>
  <div id="allWrap"><details class="allfold"><summary>전체 분류 — 영역·주제별 전체 ${entries.length}개 항목 펼치기</summary>${domainSections}</details></div>
  <div id="favWrap" hidden><div class="cards" id="favCards"></div><p id="favEmpty" class="count" hidden>아직 즐겨찾기한 항목이 없습니다. 항목 페이지에서 ☆ 즐겨찾기 버튼을 눌러 추가하세요.</p></div>
  </div>
 </div>
</main>
<footer class="bot">반도체 백과 · ${updated} 기준 · 프리뷰 빌드</footer>
<script>
const q = document.getElementById('q'), box = document.getElementById('results');
let idx = null;
const ensureIdx = async () => { if (!idx) idx = await (await fetch('search-index.json')).json(); return idx; };
q.addEventListener('focus', ensureIdx, { once: true });
const tabAll = document.getElementById('tabAll'), tabFav = document.getElementById('tabFav');
const allWrap = document.getElementById('allWrap'), favWrap = document.getElementById('favWrap');
const favCards = document.getElementById('favCards'), favEmpty = document.getElementById('favEmpty');
const escH = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function renderFav() {
  let favs = [];
  try { favs = JSON.parse(localStorage.getItem('wiki-favs')) || []; } catch (e) {}
  const map = {};
  (idx || []).forEach(x => { map[x.slug] = x; });
  const list = favs.map(s => map[s]).filter(Boolean);
  favEmpty.hidden = list.length > 0;
  favCards.innerHTML = list.map(x => '<a class="card" href="e/' + x.slug + '.html"><div class="t">' + escH(x.t) + '</div><div class="e">' + escH(x.en) + '</div><div class="d">' + escH(x.d || '') + '</div></a>').join('');
}
function showFav(on) {
  tabAll.classList.toggle('on', !on);
  tabFav.classList.toggle('on', on);
  allWrap.hidden = on;
  favWrap.hidden = !on;
  if (on) ensureIdx().then(renderFav);
}
tabAll.addEventListener('click', () => showFav(false));
tabFav.addEventListener('click', () => showFav(true));
q.addEventListener('input', () => {
  const v = q.value.trim().toLowerCase();
  if (!v || !idx) { box.innerHTML = ''; return; }
  const hits = idx.filter(x => (x.t + ' ' + x.en + ' ' + x.tags.join(' ') + ' ' + x.x).toLowerCase().includes(v)).slice(0, 12);
  box.innerHTML = hits.map(x => '<a class="hit" href="e/' + x.slug + '.html"><span class="t">' + x.t + '</span> <span class="m">' + x.cat + ' &gt; ' + x.sub + '</span><div class="x">' + x.x.slice(0, 140) + '…</div></a>').join('') || '<p style="color:var(--sub)">결과 없음</p>';
});
</script>
${sideScript}`;
fs.writeFileSync(path.join(OUT, 'index.html'), indexPage);

// ── 검색 색인 ────────────────────────────────────────────────────
const index = entries.map(e => ({ slug: e.slug, t: e.title, en: e.en, cat: domainName(e.domain), sub: topicName(e), tags: e.tags, d: defOf(e), x: plain(bodies.get(e.slug)).slice(0, 4000) }));
fs.writeFileSync(path.join(OUT, 'search-index.json'), JSON.stringify(index));

const topicCount = DOMAINS.reduce((a, d) => a + d.topics.length, 0);
console.log(`✓ v2 — 항목 ${entries.length}개, 위키 링크 ${[...outLinks.values()].reduce((a, s) => a + s.size, 0)}개, 영역 ${DOMAINS.length}개, 주제 ${topicCount}개, 태그 ${exposedTags.length}개 페이지 (전체 태그 ${tagList.length}개 중 2회 이상)`);
if (hubFallbacks.length) console.log(`  · 개요 절이 없어 정의+첫 문단으로 폴백한 허브: ${hubFallbacks.join(', ')}`);
for (const [slug, miss] of missLinks) console.log(`  · ${slug}: 미작성 링크 ${miss.join(', ')}`);
