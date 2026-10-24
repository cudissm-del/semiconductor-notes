// 2장 — CZ 단결정 성장과 웨이퍼 (개념도)
import { ink, quiet, edge, tint, c1, c3 } from './_c.js';

export default () => {
  const lead = (x1, x2, y) => <path d={`M${x1} ${y}H${x2}`} stroke={edge} strokeWidth='1' />;
  const lLabel = (y, name) => <text x='232' y={y} textAnchor='end' fontWeight='600' fill={ink}>{name}</text>;
  return <svg viewBox='0 0 760 340' role='img' aria-label='CZ법은 종자 결정을 용융 실리콘에서 회전하며 끌어올려 단결정 잉곳을 만든다' fontSize='13'>
    <defs><marker id='wafer-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={edge} /></marker></defs>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>웨이퍼는 단결정 잉곳을 길러 얇게 썬 것이다</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>CZ 인상법 — 종자 결정의 방향을 따라 용융 실리콘이 그대로 굳는다</text>
    <rect x='334' y='58' width='12' height='52' fill={tint} stroke={edge} strokeWidth='1' />
    <rect x='330' y='110' width='20' height='16' fill={c3} fillOpacity='0.55' stroke={c3} strokeWidth='1' />
    <path d='M322 126H358L382 154H298Z' fill={c3} fillOpacity='0.3' stroke={c3} strokeWidth='1' />
    <rect x='298' y='154' width='84' height='62' fill={c3} fillOpacity='0.3' stroke={c3} strokeWidth='1' />
    <path d='M256 216H424L404 284H276Z' fill={tint} stroke={edge} strokeWidth='1.25' />
    <path d='M264 216H416L402 264H278Z' fill={c1} fillOpacity='0.18' stroke='none' />
    <path d='M436 168V112' fill='none' stroke={edge} strokeWidth='1.25' markerEnd='url(#wafer-arrow)' />
    <text x='436' y='96' textAnchor='middle' fill={ink}>회전하며 천천히 인상</text>
    {lead(240, 326, 118)}{lLabel(122, '종자 결정')}
    {lead(240, 294, 182)}{lLabel(186, '단결정 잉곳')}
    {lead(240, 272, 240)}{lLabel(244, 'Si 용융액 (1414°C)')}
    {lead(240, 270, 278)}{lLabel(282, '석영 도가니')}
    <circle cx='592' cy='168' r='64' fill={tint} stroke={edge} strokeWidth='1.25' />
    <circle cx='592' cy='168' r='3' fill={edge} />
    <text x='592' y='262' textAnchor='middle' fontWeight='600' fill={ink}>300mm 웨이퍼</text>
    <text x='592' y='280' textAnchor='middle' fontSize='11.5' fill={quiet}>잉곳을 775µm로 썰어 연마한 것</text>
    <text x='380' y='322' textAnchor='middle' fontSize='11.5' fill={quiet}>잉곳 → 슬라이싱 (와이어소) → 래핑·에칭 → 연마 (CMP) → 세정·검사</text>
  </svg>;
};
