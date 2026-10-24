// 14장 — DRAM 1T1C 회로와 셀 단면 (개념도)
import { ink, quiet, edge, tint, c1, c2, c3, c4, c5 } from './_c.js';

export default () => {
  const cap = (cx, own) => <g opacity={own ? 1 : 0.45}>
    <rect x={cx - 17} y='80' width='34' height='150' rx='4' fill={c5} fillOpacity='0.18' stroke={c4} strokeWidth='3' strokeDasharray={own ? 'none' : '5 3'} />
    <rect x={cx - 7} y='90' width='14' height='130' rx='3' fill='none' stroke={c4} strokeWidth='2' />
  </g>;
  const wl = x => <g>
    <rect x={x - 15} y='280' width='30' height='60' fill={edge} fillOpacity='0.35' />
    <rect x={x - 15} y='314' width='30' height='26' fill={c2} fillOpacity='0.8' />
  </g>;
  return <svg viewBox='0 0 760 404' role='img' aria-label='DRAM 셀 하나는 트랜지스터 1개와 커패시터 1개로 이뤄진다' fontSize='13'>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>DRAM 셀 하나 = 트랜지스터 1개 + 커패시터 1개 (1T1C)</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>왼쪽: 회로 · 오른쪽: 활성 영역을 따라 자른 단면 개념도 — 실제 커패시터는 훨씬 가늘고 높다</text>
    <g data-claude-anchor='circuit' stroke={ink} strokeWidth='1.5' fill='none'>
      <line x1='70' y1='96' x2='70' y2='320' />
      <line x1='40' y1='146' x2='230' y2='146' />
      <path d='M70 214H104V207M136 207V214H180V244' />
      <line x1='100' y1='206' x2='140' y2='206' strokeWidth='3' />
      <line x1='100' y1='196' x2='140' y2='196' />
      <line x1='120' y1='146' x2='120' y2='196' />
      <line x1='158' y1='244' x2='202' y2='244' strokeWidth='3' />
      <line x1='158' y1='256' x2='202' y2='256' strokeWidth='3' />
      <path d='M180 256V284M164 284H196M170 291H190M176 298H184' />
    </g>
    <text data-claude-text-id='bl' x='70' y='88' textAnchor='middle' fontSize='11.5' fill={ink}>비트라인 (BL)</text>
    <text data-claude-text-id='wl' x='232' y='138' textAnchor='end' fontSize='11.5' fill={ink}>워드라인 (WL)</text>
    <text data-claude-text-id='tr' x='120' y='232' textAnchor='middle' fontSize='11.5' fill={quiet}>셀 트랜지스터</text>
    <text data-claude-text-id='cap' x='208' y='254' fontSize='11.5' fill={quiet}>커패시터</text>
    <text data-claude-text-id='bit' x='136' y='330' textAnchor='middle' fontSize='11.5' fill={ink}>전하 있음 = 1, 없음 = 0</text>
    <text data-claude-text-id='bit-2' x='136' y='346' textAnchor='middle' fontSize='11.5' fill={quiet}>전하가 새므로 주기적 리프레시</text>
    <g data-claude-anchor='section'>
      <rect x='300' y='122' width='430' height='8' fill={edge} fillOpacity='0.35' />
      <rect x='300' y='176' width='430' height='8' fill={edge} fillOpacity='0.35' />
      {cap(362, true)}{cap(450, false)}{cap(590, false)}{cap(683, true)}
      <rect x='300' y='280' width='430' height='80' fill={tint} stroke={edge} strokeWidth='1.25' />
      {wl(445)}{wl(585)}
      <rect x='349' y='230' width='26' height='50' fill={c3} fillOpacity='0.6' />
      <rect x='670' y='230' width='26' height='50' fill={c3} fillOpacity='0.6' />
      <rect x='503' y='240' width='24' height='40' fill={c1} fillOpacity='0.6' />
      <rect x='488' y='218' width='54' height='22' rx='3' fill={c1} fillOpacity='0.85' />
    </g>
    <text data-claude-text-id='cap-label' x='520' y='70' textAnchor='middle' fontSize='11.5' fill={ink}>실린더형 커패시터 (TiN / ZrO₂계 유전체 / TiN)</text>
    <text data-claude-text-id='support' x='520' y='118' textAnchor='middle' fontSize='11.5' fill={ink}>SiN 지지대</text>
    <text data-claude-text-id='neighbor' x='520' y='160' textAnchor='middle' fontSize='11.5' fill={quiet}>점선 = 이웃 셀</text>
    <text data-claude-text-id='bl-label' x='515' y='210' textAnchor='middle' fontSize='11.5' fill={ink}>비트라인</text>
    <text data-claude-text-id='si' x='722' y='354' textAnchor='end' fontSize='11.5' fill={quiet}>Si 활성 영역</text>
    <g data-claude-anchor='legend' fontSize='11.5'>
      {[[c4, '커패시터 전극', 290], [c3, '스토리지 노드 컨택', 386], [c1, '비트라인 · 컨택', 510], [c2, '매립 워드라인 (BCAT)', 616]].map(([col, t, x]) => <g>
        <rect x={x} y='374' width='12' height='12' rx='2' fill={col} fillOpacity='0.8' />
        <text x={x + 18} y='384' fill={quiet}>{t}</text>
      </g>)}
    </g>
  </svg>;
};
