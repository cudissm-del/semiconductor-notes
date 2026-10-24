import { c1, c2, ink, quiet, edge, tint } from './_c.js';

function pts(fn, x0, x1, n) {
  const a = [];
  for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; a.push(`${x.toFixed(0)},${fn(x).toFixed(0)}`); }
  return a.join(' ');
}

// 왼쪽 스펙트럼: x 84~372 를 파장 300~800 nm 로 대응
function specY(x) {
  const wl = 300 + ((x - 84) / 288) * 500;
  const g = (c, s, a) => a * Math.exp(-((wl - c) ** 2) / (2 * s * s));
  return 302 - (g(405, 7, 58) + g(480, 8, 42) + g(560, 7, 34) + g(656.3, 6, 92) + g(703.7, 6, 118) + g(750.4, 6, 104));
}
// 오른쪽 시간 추이: 종말점 x=622, 로지스틱 계단
function fallY(x) {
  return 148 + 92 / (1 + Math.exp(-(x - 622) / 9));
}
function riseY(x) {
  return 262 - 78 / (1 + Math.exp(-(x - 622) / 9));
}

function OesSpec() {
  return (
    <svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OES 발광 스펙트럼과 종말점 검출">
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>OES — 발광 스펙트럼과 종말점 검출</text>

      {/* 왼쪽 패널: 스펙트럼 */}
      <text x="228" y="66" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>플라즈마 발광 스펙트럼</text>
      <line x1="84" y1="302" x2="372" y2="302" stroke={edge} strokeWidth="1.4" />
      <line x1="84" y1="302" x2="84" y2="88" stroke={edge} strokeWidth="1.4" />
      <polyline points={pts(specY, 84, 372, 96)} fill="none" stroke={c1} strokeWidth="2.2" />
      <text x="70" y="98" textAnchor="end" fontSize="11.5" fill={quiet}>세기</text>

      {/* 피크 라벨 (엇갈린 높이) */}
      <text x="289" y="112" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>F 703.7</text>
      <line x1="317" y1="184" x2="298" y2="118" stroke={edge} strokeWidth="1" strokeDasharray="4 3" />
      <text x="242" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Hα 656</text>
      <line x1="289" y1="210" x2="256" y2="158" stroke={edge} strokeWidth="1" strokeDasharray="4 3" />
      <text x="352" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Ar 750.4</text>
      <line x1="344" y1="198" x2="350" y2="158" stroke={edge} strokeWidth="1" strokeDasharray="4 3" />

      {[300, 500, 800].map(w => {
        const x = 84 + ((w - 300) / 500) * 288;
        return (
          <g key={w}>
            <line x1={x} y1="302" x2={x} y2="309" stroke={edge} strokeWidth="1.2" />
            <text x={x} y="326" textAnchor="middle" fontSize="11.5" fill={quiet}>{w}</text>
          </g>
        );
      })}
      <text x="228" y="350" textAnchor="middle" fontSize="12" fill={quiet}>파장 (nm)</text>
      <text x="228" y="372" textAnchor="middle" fontSize="11.5" fill={quiet}>특정 파장 1~2개만 골라 시간 추이를 본다</text>

      {/* 오른쪽 패널: 시간 추이 */}
      <text x="592" y="66" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>신호의 시간 추이 — 종말점</text>
      <line x1="448" y1="302" x2="736" y2="302" stroke={edge} strokeWidth="1.4" />
      <line x1="448" y1="302" x2="448" y2="88" stroke={edge} strokeWidth="1.4" />
      <text x="434" y="98" textAnchor="end" fontSize="11.5" fill={quiet}>세기</text>

      <line x1="622" y1="88" x2="622" y2="302" stroke={c2} strokeWidth="1.4" strokeDasharray="6 4" />
      <text x="634" y="106" fontSize="12.5" fontWeight="700" fill={c2}>종말점</text>

      <polyline points={pts(fallY, 448, 736, 60)} fill="none" stroke={c1} strokeWidth="2.4" />
      <polyline points={pts(riseY, 448, 736, 60)} fill="none" stroke={c2} strokeWidth="2.4" />
      <text x="462" y="136" fontSize="12" fontWeight="700" fill={c1}>식각종 신호 — 막이 사라지면 감소</text>
      <text x="462" y="286" fontSize="12" fontWeight="700" fill={c2}>생성물 신호 — 하부 노출로 증가</text>
      <text x="592" y="326" textAnchor="middle" fontSize="12" fill={quiet}>시간 →</text>
      <text x="540" y="350" textAnchor="middle" fontSize="11.5" fill={quiet}>식각 중 일정</text>
      <text x="682" y="350" textAnchor="middle" fontSize="11.5" fill={quiet}>하부막 도달</text>

      <rect x="130" y="392" width="540" height="30" rx="8" fill={tint} stroke={edge} strokeWidth="1.2" />
      <text x="400" y="412" textAnchor="middle" fontSize="12" fill={ink}>계단 변화가 드러나는 순간을 종말점으로 잡아 과식각 시간을 정한다</text>
    </svg>
  );
}
export default OesSpec;
