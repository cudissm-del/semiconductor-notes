import { c1, c2, c3, ink, quiet, edge, grid, tint } from './_c.js';

// CFET 실증 6편의 연표 — 각 칸의 수치는 그 논문 안의 값(Joy 원문 추출 2026-11-02). 회사 색: Intel c1, TSMC c2, 삼성 c3.
const X0 = 70, X1 = 720, Y0 = 2020, Y1 = 2025.6;
const px = y => X0 + (y - Y0) / (Y1 - Y0) * (X1 - X0);
const P = [
  { y: 2020, row: 0, x: 24, ln: 1, c: c1, t: 'Huang 2020 · Intel', l: ['적층 나노리본 NMOS-on-PMOS', '상하 리본 간 50 nm', '듀얼 메탈 게이트, Vt 조정 각 ~350 mV'] },
  { y: 2023, row: 0, x: 270, ln: 0, c: c2, t: 'Liao 2023 · TSMC', l: ['게이트 피치 48 nm · Lg 15 nm', '고 Ge SiGe 자리로 MDI', '생존율 n·p 모두 >90 %'] },
  { y: 2023, row: 1, x: 270, ln: 0, c: c3, t: 'Park 2023 · 삼성', l: ['CPP 48·45 nm · Lg 13 nm', '하부 SD → 절연 → 상부 SD', '건식 리세스로 동작 수율 80 %'] },
  { y: 2023, row: 2, x: 270, ln: 1, c: c1, t: 'Radosavljević 2023 · Intel', l: ['CPP 60 nm', '수직 분리 30 nm', 'PowerVia + 후면 컨택(BSCON)'] },
  { y: 2024, row: 0, x: 490, ln: 1, c: c2, t: 'Liao 2024 · TSMC', l: ['인버터 48 nm, VDD ~1.2 V', '수직 다이폴: nFET Vt ≈ −160 mV', '후면 MOL(BMD·BVD·BVG)'] },
  { y: 2025, row: 1, x: 546, ln: 1, c: c2, t: 'Liao 2025 · TSMC', l: ['피치 < 48 nm · Lg < 15 nm', '101단 링 오실레이터', '6T SRAM, 셀 면적 < 70 %'] },
];
const BW = 200, BH = 74, rowY = r => 92 + r * 88;

export default () => <svg viewBox='0 0 760 440' role='img' aria-label='2020년 Intel 적층 나노리본에서 2025년 TSMC 링 오실레이터·SRAM까지 CFET 실증의 흐름' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>CFET 실증 5년 — 트랜지스터에서 회로로</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>각 칸의 수치는 그 논문 안의 값이다. 간격·수율의 정의가 논문마다 달라 칸끼리 크기를 비교하지 않는다</text>
  <line x1={X0} y1='370' x2={X1} y2='370' stroke={edge} strokeWidth='1.25'/>
  {[2020, 2021, 2022, 2023, 2024, 2025].map(y => <g><line x1={px(y)} y1='70' x2={px(y)} y2='370' stroke={grid} strokeDasharray='4 4'/><text x={px(y)} y='388' textAnchor='middle' fontSize='11.5' fill={quiet}>{y}</text></g>)}
  {P.map(p => { const x = p.x; const y = rowY(p.row); return <g>
    {p.ln ? <line x1={px(p.y)} y1={y + BH} x2={px(p.y)} y2='366' stroke={edge} strokeWidth='1.5'/> : null}
    <circle cx={px(p.y) + (p.y === 2023 ? (p.row - 1) * 12 : 0)} cy='370' r='5' fill={p.c}/>
    <rect x={x} y={y} width={BW} height={BH} rx='6' fill={tint} stroke={p.c} strokeWidth='1.5'/>
    <text x={x + 10} y={y + 18} fontSize='12' fontWeight='600' fill={ink}>{p.t}</text>
    {p.l.map((s, j) => <text x={x + 10} y={y + 36 + j * 15} fontSize='11' fill={ink}>{s}</text>)}
  </g>; })}
  <text x='24' y='412' fontSize='11' fill={quiet}>재구성: Huang IEDM 2020; Liao IEDM 2023·2024·2025; Park IEDM 2023; Radosavljević IEDM 2023 — 본문·초록·Fig. 캡션 수치(위치는 항목 통합 표).</text>
  <text x='24' y='428' fontSize='11' fill={quiet}>테두리 색: <tspan fill={c1}>■</tspan> Intel  <tspan fill={c2}>■</tspan> TSMC  <tspan fill={c3}>■</tspan> 삼성</text>
</svg>;
