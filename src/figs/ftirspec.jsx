import { c1, c2, ink, quiet, edge, tint } from './_c.js';

function pts(fn, x0, x1, n) {
  const a = [];
  for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; a.push(`${x.toFixed(0)},${fn(x).toFixed(0)}`); }
  return a.join(' ');
}

// 파수(cm-1) -> x(px): 4000 -> 76, 400 -> 764
const WX = w => 76 + ((4000 - w) / 3600) * 688;
// 흡수 곡선: 기준선 y=118 에서 아래로 내려가는 가우시안 딥 합
function specY(x) {
  const g = (c, s, a) => a * Math.exp(-((x - c) ** 2) / (2 * s * s));
  return 118
    + g(WX(2900), 11, 52)
    + g(WX(2100), 9, 66)
    + g(WX(1270), 8, 78)
    + g(WX(1060), 13, 118)
    + g(WX(840), 8, 62)
    + g(WX(800), 8, 56);
}

function FtirSpec() {
  return (
    <svg viewBox="0 0 800 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FTIR 결합 진동 흡수 스펙트럼 개략">
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>FTIR — 결합 진동 흡수 스펙트럼 (개략)</text>

      {/* 축 */}
      <line x1="76" y1="300" x2="764" y2="300" stroke={edge} strokeWidth="1.4" />
      <line x1="76" y1="300" x2="76" y2="82" stroke={edge} strokeWidth="1.4" />
      <text x="66" y="92" textAnchor="end" fontSize="11.5" fill={quiet}>흡수도</text>
      <text x="66" y="108" textAnchor="end" fontSize="11" fill={quiet}>(흡수 ↓)</text>

      {/* 곡선 */}
      <polyline points={pts(specY, 76, 764, 120)} fill="none" stroke={c1} strokeWidth="2.2" />

      {/* 피크 라벨: 위쪽에 엇갈려 배치 + 리더선 */}
      <line x1={WX(2900)} y1={118 + 52} x2={WX(2900)} y2="330" stroke={c2} strokeWidth="1" strokeDasharray="4 3" />
      <text x={WX(2900)} y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>C–H ~2900</text>

      <line x1={WX(2100)} y1={118 + 66} x2={WX(2100)} y2="368" stroke={c2} strokeWidth="1" strokeDasharray="4 3" />
      <text x={WX(2100)} y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Si–H ~2100</text>

      <line x1={WX(1270)} y1={118 + 78} x2={WX(1270) - 56} y2="330" stroke={c2} strokeWidth="1" strokeDasharray="4 3" />
      <text x={WX(1270) - 61} y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Si–CH₃ ~1270</text>

      <line x1={WX(1060)} y1={118 + 118} x2={WX(1060) - 31} y2="368" stroke={c2} strokeWidth="1" strokeDasharray="4 3" />
      <text x={WX(1060) - 41} y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Si–O–Si ~1060</text>

      <line x1={WX(840)} y1={118 + 94} x2={WX(840) + 16} y2="330" stroke={c2} strokeWidth="1" strokeDasharray="4 3" />
      <text x={WX(840) + 16} y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Si–N ~840</text>

      <line x1={WX(800)} y1={118 + 94} x2={WX(800) + 33} y2="368" stroke={c2} strokeWidth="1" strokeDasharray="4 3" />
      <text x={WX(800) + 38} y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Si–O–Si 굽힘 ~800</text>

      {/* x 눈금: 파수 역방향 */}
      {[4000, 3000, 2000, 1000, 400].map(w => (
        <g key={w}>
          <line x1={WX(w)} y1="300" x2={WX(w)} y2="307" stroke={edge} strokeWidth="1.2" />
          <text x={WX(w)} y="322" textAnchor="middle" fontSize="11.5" fill={quiet}>{w}</text>
        </g>
      ))}

      <rect x="150" y="416" width="500" height="30" rx="8" fill={tint} stroke={edge} strokeWidth="1.2" />
      <text x="400" y="436" textAnchor="middle" fontSize="12" fill={ink}>파수 (cm⁻¹) — 피크 위치는 물질·구조에 따라 이동한다 (개념 개략)</text>
    </svg>
  );
}
export default FtirSpec;
