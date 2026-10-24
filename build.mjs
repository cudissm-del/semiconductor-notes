// 반도체 공정 강의노트 사이트 빌더
// content/notes.md (Claude 문서에서 내보낸 원본) → index.html
// 사용법: npm run build
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { marked } from 'marked';
import katex from 'katex';
import { glossary } from './src/glossary.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const r = p => path.join(ROOT, p);

// ── 1. 그림 모듈(JSX)을 빌드해서 불러오기 ─────────────────────────
await esbuild.build({
  entryPoints: [r('src/diagrams.jsx')], bundle: true, format: 'esm', platform: 'node',
  outfile: r('.build/diagrams.mjs'), jsxFactory: '__h', inject: [r('src/jsx-shim.js')], logLevel: 'warning',
});
const { byCaption } = await import(r('.build/diagrams.mjs') + `?t=${Date.now()}`);

// ── 2. 원본 마크다운 정리 ────────────────────────────────────────
let md = fs.readFileSync(r('content/notes.md'), 'utf8').replace(/\r\n/g, '\n');
const title = (md.match(/^# (.+)$/m) || [, '반도체 공정 기초'])[1].trim();
md = md.replace(/^# .+\n+/, '');                       // 제목 줄
md = md.replace(/^[A-Z][a-z]{2} \d{1,2}, \d{4} · @.+\n+/m, ''); // 문서 바이라인

const slots = [];                                       // 그림·수식 자리표시
const slot = html => `@@SLOT${slots.push(html) - 1}@@`;

// 그림 두 종류를 문서 순서대로 번호 매김:
//  1) 문서의 그림(embed)  →  src/diagrams.jsx 의 SVG
//  2) 문서의 "**[이미지]** [설명](Commons 파일 링크) · 저작자, 라이선스" 줄  →  Wikimedia Commons 이미지
const LICENSES = {
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC0': 'https://creativecommons.org/publicdomain/zero/1.0/',
};
const escA = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// 그림 SVG 다이어트: 좌표·경로 숫자를 소수 1자리로 (760px 폭에서 0.1px 차이는 안 보인다)
const slimSvg = svg => svg.replace(/\b(d|points|transform|cx|cy|x|y|x1|x2|y1|y2)="([^"]*)"/g,
  (_, a, v) => `${a}="${v.replace(/\d+\.\d+/g, n => String(Math.round(parseFloat(n) * 10) / 10))}"`);
const FIG_RE = /&#91;embedded content: (.+?)\\?\]|^\*\*\\?\[이미지\\?\]\*\* \\?\[(.+?)\\?\]\((https:\/\/commons\.wikimedia\.org\/wiki\/File:[^)\s]+)\)\s*·\s*(.+)$/gm;
let figNo = 0;
md = md.replace(FIG_RE, (_, caption, imgCap, fileUrl, credit) => {
  if (caption) {
    const key = Object.keys(byCaption).find(k => caption.startsWith(k));
    if (!key) { console.warn('⚠ 그림을 찾지 못함:', caption); return ''; }
    figNo += 1;
    const svg = slimSvg(byCaption[key]().__html);
    return '\n' + slot(`<figure class="fig" tabindex="0" role="button" aria-label="그림 크게 보기: ${escA(caption)}">${svg}<figcaption>그림 ${figNo}. ${caption}</figcaption></figure>`) + '\n';
  }
  figNo += 1;
  const file = fileUrl.split('/wiki/File:')[1];
  const src = `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=1400`;
  const lic = Object.keys(LICENSES).sort((a, b) => b.length - a.length).find(l => credit.includes(l));
  const creditHtml = lic ? credit.trim().replace(lic, `<a href="${LICENSES[lic]}" target="_blank" rel="noopener">${lic}</a>`) : credit.trim();
  return '\n' + slot(`<figure class="fig photo" tabindex="0" role="button" aria-label="그림 크게 보기: ${escA(imgCap)}"><img src="${src}" alt="${escA(imgCap)}" loading="lazy" decoding="async"><figcaption>그림 ${figNo}. ${imgCap}<span class="credit">${creditHtml} · <a href="${fileUrl}" target="_blank" rel="noopener">Wikimedia Commons</a></span></figcaption></figure>`) + '\n';
});

md = md.replace(/```latex\n([\s\S]*?)```/g, (_, tex) =>
  '\n' + slot(`<div class="math">${katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false })}</div>`) + '\n');

// ── 3. 마크다운 → HTML ──────────────────────────────────────────
const slug = t => {
  let m;
  if ((m = t.match(/^(\d{1,2})-(\d{1,2})\./))) return `s-${m[1]}-${m[2]}`;
  if ((m = t.match(/^(\d{1,2})\./))) return `ch-${m[1]}`;
  if (t.startsWith('출처')) return 'sources';
  return 'h-' + t.replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 40);
};
marked.use({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }) {
      return `<h${depth} id="${slug(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
  },
});
let html = marked.parse(md);
html = html.replace(/<p>(@@SLOT\d+@@)<\/p>/g, '$1');
html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');

// ── 4. 본문 텍스트에만 적용할 변환 (장 참조 링크, 용어 풀이) ─────────
const PROTECT = /<(a|h[1-6]|code|pre)\b[^>]*>[\s\S]*?<\/\1>/g;
function onText(src, fn) {
  const kept = [];
  let s = src.replace(PROTECT, m => `@@KEEP${kept.push(m) - 1}@@`);
  s = s.split(/(<[^>]+>)/).map(part => part.startsWith('<') ? part : fn(part)).join('');
  return s.replace(/@@KEEP(\d+)@@/g, (_, i) => kept[+i]);
}
const chapterOk = n => n >= 1 && n <= 22;
const link = (href, label) => `<a class="xref" href="#${href}">${label}</a>`;
html = onText(html, t => t
  .replace(/(?<![\d.\-·])(\d{1,2})-(\d{1,2})장/g, (m, a, b) => chapterOk(+a) ? link(`s-${a}-${b}`, m) : m)
  .replace(/(?<![\d.\-·])(\d{1,2})-(\d{1,2})(?= [①②③])/g, (m, a, b) => chapterOk(+a) ? link(`s-${a}-${b}`, m) : m)
  .replace(/(?<![\d.\-·])(\d{1,2})·(\d{1,2})장/g, (m, a, b) => chapterOk(+a) && chapterOk(+b) ? `${link(`ch-${a}`, a)}·${link(`ch-${b}`, b + '장')}` : m)
  .replace(/(?<![\d.\-·])(\d{1,2})장/g, (m, a) => chapterOk(+a) ? link(`ch-${a}`, m) : m));

// ── 5. 장 단위로 나누기 ─────────────────────────────────────────
const parts = html.split(/(?=<h2 id=")/);
const intro = parts.length && !parts[0].startsWith('<h2') ? parts.shift() : ''; // h2 이전 내용
const chapters = parts.map(p => {
  const id = p.match(/<h2 id="([^"]+)"/)[1];
  const heading = p.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)[1].replace(/<[^>]+>/g, '');
  const subs = [...p.matchAll(/<h3 id="([^"]+)">([\s\S]*?)<\/h3>/g)].map(m => ({ id: m[1], title: m[2].replace(/<[^>]+>/g, '') }));
  return { id, heading, subs, body: p };
});

// 용어 풀이: 장마다 처음 나오는 곳 한 번만
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const ch of chapters) {
  const seen = new Set();
  ch.body = onText(ch.body, t => {
    for (const [term, def] of glossary) {
      if (seen.has(term)) continue;
      const re = new RegExp(`(?<![A-Za-z0-9\\-/])${term.replace(/[-]/g, '\\-')}(?![A-Za-z0-9\\-])`);
      if (re.test(t)) {
        seen.add(term);
        t = t.replace(re, `<abbr class="term" tabindex="0" data-def="${esc(def)}">${term}</abbr>`);
      }
    }
    return t;
  });
}

// ── 6. 목차, 읽음 표시, 이전/다음 ─────────────────────────────────
const PARTS = [
  ['큰 그림', [1, 2]], ['단위 공정 원리', [3, 4, 5, 6, 7, 8]], ['로직 소자 집적', [9, 10, 11, 12, 13]],
  ['메모리', [14, 15]], ['후공정', [16, 17, 18]], ['횡단 주제', [19, 20, 21]], ['정리', [22]],
];
const byId = Object.fromEntries(chapters.map(c => [c.id, c]));
const numbered = chapters.filter(c => /^ch-\d+$/.test(c.id));
const shortTitle = h => h.replace(/^\d+\.\s*/, '');

const toc = PARTS.map(([name, nums]) => `
  <li class="part"><span class="part-name">${name}</span><ul>${nums.map(n => {
    const c = byId[`ch-${n}`]; if (!c) return '';
    return `<li class="toc-ch" data-ch="${c.id}"><a href="#${c.id}"><span class="num">${n}</span><span class="t">${shortTitle(c.heading)}</span><span class="dot" aria-hidden="true"></span></a>${c.subs.length ? `<ul class="subs">${c.subs.map(s => `<li><a href="#${s.id}">${s.title}</a></li>`).join('')}</ul>` : ''}</li>`;
  }).join('')}</ul></li>`).join('') + `
  <li class="part"><span class="part-name">부록</span><ul>
    <li class="toc-ch" data-ch="glossary"><a href="#glossary"><span class="num">A</span><span class="t">용어 사전</span></a></li>
    ${byId.sources ? '<li class="toc-ch" data-ch="sources"><a href="#sources"><span class="num">B</span><span class="t">출처</span></a></li>' : ''}
  </ul></li>`;

const content = chapters.map(c => {
  const i = numbered.indexOf(c);
  const isCh = i >= 0;
  const head = isCh ? c.body.replace(/(<h2 id="[^"]+">[\s\S]*?<\/h2>)/, `<div class="ch-head">$1<button class="read-btn" data-ch="${c.id}" aria-pressed="false"><span class="box" aria-hidden="true"></span>읽음</button></div>`) : c.body;
  const next = isCh && numbered[i + 1] ? `<a class="next" href="#${numbered[i + 1].id}">다음 장 · ${numbered[i + 1].heading.replace(/:.*$/, '')} →</a>` : '';
  return `<section class="chapter${isCh ? '' : ' appendix'}" id="sec-${c.id}" data-ch="${c.id}">${head}${next}</section>`;
}).join('\n');

const gloss = `<section class="chapter appendix" id="sec-glossary" data-ch="glossary"><h2 id="glossary">용어 사전</h2>
<p>본문에서 밑줄 친 약어에 마우스를 올리거나 탭하면 같은 풀이가 뜹니다.</p>
<dl class="gloss">${[...glossary].sort((a, b) => a[0].localeCompare(b[0])).map(([t, d, n]) => `<div><dt id="g-${t}">${t}</dt><dd>${d} ${link(`ch-${n}`, n + '장')}</dd></div>`).join('')}</dl></section>`;

// ── 7. 검색 색인 ────────────────────────────────────────────────
const plain = s => s.replace(/@@SLOT\d+@@/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const index = [];
for (const c of chapters) {
  const pieces = c.body.split(/(?=<h3 id=")/);
  pieces.forEach((p, k) => {
    const id = k === 0 ? c.id : p.match(/<h3 id="([^"]+)"/)[1];
    const t = k === 0 ? c.heading : p.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)[1].replace(/<[^>]+>/g, '');
    index.push({ id, t, c: c.heading, x: plain(p.replace(/<h[23][^>]*>[\s\S]*?<\/h[23]>/, '')) });
  });
}
for (const [t, d] of glossary) index.push({ id: `g-${t}`, t: `${t} — 용어 사전`, c: '용어 사전', x: d });

// ── 8. 템플릿에 채우기 ───────────────────────────────────────────
const updated = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
let page = fs.readFileSync(r('src/template.html'), 'utf8')
  .replaceAll('{{TITLE}}', title)
  .replaceAll('{{UPDATED}}', updated)
  .replaceAll('{{COUNT}}', String(numbered.length))
  .replace('{{TOC}}', () => toc)
  .replace('{{CONTENT}}', () => (intro || '') + content + gloss)
  .replace('{{CSS}}', () => fs.readFileSync(r('src/site.css'), 'utf8'))
  .replace('{{JS}}', () => fs.readFileSync(r('src/site.js'), 'utf8'));
page = page.replace(/@@SLOT(\d+)@@/g, (_, i) => slots[+i]);

fs.writeFileSync(r('index.html'), page);
// 검색 색인은 별도 파일로 — 사이트 자바스크립트가 검색을 처음 쓸 때만 불러온다
fs.writeFileSync(r('search-index.json'), JSON.stringify(index));

// KaTeX 스타일·글꼴 복사
const kdist = path.join(path.dirname(fileURLToPath(import.meta.resolve('katex'))), '');
const kroot = fs.existsSync(path.join(kdist, 'katex.min.css')) ? kdist : path.join(kdist, 'dist');
fs.mkdirSync(r('assets/katex/fonts'), { recursive: true });
fs.copyFileSync(path.join(kroot, 'katex.min.css'), r('assets/katex/katex.min.css'));
for (const f of fs.readdirSync(path.join(kroot, 'fonts')).filter(f => f.endsWith('.woff2')))
  fs.copyFileSync(path.join(kroot, 'fonts', f), r(`assets/katex/fonts/${f}`));

console.log(`✓ index.html — ${numbered.length}개 장, 그림 ${figNo}개, 수식 ${slots.length - figNo}개, 용어 ${glossary.length}개 (${(page.length / 1024).toFixed(0)} KB) + search-index.json (${(JSON.stringify(index).length / 1024).toFixed(0)} KB)`);
