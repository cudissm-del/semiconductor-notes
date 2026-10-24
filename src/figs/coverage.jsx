// 5장 — PVD · CVD · ALD 스텝 커버리지 (개념도)
import { ink, quiet, edge, tint, c1 } from './_c.js';

export default () => {
  const xs = [40, 280, 520];
  const sub = x => `M${x} 130H${x + 70}V250H${x + 130}V130H${x + 200}V270H${x}Z`;
  const back = x => `V130H${x + 130}V250H${x + 70}V130H${x}Z`;
  const films = [
    x => `M${x} 116H${x + 66}Q${x + 84} 118 ${x + 82} 132Q${x + 80} 140 ${x + 72} 142L${x + 72} 246Q${x + 100} 242 ${x + 128} 246L${x + 128} 142Q${x + 120} 140 ${x + 118} 132Q${x + 116} 118 ${x + 134} 116H${x + 200}` + back(x),
    x => `M${x} 120H${x + 78}L${x + 74} 245H${x + 126}L${x + 122} 120H${x + 200}` + back(x),
    x => `M${x} 122H${x + 78}V242H${x + 122}V122H${x + 200}` + back(x),
  ];
  const names = [['PVD (스퍼터)', '직진하는 원자 → 입구 오버행, 측벽은 얇다'], ['CVD', '표면 반응 → 비교적 고르지만 바닥 쪽이 얇다'], ['ALD', '자기제한 반응 → 어디서나 같은 두께']];
  return <svg viewBox='0 0 760 356' role='img' aria-label='같은 트렌치라도 증착 방식에 따라 막이 덮이는 모양이 다르다' fontSize='13'>
    <defs><marker id='cov-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={edge} /></marker></defs>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>같은 트렌치라도 증착 방식에 따라 막이 덮이는 모양이 다르다</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>트렌치 단면 개념도 — 파란 부분이 새로 올린 막, 두께 차이는 과장해서 그림</text>
    {xs.map((x, i) => <g data-claude-anchor={`panel-${i}`}>
      <path d={sub(x)} fill={tint} stroke={edge} strokeWidth='1.25' />
      <path d={films[i](x)} fill={c1} fillOpacity='0.75' stroke='none' />
      <text data-claude-text-id={`name-${i}`} x={x + 100} y='298' textAnchor='middle' fontWeight='600' fill={ink}>{names[i][0]}</text>
      <text data-claude-text-id={`desc-${i}`} x={x + 100} y='316' textAnchor='middle' fontSize='11.5' fill={quiet}>{names[i][1]}</text>
    </g>)}
    <g data-claude-anchor='pvd-arrows' stroke={edge} strokeWidth='1.25'>
      {[60, 100, 140].map(dx => <line x1={40 + dx} y1='66' x2={40 + dx} y2='98' markerEnd='url(#cov-arrow)' />)}
    </g>
    <text data-claude-text-id='pvd-overhang' x='166' y='152' fontSize='11.5' fill={ink}>← 오버행</text>
    <text data-claude-text-id='cvd-note' x='380' y='96' textAnchor='middle' fontSize='11.5' fill={quiet}>기체가 구조 속으로 확산하며 반응</text>
    <text data-claude-text-id='ald-note' x='620' y='96' textAnchor='middle' fontSize='11.5' fill={quiet}>한 사이클씩 표면 전체가 포화</text>
    <g data-claude-anchor='legend'>
      <rect x='24' y='334' width='12' height='12' rx='2' fill={c1} fillOpacity='0.75' />
      <text data-claude-text-id='legend-film' x='42' y='344' fontSize='11.5' fill={quiet}>증착된 막</text>
      <rect x='118' y='334' width='12' height='12' rx='2' fill={tint} stroke={edge} />
      <text data-claude-text-id='legend-sub' x='136' y='344' fontSize='11.5' fill={quiet}>기판 (패턴된 구조)</text>
      <text data-claude-text-id='legend-note' x='736' y='344' textAnchor='end' fontSize='11.5' fill={quiet}>스텝 커버리지 = 측벽·바닥 두께 ÷ 윗면 두께</text>
    </g>
  </svg>;
};
