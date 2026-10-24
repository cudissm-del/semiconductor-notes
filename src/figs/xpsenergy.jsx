import { c1, c2, c3, ink, quiet, edge, tint } from './_c.js';

function pts(fn, x0, x1, n) {
  const a = [];
  for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; a.push(`${x.toFixed(0)},${fn(x).toFixed(0)}`); }
  return a.join(' ');
}

// 개략 스펙트럼: x 470~756 을 결합에너지 0~600 eV 로 대응
function specY(x) {
  const e = ((x - 470) / 286) * 600;
  const g = (c, s, a) => a * Math.exp(-((e - c) ** 2) / (2 * s * s));
  return 306 - (g(99, 13, 62) + g(285, 15, 88) + g(532, 16, 108));
}

function XpsEnergy() {
  return (
    <svg viewBox="0 0 800 452" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="XPS 광전자 방출과 결합에너지">
      <defs>
        <marker id="xps-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={edge} />
        </marker>
        <marker id="xps-arrow-c1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={c1} />
        </marker>
        <marker id="xps-arrow-c2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={c2} />
        </marker>
      </defs>
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>XPS — 광전자 방출과 결합에너지</text>

      {/* 왼쪽: 에너지 준위도 */}
      <text x="215" y="66" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>시료의 에너지 준위</text>
      <line x1="92" y1="338" x2="92" y2="84" stroke={edge} strokeWidth="1.4" markerEnd="url(#xps-arrow)" />
      <text x="78" y="76" textAnchor="middle" fontSize="11.5" fill={quiet}>에너지</text>

      {/* 진공 준위 */}
      <line x1="92" y1="104" x2="330" y2="104" stroke={edge} strokeWidth="1.6" />
      <text x="338" y="108" fontSize="12" fontWeight="700" fill={ink}>진공 준위</text>
      {/* Fermi 준위 */}
      <line x1="92" y1="216" x2="330" y2="216" stroke={c3} strokeWidth="1.8" />
      <text x="338" y="220" fontSize="12" fontWeight="700" fill={c3}>Fermi 준위</text>
      {/* 가전자대 상단 (참고) */}
      <line x1="150" y1="248" x2="330" y2="248" stroke={edge} strokeWidth="1.2" strokeDasharray="5 4" />
      <text x="338" y="252" fontSize="11.5" fill={quiet}>가전자대</text>
      {/* 내각 준위 */}
      <line x1="150" y1="318" x2="330" y2="318" stroke={c1} strokeWidth="2.4" />
      <circle cx="196" cy="318" r="6" fill={c1} />
      <text x="338" y="322" fontSize="12" fontWeight="700" fill={c1}>내각 준위 (전자)</text>

      {/* 일함수 phi: Fermi <-> 진공 */}
      <line x1="312" y1="104" x2="312" y2="216" stroke={quiet} strokeWidth="1.2" />
      <line x1="306" y1="104" x2="318" y2="104" stroke={quiet} strokeWidth="1.2" />
      <line x1="306" y1="216" x2="318" y2="216" stroke={quiet} strokeWidth="1.2" />
      <text x="302" y="166" textAnchor="end" fontSize="12" fontWeight="700" fill={quiet}>φ</text>

      {/* 결합에너지 BE: 내각 <-> Fermi */}
      <line x1="140" y1="216" x2="140" y2="318" stroke={quiet} strokeWidth="1.2" />
      <line x1="134" y1="216" x2="146" y2="216" stroke={quiet} strokeWidth="1.2" />
      <line x1="134" y1="318" x2="146" y2="318" stroke={quiet} strokeWidth="1.2" />
      <text x="130" y="272" textAnchor="end" fontSize="12" fontWeight="700" fill={ink}>BE</text>

      {/* X선 광자 입사 */}
      <line x1="118" y1="150" x2="186" y2="306" stroke={c2} strokeWidth="2.4" markerEnd="url(#xps-arrow-c2)" />
      <text x="96" y="138" fontSize="13" fontWeight="700" fill={c2}>X선 광자 hν</text>

      {/* 방출 전자 + KE */}
      <path d="M 204 310 C 236 250, 258 180, 282 96" fill="none" stroke={c1} strokeWidth="2.4" markerEnd="url(#xps-arrow-c1)" />
      <circle cx="282" cy="88" r="5" fill={c1} />
      <text x="292" y="84" fontSize="12" fontWeight="700" fill={c1}>광전자</text>
      <text x="268" y="196" fontSize="12" fontWeight="700" fill={c1}>운동에너지 KE</text>

      {/* 오른쪽: 개략 스펙트럼 */}
      <text x="613" y="66" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>측정 스펙트럼 (개략)</text>
      <line x1="470" y1="306" x2="756" y2="306" stroke={edge} strokeWidth="1.4" />
      <line x1="470" y1="306" x2="470" y2="96" stroke={edge} strokeWidth="1.4" />
      <polyline points={pts(specY, 470, 756, 72)} fill="none" stroke={c1} strokeWidth="2.2" />
      <text x="452" y="110" textAnchor="end" fontSize="11.5" fill={quiet}>세기</text>
      <text x="517" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Si 2p</text>
      <text x="517" y="222" textAnchor="middle" fontSize="11" fill={quiet}>~99 eV</text>
      <text x="606" y="180" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>C 1s</text>
      <text x="606" y="196" textAnchor="middle" fontSize="11" fill={quiet}>~285 eV</text>
      <text x="724" y="158" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>O 1s</text>
      <text x="724" y="174" textAnchor="middle" fontSize="11" fill={quiet}>~532 eV</text>
      {[0, 200, 400, 600].map(e => {
        const x = 470 + (e / 600) * 286;
        return (
          <g key={e}>
            <line x1={x} y1="306" x2={x} y2="312" stroke={edge} strokeWidth="1.2" />
            <text x={x} y="330" textAnchor="middle" fontSize="11.5" fill={quiet}>{e}</text>
          </g>
        );
      })}
      <text x="613" y="352" textAnchor="middle" fontSize="12" fill={quiet}>결합에너지 (eV) →</text>
      <text x="613" y="374" textAnchor="middle" fontSize="11.5" fill={quiet}>피크 위치 = 원소·화학상태의 지문</text>

      {/* 하단 식 */}
      <rect x="190" y="392" width="420" height="38" rx="8" fill={tint} stroke={edge} strokeWidth="1.2" />
      <text x="400" y="417" textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>hν = BE + KE + φ</text>
    </svg>
  );
}
export default XpsEnergy;
