import { c1, c2, c3, ink, quiet, edge, grid, tint } from './_c.js';

// 액티노메트리의 두 오차 원천 — 본문 수치만.
// (a) Barsukov et al. 2017: 같은 발광비에 계수 C = 2.0(채택) vs 2.84(병기) → 절대 F 밀도 1.42배(산술).
// (b) Eon et al. 2007: O 원자에 의한 Ar* 소광 약 1e6 s⁻¹ vs Ar* 복사 감쇠 4.2e7 s⁻¹ (10 mTorr).
const AX0 = 90, AX1 = 330, AY0 = 290, AY1 = 110;
const ay = v => AY0 - v / 1.6 * (AY0 - AY1);
const BX0 = 470, BX1 = 720, LO = 5, HI = 8;
const bx = v => BX0 + (Math.log10(v) - LO) / (HI - LO) * (BX1 - BX0);

export default () => <svg viewBox='0 0 760 380' role='img' aria-label='액티노메트리 절대값은 계수 선택에 40 % 흔들리고, 소광은 이 조건에서 복사 감쇠의 몇 % 수준이다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>액티노메트리의 두 오차 원천 — 계수와 소광</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>F 704 / Ar 750 nm 쌍. 왼쪽은 같은 발광비에 다른 계수를 쓴 결과, 오른쪽은 Ar* 소광을 기각한 비교</text>
  <text x='24' y='86' fontSize='12' fontWeight='600' fill={ink}>(a) 계수가 정하는 절대 밀도</text>
  {[0, 0.5, 1.0, 1.5].map(v => <g><line x1={AX0} y1={ay(v)} x2={AX1} y2={ay(v)} stroke={grid} strokeDasharray='4 4'/><text x={AX0 - 8} y={ay(v) + 4} textAnchor='end' fontSize='11' fill={quiet}>{v.toFixed(1)}</text></g>)}
  <line x1={AX0} y1={AY0} x2={AX1} y2={AY0} stroke={edge} strokeWidth='1.25'/>
  <rect x='130' y={ay(1.0)} width='60' height={AY0 - ay(1.0)} fill={c1}/>
  <rect x='230' y={ay(1.42)} width='60' height={AY0 - ay(1.42)} fill={c2}/>
  <text x='160' y={ay(1.0) - 8} textAnchor='middle' fontSize='11.5' fill={ink}>1.00</text>
  <text x='260' y={ay(1.42) - 8} textAnchor='middle' fontSize='11.5' fill={ink}>1.42</text>
  <text x='160' y={AY0 + 18} textAnchor='middle' fontSize='11' fill={ink}>C = 2.0</text>
  <text x='160' y={AY0 + 32} textAnchor='middle' fontSize='10.5' fill={quiet}>(채택, Lopaev 값)</text>
  <text x='260' y={AY0 + 18} textAnchor='middle' fontSize='11' fill={ink}>C = 2.84</text>
  <text x='260' y={AY0 + 32} textAnchor='middle' fontSize='10.5' fill={quiet}>(본문 병기 최근값)</text>
  <text x='24' y='104' fontSize='11' fill={quiet}>상대 F 밀도</text>
  <text x='24' y='86' dx='420' fontSize='12' fontWeight='600' fill={ink}>(b) O에 의한 Ar* 소광은 작다</text>
  {[[1e5, '10⁵'], [1e6, '10⁶'], [1e7, '10⁷'], [1e8, '10⁸']].map(([v, l]) => <g><line x1={bx(v)} y1='120' x2={bx(v)} y2='250' stroke={grid} strokeDasharray='4 4'/><text x={bx(v)} y='268' textAnchor='middle' fontSize='11' fill={quiet}>{l}</text></g>)}
  <line x1={BX0} y1='250' x2={BX1} y2='250' stroke={edge} strokeWidth='1.25'/>
  <rect x={BX0} y='146' width={bx(1e6) - BX0} height='30' fill={c3}/>
  <rect x={BX0} y='196' width={bx(4.2e7) - BX0} height='30' fill={c1}/>
  <text x={bx(1e6) + 8} y='166' fontSize='11' fill={ink}>소광 약 10⁶ s⁻¹</text>
  <text x={BX0 + 8} y='216' fontSize='11' fontWeight='600' fill='#fff'>복사 감쇠 4.2×10⁷ s⁻¹</text>
  <text x={(BX0 + BX1) / 2} y='290' textAnchor='middle' fontSize='11' fill={quiet}>속도 (s⁻¹, 로그 축) — 10 mTorr</text>
  <text x={BX0} y='314' fontSize='11' fill={ink}>비 약 2 % → 소광은 기각(산술)</text>
  <text x='24' y='352' fontSize='11' fill={quiet}>재구성: Barsukov et al., J. Vac. Sci. Technol. A 35, 061310 (2017), doi:10.1116/1.5004546 — 본문 II.C 계수; Eon et al., J. Phys. D 40, 3951 (2007),</text>
  <text x='24' y='368' fontSize='11' fill={quiet}>doi:10.1088/0022-3727/40/13/007 — 본문의 소광 검토 수치. 막대 높이·비는 본문 값으로 낸 산술이다</text>
</svg>;
