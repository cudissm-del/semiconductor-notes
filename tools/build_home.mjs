// 홈 대시보드 빌더 — home/links.json + 저장소 현황 → home/index.html
// 현황(항목 수·기본형·심화형 형식 요건·최근 갱신·빌드 기준 커밋)은 빌드 때마다 자동으로 다시 센다.
// 링크는 home/links.json만 고친다. 결과물 home/index.html은 직접 고치지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = p => path.join(ROOT, p);
const sh = cmd => { try { return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };
// 영역 목록은 build2.mjs의 DOMAINS에서 읽는다 (import하면 v2 빌드가 돌아가므로 텍스트로 파싱)
const DOMAINS = [...fs.readFileSync(r('build2.mjs'), 'utf8').matchAll(/\{ id: '([^']+)', name: '([^']+)', desc:/g)].map(m => ({ id: m[1], name: m[2] }));
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 1) 항목 판정 — tools/audit.py --deep 출력(탭 구분)을 그대로 읽는다
const audit = sh('python3 tools/audit.py --deep').trim().split('\n').filter(l => l && !l.startsWith('#') && !l.startsWith('항목\t'))
  .map(l => { const c = l.split('\t'); return { rel: c[0], basic: c[4] === '기본형', deep: c[9] === '심화형(형식)' }; });
const total = audit.length, nBasic = audit.filter(a => a.basic).length, nDeep = audit.filter(a => a.deep).length;
const byDomain = DOMAINS.map(d => {
  const rows = audit.filter(a => a.rel.startsWith(d.id + '/'));
  return { name: d.name, id: d.id, n: rows.length, basic: rows.filter(a => a.basic).length, deep: rows.filter(a => a.deep).length };
});

// 2) 항목 제목 (frontmatter title)
const fmTitle = rel => {
  try { const m = fs.readFileSync(r('content/entries/' + rel), 'utf8').match(/^---[\s\S]*?^title:\s*(.+)$/m); return m ? m[1].trim().replace(/^["']|["']$/g, '') : null; }
  catch { return null; }
};

// 3) 최근 갱신 항목 — git log에서 바뀐 항목 파일을 최신순으로 6개
const recent = [];
{
  let date = '';
  for (const line of sh('git log --name-only --format=@%cI -n 80 -- content/entries').split('\n')) {
    if (line.startsWith('@')) { date = line.slice(1, 11); continue; }
    if (!line.endsWith('.md') || !line.startsWith('content/entries/')) continue;
    const rel = line.slice('content/entries/'.length);
    if (recent.some(x => x.rel === rel) || !fs.existsSync(r(line))) continue;
    const dom = DOMAINS.find(d => rel.startsWith(d.id + '/'));
    recent.push({ rel, date, slug: path.basename(rel, '.md'), title: fmTitle(rel) || path.basename(rel, '.md'), dom: dom ? dom.name : '' });
    if (recent.length >= 6) break;
  }
}

// 4) 빌드 기준 커밋
const [hash, when, subj] = sh('git log -1 --format=%h%x09%cI%x09%s').trim().split('\t');

// 5) 링크
const links = JSON.parse(fs.readFileSync(r('home/links.json'), 'utf8'));
// 최근 확보 논문 — home/recent-papers.json (수동). 없으면 절을 생략한다
const papers = fs.existsSync(r('home/recent-papers.json')) ? JSON.parse(fs.readFileSync(r('home/recent-papers.json'), 'utf8')).papers || [] : [];
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const built = (() => { const k = new Date(Date.now() + 9 * 3600e3).toISOString(); return `${k.slice(0, 10)} ${k.slice(11, 16)} KST`; })();

const tile = it => it.url
  ? `<a class="tile" href="${esc(it.url)}"${/^https?:/.test(it.url) ? ' target="_blank" rel="noopener"' : ''}><b>${esc(it.name)}</b><span>${esc(it.desc)}</span></a>`
  : `<div class="tile wait"><b>${esc(it.name)}</b><span>${esc(it.desc)}</span><em>링크 대기</em></div>`;

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>홈 — 반도체 백과 작업실</title>
<style>${fs.readFileSync(r('src/wiki.css'), 'utf8')}
main, header.top .in { max-width: 1040px; }
.hello { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 6px 16px; margin: 4px 0 16px; }
.hello h1 { font-size: 26px; margin: 0; }
.hello .when { color: var(--sub); font-size: 13px; }
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.stat { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 14px 16px; }
.stat .k { color: var(--sub); font-size: 12.5px; }
.stat .v { font-size: 26px; font-weight: 800; line-height: 1.2; margin-top: 2px; font-variant-numeric: tabular-nums; }
.stat .v small { font-size: 14px; color: var(--sub); font-weight: 600; }
.stat .s { color: var(--sub); font-size: 12.5px; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
h2.sec { font-size: 15px; color: var(--sub); margin: 26px 0 10px; letter-spacing: .02em; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
.tile { display: flex; flex-direction: column; gap: 3px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 14px 16px; color: var(--ink); min-height: 78px; }
a.tile:hover { border-color: var(--accent); text-decoration: none; }
.tile b { font-size: 15.5px; }
.tile span { color: var(--sub); font-size: 13px; }
.tile.wait { border-style: dashed; opacity: .75; }
.tile.wait em { font-style: normal; font-size: 12px; color: var(--missing); font-weight: 700; }
.two { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
.panel { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 12px 16px; }
.dom { display: grid; grid-template-columns: 82px minmax(0, 1fr) 92px; gap: 10px; align-items: center; padding: 7px 0; font-size: 14px; }
.dom + .dom { border-top: 1px solid var(--line); }
.bar { position: relative; height: 10px; background: var(--chip); border-radius: 99px; overflow: hidden; }
.bar i { position: absolute; left: 0; top: 0; bottom: 0; background: var(--accent); border-radius: 99px; }
.dom .num { text-align: right; color: var(--sub); font-variant-numeric: tabular-nums; font-size: 13px; }
.recent { list-style: none; margin: 0; padding: 0; }
.recent li { display: flex; justify-content: space-between; gap: 10px; padding: 7px 0; font-size: 14px; }
.recent li + li { border-top: 1px solid var(--line); }
.recent .d { color: var(--sub); font-size: 12.5px; white-space: nowrap; }
.recent .dm { color: var(--sub); font-size: 12.5px; margin-left: 6px; }
.note { color: var(--sub); font-size: 12.5px; margin-top: 8px; }
@media (max-width: 760px) { .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } .two { grid-template-columns: minmax(0, 1fr); } }
</style></head><body>
<header class="top"><div class="in"><a class="brand" href="../v2/">반도체 백과</a><span class="tag">작업실 홈</span></div></header>
<main>
<div class="hello"><h1>작업실</h1><span class="when">현황은 ${esc(built)} 빌드 기준</span></div>
<div class="stats">
  <div class="stat"><div class="k">항목</div><div class="v">${total}</div><div class="s">${byDomain.length}개 영역</div></div>
  <div class="stat"><div class="k">기본형</div><div class="v">${nBasic}<small> / ${total}</small></div><div class="s">${pct(nBasic, total)}%</div></div>
  <div class="stat"><div class="k">심화형 형식 요건</div><div class="v">${nDeep}<small> / ${total}</small></div><div class="s">${pct(nDeep, total)}% · audit.py --deep</div></div>
  <div class="stat"><div class="k">빌드 기준 커밋</div><div class="v" style="font-size:20px"><a href="https://github.com/cudissm-del/semiconductor-notes/commit/${esc(hash)}" target="_blank" rel="noopener">${esc(hash || '—')}</a></div><div class="s" title="${esc(subj)}">${esc((when || '').slice(0, 10))} · ${esc(subj)}</div></div>
</div>
${links.groups.map(g => `<h2 class="sec">${esc(g.name)}</h2>\n<div class="grid">${g.items.map(tile).join('')}</div>`).join('\n')}
${papers.length ? `<h2 class="sec">최근 확보 논문</h2>
<div class="panel"><ul class="recent">
  ${papers.slice(0, 12).map(p => `<li><span>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.cite)}</a>` : esc(p.cite)}<span class="dm">${esc(p.note)}</span></span><span class="d">${esc(p.date)}</span></li>`).join('\n  ')}
  </ul><div class="note">Zotero 등록 때 home/recent-papers.json에 한 줄씩 보탠다. 링크는 대조된 DOI·arXiv만 단다.</div></div>` : ''}
<div class="two" style="margin-top:26px">
  <section><h2 class="sec" style="margin-top:0">영역별 심화 진행</h2><div class="panel">
  ${byDomain.map(d => `<div class="dom"><span>${esc(d.name)}</span><div class="bar" title="심화형 ${d.deep}/${d.n}"><i style="width:${pct(d.deep, d.n)}%"></i></div><span class="num">${d.deep} / ${d.n}</span></div>`).join('\n  ')}
  <div class="note">막대 = 심화형 형식 요건 통과 / 영역 항목 수. 형식 요건은 내용 판정이 아니다.</div></div></section>
  <section><h2 class="sec" style="margin-top:0">최근 갱신 항목</h2><div class="panel"><ul class="recent">
  ${recent.map(e => `<li><span><a href="../v2/e/${esc(e.slug)}.html">${esc(e.title)}</a><span class="dm">${esc(e.dom)}</span></span><span class="d">${esc(e.date)}</span></li>`).join('\n  ')}
  </ul></div></section>
</div>
</main></body></html>
`;
fs.writeFileSync(r('home/index.html'), html);
console.log(`✓ home — 항목 ${total}, 기본형 ${nBasic}, 심화형 형식 ${nDeep}, 최근 ${recent.length}, 논문 ${papers.length}, 링크 ${links.groups.reduce((a, g) => a + g.items.length, 0)}개 (대기 ${links.groups.reduce((a, g) => a + g.items.filter(i => !i.url).length, 0)})`);
