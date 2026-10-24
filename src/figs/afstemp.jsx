import { c1, c2, c3, ink, quiet, edge } from './_c.js';

const X = t => 100 + (t / 300) * 600; // 0~300°C → x 100~700

const MARKS = [
  { t: 100, label: '분해 시작 ≈100°C (Lill 2024)', ly: 264, anchor: 'end', lx: -6 },
  { t: 160, label: 'XPS N 1s 소멸 160°C (Cho 2020)', ly: 292, anchor: 'end', lx: -6 },
  { t: 170, label: '완전 분해 조건 170°C (Kwon & Park 2022)', ly: 264, anchor: 'start', lx: 6 },
];

function AfsTemp() {
  return (
    <svg viewBox="0 0 800 348" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AFS 온도 지도">
      <text x="400" y="34" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>AFS는 차가울 때 생기고, 뜨거울 때 사라진다</text>

      {/* 형성 구간 */}
      <text x="92" y="106" textAnchor="end" fontSize="13" fontWeight="700" fill={ink}>염 형성</text>
      <rect x={X(15)} y="90" width={X(100) - X(15)} height="26" rx="6" fill={c3} fillOpacity="0.55" />
      <text x={X(57)} y="108" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>상온 ~ 100°C</text>

      {/* 분해 구간 */}
      <text x="92" y="156" textAnchor="end" fontSize="13" fontWeight="700" fill={ink}>분해·탈착</text>
      <rect x={X(100)} y="140" width={X(230) - X(100)} height="26" rx="6" fill={c2} fillOpacity="0.6" />
      <text x={X(165)} y="158" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>TDS 탈착 130~230°C (Miyoshi 2017)</text>

      {/* 축 */}
      <line x1={X(0)} y1="206" x2={X(300)} y2="206" stroke={edge} strokeWidth="1.6" />
      {[0, 50, 100, 150, 200, 250, 300].map(t => (
        <g key={t}>
          <line x1={X(t)} y1="200" x2={X(t)} y2="212" stroke={edge} strokeWidth="1.4" />
          <text x={X(t)} y="232" textAnchor="middle" fontSize="12" fill={quiet}>{t}°C</text>
        </g>
      ))}

      {/* 마커 */}
      {MARKS.map((m, i) => (
        <g key={i}>
          <line x1={X(m.t)} y1="182" x2={X(m.t)} y2="206" stroke={c1} strokeWidth="2" />
          <circle cx={X(m.t)} cy="176" r="5" fill={c1} />
          <text x={X(m.t) + m.lx} y={m.ly} textAnchor={m.anchor} fontSize="12" fill={ink}>{m.label}</text>
          <line x1={X(m.t)} y1="206" x2={X(m.t) + m.lx} y2={m.ly - 10} stroke={edge} strokeWidth="1" />
        </g>
      ))}

      <text x="400" y="330" textAnchor="middle" fontSize="12" fill={quiet}>구간과 값은 각 논문의 보고 조건을 모은 개념 정리 — 공정마다 달라질 수 있다</text>
    </svg>
  );
}
export default AfsTemp;
