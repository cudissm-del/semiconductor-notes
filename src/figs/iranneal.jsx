import { c1, c2, ink, quiet, edge, tint } from './_c.js';

// 두 패널이 같은 시간 축을 쓴다. 눈금은 원문 보고값 "150 °C까지 10 s 이내" 한 점만 숫자로 표시하고, 곡선 모양은 개념이다.
const T0 = 10; // 150 °C 도달 시점(개념 위치, ~10 s)
const PX = (x0, t) => x0 + 30 + (t / 24) * 300; // 0~24 s → 패널 안 x

// 왼쪽: 웨이퍼 온도 (25~250 °C → y 300~90)
const TY = T => 300 - ((T - 25) / 225) * 210;
const temp = t => (t >= T0 ? 150 : 25 + 125 * (1 - Math.pow(1 - t / T0, 2)));

// 오른쪽: 402 eV 피크 상대 세기 (0~1 → y 300~110)
const IY = v => 300 - v * 190;
const intensity = t => {
  const tStart = 7.2; // 온도가 탈착 구간에 들어서는 무렵(개념)
  if (t <= tStart) return 1;
  return Math.exp(-Math.pow((t - tStart) / 1.6, 2));
};

function path(x0, f, Y) {
  const pts = [];
  for (let t = 0; t <= 24; t += 0.25) pts.push(`${PX(x0, t).toFixed(1)},${Y(f(t)).toFixed(1)}`);
  return `M ${pts.join(' L ')}`;
}

function Axis({ x0, ylabel }) {
  return (
    <g>
      <line x1={PX(x0, 0)} y1="300" x2={PX(x0, 24)} y2="300" stroke={edge} strokeWidth="1.4" />
      <line x1={PX(x0, 0)} y1="300" x2={PX(x0, 0)} y2="86" stroke={edge} strokeWidth="1.4" />
      <text x={PX(x0, 0)} y="318" textAnchor="middle" fontSize="11.5" fill={quiet}>0</text>
      <line x1={PX(x0, T0)} y1="300" x2={PX(x0, T0)} y2="306" stroke={edge} strokeWidth="1.2" />
      <text x={PX(x0, T0)} y="318" textAnchor="middle" fontSize="11.5" fill={quiet}>~10 s</text>
      <text x={PX(x0, 12)} y="340" textAnchor="middle" fontSize="11.5" fill={quiet}>IR 램프 어닐 시간</text>
      <text x={PX(x0, 0) - 10} y="80" textAnchor="start" fontSize="11.5" fill={quiet}>{ylabel}</text>
    </g>
  );
}

function IrAnneal() {
  const L = 20, R = 420;
  return (
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IR 어닐로 AFS 염이 수 초 안에 사라지는 과정">
      <text x="24" y="28" fontSize="15" fontWeight="700" fill={ink}>IR 어닐 — 염은 수 초 만에 사라진다</text>
      <text x="24" y="48" fontSize="11.5" fill={quiet}>제거 단계의 시간은 탈착 구간까지 얼마나 빨리 올리느냐가 정한다</text>

      {/* 왼쪽 패널: 온도 */}
      <rect x={PX(L, 0)} y={TY(230)} width={PX(L, 24) - PX(L, 0)} height={TY(130) - TY(230)} fill={tint} />
      <text x={PX(L, 23.5)} y={TY(230) + 16} textAnchor="end" fontSize="11.5" fontWeight="700" fill={quiet}>TDS 탈착 구간 130~230 °C</text>
      {Axis({ x0: L, ylabel: "웨이퍼 온도" })}
      <text x={PX(L, 0) - 6} y={TY(150) + 4} textAnchor="end" fontSize="11" fill={quiet}>150 °C</text>
      <text x={PX(L, 0) - 6} y={TY(25) + 4} textAnchor="end" fontSize="11" fill={quiet}>실온</text>
      <path d={path(L, temp, TY)} fill="none" stroke={c1} strokeWidth="2.4" />
      <circle cx={PX(L, T0)} cy={TY(150)} r="4.5" fill={c1} />
      <text x={PX(L, T0) + 8} y={TY(150) + 22} fontSize="12" fontWeight="700" fill={ink}>150 °C 도달 ≤ 10 s</text>

      {/* 오른쪽 패널: 402 eV 피크 */}
      {Axis({ x0: R, ylabel: "N 1s 402 eV 피크 세기 (염의 지문, 상대값)" })}
      <path d={path(R, intensity, IY)} fill="none" stroke={c2} strokeWidth="2.4" />
      <text x={PX(R, 1)} y={IY(1) - 10} fontSize="12" fontWeight="700" fill={ink}>어닐 전 — 염 있음</text>
      <text x={PX(R, 12)} y={IY(0) - 14} fontSize="12" fontWeight="700" fill={ink}>탈착 구간에 들면 수 초 안에 소멸</text>

      {/* 범례·출처 */}
      <line x1="24" y1="368" x2="44" y2="368" stroke={c1} strokeWidth="2.4" />
      <text x="50" y="372" fontSize="11.5" fill={quiet}>웨이퍼 온도</text>
      <line x1="140" y1="368" x2="160" y2="368" stroke={c2} strokeWidth="2.4" />
      <text x="166" y="372" fontSize="11.5" fill={quiet}>염 피크 세기</text>
      <text x="24" y="392" fontSize="11" fill={quiet}>재구성: Miyoshi, Jpn. J. Appl. Phys. 56, 06HB01 (2017), doi:10.7567/JJAP.56.06HB01 — 숫자는 본문 보고값, 곡선 모양은 개념(원본은 CC BY 아님)</text>
    </svg>
  );
}
export default IrAnneal;
