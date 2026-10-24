// 반도체 백과 빌더 (재편 프리뷰) — content/entries/<분류>/<슬러그>.md → v2/
// 설계: DESIGN.md. 기존 build.mjs(강의노트)는 이관 완료까지 병행 유지.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { marked } from 'marked';
import katex from 'katex';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const r = p => path.join(ROOT, p);
const OUT = r('v2');
fs.mkdirSync(path.join(OUT, 'e'), { recursive: true });

export const CATS = [
  { id: 'process', name: '공정', subs: ['리소그래피', '식각', '증착·성막', '열처리·확산', '이온주입', 'CMP·평탄화', '세정', '집적 흐름'] },
  { id: 'metrology', name: '계측·분석', subs: ['두께·형상', '조성·표면', '결함·오염', '전기 측정', '플라즈마 진단'] },
  { id: 'materials', name: '재료', subs: ['기판·웨이퍼', '절연막', '반도체막', '금속·배리어', '감광·화학 소재'] },
  { id: 'devices', name: '소자·구조', subs: ['트랜지스터', '메모리', '패키징·연결', '구성 요소'] },
  { id: 'phenomena', name: '현상·원리', subs: ['플라즈마', '표면·계면 반응', '수송·확산', '응력·변형', '방사선·빔 상호작용'] },
  { id: 'equipment', name: '장비', subs: ['노광 장비', '식각 장비', '증착 장비', '주입·열처리 장비'] },
  { id: 'manufacturing', name: '제조·품질', subs: ['수율', '결함 관리', '오염 관리', '클린룸·환경', '공정 제어'] },
];
const catName = id => (CATS.find(c => c.id === id) || {}).name || id;

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
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  const slug = path.basename(file, '.md');
  return {
    slug, title: fm.title || slug, en: fm.en || '', cat: fm.cat || '', sub: fm.sub || '',
    tags: (fm.tags || '').split(',').map(s => s.trim()).filter(Boolean),
    body: raw.slice(m[0].length),
  };
}
const entries = walk(r('content/entries')).map(parseEntry).filter(Boolean);
const byTitle = new Map(), bySlug = new Map();
for (const e of entries) { byTitle.set(e.title, e); bySlug.set(e.slug, e); if (e.en) byTitle.set(e.en, e); }
const resolveWiki = name => byTitle.get(name.trim()) || bySlug.get(name.trim().toLowerCase());

// ── 렌더링 ───────────────────────────────────────────────────────
const hSlug = t => t.replace(/<[^>]+>/g, '').trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 40);
marked.use({ gfm: true, renderer: { heading({ tokens, depth, text }) { return `<h${depth} id="${hSlug(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`; } } });

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
  let md = e.body.replace(FIG_RE, (_, caption, imgCap, fileUrl, credit) => {
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
  let html = marked.parse(md);
  html = html.replace(/<p>(@@SLOT\d+@@)<\/p>/g, '$1');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');
  // 위키 링크
  const linked = new Set(), missing = [];
  html = onText(html, t => t.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m0, name, label) => {
    const target = resolveWiki(name);
    if (!target) { missing.push(name.trim()); return `<span class="wiki-missing">${label || name}</span>`; }
    if (target.slug !== e.slug) linked.add(target.slug);
    return `<a class="wiki" href="${target.slug}.html">${label || name}</a>`;
  }));
  outLinks.set(e.slug, linked);
  if (missing.length) missLinks.set(e.slug, missing);
  html = html.replace(/@@SLOT(\d+)@@/g, (_, i) => slots[+i]);
  return html;
}

const css = fs.readFileSync(r('src/wiki.css'), 'utf8');
const updated = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
const plain = s => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

const bodies = new Map();
for (const e of entries) bodies.set(e.slug, renderEntry(e));
// 역링크
const backlinks = new Map(entries.map(e => [e.slug, []]));
for (const [from, set] of outLinks) for (const to of set) backlinks.get(to)?.push(bySlug.get(from));

// ── 항목 페이지 ──────────────────────────────────────────────────
for (const e of entries) {
  const outs = [...(outLinks.get(e.slug) || [])].map(s => bySlug.get(s)).filter(Boolean);
  const backs = backlinks.get(e.slug) || [];
  const siblings = entries.filter(x => x.cat === e.cat && x.sub === e.sub && x.slug !== e.slug);
  const linkList = list => list.length ? `<ul>${list.map(x => `<li><a href="${x.slug}.html">${x.title}</a> <span style="color:var(--sub)">— ${catName(x.cat)} &gt; ${x.sub}</span></li>`).join('')}</ul>` : '<p style="color:var(--sub)">없음</p>';
  const page = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e.title} — 반도체 백과</title><style>${css}</style></head>
<body>
<header class="top"><div class="in"><a class="brand" href="../index.html">반도체 백과</a><span class="tag">지식창고 · 재편 프리뷰</span></div></header>
<main>
  <div class="crumb"><a href="../index.html">대문</a> › ${catName(e.cat)} › ${e.sub}</div>
  <h1 class="title">${e.title}</h1>
  ${e.en ? `<div class="en">${e.en}</div>` : ''}
  <div class="meta"><span class="chip cat">${catName(e.cat)} &gt; ${e.sub}</span>${e.tags.map(t => `<span class="chip">#${t}</span>`).join('')}</div>
  <article>${bodies.get(e.slug)}</article>
  <div class="links-box"><h3>이 항목에서 링크한 항목</h3>${linkList(outs)}<h3>이 항목을 링크한 항목</h3>${linkList(backs)}${siblings.length ? `<h3>같은 분류의 다른 항목</h3>${linkList(siblings)}` : ''}</div>
</main>
<footer class="bot">반도체 백과 · ${updated} 기준 · 프리뷰 빌드 (기존 강의노트는 <a href="../index.html">루트 페이지</a>)</footer>
</body></html>`;
  fs.writeFileSync(path.join(OUT, 'e', `${e.slug}.html`), page);
}

// ── 대문 ─────────────────────────────────────────────────────────
const defOf = e => { const m = bodies.get(e.slug).match(/<blockquote><p>([\s\S]*?)<\/p><\/blockquote>/); return m ? plain(m[1]) : ''; };
const catSections = CATS.map(c => {
  const list = entries.filter(e => e.cat === c.id);
  if (!list.length) return '';
  const subs = [...new Set([...c.subs, ...list.map(e => e.sub)])].filter(s => list.some(e => e.sub === s));
  return `<section class="cat-sec"><h2>${c.name} <span class="count">${list.length}개 항목</span></h2>${subs.map(s => `
    <div class="sub-name">${s}</div><div class="cards">${list.filter(e => e.sub === s).map(e => `
      <a class="card" href="e/${e.slug}.html"><div class="t">${e.title}</div><div class="e">${e.en}</div><div class="d">${escA(defOf(e))}</div></a>`).join('')}</div>`).join('')}</section>`;
}).join('');
const indexPage = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>반도체 백과</title><style>${css}</style></head>
<body>
<header class="top"><div class="in"><span class="brand">반도체 백과</span><span class="tag">지식창고 · 재편 프리뷰</span></div></header>
<main>
  <div class="hero"><h1>반도체 백과</h1><p>반도체 공정의 모든 것을 항목 단위로 쌓는 지식창고. 전체 ${entries.length}개 항목 (재편 진행 중 — 기존 강의노트는 <a href="../index.html">여기</a>).</p></div>
  <div class="search"><input id="q" type="search" placeholder="항목 검색 — 예: 엘립소미터, 식각, SiOCN" autocomplete="off"><div id="results"></div></div>
  ${catSections}
</main>
<footer class="bot">반도체 백과 · ${updated} 기준 · 프리뷰 빌드</footer>
<script>
const q = document.getElementById('q'), box = document.getElementById('results');
let idx = null;
q.addEventListener('focus', async () => { if (!idx) idx = await (await fetch('search-index.json')).json(); }, { once: true });
q.addEventListener('input', () => {
  const v = q.value.trim().toLowerCase();
  if (!v || !idx) { box.innerHTML = ''; return; }
  const hits = idx.filter(x => (x.t + ' ' + x.en + ' ' + x.tags.join(' ') + ' ' + x.x).toLowerCase().includes(v)).slice(0, 12);
  box.innerHTML = hits.map(x => '<a class="hit" href="e/' + x.slug + '.html"><span class="t">' + x.t + '</span> <span class="m">' + x.cat + ' &gt; ' + x.sub + '</span><div class="x">' + x.x.slice(0, 140) + '…</div></a>').join('') || '<p style="color:var(--sub)">결과 없음</p>';
});
</script>
</body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), indexPage);

// ── 검색 색인 ────────────────────────────────────────────────────
const index = entries.map(e => ({ slug: e.slug, t: e.title, en: e.en, cat: catName(e.cat), sub: e.sub, tags: e.tags, x: plain(bodies.get(e.slug)).slice(0, 4000) }));
fs.writeFileSync(path.join(OUT, 'search-index.json'), JSON.stringify(index));

console.log(`✓ v2 — 항목 ${entries.length}개, 위키 링크 ${[...outLinks.values()].reduce((a, s) => a + s.size, 0)}개`);
for (const [slug, miss] of missLinks) console.log(`  · ${slug}: 미작성 링크 ${miss.join(', ')}`);
