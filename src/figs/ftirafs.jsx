import { c1, c2, c3, ink, quiet, edge, grid, tint } from './_c.js';

// AFS 층의 적외 지문 — 두 논문이 보고한 흡수 위치(cm⁻¹)만 표식으로. 스펙트럼 개형은 그리지 않는다.
// Possémé et al. 2016: 염 형성 뒤 새 피크 770(Si–F)·1400(NH₄⁺ 굽힘), 비율 스캔 서술의 Si–F 900.
// Hsiao et al. 2024: HF dose 양 피크 ~730(Si–F)·~1430(NH₄⁺), 음 피크 ~900(Si–N).
const X0 = 90, X1 = 690, WLO = 650, WHI = 1500;
const px = w => X0 + (w - WLO) / (WHI - WLO) * (X1 - X0);
const ROWS = [
  { name: 'Possémé et al. 2016', sub: 'ex situ 투과, 염 형성 뒤', y: 120, marks: [[770, 'Si–F 770', c1], [900, 'Si–F 900*', c1, true], [1400, 'NH₄⁺ 1400', c3]] },
  { name: 'Hsiao et al. 2024', sub: 'in situ ATR, HF dose', y: 210, marks: [[730, 'Si–F ~730', c1], [900, 'Si–N ~900 (음)', c2], [1430, 'NH₄⁺ ~1430', c3]] },
];

export default () => <svg viewBox='0 0 760 360' role='img' aria-label='AFS 층의 적외 지문은 NH₄⁺ 굽힘 1400–1430과 Si–F 730–770의 쌍이고, 900 부근은 배정이 갈린다' fontSize='12'>
  <text x='24' y='28' fontSize='15' fontWeight='600' fill={ink}>AFS 층의 적외 지문 — 두 피크가 함께 움직여야 염이다</text>
  <text x='24' y='48' fontSize='11.5' fill={quiet}>두 논문이 보고한 흡수 위치만 표식으로 찍었다. 900 부근은 한쪽은 Si–F, 다른 쪽은 Si–N으로 배정했다</text>
  <rect x={px(860)} y='96' width={px(940) - px(860)} height='170' fill={tint}/>
  <text x={px(900)} y='258' textAnchor='middle' fontSize='11' fill={quiet}>배정이 갈리는 구간</text>
  {[700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500].map(w => <g><line x1={px(w)} y1='96' x2={px(w)} y2='266' stroke={grid} strokeDasharray='4 4'/><text x={px(w)} y='284' textAnchor='middle' fontSize='11' fill={quiet}>{w}</text></g>)}
  <line x1={X0} y1='266' x2={X1} y2='266' stroke={edge} strokeWidth='1.25'/>
  {ROWS.map(r => <g>
    <line x1={X0} y1={r.y} x2={X1} y2={r.y} stroke={edge} strokeWidth='0.8'/>
    <text x={X0} y={r.y - 38} fontSize='12' fontWeight='600' fill={ink}>{r.name}</text>
    <text x={X0 + 190} y={r.y - 38} fontSize='11' fill={quiet}>{r.sub}</text>
    {r.marks.map(([w, lab, col, dash]) => <g>
      <line x1={px(w)} y1={r.y} x2={px(w)} y2={r.y - 24} stroke={col} strokeWidth='4' strokeDasharray={dash ? '3 2' : 'none'}/>
      <text x={px(w)} y={r.y + 16} textAnchor='middle' fontSize='11' fill={ink}>{lab}</text>
    </g>)}
  </g>)}
  <text x={(X0 + X1) / 2} y='304' textAnchor='middle' fontSize='11.5' fill={quiet}>파수 (cm⁻¹)</text>
  <text x='24' y='328' fontSize='11' fill={quiet}>* 같은 논문의 Fig. 12(a)는 770, 비율 스캔 서술(Fig. 14·15)은 900으로 Si–F를 적었다. 재구성: Possémé et al., J. Vac. Sci. Technol. A 34, 061301 (2016),</text>
  <text x='24' y='344' fontSize='11' fill={quiet}>doi:10.1116/1.4963072 — Fig. 12(a)·14·15; Hsiao et al., Chem. Mater. 36, 11042 (2024), doi:10.1021/acs.chemmater.4c01835 — Fig. 5. 보고 위치만 찍었다</text>
</svg>;
