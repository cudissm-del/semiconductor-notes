import { c1, c2, ink, quiet, edge, tint } from './_c.js';

const P = [
  { t: '① 염 형성', cap: 'NH₄F·HF가 표면을 염으로' },
  { t: '② 자기제한', cap: '염이 덮으면 성장 정지 (1~2 nm)' },
  { t: '③ 가열 · 분해', cap: '100~200°C, 염이 기체로' },
  { t: '④ 한 층 제거', cap: '표면 리셋 → 사이클 반복' },
];

function Panel(i) {
  const x0 = 36 + i * 176;
  const rows = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) {
    const cx = x0 + 18 + c * 17.5, cy = 196 + r * 26;
    let fill = tint, stroke = edge, op = 1;
    if (i === 0 && r === 0 && c < 4) { fill = c1; stroke = c1; }
    if (i === 1 && r === 0) { fill = c1; stroke = c1; }
    if (i === 1 && r === 1 && c % 2 === 0) { fill = c1; stroke = c1; op = 0.75; }
    if (i === 2 && r === 0) { fill = c1; stroke = c1; op = 0.4; }
    if (i === 3) { if (r === 0) continue; }
    rows.push(<circle key={`${r}-${c}`} cx={cx} cy={i === 3 ? cy - 13 : cy} r="7.5" fill={fill} fillOpacity={op} stroke={stroke} strokeOpacity={op} strokeWidth="1.4" />);
  }
  return (
    <g>
      <rect x={x0} y="58" width="140" height="252" rx="10" fill="none" stroke={edge} strokeWidth="1.2" />
      <text x={x0 + 70} y="86" textAnchor="middle" fontSize="14.5" fontWeight="700" fill={ink}>{P[i].t}</text>
      {i === 0 && (
        <g fill={c2}>
          {[0, 1, 2].map(k => <circle key={k} cx={x0 + 38 + k * 32} cy="118" r="5" />)}
          {[0, 1, 2].map(k => <path key={`a${k}`} d={`M ${x0 + 38 + k * 32} 128 v 16`} stroke={c2} strokeWidth="2" markerEnd="url(#afs-arr)" />)}
          <text x={x0 + 70} y="106" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={c2}>NH₄F · HF</text>
        </g>
      )}
      {i === 1 && <text x={x0 + 70} y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={c1}>(NH₄)₂SiF₆ 층</text>}
      {i === 2 && (
        <g>
          {[0, 1, 2].map(k => <path key={k} d={`M ${x0 + 38 + k * 32} 168 v -22`} stroke={c2} strokeWidth="2" markerEnd="url(#afs-arr)" />)}
          <text x={x0 + 70} y="128" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={c2}>NH₃ · HF · SiF₄ ↑</text>
          <path d={`M ${x0 + 24} 292 q 8 -10 16 0 q 8 10 16 0 q 8 -10 16 0 q 8 10 16 0 q 8 -10 16 0`} fill="none" stroke={c2} strokeWidth="2" />
        </g>
      )}
      {i === 3 && <line x1={x0 + 10} y1="183" x2={x0 + 130} y2="183" stroke={edge} strokeWidth="1.4" strokeDasharray="5 4" />}
      {rows}
      <text x={x0 + 70} y="336" textAnchor="middle" fontSize="11.8" fill={quiet}>{P[i].cap}</text>
    </g>
  );
}

function AfsCycle() {
  return (
    <svg viewBox="0 0 800 392" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AFS 형성 제거 사이클">
      <defs>
        <marker id="afs-arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 z" fill={c2} />
        </marker>
        <marker id="afs-arr2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill={c1} />
        </marker>
      </defs>
      <text x="400" y="32" textAnchor="middle" fontSize="16.5" fontWeight="700" fill={ink}>AFS 사이클 — 염으로 바꿨다가, 열로 날린다</text>
      {[0, 1, 2, 3].map(i => Panel(i))}
      <path d="M 664 366 H 136" stroke={c1} strokeWidth="2" markerEnd="url(#afs-arr2)" />
      <text x="400" y="386" textAnchor="middle" fontSize="12" fill={c1} fontWeight="700">사이클 반복 → 사이클당 일정량(EPC)씩 제거</text>
    </svg>
  );
}
export default AfsCycle;
