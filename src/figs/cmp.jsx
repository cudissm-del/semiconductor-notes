// 8장 — CMP 장비 개념도와 디싱 · 이로전
import { ink, quiet, edge, tint, c1, c2 } from './_c.js';

export default () => <svg viewBox='0 0 760 356' role='img' aria-label='CMP는 압력과 회전으로 깎고, 패턴 밀도에 따라 결함이 생긴다' fontSize='13'>
  <defs><marker id='cmp-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={edge} /></marker></defs>
  <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>CMP는 압력과 회전으로 깎고, 패턴 밀도에 따라 결함이 생긴다</text>
  <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>왼쪽: 장비 측면 개념도 · 오른쪽: 금속 CMP 후 단면에서 보이는 두 가지 대표 결함</text>
  <g data-claude-anchor='tool'>
    <line x1='180' y1='96' x2='180' y2='170' stroke={edge} strokeWidth='6' />
    <line x1='206' y1='104' x2='206' y2='150' stroke={edge} strokeWidth='1.25' markerEnd='url(#cmp-arrow)' />
    <text data-claude-text-id='pressure' x='214' y='126' fontSize='11.5' fill={ink}>압력 P</text>
    <rect x='125' y='170' width='110' height='34' rx='4' fill={tint} stroke={edge} strokeWidth='1.25' />
    <text data-claude-text-id='head' x='180' y='192' textAnchor='middle' fontSize='11.5' fill={ink}>캐리어 헤드</text>
    <rect x='132' y='204' width='96' height='6' fill={c1} />
    <text data-claude-text-id='wafer' x='24' y='146' fontSize='11.5' fill={ink}>웨이퍼</text>
    <text data-claude-text-id='wafer-2' x='24' y='160' fontSize='11.5' fill={quiet}>(회로면이 아래)</text>
    <line x1='70' y1='166' x2='132' y2='206' stroke={edge} />
    <rect x='50' y='212' width='300' height='10' fill={c2} fillOpacity='0.35' stroke={edge} />
    <rect x='50' y='222' width='300' height='22' fill='none' stroke={edge} strokeWidth='1.25' />
    <path d='M150 254Q200 266 250 254' fill='none' stroke={edge} strokeWidth='1.25' markerEnd='url(#cmp-arrow)' />
    <text data-claude-text-id='platen' x='200' y='286' textAnchor='middle' fontSize='11.5' fill={ink}>연마 패드(주황) · 플래튼 — 함께 회전</text>
    <rect x='258' y='196' width='36' height='16' rx='3' fill={tint} stroke={edge} />
    <line x1='276' y1='196' x2='276' y2='150' stroke={edge} strokeWidth='2' />
    <text data-claude-text-id='cond' x='282' y='158' fontSize='11.5' fill={ink}>컨디셔너</text>
    <line x1='352' y1='128' x2='338' y2='186' stroke={edge} strokeWidth='3' />
    <circle cx='336' cy='198' r='3' fill={c2} /><circle cx='335' cy='207' r='2.5' fill={c2} />
    <text data-claude-text-id='slurry' x='356' y='120' textAnchor='end' fontSize='11.5' fill={ink}>슬러리</text>
    <text data-claude-text-id='preston' x='200' y='310' textAnchor='middle' fontSize='11.5' fill={quiet}>연마 속도 RR = Kp · P · V (압력 × 상대 속도)</text>
  </g>
  <g data-claude-anchor='dishing'>
    <text data-claude-text-id='dish-t' x='420' y='88' fontWeight='600' fill={ink}>디싱 (dishing)</text>
    <text data-claude-text-id='dish-d' x='420' y='106' fontSize='11.5' fill={quiet}>넓은 금속 패턴 가운데가 접시처럼 오목해짐</text>
    <rect x='420' y='136' width='300' height='54' fill={tint} stroke={edge} />
    <path d='M470 136Q535 168 600 136V182H470Z' fill={c1} fillOpacity='0.75' />
    <rect x='640' y='136' width='16' height='46' fill={c1} fillOpacity='0.75' />
    <line x1='460' y1='136' x2='610' y2='136' stroke={ink} strokeDasharray='4 3' />
    <text data-claude-text-id='dish-ref' x='535' y='129' textAnchor='middle' fontSize='11.5' fill={quiet}>원래 높이</text>
  </g>
  <g data-claude-anchor='erosion'>
    <text data-claude-text-id='ero-t' x='420' y='222' fontWeight='600' fill={ink}>이로전 (erosion)</text>
    <text data-claude-text-id='ero-d' x='420' y='240' fontSize='11.5' fill={quiet}>금속이 빽빽한 영역 전체가 주변보다 얇아짐</text>
    <path d='M420 262H490Q500 274 510 274H650Q660 274 670 262H720V320H420Z' fill={tint} stroke={edge} />
    {[0, 1, 2, 3, 4, 5].map(i => <rect x={516 + i * 22} y='274' width='12' height='34' fill={c1} fillOpacity='0.75' />)}
    <line x1='490' y1='262' x2='670' y2='262' stroke={ink} strokeDasharray='4 3' />
    <text data-claude-text-id='ero-ref' x='580' y='256' textAnchor='middle' fontSize='11.5' fill={quiet}>주변 높이</text>
  </g>
  <g data-claude-anchor='legend'>
    <rect x='420' y='334' width='12' height='12' rx='2' fill={c1} fillOpacity='0.75' />
    <text data-claude-text-id='lg-metal' x='438' y='344' fontSize='11.5' fill={quiet}>금속 (Cu · W)</text>
    <rect x='530' y='334' width='12' height='12' rx='2' fill={tint} stroke={edge} />
    <text data-claude-text-id='lg-diel' x='548' y='344' fontSize='11.5' fill={quiet}>절연막</text>
  </g>
</svg>;
