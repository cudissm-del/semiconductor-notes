import { c1, c2, ink, quiet, edge, grid } from './_c.js';

// Metzler et al. (2016) JVST A — FC-ALE 사이클당 제거량, 전구체(C₄F₈·CHF₃) × 막(Si·SiO₂). 이온 25 eV, 식각 스텝 40 s.
// 같은 연구·같은 조건 안의 값만. 근사값(≈).
const DATA = [
  { gas: 'C₄F₈', fc: '증착 약 5 Å/cycle', si: 3, ox: 2 },
  { gas: 'CHF₃', fc: '증착 약 11 Å/cycle (Si 위)', si: 6, ox: 4 },
];
const X0 = 110, Y0 = 290, Y1 = 92, VMAX = 7, BW = 60;
const ly = v => Y0 - v / VMAX * (Y0 - Y1);

export default () => <svg viewBox='0 0 760 380' role='img' aria-label='전구체를 C₄F₈에서 CHF₃로 바꾸면 FC가 더 두껍게 쌓이는데도 사이클당 제거량은 오히려 늘었다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>더 두껍게 쌓였는데 더 많이 깎였다 — FC-ALE의 전구체 교체</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>사이클당 제거량(근사값). 이온 에너지 25 eV, 식각 스텝 40 s — 한 연구 안의 같은 조건 비교</text>
  {[0, 2, 4, 6].map(v => <g><line x1={X0} y1={ly(v)} x2='560' y2={ly(v)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={ly(v) + 4} textAnchor='end' fontSize='11' fill={quiet}>{v}</text></g>)}
  <line x1={X0} y1={Y0} x2='560' y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {DATA.map((d, i) => { const gx = 170 + i * 210; return <g>
    <rect x={gx} y={ly(d.si)} width={BW} height={Y0 - ly(d.si)} fill={c1}/>
    <rect x={gx + BW + 12} y={ly(d.ox)} width={BW} height={Y0 - ly(d.ox)} fill={c2}/>
    <text x={gx + BW / 2} y={ly(d.si) - 8} textAnchor='middle' fontSize='11.5' fill={ink}>≈{d.si} Å</text>
    <text x={gx + BW * 1.5 + 12} y={ly(d.ox) - 8} textAnchor='middle' fontSize='11.5' fill={ink}>≈{d.ox} Å</text>
    <text x={gx + BW + 6} y={Y0 + 20} textAnchor='middle' fontSize='12' fontWeight='600' fill={ink}>{d.gas}</text>
    <text x={gx + BW + 6} y={Y0 + 36} textAnchor='middle' fontSize='11' fill={quiet}>{d.fc}</text>
  </g>; })}
  <rect x='590' y='104' width='12' height='12' fill={c1}/><text x='610' y='114' fontSize='11.5' fill={ink}>Si</text>
  <rect x='590' y='128' width='12' height='12' fill={c2}/><text x='610' y='138' fontSize='11.5' fill={ink}>SiO₂</text>
  <text x='590' y='170' fontSize='11' fill={quiet}>Si : SiO₂ 비는</text>
  <text x='590' y='186' fontSize='11' fill={quiet}>두 전구체 모두</text>
  <text x='590' y='202' fontSize='11' fill={quiet}>약 1.5 (산술)</text>
  <text x={X0 - 8} y={Y1 - 12} textAnchor='end' fontSize='11.5' fill={quiet}>Å/cycle</text>
  <text x='24' y='354' fontSize='11' fill={quiet}>재구성: Metzler et al., J. Vac. Sci. Technol. A 34 (2016), doi:10.1116/1.4935462 — Si는 Fig. 2(C₄F₈)·Fig. 5(CHF₃),</text>
  <text x='24' y='370' fontSize='11' fill={quiet}>SiO₂와 증착 두께는 본문 값. 다른 연구(빔 실험 등)의 값은 조건이 달라 함께 그리지 않았다</text>
</svg>;
