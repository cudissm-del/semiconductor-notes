import { c1, c2, c5, ink, quiet, edge, grid, tint } from './_c.js';

// 하단 내부 스페이서 두께 변동 허용폭(Lee et al. 2022 TCAD, ΔTIS,B < 1 nm)에
// 캐비티 깊이 편차(Sun et al. 2024, ±0.3 nm)를 얹은 배분 개념도. 배분은 산술(±0.3을 범위로 보고 단순 합산한 가정).
const X0 = 250, X1 = 690, MAX = 1.2;
const px = v => X0 + v / MAX * (X1 - X0);
const H = 28;

export default () => <svg viewBox='0 0 760 360' role='img' aria-label='1 nm 허용폭 가운데 0.6 nm를 캐비티 깊이 편차가 쓰고, 에치백과 층간 차이에 0.4 nm가 남는다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>1 nm 안에 무엇이 들어가야 하나 — 하단 내부 스페이서의 변동 예산</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>TCAD가 요구한 허용폭에 실측 식각 편차를 얹어 본 산술. 두 값은 서로 다른 연구라 배분은 가정이다</text>
  {[0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2].map(v => <g><line x1={px(v)} y1='72' x2={px(v)} y2='252' stroke={grid} strokeDasharray='4 4'/><text x={px(v)} y='270' textAnchor='middle' fontSize='11' fill={quiet}>{v.toFixed(1)}</text></g>)}
  <line x1={X0} y1='252' x2={X1} y2='252' stroke={edge} strokeWidth='1.25'/>
  <text x={(X0 + X1) / 2} y='290' textAnchor='middle' fontSize='11.5' fill={quiet}>두께·깊이 변동 (nm)</text>

  <text x='24' y='96' fontSize='12' fontWeight='600' fill={ink}>허용폭 ΔTIS,B</text>
  <text x='24' y='112' fontSize='11' fill={quiet}>Lee et al. 2022, TCAD</text>
  <rect x={X0} y='84' width={px(1) - X0} height={H} fill='none' stroke={ink} strokeWidth='1.5'/>
  <text x={px(1) + 6} y='103' fontSize='11.5' fontWeight='600' fill={ink}>&lt; 1 nm</text>

  <text x='24' y='146' fontSize='12' fontWeight='600' fill={ink}>캐비티 깊이 편차</text>
  <text x='24' y='162' fontSize='11' fill={quiet}>Sun et al. 2024, ±0.3 nm</text>
  <rect x={X0} y='134' width={px(0.6) - X0} height={H} fill={c1}/>
  <text x={px(0.3)} y='153' textAnchor='middle' fontSize='11.5' fontWeight='600' fill='#fff'>0.6</text>
  <rect x={px(0.6)} y='134' width={px(1) - px(0.6)} height={H} fill={tint} stroke={edge} strokeDasharray='4 3'/>
  <text x={px(0.8)} y='153' textAnchor='middle' fontSize='11' fill={ink}>남는 0.4</text>
  <text x={px(1) + 6} y='146' fontSize='11' fill={quiet}>에치백 편차·</text>
  <text x={px(1) + 6} y='161' fontSize='11' fill={quiet}>층간 차이 몫</text>

  <text x='24' y='206' fontSize='12' fontWeight='600' fill={ink}>Si 손실 바닥 (별도 축)</text>
  <text x='24' y='222' fontSize='11' fill={quiet}>Sun et al. 2024, ~0.5 nm</text>
  <rect x={X0} y='194' width={px(0.5) - X0} height={H} fill={c5}/>
  <text x={px(0.5) + 8} y='206' fontSize='11' fill={ink}>시트 끝(S/D 에피가 자랄 면)에서 깎이는 양 —</text>
  <text x={px(0.5) + 8} y='221' fontSize='11' fill={ink}>스페이서 두께가 아니라 채널 끝 위치에 걸린다</text>

  <text x='24' y='318' fontSize='11' fill={quiet}>재구성: Lee et al., Nanomaterials 12, 3349 (2022) — TCAD 허용폭; Sun et al., Nanomaterials 14, 928 (2024), doi:10.3390/nano14110928 — Fig. 5·본문.</text>
  <text x='24' y='334' fontSize='11' fill={quiet}>산술: ±0.3 nm를 범위 0.6 nm로 보고 허용폭에서 뺐다(가정값). 실제 공정에서는 편차가 통계적으로 합쳐지므로 이 배분은 상한 쪽 감각이다.</text>
  <text x='24' y='350' fontSize='11' fill={quiet}>{'색: '}<tspan fill={c1}>■</tspan>{' 실측 편차 '}<tspan fill={c5}>■</tspan>{' 다른 축의 손실  □ 허용폭'}</text>
</svg>;
