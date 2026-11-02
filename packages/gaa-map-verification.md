# #22 GAA 문헌 지도 대조 결과 (Joy, 2026-11-02)

map.json 59건 기준. 결론 요약:
- **원문 보유: 27 → 32건** (orig 플래그 오류 5건 정정, 아래 1번)
- **DOI 대조: 22 → 52건** (대기 19 전건 승격 + 없음 11건 신규 확정)
- **DOI 대기: 0건**
- **DOI 없음: 7건** (학회·저널 2건은 없음 확인 — Lanzillo·Mertens 2021, 아래 3번 비고 / 업계 5건은 원래 DOI 없음)

---


## Claude 질문 5편 (map에서 orig=False 「—」) → 전부 실제 보유 중
전부 로컬 papers/sioc-spacer/ + NAS + Zotero 등록 확인 (보유 목록 holdings-list-2026-11-02.md sioc-spacer 절).
| 문헌 | 파일 | DOI (map에서 이미 대조 상태) | Zotero |
|---|---|---|---|
| Li et al., Nanomaterials 10, 793 (2020) | Li_2020_Nanomaterials_SiN_inner_spacer.pdf | 10.3390/nano10040793 | 8DDPASZH |
| Barraud et al., IEDM (2016) | Barraud_2016_IEDM_inner_spacer_nanowire.pdf | 10.1109/iedm.2016.7838441 | MJMCJVDZ |
| Rawat et al., ESSDERC (2021) | Rawat_2021_ESSDERC_inner_spacer_tradeoff.pdf | 10.1109/essderc53440.2021.9631815 | EKHWXN8T |
| Lee & Park, Electronics 10, 1395 (2021) | Lee_2021_Electronics_inner_spacer_TCAD.pdf | 10.3390/electronics10121395 | XKX6422V |
| Lee et al., IEEE TED (2023) | Lee_2023_TED_inner_spacer_length_opt.pdf | 10.1109/ted.2023.3326789 | XATGR4CF |

- 5건 전부 map에 행이 있고 doi_state=대조 상태다 — orig 플래그만 False로 잘못 표시됨 → 5건 orig=True로 정정하면 됨 (Lee 2023 TED는 used=[inner-spacer, recess]).
- 정정 시 원문 보유 집계: 27 → 32건 (총 59건 유지).

## orig=True 27건 교차 대조
map의 orig=True 27건 = GAA 컬렉션 26건 (2026-11-02 Loubet 2017 포함) + Loubet 2019 IEDM (library 기존 보유) — 보유 목록·NAS와 전부 일치, 이상 없음.


---

# 안건 #22 — 「DOI 대기 19건」 Crossref 대조 결과

- 대조일: 2026-11-02 (KST)
- 방법: 전건 `api.crossref.org/works/{DOI}` 직접 조회 (전건 HTTP 200, 404 없음 — 대체 DOI 탐색 불필요했음)
- 판정 요약: **일치 19건 · 불일치 0건 · 미해결 0건**

| # | 인용 (map) | DOI | 판정 | Crossref 레코드 근거 |
|---|---|---|---|---|
| 1 | Jeong et al., VLSI (2023) | 10.23919/VLSITechnologyandCir57934.2023.10185353 | 일치 | "World's First GAA 3nm Foundry platform Technology (SF3) with Novel Multi-Bridge-Channel-FET (MBCFET™) Process" · 첫 저자 Jeong Jaehun · 2023 IEEE Symposium on VLSI Technology and Circuits · 2023 · pp. 1-2 |
| 2 | Fischer et al., VLSI (2025) | 10.23919/VLSITechnologyandCir65189.2025.11075006 | 일치 | "Intel 18A Platform Technology Featuring RibbonFET (GAA) and PowerVia for Advanced High-Performance Computing" · 첫 저자 Fischer K. · 2025 Symposium on VLSI Technology and Circuits · 2025 · pp. 1-3 |
| 3 | Loo et al., ECS Trans. (2024) | 10.1149/11402.0015ecst | 일치 | "(Keynote) Epitaxial Si/SiGe Multi-Stacks: From Stacked Nano-Sheet to Fork-Sheet and CFET Devices" · 첫 저자 Loo Roger · ECS Transactions · 2024 · vol. 114(2), pp. 15-28 |
| 4 | Loo et al., ECS J. Solid State Sci. Technol. 14, 015003 (2025) | 10.1149/2162-8777/ada79f | 일치 | "Epitaxial Si/SiGe Multi-Stacks: From Stacked Nano-Sheet to Fork-Sheet and CFET Devices" · 첫 저자 Loo R. · ECS Journal of Solid State Science and Technology · 2025 · vol. 14(1), p. 015003 |
| 5 | Loo et al., ECS Trans. 109(4), 135 (2022) | 10.1149/10904.0135ecst | 일치 | "(Digital Presentation) Selective SiGe Vapor Etching Using Br2 in View of Nanosheet Device Isolation" · 첫 저자 Loo Roger · ECS Transactions · 2022 · vol. 109(4), pp. 135-140 |
| 6 | Lee, Lee & Lim, Solid State Phenom. 346, 40 (2023) | 10.4028/p-Bv9to5 | 일치 | "Highly Selective Etching of SiGe to Si for GAAFET" · 저자 Lee Seung Hyo · Lee Won Je · Lim Sang Woo (3인, 인용 표기와 정확히 일치) · Solid State Phenomena · 2023 · vol. 346, pp. 40-45 |
| 7 | Harada et al., Solid State Phenom. 314, 71 (2021) | 10.4028/www.scientific.net/SSP.314.71 | 일치 | "Si1-XGeX Selective Etchant for Gate-All-Around Transistors" · 첫 저자 Harada Ken · Solid State Phenomena · 2021 · vol. 314, pp. 71-76 |
| 8 | Kawarazaki et al., Solid State Phenom. 346, 23 (2023) | 10.4028/p-MsGv7Q | 일치 | "SiGe Selective Etching to Enable Bottom and Middle Dielectric Isolations for Advanced Gate-All-Around FET Architecture" · 첫 저자 Kawarazaki Hikaru · Solid State Phenomena · 2023 · vol. 346, pp. 23-28 |
| 9 | Kim et al., Solid State Phenom. 346, 34 (2023) | 10.4028/p-irgat2 | 일치 | "Investigation of Selective Wet Etching of SiGe Substrates for High-Performance Device Manufacturing" · 첫 저자 Kim Dong Gyu · Solid State Phenomena · 2023 · vol. 346, pp. 34-39 |
| 10 | Oniki et al., Solid State Phenom. 314, 119 (2021) | 10.4028/www.scientific.net/SSP.314.119 | 일치 | "Challenges and Solutions of Replacement Metal Gate Patterning to Enable Gate-all-Around Device Scaling" · 첫 저자 Oniki Yusuke · Solid State Phenomena · 2021 · vol. 314, pp. 119-126 |
| 11 | Oniki et al., Solid State Phenom. 282, 132 (2018) | 10.4028/www.scientific.net/SSP.282.132 | 일치 | "RMG Patterning by Digital Wet Etching of Polycrystalline Metal Films" · 첫 저자 Oniki Yusuke · Solid State Phenomena · 2018 · vol. 282, pp. 132-138 |
| 12 | Iwahata et al., Solid State Phenom. 314, 127 (2021) | 10.4028/www.scientific.net/SSP.314.127 | 일치 | "Removal of SOC Hard Mask for Patterning of Work Function Metal by Thermally Activated Ozone Gas" · 첫 저자 Iwahata Shota · Solid State Phenomena · 2021 · vol. 314, pp. 127-132 |
| 13 | Rosseel et al., ECS Trans. 109(4), 93 (2022) | 10.1149/10904.0093ecst | 일치 | "Properties of Selectively Grown Si:P Layers below 500°C for Use in Stacked Nanosheet Devices" · 첫 저자 Rosseel Erik · ECS Transactions · 2022 · vol. 109(4), pp. 93-98 |
| 14 | Huang et al., IEDM (2020) | 10.1109/IEDM13553.2020.9372066 | 일치 | "3-D Self-aligned Stacked NMOS-on-PMOS Nanoribbon Transistors for Continued Moore's Law Scaling" · 첫 저자 Huang C.-Y. · 2020 IEEE International Electron Devices Meeting (IEDM) · 2020 · pp. 20.6.1-20.6.4 |
| 15 | Liao et al., IEDM (2023) | 10.1109/IEDM45741.2023.10413672 | 일치 | "Complementary Field-Effect Transistor (CFET) Demonstration at 48nm Gate Pitch for Future Logic Technology Scaling" · 첫 저자 Liao S. · 2023 International Electron Devices Meeting (IEDM) · 2023 · pp. 1-4 |
| 16 | Radosavljević et al., IEDM (2023) | 10.1109/IEDM45741.2023.10413678 | 일치 | "Demonstration of a Stacked CMOS Inverter at 60nm Gate Pitch with Power Via and Direct Backside Device Contacts" · 첫 저자 Radosavljević Marko · 2023 International Electron Devices Meeting (IEDM) · 2023 · pp. 1-4 |
| 17 | Liao et al., IEDM (2024) | 10.1109/IEDM50854.2024.10873334 | 일치 | "First Demonstration of Monolithic CFET Inverter at 48nm Gate Pitch Toward Future Logic Technology Scaling" · 첫 저자 Liao S. · 2024 IEEE International Electron Devices Meeting (IEDM) · 2024 · pp. 1-4 |
| 18 | Liao et al., IEDM (2025) | 10.1109/IEDM50572.2025.11353820 | 일치 | "First Demonstration of CFET Ring Oscillator and SRAM Bit-Cell Functionality at Gate Pitch Smaller Than 48 nm for Future Logic and SRAM Technology" · 첫 저자 Liao S. · 2025 IEEE International Electron Devices Meeting (IEDM) · 2025 · pp. 1-4 |
| 19 | Mertens, Solid State Phenom. 346, 8 (2023) | 10.4028/p-TzN0MD | 일치 | "Nanosheet-Based Transistor Architectures for Advanced CMOS Scaling: Wet Etch and Gas Phase Etch Challenges in Confined Spaces" · 저자 Mertens Hans (단독 저자, 인용의 단독 표기와 일치) · Solid State Phenomena · 2023 · vol. 346, pp. 8-13 |

## 특이사항

- 구형 `www.scientific.net` 형식 DOI 4건 (#7, #10, #11, #12)도 Crossref에서 그대로 200으로 해석됨 — 현행 DOI로의 교체 불필요.
- #3과 #4는 제목이 같은 Loo et al.의 자매 레코드: #3 = ECS Trans. 114(2), 15-28 (2024, Keynote 표기 포함), #4 = ECS J. Solid State Sci. Technol. 14, 015003 (2025). 서로 다른 DOI·다른 레코드로 둘 다 유효 — map에서 혼동 없이 구분 표기만 하면 됨.
- #2 Fischer et al.은 Crossref 레코드상 저자 150명 규모 (Intel 18A 플랫폼 총괄 논문) — 인용의 Fischer 첫 저자는 일치.


---

# GAA 문헌 지도 검증 — 「DOI 없음」 학회·저널 13건 DOI 탐색 결과

- 일자: 2026-11-02
- 방법: Crossref API (`api.crossref.org/works`) 서지 쿼리·저자 쿼리·학회 컨테이너 쿼리·IEEE 멤버 필터(member:263) 교차 조회. 확정 기준 = Crossref 레코드의 제목·저자·학회·연도가 지도 초안 인용과 일치.
- 요약: **찾음(확정) 11건 · 없음 확인 2건**

| # | 인용 (지도 초안) | 결과 | DOI | Crossref 근거 (제목 · 저자 · 학회 · 연도) |
|---|---|---|---|---|
| 1 | Zhang et al., IEDM (2017) — 적층 나노시트 HKMG 기초와 다중 Vt | **확정** | 10.1109/iedm.2017.8268438 | "High-k metal gate fundamental learning and multi-Vt options for stacked nanosheet gate-all-around transistor" · Jingyun Zhang, Takashi Ando, Chun Wing Yeung, Miaomiao Wang 외 · IEDM 2017, pp. 22.1.1–22.1.4 |
| 2 | Bao et al., IEDM (2019) — 다이폴 다중 Vt + 금속 다중 Vt 결합 | **확정** | 10.1109/iedm19573.2019.8993480 | "Multiple-Vt Solutions in Nanosheet Technology for High Performance and Low Power Applications" · R. Bao, K. Watanabe, J. Zhang, J. Guo · IEDM 2019 |
| 3 | Yao et al., IEDM (2022) — WFM 없이 La/Al 다이폴만으로 n 7 + p 7 Vt | **확정** | 10.1109/iedm45625.2022.10019361 | "Record 7(N)+7(P) Multiple VTs Demonstration on GAA Si Nanosheet n/pFETs using WFM-Less Direct Interfacial La/Al-Dipole Technique" · Jiaxin Yao, Yanzhao Wei, Shuai Yang, Hong Yang 외 · IEDM 2022, pp. 34.2.1–34.2.4 |
| 4 | Zhang et al., IEDM (2019) — 완전 바닥 절연(FBDI) | **확정** | 10.1109/iedm19573.2019.8993490 | "Full Bottom Dielectric Isolation to Enable Stacked Nanosheet Transistor for Low Power and High Performance Applications" · J. Zhang, J. Frougier, A. Greene, X. Miao 외 · IEDM 2019, pp. 11.6.1–11.6.4 |
| 5 | Lanzillo et al., IITC (2020) — 감싸는 컨택(WAC)으로 S/D 기생 저항 감소 | **없음 확인** | — | Nicholas A. Lanzillo의 IITC 2020 논문은 Crossref에 3편뿐이며 전부 BEOL 주제 (구조 안정성 10.1109/iitc47697.2020.9515651 · BEOL 성능 평가 10.1109/iitc47697.2020.9515657 · 입계 산란 10.1109/iitc47697.2020.9515604) — WAC·나노시트 컨택 논문 없음. ※ 주제가 일치하는 IITC 2020 논문은 별도 존재: "Parasitic Resistance Reduction for Aggressively Scaled Stacked Nanosheet Transistors", Su-Chen Fan, Ruilong Xie, Heng Wu, Zuoguang Liu, 10.1109/iitc47697.2020.9515644 — 저자가 달라 확정하지 않음 (지도 인용의 저자 표기 오류 가능성) |
| 6 | Wang et al., IEEE Trans. Electron Devices 71, 4021 (2024) — S/D 가둠·단일 확산 차단 DTCO | **확정** | 10.1109/ted.2024.3403794 | "Design Technology Co-Optimization for Gate-All-Around Nanosheet Transistors Considering Source/Drain Confinement and Post-Gate Single Diffusion Break" · Dawei Wang, Tao Liu, Xin Sun, Ziqiang Huang 외 · IEEE TED 71, pp. 4021–4027 (2024) — 인용의 권·시작 쪽수와 정확히 일치 |
| 7 | Gupta et al., VLSI (2020) — imec 매립 전원선(BPR) 모듈 | **확정** | 10.1109/vlsitechnology18217.2020.9265113 | "Buried Power Rail Integration with Si FinFETs for CMOS Scaling beyond the 5 nm Node" · A. Gupta, H. Mertens, Z. Tao, S. Demuynck · VLSI 2020. ※ 자매 논문: IEDM 2020 "Buried Power Rail Scaling and Metal Assessment for the 3 nm Node and Beyond" (Gupta et al., 10.1109/iedm13553.2020.9371970) |
| 8 | Weckx et al., IEDM (2019) — 포크시트 개념, n·p 사이 유전체 벽 | **확정** | 10.1109/iedm19573.2019.8993635 | "Novel forksheet device architecture as ultimate logic scaling device towards 2nm" · P. Weckx, J. Ryckaert, E. Dentoni Litta, D. Yakimets 외 · IEDM 2019, pp. 36.5.1–36.5.4 |
| 9 | Mertens et al., VLSI (2021) — 포크시트 첫 전기 소자, n–p 간격 17 nm, 이중 WFM | **없음 확인** | — | 서지·저자·컨테이너 쿼리를 바꿔 반복 조회했으나 Crossref에 해당 레코드 없음. ※ 참고 (인용과 다름): Mertens 포크시트 소자 논문으로 확인되는 가장 근접한 것은 IEDM 2022 "Forksheet FETs with Bottom Dielectric Isolation…" (H. Mertens et al., 10.1109/iedm45625.2022.10019497) — 학회·연도가 달라 대입하지 않음 |
| 10 | Subramanian et al., VLSI (2020) — 300 mm 첫 모놀리식 CFET | **확정** | 10.1109/vlsitechnology18217.2020.9265073 | "First Monolithic Integration of 3D Complementary FET (CFET) on 300mm Wafers" · S. Subramanian, M. Hosseini, T. Chiarella, S. Sarkar 외 · VLSI 2020 |
| 11 | Mertens et al., VLSI (2023) — CFET 중간 유전체 절연(MDI) | **확정** | 10.23919/vlsitechnologyandcir57934.2023.10185218 | "Nanosheet-based Complementary Field-Effect Transistors (CFETs) at 48nm Gate Pitch, and Middle Dielectric Isolation to enable CFET Inner Spacer Formation and Multi-Vt Patterning" · H. Mertens, M. Hosseini, T. Chiarella, D. Zhou 외 · VLSI 2023 |
| 12 | Demuynck et al., VLSI (2024) — imec MDI + 적층 컨택, 생존율 11 → 79 % | **확정** | 10.1109/vlsitechnologyandcir46783.2024.10631349 | "Monolithic Complementary Field Effect Transistors (CFET) Demonstrated using Middle Dielectric Isolation and Stacked Contacts" · S. Demuynck, V. Vega Gonzalez, C. Toledo de Carvalho Cavalcante, L.P.B. Lima 외 · VLSI 2024 |
| 13 | Vandooren et al., IEDM (2025) — 층 전사 MDI(eMDI) 하이브리드 채널 CFET | **확정** | 10.1109/iedm50572.2025.11353866 | "Hybrid Channel monolithic-CFET with Si (110) pMOS and (100) nMOS" · A. Vandooren, S. Iacovo, V. Brissonneau 외 · IEDM 2025, pp. 1–4 |

## 비고

- #5·#9는 「없음 확인」이며, 비슷한 논문을 억지로 붙이지 않았다. #5는 지도 쪽 인용 저자(Lanzillo vs Fan) 점검이, #9는 인용 학회·연도(VLSI 2021) 재확인이 필요한 건으로 남긴다.
- 나머지 5건(학회 아님/기타)은 이번 작업 범위 밖.
