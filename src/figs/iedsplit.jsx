import { c1, c2, ink, quiet, edge, grid, tint } from './_c.js';

// RF 쉬스 IED 이중봉 갈라짐 — Economou (2013) Fig. 4의 식 (7): ΔE/eVpp = [1 + (2.25 τᵢ/τrf)²]^(−1/2)
// 점 4개는 τᵢ = 100 ns를 가정값으로 둔 바이어스 주파수별 산술.
const X0 = 90, X1 = 640, Y0 = 290, Y1 = 92, LO = -2, HI = 2;
const lx = r => X0 + (Math.log10(r) - LO) / (HI - LO) * (X1 - X0);
const ly = v => Y0 - v * (Y0 - Y1);
const f = r => 1 / Math.sqrt(1 + (2.25 * r) ** 2);
const curve = Array.from({ length: 121 }, (_, i) => 10 ** (LO + i * (HI - LO) / 120)).map((r, i) => `${i ? 'L' : 'M'}${lx(r).toFixed(1)} ${ly(f(r)).toFixed(1)}`).join('');
const PTS = [[2, 0.2], [13.56, 1.356], [27.12, 2.712], [60, 6.0]];

export default () => <svg viewBox='0 0 760 380' role='img' aria-label='이온이 쉬스를 건너는 시간이 RF 주기보다 짧을수록 이온 에너지 분포가 두 봉우리로 넓게 갈라진다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>RF 쉬스에서 이온 에너지는 하나가 아니라 두 봉우리 사이에 퍼진다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>봉우리 간격 ΔE를 피크–피크 전압 eVpp로 나눈 값. 이온 통과 시간 τᵢ가 RF 주기 τrf보다 길수록 분포가 좁아진다</text>
  <rect x={X0} y={Y1} width={lx(0.3) - X0} height={Y0 - Y1} fill={tint}/>
  <text x={X0 + 8} y={Y0 - 12} fontSize='11' fill={quiet}>넓은 이중봉</text>
  <text x={X0 + 8} y={Y0 - 26} fontSize='11' fill={quiet}>(저주파 쪽)</text>
  <text x={X1 - 8} y={Y1 + 18} textAnchor='end' fontSize='11' fill={quiet}>좁은 단일 피크에 가까움 (고주파 쪽)</text>
  {[0, 0.25, 0.5, 0.75, 1].map(v => <g><line x1={X0} y1={ly(v)} x2={X1} y2={ly(v)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={ly(v) + 4} textAnchor='end' fontSize='11' fill={quiet}>{v}</text></g>)}
  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {[0.01, 0.1, 1, 10, 100].map(r => <g><line x1={lx(r)} y1={Y0} x2={lx(r)} y2={Y0 + 5} stroke={edge}/><text x={lx(r)} y={Y0 + 19} textAnchor='middle' fontSize='11' fill={quiet}>{r}</text></g>)}
  <path d={curve} fill='none' stroke={c1} strokeWidth='2'/>
  {PTS.map(([m, r], i) => <g><circle cx={lx(r)} cy={ly(f(r))} r='5' fill={c2}/><text x={lx(r) + 9} y={ly(f(r)) + (i === 0 ? -8 : -6)} fontSize='11' fill={ink}>{m} MHz · {f(r).toFixed(2)}</text></g>)}
  <text x={(X0 + X1) / 2} y={Y0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>τᵢ / τrf (로그 축)</text>
  <text x={X0 - 8} y={Y1 - 12} textAnchor='end' fontSize='11.5' fill={quiet}>ΔE / eVpp</text>
  <text x={X1 + 14} y='120' fontSize='11' fill={quiet}>점: τᵢ = 100 ns</text>
  <text x={X1 + 14} y='136' fontSize='11' fill={quiet}>(가정값)일 때</text>
  <text x={X1 + 14} y='152' fontSize='11' fill={quiet}>바이어스 주파수별</text>
  <text x={X1 + 14} y='168' fontSize='11' fill={quiet}>산술</text>
  <text x='24' y='354' fontSize='11' fill={quiet}>재구성: Economou, J. Vac. Sci. Technol. A 31, 050823 (2013), doi:10.1116/1.4819315 — Fig. 4의 식 (7) 곡선.</text>
  <text x='24' y='370' fontSize='11' fill={quiet}>곡선은 식 자체이고, 주파수 점은 τᵢ 가정값에 따른 산술이다(실측 아님)</text>
</svg>;
