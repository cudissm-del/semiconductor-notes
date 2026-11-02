import { c1, c2, c3, ink, quiet, edge, grid, tint } from './_c.js';

// EEPF 개형 — 로그 축 EEPF vs 에너지. 곡선은 정의식에 가정값을 넣은 개념도.
// 맥스웰: exp(-ε/Tₑ), Tₑ = 2 eV(평균 3 eV). Druyvesteyn: exp(-0.55 (ε/⟨ε⟩)²), ⟨ε⟩ = 3 eV.
// 저압 두 전자군: 0.85·exp(-ε/0.6) + 0.15·exp(-ε/3.5) — 온도는 가정값.
// 압력 문턱(약 0.35 Torr, 0.5 Torr 위 Druyvesteyn형)과 Ramsauer 최소 약 0.3 eV만 Godyak et al. (1992) 보고값.
const X0 = 90, X1 = 470, Y0 = 300, Y1 = 92, EMAX = 12, LMIN = -6;
const px = e => X0 + e / EMAX * (X1 - X0);
const py = f => Y0 - (Math.log10(f) - LMIN) / (0 - LMIN) * (Y0 - Y1);
const curve = fn => Array.from({ length: 121 }, (_, i) => i * EMAX / 120).map(e => [e, fn(e)]).filter(([, f]) => f > 1e-6).map(([e, f], i) => `${i ? 'L' : 'M'}${px(e).toFixed(1)} ${py(f).toFixed(1)}`).join('');
const MAX = e => Math.exp(-e / 2);
const DRU = e => Math.exp(-0.55 * (e / 3) ** 2);
const BI = e => 0.85 * Math.exp(-e / 0.6) + 0.15 * Math.exp(-e / 3.5);

export default () => <svg viewBox='0 0 760 400' role='img' aria-label='EEPF 개형은 저압에서 오목, 고압에서 볼록하며 Ar에서는 약 0.35 Torr에서 바뀐다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>전자 에너지 분포는 하나의 Tₑ가 아니다 — 개형과 압력 전이</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>로그 축 EEPF에서 맥스웰은 직선, Druyvesteyn은 위로 부풀고(볼록), 저압 두 전자군은 안으로 꺼진다(오목)</text>
  {[0, -2, -4, -6].map(l => <g><line x1={X0} y1={py(10 ** l)} x2={X1} y2={py(10 ** l)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={py(10 ** l) + 4} textAnchor='end' fontSize='11' fill={quiet}>{['1', '10⁻²', '10⁻⁴', '10⁻⁶'][-l / 2]}</text></g>)}
  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {[0, 3, 6, 9, 12].map(e => <text x={px(e)} y={Y0 + 18} textAnchor='middle' fontSize='11' fill={quiet}>{e}</text>)}
  <path d={curve(MAX)} fill='none' stroke={c1} strokeWidth='2'/>
  <path d={curve(DRU)} fill='none' stroke={c2} strokeWidth='2'/>
  <path d={curve(BI)} fill='none' stroke={c3} strokeWidth='2'/>
  {[['맥스웰 (직선)', c1], ['Druyvesteyn (볼록)', c2], ['저압 두 전자군 (오목)', c3]].map(([n, c], i) => <g><line x1='110' y1={226 + i * 20} x2='136' y2={226 + i * 20} stroke={c} strokeWidth='3'/><text x='144' y={230 + i * 20} fontSize='11.5' fill={ink}>{n}</text></g>)}
  <text x={(X0 + X1) / 2} y={Y0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>전자 에너지 ε (eV)</text>
  <text x='24' y={Y1 - 14} fontSize='11.5' fill={quiet}>EEPF (상대, 로그 축)</text>
  <text x='510' y='100' fontSize='12' fontWeight='600' fill={ink}>Ar의 압력 전이 (Godyak 1992)</text>
  <line x1='520' y1='140' x2='740' y2='140' stroke={edge} strokeWidth='1.25'/>
  <rect x='520' y='126' width='92' height='28' fill={tint}/>
  <rect x='640' y='126' width='100' height='28' fill={tint}/>
  <line x1='618' y1='118' x2='618' y2='162' stroke={c1} strokeWidth='2.5'/>
  <text x='618' y='178' textAnchor='middle' fontSize='11' fill={ink}>약 0.35 Torr</text>
  <text x='520' y='118' fontSize='11' fill={quiet}>저압</text>
  <text x='740' y='118' textAnchor='end' fontSize='11' fill={quiet}>고압</text>
  <text x='520' y='206' fontSize='11' fill={ink}>오목 개형</text>
  <text x='520' y='222' fontSize='11' fill={ink}>확률적 가열 지배</text>
  <text x='520' y='238' fontSize='11' fill={ink}>두 전자군(Ramsauer</text>
  <text x='520' y='254' fontSize='11' fill={ink}>최소 약 0.3 eV)</text>
  <text x='650' y='206' fontSize='11' fill={ink}>볼록 개형</text>
  <text x='650' y='222' fontSize='11' fill={ink}>0.5 Torr 위:</text>
  <text x='650' y='238' fontSize='11' fill={ink}>Druyvesteyn형,</text>
  <text x='650' y='254' fontSize='11' fill={ink}>충돌성 가열</text>
  <text x='510' y='290' fontSize='11' fill={quiet}>He에는 이런 급한 전이가 없다</text>
  <text x='24' y='370' fontSize='11' fill={quiet}>왼쪽 곡선은 정의식에 가정값(평균 3 eV 등)을 넣은 개념도다. 압력 문턱·가열 모드·Ramsauer 최소만 재구성: Godyak, Piejak &amp; Alexandrovich,</text>
  <text x='24' y='386' fontSize='11' fill={quiet}>Plasma Sources Sci. Technol. 1, 36 (1992), doi:10.1088/0963-0252/1/1/006 — Fig. 15·16·17·본문 §4.3. 실측 곡선을 판독해 그리지 않았다</text>
</svg>;
