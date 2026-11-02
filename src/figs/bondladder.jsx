import { c1, c2, c3, c4, ink, quiet, edge, grid, tint } from './_c.js';

// 결합 에너지 사다리 — 왼쪽: 0~6 eV (A표 평균 결합 엔탈피, B표 표면·염), 오른쪽: 0~60 eV (C표 이온 문턱, VUV 광자)
// 값은 항목 본문 A·B·C표와 같다. 물리량이 서로 다르므로 같은 축에 있어도 「같은 종류의 세기」가 아니다.
const LY0 = 330, LY1 = 80, LMAX = 6;
const ly = e => LY0 - e / LMAX * (LY0 - LY1);
const RY0 = 330, RY1 = 80, RMAX = 60;
const ry = e => RY0 - e / RMAX * (RY0 - RY1);
const BONDS = [
  ['F–F', 1.65], ['Si–Si', 2.34], ['N–F', 2.82], ['Si–Br', 3.21], ['Si–N', 3.68], ['Si–Cl', 3.95],
  ['Si–O', 4.68], ['C–F', 5.03], ['Si–F · H–F', 5.86],
];
// 라벨이 겹치지 않도록 라벨 y만 살짝 띄운다(점은 실제 값 위치).
const LBL = { 'Si–Br': 3.15, 'Si–N': 3.62, 'Si–Cl': 4.02 };

export default () => <svg viewBox='0 0 760 400' role='img' aria-label='결합 에너지의 자릿수 — 표면에 붙은 층은 1 eV 아래, 분자 속 결합은 2~6 eV, 이온 문턱은 수십 eV' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>결합의 세기는 세 자릿수 층으로 나뉜다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>왼쪽 0~6 eV: 표면에 붙은 층(B표)과 분자 속 결합(A표). 오른쪽 0~60 eV: 이온이 떼어 내는 문턱(C표)과 VUV 광자</text>
  {[0, 1, 2, 3, 4, 5, 6].map(e => <g><line x1='110' y1={ly(e)} x2='380' y2={ly(e)} stroke={grid} strokeDasharray='4 4'/><text x='100' y={ly(e) + 4} textAnchor='end' fontSize='11' fill={quiet}>{e}</text></g>)}
  <line x1='110' y1={LY1} x2='110' y2={LY0} stroke={edge} strokeWidth='1.25'/>
  <text x='100' y={LY1 - 14} textAnchor='end' fontSize='11.5' fill={quiet}>eV</text>
  <rect x='118' y={ly(0.47)} width='26' height={ly(0.29) - ly(0.47)} fill={c3}/>
  <rect x='150' y={ly(0.96)} width='26' height={ly(0.71) - ly(0.71) + ly(0.71) - ly(0.96)} fill={c4}/>
  <line x1='118' y1={ly(0.026)} x2='240' y2={ly(0.026)} stroke={c2} strokeWidth='2'/>
  <text x='184' y={ly(0.96) + 2} fontSize='11' fill={ink}>AFS 탈착 Eₐ 0.71~0.96 (실측)</text>
  <text x='184' y={ly(0.47) + 10} fontSize='11' fill={ink}>AFS 결합 0.29~0.47 (계산)</text>
  <text x='246' y={ly(0.026) + 4} fontSize='11' fill={quiet}>kT (300 K) 0.026</text>
  {BONDS.map(([n, e]) => <g><line x1='250' y1={ly(e)} x2='290' y2={ly(e)} stroke={c1} strokeWidth='3'/><text x='296' y={ly(LBL[n] ?? e) + 4} fontSize='11' fill={ink}>{n} {e.toFixed(2)}</text></g>)}
  <text x='250' y={LY0 + 22} fontSize='11' fill={quiet}>분자 속 결합 (평균, A표)</text>
  <text x='118' y={LY0 + 22} fontSize='11' fill={quiet}>표면·염 (B표)</text>
  <line x1='430' y1={LY1 - 20} x2='430' y2={LY0 + 30} stroke={grid}/>
  {[0, 10, 20, 30, 40, 50, 60].map(e => <g><line x1='520' y1={ry(e)} x2='740' y2={ry(e)} stroke={grid} strokeDasharray='4 4'/><text x='510' y={ry(e) + 4} textAnchor='end' fontSize='11' fill={quiet}>{e}</text></g>)}
  <line x1='520' y1={RY1} x2='520' y2={RY0} stroke={edge} strokeWidth='1.25'/>
  <text x='510' y={RY1 - 14} textAnchor='end' fontSize='11.5' fill={quiet}>eV</text>
  <rect x='528' y={ry(12.4)} width='26' height={ry(6.2) - ry(12.4)} fill={tint}/>
  <text x='562' y={ry(9.3) + 4} fontSize='11' fill={quiet}>VUV 광자 6~12 eV (200~100 nm)</text>
  <line x1='528' y1={ry(4.7)} x2='554' y2={ry(4.7)} stroke={c4} strokeWidth='3'/>
  <text x='562' y={ry(3.6) + 4} fontSize='11' fill={ink}>Si 표면 결합 E_O 4.7</text>
  <rect x='534' y={ry(23)} width='14' height={ry(17) - ry(23)} fill={c3}/>
  <text x='562' y={ry(15.6) + 4} fontSize='11' fill={ink}>극저온 ALE 이온 17~23 (막대)</text>
  <line x1='528' y1={ry(20)} x2='554' y2={ry(20)} stroke={c2} strokeWidth='2.5'/>
  <text x='562' y={ry(20.6) + 4} fontSize='11' fill={ink}>Si 스퍼터 문턱 약 20</text>
  <line x1='528' y1={ry(25)} x2='554' y2={ry(25)} stroke={c2} strokeWidth='2.5'/>
  <text x='562' y={ry(26) + 4} fontSize='11' fill={ink}>SiN 스퍼터 임계 약 25</text>
  <line x1='528' y1={ry(50)} x2='554' y2={ry(50)} stroke={c2} strokeWidth='2.5'/>
  <text x='562' y={ry(50) + 4} fontSize='11' fill={ink}>SiO₂ 스퍼터 문턱 약 50</text>
  <text x='530' y={RY0 + 22} fontSize='11' fill={quiet}>이온 문턱 (C표)</text>
  <text x='24' y='374' fontSize='11' fill={quiet}>자체 제작. 값은 본문 A·B·C표와 같다(A: 교재 평균 결합 엔탈피, B: Lill 2024 DFT·Miyoshi 2017 TDS, C: Kanarik 2017·Hsiao 2024·Metzler 2016).</text>
  <text x='24' y='390' fontSize='11' fill={quiet}>층마다 물리량이 달라, 같은 축 위에 있어도 크기만 비교한다. VUV 범위는 파장 100~200 nm의 산술이다</text>
</svg>;
