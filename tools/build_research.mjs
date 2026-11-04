// 연구 대시보드 빌더 — research/siocn/data.json → research/siocn/index.html
// 원본은 data.json만 고친다. 유량은 보정표로 자동 환산한다 (UI값 ≠ 실제 sccm).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = p => path.join(ROOT, p);
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const D = JSON.parse(fs.readFileSync(r('research/siocn/data.json'), 'utf8'));

// ── 유량 환산 ─────────────────────────────────────────────
const h2oPts = D.calib.h2o.points;
const ok = h2oPts.filter(p => p.state === '확정').sort((a, b) => a.ui - b.ui);
const slope = (ok.at(-1).sccm - ok[0].sccm) / (ok.at(-1).ui - ok[0].ui);
const h2oSccm = ui => ok[0].sccm + slope * (ui - ok[0].ui);
function h2oFlag(ui) {
  const p = h2oPts.find(x => x.ui === ui);
  if (p) return p.state === '확정' ? '' : p.state;
  return '외삽';
}
const h2oUi = sccm => ok[0].ui + (sccm - ok[0].sccm) / slope;
const cf4Sccm = ui => ui * D.calib.cf4.factor;
const cf4Ui = sccm => sccm / D.calib.cf4.factor;
const fmt = (x, d = 1) => x == null ? '—' : (Math.round(x * 10 ** d) / 10 ** d).toString().replace('-', '−');
const temp = t => t == null ? '—' : `${t > 0 ? '+' : ''}${fmt(t, 0)} °C`;
const flagChip = f => f ? `<span class="flag ${f === '외삽' ? 'ext' : 'tbd'}">${f}</span>` : '';

function gasCell(run) {
  if (run.h2o_ui == null && run.cf4_ui == null) return '<span class="muted">시트 확인</span>';
  const h = run.h2o_ui != null ? `${fmt(h2oSccm(run.h2o_ui))}${flagChip(h2oFlag(run.h2o_ui))}` : '—';
  const c = run.cf4_ui != null ? fmt(cf4Sccm(run.cf4_ui)) : '—';
  return `<b>${h} : ${c}</b> <span class="muted">sccm</span><div class="ui">UI ${run.h2o_ui ?? '—'} : ${run.cf4_ui ?? '—'}</div>`;
}

// ── 현황 ──────────────────────────────────────────────────
const done = D.runs.filter(x => x.status === '완료').length;
const pending = D.runs.filter(x => x.status !== '완료').length;
const hypOpen = D.hypotheses.filter(h => !['기각', '지지'].includes(h.state)).length;
const lastRun = D.runs.map(x => x.date).sort().at(-1);

// ── 그림: 온도별 1패스 순변화 (11/01) ─────────────────────
const films = ['SiOCN', '구 SiOC'];
const tempRuns = D.runs.filter(x => x.date === '2026-11-01').sort((a, b) => a.temp - b.temp);
function tempChart() {
  const W = 620, H = 300, L = 56, R = 110, T = 24, B = 46;
  const xs = tempRuns.map(x => x.temp), lo = -20, hi = 20;
  const vals = tempRuns.flatMap(x => films.map(f => x.result[f]?.net)).filter(v => v != null);
  const yMin = Math.min(-12, Math.floor(Math.min(...vals) - 2)), yMax = Math.max(12, Math.ceil(Math.max(...vals) + 2));
  const X = t => L + (t - lo) / (hi - lo) * (W - L - R);
  const Y = v => T + (yMax - v) / (yMax - yMin) * (H - T - B);
  let g = '';
  // ±10 Å 판정 오차 띠
  g += `<rect x="${L}" y="${Y(10)}" width="${W - L - R}" height="${Y(-10) - Y(10)}" fill="var(--cds-chart-reference-tint)"/>`;
  g += `<text x="${W - R - 6}" y="${Y(10) + 14}" text-anchor="end" class="ax">엘립소 판정 오차 ±10 Å</text>`;
  for (let v = Math.ceil(yMin / 5) * 5; v <= yMax; v += 5) {
    g += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--cds-chart-grid)" stroke-width="${v === 0 ? 1.5 : 1}"/>`;
    g += `<text x="${L - 8}" y="${Y(v) + 4}" text-anchor="end" class="ax">${fmt(v, 0)}</text>`;
  }
  for (const t of xs) g += `<text x="${X(t)}" y="${H - B + 20}" text-anchor="middle" class="ax">${temp(t)}</text>`;
  g += `<text x="${L - 44}" y="${T + (H - T - B) / 2}" transform="rotate(-90 ${L - 44} ${T + (H - T - B) / 2})" text-anchor="middle" class="ax">순변화 Δ (Å, + = 식각)</text>`;
  films.forEach((f, i) => {
    const c = `var(--series-${i + 1})`;
    const pts = tempRuns.map(x => [X(x.temp), Y(x.result[f].net), x]);
    g += `<polyline fill="none" stroke="${c}" stroke-width="2" points="${pts.map(p => p[0] + ',' + p[1]).join(' ')}"/>`;
    for (const [px, py, x] of pts) {
      const v = x.result[f];
      g += `<g class="pt"><circle cx="${px}" cy="${py}" r="14" fill="transparent"/><circle cx="${px}" cy="${py}" r="5" fill="${c}" stroke="var(--card)" stroke-width="2"/>`
        + `<title>${f} · ${temp(x.temp)}\n순변화 ${fmt(v.net, 2)} Å (Modi ${fmt(v.modi, 2)} / RTP ${fmt(v.rtp, 2)})</title></g>`;
    }
    const last = pts.at(-1);
    g += `<text x="${last[0] + 12}" y="${last[1] + (i ? 14 : -6)}" class="lab">${f}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="11월 1일 온도별 1패스 순변화">${g}</svg>`;
}

// ── 섹션 ──────────────────────────────────────────────────
const stateCls = s => ({ '확인 중': 'run', '단서 (n=1)': 'hint', '확인 대기': 'wait', '아이디어': 'idea', '기각': 'no', '지지': 'yes' }[s] || 'wait');
const hypRows = D.hypotheses.map(h => `<div class="hyp ${stateCls(h.state)}">
<div class="hh"><span class="hid">${esc(h.id)}</span><span class="st ${stateCls(h.state)}">${esc(h.state)}</span></div>
<p>${esc(h.claim)}</p><p class="test"><b>판정</b> ${esc(h.test)}</p></div>`).join('');

const resCell = res => {
  const ks = Object.keys(res || {});
  if (!ks.length) return '<span class="muted">—</span>';
  return ks.map(k => {
    const v = res[k];
    if (v.epc != null) return `<div>${esc(k)} <b>${fmt(v.epc, 2)}</b> <span class="muted">Å/cyc</span></div>`;
    return `<div>${esc(k)} <b>${fmt(v.net, 2)}</b> <span class="muted">(M ${fmt(v.modi, 2)} / R ${fmt(v.rtp, 2)})</span></div>`;
  }).join('');
};
const runRows = [...D.runs].sort((a, b) => b.date.localeCompare(a.date) || a.temp - b.temp).map(x => `<tr data-temp="${x.temp}" data-status="${esc(x.status)}">
<td><b>${esc(x.id)}</b><div class="muted">${esc(x.date)}</div></td>
<td><span class="st ${x.status === '완료' ? 'yes' : 'wait'}">${esc(x.status)}</span></td>
<td class="n">${temp(x.temp)}</td>
<td class="n">${x.power ?? '—'}${x.power != null ? ' W' : ''}</td>
<td class="n">${x.pressure ?? '—'}${x.pressure != null ? ' mT' : ''}</td>
<td>${gasCell(x)}</td>
<td class="n">${x.modi_min ?? '—'}${x.modi_min != null ? '분' : ''} · ${x.cycles ?? '—'}${x.cycles != null ? '회' : ''}</td>
<td>${resCell(x.result)}</td>
<td class="muted">${esc(x.note)}</td></tr>`).join('');

function planBlock(p) {
  let extra = '';
  if (p.targets) {
    extra = `<div class="table-wrap"><table class="mini"><thead><tr><th>H₂O : CF₄ sccm</th><th>H₂O %</th><th>넣을 UI</th></tr></thead><tbody>${
      p.targets.map(([h, c]) => {
        const hu = h2oUi(h), cu = cf4Ui(c), hui = Math.round(hu * 10) / 10;
        return `<tr><td class="n">${h} : ${c}</td><td class="n">${Math.round(h / (h + c) * 100)}</td><td class="n"><b>${fmt(hui)} : ${fmt(cu)}</b>${flagChip(h2oFlag(hui))}</td></tr>`;
      }).join('')}</tbody></table></div>`;
  }
  return `<div class="plan"><div class="hh"><span class="hid">${esc(p.id)}</span>${p.temp != null ? `<span class="chip">${temp(p.temp)}</span>` : ''}</div>
<p><b>${esc(p.what)}</b></p><p class="muted">${esc(p.why)}</p>${extra}</div>`;
}

const calibRows = h2oPts.sort((a, b) => a.ui - b.ui).map(p => `<tr><td class="n">UI ${p.ui}</td><td class="n">${p.sccm} sccm</td><td>${p.state === '확정' ? `<span class="st yes">확정</span> <span class="muted">${p.date}</span>` : `<span class="st wait">${p.state}</span>`}</td></tr>`).join('');

const chartTable = `<table class="mini"><thead><tr><th>온도</th>${films.map(f => `<th>${f} 순변화 (Å)</th>`).join('')}</tr></thead><tbody>${
  tempRuns.map(x => `<tr><td class="n">${temp(x.temp)}</td>${films.map(f => `<td class="n">${fmt(x.result[f].net, 2)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>SiOCN 연구 — 반도체 백과 작업실</title>
<style>
:root {
  --bg: #f7f7f4; --card: #ffffff; --ink: #1d2126; --sub: #5d6672; --line: #e2e5e9;
  --accent: #2563eb; --accent-soft: #eef3fe; --chip: #eef0f3;
  --cds-chart-grid: #e2e5e9; --cds-chart-reference-tint: #eef0f3;
  --series-1: #2f7fc4; --series-2: #e08a2e;
  --ok: #1f7a3d; --ok-bg: #e6f4ea; --warn: #9a5b00; --warn-bg: #fdf1dc; --no: #a83232; --no-bg: #fbe7e7; --idea: #6b4fa8; --idea-bg: #efeafa;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #131518; --card: #1b1e23; --ink: #e8eaed; --sub: #9aa3ad; --line: #2c3037;
    --accent: #6ea8fe; --accent-soft: #1d2739; --chip: #262a31;
    --cds-chart-grid: #2c3037; --cds-chart-reference-tint: #23272d;
    --series-1: #3a8ad0; --series-2: #b87d24;
    --ok: #7bd194; --ok-bg: #1b2e22; --warn: #f0b860; --warn-bg: #33281a; --no: #f08b8b; --no-bg: #362020; --idea: #c0a8f0; --idea-bg: #29223a;
  }
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: -apple-system, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif; line-height: 1.6; }
a { color: var(--accent); text-decoration: none; } a:hover { text-decoration: underline; }
header.top { position: sticky; top: 0; background: var(--bg); border-bottom: 1px solid var(--line); z-index: 5; }
header.top .in { max-width: 1040px; margin: 0 auto; padding: 10px 16px; display: flex; gap: 14px; align-items: baseline; flex-wrap: wrap; }
header.top .brand { font-weight: 800; font-size: 16px; color: var(--ink); }
header.top nav a { font-size: 13.5px; margin-right: 12px; color: var(--sub); }
main { max-width: 1040px; margin: 0 auto; padding: 18px 16px 60px; }
.draft { background: var(--warn-bg); color: var(--warn); border-radius: 10px; padding: 8px 14px; font-size: 13.5px; margin-bottom: 14px; }
h1 { font-size: 28px; margin: 4px 0 0; line-height: 1.25; }
.en { color: var(--sub); font-size: 14px; }
.goal { margin: 10px 0 0; font-size: 15.5px; }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 16px 0 4px; }
.stat { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 10px 14px; }
.stat .k { color: var(--sub); font-size: 12.5px; } .stat .v { font-size: 20px; font-weight: 800; } .stat .v.s { font-size: 15px; }
section { margin-top: 30px; scroll-margin-top: 56px; }
section > h2 { font-size: 20px; margin: 0 0 10px; padding-bottom: 6px; border-bottom: 2px solid var(--line); }
section > h2 .count { color: var(--sub); font-size: 13px; font-weight: 400; margin-left: 6px; }
.grid2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px; }
.hyp, .plan, .box { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 10px 14px; }
.hyp.no { opacity: .75; } .hyp p, .plan p { margin: 6px 0; font-size: 14.5px; }
.hh { display: flex; gap: 8px; align-items: center; }
.hid { font-weight: 800; font-size: 13px; color: var(--sub); }
.test { color: var(--sub); font-size: 13.5px !important; }
.st, .chip, .flag { display: inline-block; border-radius: 999px; padding: 1px 9px; font-size: 12px; font-weight: 700; white-space: nowrap; }
.chip { background: var(--chip); color: var(--sub); font-weight: 600; }
.st.yes { background: var(--ok-bg); color: var(--ok); } .st.run, .st.hint { background: var(--accent-soft); color: var(--accent); }
.st.wait { background: var(--chip); color: var(--sub); } .st.no { background: var(--no-bg); color: var(--no); } .st.idea { background: var(--idea-bg); color: var(--idea); }
.flag { margin-left: 4px; font-size: 11px; padding: 0 7px; } .flag.ext { background: var(--warn-bg); color: var(--warn); } .flag.tbd { background: var(--chip); color: var(--sub); }
.muted { color: var(--sub); } .ui { color: var(--sub); font-size: 12px; }
.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; font-size: 13.5px; background: var(--card); }
th, td { border-bottom: 1px solid var(--line); padding: 7px 9px; text-align: left; vertical-align: top; }
th { background: var(--chip); font-size: 12.5px; color: var(--sub); white-space: nowrap; }
td.n { font-variant-numeric: tabular-nums; white-space: nowrap; }
.runs-box { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
#runs-t { min-width: 880px; }
table.mini { margin-top: 8px; border: 1px solid var(--line); border-radius: 8px; }
.filters { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.filters button { border: 1px solid var(--line); background: var(--card); color: var(--ink); border-radius: 999px; padding: 4px 12px; font-size: 13px; cursor: pointer; }
.filters button[aria-pressed="true"] { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); font-weight: 700; }
.fig { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; }
.fig svg { width: 100%; max-width: 680px; height: auto; display: block; margin: 0 auto; }
.fig .ax { fill: var(--sub); font-size: 12px; } .fig .lab { fill: var(--ink); font-size: 13px; font-weight: 700; }
.fig .pt { cursor: default; } .fig .pt:hover circle:last-of-type { r: 7; }
.fig figcaption { color: var(--sub); font-size: 13px; margin-top: 6px; }
.legend { display: flex; gap: 14px; font-size: 13px; margin-bottom: 4px; } .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; vertical-align: -1px; }
details summary { cursor: pointer; color: var(--sub); font-size: 13px; margin-top: 8px; }
ul.plain { margin: 0; padding-left: 18px; } ul.plain li { margin: 3px 0; font-size: 14.5px; }
.tl { list-style: none; margin: 0; padding: 0; } .tl li { padding: 8px 0; border-bottom: 1px solid var(--line); font-size: 14.5px; } .tl .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.tl li:last-child { border-bottom: 0; } .tl .w { font-weight: 700; }
.dec li { display: flex; gap: 12px; } .dec .d { color: var(--sub); font-variant-numeric: tabular-nums; white-space: nowrap; font-size: 13px; }
.links a { display: inline-block; margin: 4px 14px 4px 0; }
footer { max-width: 1040px; margin: 0 auto; padding: 0 16px 40px; color: var(--sub); font-size: 12.5px; }
@media (max-width: 640px) { h1 { font-size: 23px; } }
</style></head>
<body>
<header class="top"><div class="in"><a class="brand" href="../../home/">반도체 백과 작업실</a>
<nav><a href="#hyp">가설</a><a href="#plan">다음 실험</a><a href="#runs">실험 기록</a><a href="#eq">장비·보정</a><a href="#road">로드맵</a></nav></div></header>
<main>
${D.meta.draft ? '<div class="draft">가편본 — 구조 확인용입니다. 수치는 노션 원본(실험 보드·장비 페이지) 기준이며 아직 배포 전입니다.</div>' : ''}
<h1>${esc(D.meta.title)}</h1>
<div class="en">${esc(D.meta.en)}</div>
<p class="goal">${esc(D.meta.goal)}</p>
<div class="stats">
<div class="stat"><div class="k">성공 기준</div><div class="v s">${esc(D.meta.target.replace(/ \(.*\)/, ''))}</div></div>
<div class="stat"><div class="k">현재 단계</div><div class="v s">${esc(D.meta.stage)}</div></div>
<div class="stat"><div class="k">실험 기록</div><div class="v">${done}<span class="muted" style="font-size:13px;font-weight:400"> 완료 · ${pending} 정리 대기</span></div></div>
<div class="stat"><div class="k">열린 가설</div><div class="v">${hypOpen}</div></div>
<div class="stat"><div class="k">최근 런</div><div class="v s">${esc(lastRun)}</div></div>
</div>

<section id="hyp"><h2>가설과 판정<span class="count">${D.hypotheses.length}개</span></h2>
<div class="grid2">${hypRows}</div></section>

<section id="plan"><h2>다음 실험<span class="count">${D.plans.length}건</span></h2>
<div class="grid2">${D.plans.map(planBlock).join('')}</div>
<p class="muted" style="font-size:13px">넣을 UI는 보정표(H₂O 기울기 ${fmt(slope)} sccm/UI, CF₄ ×${D.calib.cf4.factor})로 자동 계산합니다. <span class="flag ext">외삽</span>은 실측 전 값입니다.</p></section>

<section id="runs"><h2>실험 기록<span class="count">${D.runs.length}건</span></h2>
<div class="filters" role="group" aria-label="온도 필터">
<button data-f="all" aria-pressed="true">전체</button><button data-f="-20" aria-pressed="false">−20 °C</button><button data-f="0" aria-pressed="false">0 °C</button><button data-f="20" aria-pressed="false">+20 °C</button><button data-f="pending" aria-pressed="false">정리 대기</button></div>
<div class="runs-box table-wrap"><table id="runs-t"><thead><tr><th>런</th><th>상태</th><th>척 온도</th><th>파워</th><th>압력</th><th>H₂O : CF₄ (실제)</th><th>Modi · 사이클</th><th>결과 Δ (Å, + = 식각)</th><th>메모</th></tr></thead>
<tbody>${runRows}</tbody></table></div>
<p class="muted" style="font-size:13px">M = Modi 단계 Δ, R = RTP 단계 Δ. 결과는 막별로 같은 쿠폰 기준입니다.</p>

<figure class="fig" style="margin:16px 0 0">
<div class="legend">${films.map((f, i) => `<span><i style="background:var(--series-${i + 1})"></i>${f}</span>`).join('')}</div>
${tempChart()}
<figcaption>11/01 온도별 1패스(Modi 5분 + RTP) 순변화. 모두 n=1이고 회색 띠(±10 Å) 안이라 방향 참고용입니다. 점에 마우스를 올리면 단계별 Δ가 보입니다.</figcaption>
<details><summary>표로 보기</summary>${chartTable}</details>
</figure></section>

<section id="eq"><h2>장비·보정</h2>
<div class="grid2">
<div class="box"><b>공정 개요</b><ul class="plain" style="margin-top:6px">${D.process.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
<div class="box"><b>H₂O 보정 (UI → 실제)</b>
<table class="mini"><tbody>${calibRows}</tbody></table>
<p class="muted" style="font-size:13px">${esc(D.calib.h2o.note)}</p>
<b>CF₄</b><p class="muted" style="font-size:13px;margin:4px 0">${esc(D.calib.cf4.note)}</p></div>
</div></section>

<section id="road"><h2>로드맵과 결정</h2>
<div class="grid2">
<div class="box"><ol class="tl">${D.roadmap.map(x => `<li><div class="row"><span class="w">${esc(x.when)}</span><span class="st ${x.state === '진행 중' ? 'run' : 'wait'}">${esc(x.state)}</span></div><div>${esc(x.what)}</div></li>`).join('')}</ol></div>
<div class="box"><b>결정 기록</b><ul class="plain dec" style="list-style:none;padding:0;margin-top:6px">${[...D.decisions].reverse().map(x => `<li><span class="d">${esc(x.date)}</span><span>${esc(x.what)}</span></li>`).join('')}</ul></div>
</div>
<p class="links">${D.links.map(l => `<a href="${esc(l.url)}"${/^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : ''}>${esc(l.name)} →</a>`).join('')}</p>
</section>
</main>
<footer>원본: research/siocn/data.json · 빌드: tools/build_research.mjs · 갱신 ${esc(D.meta.updated)}</footer>
<script>
document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  const f = b.dataset.f;
  document.querySelectorAll('#runs-t tbody tr').forEach(tr => {
    tr.hidden = !(f === 'all' || (f === 'pending' ? tr.dataset.status !== '완료' : tr.dataset.temp === f));
  });
}));
</script>
</body></html>
`;
fs.writeFileSync(r('research/siocn/index.html'), html);
console.log(`✓ research/siocn — 런 ${D.runs.length} (완료 ${done}), 가설 ${D.hypotheses.length}, 계획 ${D.plans.length}, H₂O 기울기 ${slope} sccm/UI`);
