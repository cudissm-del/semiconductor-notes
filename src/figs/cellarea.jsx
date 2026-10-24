// 14장 — 6F² 와 4F² 셀 면적 비교 (위에서 본 개념도)
import { ink, quiet, edge, grid, c1, c2 } from './_c.js';

export default () => {
  const F = 26;
  const gridLines = (x0, y0) => <g stroke={grid} strokeDasharray='3 3'>
    {[0, 1, 2, 3, 4, 5, 6].map(i => <line x1={x0 + i * F} y1={y0} x2={x0 + i * F} y2={y0 + 5 * F} />)}
    {[0, 1, 2, 3, 4, 5].map(i => <line x1={x0} y1={y0 + i * F} x2={x0 + 6 * F} y2={y0 + i * F} />)}
  </g>;
  const L = 120, R = 470, T = 76;
  return <svg viewBox='0 0 760 300' role='img' aria-label='4F² 셀은 6F² 셀보다 면적이 약 3분의 2' fontSize='13'>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>셀 하나가 차지하는 면적 — 6F²에서 4F²로</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>위에서 본 개념도. 점선 한 칸 = F × F (F: 최소 선폭)</text>
    {gridLines(L, T)}
    <rect x={L + 2 * F} y={T + F} width={2 * F} height={3 * F} fill={c1} fillOpacity='0.3' stroke={c1} strokeWidth='2' />
    <text data-claude-text-id='l-w' x={L + 3 * F} y={T + 4 * F + 16} textAnchor='middle' fontSize='11.5' fill={ink}>2F</text>
    <text data-claude-text-id='l-h' x={L + 4 * F + 8} y={T + 2.5 * F + 4} fontSize='11.5' fill={ink}>3F</text>
    {gridLines(R, T)}
    <g stroke={edge} strokeWidth='1.5'>
      {[1, 3, 5].map(i => <line x1={R + i * F} y1={T} x2={R + i * F} y2={T + 5 * F} />)}
      {[1, 3].map(i => <line x1={R} y1={T + i * F + F / 2} x2={R + 6 * F} y2={T + i * F + F / 2} strokeDasharray='6 3' />)}
    </g>
    <rect x={R + 2 * F} y={T + 0.5 * F} width={2 * F} height={2 * F} fill={c1} fillOpacity='0.3' stroke={c1} strokeWidth='2' />
    {[1, 3, 5].map(i => [1.5, 3.5].map(j => <circle cx={R + i * F} cy={T + j * F} r='5' fill={c2} />))}
    <text data-claude-text-id='r-w' x={R + 3 * F} y={T + 5 * F + 16} textAnchor='middle' fontSize='11.5' fill={ink}>2F</text>
    <text data-claude-text-id='r-h' x={R + 6 * F + 8} y={T + 1.5 * F + 4} fontSize='11.5' fill={ink}>2F</text>
    <text data-claude-text-id='l-name' x={L + 3 * F} y='246' textAnchor='middle' fontWeight='600' fill={ink}>6F² — 현재 주력</text>
    <text data-claude-text-id='l-desc' x={L + 3 * F} y='264' textAnchor='middle' fontSize='11.5' fill={quiet}>셀 = 2F × 3F, 매립 게이트(BCAT)</text>
    <text data-claude-text-id='r-name' x={R + 3 * F} y='246' textAnchor='middle' fontWeight='600' fill={ink}>4F² — 차세대 (VCT)</text>
    <text data-claude-text-id='r-desc' x={R + 3 * F} y='264' textAnchor='middle' fontSize='11.5' fill={quiet}>셀 = 2F × 2F, 면적 약 2/3</text>
    <g data-claude-anchor='legend' fontSize='11.5'>
      <line x1='24' y1='288' x2='44' y2='288' stroke={edge} strokeWidth='1.5' />
      <text x='50' y='292' fill={quiet}>비트라인</text>
      <line x1='112' y1='288' x2='132' y2='288' stroke={edge} strokeWidth='1.5' strokeDasharray='6 3' />
      <text x='138' y='292' fill={quiet}>워드라인</text>
      <circle cx='206' cy='288' r='5' fill={c2} />
      <text x='216' y='292' fill={quiet}>교차점마다 수직 채널 트랜지스터 하나, 그 위에 커패시터</text>
    </g>
  </svg>;
};
