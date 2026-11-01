import { c1, c2, c3, ink, quiet, edge, grid, tint } from './_c.js';

// 보고된 선택비 범위 — 각 연구 안의 조건 변화 전후 (통합 표와 같은 값). 로그 축 + 무한 칸.
const X0 = 250, X1 = 640, XINF = 700, LO = Math.log10(0.5), HI = Math.log10(5000);
const lx = v => v === Infinity ? XINF : X0 + (Math.log10(v) - LO) / (HI - LO) * (X1 - X0);
const ROWS = [
  { name: 'Kim 2020', pair: 'Si : 전자빔 레지스트 마스크', a: [1.1, 1.3], b: [1.8, 1.9], la: 'CW 1.1~1.3', lb: '펄스 1.8~1.9', below: true },
  { name: 'Junige 2024', pair: 'SiNₓ : SiO₂ (무첨가)', a: [5, 5], la: '약 5' },
  { name: 'Hsiao 2026', pair: 'SiO₂ : SiN', a: [0.87, 0.87], b: [Infinity, Infinity], la: '0.87 (20 °C)', lb: '≤ −40 °C', endb: true },
  { name: 'Volynets 2020', pair: 'Si₃N₄ : SiO₂', a: [380, 380], la: '약 380 (H₂ 최적)' },
  { name: 'Junige 2024', pair: 'SiO₂ : SiNₓ (NH₃ 공동 주입)', a: [1000, 1000], la: '> 1000', gt: true },
  { name: 'Shinoda 2016', pair: 'Si₃N₄ : SiO₂', a: [Infinity, Infinity], la: '검출한계 아래', end: true },
];
const Y = i => 92 + i * 38;

function Mark(r, rng, col, label, i, gt, below, end) {
  const y = Y(i), x0 = lx(rng[0]), x1 = lx(rng[1]);
  return <g>
    {x1 - x0 > 2 ? <line x1={x0} y1={y} x2={x1} y2={y} stroke={col} strokeWidth='6' strokeLinecap='round'/> : <circle cx={x0} cy={y} r='6' fill={col}/>}
    {gt ? <path d={`M${x0 + 8} ${y}l10 0m-4 -4l4 4l-4 4`} stroke={col} strokeWidth='1.6' fill='none'/> : null}
    <text x={end ? XINF + 24 : (x0 + x1) / 2} y={below ? y + 20 : y - 10} textAnchor={end ? 'end' : 'middle'} fontSize='11' fill={quiet}>{label}</text>
  </g>;
}

export default () => <svg viewBox='0 0 760 378' role='img' aria-label='보고된 선택비 범위 — 같은 연구 안의 조건 변화가 선택비를 움직인 폭' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>보고된 선택비 범위 — 조건 하나가 선택비를 몇 자릿수 움직인다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>행마다 화학·장비·막이 달라 행끼리 비교하지 않는다. 같은 행 안의 화살 전후가 그 연구의 조건 변화다</text>
  <rect x={XINF - 26} y='66' width='52' height={Y(ROWS.length - 1) - 50} fill={tint}/>
  <text x={XINF} y='80' textAnchor='middle' fontSize='11' fill={quiet}>무한</text>
  {[1, 10, 100, 1000].map(v => <g><line x1={lx(v)} y1='70' x2={lx(v)} y2={Y(ROWS.length - 1) + 16} stroke={grid} strokeDasharray='4 4'/><text x={lx(v)} y={Y(ROWS.length - 1) + 32} textAnchor='middle' fontSize='11' fill={quiet}>{v}</text></g>)}
  <line x1={X0} y1={Y(ROWS.length - 1) + 16} x2={X1} y2={Y(ROWS.length - 1) + 16} stroke={edge} strokeWidth='1.25'/>
  <text x={(X0 + X1) / 2} y={Y(ROWS.length - 1) + 50} textAnchor='middle' fontSize='11.5' fill={quiet}>선택비 (깎을 막 ÷ 남길 막, 로그 축)</text>
  {ROWS.map((r, i) => <g>
    <text x='24' y={Y(i) - 2} fontSize='12' fontWeight='600' fill={ink}>{r.name}</text>
    <text x='24' y={Y(i) + 13} fontSize='11' fill={quiet}>{r.pair}</text>
    {r.b ? <path d={`M${lx(r.a[1]) + 9} ${Y(i)}L${lx(r.b[0]) - 11} ${Y(i)}`} stroke={quiet} strokeWidth='1.2' strokeDasharray='3 3' fill='none'/> : null}
    {Mark(r, r.a, c1, r.la, i, r.gt, r.below, r.end)}
    {r.b ? Mark(r, r.b, c3, r.lb, i, false, false, r.endb) : null}
  </g>)}
  <text x='24' y='350' fontSize='11' fill={quiet}>재구성: 각 논문의 보고값 — Kim et al. (2020) Fig. 3; Junige &amp; George (2024) Fig. 8·12; Hsiao et al. (2026) Table 1;</text><text x='24' y='366' fontSize='11' fill={quiet}>Volynets et al. (2020) Fig. 3; Shinoda et al. (2016). 통합 표와 같은 값이다.</text>
</svg>;
