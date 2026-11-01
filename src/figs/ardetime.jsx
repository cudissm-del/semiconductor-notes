import { c1, c2, ink, quiet, edge, grid } from './_c.js';

// ARDE 단순 모델 — 바닥 상대 식각률 f = 1/(1 + 0.75·s·AR) (벽 비반응, 바닥 반응 확률 s, Dushman 근사 전도)
// dh/dt = f(h/d) 를 무차원 시간(t·R0/d) 0~200에서 적분. 자체 제작 모델 그림.
const X0 = 90, X1 = 640, Y0 = 290, Y1 = 92, TMAX = 200, HMAX = 200;
const px = t => X0 + t / TMAX * (X1 - X0);
const py = h => Y0 - h / HMAX * (Y0 - Y1);
function curve(s) {
  let h = 0, d = '';
  for (let i = 0; i <= 2000; i++) {
    const t = i * 0.1;
    if (i % 20 === 0) d += `${i ? 'L' : 'M'}${px(t).toFixed(1)} ${py(h).toFixed(1)}`;
    h += 0.1 / (1 + 0.75 * s * h);
  }
  return d;
}

export default () => <svg viewBox='0 0 760 360' role='img' aria-label='ARDE 단순 모델: 깊이는 처음에 선형으로 자라다 꺾인다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>ARDE: 깊이는 처음엔 선형, 깊어지면 꺾인다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>단순 모델 — 벽은 반응하지 않고 바닥에서만 반응 확률 s로 소모, 바닥 상대 식각률 f = 1/(1 + 0.75·s·AR)</text>
  {[50, 100, 150, 200].map(v => <g><line x1={X0} y1={py(v)} x2={X1} y2={py(v)} stroke={grid} strokeDasharray='4 4'/><text x={X0 - 8} y={py(v) + 4} textAnchor='end' fontSize='11' fill={quiet}>{v}</text></g>)}
  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={edge} strokeWidth='1.25'/>
  {[0, 50, 100, 150, 200].map(t => <text x={px(t)} y={Y0 + 18} textAnchor='middle' fontSize='11' fill={quiet}>{t}</text>)}
  <path d={`M${px(0)} ${py(0)}L${px(200)} ${py(200)}`} stroke={quiet} strokeWidth='1.4' strokeDasharray='6 5' fill='none'/>
  <path d={curve(0.02)} fill='none' stroke={c2} strokeWidth='2'/>
  <path d={curve(0.2)} fill='none' stroke={c1} strokeWidth='2'/>
  <text x={px(200) + 8} y={py(200) + 4} fontSize='11.5' fill={quiet}>수송 제한 없음</text>
  <text x={px(200) + 8} y={py(109.7) + 4} fontSize='11.5' fontWeight='600' fill={ink}>s = 0.02</text>
  <text x={px(200) + 8} y={py(45.4) + 4} fontSize='11.5' fontWeight='600' fill={ink}>s = 0.2</text>
  <text x={(X0 + X1) / 2} y={Y0 + 38} textAnchor='middle' fontSize='11.5' fill={quiet}>무차원 시간 (t × 평탄면 식각률 ÷ 입구 지름)</text>
  <text x={X0 - 8} y={Y1 - 12} textAnchor='end' fontSize='11.5' fill={quiet}>도달 깊이 (AR)</text>
  <text x='24' y='350' fontSize='11' fill={quiet}>자체 제작 모델 그림 — 이온·생성물 수송과 벽 반응은 넣지 않은 어림이다. 반응 확률이 클수록 일찍 꺾인다.</text>
</svg>;
