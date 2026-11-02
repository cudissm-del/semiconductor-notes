import { c1, c2, ink, quiet, edge, grid } from './_c.js';

// Oh et al. (2022) 이중 랭뮤어 프로브 — 평면 ICP, 10 mTorr, 바이어스 100 W, 입력 300–700 W. 본문 수치만.
// 막대는 300–700 W 범위의 양 끝(전력별 값 배정은 하지 않음). Ar Tₑ는 그림에만 있어 그리지 않음.
const X0 = 150, X1 = 700, LO = 10, HI = 11.6;
const lx = v => X0 + (Math.log10(v) - LO) / (HI - LO) * (X1 - X0);

export default () => <svg viewBox='0 0 760 360' role='img' aria-label='같은 장치에서 CF₄ 플라즈마의 전자 밀도는 Ar보다 약 다섯 배 낮다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>같은 ICP, 같은 전력 — CF₄의 전자 밀도는 Ar의 약 1/5</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>이중 랭뮤어 프로브, 입력 300–700 W에서 잰 전자 밀도 범위(막대 양 끝). 10 mTorr, 바이어스 100 W</text>
  {[1e10, 2e10, 5e10, 1e11, 2e11].map(v => <g><line x1={lx(v)} y1='80' x2={lx(v)} y2='200' stroke={grid} strokeDasharray='4 4'/><text x={lx(v)} y='218' textAnchor='middle' fontSize='11' fill={quiet}>{v >= 1e11 ? `${v / 1e11}×10¹¹` : `${v / 1e10}×10¹⁰`}</text></g>)}
  <line x1={X0} y1='200' x2={X1} y2='200' stroke={edge} strokeWidth='1.25'/>
  <text x='24' y='120' fontSize='12' fontWeight='600' fill={ink}>Ar</text>
  <rect x={lx(1.1e11)} y='104' width={lx(2.6e11) - lx(1.1e11)} height='24' fill={c1}/>
  <text x={lx(1.1e11) - 6} y='121' textAnchor='end' fontSize='11' fill={ink}>1.1</text>
  <text x={lx(2.6e11) + 6} y='121' fontSize='11' fill={ink}>2.6 ×10¹¹</text>
  <text x='24' y='172' fontSize='12' fontWeight='600' fill={ink}>CF₄</text>
  <rect x={lx(1.8e10)} y='156' width={lx(5.7e10) - lx(1.8e10)} height='24' fill={c2}/>
  <text x={lx(1.8e10) - 6} y='173' textAnchor='end' fontSize='11' fill={ink}>1.8</text>
  <text x={lx(5.7e10) + 6} y='173' fontSize='11' fill={ink}>5.7 ×10¹⁰</text>
  <text x={(X0 + X1) / 2} y='240' textAnchor='middle' fontSize='11.5' fill={quiet}>전자 밀도 nₑ (cm⁻³, 로그 축)</text>
  <text x='24' y='272' fontSize='11.5' fill={ink}>Tₑ: CF₄ 2.8–3.3 eV, 전력과 함께 증가 — Ar는 반대로 전력과 함께 감소(값은 그림에만 있어 생략)</text>
  <text x='24' y='292' fontSize='11.5' fill={ink}>이온 충격 에너지(바이어스 직류 전위 기반): Ar 188 → 117 eV, CF₄ 306 → 252 eV (300 → 700 W)</text>
  <text x='24' y='330' fontSize='11' fill={quiet}>재구성: Oh et al., Thin Solid Films 749, 139185 (2022), doi:10.1016/j.tsf.2022.139185 — Fig. 2·본문 수치.</text>
  <text x='24' y='346' fontSize='11' fill={quiet}>막대는 300–700 W에서 보고된 범위의 양 끝이며, 전력별 값을 판독해 그리지 않았다</text>
</svg>;
