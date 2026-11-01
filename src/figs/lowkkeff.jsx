import { c1, c2, ink, quiet, edge, grid, tint } from './_c.js';

// 측벽 손상층 두께에 따른 실효 k (직렬 근사 산술) — 배선 간격 20·40 nm, k_b 2.5, k_d 4.0 (가정값).
// 세로 띠: Possémé et al. (2018)의 H₂ 플라즈마 손상층 약 6 nm (보고값).
const X0 = 90, X1 = 560, Y0 = 290, Y1 = 92, DMAX = 10, KLO = 2.4, KHI = 4.1;
const px = d => X0 + d / DMAX * (X1 - X0);
const py = k => Y0 - (k - KLO) / (KHI - KLO) * (Y0 - Y1);
const keff = (L, d) => L / (2 * d / 4.0 + (L - 2 * d) / 2.5);
const curve = L => Array.from({ length: 51 }, (_, i) => i * DMAX / 50).map((d, i) => `${i ? 'L' : 'M'}${px(d).toFixed(1)} ${py(keff(L, d)).toFixed(1)}`).join('');

export default () => <svg viewBox='0 0 760 360' role='img' aria-label='측벽 손상층이 두꺼워질수록 배선 사이 실효 k가 오른다 — 간격이 좁을수록 가파르다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>측벽 손상층 몇 nm가 배선 사이 실효 k를 얼마나 올리나</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>직렬 근사 산술 — 몸체 k 2.5, 손상층 k 4.0은 가정값. 간격이 좁을수록 같은 손상 두께의 무게가 크다</text>
  <rect x={px(5.6)} y={Y1} width={px(6.4) - px(5.6)} height={Y0 - Y1} fill={tint}/>
  <text x={px(5.6) - 6} y={Y1 + 40} textAnchor='end' fontSize='11' fill={quiet}>약 6 nm — H₂ 플라즈마 손상층</text>
  <text x={px(5.6) - 6} y={Y1 + 54} textAnchor='end' fontSize='11' fill={quiet}>(SiCO, Possémé 2018 보고값)</text>
  {[2.5, 3.0, 3.5, 4.0].map(k => <g><line x1={X0} y1={py(k)} x2={X1} y2={py(k)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={py(k) + 4} textAnchor='end' fontSize='11' fill={quiet}>{k.toFixed(1)}</text></g>)}
  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {[0, 2, 4, 6, 8, 10].map(d => <text x={px(d)} y={Y0 + 18} textAnchor='middle' fontSize='11' fill={quiet}>{d}</text>)}
  <path d={curve(20)} fill='none' stroke={c1} strokeWidth='2'/>
  <path d={curve(40)} fill='none' stroke={c2} strokeWidth='2'/>
  <circle cx={px(6)} cy={py(keff(20, 6))} r='4.5' fill={c1}/>
  <circle cx={px(6)} cy={py(keff(40, 6))} r='4.5' fill={c2}/>
  <text x={X1 + 10} y={py(keff(20, 10)) + 4} fontSize='11.5' fontWeight='600' fill={ink}>간격 20 nm</text>
  <text x={X1 + 10} y={py(keff(40, 10)) + 4} fontSize='11.5' fontWeight='600' fill={ink}>간격 40 nm</text>
  <text x={px(6) - 8} y={py(keff(20, 6)) - 8} textAnchor='end' fontSize='11' fill={ink}>약 3.23</text>
  <text x={px(6) + 8} y={py(keff(40, 6)) + 16} fontSize='11' fill={ink}>약 2.82</text>
  <text x={(X0 + X1) / 2} y={Y0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>측벽 한쪽의 손상층 두께 d (nm)</text>
  <text x={X0 - 8} y={Y1 - 12} textAnchor='end' fontSize='11.5' fill={quiet}>실효 k</text>
  <text x='24' y='350' fontSize='11' fill={quiet}>자체 제작 산술 그림. 6 nm 띠만 재구성: Possémé et al., J. Vac. Sci. Technol. B 36, 052201 (2018), doi:10.1116/1.5038617 — 보고된 손상층 두께</text>
</svg>;
