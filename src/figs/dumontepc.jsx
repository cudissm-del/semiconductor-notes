import { c1, ink, quiet, edge, grid, tint } from './_c.js';

// DuMont et al. (2017) SiO₂ 열 ALE — 반응물 정적 압력에 대한 EPC (XRR 기준 보고값 4점)
const PTS = [[0.1, 0.027], [0.5, 0.15], [1.0, 0.20], [4.0, 0.31]];
const X0 = 90, X1 = 700, Y0 = 290, Y1 = 80;
const lx = p => X0 + (Math.log10(p) - Math.log10(0.05)) / (Math.log10(6) - Math.log10(0.05)) * (X1 - X0);
const ly = v => Y0 - v / 0.35 * (Y0 - Y1);

export default () => <svg viewBox='0 0 760 360' role='img' aria-label='SiO₂ 열 ALE의 EPC는 반응물 압력의 강한 함수다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>SiO₂ 열 ALE의 EPC는 반응물 압력의 강한 함수다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>TMA/HF 정적 노출, 반쪽 반응은 각 압력에서 포화 — 그런데 포화량이 압력 따라 10배 넘게 바뀐다</text>
  <rect x={X0} y={Y1} width={lx(0.08) - X0} height={Y0 - Y1} fill={tint}/>
  <text x={X0 + 6} y={Y1 + 16} fontSize='11' fill={quiet}>≈0.08 Torr</text>
  <text x={X0 + 6} y={Y1 + 30} fontSize='11' fill={quiet}>무식각</text>
  {[0.1, 0.2, 0.3].map(v => <g><line x1={X0} y1={ly(v)} x2={X1} y2={ly(v)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={ly(v) + 4} textAnchor='end' fontSize='11' fill={quiet}>{v.toFixed(1)}</text></g>)}
  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {[0.1, 0.5, 1, 4].map(p => <g><line x1={lx(p)} y1={Y0} x2={lx(p)} y2={Y0 + 5} stroke={edge}/><text x={lx(p)} y={Y0 + 19} textAnchor='middle' fontSize='11' fill={quiet}>{p}</text></g>)}
  <path d={PTS.map((q, i) => `${i ? 'L' : 'M'}${lx(q[0]).toFixed(1)} ${ly(q[1]).toFixed(1)}`).join('')} fill='none' stroke={c1} strokeWidth='1.6' strokeDasharray='5 4'/>
  {PTS.map(q => <g><circle cx={lx(q[0])} cy={ly(q[1])} r='5' fill={c1}/><text x={lx(q[0])} y={ly(q[1]) - 12} textAnchor='middle' fontSize='11.5' fill={ink}>{q[1]}</text></g>)}
  <text x={(X0 + X1) / 2} y={Y0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>반응물 정적 압력 (Torr, 로그 축)</text>
  <text x={X0 - 8} y={Y1 - 10} textAnchor='end' fontSize='11.5' fill={quiet}>EPC (Å/cycle)</text>
  <text x='24' y='350' fontSize='11' fill={quiet}>재구성: DuMont et al., ACS Appl. Mater. Interfaces 9 (2017), doi:10.1021/acsami.7b01259 — 본문·Fig. 2(XRR) 보고값 4점, 점선은 눈 안내선</text>
</svg>;
