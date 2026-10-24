// 21장 — 공정 단계별 인라인 계측과 오프라인 분석 (본문 21-1 표 정리)
import { ink, quiet, edge, tint, c1, c2 } from './_c.js';

export default () => {
  const steps = [
    ['노광', ['CD-SEM (선폭)', '오버레이']],
    ['식각', ['CD-SEM', 'OCD (3D 형상)', '결함 검사']],
    ['증착', ['엘립소메트리', 'XRR · XRF']],
    ['CMP', ['막 두께', 'AFM (디싱)', '결함 검사']],
    ['이온주입 · 어닐', ['4탐침 (면저항)']],
  ];
  const bx = i => 24 + i * 146, bw = 128;
  const off = ['TEM · STEM — 단면 구조', 'XPS — 표면 화학', 'FTIR — 막 속 결합', 'SIMS — 도펀트 깊이'];
  return <svg viewBox='0 0 760 344' role='img' aria-label='공정 단계마다 인라인 계측으로 확인하고, 일부 웨이퍼는 잘라서 오프라인으로 분석한다' fontSize='13'>
    <defs><marker id='met-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={edge} /></marker></defs>
    <text data-claude-text-id='title' x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>어떤 공정 뒤에 무엇을 재나 — 인라인 계측과 오프라인 분석</text>
    <text data-claude-text-id='subtitle' x='24' y='48' fontSize='11.5' fill={quiet}>21-1 표를 공정 순서에 맞춰 다시 배치한 개념도 — 대표 예시만 표시</text>
    <path d={`M${bx(4) + bw / 2} 80V71H${bx(0) + bw / 2}V78`} fill='none' stroke={edge} strokeWidth='1.25' markerEnd='url(#met-arrow)' />
    <text data-claude-text-id='loop' x='380' y='64' textAnchor='middle' fontSize='11.5' fill={quiet}>층마다 반복</text>
    {steps.map(([name, ms], i) => <g>
      <rect x={bx(i)} y='80' width={bw} height='38' rx='8' fill='none' stroke={edge} strokeWidth='1.25' />
      <text x={bx(i) + bw / 2} y='104' textAnchor='middle' fontWeight='600' fill={ink}>{name}</text>
      {i < 4 && <path d={`M${bx(i) + bw} 99H${bx(i + 1) - 2}`} stroke={edge} strokeWidth='1.25' markerEnd='url(#met-arrow)' />}
      {ms.map((m, j) => <g>
        <rect x={bx(i) + 6} y={132 + j * 26} width={bw - 12} height='20' rx='10' fill={tint} stroke={c1} />
        <text x={bx(i) + bw / 2} y={146 + j * 26} textAnchor='middle' fontSize='11.5' fill={ink}>{m}</text>
      </g>)}
    </g>)}
    <path d='M380 214V238' stroke={edge} strokeWidth='1.25' strokeDasharray='4 3' markerEnd='url(#met-arrow)' />
    <text data-claude-text-id='sample' x='388' y='230' fontSize='11.5' fill={quiet}>일부 웨이퍼를 샘플링</text>
    <rect x='24' y='240' width='712' height='70' rx='8' fill={tint} stroke={edge} />
    <text data-claude-text-id='off-t' x='40' y='262' fontWeight='600' fill={ink}>오프라인 분석 — 잘라서 깊이 본다 (원인 분석 · 신공정 개발)</text>
    {off.map((t, i) => <g>
      <rect x={40 + i * 172} y='274' width='160' height='22' rx='11' fill='none' stroke={c2} />
      <text x={120 + i * 172} y='289' textAnchor='middle' fontSize='11.5' fill={ink}>{t}</text>
    </g>)}
    <g data-claude-anchor='legend' fontSize='11.5'>
      <rect x='24' y='322' width='22' height='12' rx='6' fill={tint} stroke={c1} />
      <text x='52' y='332' fill={quiet}>인라인 계측 (매번, 비파괴)</text>
      <rect x='220' y='322' width='22' height='12' rx='6' fill='none' stroke={c2} />
      <text x='248' y='332' fill={quiet}>오프라인 분석 (파괴)</text>
      <text x='736' y='332' textAnchor='end' fill={quiet}>라인 끝: WAT 전기 특성 → EDS 테스트 (16장)</text>
    </g>
  </svg>;
};
