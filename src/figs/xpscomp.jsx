import { c1, c2, c3, c4, ink, quiet, edge, grid } from './_c.js';

// XPS 표면 조성 — Possémé et al. 2016(SiN, Fig. 5)·2018(SiCO → H₂ 뒤 SiCO*, Fig. 7) 본문 확정값만.
// SiN*(H₂ 뒤 SiN)의 정확한 조성은 본문에 없어 막대 없이 서술로만 둔다. 막대끼리는 같은 연구 안에서만 비교.
const BARS = [
  { lab: 'SiN 증착 직후', sub: 'Possémé 2016', parts: [['Si', 40, c1], ['O', 16, c2], ['N', 44, c3]] },
  { lab: 'SiCO 증착 직후', sub: 'Possémé 2018', parts: [['Si', 37, c1], ['O', 48, c2], ['C', 15, c4]] },
  { lab: 'SiCO* (H₂ 플라즈마 뒤)', sub: 'Possémé 2018', parts: [['Si', 40, c1], ['O', 60, c2]] },
];
const X0 = 230, X1 = 700, H = 34;
const px = v => X0 + v / 100 * (X1 - X0);
const Y = i => 96 + i * 62;

export default () => <svg viewBox='0 0 760 400' role='img' aria-label='H₂ 플라즈마 뒤 XPS 탐지 깊이 안에서 SiCO 표면은 산화물로 바뀐다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>XPS가 보는 수 nm 안에서는 막이 다른 재료가 된다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>표면 조성(at%, H 제외). H₂ 플라즈마 뒤 SiCO의 C가 사라지고 O가 늘어 산화물에 가까워진다</text>
  {[0, 25, 50, 75, 100].map(v => <g><line x1={px(v)} y1='76' x2={px(v)} y2={Y(2) + H + 8} stroke={grid} strokeDasharray='4 4'/><text x={px(v)} y={Y(2) + H + 24} textAnchor='middle' fontSize='11' fill={quiet}>{v}</text></g>)}
  <line x1={X0} y1={Y(2) + H + 8} x2={X1} y2={Y(2) + H + 8} stroke={edge} strokeWidth='1.25'/>
  {BARS.map((b, i) => { let acc = 0; return <g>
    <text x='24' y={Y(i) + 15} fontSize='12' fontWeight='600' fill={ink}>{b.lab}</text>
    <text x='24' y={Y(i) + 31} fontSize='11' fill={quiet}>{b.sub}</text>
    {b.parts.map(([el, v, col]) => { const x = px(acc); acc += v; return <g>
      <rect x={x} y={Y(i)} width={px(v) - px(0)} height={H} fill={col}/>
      <text x={x + (px(v) - px(0)) / 2} y={Y(i) + 22} textAnchor='middle' fontSize='12' fontWeight='600' fill='#fff'>{el} {v}</text>
    </g>; })}
  </g>; })}
  <path d={`M${X1 + 14} ${Y(1) + H / 2}l18 0l0 62l-12 0`} fill='none' stroke={quiet} strokeWidth='1.2'/>
  <path d={`M${X1 + 26} ${Y(2) + H / 2 - 4}l-6 4l6 4`} fill='none' stroke={quiet} strokeWidth='1.2'/>
  <text x={X0} y={Y(2) + H + 44} fontSize='11.5' fill={quiet}>원자 농도 (at%)</text>
  <text x='24' y='326' fontSize='11.5' fill={ink}>SiN*(H₂ 플라즈마 뒤 SiN): 탐지 깊이 약 10 nm 안에서 완전 산화, F·C &lt;1 % — 정확한 조성은 본문에 없어 막대로 그리지 않았다.</text>
  <text x='24' y='344' fontSize='11.5' fill={ink}>같은 논문들의 적외 분광은 벌크 결합이 남아 있음을 보인다 — 「완전 산화」는 표면 수 nm의 이야기다.</text>
  <text x='24' y='374' fontSize='11' fill={quiet}>재구성: Possémé et al., J. Vac. Sci. Technol. A 34, 061301 (2016), doi:10.1116/1.4963072 — Fig. 5·본문;</text>
  <text x='24' y='390' fontSize='11' fill={quiet}>Possémé et al., J. Vac. Sci. Technol. B 36, 052201 (2018), doi:10.1116/1.5038617 — Fig. 7·본문. 본문에 확정된 값만 그렸다</text>
</svg>;
