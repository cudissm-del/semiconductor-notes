// 연구 대시보드 빌더 — research/siocn/data.json → research/siocn/index.html
// 원본은 data.json만 고친다. 유량은 보정표로 자동 환산한다 (UI값 ≠ 실제 sccm).
// 2026-11-05: Claude 가편 + Joy판(joy/packages 9ad593f) 병합 — 탭 메뉴·조건 지도·측정 기준·논문·쿠폰 이력.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = p => path.join(ROOT, p);
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const D = JSON.parse(fs.readFileSync(r('research/siocn/data.json'), 'utf8'));
const warn = m => console.warn('⚠ research/siocn: ' + m);

// ── 표기 ──────────────────────────────────────────────────
const NA = '<span class="na">기록 없음</span>';
const num = (x, d = 2) => x == null ? null : (Math.round(x * 10 ** d) / 10 ** d).toString().replace('-', '−');
const fmt = (x, d = 2) => x == null ? NA : num(x, d);
const temp = t => t == null ? NA : `${t > 0 ? '+' : ''}${num(t, 0)} °C`;
const tempTxt = t => t == null ? '온도 기록 없음' : `${t > 0 ? '+' : ''}${num(t, 0)} °C`;
const modiTxt = s => s == null ? null : s < 60 || s % 60 ? `${s}초` : `${s / 60}분`;
const FILMS = ['SiOCN', '구 SiOC', 'SiO₂', 'New SiOC'];

// ── 유량 환산 ─────────────────────────────────────────────
const hp = D.calib.h2o.points;
const ok = hp.filter(p => p.state === '확정').sort((a, b) => a.ui - b.ui);
const slope = (ok.at(-1).sccm - ok[0].sccm) / (ok.at(-1).ui - ok[0].ui);
const h2oSccm = ui => ok[0].sccm + slope * (ui - ok[0].ui);
const h2oUi = sccm => ok[0].ui + (sccm - ok[0].sccm) / slope;
const h2oFlag = ui => { const p = hp.find(x => x.ui === ui); return p ? (p.state === '확정' ? '' : p.state) : '외삽'; };
const cf4Sccm = ui => ui * D.calib.cf4.factor;
const flag = f => f ? `<span class="flag ${f === '외삽' ? 'ext' : 'tbd'}">${f}</span>` : '';
function gas(run, compact) {
  if (run.h2o_ui == null && run.cf4_ui == null) return NA;
  const h = run.h2o_ui != null ? `${num(h2oSccm(run.h2o_ui), 1)}${flag(h2oFlag(run.h2o_ui))}` : '?';
  const c = run.cf4_ui != null ? num(cf4Sccm(run.cf4_ui), 1) : '?';
  const ui = `UI ${run.h2o_ui ?? '?'} : ${run.cf4_ui ?? '?'}`;
  return compact ? `${h} : ${c}` : `<b>${h} : ${c}</b> <span class="muted">sccm</span><div class="ui">${ui}</div>`;
}

// ── 선택비 ────────────────────────────────────────────────
function sel(run) {
  const a = run.res?.SiOCN?.v, b = run.res?.['구 SiOC']?.v;
  if (a == null || b == null) return null;
  const lo = (run.flags || []).includes('하한');
  if (b <= 0) return { txt: '구 SiOC 성장', cls: 'grow' };
  if (a <= 0) return { txt: 'SiOCN 성장', cls: 'rev' };
  const s = a / b;
  return { txt: `${lo ? '≥ ' : ''}${num(s, 2)}`, cls: s >= 10 ? 'goal' : s > 1 ? 'pos' : 'rev', v: s, lo };
}
const selChip = s => s ? `<span class="sel ${s.cls}">${esc(s.txt)}</span>` : NA;

// ── 참조 무결성 ───────────────────────────────────────────
const runById = Object.fromEntries(D.runs.map(x => [x.id, x]));
const paperById = Object.fromEntries(D.papers.map(x => [x.id, x]));
const hypById = Object.fromEntries(D.hypotheses.map(x => [x.id, x]));
for (const h of D.hypotheses) {
  for (const id of h.runs) if (!runById[id]) warn(`${h.id}: 없는 런 ${id}`);
  for (const id of h.papers) if (!paperById[id]) warn(`${h.id}: 없는 논문 ${id}`);
}
for (const p of D.plans) for (const id of p.hyp) if (!hypById[id]) warn(`${p.id}: 없는 가설 ${id}`);
for (const c of D.coupons) for (const h of c.history) if (!runById[h.run]) warn(`${c.id}: 없는 런 ${h.run}`);

// 논문 → 백과 항목 (DOI가 본문에 인용된 항목)
const entries = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.md')) {
      const t = fs.readFileSync(p, 'utf8'), m = t.match(/^---[\s\S]*?^title:\s*(.+)$/m);
      entries.push({ slug: path.basename(f.name, '.md'), title: m ? m[1].trim() : path.basename(f.name, '.md'), text: t.toLowerCase() });
    }
  }
})(r('content/entries'));
for (const p of D.papers) {
  p.entries = entries.filter(e => e.text.includes(p.doi.toLowerCase())).map(e => ({ slug: e.slug, title: e.title }));
  p.hyps = D.hypotheses.filter(h => h.papers.includes(p.id)).map(h => h.id);
  if (!p.entries.length) warn(`논문 ${p.id}: 백과 본문 인용 없음 — DOI 대조 확인 필요`);
}

// ── 현황 ──────────────────────────────────────────────────
const done = D.runs.filter(x => x.status === '완료');
const pending = D.runs.filter(x => x.status !== '완료');
const best = done.map(x => ({ x, s: sel(x) })).filter(o => o.s?.v != null).sort((a, b) => b.s.v - a.s.v)[0];
const hc = st => D.hypotheses.filter(h => h.status === st).length;
const lastRun = done.map(x => x.date).filter(Boolean).sort().at(-1);

// ── 그림 ──────────────────────────────────────────────────
const SHAPES = [
  (x, y, c) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}" stroke="var(--card)" stroke-width="2"/>`,
  (x, y, c) => `<rect x="${x - 4.5}" y="${y - 4.5}" width="9" height="9" rx="1.5" fill="${c}" stroke="var(--card)" stroke-width="2"/>`,
  (x, y, c) => `<path d="M${x} ${y - 6} L${x + 5.5} ${y + 4} L${x - 5.5} ${y + 4} Z" fill="${c}" stroke="var(--card)" stroke-width="2"/>`,
];
const legendIcon = i => `<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">${SHAPES[i](7, 7.5, `var(--s${i + 1})`)}</svg>`;
function lineChart({ rows, xOf, xTick, films, yLabel, aria, xLabel }) {
  const W = 640, H = 300, L = 58, R = 92, T = 18, B = 50;
  const xsv = rows.map(xOf), lo = Math.min(...xsv), hi = Math.max(...xsv);
  const vals = rows.flatMap(x => films.map(f => x.res[f]?.v)).filter(v => v != null);
  const yMin = Math.min(-12, Math.floor((Math.min(...vals) - 3) / 5) * 5), yMax = Math.max(12, Math.ceil((Math.max(...vals) + 3) / 5) * 5);
  const X = v => L + (v - lo) / (hi - lo || 1) * (W - L - R), Y = v => T + (yMax - v) / (yMax - yMin) * (H - T - B);
  let g = `<rect x="${L}" y="${Y(10)}" width="${W - L - R}" height="${Y(-10) - Y(10)}" fill="var(--band)"/>`;
  g += `<text x="${L + 6}" y="${Y(10) + 13}" class="ax">±10 Å 판정 오차</text>`;
  const step = yMax - yMin > 40 ? 10 : 5;
  for (let v = Math.ceil(yMin / step) * step; v <= yMax; v += step) {
    g += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--grid)" stroke-width="${v === 0 ? 1.4 : 1}"/>`;
    g += `<text x="${L - 8}" y="${Y(v) + 4}" text-anchor="end" class="ax">${num(v, 0)}</text>`;
  }
  for (const x of rows) g += `<text x="${X(xOf(x))}" y="${H - B + 20}" text-anchor="middle" class="ax">${esc(xTick(x))}</text>`;
  if (xLabel) g += `<text x="${L + (W - L - R) / 2}" y="${H - 8}" text-anchor="middle" class="ax">${esc(xLabel)}</text>`;
  g += `<text transform="translate(16 ${T + (H - T - B) / 2}) rotate(-90)" text-anchor="middle" class="ax">${esc(yLabel)}</text>`;
  const ends = [];
  films.forEach((f, i) => {
    const c = `var(--s${i + 1})`, pts = rows.filter(x => x.res[f]?.v != null).map(x => [X(xOf(x)), Y(x.res[f].v), x]);
    g += `<polyline fill="none" stroke="${c}" stroke-width="2" points="${pts.map(p => p.slice(0, 2).join(',')).join(' ')}"/>`;
    for (const [px, py, x] of pts) {
      const v = x.res[f];
      const extra = v.modi != null ? ` (Modi ${num(v.modi)} / RTP ${num(v.rtp)})` : v.rtp != null ? ` · RTP Δ ${num(v.rtp)}` : '';
      g += `<g class="pt"><circle cx="${px}" cy="${py}" r="13" fill="transparent"/>${SHAPES[i](px, py, c)}<title>${esc(f)} · ${esc(xTick(x))}\nΔ ${num(v.v)} Å${esc(extra)}</title></g>`;
    }
    if (pts.length) ends.push({ f, y: pts.at(-1)[1], x: pts.at(-1)[0] });
  });
  ends.sort((a, b) => a.y - b.y).forEach((e, k, arr) => { if (k && e.y - arr[k - 1].y < 15) e.y = arr[k - 1].y + 15; g += `<text x="${e.x + 10}" y="${e.y + 4}" class="lab">${esc(e.f)}</text>`; });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">${g}</svg>`;
}
function figure({ id, title, rows, films, chart, caption }) {
  if (!rows.length) return '';
  const table = `<table class="mini"><thead><tr><th>조건</th>${films.map(f => `<th>${esc(f)} Δ (Å)</th>`).join('')}</tr></thead><tbody>${
    rows.map(x => `<tr><td>${esc(chart.xTick(x))}</td>${films.map(f => `<td class="n">${fmt(x.res[f]?.v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  return `<figure class="fig" id="${id}"><figcaption class="ft">${esc(title)}</figcaption>
<div class="legend">${films.map((f, i) => `<span>${legendIcon(i)}${esc(f)}</span>`).join('')}</div>
${lineChart({ rows, films, ...chart })}
<figcaption>${esc(caption)}</figcaption><details><summary>표로 보기</summary>${table}</details></figure>`;
}
const modiRows = D.runs.filter(x => x.series === 'modi1104').sort((a, b) => a.modi - b.modi);
const tempRows = D.runs.filter(x => x.series === 'temp1101').sort((a, b) => a.temp - b.temp);
const figs = figure({
  id: 'fig-modi', title: '11/04 Modi 단독 시간 시리즈 — −20 °C · 50 W · 16:16 sccm', rows: modiRows, films: ['SiOCN', '구 SiOC', 'SiO₂'],
  chart: { xOf: x => x.modi, xTick: x => modiTxt(x.modi), yLabel: 'Modi Δ (Å, + = 식각)', xLabel: 'Modi 시간 (비례 축)', aria: '11월 4일 Modi 시간별 두께 변화' },
  caption: '30초 순성장 → 식각 전환·가속. 240 → 480초에서 SiOCN이 포화 없이 늘어 H12(자기제한)와 맞지 않는다. 시점마다 별도 새 쿠폰이라 누적 궤적이 아닌 독립 점이다.',
}) + figure({
  id: 'fig-temp', title: '11/01 온도별 1패스 순변화 — Modi 5분 + RTP, H₂O UI 6', rows: tempRows, films: ['SiOCN', '구 SiOC'],
  chart: { xOf: x => x.temp, xTick: x => tempTxt(x.temp), yLabel: '순변화 Δ (Å, + = 식각)', aria: '11월 1일 온도별 순변화' },
  caption: '모두 n=1이고 ±10 Å 띠 안이라 방향 참고용이다. 점에 마우스를 올리면 Modi·RTP 단계 Δ가 보인다.',
});

// ── 실험 기록 표 ──────────────────────────────────────────
const resCell = run => {
  const ks = FILMS.filter(f => run.res?.[f]);
  if (!ks.length) return NA;
  const unit = run.kind === 'epc' ? 'Å/cyc' : 'Å';
  return ks.map(f => {
    const v = run.res[f];
    const main = v.v != null ? `<b>${num(v.v)}</b>${v.sd != null ? ` ± ${num(v.sd)}` : ''}` : '';
    const parts = [v.modi != null ? `M ${num(v.modi)}` : '', v.rtp != null ? `R ${num(v.rtp)}` : ''].filter(Boolean).join(' / ');
    const step = parts ? (main ? ` <span class="muted">(${parts})</span>` : `<span class="muted">${parts}</span>`) : '';
    return `<div class="${f === 'New SiOC' ? 'old' : ''}">${esc(f)} ${main}${step}</div>`;
  }).join('') + `<div class="ui">${unit}</div>`;
};
const runOrder = [...D.runs].sort((a, b) => (b.date || '0').localeCompare(a.date || '0') || (a.modi ?? 0) - (b.modi ?? 0) || (a.temp ?? 0) - (b.temp ?? 0));
const runRows = runOrder.map(x => `<tr id="run-${esc(x.id)}" data-temp="${x.temp ?? 'na'}" data-kind="${x.kind}" data-status="${esc(x.status)}">
<td><b>${esc(x.id)}</b><div class="muted">${x.date ? esc(x.date) : NA}</div>${x.status !== '완료' ? `<span class="st wait">${esc(x.status)}</span>` : ''}</td>
<td class="n">${temp(x.temp)}</td>
<td class="n">${x.power != null ? x.power + ' W' : NA}<div class="ui">${x.pressure != null ? x.pressure + ' mTorr' : '압력 기록 없음'}</div></td>
<td>${gas(x)}</td>
<td>${esc(x.mode)}<div class="ui">Modi ${modiTxt(x.modi) ?? '기록 없음'} · ${x.cycles != null ? x.cycles + '사이클' : '사이클 기록 없음'}</div></td>
<td>${resCell(x)}</td>
<td>${selChip(sel(x))}${(x.flags || []).map(f => `<span class="flag ext">${esc(f)}</span>`).join('')}</td>
<td class="note">${x.dir ? esc(x.dir) : ''}${x.note ? `<div class="muted">${esc(x.note)}</div>` : ''}${
  D.hypotheses.filter(h => h.runs.includes(x.id)).map(h => `<a class="chip hy" href="#hyp-${h.id}">${h.id}</a>`).join('')}</td></tr>`).join('');

// 쿠폰 이력
const couponRows = D.coupons.map(c => {
  const last = c.history.at(-1), left = last ? last.after : c.start;
  const risk = left < 30 ? '<span class="flag ext">소진 위험</span>' : '';
  const chain = c.history.map((h, i) => {
    const brk = i && c.history[i - 1].after !== h.before ? '<span class="flag ext">체인 끊김</span>' : '';
    return `${brk}<a href="#run-${esc(h.run)}">${esc(h.run)}</a> ${num(h.before)} → ${num(h.after)}`;
  }).join(' · ');
  return `<tr><td><b>${esc(c.id)}</b></td><td>${esc(c.film)}</td><td class="n">${num(c.start)}</td><td class="n"><b>${num(left)}</b> ${risk}</td><td>${chain}</td><td class="muted">${esc(c.note)}</td></tr>`;
}).join('');

// ── 조건 지도 (피벗: 온도·파워·H₂O × Modi 시간) ───────────
const keyOf = x => `${x.temp ?? 'na'}|${x.power ?? 'na'}|${x.h2o_ui ?? 'na'}`;
const mapRuns = D.runs.filter(x => x.status === '완료' && x.temp != null);
const rowKeys = [...new Set(mapRuns.map(keyOf))].sort((a, b) => {
  const [ta, pa, ha] = a.split('|'), [tb, pb, hb] = b.split('|');
  return (+tb - +ta) || ((+pa || 0) - (+pb || 0)) || ((+ha || 0) - (+hb || 0));
});
const colKeys = [...new Set(mapRuns.map(x => x.modi ?? 'na'))].sort((a, b) => (a === 'na') - (b === 'na') || a - b);
const temps = [...new Set(D.runs.map(x => x.temp).filter(t => t != null))].sort((a, b) => a - b);
const h2os = [...new Set(D.runs.map(x => x.h2o_ui).filter(t => t != null))].sort((a, b) => a - b);
const pows = [...new Set(D.runs.map(x => x.power).filter(t => t != null))].sort((a, b) => a - b);
const cellOf = runs => runs.map(x => {
  const s = sel(x);
  return `<a class="cell ${s ? s.cls : 'none'}" href="#run-${esc(x.id)}" title="${esc(x.id + ' · ' + x.mode + (x.dir ? ' · ' + x.dir : ''))}">
<span class="cm">${esc(x.mode.replace(/ \(.*\)/, ''))}${x.cycles > 1 && !x.mode.includes('×') ? ` ×${x.cycles}` : ''}</span>${s ? `<b>${esc(s.txt)}</b>` : `<span class="muted">${esc(x.dir || '—')}</span>`}</a>`;
}).join('');
const mapTable = `<table class="map"><thead><tr><th>척 온도 · 파워 · H₂O</th>${colKeys.map(c => `<th>${c === 'na' ? 'Modi 기록 없음' : 'Modi ' + modiTxt(c)}</th>`).join('')}</tr></thead><tbody>${
  rowKeys.map(k => {
    const [t, p, h] = k.split('|'), rs = mapRuns.filter(x => keyOf(x) === k);
    return `<tr><th class="rk">${tempTxt(t === 'na' ? null : +t)}<div class="ui">${p === 'na' ? '파워 기록 없음' : p + ' W'} · ${h === 'na' ? 'H₂O 기록 없음' : `H₂O ${num(h2oSccm(+h), 1)} sccm (UI ${h})`}</div></th>${
      colKeys.map(c => { const cr = rs.filter(x => (x.modi ?? 'na') === c); return `<td>${cr.length ? cellOf(cr) : '<span class="empty">미시도</span>'}</td>`; }).join('')}</tr>`;
  }).join('')}</tbody></table>`;

// ── 가설 ──────────────────────────────────────────────────
const ST = { '재현됨': 'yes', '기각됨': 'no', '미해소': 'run', '아이디어': 'idea' };
const hypCard = h => `<article class="hyp ${ST[h.status]}" id="hyp-${h.id}" data-status="${esc(h.status)}">
<div class="hh"><span class="hid">${esc(h.id)}</span><span class="st ${ST[h.status]}">${esc(h.status)}</span><span class="muted sm">${esc(h.by)} · ${esc(h.asof)}</span></div>
<p class="stm">${esc(h.statement)}</p><p class="ev"><b>근거</b> ${esc(h.evidence)}</p>
<div class="refs">${h.runs.map(id => `<a class="chip" href="#run-${esc(id)}">${esc(id)}</a>`).join('')}${
  h.papers.map(id => `<a class="chip pp" href="#paper-${esc(id)}">${esc(paperById[id]?.authors.split(' ')[0] || id)} ${paperById[id]?.year || ''}</a>`).join('')}</div></article>`;
const hypOrder = ['미해소', '아이디어', '재현됨', '기각됨'];
const hyps = [...D.hypotheses].sort((a, b) => hypOrder.indexOf(a.status) - hypOrder.indexOf(b.status));

// ── 다음 실험 ─────────────────────────────────────────────
function planCard(p) {
  let extra = '';
  if (p.targets) extra = `<table class="mini"><thead><tr><th>H₂O : CF₄ sccm</th><th>H₂O %</th><th>넣을 UI</th></tr></thead><tbody>${
    p.targets.map(([h, c]) => { const hu = Math.round(h2oUi(h) * 10) / 10; return `<tr><td class="n">${h} : ${c}</td><td class="n">${Math.round(h / (h + c) * 100)}</td><td class="n"><b>${num(hu, 1)} : ${num(c / D.calib.cf4.factor, 1)}</b>${flag(h2oFlag(hu))}</td></tr>`; }).join('')}</tbody></table>`;
  return `<article class="plan ${p.status === '보류' ? 'hold' : ''}"><div class="hh"><span class="hid">${esc(p.id)}</span><span class="st ${p.status === '보류' ? 'wait' : 'idea'}">${esc(p.status)}</span>${p.temp != null ? `<span class="chip">${tempTxt(p.temp)}</span>` : ''}</div>
<p><b>${esc(p.what)}</b></p><p class="muted">${esc(p.why)}</p>${extra}
${p.hyp.length ? `<div class="refs">${p.hyp.map(id => `<a class="chip hy" href="#hyp-${id}">${id}</a>`).join('')}</div>` : ''}</article>`;
}

// ── 논문 ──────────────────────────────────────────────────
const paperRows = [...D.papers].sort((a, b) => b.year - a.year).map(p => `<tr id="paper-${esc(p.id)}">
<td><b>${esc(p.authors)}</b> <span class="muted">(${p.year})</span><div>${esc(p.title)}</div><div class="ui">${esc(p.journal)} · <a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">doi:${esc(p.doi)}</a></div></td>
<td>${esc(p.note)}</td>
<td>${p.hyps.map(id => `<a class="chip hy" href="#hyp-${id}">${id}</a>`).join('') || '<span class="muted">—</span>'}</td>
<td>${p.entries.map(e => `<a class="chip" href="../../v2/e/${esc(e.slug)}.html">${esc(e.title)}</a>`).join('') || '<span class="flag ext">본문 인용 없음</span>'}</td></tr>`).join('');

// ── 페이지 ────────────────────────────────────────────────
const TABS = [['overview', '개요'], ['timeline', '타임라인'], ['runs', '실험 기록'], ['map', '조건 지도'], ['hyp', '가설'], ['plan', '다음 실험'], ['rules', '측정 기준'], ['papers', '논문']];
const O = D.overview;
const sec = (id, title, body, count) => `<section id="${id}" class="tab">${title ? `<h2>` : ''}${title ? `${esc(title)}${count != null ? `<span class="count">${count}</span>` : ''}</h2>` : ''}${body}</section>`;

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>SiOCN 연구 — 반도체 백과 작업실</title>
<style>
:root {
  --bg: #f7f7f4; --card: #ffffff; --ink: #1d2126; --sub: #5d6672; --line: #e2e5e9;
  --accent: #2563eb; --accent-soft: #eef3fe; --chip: #eef0f3; --grid: #e2e5e9; --band: #eef0f3;
  --s1: #2f7fc4; --s2: #e08a2e; --s3: #a8509a;
  --ok: #1f7a3d; --ok-bg: #e6f4ea; --warn: #9a5b00; --warn-bg: #fdf1dc; --no: #a83232; --no-bg: #fbe7e7; --idea: #6b4fa8; --idea-bg: #efeafa;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #131518; --card: #1b1e23; --ink: #e8eaed; --sub: #9aa3ad; --line: #2c3037;
    --accent: #6ea8fe; --accent-soft: #1d2739; --chip: #262a31; --grid: #2c3037; --band: #23272d;
    --s1: #3a8ad0; --s2: #b87d24; --s3: #b062a6;
    --ok: #7bd194; --ok-bg: #1b2e22; --warn: #f0b860; --warn-bg: #33281a; --no: #f08b8b; --no-bg: #362020; --idea: #c0a8f0; --idea-bg: #29223a;
  }
}
* { box-sizing: border-box; }
html { scroll-padding-top: 100px; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: -apple-system, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif; line-height: 1.6; }
a { color: var(--accent); text-decoration: none; } a:hover { text-decoration: underline; }
header.top { position: sticky; top: 0; background: var(--bg); border-bottom: 1px solid var(--line); z-index: 5; }
header.top .in { max-width: 1080px; margin: 0 auto; padding: 8px 16px 0; }
.brandrow { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; }
.brand { font-weight: 800; font-size: 15px; color: var(--ink); } .brandrow .t { font-weight: 700; } .brandrow .muted { font-size: 12.5px; }
nav.tabs { display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; margin-top: 4px; }
nav.tabs::-webkit-scrollbar { display: none; }
nav.tabs a { flex: none; padding: 8px 12px; font-size: 14px; color: var(--sub); border-bottom: 2px solid transparent; white-space: nowrap; }
nav.tabs a[aria-current="page"] { color: var(--accent); border-color: var(--accent); font-weight: 700; text-decoration: none; }
main { max-width: 1080px; margin: 0 auto; padding: 16px 16px 60px; }
.js .tab { display: none; } .js .tab.on { display: block; }
.tab + .tab { margin-top: 34px; } .js .tab + .tab { margin-top: 0; }
.draft { background: var(--warn-bg); color: var(--warn); border-radius: 10px; padding: 8px 14px; font-size: 13.5px; margin-bottom: 14px; }
h1 { font-size: 26px; margin: 0; line-height: 1.25; } .en { color: var(--sub); font-size: 14px; }
section > h2 { font-size: 20px; margin: 0 0 12px; padding-bottom: 6px; border-bottom: 2px solid var(--line); }
section > h2 .count { color: var(--sub); font-size: 13px; font-weight: 400; margin-left: 8px; }
h3 { font-size: 15.5px; margin: 22px 0 8px; }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 14px 0; }
.stat { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 10px 14px; }
.stat .k { color: var(--sub); font-size: 12.5px; } .stat .v { font-size: 20px; font-weight: 800; line-height: 1.3; } .stat .v.s { font-size: 15px; } .stat .d { color: var(--sub); font-size: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 10px; }
.box, .hyp, .plan, .rule { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 12px 16px; }
.box > b:first-child { display: block; margin-bottom: 4px; }
.mech { background: var(--accent-soft); border-left: 4px solid var(--accent); border-radius: 0 10px 10px 0; padding: 10px 14px; margin: 10px 0; font-size: 15px; }
ul.plain { margin: 4px 0 0; padding-left: 18px; } ul.plain li { margin: 3px 0; font-size: 14.5px; }
.hh { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; } .hid { font-weight: 800; font-size: 13px; color: var(--sub); }
.hyp p, .plan p, .rule p { margin: 6px 0; font-size: 14.5px; } .hyp .ev { color: var(--sub); font-size: 13.5px; }
.hyp.no .stm { text-decoration: line-through; text-decoration-color: var(--sub); } .plan.hold { opacity: .7; }
.hyp:target, tr:target { outline: 2px solid var(--accent); outline-offset: 2px; }
.refs { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.st, .chip, .flag, .sel { display: inline-block; border-radius: 999px; padding: 1px 9px; font-size: 12px; font-weight: 700; white-space: nowrap; }
.chip { background: var(--chip); color: var(--sub); font-weight: 600; margin: 2px 2px 0 0; } .chip.hy { background: var(--accent-soft); color: var(--accent); } .chip.pp { background: var(--idea-bg); color: var(--idea); }
a.chip:hover { text-decoration: none; filter: brightness(.96); }
.st.yes { background: var(--ok-bg); color: var(--ok); } .st.run { background: var(--accent-soft); color: var(--accent); } .st.wait { background: var(--chip); color: var(--sub); } .st.no { background: var(--no-bg); color: var(--no); } .st.idea { background: var(--idea-bg); color: var(--idea); }
.flag { margin-left: 4px; font-size: 11px; padding: 0 7px; } .flag.ext { background: var(--warn-bg); color: var(--warn); } .flag.tbd { background: var(--chip); color: var(--sub); }
.sel { font-variant-numeric: tabular-nums; } .sel.pos { background: var(--ok-bg); color: var(--ok); } .sel.goal { background: var(--ok); color: var(--card); } .sel.rev { background: var(--no-bg); color: var(--no); } .sel.grow { background: var(--chip); color: var(--sub); }
.muted { color: var(--sub); } .sm { font-size: 12px; } .ui { color: var(--sub); font-size: 12px; } .na { color: var(--sub); font-size: 12px; font-style: italic; } .old { color: var(--sub); }
.table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; background: var(--card); }
table { border-collapse: collapse; width: 100%; font-size: 13.5px; background: var(--card); }
th, td { border-bottom: 1px solid var(--line); padding: 7px 9px; text-align: left; vertical-align: top; }
thead th { background: var(--chip); font-size: 12.5px; color: var(--sub); white-space: nowrap; }
td.n { font-variant-numeric: tabular-nums; white-space: nowrap; } td.note { min-width: 200px; font-size: 13px; }
#runs-t { min-width: 980px; } #coupon-t { min-width: 720px; } #paper-t { min-width: 820px; }
table.mini { margin-top: 8px; border: 1px solid var(--line); }
.filters { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 10px; align-items: center; } .filters .lb { color: var(--sub); font-size: 12.5px; margin-right: 2px; }
.filters button { border: 1px solid var(--line); background: var(--card); color: var(--ink); border-radius: 999px; padding: 4px 12px; font-size: 13px; cursor: pointer; font-family: inherit; }
.filters button[aria-pressed="true"] { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); font-weight: 700; }
.figs { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 10px; margin-bottom: 14px; }
.fig { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; margin: 0; }
.fig svg { width: 100%; height: auto; display: block; } .fig .ax { fill: var(--sub); font-size: 12px; } .fig .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
.fig .pt:hover > :last-of-type { opacity: .8; } .fig .ft { color: var(--ink); font-weight: 700; font-size: 14px; margin: 0 0 4px; }
.fig figcaption { color: var(--sub); font-size: 13px; margin-top: 6px; }
.legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 13px; } .legend span { white-space: nowrap; display: inline-flex; gap: 5px; align-items: center; }
details summary { cursor: pointer; color: var(--sub); font-size: 13px; margin-top: 6px; }
table.map { min-width: 760px; } table.map td, table.map th.rk { min-width: 110px; } table.map th.rk { background: var(--card); font-size: 13.5px; white-space: nowrap; }
.cell { display: block; border-radius: 8px; padding: 4px 8px; margin: 2px 0; font-size: 12.5px; color: var(--ink); border: 1px solid var(--line); }
.cell:hover { text-decoration: none; border-color: var(--accent); } .cell .cm { display: block; color: var(--sub); font-size: 11.5px; }
.cell.pos { background: var(--ok-bg); } .cell.goal { background: var(--ok-bg); border-color: var(--ok); } .cell.rev { background: var(--no-bg); }
.empty { color: var(--sub); font-size: 12px; opacity: .6; }
.cover { display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 13.5px; margin: 0 0 10px; } .cover b { margin-right: 4px; }
ol.tl { list-style: none; margin: 0; padding: 0; } ol.tl li { padding: 12px 0 12px 18px; border-left: 2px solid var(--line); position: relative; }
ol.tl li::before { content: ""; position: absolute; left: -6px; top: 18px; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); }
ol.tl .d { color: var(--sub); font-size: 12.5px; font-variant-numeric: tabular-nums; } ol.tl .l { font-weight: 700; } ol.tl p { margin: 3px 0; font-size: 14px; }
ol.tl .vd { background: var(--chip); border-radius: 8px; padding: 4px 10px; font-size: 13.5px; }
.dec li { display: flex; gap: 12px; list-style: none; } .dec .d { color: var(--sub); white-space: nowrap; font-size: 13px; font-variant-numeric: tabular-nums; }
.links a { display: inline-block; margin: 4px 14px 4px 0; }
footer { max-width: 1080px; margin: 0 auto; padding: 0 16px 40px; color: var(--sub); font-size: 12.5px; }
@media (max-width: 640px) { h1 { font-size: 22px; } .figs { grid-template-columns: 1fr; } .grid2 { grid-template-columns: 1fr; } }
@media print { header.top { position: static; } .js .tab { display: block !important; } nav.tabs, .filters { display: none; } }
</style></head>
<body>
<header class="top"><div class="in">
<div class="brandrow"><a class="brand" href="../../home/">반도체 백과 작업실</a><span class="t">${esc(D.meta.title)}</span><span class="muted">데이터 ${esc(D.meta.data_asof)}</span></div>
<nav class="tabs" aria-label="섹션">${TABS.map(([id, n]) => `<a href="#${id}" data-tab="${id}">${n}</a>`).join('')}</nav></div></header>
<main>
${D.meta.draft ? '<div class="draft">개편 가편 — Claude 가편 + Joy판 병합본입니다. 아직 배포 전이며, 수치는 시트·노션 원본에서 옮긴 값입니다.</div>' : ''}

${sec('overview', '', `
<h1>${esc(D.meta.title)}</h1><div class="en">${esc(D.meta.en)}</div>
<div class="stats">
<div class="stat"><div class="k">성공 기준</div><div class="v s">${esc(O.target)}</div><div class="d">${esc(O.target_note)}</div></div>
<div class="stat"><div class="k">지금까지 최고</div><div class="v">${best ? esc(best.s.txt) : '—'}</div><div class="d">${best ? `<a href="#run-${best.x.id}">${esc(best.x.id)}</a>${best.s.lo ? ' · 하한' : ''}` : ''}</div></div>
<div class="stat"><div class="k">현재 단계</div><div class="v s">${esc(O.stage)}</div></div>
<div class="stat"><div class="k">실험 기록</div><div class="v">${done.length}</div><div class="d">완료 · 정리 대기 ${pending.length} · 최근 ${esc(lastRun)}</div></div>
<div class="stat"><div class="k">가설</div><div class="v">${hc('미해소')}<span class="d"> 미해소</span></div><div class="d">재현 ${hc('재현됨')} · 기각 ${hc('기각됨')} · 아이디어 ${hc('아이디어')}</div></div>
</div>
<p style="font-size:15.5px;margin:4px 0">${esc(O.goal)} <span class="muted">${esc(O.starting_point)}</span></p>
<div class="mech">${esc(O.mechanism)}</div>
<div class="grid2">
<div class="box"><b>목표 우선순위</b><ul class="plain">${O.priority.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
<b style="display:block;margin-top:10px">화학계·사이클</b><ul class="plain">${O.chemistry.map(x => `<li>${esc(x)}</li>`).join('')}<li>${esc(O.cycle)}</li></ul></div>
<div class="box"><b>시료</b><ul class="plain">${O.materials.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
<div class="box"><b>장비</b><ul class="plain">${O.equipment.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
<div class="box"><b>유량 보정 (UI → 실제)</b>
<table class="mini"><thead><tr><th>H₂O UI</th><th>실제</th><th>상태</th></tr></thead><tbody>${[...hp].sort((a, b) => a.ui - b.ui).map(p => `<tr><td class="n">UI ${p.ui}</td><td class="n">${p.sccm} sccm</td><td>${p.state === '확정' ? `<span class="st yes">확정</span> <span class="muted sm">${p.date}</span>` : `<span class="st wait">${p.state}</span>`}</td></tr>`).join('')}</tbody></table>
<p class="muted sm" style="margin:6px 0">${esc(D.calib.h2o.note)}</p><p class="sm" style="margin:4px 0"><b>CF₄</b> <span class="muted">${esc(D.calib.cf4.note)}</span></p></div>
</div>
<h3>로드맵</h3>
<div class="table-wrap"><table><tbody>${D.roadmap.map(x => `<tr><td style="width:170px"><b>${esc(x.when)}</b></td><td style="width:90px"><span class="st ${x.state === '진행 중' ? 'run' : 'wait'}">${esc(x.state)}</span></td><td>${esc(x.what)}</td></tr>`).join('')}</tbody></table></div>
<p class="links">${D.links.map(l => `<a href="${esc(l.url)}"${/^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : ''}>${esc(l.name)} →</a>`).join('')}</p>`)}

${sec('timeline', '실험 회차 타임라인', `
<div class="grid2" style="grid-template-columns:minmax(0,2fr) minmax(260px,1fr)">
<ol class="tl">${[...D.timeline].reverse().map(t => `<li><div class="d">${esc(t.date)}</div><div class="l">${esc(t.label)}</div>
<p class="muted">${t.conditions ? esc(t.conditions) : NA}</p><p>${t.result ? esc(t.result) : NA}</p>${t.verdict ? `<p class="vd">${esc(t.verdict)}</p>` : ''}</li>`).join('')}</ol>
<div class="box" style="align-self:start"><b>결정 기록</b><ul class="dec" style="padding:0;margin:6px 0 0">${[...D.decisions].reverse().map(x => `<li><span class="d">${esc(x.date)}</span><span>${esc(x.what)}</span></li>`).join('')}</ul></div>
</div>`, `${D.timeline.length}회차`)}

${sec('runs', '실험 기록', `
<div class="figs">${figs}</div>
<div class="filters" role="group" aria-label="실험 기록 필터"><span class="lb">온도</span>
<button data-f="all" aria-pressed="true">전체</button>${temps.map(t => `<button data-f="t:${t}" aria-pressed="false">${tempTxt(t)}</button>`).join('')}
<span class="lb" style="margin-left:8px">종류</span><button data-f="k:epc" aria-pressed="false">풀사이클 EPC</button><button data-f="k:delta" aria-pressed="false">Δ·총량</button><button data-f="pending" aria-pressed="false">정리 대기</button></div>
<div class="table-wrap"><table id="runs-t"><thead><tr><th>런</th><th>척 온도</th><th>파워 · 압력</th><th>H₂O : CF₄ (실제)</th><th>모드</th><th>결과 (+ = 식각)</th><th>SiOCN : 구 SiOC</th><th>해석 · 메모</th></tr></thead><tbody>${runRows}</tbody></table></div>
<p class="muted sm">M = Modi 단계 Δ, R = RTP 단계 Δ. 선택비는 SiOCN ÷ 구 SiOC로 자동 계산하며 구 SiOC가 성장(≤ 0)이면 비를 내지 않는다. <span class="flag ext">하한</span>은 막 소진 가능성이 있는 값이다.</p>
<h3>쿠폰 이력</h3>
<div class="table-wrap"><table id="coupon-t"><thead><tr><th>쿠폰</th><th>막</th><th>시작 (Å)</th><th>현재 (Å)</th><th>이력 (이전 After = 다음 Before)</th><th>메모</th></tr></thead><tbody>${couponRows}</tbody></table></div>
<p class="muted sm">현재 두께가 30 Å 미만이면 <span class="flag ext">소진 위험</span>, 앞 런의 After와 다음 런의 Before가 다르면 <span class="flag ext">체인 끊김</span>이 붙는다. 나머지 쿠폰 체인은 시트에서 이식 예정.</p>`, `${D.runs.length}건`)}

${sec('map', '조건 지도', `
<div class="cover"><span><b>척 온도</b>${temps.map(tempTxt).join(' · ')}</span><span><b>H₂O</b>${h2os.map(u => `${num(h2oSccm(u), 1)} sccm (UI ${u})`).join(' · ')}</span><span><b>파워</b>${pows.map(p => p + ' W').join(' · ')}</span></div>
<div class="table-wrap">${mapTable}</div>
<p class="muted sm">칸의 숫자는 SiOCN : 구 SiOC 선택비이고, 초록은 1 초과, 빨강은 역선택이다. 「미시도」 칸이 다음 실험 후보가 되는 빈 조합이다. 칸을 누르면 실험 기록으로 간다. 파워·H₂O 기록이 없는 런은 별도 행으로 모인다.</p>`)}

${sec('hyp', '가설·판정 상태판', `
<div class="filters" role="group" aria-label="가설 필터"><button data-h="all" aria-pressed="true">전체 ${D.hypotheses.length}</button>${hypOrder.map(s => `<button data-h="${s}" aria-pressed="false">${s} ${hc(s)}</button>`).join('')}</div>
<div class="grid2">${hyps.map(hypCard).join('')}</div>
<p class="muted sm">상태 변경은 실험 보드 교차검토가 끝난 뒤에만 반영한다. 「기각됨」은 사전에 고정한 판정 기준에 근거한 경우만 쓴다. 보라 칩은 근거 후보 논문이다.</p>`, `${D.hypotheses.length}건`)}

${sec('plan', '다음 실험 후보', `
<div class="grid2">${D.plans.map(planCard).join('')}</div>
<p class="muted sm">정식 결정 전에는 실행 항목이 아니다. 「넣을 UI」는 보정표(H₂O ${num(slope, 1)} sccm/UI 직선, CF₄ ×${D.calib.cf4.factor})로 자동 계산한다.</p>`, `${D.plans.length}건`)}

${sec('rules', '측정 기준·주의', `
<div class="box" style="margin-bottom:10px"><b>표기 규약</b><ul class="plain">${D.meta.conventions.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
<div class="grid2">${D.measurement.map(m => `<article class="rule"><div class="hh"><b>${esc(m.title)}</b>${m.date ? `<span class="muted sm">${esc(m.date)}</span>` : ''}</div><p>${esc(m.body)}</p></article>`).join('')}</div>`, `${D.measurement.length}건`)}

${sec('papers', '관련 논문', `
<div class="table-wrap"><table id="paper-t"><thead><tr><th>논문</th><th>이 연구와의 관계</th><th>관련 가설</th><th>백과 항목</th></tr></thead><tbody>${paperRows}</tbody></table></div>
<p class="muted sm">백과 항목은 그 DOI를 본문에서 인용한 항목을 자동으로 찾아 단다. 전체 보유 목록은 <a href="../../papers/">논문 보유 목록</a>에 있다.</p>`, `${D.papers.length}편`)}
</main>
<footer>원본 research/siocn/data.json · 빌드 tools/build_research.mjs · 갱신 ${esc(D.meta.updated)} · 출처 ${D.meta.sources.map(esc).join(' / ')}</footer>
<script>
(function () {
  document.documentElement.classList.add('js');
  var tabs = ${JSON.stringify(TABS.map(t => t[0]))};
  function show() {
    var h = decodeURIComponent(location.hash.slice(1)) || 'overview', tab = h, el = null;
    if (tabs.indexOf(h) < 0) { el = document.getElementById(h); var s = el && el.closest('.tab'); tab = s ? s.id : 'overview'; }
    document.querySelectorAll('.tab').forEach(function (s) { s.classList.toggle('on', s.id === tab); });
    document.querySelectorAll('nav.tabs a').forEach(function (a) { if (a.dataset.tab === tab) { a.setAttribute('aria-current', 'page'); var n = a.parentNode; n.scrollLeft = a.offsetLeft - n.offsetLeft - 16; } else a.removeAttribute('aria-current'); });
    if (el) { var r = el.closest('tr'); if (r) r.hidden = false; requestAnimationFrame(function () { el.scrollIntoView({ block: 'center' }); }); }
    else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show); show();
  function group(sel, attr, apply) {
    var bs = document.querySelectorAll(sel);
    bs.forEach(function (b) { b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); apply(b.getAttribute(attr)); }); });
  }
  group('#runs .filters button', 'data-f', function (f) {
    document.querySelectorAll('#runs-t tbody tr').forEach(function (tr) {
      var d = tr.dataset, ok = f === 'all' || (f === 'pending' ? d.status !== '완료' : f.indexOf('t:') === 0 ? d.temp === f.slice(2) : d.kind === f.slice(2));
      tr.hidden = !ok;
    });
  });
  group('#hyp .filters button', 'data-h', function (f) {
    document.querySelectorAll('#hyp .hyp').forEach(function (c) { c.hidden = !(f === 'all' || c.dataset.status === f); });
  });
})();
</script>
</body></html>
`;
fs.mkdirSync(r('research/siocn'), { recursive: true });
fs.writeFileSync(r('research/siocn/index.html'), html);
console.log(`✓ research/siocn — 런 ${D.runs.length} (완료 ${done.length}), 가설 ${D.hypotheses.length} (미해소 ${hc('미해소')}), 계획 ${D.plans.length}, 논문 ${D.papers.length}, 쿠폰 ${D.coupons.length}, H₂O ${slope} sccm/UI`);
