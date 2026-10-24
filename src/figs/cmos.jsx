// 9장 — 로직 CMOS FEOL 단면 (평면형으로 단순화한 개념도)
import { ink, quiet, edge, tint, c1, c2, c3, c4, c5 } from './_c.js';

export default () => {
  const dev = (gx, sd, sdLabel) => <g>
    {/* S/D 에피 */}
    <path d={`M${gx - 110} 222V196Q${gx - 110} 188 ${gx - 100} 188H${gx - 38}V222Z`} fill={sd} fillOpacity='0.45' />
    <path d={`M${gx + 38} 222V188H${gx + 100}Q${gx + 110} 188 ${gx + 110} 196V222Z`} fill={sd} fillOpacity='0.45' />
    <text x={gx - 74} y='214' textAnchor='middle' fontSize='11' fill={ink}>{sdLabel}</text>
    <text x={gx + 74} y='214' textAnchor='middle' fontSize='11' fill={ink}>{sdLabel}</text>
    {/* 실리사이드 */}
    <rect x={gx - 104} y='184' width='62' height='4' fill={ink} fillOpacity='0.7' />
    <rect x={gx + 42} y='184' width='62' height='4' fill={ink} fillOpacity='0.7' />
    {/* 스페이서 */}
    <path d={`M${gx - 38} 200V160Q${gx - 38} 150 ${gx - 26} 150V200Z`} fill={edge} fillOpacity='0.55' />
    <path d={`M${gx + 38} 200V160Q${gx + 38} 150 ${gx + 26} 150V200Z`} fill={edge} fillOpacity='0.55' />
    {/* 게이트 */}
    <rect x={gx - 26} y='140' width='52' height='56' fill={c2} fillOpacity='0.55' stroke={edge} />
    <rect x={gx - 26} y='196' width='52' height='4' fill={c1} />
    <text x={gx} y='240' textAnchor='middle' fontSize='11' fill={quiet}>채널</text>
  </g>;
  return <svg viewBox='0 0 760 372' role='img' aria-label='로직 CMOS의 FEOL 단면 — 공정 순서 번호가 각각 무엇을 만드는지' fontSize='13'>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>FEOL이 끝난 CMOS 단면 — 공정 단계마다 무엇이 생기나</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>평면형으로 단순화한 개념도 (최신 노드는 FinFET · GAA, 11장). 번호는 본문의 공정 순서</text>
    <g data-claude-anchor='substrate'>
      <rect x='40' y='200' width='680' height='130' fill={tint} stroke={edge} strokeWidth='1.25' />
      <rect x='380' y='200' width='340' height='96' fill={c3} fillOpacity='0.16' />
      <line x1='380' y1='296' x2='720' y2='296' stroke={c3} strokeDasharray='4 3' />
      {[60, 360, 660].map(x => <rect x={x} y='200' width='40' height='50' fill={c5} fillOpacity='0.28' stroke={edge} />)}
    </g>
    {dev(230, c1, 'Si:P')}
    {dev(530, c4, 'SiGe:B')}
    <text data-claude-text-id='sti' x='380' y='268' textAnchor='middle' fontSize='11.5' fill={ink}>① STI</text>
    <text data-claude-text-id='pwell' x='230' y='290' textAnchor='middle' fontSize='11.5' fill={ink}>② p-well</text>
    <text data-claude-text-id='nwell' x='530' y='284' textAnchor='middle' fontSize='11.5' fill={ink}>② n-well</text>
    <text data-claude-text-id='sub' x='52' y='322' fontSize='11.5' fill={quiet}>p형 Si 기판</text>
    <g data-claude-anchor='callouts' stroke={edge}>
      <line x1='230' y1='140' x2='230' y2='108' />
      <line x1='196' y1='166' x2='132' y2='132' />
      <line x1='460' y1='186' x2='430' y2='130' />
      <line x1='610' y1='192' x2='640' y2='128' />
    </g>
    <text data-claude-text-id='gate' x='230' y='100' textAnchor='middle' fontSize='11.5' fill={ink}>③ 게이트 스택 (High-k + 금속)</text>
    <text data-claude-text-id='spacer' x='110' y='126' textAnchor='middle' fontSize='11.5' fill={ink}>④ SiN 스페이서</text>
    <text data-claude-text-id='silicide' x='430' y='122' textAnchor='middle' fontSize='11.5' fill={ink}>⑦ 실리사이드</text>
    <text data-claude-text-id='epi' x='640' y='120' textAnchor='middle' fontSize='11.5' fill={ink}>⑤ S/D 선택적 에피</text>
    <text data-claude-text-id='nmos' x='230' y='352' textAnchor='middle' fontWeight='600' fill={ink}>nMOS — 인장 응력 (Si:P)</text>
    <text data-claude-text-id='pmos' x='530' y='352' textAnchor='middle' fontWeight='600' fill={ink}>pMOS — 압축 응력 (SiGe)</text>
    <text data-claude-text-id='anneal' x='736' y='76' textAnchor='end' fontSize='11.5' fill={quiet}>⑥ 활성화 어닐은 구조가 아니라 도펀트 상태를 바꾼다</text>
  </svg>;
};
