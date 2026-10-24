// 17장 — 연결 피치와 단위 면적당 연결 수 (계산 그래프)
import { ink, quiet, edge, grid, tint, c1, c2 } from './_c.js';

export default () => {
  const LP = Math.log10(200);
  const X = p => 100 + (LP - Math.log10(p)) / LP * 600;
  const Y = d => 270 - Math.log10(d) / 6 * 190;
  const dens = p => 1e6 / (p * p);
  const xt = [200, 100, 50, 20, 10, 5, 2, 1];
  const yt = [[1, '1'], [10, '10'], [100, '100'], [1e3, '1천'], [1e4, '1만'], [1e5, '10만'], [1e6, '100만']];
  const pts = [[150, 'C4 플립칩', '피치 ~150µm → 약 44개/mm²', 10, 14], [40, '마이크로범프 (2.5D · HBM)', '피치 ~40µm → 약 625개/mm²', 10, 14], [10, '하이브리드 본딩', '피치 10µm → 1만 개/mm²', 10, 14]];
  return <svg viewBox='0 0 760 336' role='img' aria-label='연결 피치가 줄면 단위 면적당 연결 수는 제곱으로 늘어난다' fontSize='13'>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>연결 피치가 1/10이 되면 연결 수는 100배가 된다</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>정사각 격자로 배열했을 때 단위 면적당 연결 수 = 1 / 피치² — 피치는 본문 표의 대략값</text>
    <rect x={X(10)} y='76' width={700 - X(10)} height='194' fill={tint} />
    <text data-claude-text-id='hb-zone' x='692' y='262' textAnchor='end' fontSize='11.5' fill={quiet}>하이브리드 본딩 영역 (10µm 이하)</text>
    <g data-claude-anchor='grid' stroke={grid}>
      {yt.map(([d]) => <line x1='100' y1={Y(d)} x2='700' y2={Y(d)} />)}
    </g>
    <g data-claude-anchor='axes' stroke={edge} strokeWidth='1.25'>
      <line x1='100' y1='270' x2='700' y2='270' /><line x1='100' y1='76' x2='100' y2='270' />
    </g>
    {xt.map(p => <text x={X(p)} y='288' textAnchor='middle' fontSize='11.5' fill={quiet}>{p}</text>)}
    {yt.map(([d, t]) => <text x='92' y={Y(d) + 4} textAnchor='end' fontSize='11.5' fill={quiet}>{t}</text>)}
    <text data-claude-text-id='x-label' x='700' y='308' textAnchor='end' fontSize='11.5' fill={quiet}>연결 피치 (µm, 로그 눈금) — 오른쪽일수록 촘촘 →</text>
    <text data-claude-text-id='y-label' x='24' y='70' fontSize='11.5' fill={quiet}>mm²당 연결 수</text>
    <path d={`M${X(200)} ${Y(dens(200))}L${X(1)} ${Y(dens(1))}`} stroke={c1} strokeWidth='2' fill='none' />
    {pts.map(([p, name, val]) => <g>
      <circle cx={X(p)} cy={Y(dens(p))} r='5' fill={c2} />
      <text x={X(p) + 10} y={Y(dens(p)) + 16} fontSize='11.5' fontWeight='600' fill={ink}>{name}</text>
      <text x={X(p) + 10} y={Y(dens(p)) + 30} fontSize='11.5' fill={quiet}>{val}</text>
    </g>)}
    <text data-claude-text-id='note' x='24' y='328' fontSize='11.5' fill={quiet}>와이어 본딩은 칩 가장자리 한두 줄만 쓰므로 이 면적 밀도 비교에서 빠진다.</text>
  </svg>;
};
