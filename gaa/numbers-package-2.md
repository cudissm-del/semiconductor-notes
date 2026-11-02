# GAA 나노시트 수치 패키지 추보 (Joy, 2026-11-02)

- 1차 패키지 (a6d1916)의 후속. 2026-11-02 오후 확보분 14건: IEEE 9건 (SKKU 프록시) + ECS/IOP 4건 + Li 2025 (MDPI OA).
- 보관: papers/gaa-nanosheet/ (누적 24파일), Zotero 「GAA 나노시트」 컬렉션 등록 완료, NAS 백업 완료.
- Breton 2022 (SPIE)는 SKKU 구독이 없어 확보 실패 — 원문 대기 유지.

## A. 플랫폼 행 (gaa 항목 통합 표용) — IEEE 9건

| 문헌 | 기관·노드 | 확인된 대표 수치 (위치) |
|---|---|---|
| Bae et al., IEDM 2018 (10.1109/IEDM.2018.8614629) | 삼성 3 nm MBCFET | SS 65 (N) / 67 (P) mV/dec, FinFET 대비 Ion +31% (Weff 증가), SRAM SNM 0.18 V @ 0.7 V (본문·Fig. 5) |
| Jeong et al., VLSI 2023 (10.23919/VLSITechnologyandCir57934.2023.10185353) | 삼성 SF3 (3 nm 파운드리) | 4 nm FinFET 플랫폼 대비 전력 34% 개선·로직 면적 0.79x (초록; 속도 수치는 원문 대조 대기) |
| Yeap et al., IEDM 2024 (10.1109/IEDM50854.2024.10873475) | TSMC N2 | N3 대비 속도 +15% 또는 전력 −30%, SRAM ~38 Mb/mm², 장채널 NS SS 60.1 mV/dec (초록·본문) |
| Fischer et al., VLSI 2025 (10.23919/VLSITechnologyandCir65189.2025.11075006) | Intel 18A | RibbonFET (GAA) + PowerVia 후면 전력 (제목·초록 수준; 상세 수치 대조 대기) |
| Huang et al., IEDM 2020 (10.1109/IEDM13553.2020.9372066) | Intel 적층 나노리본 | 3D 자기정렬 NMOS-on-PMOS 적층 — CFET 전신 (상세 수치 대조 대기) |
| Liao et al., IEDM 2023 (10.1109/IEDM45741.2023.10413672) | CFET | 게이트 피치 48 nm 실증 (제목) |
| Radosavljević et al., IEDM 2023 (10.1109/IEDM45741.2023.10413678) | Intel 적층 CMOS | 인버터 게이트 피치 60 nm, Power Via + 직접 후면 접촉 (제목) |
| Liao et al., IEDM 2024 (10.1109/IEDM50854.2024.10873334) | CFET | 모놀리식 CFET 인버터 게이트 피치 48 nm (제목) |
| Liao et al., IEDM 2025 (10.1109/IEDM50572.2025.11353820) | CFET | 링 오실레이터·SRAM 비트셀 기능 실증, 게이트 피치 48 nm 미만 (제목) |

주: IEEE 다이제스트는 2단 조판·폰트 인코딩 때문에 기계 추출이 부분적이다. 「대조 대기」 수치는 초안에서 단정하지 말 것 — 필요하면 Joy가 원문 페이지를 직접 읽어 추보한다.

## B. 공정 수치 — ECS/IOP 4건 + Li 2025

### Durfee et al. 2021 (ECS Trans. 104(4), 217; 10.1149/10404.0217ecst) — IBM/TEL

- 이너 스페이서 인덴트와 채널 릴리즈를 **요구 조건이 다른 두 공정으로 분리**해 정리한 문헌. IS 인덴트: Cov·Rext·Ron·DIBL에 걸리는 IS 깊이·형상의 보정 (calibrated depth) 요구; 릴리즈: 좁은 종횡비에서 SiGe 완전 제거 + 극고선택비 요구 (본문 Table 1이 구조 파라미터 ↔ 소자 파라미터 대응표).
- 평가 조건 예: Lg = 100 nm, WNS = 20–100 nm에서 식각 요구 도출. blanket 막과 다층 (ML) 구조 양쪽에서 SiGe 식각률의 Ge% 의존성을 측정 (Fig. 2).
- 계측: OCD scatterometry를 인라인 비파괴 계측으로 도입 (Schmidt 2022와 같은 축).
- recess·inner-spacer 초안의 「요구 조건」 서술에 직접 쓸 수 있는 산업 측 근거. Li 2025의 참고문헌 25번이 이 논문 — Fudan 그룹도 인용.

### Li et al. 2025 (Nanomaterials 15, 1469; 10.3390/nano15191469) — 역방향 확정판

- CF₄/O₂에 N₂를 넣으면 Si : SiGe 선택비가 ~1 (무선택) → **최대 58**까지 상승. N₂ 50 sccm: Si 식각 ~1.5 nm/s, 선택비 ~34 (본문).
- 메커니즘: NO* 라디칼이 Si 표면 패시베이션을 깨는 쪽 — Li 2026의 NO 메커니즘 서술과 동일 계열 (2025가 원형).
- 실패 모드: 응력 기인 측면 마이크로트렌칭 「Si-tip」 — F:O 비를 올리면 (CF₄ 500 sccm) tip 길이가 거의 0이 되면서도 선택비 > 40 유지.

### Loo et al. 2022 (ECS Trans. 109(4), 135; 10.1149/10904.0135ecst) — Br₂ 기상 식각

- 저온 Br₂ 기상 식각으로 SiGe 선택 제거 — 용도는 채널 릴리즈가 아니라 **소자 절연 (isolation) 제작** (犧牲 SiGe를 절연 유전체로 교체하는 자리).
- 패턴 구조에서 Si₀.₅Ge₀.₅를 Si 및 Si₁₋ₓGeₓ (x = 0.2–0.3)에 대해 고선택비로 식각함을 실증 (초록). 정량 선택비는 본문 대조 대기.

### Loo et al. 2025 (ECS JSS 14, 015003; 10.1149/2162-8777/ada79f) — 저널 전문

- 2024 ECS Trans. 기탁본 (3쪽)을 대체하는 전문 (9쪽). Ge 조성이 다른 두 층을 포함한 다중 스택 에피, fully strained 유지 조건이 본문 범위. 1차 패키지 §9 (Loo 2024)의 「정량 추출 제한」은 이 전문 기준으로 해소 가능 — 세부 수치는 초안 필요 시 Joy가 뽑는다.

### Rosseel et al. 2022 (ECS Trans. 109(4), 93; 10.1109/… 아님, 10.1149/10904.0093ecst) — 저온 Si:P 에피

- 500 °C 이하 선택 Si:P: 비저항 < 0.3 mΩ·cm 달성 (초록). Cl₂ 에치백 CDE + Si₃H₈ 고차 전구체 조건 (480 °C에서 0.28 mΩ·cm, 활성 P ~6×10²⁰ cm⁻³ — 딥리서치 초록 대조와 일치).
- S/D 에피 모듈 행용. 열예산 < 525 °C가 순차 3D·CFET의 전제라는 맥락.

## C. 남은 원문 대기

- Breton 2022 (SPIE, 10.1117/1.JMM.21.021206) — SKKU SPIE 구독 없음 확인 (2026-11-02). 저자 기탁본·상호대차 경로만 남음.
- SSP 계열 (Mertens 2023 리뷰, Oniki 2018/2021, Harada 2021, Kawarazaki 2023 등) — Scientific.Net, SKKU 구독 미확인. 다음 묶음에서 시도.
- Pargon 2019 (디지털/리모트 플라즈마 SiGe 식각) — 조사 보고서 고가치 항목, 원문 미시도.
