// GAA 문헌 지도 빌더 — gaa/map.json → gaa/index.html
// 원본은 map.json만 고친다. DOI 링크는 doi_state가 「대조」인 것만 단다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = p => path.join(ROOT, p);
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const map = JSON.parse(fs.readFileSync(r('gaa/map.json'), 'utf8'));
const refs = map.refs;

// 백과 항목 slug → 제목 (frontmatter title)
const titles = {};
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.md')) {
      const m = fs.readFileSync(p, 'utf8').match(/^---[\s\S]*?^title:\s*(.+)$/m);
      if (m) titles[path.basename(f.name, '.md')] = m[1].trim();
    }
  }
})(r('content/entries'));
for (const x of refs) for (const s of x.used) if (!titles[s]) console.warn(`⚠ gaa/map.json: 없는 항목 slug ${s} (${x.cite})`);

const n = refs.length, nOrig = refs.filter(x => x.orig).length, nDoi = refs.filter(x => x.doi_state === '대조').length, nUsed = refs.filter(x => x.used.length).length;
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

const doiCell = x => x.doi_state === '대조'
  ? `<a href="https://doi.org/${esc(x.doi)}" target="_blank" rel="noopener">대조</a>`
  : x.doi_state === '대기' ? `<span class="st wait" title="${esc(x.doi)}">대기</span>` : `<span class="st none">없음</span>`;
const row = x => `<tr data-q="${esc((x.cite + ' ' + x.note + ' ' + x.used.map(s => titles[s] || s).join(' ')).toLowerCase())}">
<td class="c"><b>${esc(x.cite)}</b><span class="k">${esc(x.kind)}</span></td>
<td>${esc(x.note)}</td>
<td class="m">${x.orig ? '<span class="st ok">보유</span>' : '<span class="st none">—</span>'}</td>
<td class="m">${doiCell(x)}</td>
<td>${x.used.map(s => `<a class="chip" href="../v2/e/${esc(s)}.html">${esc(titles[s] || s)}</a>`).join(' ')}</td></tr>`;

const sections = map.modules.map(m => {
  const rs = refs.filter(x => x.module === m.id);
  if (!rs.length) return '';
  const u = rs.filter(x => x.used.length).length, o = rs.filter(x => x.orig).length;
  return `<section class="mod" id="${esc(m.id)}"><h2>${esc(m.name)} <small>${rs.length}건 · 원문 ${o} · 백과 반영 ${u}</small></h2>
<div class="tw"><table><colgroup><col style="width:26%"><col style="width:37%"><col style="width:7%"><col style="width:7%"><col style="width:23%"></colgroup><thead><tr><th>문헌</th><th>핵심</th><th>원문</th><th>DOI</th><th>쓴 백과 항목</th></tr></thead><tbody>
${rs.map(row).join('\n')}
</tbody></table></div></section>`;
}).join('\n');

const bars = map.modules.map(m => {
  const rs = refs.filter(x => x.module === m.id), u = rs.filter(x => x.used.length).length;
  return `<a class="mb" href="#${esc(m.id)}"><span>${esc(m.name)}</span><span class="bar"><i style="width:${pct(u, rs.length)}%"></i></span><span class="num">${u} / ${rs.length}</span></a>`;
}).join('\n');

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>GAA 문헌 지도 — 반도체 백과 작업실</title>
<style>${fs.readFileSync(r('src/wiki.css'), 'utf8')}
main, header.top .in { max-width: 1120px; }
.hello h1 { font-size: 26px; margin: 4px 0 2px; }
.lead { color: var(--sub); font-size: 14px; margin: 0 0 16px; }
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.stat { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 12px 16px; }
.stat .k { color: var(--sub); font-size: 12.5px; }
.stat .v { font-size: 24px; font-weight: 800; font-variant-numeric: tabular-nums; }
.stat .v small { font-size: 14px; color: var(--sub); font-weight: 600; }
.mods { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 8px 16px; margin-top: 12px; }
.mb { display: grid; grid-template-columns: 170px minmax(0, 1fr) 60px; gap: 10px; align-items: center; padding: 6px 0; font-size: 14px; color: var(--ink); }
.mb + .mb { border-top: 1px solid var(--line); }
.mb:hover { text-decoration: none; color: var(--accent); }
.bar { position: relative; height: 9px; background: var(--chip); border-radius: 99px; overflow: hidden; }
.bar i { position: absolute; left: 0; top: 0; bottom: 0; background: var(--accent); }
.num { text-align: right; color: var(--sub); font-size: 13px; font-variant-numeric: tabular-nums; }
.find { width: 100%; margin: 18px 0 4px; padding: 10px 14px; border: 1px solid var(--line); border-radius: 10px; background: var(--card); color: var(--ink); font-size: 15px; }
.mod h2 { font-size: 17px; margin: 26px 0 8px; }
.mod h2 small { color: var(--sub); font-weight: 500; font-size: 13px; margin-left: 6px; }
.tw { overflow-x: auto; background: var(--card); border: 1px solid var(--line); border-radius: 12px; }
table { border-collapse: collapse; width: 100%; min-width: 720px; table-layout: fixed; font-size: 13.5px; }
th, td { text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid var(--line); }
th { color: var(--sub); font-weight: 600; font-size: 12.5px; white-space: nowrap; }
tr:last-child td { border-bottom: 0; }
 td.c b { font-weight: 600; } .k { display: block; color: var(--sub); font-size: 12px; }
td.m { white-space: nowrap; }
.st { font-size: 12px; border-radius: 99px; padding: 1px 8px; }
.st.ok { background: var(--accent-soft); color: var(--accent); font-weight: 700; }
.st.wait { background: var(--chip); color: var(--missing); }
.st.none { color: var(--sub); }
.chip { display: inline-block; background: var(--accent-soft); border-radius: 99px; padding: 1px 9px; font-size: 12.5px; margin: 1px 0; }
.note { color: var(--sub); font-size: 12.5px; margin-top: 18px; }
@media (max-width: 760px) { .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } .mb { grid-template-columns: 120px minmax(0, 1fr) 50px; } }
</style></head><body>
<header class="top"><div class="in"><a class="brand" href="../home/">작업실</a><span class="tag">GAA 문헌 지도</span></div></header>
<main>
<div class="hello"><h1>GAA 나노시트 문헌 지도</h1></div>
<p class="lead">Claude 조사와 Joy 딥리서치를 합친 공정 모듈별 문헌 목록(${esc(map.as_of)} 기준). 원문을 확보했는지, DOI를 Crossref로 대조했는지, 백과 어느 항목에 근거로 쓰였는지를 함께 보인다.</p>
<div class="stats">
  <div class="stat"><div class="k">문헌</div><div class="v">${n}</div></div>
  <div class="stat"><div class="k">원문 보유</div><div class="v">${nOrig}<small> / ${n}</small></div></div>
  <div class="stat"><div class="k">DOI 대조</div><div class="v">${nDoi}<small> / ${n}</small></div></div>
  <div class="stat"><div class="k">백과 반영</div><div class="v">${nUsed}<small> / ${n}</small></div></div>
</div>
<div class="mods">${bars}</div>
<input class="find" type="search" placeholder="저자·연도·키워드·항목 이름으로 거르기 (예: CFET, Sun, 릴리스)" aria-label="문헌 거르기">
${sections}
<p class="note">DOI 「대기」는 DOI 문자열은 있으나 Crossref 대조 전이다(마우스를 올리면 DOI). 「없음」은 DOI를 아직 확보하지 않은 학회 발표·업계 자료다. 원본 데이터: gaa/map.json.</p>
</main>
<script>
const q = document.querySelector('.find');
q.addEventListener('input', () => {
  const v = q.value.trim().toLowerCase();
  document.querySelectorAll('tbody tr').forEach(tr => { tr.style.display = !v || tr.dataset.q.includes(v) ? '' : 'none'; });
  document.querySelectorAll('section.mod').forEach(s => { s.style.display = [...s.querySelectorAll('tbody tr')].some(tr => tr.style.display !== 'none') ? '' : 'none'; });
});
</script>
</body></html>
`;
fs.writeFileSync(r('gaa/index.html'), html);
console.log(`✓ gaa — 문헌 ${n}, 원문 ${nOrig}, DOI 대조 ${nDoi}, 백과 반영 ${nUsed}`);
