# GAA 나노시트 — 원문 수치 추출 패키지 (Joy, 2026-11-02)

- 목적: 안건 #21 통합용. gaa·inner-spacer 심화형 초안의 정량 근거.
- 범위: 원문 확보 완료된 OA 10건 (papers/gaa-nanosheet/, Zotero 「GAA 나노시트」 컬렉션) 전문에서 추출.
- 표기: 수치는 전부 원문 위치 (Fig./Table/본문 절)를 붙였다. 2차 인용 수치 (리뷰가 인용한 타 논문 값)는 [2차]로 구분.
- 미포함: IEEE 확보분 9건 (SKKU 프록시 진행 중 — 확보 후 추보), Li 2025·Breton 2022 (원문 미확보).

## 1. Sun et al. 2024 — NF₃ 사이클릭 식각 (이너 스페이서 캐비티 + 채널 릴리즈)

Nanomaterials 14, 928. DOI 10.3390/nano14110928.

공정: 리모트 플라즈마 (RPS), 사이클 = 산화 처리 + 식각. 공통 조건 — 압력 8 Torr, 산화 O₂/Ar = 50/500 sccm, RPS 2300 W (본문 §2).

| 레시피 | NF₃/Ar (sccm) | RPS | 용도 |
|---|---|---|---|
| Recipe 1 | 10/800 (0.0125) | 2000 W | 캐비티 (최저 속도·정밀 제어) |
| Recipe 2 | 20/800 (0.025) | 2000 W | — |
| Recipe 3 | 30/800 (0.0375) | 2000 W | — |
| Recipe 4 | 30/300 (0.1) | 2300 W | 채널 릴리즈 (고선택비) |

핵심 수치:
- 캐비티 (Recipe 1): SiGe 식각 0.98 nm/cycle. 5 cycle → 캐비티 깊이 ≤5 ± 0.3 nm, 식각 전면 형상계수 d/p = 0.84, Si loss 0.44 nm/side (Fig. 5).
- 8 cycle → 깊이 8.82 nm, 선택비 19.6, Si loss 0.45 nm — 사이클 수↑ 시 깊이는 선형 증가, Si loss는 거의 일정 (Fig. 6a).
- 패턴 구조 선택비는 blanket보다 낮다: Recipe 1 구조에서 SiGe:Si = 11.1 (blanket 25.7), Recipe 2 5 cycle 29.5 (Si loss 0.47 nm), Recipe 4 2 cycle 41.5 (Si loss 0.52 nm) (Fig. 4, 6).
- **본질적 Si loss ~0.5 nm**는 레시피·사이클 수와 무관 — Si/SiGe 계면 intermixing층이 원인 (실패 모드. §3 본문).
- 이너 스페이서 목표 깊이 5 nm — 깊이가 LG를 정하므로 이 모듈은 고선택비보다 낮은 식각 속도의 정밀 제어가 우선이라는 것이 논지.
- 채널 릴리즈 (Recipe 4): 시트 폭 30–80 nm 동시 릴리즈, Si loss 미미.
- SiN etch-back (NF₃/O₂/Ar): O₂/NF₃ = 0.5 최적 → SiN:Si 선택비 5.4, SiN 거칠기 0.19 nm. 비율 1.0 이상에서는 선택비 포화 + 거칠기 급증.

## 2. Sun et al. 2023 — 채널 릴리즈 다단 식각 + 산화 처리

Nanomaterials 13, 504. DOI 10.3390/nano13030504.

- 선택비 **168:1** (Si₀.₇Ge₀.₃ : Si). 단, 정의가 특이하다 — 터널 깊이 d / Si 두께 손실 ((a−b)/2). 실측 d = 41.93 nm, Si 측벽 손실 0.25 nm (Fig. 4). **§1의 blanket/패턴 선택비와 직접 비교 금지** (정의 상이).
- 메커니즘: Si–Si 결합 2.31 eV > Si–Ge 2.12 eV → F 중성종이 SiGe 우선 반응. SiGe가 다 제거된 뒤에는 Si 식각이 급증해 과식각 시 시트 입구가 fusiform으로 깎임 (Fig. 3b — 실패 모드).
- 산화 처리: RPS를 끄고 O₂/Ar만 공급 (자연산화 방식, 플라즈마 손상 회피). Si 표면 산화막의 제거 시간이 SiGe보다 길어 억제층으로 작용. 산화는 마지막 식각 직전 1회만 (다중 폭이면 폭별 마지막 단계마다) — 산화 자체가 Si를 소모하기 때문.
- 다단 식각의 부수 효과: S/D 압축응력에 의한 시트 변형 (들뜸) 완화 (Fig. 3c).

## 3. Li et al. 2026 — Sub-Fin edit (역방향: Si 선택 식각)

Nanomaterials 16, 13. DOI 10.3390/nano16010013.

- CF₄/O₂/N₂ 리모트 플라즈마로 **Si를 SiGe에 대해** 선택 식각 (채널 릴리즈와 방향 반대 — 항목에서 혼동 주의). 메커니즘: NO 라디칼이 Si 표면 산화 패시베이션을 선택적으로 깨고, SiGe는 안정 산화막으로 보호.
- O₂ 200 sccm (F:O↑) 조건: Si 식각 속도 4.2 nm/s, Si/SiGe 선택비 ~46 (Fig. 2C, 선택비 정의 식 (1)).
- 형상 조절: 가스비·시간으로 Sub-Fin을 arrow→bell 형상으로 연속 조절 (Bottom Dimension 가변) — 누설 (저전력형) vs 방열 (고성능형) 트레이드오프.
- Li 2025 (10.3390/nano15191469)와 같은 화학 계열 — 원문 확보되면 한 절로 묶을 것.

## 4. Lee et al. 2022 — 이너 스페이서 두께 변동 민감도 (TCAD)

Nanomaterials 12, 3349. DOI 10.3390/nano12193349. 3-stack NSFET, sub-3 nm 노드 가정 시뮬레이션.

- **ΔTIS,B (하단 이너 스페이서 두께 변동) < 1 nm 필수**.
- S/D 두께 (TSD) 5 nm 조건에서 Ioff의 ΔTIS,B 민감도가 NFET 기준 ×22.5로 증폭.
- TIS↑ → Cgg↓ (기생·진성 용량 모두 감소), Cgg의 ΔTIS 민감도는 위치 (T/M/B) 무관하게 비슷 → AC 성능 차이는 결국 DC 특성에서 갈림.
- TSD 변동이 없으면 ΔTIS,T·ΔTIS,M 저감이 DC 변동 최소화에 핵심.
- 연결점: §1의 본질적 Si loss ~0.5 nm·캐비티 균일도 ±0.3 nm가 이 변동 예산 (<1 nm) 안에 들어가는지가 공정 성립 조건.

## 5. Schmidt et al. 2022 — SiGe indentation (캐비티) 계측

IEEE Trans. Semicond. Manuf. (arXiv:2201.04725).

- 캐비티 깊이 측정: scatterometry (OCD) + spectral interferometry. average indent (단일 파라미터) vs sheet-specific indent 두 접근.
- XRF 결합 머신러닝으로 시트별 indent 모니터링 가능 — 단, X-TEM 레퍼런스 학습 데이터가 필요.
- 난점: indent 신호가 게이트 스택 (>100 nm) 대비 매우 작아 정밀도·정확도의 파라미터 상관 관리가 핵심.

## 6. Park et al. 2023 — 3DSFET 상하 S/D 절연 (IEDM 핸드아웃)

- 세계 최소급 CPP 45 nm 지향, 실측 소자 CPP 48 nm · Lg 13 nm · 시트 폭 35 nm.
- top/bottom S/D isolation: 절연층 recess 전용 건식 식각을 개발 — 접촉 깊이 제어로 채널 손상 회피 (Fig. 4).

## 7. Mukesh & Zhang 2022 — 공정 플로우 리뷰

Electronics 11, 3589. DOI 10.3390/electronics11213589.

- 플로우 골격: Si/SiGe 초격자 에피 → 더미 게이트 → 이너 스페이서 → S/D 에피 → 채널 릴리즈 → RMG.
- BDI vs PTS 비교 [2차]: Lg = 12 nm, CPP 44, Vds = 0.7 V에서 Ioff·DIBL (본문 Fig. 인용 — 원 논문 값이라 심화형 본문에 쓸 땐 [2차] 표기 유지).

## 8. Yao et al. 2026 — 초격자 에피 분할 온도 (arXiv:2605.05667)

- RPCVD 분할 온도 전략: 초기 Si₀.₈Ge₀.₂층 650 °C → 후단층 600 °C.
- 600 °C에서 Ge 확산계수는 650 °C 값의 5.6–7% (Arrhenius), 계면 broadening 0.08 nm 수준.
- 열이력 누적 효과: 하층 계면이 넓어지고 Ge 농도가 설계 20% → ~18.5%로 희석, 상층은 설계 유지.

## 9. Loo et al. 2024 — 다중 조성 SiGe 스택 에피 (ECS Trans. 기탁본, 3쪽)

- Ge 조성이 다른 두 층 (y > x)을 포함한 Si/Si₁₋ᵧGeᵧ + 다중 {Si₁₋ₓGeₓ/Si} 스택의 완전 변형 (fully strained) 에피, sub-10 nm 시트 전제.
- 기탁본이라 정량 추출은 제한적 — 저널 전문 확보 시 추보.

## 10. Horiguchi 2020 — imec 아키텍처 로드맵 덱

- nanosheet → forksheet → CFET 진화 축, FinFET 대비 신규 모듈 (Si/SiGe 스택 핀·이너 스페이서·릴리즈) 정리.
- 수치 근거가 아닌 로드맵·맥락 근거로만 사용.

## 논문 간 긴장·주의 (심화형 반영용)

1. **선택비 숫자 직접 비교 금지**: Sun 2023의 168:1은 터널 깊이/Si 손실 정의, Sun 2024의 11.1–41.5는 패턴 구조 실측, blanket 25.7은 속도비 — 정의가 셋 다 다르다. 항목 본문에 정의를 병기할 것.
2. **변동 예산 연결**: Sun 2024 본질적 Si loss ~0.5 nm (intermixing 기인, 공정으로 못 없앰) vs Lee 2022 ΔTIS,B < 1 nm 요구 — 캐비티 ±0.3 nm 균일도와 합치면 예산이 빠듯하다는 게 두 논문을 겹쳐야 보이는 지점.
3. **방향 혼동 주의**: 채널 릴리즈·캐비티는 SiGe 선택 제거, Li 2025/2026은 Si 선택 제거 (역방향). 가스 화학도 NF₃계 (SiGe 방향) vs CF₄/O₂/N₂ NO 라디칼계 (Si 방향)로 갈린다.
4. SiGe 식각 전면 형상계수 0.84 (Sun 2024) — «near-ideal rectangular»라는 저자 표현과 달리 1.0에는 못 미침. 인용 시 저자 주장과 실측을 구분할 것.

## 추보 예정

- IEEE 확보분 9건 (Bae 2018 · Jeong 2023 · Yeap 2024 TSMC N2 · Fischer 2025 Intel 18A · Huang 2020 · IEDM 2023×2 · IEDM 2024 · IEDM 2025) — SKKU 프록시 확보 완료 후 같은 포맷으로 추보.
- Li 2025 원문, Breton 2022 (계측 리뷰 — §5 Schmidt와 묶을 것), Loo 2024 저널 전문.
