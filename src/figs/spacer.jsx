import { c1, c2, c3, c4, c5, ink, quiet, edge, tint } from './_c.js';

function SpacerSection() {
  const lead = (x1, y1, x2, y2) => <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={edge} strokeWidth="1" fill="none" />;
  // GAA 패널: SiGe 희생층 자리(양끝이 내부 스페이서)
  const sacRow = (y) => (
    <g>
      <rect x="540" y={y} width="130" height="15" fill={c5} fillOpacity="0.3" stroke={c5} strokeWidth="1" strokeDasharray="4 3" />
      <rect x="540" y={y} width="15" height="15" fill={c2} stroke={c2} strokeWidth="1" />
      <rect x="655" y={y} width="15" height="15" fill={c2} stroke={c2} strokeWidth="1" />
    </g>
  );
  const sheet = (y) => <rect x="540" y={y} width="130" height="15" fill={c3} stroke={c3} strokeWidth="1" />;
  return (
    <svg viewBox="0 0 800 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="게이트 단면 — 측벽 스페이서와 GAA 내부 스페이서의 위치" fontSize="13">
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>스페이서는 두 자리에 있다 — 게이트 측벽과 나노시트 사이</text>
      <text x="400" y="54" textAnchor="middle" fontSize="12" fill={quiet}>전류 방향으로 자른 단면. 왼쪽은 일반적인 게이트 측벽, 오른쪽은 GAA의 매립 자리</text>

      {/* ===== 왼쪽: 측벽(외부) 스페이서 ===== */}
      <text x="205" y="92" textAnchor="middle" fontSize="13.5" fontWeight="700" fill={ink}>외부 스페이서 (측벽)</text>
      {/* 기판 */}
      <rect x="55" y="336" width="300" height="26" fill={tint} stroke={edge} strokeWidth="1.2" />
      <text x="205" y="382" textAnchor="middle" fontSize="11.5" fill={quiet}>Si 기판</text>
      {/* 게이트 */}
      <rect x="180" y="168" width="50" height="168" fill={c1} fillOpacity="0.25" stroke={c1} strokeWidth="1.4" />
      <rect x="180" y="152" width="50" height="16" fill={c1} fillOpacity="0.55" stroke={c1} strokeWidth="1" />
      {/* 측벽 스페이서 (발굽 모양) */}
      <path d="M180 336 L148 336 Q156 250 180 224 Z" fill={c2} fillOpacity="0.8" stroke={c2} strokeWidth="1.2" />
      <path d="M230 336 L262 336 Q254 250 230 224 Z" fill={c2} fillOpacity="0.8" stroke={c2} strokeWidth="1.2" />
      {/* S/D 에피 */}
      <rect x="92" y="292" width="56" height="44" fill={c4} fillOpacity="0.4" stroke={c4} strokeWidth="1.2" />
      <rect x="262" y="292" width="56" height="44" fill={c4} fillOpacity="0.4" stroke={c4} strokeWidth="1.2" />
      {/* 라벨 */}
      {lead(196, 160, 120, 118)}
      <text x="116" y="114" textAnchor="end" fontSize="12" fontWeight="600" fill={ink}>게이트</text>
      {lead(158, 268, 96, 200)}
      <text x="92" y="196" textAnchor="end" fontSize="12" fontWeight="600" fill={c2}>외부 스페이서</text>
      <text x="92" y="212" textAnchor="end" fontSize="11" fill={quiet}>두께 = 증착 두께로 결정</text>
      {lead(290, 306, 330, 250)}
      <text x="334" y="246" fontSize="12" fontWeight="600" fill={ink}>S/D 에피</text>
      <text x="205" y="412" textAnchor="middle" fontSize="12" fill={quiet}>게이트와 S/D·컨택 사이를 벌리고 절연한다</text>

      {/* ===== 오른쪽: GAA 내부 스페이서 ===== */}
      <text x="605" y="92" textAnchor="middle" fontSize="13.5" fontWeight="700" fill={ink}>내부 스페이서 (GAA)</text>
      {/* 게이트 영역 표시 */}
      <path d="M536 128 V118 H674 V128" fill="none" stroke={edge} strokeWidth="1.2" />
      <text x="605" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill={ink}>게이트 (릴리스 후 시트를 감쌈)</text>
      {/* S/D 에피 */}
      <rect x="452" y="196" width="88" height="140" fill={c4} fillOpacity="0.4" stroke={c4} strokeWidth="1.2" />
      <rect x="670" y="196" width="88" height="140" fill={c4} fillOpacity="0.4" stroke={c4} strokeWidth="1.2" />
      {/* 시트/희생층 스택 */}
      {sheet(196)}
      {sacRow(222)}
      {sheet(248)}
      {sacRow(274)}
      {sheet(300)}
      <rect x="540" y="326" width="130" height="10" fill={tint} stroke={edge} strokeWidth="1" />
      {/* 라벨 */}
      {lead(548, 229, 500, 152)}
      <text x="496" y="148" textAnchor="end" fontSize="12" fontWeight="600" fill={c2}>내부 스페이서</text>
      <text x="496" y="164" textAnchor="end" fontSize="11" fill={quiet}>SiGe 끝을 파낸 자리에 매립</text>
      {lead(636, 255, 700, 168)}
      <text x="704" y="164" fontSize="12" fontWeight="600" fill={ink}>나노시트 (Si 채널)</text>
      <text x="605" y="382" textAnchor="middle" fontSize="11.5" fill={quiet}>점선 = SiGe 희생층 (릴리스 때 제거)</text>
      <text x="605" y="412" textAnchor="middle" fontSize="12" fill={quiet}>게이트가 S/D 에피에 닿는 것을 막고 기생용량을 정한다</text>

      {/* 범례 */}
      <rect x="120" y="440" width="14" height="12" rx="2" fill={c2} fillOpacity="0.8" stroke={c2} /><text x="140" y="450" fontSize="11.5" fill={quiet}>스페이서</text>
      <rect x="230" y="440" width="14" height="12" rx="2" fill={c1} fillOpacity="0.25" stroke={c1} /><text x="250" y="450" fontSize="11.5" fill={quiet}>게이트</text>
      <rect x="330" y="440" width="14" height="12" rx="2" fill={c4} fillOpacity="0.4" stroke={c4} /><text x="350" y="450" fontSize="11.5" fill={quiet}>S/D 에피</text>
      <rect x="450" y="440" width="14" height="12" rx="2" fill={c3} stroke={c3} /><text x="470" y="450" fontSize="11.5" fill={quiet}>Si 채널</text>
      <rect x="560" y="440" width="14" height="12" rx="2" fill={c5} fillOpacity="0.3" stroke={c5} strokeDasharray="3 2" /><text x="580" y="450" fontSize="11.5" fill={quiet}>SiGe 희생층</text>
    </svg>
  );
}
export default SpacerSection;
