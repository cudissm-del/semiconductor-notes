import { c1, c2, c3, c4, ink, quiet, edge, tint } from './_c.js';

function SemVolume() {
  return (
    <svg viewBox="0 0 800 452" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SEM 상호작용 부피와 신호 3종">
      <defs>
        <marker id="sem-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={edge} />
        </marker>
        <marker id="sem-arrow-c2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={c2} />
        </marker>
        <marker id="sem-arrow-c3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={c3} />
        </marker>
        <marker id="sem-arrow-c4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={c4} />
        </marker>
      </defs>
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>SEM — 상호작용 부피와 신호 3종</text>

      {/* 전자빔 */}
      <text x="212" y="62" fontSize="12" fontWeight="700" fill={ink}>전자빔 (수 keV)</text>
      <line x1="200" y1="70" x2="200" y2="136" stroke={ink} strokeWidth="2.2" markerEnd="url(#sem-arrow)" />
      <line x1="192" y1="70" x2="192" y2="128" stroke={ink} strokeWidth="1" />
      <line x1="208" y1="70" x2="208" y2="128" stroke={ink} strokeWidth="1" />

      {/* 시료 단면 */}
      <rect x="80" y="142" width="250" height="218" fill={tint} stroke={edge} strokeWidth="1.4" />
      <line x1="80" y1="142" x2="330" y2="142" stroke={ink} strokeWidth="2" />
      <text x="88" y="380" fontSize="12" fill={quiet}>시료 단면 — 표면은 위쪽 직선</text>

      {/* 상호작용 부피 (배 모양: 타원 겹침) */}
      <ellipse cx="200" cy="182" rx="34" ry="40" fill={c1} fillOpacity="0.22" />
      <ellipse cx="200" cy="248" rx="66" ry="66" fill={c1} fillOpacity="0.22" />
      <ellipse cx="200" cy="306" rx="46" ry="46" fill={c1} fillOpacity="0.22" />
      <text x="200" y="252" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={ink}>상호작용</text>
      <text x="200" y="268" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={ink}>부피</text>

      {/* 깊이별 발생 영역 */}
      <rect x="86" y="146" width="228" height="12" fill={c2} fillOpacity="0.55" />
      <text x="96" y="156" fontSize="10.5" fontWeight="700" fill={ink}>SE 발생 (표면 극근처)</text>
      <line x1="86" y1="238" x2="314" y2="238" stroke={c3} strokeWidth="1.2" strokeDasharray="5 4" />
      <text x="96" y="232" fontSize="10.5" fontWeight="700" fill={c3}>BSE 발생 (중간 깊이까지)</text>
      <text x="96" y="344" fontSize="10.5" fontWeight="700" fill={c4}>특성 X선 발생 (깊은 곳까지)</text>

      {/* 신호 탈출 화살표: 시료 -> 오른쪽 설명 */}
      <path d="M 214 148 C 280 118, 340 112, 392 118" fill="none" stroke={c2} strokeWidth="2" markerEnd="url(#sem-arrow-c2)" />
      <path d="M 238 196 C 300 190, 340 204, 392 216" fill="none" stroke={c3} strokeWidth="2" markerEnd="url(#sem-arrow-c3)" />
      <path d="M 232 300 C 290 296, 340 300, 392 312" fill="none" stroke={c4} strokeWidth="2" markerEnd="url(#sem-arrow-c4)" />

      {/* 오른쪽 신호 3종 */}
      <rect x="398" y="92" width="372" height="72" rx="8" fill="none" stroke={c2} strokeWidth="1.4" />
      <text x="414" y="118" fontSize="13.5" fontWeight="700" fill={c2}>2차전자 (SE) — 표면 형상</text>
      <text x="414" y="140" fontSize="12" fill={ink}>에너지가 낮아 표면에서만 탈출 · 해상도 최고</text>
      <text x="414" y="158" fontSize="11.5" fill={quiet}>탈출 깊이 대략 ~수 nm</text>

      <rect x="398" y="190" width="372" height="72" rx="8" fill="none" stroke={c3} strokeWidth="1.4" />
      <text x="414" y="216" fontSize="13.5" fontWeight="700" fill={c3}>후방산란전자 (BSE) — 조성(원자번호) 대비</text>
      <text x="414" y="238" fontSize="12" fill={ink}>무거운 원소일수록 강하게 산란 · 밝게 보인다</text>
      <text x="414" y="256" fontSize="11.5" fill={quiet}>탈출 깊이 대략 ~수백 nm</text>

      <rect x="398" y="288" width="372" height="72" rx="8" fill="none" stroke={c4} strokeWidth="1.4" />
      <text x="414" y="314" fontSize="13.5" fontWeight="700" fill={c4}>특성 X선 — 원소 분석 (EDX)</text>
      <text x="414" y="336" fontSize="12" fill={ink}>내각 전자가 튀어나간 자리를 채우며 방출</text>
      <text x="414" y="354" fontSize="11.5" fill={quiet}>탈출 깊이 대략 ~µm — 공간분해능은 가장 나쁨</text>

      <text x="400" y="412" textAnchor="middle" fontSize="12" fill={quiet}>같은 부피에서 나오지만 탈출 깊이가 달라, 보이는 정보(형상·조성·원소)가 갈린다</text>
      <text x="400" y="434" textAnchor="middle" fontSize="11.5" fill={quiet}>깊이 값은 가속전압·재료에 따라 달라지는 대략값이다</text>
    </svg>
  );
}
export default SemVolume;
