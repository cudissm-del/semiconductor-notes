import { c1, c2, c3, ink, quiet, edge, grid } from './_c.js';

// Soriano, Cunge & Sadeghi (2020) Table I — NF₃/NH₃/He = 50/50/1950 sccm, 다운스트림 1 Torr, RF 전력 스캔.
// VUV 흡수로 잰 부분압(mTorr). 오른쪽 패널의 해리 분율은 Table I로 낸 산술.
const P = [0, 150, 250, 350];
const S = [
  { n: 'NF₃', v: [25, 12, 10, 9], c: c1 },
  { n: 'NH₃', v: [27, 4, 3, 1.5], c: c2 },
  { n: 'HF', v: [0, 28, 44, 48], c: c3 },
];
const X0 = 80, X1 = 400, Y0 = 290, Y1 = 92, VMAX = 50;
const px = p => X0 + p / 350 * (X1 - X0);
const py = v => Y0 - v / VMAX * (Y0 - Y1);
const DX0 = 490, DX1 = 720, DY0 = 290, DY1 = 92;
const dx = p => DX0 + (p - 150) / 200 * (DX1 - DX0);
const dy = f => DY0 - f / 100 * (DY0 - DY1);
const DIS = [{ n: 'NF₃', v: [52, 60, 64], c: c1 }, { n: 'NH₃', v: [85, 89, 94], c: c2 }];
const line = (pts) => pts.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join('');

export default () => <svg viewBox='0 0 760 380' role='img' aria-label='전력을 올리면 NH₃가 먼저 거의 다 해리되고 HF는 포화로 간다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>VUV 흡수로 본 원격 플라즈마 — NH₃가 먼저 바닥나고 HF가 포화한다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>NF₃/NH₃/He = 50/50/1950 sccm, 다운스트림 1 Torr. 왼쪽은 부분압 실측, 오른쪽은 그 값으로 낸 해리 분율(산술)</text>
  {[0, 10, 20, 30, 40, 50].map(v => <g><line x1={X0} y1={py(v)} x2={X1} y2={py(v)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={py(v) + 4} textAnchor='end' fontSize='11' fill={quiet}>{v}</text></g>)}
  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {P.map(p => <text x={px(p)} y={Y0 + 18} textAnchor='middle' fontSize='11' fill={quiet}>{p}</text>)}
  {S.map(s => <g>
    <path d={line(P.map((p, i) => [px(p), py(s.v[i])]))} fill='none' stroke={s.c} strokeWidth='2'/>
    {P.map((p, i) => <circle cx={px(p)} cy={py(s.v[i])} r='4' fill={s.c}/>)}
    <text x={X1 + 8} y={py(s.v[3]) + 4} fontSize='11.5' fontWeight='600' fill={ink}>{s.n} {s.v[3]}</text>
  </g>)}
  <text x={px(0) + 8} y={py(27) - 8} fontSize='11' fill={quiet}>0 W: NF₃ 25 · NH₃ 27</text>
  <text x={(X0 + X1) / 2} y={Y0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>RF 전력 (W)</text>
  <text x='24' y={Y1 - 16} fontSize='11.5' fill={quiet}>부분압 (mTorr)</text>
  {[0, 25, 50, 75, 100].map(f => <g><line x1={DX0} y1={dy(f)} x2={DX1} y2={dy(f)} stroke={grid} strokeDasharray='4 4'/><text x={DX0 - 8} y={dy(f) + 4} textAnchor='end' fontSize='11' fill={quiet}>{f}</text></g>)}
  <line x1={DX0} y1={DY0} x2={DX1} y2={DY0} stroke={edge} strokeWidth='1.25'/>
  <line x1={DX0} y1={DY1} x2={DX0} y2={DY0} stroke={edge} strokeWidth='1.25'/>
  {[150, 250, 350].map(p => <text x={dx(p)} y={DY0 + 18} textAnchor='middle' fontSize='11' fill={quiet}>{p}</text>)}
  {DIS.map(d => <g>
    <path d={line([150, 250, 350].map((p, i) => [dx(p), dy(d.v[i])]))} fill='none' stroke={d.c} strokeWidth='2' strokeDasharray='5 3'/>
    {[150, 250, 350].map((p, i) => <g><circle cx={dx(p)} cy={dy(d.v[i])} r='4' fill={d.c}/><text x={dx(p)} y={dy(d.v[i]) - 9} textAnchor='middle' fontSize='11' fill={ink}>{d.v[i]}</text></g>)}
    <text x={DX1 + 6} y={dy(d.v[2]) + 18} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>{d.n}</text>
  </g>)}
  <text x={(DX0 + DX1) / 2} y={DY0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>RF 전력 (W)</text>
  <text x={DX0 - 8} y={DY1 - 12} textAnchor='end' fontSize='11.5' fill={quiet}>해리 분율 (%)</text>
  <text x='24' y='358' fontSize='11' fill={quiet}>재구성: Soriano, Cunge &amp; Sadeghi, J. Vac. Sci. Technol. A 38, 043002 (2020), doi:10.1116/6.0000134 — Table I. 해리 분율은</text>
  <text x='24' y='374' fontSize='11' fill={quiet}>(0 W 부분압 − 해당 전력 부분압) ÷ 0 W 부분압으로 낸 산술이다</text>
</svg>;
