// 16장 — 와이어 본딩과 플립칩 패키지 단면 (개념도)
import { ink, quiet, edge, tint, c1, c2, c3, c5 } from './_c.js';

export default () => {
  const balls = (x0, x1) => { const out = []; for (let x = x0; x <= x1; x += 30) out.push(<circle cx={x} cy='250' r='7' fill={edge} fillOpacity='0.55' />); return out; };
  return <svg viewBox='0 0 760 330' role='img' aria-label='와이어 본딩은 칩 가장자리로, 플립칩은 칩 면 전체로 연결한다' fontSize='13'>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>와이어 본딩은 칩 가장자리로, 플립칩은 칩 면 전체로 연결한다</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>BGA 패키지 단면 개념도 — 크기 비율은 실제와 다름</text>
    <g data-claude-anchor='wire'>
      <rect x='60' y='112' width='280' height='108' rx='4' fill={c5} fillOpacity='0.08' stroke={edge} strokeDasharray='5 3' />
      <rect x='130' y='182' width='140' height='32' fill={c1} fillOpacity='0.3' stroke={edge} />
      <rect x='130' y='214' width='140' height='6' fill={c3} fillOpacity='0.6' />
      <rect x='134' y='178' width='10' height='4' fill={c2} /><rect x='256' y='178' width='10' height='4' fill={c2} />
      <path d='M139 178Q128 128 86 220M261 178Q272 128 314 220' fill='none' stroke={c2} strokeWidth='2' />
      <rect x='50' y='220' width='300' height='20' fill={tint} stroke={edge} strokeWidth='1.25' />
      {balls(65, 335)}
    </g>
    <text data-claude-text-id='w-die' x='200' y='202' textAnchor='middle' fontSize='11.5' fill={ink}>다이 (회로면 위)</text>
    <text data-claude-text-id='w-wire' x='200' y='150' textAnchor='middle' fontSize='11.5' fill={ink}>Au · Cu 와이어</text>
    <text data-claude-text-id='w-emc' x='70' y='128' fontSize='11.5' fill={quiet}>EMC 몰딩</text>
    <g data-claude-anchor='flip'>
      <rect x='480' y='156' width='160' height='34' fill={c1} fillOpacity='0.3' stroke={edge} />
      <rect x='474' y='190' width='172' height='30' fill={c3} fillOpacity='0.22' />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <circle cx={492 + i * 17} cy='202' r='6' fill={c2} fillOpacity='0.85' />)}
      <rect x='410' y='220' width='300' height='20' fill={tint} stroke={edge} strokeWidth='1.25' />
      {balls(425, 695)}
    </g>
    <text data-claude-text-id='f-die' x='560' y='177' textAnchor='middle' fontSize='11.5' fill={ink}>다이 (회로면 아래)</text>
    <text data-claude-text-id='f-bump' x='652' y='202' fontSize='11.5' fill={ink}>범프</text>
    <text data-claude-text-id='f-uf' x='560' y='140' textAnchor='middle' fontSize='11.5' fill={quiet}>범프 사이는 언더필(초록)로 채워 응력 완화</text>
    <text data-claude-text-id='sub-l' x='200' y='274' textAnchor='middle' fontSize='11.5' fill={quiet}>패키지 기판 + BGA 솔더볼</text>
    <text data-claude-text-id='sub-r' x='560' y='274' textAnchor='middle' fontSize='11.5' fill={quiet}>패키지 기판 + BGA 솔더볼</text>
    <text data-claude-text-id='name-l' x='200' y='300' textAnchor='middle' fontWeight='600' fill={ink}>와이어 본딩</text>
    <text data-claude-text-id='desc-l' x='200' y='318' textAnchor='middle' fontSize='11.5' fill={quiet}>가장자리 패드만 연결 → I/O 수 제한, 경로 김</text>
    <text data-claude-text-id='name-r' x='560' y='300' textAnchor='middle' fontWeight='600' fill={ink}>플립칩</text>
    <text data-claude-text-id='desc-r' x='560' y='318' textAnchor='middle' fontSize='11.5' fill={quiet}>칩 면 전체를 범프로 연결 → I/O 많고 경로 짧음</text>
  </svg>;
};
