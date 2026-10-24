// 21장 — Poisson 수율 곡선 (개념도)
import { ink, quiet, edge, grid, c1, c2, c3 } from './_c.js';

export default () => {
  const X0 = 120, X1 = 700, YB = 260, YT = 76;
  const curve = d0 => Array.from({ length: 41 }, (_, i) => { const A = 3 * i / 40; return `${i ? 'L' : 'M'}${(X0 + (X1 - X0) * A / 3).toFixed(1)} ${(YB - (YB - YT) * Math.exp(-A * d0)).toFixed(1)}`; }).join('');
  const gl = fr => <g><path d={`M${X0} ${YB - (YB - YT) * fr}H${X1}`} stroke={grid} strokeWidth='1' strokeDasharray='4 4' /><text x='108' y={YB - (YB - YT) * fr + 4} textAnchor='end' fontSize='11.5' fill={quiet}>{Math.round(fr * 100)}%</text></g>;
  const tick = A => <text x={X0 + (X1 - X0) * A / 3} y='278' textAnchor='middle' fontSize='11.5' fill={quiet}>{A}</text>;
  return <svg viewBox='0 0 760 336' role='img' aria-label='다이 면적이 커질수록, 결함밀도가 높을수록 수율이 지수적으로 떨어진다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>수율은 다이 면적에 지수적으로 떨어진다</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>Poisson 모델 Y = exp(−A·D₀) — A는 다이 면적, D₀는 결함밀도</text>
    {gl(0.25)}{gl(0.5)}{gl(0.75)}
    <path d={`M${X0} ${YT}V${YB}H${X1}`} fill='none' stroke={edge} strokeWidth='1.25' />
    <path d={curve(0.1)} fill='none' stroke={c3} strokeWidth='2' />
    <path d={curve(0.5)} fill='none' stroke={c1} strokeWidth='2' />
    <path d={curve(1.0)} fill='none' stroke={c2} strokeWidth='2' />
    <text x='108' y='68' textAnchor='end' fontSize='11.5' fill={quiet}>수율</text>
    {tick(0)}{tick(1)}{tick(2)}{tick(3)}
    <text x='700' y='300' textAnchor='end' fontSize='11.5' fill={quiet}>다이 면적 (cm²)</text>
    <text x='692' y='114' textAnchor='end' fontWeight='600' fill={ink}>D₀ = 0.1/cm²</text>
    <text x='692' y='209' textAnchor='end' fontWeight='600' fill={ink}>D₀ = 0.5/cm²</text>
    <text x='692' y='236' textAnchor='end' fontWeight='600' fill={ink}>D₀ = 1.0/cm²</text>
    <text x='24' y='324' fontSize='11.5' fill={quiet}>개념도: Poisson 수율 모델. 결함 클러스터링 보정은 Murphy (1964), Proc. IEEE 52, 1537, doi:10.1109/PROC.1964.3442</text>
  </svg>;
};
