import { c1, c2, c3, ink, quiet, edge, tint } from './_c.js';

function pts(fn, x0, x1, n) {
  const a = [];
  for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; a.push(`${x.toFixed(0)},${fn(x).toFixed(0)}`); }
  return a.join(' ');
}

// 전압 변환: x 96~736 <-> -30~+30 V (0 V = x 416)
// 전류(px, 0전류선 y=238 기준 위가 +): V<=Vp 지수 상승, V>Vp 완만한 포화
function ivY(x) {
  const V = ((x - 96) / 640) * 60 - 30;
  const Vp = 10;
  let I;
  if (V <= Vp) I = -8 + 120 * Math.exp((V - Vp) / 6.5);
  else I = 112 + 0.9 * (V - Vp);
  return 238 - I;
}
// Vf: I=0 교차 (위 식에서 V ≈ -7.6 V), Vp: V = +10 V
const X_VF = 96 + (( -7.6 + 30) / 60) * 640;
const X_VP = 96 + ((10 + 30) / 60) * 640;

function LangmuirIV() {
  return (
    <svg viewBox="0 0 800 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="랭뮤어 프로브 I-V 특성 곡선">
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>랭뮤어 프로브 I–V 특성 곡선</text>

      {/* 구간 배경 */}
      <rect x="96" y="82" width={X_VF - 96} height="248" fill={c3} fillOpacity="0.1" />
      <rect x={X_VF} y="82" width={X_VP - X_VF} height="248" fill={c1} fillOpacity="0.1" />
      <rect x={X_VP} y="82" width={736 - X_VP} height="248" fill={c2} fillOpacity="0.1" />
      <text x={(96 + X_VF) / 2} y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill={c3}>이온 포화 영역</text>
      <text x={(X_VF + X_VP) / 2} y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill={c1}>전자 지연 영역 (지수)</text>
      <text x={(X_VP + 736) / 2} y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill={c2}>전자 포화 영역</text>

      {/* 축 */}
      <line x1="96" y1="330" x2="736" y2="330" stroke={edge} strokeWidth="1.4" />
      <line x1="96" y1="330" x2="96" y2="82" stroke={edge} strokeWidth="1.4" />
      {/* 0 전류선 */}
      <line x1="96" y1="238" x2="736" y2="238" stroke={edge} strokeWidth="1.2" strokeDasharray="5 4" />
      <text x="82" y="242" textAnchor="end" fontSize="11.5" fill={quiet}>I = 0</text>
      <text x="82" y="112" textAnchor="end" fontSize="11.5" fill={quiet}>전자 전류 +</text>
      <text x="82" y="322" textAnchor="end" fontSize="11.5" fill={quiet}>이온 전류 −</text>

      {/* 곡선 */}
      <polyline points={pts(ivY, 96, 736, 80)} fill="none" stroke={c1} strokeWidth="2.6" />

      {/* Vf / Vp 표시 */}
      <line x1={X_VF} y1="238" x2={X_VF} y2="330" stroke={quiet} strokeWidth="1.2" strokeDasharray="4 3" />
      <circle cx={X_VF} cy="238" r="4.5" fill={ink} />
      <text x={X_VF - 10} y="352" textAnchor="end" fontSize="12.5" fontWeight="700" fill={ink}>Vf (부유 전위)</text>
      <text x={X_VF - 10} y="368" textAnchor="end" fontSize="11" fill={quiet}>전류 0인 교차점</text>

      <line x1={X_VP} y1="126" x2={X_VP} y2="330" stroke={quiet} strokeWidth="1.2" strokeDasharray="4 3" />
      <circle cx={X_VP} cy="126" r="4.5" fill={ink} />
      <text x={X_VP + 14} y="118" fontSize="12.5" fontWeight="700" fill={ink}>Vp (플라즈마 전위)</text>
      <text x={X_VP + 14} y="134" fontSize="11" fill={quiet}>곡선이 꺾이는 점</text>

      {/* 구간 설명 */}
      <text x="112" y="272" fontSize="11.5" fill={quiet}>이온만 도달 — 평탄</text>
      <text x="112" y="288" fontSize="11.5" fill={quiet}>→ 이온 밀도 추정</text>
      <text x="596" y="158" fontSize="11.5" fill={quiet}>전자가 전부 도달 — 완만</text>

      {/* 전압 눈금 */}
      {[-30, 0, 30].map(v => {
        const x = 96 + ((v + 30) / 60) * 640;
        return (
          <g key={v}>
            <line x1={x} y1="330" x2={x} y2="337" stroke={edge} strokeWidth="1.2" />
            <text x={x} y="352" textAnchor="middle" fontSize="11.5" fill={quiet}>{v > 0 ? `+${v}` : v}</text>
          </g>
        );
      })}
      <text x="660" y="376" textAnchor="middle" fontSize="12" fill={quiet}>탐침 전압 V →</text>
      <text x="180" y="376" textAnchor="middle" fontSize="11.5" fill={quiet}>세로축은 개념적 압축 (로그 감각)</text>

      <rect x="140" y="400" width="520" height="34" rx="8" fill={tint} stroke={edge} strokeWidth="1.2" />
      <text x="400" y="422" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>지수 영역의 기울기 (ln I vs V) → 전자온도 Te</text>
    </svg>
  );
}
export default LangmuirIV;
