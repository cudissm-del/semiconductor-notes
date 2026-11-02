import { c1, c2, ink, quiet, edge, grid, tint } from './_c.js';

// Lill et al. (2024) QMS — SiF₃⁺(SiF₄ 대리 신호). 본문 수치만: 적분 신호 비 자발 식각 : AFS 증발 = 2.75 : 1,
// 포화 조건 H₂O/HF = 4, AFS 분해 탈착 100–120 °C. 시간 신호 개형은 그리지 않는다.
const TX0 = 400, TX1 = 720, TMAX = 200;
const tx = t => TX0 + t / TMAX * (TX1 - TX0);

export default () => <svg viewBox='0 0 760 340' role='img' aria-label='SiF₃⁺ 신호 하나로 자발 식각과 AFS 분해를 갈라 본다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>QMS 신호 하나로 식각과 염 분해를 갈라 본다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>SiN 분말 + HF 0.5 Torr + H₂O. 20 °C 자발 식각 45분 뒤 200 °C까지 승온 — SiF₄를 조각 이온 SiF₃⁺로 추적</text>
  <text x='24' y='84' fontSize='12' fontWeight='600' fill={ink}>적분 신호 비 (상대)</text>
  <line x1='60' y1='250' x2='320' y2='250' stroke={edge} strokeWidth='1.25'/>
  <rect x='90' y={250 - 2.75 * 50} width='70' height={2.75 * 50} fill={c1}/>
  <rect x='210' y='200' width='70' height='50' fill={c2}/>
  <text x='125' y={250 - 2.75 * 50 - 8} textAnchor='middle' fontSize='12' fill={ink}>2.75</text>
  <text x='245' y='192' textAnchor='middle' fontSize='12' fill={ink}>1</text>
  <text x='125' y='268' textAnchor='middle' fontSize='11' fill={ink}>20 °C 자발 식각</text>
  <text x='245' y='268' textAnchor='middle' fontSize='11' fill={ink}>승온 중 AFS 증발</text>
  <text x='60' y='296' fontSize='11' fill={quiet}>두 적분 신호 모두 H₂O 분압이 HF의 4배에서 포화</text>
  <text x='400' y='84' fontSize='12' fontWeight='600' fill={ink}>승온 구간에서 염 분해가 나오는 온도</text>
  <rect x={tx(100)} y='110' width={tx(120) - tx(100)} height='110' fill={tint}/>
  <text x={tx(110)} y='104' textAnchor='middle' fontSize='11' fill={ink}>100–120 °C</text>
  {[0, 50, 100, 150, 200].map(t => <g><line x1={tx(t)} y1='110' x2={tx(t)} y2='220' stroke={grid} strokeDasharray='4 4'/><text x={tx(t)} y='238' textAnchor='middle' fontSize='11' fill={quiet}>{t}</text></g>)}
  <line x1={TX0} y1='220' x2={TX1} y2='220' stroke={edge} strokeWidth='1.25'/>
  <line x1={tx(20)} y1='120' x2={tx(20)} y2='220' stroke={c1} strokeWidth='2.5'/>
  <text x={tx(20) + 6} y='134' fontSize='11' fill={ink}>20 °C 유지</text>
  <text x={(TX0 + TX1) / 2} y='258' textAnchor='middle' fontSize='11.5' fill={quiet}>시료 온도 (°C)</text>
  <text x='24' y='318' fontSize='11' fill={quiet}>재구성: Lill et al., J. Vac. Sci. Technol. A 42, 063006 (2024), doi:10.1116/6.0004019 — Fig. 8·9·본문 수치. 신호는 정규화값이라 절대 식각률이 아니다.</text>
  <text x='24' y='334' fontSize='11' fill={quiet}>시간에 따른 신호 개형은 그림 판독이 필요해 그리지 않았다</text>
</svg>;
