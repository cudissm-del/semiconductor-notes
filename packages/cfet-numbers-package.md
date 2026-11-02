# CFET 수치 패키지 — 원문 6편, 7축 추출

- 추출일: 2026-11-02 (Joy)
- 방법: PyMuPDF 텍스트 추출 후 본문·초록·Fig./Table 캡션 전수 대조. IEDM 다이제스트는 캡션이 본문 역할을 하므로 캡션 수치도 본문급으로 취급하되 위치를 명시했다.
- 표기 규칙: 위치는 「p.쪽 — 본문/초록/Fig. n 캡션/Table n」. 초록에만 있는 값은 (초록)이라고 따로 표시. 원문에 없는 축은 「없음」. 그래프 축에만 있고 텍스트·캡션에 숫자가 없는 값은 뽑지 않았다 (추측·판독 금지 원칙).
- 주의: Liao 2023·2024, Radosavljevic 2023은 PDF 폰트 인코딩이 깨져 추출되나 숫자·단위는 원문과 대조 가능했다. Liao 2025는 텍스트가 정상 추출됐다.

---

## 1. Huang et al., IEDM 2020 (Intel) — 자기정렬 적층 NMOS-on-PMOS 나노리본

파일: Huang_2020_IEDM_stacked-nanoribbon-cfet.pdf / DOI 10.1109/IEDM13553.2020.9372066

- **① 상하 간격**: 상부 NMOS–하부 PMOS 나노리본 사이 간격 **50 nm** (p.2 — 본문, Fig. 4(d) 설명). 같은 스택 내 리본 간 간격(inter-NR spacing) **9 nm**, 리본 폭 ~13 nm (p.2 — 본문). 출발 Si/SiGe 초격자 두께 160 nm (p.1 — 본문). MDI(중간 유전체) 모듈은 없음 — 하부 절연은 SOI 매몰산화막이 담당 (하부 NR은 6 nm Si on bonding oxide, p.3 — Fig. 4 캡션).
- **② 피치·Lg**: 게이트 피치 정량값 없음 (측정용으로 "wide poly pitch" 사용, p.2 — 본문). Lg: 전기특성 측정 **75 nm** (p.2 — 본문, Fig. 7·8), 인버터 TEM Lg ~40 nm (p.3 — Fig. 4 캡션), SS·DIBL은 Lg 30 nm까지 평가 (p.2 — 본문), Vt 조정 데모는 Lg 220 nm (p.4 — Fig. 12·13 캡션).
- **③ MDI 형성 순서**: 해당 없음 (MDI 없음). 공정 골격: Si/SiGe 초격자 에피 → 핀·폴리 패터닝 → 듀얼 S/D 에피 → ILD 증착·평탄화 → 더미 폴리 제거·SiGe 식각으로 NR 릴리스 → high-k 증착 → 듀얼 메탈 게이트 (p.2 — 본문).
- **④ 상하 S/D 에피와 절연**: 수직 적층 듀얼 S/D 에피 — 상부 2개 NR에 **인(P) 도핑 Si** 선택 성장, 하부 3개 NR에 **붕소(B) 도핑 SiGe** 선택 성장 (p.2 — 본문, p.3 — Fig. 5 캡션). 측정 소자 구성은 2NR NMOS on 3NR PMOS.
- **⑤ 상하 게이트·Vt 분리**: 공통 게이트 (shared-gate, p.4 — Table 1) + 수직 적층 듀얼 메탈 게이트(DMG). 순서: P-WFM + W 증착 → W 연마·리세스로 상부 NR 노출 → 상부 P-WFM만 습식 제거 → N-WFM 증착 (p.2 — 본문, p.3 — Fig. 6 캡션). Vt 조정 범위: 하부 PMOS(P-WFM 교체) **~350 mV**, 상부 NMOS(N-WFM 교체·두께) **~350 mV** (p.2 — 본문).
- **⑥ 후면 컨택**: 없음.
- **⑦ 수율·생존율**: 수율 % 없음. 기능 CMOS 인버터 VTC 실증 — 서로 다른 VCC에서 well-balanced (p.2 — 본문, p.4 — Fig. 14 캡션). 참고 성능: NMOS Ion 406 µA/µm, PMOS Ion 180 µA/µm (모두 Ioff=100 nA/µm, VDS=VG−VT=0.65 V, p.2 — 본문), SS <75 mV/dec·DIBL <30 mV/V (Lg 30 nm까지, p.2 — 본문), Rext 외삽값 NMOS ~314 Ω·µm / PMOS ~687 Ω·µm (p.2 — 본문).

## 2. Liao et al., IEDM 2023 (TSMC) — mCFET, 게이트 피치 48 nm

파일: Liao_2023_IEDM_cfet-48nm-gate-pitch.pdf / DOI 10.1109/IEDM45741.2023.10413672

- **① 상하 간격**: MDI 두께 정량값 없음. MDI 자리 확보 방식만 제시 — SiGe/Si 초격자에 **고 Ge% SiGe 층을 MDI 형성용 플레이스홀더**로 삽입 (p.1 — 본문; p.3 — Fig. 4 캡션).
- **② 피치·Lg**: 게이트 피치 **48 nm**, 게이트 길이 **15 nm** (p.1 — 본문). Fig. 9 캡션도 Lg ≈15 nm로 재확인 (p.4 — Fig. 9 캡션).
- **③ MDI 형성 순서**: SD 식각 후 고 Ge% SiGe 플레이스홀더를 이용해 MDI 형성 (Ge% 의존 SiGe 식각 선택비 활용), 이너 스페이서(INSP)와 함께 형성 (p.1–2 — 본문). SD 절연(SD-ISO)은 별도 단계: 사이드월 라이너로 상부 나노시트 보호 → 하부 PMOS SiGe:B 에피 성장 → 유전체 식각 깊이를 제어해 SD-ISO 형성 → 상부 NMOS Si:P 에피 성장 (p.2 — 본문). 이후 ILD0 평탄화 → 더미 게이트 제거 → 채널 릴리스 → IL·high-k → Vt 튜닝 → WFM·메탈 게이트 → SD 컨택 → MOL·BEOL (p.2 — 본문).
- **④ 상하 S/D 에피와 절연**: 하부 pEPI = **SiGe:B**, 상부 nEPI = **Si:P**, 사이에 SD-ISO 유전체 (p.2 — 본문). 성장 순서는 하부 pEPI 먼저, SD-ISO 다음, 상부 nEPI 마지막. nEPI 품질은 SD-ISO 유전체 리세스 깊이 제어가 좌우 (p.2 — 본문).
- **⑤ 상하 게이트·Vt 분리**: 상하가 **단일 메탈 게이트**에 둘러싸인 공통 게이트 구조 (p.3 — Fig. 5 캡션). 동일 웨이퍼 통합 소자에서 패턴드 n/p Vt 적용 (p.2 — 본문, Fig. 7). multi-Vt 플로우는 개발 중이라고 명시 (p.2 — 본문). 평가용으로는 VGoff 0 ~ −0.15 V (VDD 0.75 V 위에 중첩)로 Ion–Ioff·Vt–Ioff 범위 확장 (p.2 — 본문). Vt 개수·간격 정량값 없음.
- **⑥ 후면 컨택**: 없음 (MOL·BEOL까지만).
- **⑦ 수율·생존율**: 생존율 **nFET·pFET 모두 90% 초과** (p.1 — 초록; p.2 — 본문·Fig. 8, 판정 기준은 Fig. 8에 제시). Ion/Ioff **6자리수(six-order)** (p.1 — 초록·본문). SSsat 75 (n) / 73 (p) mV/dec, DIBL 50 (n) / 45 (p) mV/V (p.2 — 본문). 기능 인버터는 없음 (트랜지스터 단계; 동일 웨이퍼 통합은 Fig. 7 전시 단계).

## 3. Liao et al., IEDM 2024 (TSMC) — mCFET 인버터 48 nm, 후면 MOL

파일: Liao_2024_IEDM_monolithic-cfet-inverter-48nm.pdf / DOI 10.1109/IEDM50854.2024.10873334

- **① 상하 간격**: MDI 두께 정량값 없음 (MDI는 2023 공정 계승, p.1 — 본문 §II).
- **② 피치·Lg**: 게이트 피치 **48 nm**, Lg **약 15 nm** (p.2 — 본문 §III).
- **③ MDI 형성 순서**: 전체 흐름이 Fig. 2 캡션에 열거됨 (p.3 — Fig. 2 캡션): 초격자 성장 → 나노시트 스택 패터닝 → STI → 게이트 패터닝 → SD 식각 → **MDI 형성** → 이너 스페이서 → 수직 SD 패터닝 → **PMOS SD 에피** → **SD 절연 형성** → **NMOS SD 에피** → ILD0 평탄화 → 채널 릴리스 → IL·high-k → **수직 다이폴 패터닝** → WFM·메탈 게이트 → MOL 컨택 → 수직 MDLI → BEOL → 웨이퍼 플립 → 후면 MOL 컨택 → 후면 BEOL.
- **④ 상하 S/D 에피와 절연**: 순서와 절연은 2023과 동일 계열 (PMOS 에피 → SD-ISO → NMOS 에피; p.3 — Fig. 2 캡션). 신규 요소는 공통 드레인에서 상부 nEPI와 하부 pEPI를 직접 잇는 **수직 MDLI (vMDLI)** (p.2 — 본문 §III-B, Fig. 8).
- **⑤ 상하 게이트·Vt 분리**: 공통 게이트 유지 (p.4 — Fig. 9 캡션 "common gate devices"). **수직 다이폴 패터닝**을 IL·high-k 형성 직후에 삽입 — 상부 nFET에 n-다이폴, 하부 pFET에 p-다이폴 (p.1 — 본문 §II; p.3 — Fig. 3 캡션 EDX). 효과: 상부 nFET Vt **약 160 mV 감소**, 하부 pFET Vt는 거의 불변 (p.2 — 본문 §III-C, Fig. 9). Vt 개수(다중 Vt) 정량값 없음.
- **⑥ 후면 컨택**: **후면 MOL 실증** — BMD(후면 메탈라이즈드 드레인)·BVD(후면 비아)·BVG(후면 게이트 비아) 집적 (p.1 — 초록·본문; p.3 — Fig. 4 캡션). 인버터 배선: 후면 컨택 = VDD, 전면 소스 컨택 = VSS, 공통 게이트 = 입력, vMDLI = 공통 드레인 출력 (p.2 — 본문, Fig. 5). 하부 pFET를 후면 SD 컨택(BMD)으로 측정: SSsat 76 (n) / 74 (p) mV/dec, DIBL 54 (n) / 47 (p) mV/V (p.2 — 본문 §III-A, Fig. 6). 후면 게이트 컨택(BVG)으로 하부 pFET 구동도 실증 (p.2 — 본문 §III-D, Fig. 10). BSPDN 경유 PMOS 전원 분배를 설계 방향으로 제시 (p.1 — 본문).
- **⑦ 수율·생존율**: 수율 % 없음. 기능 인버터 VTC를 **VDD 최대 1.2 V**까지 well-balanced로 실증 (p.1 — 초록; p.2 — 본문; p.3 — Fig. 5 캡션, 측정 조건 VDD 0.5/0.75/1.0/1.2 V).

## 4. Liao et al., IEDM 2025 (TSMC) — RO·SRAM, 피치 48 nm 미만

파일: Liao_2025_IEDM_cfet-ring-oscillator-sram.pdf / DOI 10.1109/IEDM50572.2025.11353820

- **① 상하 간격**: MDI 두께 정량값 없음. 신규 격리는 **NCI (nanosheet cut isolation)** — 인접 소자의 SD 사이 격리, MD–MD 및 BMD–BMD 누설이 완전히 억제됨을 측정으로 확인 (p.2 — 본문 §IV-A; p.4 — Fig. 8 캡션). 누설 정량값은 그래프에만 있어 미추출.
- **② 피치·Lg**: 게이트 피치 **48 nm 미만** (smaller than 48 nm), Lg **15 nm 미만** (p.2 — 본문 §IV 머리). 구체 피치 수치는 없음 (「미만」 표기만).
- **③ MDI 형성 순서**: 본 논문에서 재서술 없음 (2023·2024 흐름 계승, 공정 흐름도·TEM은 Fig. 3). 신규 공정 요소는 NCI와 SRAM 교차결합용 BCT (butted contact) 2종 (p.1 — 본문 §II).
- **④ 상하 S/D 에피와 절연**: 재료·순서의 새 정량 서술 없음. 격리 측면의 신규값은 NCI (① 참조).
- **⑤ 상하 게이트·Vt 분리**: 새 정량값 없음. SRAM β 비(IPD/IPG)·γ 비(IPG/IPU) 최적화 수단으로 Vt·시트 폭·시트 수 조정을 언급만 (p.2 — 본문 §IV-B).
- **⑥ 후면 컨택**: BMD 노드가 NCI 누설 측정 대상에 포함 (전면 MD와 후면 BMD 모두 측정, p.4 — Fig. 8 캡션). 후면 방식 자체의 새 정량값 없음.
- **⑦ 수율·생존율**: 수율 % 없음. 회로 결과:
  - **101단 링 오실레이터** 완전 동작 (100단 인버터 체인 + enable NAND + 분주기, 약 800–1000개 트랜지스터) (p.1 — 초록·본문 §II). 동작 VDD 범위 **0.5–0.95 V** (p.2 — 본문 §IV-A; p.4 — Fig. 4·5 캡션).
  - **6T SRAM (HD·HC)** 동작 실증, 버터플라이 검증 VDD **0.3–1 V** (p.1 — 초록; p.4 — Fig. 10 캡션). HD 셀 면적 = HC의 **80%**, 두 설계 모두 기존 나노시트 설계의 **70% 미만** (p.2 — 본문 §IV-B; p.3 — Fig. 2 캡션 「30% 초과 축소」).
  - HC 셀 Iread = HD의 **1.7배** (동일 PG Vt, p.2 — 본문; p.4 — Fig. 9 캡션).
  - HD RSNM: VDD 0.75 V에서 **135 mV** (이때 Iread 17.5 µA/cell), VDD 0.9 V 초과에서 **약 145 mV** 피크, 0.3 V에서 **45 mV** (p.2 — 본문).
  - HD WM: VDD 0.75 V에서 **265 mV**, 0.3 V에서 **100 mV** (p.2 — 본문).

## 5. Park et al., IEDM 2023 (Samsung) — 3DSFET, CPP 45 nm

파일: Park_2023_IEDM_stacked-fet-sd-isolation.pdf / DOI 10.1109/IEDM45741.2023.10413694

- **① 상하 간격**: 절연 두께–누설 상관 자체를 연구했으나 (p.2 — 본문 §III-E, Fig. 14), **임계 두께의 정량값은 텍스트·캡션에 없음** (Fig. 14(b) 그래프에만 존재 — 판독값은 쓰지 않음). 절연 프로파일이 상부 SD 프로파일을 좌우한다는 정성 결론만 본문에 있음.
- **② 피치·Lg**: CPP **48 nm**와 **45 nm** 실증 (p.1 — 초록 「gate pitch down to 45 nm」; p.2 — 본문 §III-C). 특성 측정 소자: Lg **13 nm**, 나노시트 폭 35 nm, CPP 48 nm (p.1 — 본문 §II 말미). 채널은 상하 각 단일 나노시트 (p.1 — 본문; 2시트 적층은 Fig. 15).
- **③ MDI 형성 순서**: SD를 **하부 → 상부 순서로 형성하고 사이에 유전체 절연층** 삽입 (p.1 — 본문 §II). 핵심은 절연층 리세스용 **신규 건식 식각** 개발 — 습식 대비 소자 동작 수율 **80%** (p.2 — 본문 §III-E; p.4 — Fig. 13 캡션). 이후 replacement metal·컨택 (p.1 — 본문).
- **④ 상하 S/D 에피와 절연**: pFET 에피 = **SiGe:B**, nFET 에피 = **Si:P** (p.1 — 본문). 배치 양방향 (상부 n/하부 p, 상부 p/하부 n) 모두 제작해 비교 — 결론은 **하부 pFET + 상부 nFET** 조합이 최적 (p.2 — 본문 §III-B: 하부 pFET는 벌크 Si 시드 덕에 SiGe 성장 품질·채널 변형·도핑이 유리). 베스트 칩: 하부 pFET Idsat ~300 µA/µm·SS 67.6 mV/dec, 상부 pFET ~100 µA/µm·69.3 mV/dec, 상부 nFET ~300 µA/µm·70.6 mV/dec (게이트·드레인 −0.7 V 기준 Idsat, p.2 — 본문 §III-A).
- **⑤ 상하 게이트·Vt 분리**: 공통 게이트 + **수직 적층 n/p WFM** — 하부 메탈 게이트 리세스 정밀 제어로 적층 (p.2 — 본문 §III-D). 적층 WFM에서도 상부 nFET Vt가 단일 WFM 대비 **유의미한 이동 없음** (p.2 — 본문; p.4 — Fig. 12 캡션). Vt 이동 정량값·다중 Vt 개수 없음.
- **⑥ 후면 컨택**: 실증 없음. **DBC (Direct Backside Contact)** 를 3DSFET와 결합한 개념도·기대효과만 제시 (p.1 — 본문; p.3 — Fig. 2 캡션), 결론에서도 향후 적용으로 언급.
- **⑦ 수율·생존율**: 절연 리세스 건식 식각 적용 시 **소자 동작 수율 80%** (p.2 — 본문; p.4 — Fig. 13 캡션). Ion/Ioff >10⁵, SS <70 mV/dec (p.2 — 본문 §III-A). 45CPP에서도 상하 모두 현저한 열화 없음 (p.2 — 본문 §III-C).

## 6. Radosavljević et al., IEDM 2023 (Intel) — 적층 인버터 CPP 60 nm + PowerVia·BSCON

파일: Radosavljevic_2023_IEDM_stacked-cmos-inverter-60nm.pdf / DOI 10.1109/IEDM45741.2023.10413678

- **① 상하 간격**: 수직 분리 **30 nm** — base 에피택시로 정의되며 기존 기술의 수평 n–p 간격에 대응 (p.1 — 초록·본문; p.3 — Fig. 2 캡션). 초기 베이스라인 (2리본+2리본)은 ~50 nm 분리 (p.1 — 본문). 전체 핀 높이 ~130 nm (p.3 — Fig. 2 캡션).
- **② 피치·Lg**: CPP **60 nm** (p.1 — 초록·본문; p.3 — Fig. 7 캡션). Lg 정량값 없음.
- **③ MDI 형성 순서**: 해당 없음 (MDI 모듈 없음 — 수직 분리는 베이스 에피가 정의). 공정 골격: 벌크 Si 위 모놀리식 자기정렬, 상하 확산·게이트 동시 패터닝 → 수직 적층 듀얼 S/D 에피 → 공통 게이트 → (게이트 구간에서) 상부 소자 depopulation 옵션 → 후면 공정 (p.1–2 — 본문).
- **④ 상하 S/D 에피와 절연**: 수직 적층 듀얼 S/D 에피 — 고농도 **n-Si 층이 상부 3개 nMOS 리본**에, 고농도 **p-SiGe 층이 하부 3개 pMOS 리본**에 닿고 두 층은 물리적으로 분리 (p.3 — Fig. 4 캡션). 전면 컨택은 shallow (상부만)와 wrap-around (WAC, 상하 공통) 2형태 (p.2 — 본문, Fig. 8).
- **⑤ 상하 게이트·Vt 분리**: **공통 게이트** 아키텍처가 기본 (p.1 — 본문; p.3 — Fig. 5 캡션). 수직 Vt 패터닝으로 상하 Vt 개별 조정 — 데모에서 nVt는 유의하게 낮아지고 pVt는 최소 변화 (p.2 — 본문; p.4 — Fig. 11 캡션, 정량 mV 없음). 상하 리본을 감싸는 Vt 설정 필름이 서로 다름을 TEM EDX로 확인 (p.3 — Fig. 6 캡션).
- **⑥ 후면 컨택**: **실증** — 후면 전력 비아(PowerVia 계열)와 **BSCON (direct backside device contact)** 결합 (p.1 — 초록·본문). BSCON은 하부 트랜지스터 S/D에 개별 컨택, 후면 전력 비아는 상부 트랜지스터 컨택을 웨이퍼 후면으로 연결 (p.2 — 본문 §II). 인버터 결선: BSCON = VCC, 전면 소스 컨택 = VSS, 공통 게이트 = 입력, WAC = 공통 드레인 출력 (p.2 — 본문 §IV; p.4 — Fig. 16 캡션). 후면 측정 하부 pMOS (BSCON vs WAC) 특성이 거의 일치 (p.2 — 본문, Fig. 14).
- **⑦ 수율·생존율**: 수율 % 없음. 전면 측정 SS 77 (n) / 69 (p) mV/dec (p.2 — 본문; p.3 — Fig. 8 캡션). 후면 접촉 소자 SS 63 (n) / 66 (p) mV/dec, DIBL 57 (n) / 38 (p) mV/V (p.2 — 본문 §IV; p.4 — Fig. 15 캡션). 3리본이 2리본 대비 ID **~1.5배** (VDS=0.05 V, p.2 — 본문; p.4 — Fig. 10 캡션). CPP 60 nm 인버터 VTC well-balanced (p.4 — Fig. 16 캡션). 상부 nMOS depopulation 실증 (p.2 — 본문, Fig. 12).

---

## 6편 비교표 (축 × 논문)

| 축 | Huang 2020 (Intel) | Liao 2023 (TSMC) | Liao 2024 (TSMC) | Liao 2025 (TSMC) | Park 2023 (Samsung) | Radosavljević 2023 (Intel) |
|---|---|---|---|---|---|---|
| ① 상하 간격 | 상하 NR 간 50 nm; 리본 간 9 nm; MDI 없음 (SOI BOX) | MDI 두께 없음; 고 Ge% SiGe 플레이스홀더로 자리 확보 | 없음 (2023 계승) | 없음; 대신 NCI로 인접 SD 격리 | 절연 두께–누설 연구했으나 임계값 정량 없음 (Fig. 14 그래프만) | 수직 분리 30 nm (베이스 에피 정의); 초기 2+2는 ~50 nm |
| ② 피치·Lg | 피치 없음 (wide poly); Lg 75 nm 측정, 30 nm까지 SS 평가 | 피치 48 nm, Lg 15 nm | 피치 48 nm, Lg ~15 nm | 피치 <48 nm, Lg <15 nm | CPP 48·45 nm; 측정 소자 Lg 13 nm | CPP 60 nm; Lg 없음 |
| ③ MDI 형성 순서 | 없음 (릴리스 후 high-k → DMG) | SD 식각 후 플레이스홀더 SiGe로 MDI+INSP; SD-ISO는 pEPI 뒤·nEPI 앞 | Fig. 2 순서 명시: SD 식각 → MDI → INSP → pEPI → SD-ISO → nEPI | 재서술 없음 (계승); 신규는 NCI·BCT | 하부 SD → 절연층 (건식 리세스 신규 개발) → 상부 SD | 없음 (베이스 에피가 분리 정의) |
| ④ 상하 S/D 에피·절연 | 상부 Si:P (2NR), 하부 SiGe:B (3NR) 듀얼 에피 | 하부 SiGe:B → SD-ISO → 상부 Si:P | 동일 순서 + 공통 드레인 vMDLI | 새 서술 없음 | SiGe:B / Si:P 양방향 제작, 하부 p + 상부 n 최적 결론 | 상부 n-Si, 하부 p-SiGe (각 3리본), 물리적 분리 |
| ⑤ 게이트·Vt 분리 | 공통 게이트 + DMG; Vt 조정 상하 각 ~350 mV | 단일(공통) 게이트; 패턴드 n/p Vt; multi-Vt 개발 중 | 공통 게이트 + 수직 다이폴 패터닝; nFET Vt −약 160 mV, pFET 불변 | 정량 없음 (β/γ 최적화 언급만) | 공통 게이트 + 적층 n/p WFM; 적층해도 Vt 이동 없음 | 공통 게이트 기본; 수직 Vt 패터닝 (nVt↓, pVt 최소 변화, 정량 없음) |
| ⑥ 후면 컨택 | 없음 | 없음 | BMD·BVD·BVG 실증; 후면=VDD 결선 인버터 | BMD 노드 측정 포함 (새 정량 없음) | 없음 (DBC는 개념 제안만) | PowerVia + BSCON 실증; BSCON=VCC 인버터 |
| ⑦ 수율·회로 | 수율 없음; 인버터 VTC (균형) | 생존율 >90% (n·p 모두); Ion/Ioff 6자리 | 수율 없음; 인버터 VTC ~1.2 V | 수율 % 없음; RO 101단 동작 (0.5–0.95 V), SRAM RSNM 135 mV·WM 265 mV @0.75 V | 동작 수율 80% (건식 리세스); Ion/Ioff >10⁵ | 수율 없음; 인버터 @CPP 60 nm, 후면 SS 63/66 mV/dec |

---

## 메모 — Claude 초안 대조 시 주의점

- **MDI 두께 정량값은 6편 전부 없음.** TSMC 계열 (Liao 2023–2025)은 MDI 「형성 방식」만 있고 nm 수치가 없다. 본문에 MDI 두께 숫자가 나오면 이 6편 밖 출처일 가능성이 높다.
- **상하 간격 정량값이 있는 건 Intel 계열뿐**: Huang 2020의 50 nm (리본 스택 간), Radosavljević 2023의 30 nm (수직 분리). 두 값의 정의가 다르므로 (전자는 NR 그룹 간 간격, 후자는 베이스 에피 정의 분리) 같은 칸에서 직접 비교할 때 정의를 병기해야 한다.
- **Park 2023의 절연 임계 두께**는 Fig. 14(b) 그래프에만 있다. 패키지에 숫자를 넣으려면 원문 그림 판독이 별도로 필요 (이번 추출에서는 판독값 미기재).
- **생존율·수율 %가 있는 건 2편뿐**: Liao 2023 생존율 >90%, Park 2023 동작 수율 80% (절연 리세스 건식 조건). 나머지는 회로 동작 실증 (인버터·RO·SRAM)으로 대체된다.
- **후면 실증은 2편**: Liao 2024 (BMD/BVD/BVG), Radosavljević 2023 (PowerVia/BSCON). Park 2023의 DBC는 제안 단계라 실증으로 세면 안 된다.
