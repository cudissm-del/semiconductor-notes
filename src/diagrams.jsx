// 강의노트 그림 모음 — 빌드 시 정적 SVG 문자열로 렌더링된다.
// 색은 사이트 CSS의 --cds-* 변수(라이트/다크 대응)를 그대로 쓴다.
import { h as __h } from './jsx.js';
import synergy from './figs/synergy.jsx';
import fcfilm from './figs/fcfilm.jsx';
import arde from './figs/arde.jsx';
import selflimit from './figs/selflimit.jsx';
import coverage from './figs/coverage.jsx';
import implant from './figs/implant.jsx';
import cmp from './figs/cmp.jsx';
import cmos from './figs/cmos.jsx';
import dramcell from './figs/dramcell.jsx';
import cellarea from './figs/cellarea.jsx';
import bond from './figs/bond.jsx';
import pitch from './figs/pitch.jsx';
import kvalue from './figs/kvalue.jsx';
import metrology from './figs/metrology.jsx';
import wafer from './figs/wafer.jsx';
import oxidation from './figs/oxidation.jsx';
import yieldCurve from './figs/yield.jsx';
import afsCycle from './figs/afscycle.jsx';
import afsTemp from './figs/afstemp.jsx';
import xpsFig from './figs/xps.jsx';

const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', edge = 'var(--cds-chart-axis)', tint = 'var(--cds-chart-reference-tint)';
const c1 = 'var(--cds-chart-categorical-1)', c2 = 'var(--cds-chart-categorical-2)', c3 = 'var(--cds-chart-categorical-3)', c4 = 'var(--cds-chart-categorical-4)', c5 = 'var(--cds-chart-categorical-5)';

// 2장 — 전체 공정 흐름
export const flow = () => {
  const bw = 146, bh = 56, cyA = 140, bw2 = 116, cyB = 290;
  const ax = i => 40 + i * 178; const bx = i => 40 + i * 141;
  const boxA = i => <rect x={ax(i)} y={cyA - bh / 2} width={bw} height={bh} rx='8' fill='none' stroke={edge} strokeWidth='1.25' />;
  const boxB = i => <rect x={bx(i)} y={cyB - bh / 2} width={bw2} height={bh} rx='8' fill='none' stroke={edge} strokeWidth='1.25' />;
  const A = [['웨이퍼 준비', 'Si 웨이퍼 · 세정'], ['FEOL', '트랜지스터 형성'], ['MOL', '컨택 연결'], ['BEOL', '다층 금속 배선']];
  const B = [['EDS', '다이별 검사'], ['BG · 다이싱', '박막화 · 절단'], ['본딩', '와이어 · 플립칩'], ['몰딩', 'EMC 봉지'], ['최종 테스트', '등급 · 번인']];
  return <svg viewBox='0 0 760 358' role='img' aria-label='회로는 팹에서 완성되고, 칩은 후공정에서 만들어진다' fontSize='13'>
    <defs><marker id='flow-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={edge} /></marker></defs>
    <text x='24' y='34' fontSize='15' fontWeight='600' fill={ink}>회로는 팹에서 완성되고, 칩은 후공정에서 만들어진다</text>
    <rect x='24' y='56' width='712' height='128' rx='8' fill={tint} stroke={edge} strokeWidth='1' />
    <text x='40' y='80' fontWeight='600' fill={ink}>전공정 (Front-end) · 웨이퍼 팹</text>
    <rect x='24' y='224' width='712' height='110' rx='8' fill={tint} stroke={edge} strokeWidth='1' />
    <text x='720' y='248' textAnchor='end' fontWeight='600' fill={ink}>후공정 (Back-end) · 테스트와 패키징</text>
    <g fill='none' stroke={edge} strokeWidth='1.25'>
      <path d={`M${ax(0) + bw} ${cyA}H${ax(1)}`} markerEnd='url(#flow-arrow)' />
      <path d={`M${ax(1) + bw} ${cyA}H${ax(2)}`} markerEnd='url(#flow-arrow)' />
      <path d={`M${ax(2) + bw} ${cyA}H${ax(3)}`} markerEnd='url(#flow-arrow)' />
      <path d={`M${ax(3) + bw / 2} ${cyA + bh / 2}V208H${bx(0) + bw2 / 2}V${cyB - bh / 2}`} markerEnd='url(#flow-arrow)' />
      {[0, 1, 2, 3].map(i => <path d={`M${bx(i) + bw2} ${cyB}H${bx(i + 1)}`} markerEnd='url(#flow-arrow)' />)}
    </g>
    <text x='380' y='202' textAnchor='middle' fontSize='11.5' fill={quiet}>회로가 완성된 웨이퍼</text>
    {A.map(([n, s], i) => <g>{boxA(i)}<text x={ax(i) + bw / 2} y={cyA - 4} textAnchor='middle' fontWeight='600' fill={ink}>{n}</text><text x={ax(i) + bw / 2} y={cyA + 16} textAnchor='middle' fontSize='11.5' fill={quiet}>{s}</text></g>)}
    {B.map(([n, s], i) => <g>{boxB(i)}<text x={bx(i) + bw2 / 2} y={cyB - 4} textAnchor='middle' fontWeight='600' fill={ink}>{n}</text><text x={bx(i) + bw2 / 2} y={cyB + 16} textAnchor='middle' fontSize='11.5' fill={quiet}>{s}</text></g>)}
  </svg>;
};

// 2장 — 칩 단면 층 구조
export const stack = () => {
  const pk = c4, be = c1, mo = c2, fe = c3;
  const band = (y, h, c) => <rect x='184' y={y} width='320' height={h} rx='6' fill={c} fillOpacity='0.12' stroke={c} strokeWidth='1.25' />;
  const brace = (y1, y2, c) => <path d={`M512 ${y1}H524V${y2}H512`} fill='none' stroke={c} strokeWidth='1.5' />;
  const label = (y, t) => <text x='344' y={y} textAnchor='middle' fill={ink}>{t}</text>;
  const group = (y, name, note) => <g><text x='540' y={y} fontWeight='600' fill={ink}>{name}</text><text x='540' y={y + 16} fontSize='11.5' fill={quiet}>{note}</text></g>;
  return <svg viewBox='0 0 760 384' role='img' aria-label='칩 단면은 기판에서 위로 FEOL, MOL, BEOL, 범프 순으로 쌓인다' fontSize='13'>
    <defs><marker id='stack-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={edge} /></marker></defs>
    <text x='24' y='34' fontSize='15' fontWeight='600' fill={ink}>칩 단면은 기판에서 위로 FEOL → MOL → BEOL → 범프 순으로 쌓인다</text>
    <path d='M150 356V68' fill='none' stroke={edge} strokeWidth='1.25' markerEnd='url(#stack-arrow)' />
    <text x='24' y='204' fontWeight='600' fill={ink}>제조 순서</text><text x='24' y='222' fontSize='11.5' fill={quiet}>아래에서 위로</text>
    {band(60, 36, pk)}{label(82, '솔더 범프 · 패드 · 패시베이션')}
    {band(102, 48, be)}{label(130, '상부 배선 (Global): 전원망 · 클럭')}
    {band(156, 40, be)}{label(180, '중간 배선 (Intermediate)')}
    {band(202, 32, be)}{label(222, '하부 배선 M1·M2 (Local): 최소 피치')}
    {band(240, 32, mo)}{label(260, '컨택 플러그 W/Co · PMD 절연막')}
    {band(278, 40, fe)}{label(302, '트랜지스터: 게이트 · S/D · STI')}
    {band(324, 36, fe)}{label(346, '실리콘 기판')}
    {brace(60, 96, pk)}{group(76, '후공정 · 패키징', '기판 · 인터포저와 연결')}
    {brace(102, 234, be)}{group(164, 'BEOL', '~400°C 이하 · Cu, low-k')}
    {brace(240, 272, mo)}{group(254, 'MOL', '컨택 저항 · SAC')}
    {brace(278, 360, fe)}{group(316, 'FEOL', '고온 공정 허용')}
  </svg>;
};

// 3장 — SADP
export const sadp = () => {
  const man = c1, sp = c3, tg = c5;
  const px = i => 26 + i * 144;
  const sub = i => <rect x={px(i) + 8} y='170' width='116' height='10' fill={tint} stroke={edge} strokeWidth='1' />;
  const film = i => <rect x={px(i) + 8} y='150' width='116' height='20' fill={tg} fillOpacity='0.45' stroke={tg} strokeWidth='1' />;
  const mand = i => <g>{[22, 82].map(d => <rect x={px(i) + d} y='110' width='28' height='40' fill={man} fillOpacity='0.35' stroke={man} strokeWidth='1.25' />)}</g>;
  const spc = i => <g>{[15, 50, 75, 110].map(d => <rect x={px(i) + d} y='110' width='7' height='40' fill={sp} stroke={sp} />)}</g>;
  const conf = i => <g><rect x={px(i) + 15} y='103' width='42' height='47' fill={sp} fillOpacity='0.7' stroke={sp} /><rect x={px(i) + 75} y='103' width='42' height='47' fill={sp} fillOpacity='0.7' stroke={sp} /><rect x={px(i) + 8} y='143' width='116' height='7' fill={sp} fillOpacity='0.7' stroke={sp} /></g>;
  const lines = i => <g>{[15, 50, 75, 110].map(d => <rect x={px(i) + d} y='150' width='7' height='20' fill={tg} fillOpacity='0.45' stroke={tg} />)}</g>;
  const cap = (i, n, s) => <g><text x={px(i) + 66} y='206' textAnchor='middle' fontWeight='600' fill={ink}>{n}</text><text x={px(i) + 66} y='224' textAnchor='middle' fontSize='11.5' fill={quiet}>{s}</text></g>;
  return <svg viewBox='0 0 760 276' role='img' aria-label='SADP는 선 2개를 찍어 4개를 얻는다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>SADP는 선 2개를 찍어 4개를 얻는다 — 피치가 절반으로</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>선폭을 정하는 것은 노광이 아니라 스페이서 ALD 두께</text>
    <g>{sub(0)}{film(0)}{mand(0)}{cap(0, '① 맨드릴 패턴', '노광·식각')}</g>
    <g>{sub(1)}{film(1)}{conf(1)}{mand(1)}{cap(1, '② 스페이서 ALD', '컨포멀하게 덮음')}</g>
    <g>{sub(2)}{film(2)}{mand(2)}{spc(2)}{cap(2, '③ 에치백', '측벽만 남김')}</g>
    <g>{sub(3)}{film(3)}{spc(3)}{cap(3, '④ 맨드릴 제거', '스페이서가 마스크')}</g>
    <g>{sub(4)}{lines(4)}{cap(4, '⑤ 하부막 전사', '선 4개, 피치 1/2')}</g>
    <rect x='200' y='248' width='14' height='12' rx='2' fill={man} fillOpacity='0.35' stroke={man} /><text x='220' y='258' fontSize='11.5' fill={quiet}>맨드릴</text>
    <rect x='300' y='248' width='14' height='12' rx='2' fill={sp} stroke={sp} /><text x='320' y='258' fontSize='11.5' fill={quiet}>스페이서</text>
    <rect x='410' y='248' width='14' height='12' rx='2' fill={tg} fillOpacity='0.45' stroke={tg} /><text x='430' y='258' fontSize='11.5' fill={quiet}>패터닝할 하부막</text>
  </svg>;
};

// 6장 — ALE 사이클
export const ale = () => {
  const mod = c1; const px = i => 36 + i * 176; const xs = [0, 1, 2, 3, 4, 5, 6];
  const row = (i, y) => <g>{xs.map(j => <circle cx={px(i) + 24 + j * 19} cy={y} r='8' fill={tint} stroke={edge} strokeWidth='1' />)}</g>;
  const modRow = i => <g>{xs.map(j => <circle cx={px(i) + 24 + j * 19} cy='120' r='8' fill={mod} fillOpacity='0.35' stroke={mod} strokeWidth='1.25' />)}</g>;
  const ghost = i => <g>{xs.map(j => <circle cx={px(i) + 24 + j * 19} cy='120' r='8' fill='none' stroke={mod} strokeWidth='1' strokeDasharray='2 2' />)}</g>;
  const gas = i => <g>{[0, 1, 2, 3].map(j => <circle cx={px(i) + 38 + j * 30} cy='96' r='3.5' fill={mod} />)}</g>;
  const ions = i => <g fill='none' stroke={edge} strokeWidth='1.25'>{[0, 1, 2, 3].map(j => <path d={`M${px(i) + 38 + j * 30} 70V100`} markerEnd='url(#ale-arrow)' />)}</g>;
  const cap = (i, n, s) => <g><text x={px(i) + 80} y='196' textAnchor='middle' fontWeight='600' fill={ink}>{n}</text><text x={px(i) + 80} y='214' textAnchor='middle' fontSize='11.5' fill={quiet}>{s}</text></g>;
  return <svg viewBox='0 0 760 296' role='img' aria-label='ALE는 표면 한두 층만 개질하고 그 층만 떼어낸다' fontSize='13'>
    <defs><marker id='ale-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={edge} /></marker></defs>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>ALE는 표면 한두 층만 개질하고 그 층만 떼어낸다</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>각 단계가 스스로 멈추므로(자기제한) 사이클 수로 깊이를 정한다</text>
    <g>{gas(0)}{modRow(0)}{row(0, 139)}{row(0, 158)}{cap(0, '① 개질', '표면 1~2층만 반응')}</g>
    <g>{modRow(1)}{row(1, 139)}{row(1, 158)}{cap(1, '② 퍼지', '남은 가스 제거')}</g>
    <g>{ions(2)}{ghost(2)}{row(2, 139)}{row(2, 158)}{cap(2, '③ 제거', '저에너지 이온이 개질층만')}</g>
    <g>{row(3, 139)}{row(3, 158)}{cap(3, '④ 퍼지', '표면 리셋, 한 층 없어짐')}</g>
    <path d={`M${px(3) + 80} 226V248H${px(0) + 80}V230`} fill='none' stroke={edge} strokeWidth='1.25' markerEnd='url(#ale-arrow)' />
    <text x='380' y='272' textAnchor='middle' fontSize='11.5' fill={quiet}>사이클 반복 — 깎이는 깊이 = 사이클 수 × 사이클당 식각량(EPC)</text>
  </svg>;
};

// 11장 — Planar / FinFET / GAA 단면
export const transistors = () => {
  const gate = c1, ch = c3;
  const sub = (x, y, h) => <rect x={x} y={y} width='160' height={h} rx='4' fill={tint} stroke={edge} strokeWidth='1' />;
  const g = (x, y, w, h) => <rect x={x} y={y} width={w} height={h} rx='4' fill={gate} fillOpacity='0.25' stroke={gate} strokeWidth='1.25' />;
  const c = (x, y, w, h) => <rect x={x} y={y} width={w} height={h} rx='2' fill={ch} stroke={ch} strokeWidth='1' />;
  const cap = (x, n, f, node) => <g><text x={x} y='100' textAnchor='middle' fontWeight='600' fill={ink}>{n}</text><text x={x} y='290' textAnchor='middle' fontWeight='600' fill={ink}>{f}</text><text x={x} y='308' textAnchor='middle' fontSize='11.5' fill={quiet}>{node}</text></g>;
  return <svg viewBox='0 0 760 364' role='img' aria-label='게이트가 채널을 감싸는 면이 1, 3, 4면으로 늘어난다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>게이트가 채널을 감싸는 면이 1 → 3 → 4면으로 늘어난다</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>전류가 흐르는 방향을 정면으로 본 단면</text>
    {sub(60, 200, 60)}{c(80, 200, 120, 10)}{g(90, 150, 100, 48)}{cap(140, 'Planar', '게이트 1면', '~28nm급')}
    {sub(300, 230, 30)}{g(343, 124, 74, 104)}{c(365, 142, 30, 88)}{cap(380, 'FinFET', '게이트 3면', '22nm ~ 3nm급')}
    {sub(540, 230, 30)}{g(570, 112, 100, 116)}{c(585, 128, 70, 16)}{c(585, 164, 70, 16)}{c(585, 200, 70, 16)}{cap(620, 'GAA (나노시트)', '게이트 4면 (전체)', '3nm·2nm급 ~')}
    <rect x='220' y='334' width='14' height='12' rx='2' fill={gate} fillOpacity='0.25' stroke={gate} /><text x='240' y='344' fontSize='11.5' fill={quiet}>게이트</text>
    <rect x='330' y='334' width='14' height='12' rx='2' fill={ch} stroke={ch} /><text x='350' y='344' fontSize='11.5' fill={quiet}>채널 (Si)</text>
    <rect x='460' y='334' width='14' height='12' rx='2' fill={tint} stroke={edge} /><text x='480' y='344' fontSize='11.5' fill={quiet}>기판</text>
  </svg>;
};

// 11장 — GAA 측면 단면 (리세스와 내부 스페이서)
export const gaaRecess = () => {
  const si = c3, sige = c5, inner = c2;
  const gray = (x, y, w, h) => <rect x={x} y={y} width={w} height={h} rx='2' fill={tint} stroke={edge} strokeWidth='1' />;
  const sheet = y => <rect x='290' y={y} width='180' height='16' fill={si} stroke={si} strokeWidth='1' />;
  const sac = y => <g><rect x='302' y={y} width='156' height='14' fill={sige} fillOpacity='0.55' stroke={sige} strokeWidth='1' /><rect x='290' y={y} width='12' height='14' fill={inner} stroke={inner} strokeWidth='1' /><rect x='458' y={y} width='12' height='14' fill={inner} stroke={inner} strokeWidth='1' /></g>;
  const cavity = (x, cx) => <g><rect x={x} y='150' width='100' height='100' fill='none' stroke={edge} strokeWidth='1' strokeDasharray='4 3' /><text x={cx} y='204' textAnchor='middle' fontSize='11.5' fill={quiet}>S/D 캐비티</text><text x={cx} y='138' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>① S/D 리세스</text></g>;
  return <svg viewBox='0 0 760 364' role='img' aria-label='SiGe 끝만 옆으로 파낸 자리가 내부 스페이서가 된다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>SiGe 끝만 옆으로 파낸 자리가 내부 스페이서가 된다</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>전류 방향으로 자른 측면 단면, S/D 에피 직전</text>
    {gray(310, 90, 140, 60)}{gray(290, 90, 20, 60)}{gray(450, 90, 20, 60)}
    <text x='380' y='124' textAnchor='middle' fill={ink}>더미 게이트</text>
    {sheet(150)}{sac(166)}{sheet(180)}{sac(196)}{sheet(210)}{sac(226)}{gray(290, 240, 180, 10)}
    {gray(140, 250, 480, 30)}
    {cavity(190, 240)}{cavity(470, 520)}
    <text x='380' y='306' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>② SiGe 끝만 옆으로 파낸 자리를 ③ 내부 스페이서로 채움</text>
    <rect x='110' y='334' width='14' height='12' rx='2' fill={si} stroke={si} /><text x='130' y='344' fontSize='11.5' fill={quiet}>Si 채널 시트</text>
    <rect x='250' y='334' width='14' height='12' rx='2' fill={sige} fillOpacity='0.55' stroke={sige} /><text x='270' y='344' fontSize='11.5' fill={quiet}>SiGe 희생층</text>
    <rect x='390' y='334' width='14' height='12' rx='2' fill={inner} stroke={inner} /><text x='410' y='344' fontSize='11.5' fill={quiet}>내부 스페이서</text>
    <rect x='530' y='334' width='14' height='12' rx='2' fill={tint} stroke={edge} /><text x='550' y='344' fontSize='11.5' fill={quiet}>더미 게이트·스페이서·기판</text>
  </svg>;
};

// 15장 — 3D NAND 단면
export const nand = () => {
  const wl = c1, ono = c3, ch = c5, per = c2;
  const ks = [0, 1, 2, 3, 4, 5]; const endX = k => 470 + 28 * k;
  const hole = x => <g><rect x={x} y='76' width='22' height='150' fill={ono} fillOpacity='0.85' stroke={ono} /><rect x={x + 5} y='76' width='12' height='150' fill={ch} fillOpacity='0.6' stroke={ch} /><rect x={x + 9} y='76' width='4' height='150' fill={tint} stroke='none' /></g>;
  return <svg viewBox='0 0 760 324' role='img' aria-label='채널홀 하나를 따라 층마다 셀이 하나씩 생긴다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>채널홀 하나를 따라 워드라인 층마다 셀이 하나씩 생긴다</text>
    <text x='24' y='46' fontSize='11.5' fill={quiet}>단순화한 단면 — 실제는 수백 층</text>
    {ks.map(k => <g><rect x='60' y={80 + 24 * k} width={endX(k) - 60} height='12' fill={tint} stroke={edge} strokeWidth='0.75' /><rect x='60' y={92 + 24 * k} width={endX(k) - 60} height='12' fill={wl} fillOpacity='0.5' stroke={wl} strokeWidth='0.75' /></g>)}
    {ks.map(k => <rect x={endX(k) - 16} y='60' width='4' height={32 + 24 * k} fill={edge} />)}
    {hole(110)}{hole(190)}{hole(270)}{hole(350)}
    <text x='241' y='68' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>채널홀 (셀 스트링)</text>
    <rect x='420' y='76' width='12' height='150' fill={per} fillOpacity='0.3' stroke={per} />
    <text x='426' y='68' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>슬릿</text>
    <text x='540' y='52' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>계단 + 워드라인 컨택</text>
    <rect x='60' y='234' width='550' height='28' rx='4' fill={per} fillOpacity='0.15' stroke={per} strokeWidth='1' />
    <text x='335' y='252' textAnchor='middle' fontSize='11.5' fill={ink}>주변회로 — 셀 아래(CuA) 또는 별도 웨이퍼 본딩</text>
    <rect x='60' y='290' width='14' height='12' rx='2' fill={wl} fillOpacity='0.5' stroke={wl} /><text x='80' y='300' fontSize='11.5' fill={quiet}>워드라인 (W·Mo)</text>
    <rect x='200' y='290' width='14' height='12' rx='2' fill={tint} stroke={edge} /><text x='220' y='300' fontSize='11.5' fill={quiet}>층간 산화막</text>
    <rect x='320' y='290' width='14' height='12' rx='2' fill={ono} fillOpacity='0.85' stroke={ono} /><text x='340' y='300' fontSize='11.5' fill={quiet}>ONO (전하 트랩)</text>
    <rect x='460' y='290' width='14' height='12' rx='2' fill={ch} fillOpacity='0.6' stroke={ch} /><text x='480' y='300' fontSize='11.5' fill={quiet}>poly-Si 채널</text>
    <rect x='590' y='290' width='4' height='12' fill={edge} /><text x='602' y='300' fontSize='11.5' fill={quiet}>컨택</text>
  </svg>;
};

// 18장 — HBM + GPU 2.5D 패키지
export const hbm = () => {
  const logic = c1, dram = c3, base = c2, tsv = c4;
  const cores = [0, 1, 2, 3, 4]; const tx = [452, 628];
  const bump = (x, y) => <circle cx={x} cy={y} r='3' fill={edge} />;
  return <svg viewBox='0 0 760 352' role='img' aria-label='HBM은 DRAM 다이를 TSV로 쌓아 GPU 바로 옆에 붙인다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>HBM은 DRAM 다이를 TSV로 쌓아 GPU 바로 옆에 붙인다</text>
    <text x='24' y='46' fontSize='11.5' fill={quiet}>단순화한 측면 단면 — 실제 코어 다이는 12~16단</text>
    <rect x='80' y='150' width='260' height='92' rx='4' fill={logic} fillOpacity='0.2' stroke={logic} strokeWidth='1.25' />
    <text x='210' y='200' textAnchor='middle' fontWeight='600' fill={ink}>GPU (로직 다이)</text>
    {[100, 140, 180, 220, 260, 300].map(x => bump(x, 246))}
    <rect x='410' y='88' width='260' height='154' rx='4' fill='none' stroke={edge} strokeWidth='1' strokeDasharray='4 3' />
    {cores.map(i => <rect x='430' y={98 + i * 24} width='220' height='18' fill={dram} fillOpacity='0.3' stroke={dram} strokeWidth='1' />)}
    <rect x='420' y='218' width='240' height='22' fill={base} fillOpacity='0.3' stroke={base} strokeWidth='1.25' />
    {tx.map(x => <rect x={x - 2} y='98' width='4' height='120' fill={tsv} />)}
    {cores.map(i => tx.map(x => bump(x, 119 + i * 24)))}
    {[440, 500, 580, 640].map(x => bump(x, 246))}
    <text x='540' y='80' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>HBM 스택 (몰딩으로 봉지)</text>
    <text x='540' y='160' textAnchor='middle' fontSize='11.5' fill={ink}>DRAM 코어 다이</text>
    <text x='540' y='233' textAnchor='middle' fontSize='11.5' fill={ink}>베이스 다이 (HBM4부터 로직 공정)</text>
    <rect x='40' y='250' width='680' height='26' rx='4' fill={tint} stroke={edge} strokeWidth='1' />
    <path d='M300 263H470' fill='none' stroke={logic} strokeWidth='2' />
    <text x='56' y='267' fontSize='11.5' fill={ink}>인터포저 (CoWoS)</text>
    <text x='600' y='267' textAnchor='middle' fontSize='11.5' fill={quiet}>짧고 촘촘한 연결</text>
    <rect x='24' y='284' width='712' height='24' rx='4' fill={tint} stroke={edge} strokeWidth='1' />
    <text x='380' y='300' textAnchor='middle' fontSize='11.5' fill={ink}>패키지 기판</text>
    <rect x='220' y='324' width='4' height='14' fill={tsv} /><text x='232' y='335' fontSize='11.5' fill={quiet}>TSV (실리콘 관통 전극)</text>
    <circle cx='420' cy='331' r='3' fill={edge} /><text x='430' y='335' fontSize='11.5' fill={quiet}>마이크로범프</text>
  </svg>;
};

// 10장 — HKMG 게이트 스택 단면
export const hkmg = () => {
  const il = c3, hk = c1, cap = c5, wf = c2, fill = c4;
  const layer = (y, hgt, c, op) => <rect x='170' y={y} width='300' height={hgt} fill={c} fillOpacity={op} stroke={c} strokeWidth='1.25' />;
  const rLabel = (y, name, note) => <g><text x='506' y={y} fontWeight='600' fill={ink}>{name}</text><text x='506' y={y + 16} fontSize='11.5' fill={quiet}>{note}</text></g>;
  const lLabel = (y, name, note) => <g><text x='134' y={y} textAnchor='end' fontWeight='600' fill={ink}>{name}</text><text x='134' y={y + 16} textAnchor='end' fontSize='11.5' fill={quiet}>{note}</text></g>;
  const lead = (x1, x2, y) => <path d={`M${x1} ${y}H${x2}`} stroke={edge} strokeWidth='1' />;
  return <svg viewBox='0 0 760 336' role='img' aria-label='게이트 스택은 계면층, High-k, 캡, 일함수 금속, 충진 금속의 적층이다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>게이트 스택 — 물리적으로 두껍게, 전기적으로 얇게 (EOT)</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>Si 채널 위 적층 단면. 층 두께는 개념도이며 실제는 층당 수 nm</text>
    {layer(104, 56, fill, 0.25)}
    {layer(160, 28, wf, 0.3)}
    {layer(188, 10, cap, 0.55)}
    {layer(198, 36, hk, 0.25)}
    {layer(234, 12, il, 0.45)}
    <rect x='170' y='246' width='300' height='38' fill={tint} stroke={edge} strokeWidth='1.25' />
    <text x='320' y='269' textAnchor='middle' fill={ink}>Si 채널</text>
    {lead(470, 498, 132)}{rLabel(126, '충진 금속 (W)', '게이트 저항 감소')}
    {lead(470, 498, 174)}{rLabel(168, '일함수 금속 (TiAl·TiN)', '문턱전압과 밴드 정렬 결정')}
    {lead(134, 170, 193)}{lLabel(180, 'TiN 캡', 'HfO₂ 보호막')}
    {lead(470, 498, 216)}{rLabel(210, 'High-k (HfO₂)', '두껍게 쌓아도 EOT는 얇게')}
    {lead(134, 170, 240)}{lLabel(227, '계면층 (SiO₂)', '이동도·신뢰성')}
    <text x='380' y='316' textAnchor='middle' fontSize='11.5' fill={quiet}>EOT 0.6~1nm급 — 물리 두께의 합은 그 몇 배에 이른다</text>
  </svg>;
};

// 12장 — SAC 자기정렬 컨택 단면
export const sac = () => {
  const gate = c1, sin = c2, plug = c4, sil = c5;
  const gateStack = x => <g>
    <rect x={x} y='150' width='80' height='102' fill={gate} fillOpacity='0.25' stroke={gate} strokeWidth='1.25' />
    <rect x={x} y='134' width='80' height='16' fill={sin} fillOpacity='0.85' stroke={sin} strokeWidth='1' />
    <rect x={x - 16} y='150' width='16' height='112' fill={sin} fillOpacity='0.85' stroke={sin} strokeWidth='1' />
    <rect x={x + 80} y='150' width='16' height='112' fill={sin} fillOpacity='0.85' stroke={sin} strokeWidth='1' />
  </g>;
  return <svg viewBox='0 0 760 344' role='img' aria-label='컨택이 게이트 쪽으로 겹쳐도 SiN 캡과 스페이서가 단락을 막는다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>컨택이 옆으로 겹쳐도 SiN 캡이 단락을 막는다 — SAC</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>오정렬을 허용하는 대신 산화막/SiN 선택비로 버티는 구조 (단순화 단면)</text>
    <rect x='90' y='84' width='580' height='178' fill={tint} stroke={edge} strokeWidth='1' />
    <rect x='90' y='262' width='580' height='30' fill={tint} stroke={edge} strokeWidth='1' />
    <rect x='272' y='252' width='216' height='10' fill={sil} fillOpacity='0.55' stroke={sil} strokeWidth='1' />
    <rect x='262' y='92' width='100' height='160' fill={plug} fillOpacity='0.5' stroke={plug} strokeWidth='1.25' />
    {gateStack(176)}{gateStack(504)}
    <path d='M84 142H170' stroke={edge} strokeWidth='1' />
    <path d='M84 202H170' stroke={edge} strokeWidth='1' />
    <path d='M606 202H676' stroke={edge} strokeWidth='1' />
    <path d='M494 257H676' stroke={edge} strokeWidth='1' />
    <text x='312' y='76' textAnchor='middle' fontWeight='600' fill={ink}>S/D 컨택 (W)</text>
    <text x='78' y='146' textAnchor='end' fontWeight='600' fill={ink}>SiN 캡</text>
    <text x='78' y='206' textAnchor='end' fontWeight='600' fill={ink}>게이트</text>
    <text x='682' y='206' fontWeight='600' fill={ink}>SiN 스페이서</text>
    <text x='682' y='261' fontWeight='600' fill={ink}>실리사이드</text>
    <text x='380' y='281' textAnchor='middle' fontSize='11.5' fill={quiet}>Si 기판 (아래는 S/D 영역)</text>
    <text x='380' y='322' textAnchor='middle' fontSize='11.5' fill={quiet}>핵심은 선택비 — 산화막은 빠르게, SiN은 거의 깎이지 않게 (4장의 선택비가 여기서 쓰인다)</text>
  </svg>;
};

// 13장 — Cu 듀얼 다마신 단면
export const damascene = () => {
  const cu = c4, bar = c5, capl = c2;
  const cuShape = (x, y, w, hgt) => <g><rect x={x} y={y} width={w} height={hgt} fill={bar} fillOpacity='0.6' stroke={bar} strokeWidth='1' /><rect x={x + 4} y={y + 4} width={w - 8} height={hgt - 8} fill={cu} fillOpacity='0.5' stroke={cu} strokeWidth='1' /></g>;
  return <svg viewBox='0 0 760 324' role='img' aria-label='듀얼 다마신은 비아와 트렌치를 한 번에 파서 Cu로 한 번에 채운다' fontSize='13'>
    <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>듀얼 다마신 — 두 번 파고, 한 번에 채운다</text>
    <text x='24' y='48' fontSize='11.5' fill={quiet}>Cu는 식각이 어려워 '먼저 파고 나중에 채우는' 방식으로 만든다</text>
    <rect x='170' y='96' width='420' height='172' fill={tint} stroke={edge} strokeWidth='1' />
    <rect x='170' y='196' width='420' height='8' fill={capl} fillOpacity='0.5' stroke='none' />
    {cuShape(300, 228, 160, 32)}
    {cuShape(352, 146, 56, 86)}
    {cuShape(306, 110, 148, 40)}
    <rect x='170' y='100' width='420' height='8' fill={capl} fillOpacity='0.5' stroke='none' />
    <text x='380' y='86' textAnchor='middle' fontWeight='600' fill={ink}>Cu 트렌치 (상부 배선 본체)</text>
    <text x='158' y='112' textAnchor='end' fontSize='11.5' fill={quiet}>캡층 (SiCN)</text>
    <text x='158' y='168' textAnchor='end' fontSize='11.5' fill={quiet}>low-k 절연막</text>
    <text x='158' y='204' textAnchor='end' fontSize='11.5' fill={quiet}>식각정지막 (SiCN)</text>
    <path d='M412 184H420' stroke={edge} strokeWidth='1' />
    <path d='M412 210H420' stroke={edge} strokeWidth='1' />
    <text x='424' y='188' fontWeight='600' fill={ink}>Cu 비아</text>
    <text x='424' y='214' fontWeight='600' fill={ink}>배리어·라이너 (TaN/Ta)</text>
    <text x='380' y='284' textAnchor='middle' fontWeight='600' fill={ink}>하부 Cu 배선 (M1)</text>
    <rect x='196' y='296' width='14' height='12' rx='2' fill={cu} fillOpacity='0.5' stroke={cu} /><text x='216' y='306' fontSize='11.5' fill={quiet}>Cu</text>
    <rect x='270' y='296' width='14' height='12' rx='2' fill={bar} fillOpacity='0.6' stroke={bar} /><text x='290' y='306' fontSize='11.5' fill={quiet}>배리어 (TaN/Ta)</text>
    <rect x='430' y='296' width='14' height='12' rx='2' fill={tint} stroke={edge} /><text x='450' y='306' fontSize='11.5' fill={quiet}>low-k 절연막</text>
  </svg>;
};

// 문서의 그림 캡션 → 그림 함수
export const byCaption = {
  '전체 공정 흐름': flow,
  '칩 단면 층 구조': stack,
  'SADP 5단계': sadp,
  'ALE 한 사이클': ale,
  'Planar · FinFET · GAA 단면 비교': transistors,
  'GAA 측면 단면': gaaRecess,
  '3D NAND 단면': nand,
  'HBM + GPU 2.5D 패키지': hbm,
  'HKMG 게이트 스택 단면': hkmg,
  'SAC 자기정렬 컨택 단면': sac,
  'Cu 듀얼 다마신 단면': damascene,
  '이온-라디칼 시너지': synergy,
  'FC 막 두께와 식각 속도': fcfilm,
  'ARDE: 일반 식각과 극저온 식각': arde,
  '자기제한 포화 곡선과 ALE 창': selflimit,
  '증착 방식별 스텝 커버리지': coverage,
  '이온주입 깊이 분포와 어닐': implant,
  'CMP 장비와 디싱 · 이로전': cmp,
  'CMOS FEOL 단면': cmos,
  'DRAM 1T1C 셀': dramcell,
  '6F²와 4F² 셀 면적': cellarea,
  '와이어 본딩과 플립칩': bond,
  '연결 피치와 연결 밀도': pitch,
  '절연막 유전율 비교': kvalue,
  '공정별 계측 지도': metrology,
  'CZ 단결정 성장과 웨이퍼': wafer,
  '열산화 성장 곡선': oxidation,
  '수율 곡선': yieldCurve,
  'AFS 형성·제거 사이클': afsCycle,
  'AFS 온도 지도': afsTemp,
  'AFS의 XPS 지문': xpsFig,
};
