// 5장 — 열산화 성장 곡선 (Deal-Grove 개념 재구성)
import { ink, quiet, edge, grid, c1, c2 } from './_c.js';

export default () => {
  const X0 = 120, X1 = 700, YB = 260, YT = 76;
  const dry = t => 0.52 * (Math.sqrt(t + 0.06) - Math.sqrt(0.06)) / (Math.sqrt(1.06) - Math.sqrt(0.06));
  const curve = f => Array.from({ length: 41 }, (_, i) => { const t = i / 40; return `${i ? 'L' : 'M'}${(X0 + (X1 - X0) * t).toFixed(1)} ${(YB - (YB - YT) * f(t)).toFixed(1)}`; }).join('');
  const gl = fr => <path d={`M${X0} ${YB - (YB - YT) * fr}H${X1}`} stroke={grid} strokeWidth='1' strokeDasharray='4 4' />;
  return <svg viewBox='0 0 760 336' role='img' aria-label='열산화막 두께는 처음에는 시간에 비례하고 두꺼워지면 시간의 제곱근에 비례한다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>열산화 — 처음엔 선형으로, 두꺼워지면 포물선으로</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>Deal-Grove 모델: 병목이 표면 반응에서 산화제 확산으로 바뀐다</text>
    {gl(0.25)}{gl(0.5)}{gl(0.75)}
    <path d={`M${X0} ${YT}V${YB}H${X1}`} fill='none' stroke={edge} strokeWidth='1.25' />
    <path d={curve(t => Math.min(0.95, 1.75 * dry(t)))} fill='none' stroke={c2} strokeWidth='2' />
    <path d={curve(dry)} fill='none' stroke={c1} strokeWidth='2' />
    <text x='108' y='84' textAnchor='end' fontSize='11.5' fill={quiet}>SiO₂ 두께</text>
    <text x='700' y='284' textAnchor='end' fontSize='11.5' fill={quiet}>산화 시간</text>
    <text x='692' y='84' textAnchor='end' fontWeight='600' fill={ink}>습식 (H₂O) — 수 배 빠름</text>
    <text x='692' y='156' textAnchor='end' fontWeight='600' fill={ink}>건식 (O₂) — 느리지만 치밀</text>
    <text x='140' y='120' fontSize='11.5' fill={quiet}>초기: 표면 반응 지배</text>
    <text x='140' y='138' fontSize='11.5' fill={quiet}>(두께 ∝ 시간)</text>
    <text x='404' y='218' fontSize='11.5' fill={quiet}>두꺼워지면: 산화제 확산 지배</text>
    <text x='404' y='236' fontSize='11.5' fill={quiet}>(두께 ∝ √시간)</text>
    <text x='24' y='324' fontSize='11.5' fill={quiet}>개념 재구성: B. E. Deal &amp; A. S. Grove, J. Appl. Phys. 36, 3770 (1965), doi:10.1063/1.1713945</text>
  </svg>;
};
