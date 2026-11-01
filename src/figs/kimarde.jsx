import { c1, c3, ink, quiet, edge, grid } from './_c.js';

// Kim et al. (2020) 펄스 바이어스 ICP — 종횡비에 대한 정규화 식각률 (Fig. 3·본문 보고값만, 곡선 판독 없음)
// CW −50 V vs 펄스 1 kHz·50 %. 같은 막·마스크 계열 안에서만 CW와 펄스를 비교한다.
const X0 = 90, X1 = 560, Y0 = 290, Y1 = 92, AMAX = 5.5, VLO = 0.4, VHI = 1.0;
const px = a => X0 + a / AMAX * (X1 - X0);
const py = v => Y0 - (v - VLO) / (VHI - VLO) * (Y0 - Y1);
const SER = [
  { name: 'TiO₂', cw: [[1.0, 0.82], [2.8, 0.66]], pl: [[2.8, 0.93]] },
  { name: 'Si (PR 마스크)', cw: [[1.0, 0.81], [2.5, 0.66]], pl: [[2.5, 0.85]] },
  { name: 'Si (EBR 마스크)', cw: [[5.0, 0.50]], pl: [[5.0, 0.64]] },
];
const line = pts => pts.map((q, i) => `${i ? 'L' : 'M'}${px(q[0]).toFixed(1)} ${py(q[1]).toFixed(1)}`).join('');

export default () => <svg viewBox='0 0 760 380' role='img' aria-label='펄스 바이어스는 같은 종횡비에서 정규화 식각률을 CW보다 높게 유지한다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>펄스 바이어스가 ARDE를 얼마나 덜어 주나 — Kim et al. (2020)</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>정규화 식각률(패턴 ÷ 평탄면). 같은 막·마스크 계열 안에서만 CW(원)와 펄스(사각)를 비교한다</text>
  {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(v => <g><line x1={X0} y1={py(v)} x2={X1} y2={py(v)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={py(v) + 4} textAnchor='end' fontSize='11' fill={quiet}>{v.toFixed(1)}</text></g>)}
  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {[0, 1, 2, 3, 4, 5].map(a => <g><line x1={px(a)} y1={Y0} x2={px(a)} y2={Y0 + 5} stroke={edge}/><text x={px(a)} y={Y0 + 19} textAnchor='middle' fontSize='11' fill={quiet}>{a}</text></g>)}
  {SER.map(s => <g>
    {s.cw.length > 1 ? <path d={line(s.cw)} fill='none' stroke={c1} strokeWidth='1.4' strokeDasharray='5 4'/> : null}
    {s.cw.map(q => <circle cx={px(q[0])} cy={py(q[1])} r='5' fill={c1}/>)}
    {s.pl.map((q, i) => <g><line x1={px(q[0])} y1={py(s.cw[s.cw.length - 1][1]) - 7} x2={px(q[0])} y2={py(q[1]) + 8} stroke={quiet} strokeWidth='1.1'/><rect x={px(q[0]) - 5} y={py(q[1]) - 5} width='10' height='10' fill={c3}/></g>)}
  </g>)}
  <text x={px(2.8) + 12} y={py(0.93) + 4} fontSize='11' fill={ink}>TiO₂ 펄스 0.93</text>
  <text x={px(2.8) + 12} y={py(0.66) + 14} fontSize='11' fill={ink}>TiO₂ CW 0.66</text>
  <text x={px(2.5) - 12} y={py(0.85) + 4} textAnchor='end' fontSize='11' fill={ink}>Si(PR) 펄스 0.85</text>
  <text x={px(2.5) - 12} y={py(0.66) + 4} textAnchor='end' fontSize='11' fill={ink}>Si(PR) CW 0.66</text>
  <text x={px(1.0)} y={py(0.82) - 12} textAnchor='middle' fontSize='11' fill={quiet}>AR 1: 0.81~0.82</text>
  <text x={px(5.0) - 12} y={py(0.64) + 4} textAnchor='end' fontSize='11' fill={ink}>Si(EBR) 펄스 0.64</text>
  <text x={px(5.0) - 12} y={py(0.50) + 4} textAnchor='end' fontSize='11' fill={ink}>Si(EBR) CW 0.50</text>
  <circle cx={X1 + 24} cy='110' r='5' fill={c1}/><text x={X1 + 36} y='114' fontSize='11.5' fill={ink}>CW −50 V</text>
  <rect x={X1 + 19} y='131' width='10' height='10' fill={c3}/><text x={X1 + 36} y='140' fontSize='11.5' fill={ink}>펄스 1 kHz·50 %</text>
  <text x={X1 + 19} y='170' fontSize='11' fill={quiet}>200 mm ICP 700 W</text>
  <text x={X1 + 19} y='186' fontSize='11' fill={quiet}>7 mTorr</text>
  <text x={X1 + 19} y='210' fontSize='11' fill={quiet}>점선은 CW 두 점의</text>
  <text x={X1 + 19} y='226' fontSize='11' fill={quiet}>눈 안내선</text>
  <text x={(X0 + X1) / 2} y={Y0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>종횡비 (AR)</text>
  <text x={X0 - 8} y={Y1 - 12} textAnchor='end' fontSize='11.5' fill={quiet}>정규화 식각률</text>
  <text x='24' y='354' fontSize='11' fill={quiet}>재구성: Kim et al., Nanotechnology 31, 265302 (2020), doi:10.1088/1361-6528/ab7c75 — Fig. 3·본문 보고값만 찍었다.</text>
  <text x='24' y='370' fontSize='11' fill={quiet}>Si(PR) 0.81·0.66은 본문 문장. 막·마스크가 다른 점끼리는 비교하지 않는다</text>
</svg>;
