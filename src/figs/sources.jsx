import { c1, c2, c3, ink, quiet, edge, tint } from './_c.js';

// 플라즈마 소스 세 가지 단면 — CCP · ICP · 원격 (자체 제작 개념도)
const W = 224, Y0 = 72;

function Chamber(x0) {
  return <rect x={x0} y={Y0 + 30} width={W} height={170} rx='6' fill='none' stroke={edge} strokeWidth='1.5'/>;
}

function Wafer(x0, y) {
  return <g><rect x={x0 + 40} y={y} width={W - 80} height='12' rx='2' fill={edge} opacity='0.35'/><rect x={x0 + 56} y={y - 5} width={W - 112} height='5' fill={c3}/></g>;
}

function Rf(x, y, label, sub) {
  return <g><circle cx={x} cy={y} r='10' fill='none' stroke={c2} strokeWidth='1.5'/><path d={`M${x - 6} ${y}q3 -6 6 0t6 0`} fill='none' stroke={c2} strokeWidth='1.5'/><text x={x + 15} y={y - 1} fontSize='11.5' fontWeight='600' fill={ink}>{label}</text><text x={x + 15} y={y + 13} fontSize='11' fill={quiet}>{sub}</text></g>;
}

function Ccp() {
  const x0 = 24;
  return <g>
    <text x={x0} y={Y0 + 12} fontSize='13.5' fontWeight='600' fill={ink}>CCP — 용량결합</text>
    {Chamber(x0)}
    <rect x={x0 + 30} y={Y0 + 50} width={W - 60} height='10' fill={edge} opacity='0.6'/>
    <text x={x0 + W / 2} y={Y0 + 46} textAnchor='middle' fontSize='11' fill={quiet}>상부 전극(샤워헤드)</text>
    <rect x={x0 + 34} y={Y0 + 66} width={W - 68} height='74' fill={c1} opacity='0.28'/>
    <rect x={x0 + 34} y={Y0 + 60} width={W - 68} height='6' fill={tint}/>
    <rect x={x0 + 34} y={Y0 + 140} width={W - 68} height='10' fill={tint}/>
    <text x={x0 + W / 2} y={Y0 + 107} textAnchor='middle' fontSize='12' fill={ink}>벌크 플라즈마</text>
    <text x={x0 + W / 2} y={Y0 + 123} textAnchor='middle' fontSize='11' fill={quiet}>두 평판 사이 전체</text>
    {Wafer(x0, Y0 + 155)}
    <text x={x0 + W / 2} y={Y0 + 187} textAnchor='middle' fontSize='11' fill={quiet}>하부 전극 + 웨이퍼</text>
    {Rf(x0 + 20, Y0 + 228, 'RF 한 계통(또는 HF+LF)', '밀도와 이온 에너지가 얽힘')}
  </g>;
}

function Icp() {
  const x0 = 268;
  const coils = [0, 1, 2, 3, 4].map(i => <g><circle cx={x0 + 52 + i * 30} cy={Y0 + 40} r='5' fill='none' stroke={c2} strokeWidth='1.6'/></g>);
  return <g>
    <text x={x0} y={Y0 + 12} fontSize='13.5' fontWeight='600' fill={ink}>ICP — 유도결합</text>
    <rect x={x0} y={Y0 + 50} width={W} height={150} rx='6' fill='none' stroke={edge} strokeWidth='1.5'/>
    {coils}
    <text x={x0 + W} y={Y0 + 26} textAnchor='end' fontSize='11' fill={quiet}>평면 코일 · 유전체 창</text>
    <rect x={x0} y={Y0 + 50} width={W} height='10' fill={tint} stroke={edge} strokeWidth='1'/>
    <rect x={x0 + 10} y={Y0 + 60} width={W - 20} height='22' fill={c1} opacity='0.55'/>
    <rect x={x0 + 10} y={Y0 + 82} width={W - 20} height='58' fill={c1} opacity='0.25'/>
    <text x={x0 + 18} y={Y0 + 96} fontSize='11' fill={ink}>창 아래 표피 깊이에서 전력 흡수</text>
    <text x={x0 + 18} y={Y0 + 112} fontSize='11' fill={quiet}>→ 확산으로 웨이퍼까지</text>
    {Wafer(x0, Y0 + 155)}
    <text x={x0 + W / 2} y={Y0 + 187} textAnchor='middle' fontSize='11' fill={quiet}>정전척 + 웨이퍼</text>
    {Rf(x0 + 20, Y0 + 228, '코일 RF + 바이어스 RF', '밀도와 에너지를 따로')}
  </g>;
}

function Remote() {
  const x0 = 512;
  const arrows = [0, 1, 2, 3].map(i => <path d={`M${x0 + 66 + i * 30} ${Y0 + 126}v16`} stroke={c3} strokeWidth='1.6' markerEnd='url(#srcArrow)'/>);
  return <g>
    <text x={x0} y={Y0 + 12} fontSize='13.5' fontWeight='600' fill={ink}>원격 — 다운스트림</text>
    <rect x={x0 + W / 2 - 30} y={Y0 + 20} width='60' height='34' rx='6' fill={c1} opacity='0.55' stroke={edge}/>
    <text x={x0 + W / 2 + 38} y={Y0 + 34} fontSize='11' fill={ink}>상류 방전부</text>
    <text x={x0 + W / 2 + 38} y={Y0 + 48} fontSize='11' fill={quiet}>(RPS)</text>
    <rect x={x0 + W / 2 - 8} y={Y0 + 54} width='16' height='48' fill={tint} stroke={edge}/>
    <text x={x0 + W / 2 - 16} y={Y0 + 72} textAnchor='end' fontSize='11' fill={quiet}>수송관: 이온·전자</text>
    <text x={x0 + W / 2 - 16} y={Y0 + 86} textAnchor='end' fontSize='11' fill={quiet}>재결합으로 소멸</text>
    <rect x={x0} y={Y0 + 102} width={W} height={98} rx='6' fill='none' stroke={edge} strokeWidth='1.5'/>
    <line x1={x0 + 20} y1={Y0 + 120} x2={x0 + W - 20} y2={Y0 + 120} stroke={edge} strokeWidth='2' strokeDasharray='6 5'/>
    <text x={x0 + W - 22} y={Y0 + 115} textAnchor='end' fontSize='11' fill={quiet}>분배판·격자</text>
    {arrows}
    {Wafer(x0, Y0 + 155)}
    <text x={x0 + W / 2} y={Y0 + 187} textAnchor='middle' fontSize='11' fill={quiet}>웨이퍼: 라디칼만 도달</text>
    {Rf(x0 + 20, Y0 + 228, '방전부 전력만', '이온 에너지 없음(등방)')}
  </g>;
}

export default () => <svg viewBox='0 0 760 360' role='img' aria-label='플라즈마 소스 세 가지 단면 — CCP, ICP, 원격 플라즈마' fontSize='12'>
  <defs><marker id='srcArrow' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={c3}/></marker></defs>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>플라즈마 소스 세 가지 단면</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>전력이 전자에 닿는 자리와, 웨이퍼에 무엇이 도착하는지가 갈린다</text>
  {Ccp()}
  {Icp()}
  {Remote()}
  <g>
    <rect x='24' y='326' width='14' height='10' fill={c1} opacity='0.45'/><text x='44' y='335' fontSize='11.5' fill={quiet}>플라즈마(진할수록 전력 흡수가 큼)</text>
    <rect x='250' y='326' width='14' height='10' fill={tint}/><text x='270' y='335' fontSize='11.5' fill={quiet}>쉬스·창·수송관</text>
    <rect x='380' y='326' width='14' height='6' fill={c3}/><text x='400' y='335' fontSize='11.5' fill={quiet}>웨이퍼·라디칼</text>
    <circle cx='503' cy='331' r='6' fill='none' stroke={c2} strokeWidth='1.5'/><text x='516' y='335' fontSize='11.5' fill={quiet}>RF 전원·코일</text>
  </g>
  <text x='24' y='354' fontSize='11' fill={quiet}>자체 제작 개념도 — 교재 전형 구성(Lieberman & Lichtenberg, 2005). 크기·간격은 비례가 아니다.</text>
</svg>;
