import { c1, c2, c3, ink, quiet, edge, tint } from './_c.js';

function pts(fn, x0, x1, n) {
  const a = [];
  for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; a.push(`${x.toFixed(0)},${fn(x).toFixed(0)}`); }
  return a.join(' ');
}

function Ellipsometry() {
  return (
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="엘립소미터 원리">
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>엘립소미터 — 편광의 변화를 읽는다</text>

      {/* 광학계 */}
      <line x1="118" y1="84" x2="252" y2="284" stroke={c2} strokeWidth="2.5" />
      <line x1="268" y1="284" x2="402" y2="84" stroke={c2} strokeWidth="2.5" />
      <line x1="260" y1="292" x2="260" y2="196" stroke={edge} strokeWidth="1.2" strokeDasharray="5 4" />
      <rect x="88" y="58" width="52" height="24" rx="5" fill={tint} stroke={edge} strokeWidth="1.4" />
      <text x="114" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>광원·편광자</text>
      <rect x="380" y="58" width="52" height="24" rx="5" fill={tint} stroke={edge} strokeWidth="1.4" />
      <text x="406" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>검광자·검출기</text>

      {/* 편광 글리프 */}
      <g stroke={c1} strokeWidth="2">
        <line x1="168" y1="158" x2="184" y2="186" />
        <path d="M 162 168 l 6 -10 l 4 12 z" fill={c1} stroke="none" />
        <path d="M 190 176 l -6 10 l -4 -12 z" fill={c1} stroke="none" />
      </g>
      <text x="128" y="196" fontSize="12" fontWeight="700" fill={c1}>직선편광 입사</text>
      <ellipse cx="342" cy="172" rx="17" ry="7.5" fill="none" stroke={c1} strokeWidth="2" transform="rotate(-56 342 172)" />
      <text x="330" y="128" fontSize="12" fontWeight="700" fill={c1}>타원편광으로 반사</text>

      {/* 시료 */}
      <rect x="110" y="292" width="300" height="13" fill={c3} fillOpacity="0.65" />
      <rect x="110" y="305" width="300" height="30" fill={tint} stroke={edge} strokeWidth="1.2" />
      <text x="424" y="303" fontSize="12" fill={ink}>막 (두께·n·k)</text>
      <text x="424" y="326" fontSize="12" fill={quiet}>기판</text>
      <text x="238" y="238" fontSize="11.5" fill={quiet}>입사각 ≈ 70°</text>

      {/* Ψ·Δ 그래프 */}
      <line x1="492" y1="308" x2="768" y2="308" stroke={edge} strokeWidth="1.4" />
      <line x1="492" y1="308" x2="492" y2="96" stroke={edge} strokeWidth="1.4" />
      <polyline points={pts(x => 218 + 16 * Math.sin((x - 492) / 34), 492, 768, 40)} fill="none" stroke={c1} strokeWidth="2.2" />
      <polyline points={pts(x => 190 + 62 * Math.sin((x - 492) / 52 + 0.6), 492, 768, 40)} fill="none" stroke={c2} strokeWidth="2.2" />
      <text x="700" y="196" fontSize="13" fontWeight="700" fill={c1}>Ψ (진폭비)</text>
      <text x="688" y="140" fontSize="13" fontWeight="700" fill={c2}>Δ (위상차)</text>
      <text x="630" y="330" textAnchor="middle" fontSize="12" fill={quiet}>파장 (nm) →</text>
      <text x="630" y="76" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>측정량: Ψ(λ)·Δ(λ) 스펙트럼</text>
      <text x="630" y="366" textAnchor="middle" fontSize="12" fill={quiet}>ρ = tanΨ · e^(iΔ) — 스펙트럼을 모델로 역산해 두께·n·k를 얻는다</text>
    </svg>
  );
}
export default Ellipsometry;
