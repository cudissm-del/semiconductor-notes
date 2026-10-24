// 7장 — 이온주입 깊이 분포와 어닐에 따른 확산 (가우시안 근사 개념도)
import { ink, quiet, edge, grid, c1, c2, c3 } from './_c.js';

export default () => {
  const X = d => 90 + d * 600, Y = l => 270 - (l - 15) / 6 * 200;
  const Rp = 0.22, s0 = 0.07, bg = 16.5;
  const prof = s => d => 20 + Math.log10(s0 / s) - 0.4343 * (d - Rp) ** 2 / (2 * s * s);
  const path = f => {
    const pts = [];
    for (let i = 0; i <= 200; i++) { const d = i / 200, l = f(d); if (l >= 15) pts.push(`${pts.length ? 'L' : 'M'}${X(d).toFixed(1)} ${Y(l).toFixed(1)}`); }
    return pts.join('');
  };
  const xj = s => Rp + Math.sqrt((20 + Math.log10(s0 / s) - bg) * 2 * s * s / 0.4343);
  const curves = [[s0, c1, '', '주입 직후'], [0.085, c2, '', '스파이크·밀리초 어닐 — 확산 거의 없음'], [0.16, c3, '6 4', '퍼니스 어닐 — 넓게 퍼짐']];
  const tail = `M${X(0.38)} ${Y(prof(s0)(0.38))}L${X(0.75)} ${Y(16)}`;
  return <svg viewBox='0 0 760 330' role='img' aria-label='에너지는 깊이를, 도즈는 농도를 정하고, 어닐은 분포를 넓힌다' fontSize='13'>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>에너지는 깊이를, 도즈는 농도를 정하고, 어닐은 분포를 넓힌다</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>주입된 도펀트의 깊이 분포 개념도 (가우시안 근사) — 분포가 기판 도핑과 만나는 깊이가 접합 깊이 Xj</text>
    <g data-claude-anchor='axes'>
      <line x1='90' y1='270' x2='700' y2='270' stroke={edge} strokeWidth='1.25' />
      <line x1='90' y1='66' x2='90' y2='270' stroke={edge} strokeWidth='1.25' />
      <line x1={X(Rp)} y1='66' x2={X(Rp)} y2='270' stroke={grid} strokeDasharray='4 4' />
      <line x1='90' y1={Y(bg)} x2='700' y2={Y(bg)} stroke={edge} strokeDasharray='2 3' />
    </g>
    <text data-claude-text-id='y-label' x='80' y='76' textAnchor='end' fontSize='11.5' fill={quiet}>농도</text>
    <text data-claude-text-id='y-label-2' x='80' y='90' textAnchor='end' fontSize='11.5' fill={quiet}>(로그)</text>
    <text data-claude-text-id='x-label' x='700' y='290' textAnchor='end' fontSize='11.5' fill={quiet}>표면으로부터의 깊이 →</text>
    <text data-claude-text-id='x-zero' x='90' y='290' textAnchor='middle' fontSize='11.5' fill={quiet}>표면</text>
    <text data-claude-text-id='bg-label' x='98' y={Y(bg) - 6} fontSize='11.5' fill={quiet}>기판(웰) 도핑 농도</text>
    <text data-claude-text-id='rp-label' x={X(Rp) + 6} y='80' fontSize='11.5' fill={ink}>Rp (평균 깊이) — 가속 에너지가 정함</text>
    {curves.map(([s, col, dash]) => <path d={path(prof(s))} fill='none' stroke={col} strokeWidth='2' strokeDasharray={dash || 'none'} />)}
    <path d={tail} fill='none' stroke={c1} strokeWidth='1.5' strokeDasharray='3 3' />
    <line x1='300' y1='238' x2='358' y2='163' stroke={edge} />
    <text data-claude-text-id='tail-label' x='236' y='252' fontSize='11.5' fill={ink}>채널링 꼬리 (점선)</text>
    {curves.map(([s, col]) => <g><line x1={X(xj(s))} y1={Y(bg) - 5} x2={X(xj(s))} y2={Y(bg) + 5} stroke={col} strokeWidth='2' /><text x={X(xj(s))} y={Y(bg) + 20} textAnchor='middle' fontSize='11.5' fill={col}>Xj</text></g>)}
    <g data-claude-anchor='legend'>
      {curves.map(([, col, dash, label], i) => <g>
        <line x1='440' y1={86 + i * 20} x2='470' y2={86 + i * 20} stroke={col} strokeWidth='2' strokeDasharray={dash || 'none'} />
        <text x='478' y={90 + i * 20} fontSize='11.5' fill={ink}>{label}</text>
      </g>)}
    </g>
    <text data-claude-text-id='note' x='24' y='316' fontSize='11.5' fill={quiet}>곡선의 폭은 ΔRp(퍼짐), 곡선 아래 넓이는 도즈. 어닐 시간이 길수록 도즈는 그대로인 채 분포가 낮고 넓어진다.</text>
  </svg>;
};
