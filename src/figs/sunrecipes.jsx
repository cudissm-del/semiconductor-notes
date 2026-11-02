import { c1, c2, c3, ink, quiet, edge, grid } from './_c.js';

// Sun et al. 2024 (Nanomaterials 14, 928) — 같은 연구 안의 원격 플라즈마 사이클 식각 런 4개.
// 왼쪽: Si 손실(nm, 측면당), 오른쪽: 패턴 구조 SiGe:Si 선택비. 값은 원문 Fig. 4·5·6 (Joy 패키지 a6d1916).
// 깊이는 원문에 있는 두 런(5 cycle ≤5 nm, 8 cycle 8.82 nm)만 적는다.
const RUNS = [
  { lab: 'Recipe 1 · 5 cycle', sub: '깊이 ≤5 ± 0.3 nm', loss: 0.44, sel: 11.1, c: c1, blanket: 25.7 },
  { lab: 'Recipe 1 · 8 cycle', sub: '깊이 8.82 nm', loss: 0.45, sel: 19.6, c: c1 },
  { lab: 'Recipe 2 · 5 cycle', sub: 'NF₃ 20/800', loss: 0.47, sel: 29.5, c: c2 },
  { lab: 'Recipe 4 · 2 cycle', sub: 'NF₃ 30/300 · 릴리스용', loss: 0.52, sel: 41.5, c: c3 },
];
const Y = i => 104 + i * 50, H = 26;
const LX0 = 196, LX1 = 400, LMAX = 0.6;
const lx = v => LX0 + v / LMAX * (LX1 - LX0);
const RX0 = 450, RX1 = 720, RMAX = 50;
const rx = v => RX0 + v / RMAX * (RX1 - RX0);
const yb = Y(3) + H + 8;

export default () => <svg viewBox='0 0 760 400' role='img' aria-label='Si 손실은 런마다 약 0.5 nm로 거의 같고, 더 깊이 판 런일수록 패턴 선택비가 커 보인다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>Si 손실은 0.5 nm 바닥에 붙어 있고, 선택비는 판 깊이를 따라 커 보인다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>한 연구 안의 원격 NF₃ 사이클 식각 4개 런 (8 Torr, Si/SiGe 각 ~9 nm, Ge 30%). 왼쪽 Si 손실, 오른쪽 패턴 구조 선택비</text>
  <text x={LX0} y='80' fontSize='12' fontWeight='600' fill={ink}>Si 손실 (nm, 측면당)</text>
  <text x={RX0} y='80' fontSize='12' fontWeight='600' fill={ink}>패턴 SiGe : Si 선택비</text>
  {[0, 0.2, 0.4, 0.6].map(v => <g><line x1={lx(v)} y1='88' x2={lx(v)} y2={yb} stroke={grid} strokeDasharray='4 4'/><text x={lx(v)} y={yb + 16} textAnchor='middle' fontSize='11' fill={quiet}>{v}</text></g>)}
  {[0, 10, 20, 30, 40, 50].map(v => <g><line x1={rx(v)} y1='88' x2={rx(v)} y2={yb} stroke={grid} strokeDasharray='4 4'/><text x={rx(v)} y={yb + 16} textAnchor='middle' fontSize='11' fill={quiet}>{v}</text></g>)}
  <line x1={lx(0.5)} y1='88' x2={lx(0.5)} y2={yb} stroke={ink} strokeWidth='1.25' strokeDasharray='6 3'/>
  <text x={lx(0.5) + 4} y={yb + 32} fontSize='11' fill={ink}>~0.5 nm 계면 혼합층</text>
  <line x1={LX0} y1={yb} x2={LX1} y2={yb} stroke={edge} strokeWidth='1.25'/>
  <line x1={RX0} y1={yb} x2={RX1} y2={yb} stroke={edge} strokeWidth='1.25'/>
  {RUNS.map((r, i) => <g>
    <text x='24' y={Y(i) + 12} fontSize='12' fontWeight='600' fill={ink}>{r.lab}</text>
    <text x='24' y={Y(i) + 27} fontSize='11' fill={quiet}>{r.sub}</text>
    <rect x={LX0} y={Y(i)} width={lx(r.loss) - LX0} height={H} fill={r.c}/>
    <text x={lx(r.loss) - 6} y={Y(i) + 17} textAnchor='end' fontSize='11.5' fontWeight='600' fill='#fff'>{r.loss.toFixed(2)}</text>
    <rect x={RX0} y={Y(i)} width={rx(r.sel) - RX0} height={H} fill={r.c}/>
    <text x={rx(r.sel) + 6} y={Y(i) + 17} fontSize='11.5' fontWeight='600' fill={ink}>{r.sel}</text>
    {r.blanket && <g><line x1={rx(r.blanket)} y1={Y(i) - 4} x2={rx(r.blanket)} y2={Y(i) + H + 4} stroke={ink} strokeWidth='2'/><text x={rx(r.blanket) + 5} y={Y(i) + 10} fontSize='10.5' fill={quiet}>blanket 25.7</text></g>}
  </g>)}
  <text x='24' y='350' fontSize='11.5' fill={ink}>Recipe 1의 5 → 8 cycle에서 깊이는 늘고 Si 손실은 0.44 → 0.45 nm로 그대로다. 패턴 선택비는 재료 상수가 아니라 「판 깊이 ÷ 고정 손실」에 가깝다.</text>
  <text x='24' y='374' fontSize='11' fill={quiet}>재구성: Sun et al., Nanomaterials 14, 928 (2024), doi:10.3390/nano14110928 — Fig. 4·5·6. 막대 사이 비교는 이 연구 안의 런끼리만 한다.</text>
  <text x='24' y='390' fontSize='11' fill={quiet}>Recipe 1 = NF₃/Ar 10/800 sccm·RPS 2000 W, Recipe 2 = 20/800·2000 W, Recipe 4 = 30/300·2300 W. 산화 단계는 공통 O₂/Ar 50/500 sccm.</text>
</svg>;
