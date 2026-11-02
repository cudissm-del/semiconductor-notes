import { c1, c2, c3, c4, c5, ink, quiet, edge, tint } from './_c.js';

// GAA 흐름의 다섯 모듈에 문헌 실측 수치를 붙인 지도. 수치는 각 연구 안의 값이며 모듈끼리 비교하지 않는다.
const MODS = [
  { t: '초격자 에피', c: c1, lines: ['650 → 600 °C 분할 성장', 'Ge 확산계수 5.6–7 %', '하층 Ge 20 → ~18.5 %'], src: 'Yao 2026' },
  { t: '측면 리세스', c: c2, lines: ['0.98 nm/cycle', '깊이 ≤5 ± 0.3 nm', 'd/p 0.84'], src: 'Sun 2024' },
  { t: '내부 스페이서', c: c3, lines: ['두께 약 5 nm', 'SiN 에치백 SiN : Si 5.4', '하단 변동 < 1 nm 요구'], src: 'Loubet 2017 · Sun 2024 · Lee 2022' },
  { t: '채널 릴리스', c: c4, lines: ['터널 41.93 nm', 'Si 측벽 손실 0.25 nm', '168:1 (깊이 ÷ 손실)'], src: 'Sun 2023' },
  { t: '적층 (CFET)', c: c5, lines: ['CPP 48 nm · Lg 13 nm', '시트 폭 35 nm', 'S/D 절연층 건식 리세스'], src: 'Park 2023' },
];
const W = 136, G = 8, X = i => 24 + i * (W + G);

export default () => <svg viewBox='0 0 760 310' role='img' aria-label='GAA 흐름 다섯 모듈에 붙은 문헌 실측 수치' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>흐름 위의 숫자 — 모듈마다 무엇이 실측됐나</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>각 칸의 수치는 그 연구 안의 값이다. 연구마다 스택·조건이 달라 칸끼리 크기를 비교하지 않는다</text>
  {MODS.map((m, i) => <g>
    <rect x={X(i)} y='70' width={W} height='34' rx='6' fill={m.c}/>
    <text x={X(i) + W / 2} y='92' textAnchor='middle' fontSize='12.5' fontWeight='600' fill='#fff'>{m.t}</text>
    {i < MODS.length - 1 && <path d={`M${X(i) + W + 1} 87l${G - 2} 0`} stroke={edge} strokeWidth='1.5'/>}
    <rect x={X(i)} y='112' width={W} height='122' rx='6' fill={tint}/>
    {m.lines.map((l, j) => <text x={X(i) + 10} y={138 + j * 26} fontSize='11.5' fill={ink}>{l}</text>)}
    <text x={X(i) + 10} y='214' fontSize='10.5' fill={quiet}>{m.src.split(' · ')[0]}</text>
    {m.src.split(' · ').length > 1 && <text x={X(i) + 10} y='229' fontSize='10.5' fill={quiet}>{m.src.split(' · ').slice(1).join(' · ')}</text>}
  </g>)}
  <text x='24' y='262' fontSize='11' fill={quiet}>재구성: Yao et al., arXiv:2605.05667 (2026); Sun et al., Nanomaterials 14, 928 (2024) Fig. 5·본문; Loubet et al., VLSI (2017);</text>
  <text x='24' y='278' fontSize='11' fill={quiet}>Lee et al., Nanomaterials 12, 3349 (2022); Sun et al., Nanomaterials 13, 504 (2023) Fig. 4; Park et al., IEDM (2023) Fig. 4.</text>
  <text x='24' y='294' fontSize='11' fill={quiet}>수치는 Joy 원문 추출 패키지(2026-11-02)를 따랐다</text>
</svg>;
