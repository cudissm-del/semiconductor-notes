import { c1, c2, ink, quiet, edge } from './_c.js';

// 결합에너지 390~410 eV → 패널 안 x (px0+24 ~ px0+316)
const EX = (px0, e) => px0 + 24 + ((e - 390) / 20) * 292;
const gauss = (e, c, s) => Math.exp(-((e - c) ** 2) / (2 * s * s));

function spectrum(px0, peaks) {
  const pts = [];
  for (let px = 24; px <= 316; px += 4) {
    const e = 390 + ((px - 24) / 292) * 20;
    const y = peaks.reduce((a, p) => a + p.a * gauss(e, p.c, 1.05), 0);
    pts.push(`${px0 + px},${322 - y}`);
  }
  return `M ${pts.join(' L ')} L ${px0 + 316},322 L ${px0 + 24},322 Z`;
}

function Panel({ px0, title, peaks, after }) {
  return (
    <g>
      <text x={px0 + 170} y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>{title}</text>
      <path d={spectrum(px0, peaks)} fill={c1} fillOpacity="0.3" stroke={c1} strokeWidth="2" />
      <line x1={px0 + 24} y1="322" x2={px0 + 316} y2="322" stroke={edge} strokeWidth="1.4" />
      {[392, 397, 402, 407].map(e => (
        <g key={e}>
          <line x1={EX(px0, e)} y1="322" x2={EX(px0, e)} y2="328" stroke={edge} strokeWidth="1.2" />
          <text x={EX(px0, e)} y="346" textAnchor="middle" fontSize="11.5" fill={quiet}>{e}</text>
        </g>
      ))}
      <text x={px0 + 170} y="368" textAnchor="middle" fontSize="11.5" fill={quiet}>결합 에너지 (eV)</text>
      <line x1={EX(px0, 397)} y1="322" x2={EX(px0, 397)} y2={322 - 46} stroke={edge} strokeWidth="1" strokeDasharray="4 3" />
      <text x={EX(px0, 397)} y={322 - 58} textAnchor="middle" fontSize="12" fontWeight="700" fill={ink}>Si₃N₄의 N 1s ≈ 397 eV</text>
      {!after && (
        <g>
          <line x1={EX(px0, 402.2)} y1="322" x2={EX(px0, 402.2)} y2={322 - 92} stroke={c2} strokeWidth="1" strokeDasharray="4 3" />
          <text x={EX(px0, 402.2) + 6} y={322 - 104} fontSize="12" fontWeight="700" fill={c2}>(NH₄)⁺ N 1s ≈ 402 eV — 염의 지문</text>
        </g>
      )}
      {after && <text x={px0 + 240} y="180" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={c2}>402 eV 피크 소멸</text>}
    </g>
  );
}

function Xps() {
  return (
    <svg viewBox="0 0 800 396" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AFS의 XPS 지문 N 1s">
      <text x="400" y="34" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>XPS N 1s — 402 eV 피크가 염이 생겼다는 증거</text>
      {Panel({ px0: 30, title: '노출 후 — 염 형성', peaks: [{ c: 397, a: 46 }, { c: 402.2, a: 92 }], after: false })}
      {Panel({ px0: 420, title: '어닐 후 (≥160°C) — 염 분해', peaks: [{ c: 397, a: 52 }], after: true })}
      <text x="400" y="392" textAnchor="middle" fontSize="12" fill={quiet}>개념 재구성 — Shinoda et al. (2016), Cho et al. (2020)의 보고값 기준</text>
    </svg>
  );
}
export default Xps;
