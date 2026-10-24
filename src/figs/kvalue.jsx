// 19장 — 절연막의 유전율 k 비교 (본문 19-2 표의 대략값)
import { ink, quiet, edge, grid, c1, c2, c4 } from './_c.js';

export default () => {
  const KMAX = 50, X = k => 200 + Math.log10(k) / Math.log10(KMAX) * 520;
  const rows = [
    ['에어갭', 1, 1, c1], ['다공성 SiOCH (ULK)', 2.2, 2.5, c1], ['SiOC(H)', 2.7, 3.0, c1], ['SiOF (FSG)', 3.5, 3.5, c1],
    ['SiO₂', 3.9, 4.2, c4], ['SiCN', 4.5, 5, c4], ['Si₃N₄', 7, 7, c4],
    ['Al₂O₃', 9, 9, c2], ['HfO₂', 20, 25, c2], ['ZrO₂', 25, 40, c2],
  ];
  const ticks = [1, 2, 3, 4, 5, 7, 10, 20, 30, 50];
  const yr = i => 92 + i * 22;
  const fmt = (a, b) => a === b ? (a === 1 ? '~1' : `~${a}`) : `${a}–${b}`;
  return <svg viewBox='0 0 760 352' role='img' aria-label='배선 사이에는 k가 낮은 막을, 게이트와 커패시터에는 k가 높은 막을 쓴다' fontSize='13'>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>배선 사이엔 k가 낮은 막, 게이트·커패시터엔 k가 높은 막</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>주요 절연막의 유전율 (19-2 표의 대략값, 로그 눈금) — 증착 방법과 조성에 따라 달라진다</text>
    <g data-claude-anchor='legend' fontSize='11.5'>
      {[[c1, 'low-k — 배선 기생 용량↓ (BEOL)', 24], [c4, '범용 절연막', 270], [c2, 'high-k — 같은 두께에 더 큰 용량 (게이트 · DRAM)', 380]].map(([col, t, x]) => <g>
        <rect x={x} y='62' width='12' height='12' rx='2' fill={col} />
        <text x={x + 18} y='72' fill={quiet}>{t}</text>
      </g>)}
    </g>
    <g data-claude-anchor='grid' stroke={grid}>
      {ticks.map(k => <line x1={X(k)} y1='82' x2={X(k)} y2='302' />)}
    </g>
    <line x1={X(3.9)} y1='82' x2={X(3.9)} y2='302' stroke={edge} strokeDasharray='4 3' />
    <line x1='200' y1='302' x2='720' y2='302' stroke={edge} strokeWidth='1.25' />
    {ticks.map(k => <text x={X(k)} y='318' textAnchor='middle' fontSize='11.5' fill={quiet}>{k}</text>)}
    <text data-claude-text-id='x-label' x='720' y='338' textAnchor='end' fontSize='11.5' fill={quiet}>유전율 k (로그 눈금) · 점선 = SiO₂ 3.9 기준</text>
    {rows.map(([name, a, b, col], i) => <g>
      <text x='24' y={yr(i) + 4} fontSize='12' fill={ink}>{name}</text>
      <text x='192' y={yr(i) + 4} textAnchor='end' fontSize='11.5' fill={quiet}>{fmt(a, b)}</text>
      {a === b
        ? <circle cx={X(a)} cy={yr(i)} r='6' fill={col} />
        : <rect x={X(a) - 4} y={yr(i) - 6} width={X(b) - X(a) + 8} height='12' rx='6' fill={col} />}
    </g>)}
  </svg>;
};
