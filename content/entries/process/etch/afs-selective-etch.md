---
title: AFS 선택 식각
en: AFS Selective Etching
domain: process
topic: etch
order: 3
tags: AFS, 선택비, SiOCN
---

> 표면을 AFS 염으로 바꿨다가 열로 날리는 방식으로 특정 물질만 골라 깎는 선택 식각. 물질별 선택비와 문헌 데이터.

### 왜 SiOCN을 골라 깎아야 하나

GAA 나노시트에서 내부 스페이서는 게이트와 S/D 에피 사이에 매립되는 절연막이다. 이 막의 유전율이 곧 기생 용량이라, SiN(k≈7)보다 낮은 SiOCN(k≈4~5)·SiCO가 후보로 올라와 있다. Gu 등(2020)은 FinFET 게이트 스페이서에 SiOCN(k = 4.5)을 통합해 겹침 용량을 P/NFET 각각 12%/11% 줄였다.

그런데 low-k 스페이서를 쓰려면 막을 원하는 모양으로 깎는 공정 — 오목부를 파고(리세스), 바깥을 걷어내고(에치백), 필요하면 옆으로 다듬는(트림) — 이 Si·SiGe·SiO₂·Si₃N₄를 건드리지 않고 그 막에 대해서만 일어나야 한다. 내부 스페이서용 low-k는 아직 소자 실증이 없고(2026년 10월 기준, 이 편의 문헌 범위), 그 이유 중 하나가 이 형상 제어 식각의 어려움이다. 선택 식각 화학, 그중에서도 이 편이 다루는 AFS 염 화학이 이 자리의 후보로 연구된다.

### 선택비는 어디서 갈리나

같은 화학을 써도 어느 물질이 깎이는지는 조건에 따라 뒤집힌다. 문헌의 사례를 나란히 놓으면 선택비를 가르는 변수가 보인다.

**SiN이 깎이고 SiO₂가 남는 경우.** Shinoda 등(2016)은 하이드로플루오로카본 라디칼 노출 + 100~120°C 어닐 사이클로 Si₃N₄를 사이클당 2.6 nm씩 깎으면서, SiO₂ 식각량은 검출한계 아래에 머물렀다. 해석의 핵심은 질소다. AFS는 (NH₄)⁺를 품은 염이라 형성에 질소 공급이 필요한데, 이 화학계에서는 SiO₂ 표면에서 그 경로가 성립하지 않는다는 것이다. Possémé 등(2016)은 NH₃/NF₃ 리모트 플라즈마로 SiN 박층을 선택 제거하는 공정을 XPS·IR로 해부해, 표면 개질과 제거를 나눈 2단계 구조를 보였다.

**SiO₂가 깎이는 경우.** Cho 등(2020)은 CF₄/NH₃ 플라즈마로 SiO₂ 위에 AFS를 화학양론대로(F/Si = 6, N/Si = 2) 형성해 사이클당 2.7 nm를 깎았다. 같은 비교에서 NF₃/NH₃는 9.1 nm/cycle로 약 3배 빨랐다 — C–F 결합이 강해 F 공급이 적은 CF₄ 쪽이 느린 대신 얇게 제어하기 좋다. 플라즈마 쪽에서 NH₃로 질소를 대면 SiO₂도 염 경로에 올라탄다. 선택의 방향은 어느 쪽이 질소를 대는가와 F 공급량의 균형으로 정해진다.

**초고선택의 설계.** Volynets 등(2020)은 NF₃/N₂/O₂/H₂ 리모트 플라즈마에서 Si₃N₄/SiO₂ 선택비 약 380을 보고했고, 선택비는 H₂ 유량에 대해 뾰족한 최대값을 가졌다. Barsukov 등(2017)은 NF₃/O₂ 계에서 자연히 생기는 NO가 F의 표면 이동을 도와 SiN 식각을 가속한다는 메커니즘을 제시했다.

**SiCN·SiOCN의 경우.** Matsui 등(2021)은 NF₃/Ar 플라즈마에서 SiCN이 비교 물질들보다 빠르게 깎이며, 선택비는 깎지 않을 쪽에 보호층을 입히는 설계(산화층, Si 증착층, TiNₓFᵧ + ammonium fluoride층)로 만든다는 것을 보였다. Pranda 등(2023)은 SiCN·SiOCN·SiBCN의 식각률이 물질 자체의 질소 함량에 비례함을 보였고, Goya 등(2026)은 NF₃ 플라즈마에 H₂를 넣으면 적을 때는 F 증가와 산소 결핍층으로 SiOCN 식각이 빨라지다가, 많아지면(≥40 sccm) NHx 보호층이 생겨 느려지는 세 구간을 XPS로 구분했다.

| 화학계 | 주로 깎이는 쪽 | 선택 거동 (보고값) | 출처 |
| --- | --- | --- | --- |
| HFC 라디칼 + 어닐 (열 사이클) | Si₃N₄ | EPC 2.6 nm/cycle, SiO₂는 검출한계 아래 | Shinoda 2016 |
| NH₃/NF₃ 리모트 | Si₃N₄ 박층 | 개질 + 제거 2단계, 패턴 구조에서 평가 | Possémé 2016 |
| CF₄/NH₃ | SiO₂ | EPC 2.7 nm/cycle (NF₃/NH₃는 9.1) | Cho 2020 |
| NF₃/N₂/O₂/H₂ 리모트 | Si₃N₄ | SiO₂ 대비 선택비 ≈380 (H₂에서 최대) | Volynets 2020 |
| NF₃/Ar + 첨가 가스 | SiCN | 보호층 설계로 상대 물질을 보호 | Matsui 2021 |
| NF₃/Ar + H₂ | SiOCN | H₂ 양에 따라 가속 ↔ 보호층 3구간 | Goya 2026 |
| HF 가스 (플라즈마 없음) | Si₃N₄·SiO₂ | 상온 자발 반응, H₂O가 가속 | Lill 2024 |

### 논문을 한 표에 모으면

조건이 제각각인 문헌들을 그대로 나란히 놓은 통합 표다. "—"는 원문에서 값을 확인하지 못한 칸이며, 선택비의 상대 물질은 반드시 함께 읽어야 한다.

| 논문 | 대상 | 가스·방식 | 온도 | EPC | 선택비 (상대 물질) |
| --- | --- | --- | --- | --- | --- |
| Possémé 2016 | Si₃N₄ | NH₃/NF₃ 리모트 | — | — | SiO₂·Si 대비 박층 선택 제거 (개질+제거 2단계) |
| Shinoda 2016 | Si₃N₄ | HFC 라디칼 + 어닐 사이클 | 어닐 100~120 °C | 2.6 nm/cycle | SiO₂ 검출한계 아래 |
| Miyoshi 2017 | Si₃N₄ | 형성 + IR 어닐 | 탈착 130~230 °C (TDS) | — | — |
| Song 2018 | Si | 산화 + 개질 2단계 (염 중간상) | 형성 상온, 승화 진공 중 >100 °C | — | — (Si ALE로 확장) |
| Shinoda 2019 | Si₃N₄ | CHF₃/O₂ 다운스트림 | — | — | 자기제한 thermal-cyclic ALE |
| Cho 2020 | SiO₂ | CF₄/NH₃ | — | 2.7 nm/cycle (NF₃/NH₃는 9.1) | — |
| Volynets 2020 | Si₃N₄ | NF₃/N₂/O₂/H₂ 리모트 | — | — | ≈380 (SiO₂) |
| Matsui 2021 | SiCN | NF₃/Ar + 첨가 가스 | — | — | 보호층 설계로 고선택 (아래 절) |
| Kwon & Park 2022 | Si₃N₄ 표면 분말 | HF VPD 후 잔류 염 | 제거 170 °C·120 s·120 Torr + DIW | — | — ([[AFS 염의 제거와 잔류물]]) |
| Pranda 2023 | SiCN·SiOCN·SiBCN | NF₃ 계열 | — | — | 식각률이 N 함량에 비례 |
| Gil 2023 | SiO₂ | NF₃/H₂ 리모트 + 메탄올, 가열 사이클 | — | ≈13 nm/cycle | >50 (Si₃N₄) |
| Gill 2021 | SiO₂ | NF₃/H₂ 사이클릭 (흡착 20 s) | — | ≈7.5 nm/cycle | >40 (Si₃N₄) |
| Lill 2024 | Si₃N₄·SiO₂ | HF 가스 (무플라즈마) | 상온 | — | 자발 반응, H₂O가 가속 |
| Goya 2026 | SiOCN | NF₃ + H₂ | — | — | 14.0 (SiO₂) · 2.8 (SiN) · 1.5 (poly-Si), H₂ 40 sccm |
| Bang 2026 | Si₃N₄·SiO₂ | NF₃/NH₃ 극저온 RIE | −60 °C | — | AFS가 SiN 패시베이션으로 역전 |

### 물질별 거동 매트릭스

| 물질 | 거동 | 조건과 근거 |
| --- | --- | --- |
| SiO₂ | **조건부 식각** | 플라즈마가 질소(NH₃)를 대면 염 경로가 열려 깎인다 (Cho 2.7, Gil ≈13, Gill ≈7.5 nm/cycle). 질소 공급이 없는 HFC 계열에서는 남는다 (Shinoda 2016) |
| Si₃N₄ | **식각 (기본형)** | 모재가 질소 저장고라 염이 잘 선다 (Shinoda 2.6 nm/cycle, Volynets 선택비 ≈380). 단 극저온에서는 치밀한 염 층이 패시베이션이 되어 거동이 뒤집힌다 (Bang 2026) |
| Si | **조건부** | 직접 경로는 느리고, 산화 + 개질 2단계로 염을 경유하는 ALE가 보고됐다 (Song 2018). 첨가 가스로 표면을 산화시키면 보호쪽으로 돌릴 수 있다 (Matsui 2021) |
| SiGe | **데이터 부족** | 이 편의 문헌 범위에서 AFS 계열 거동의 직접 보고는 확인되지 않는다. Si와 같은 산화 경유 경로가 거론되는 수준이다 |
| SiCN | **식각 (빠름)** | NF₃/Ar에서 비교 물질보다 빠르게 깎이고, 식각률은 N 함량에 비례한다 (Matsui 2021, Pranda 2023) |
| SiOCN | **식각 (조건 민감)** | H₂ 양에 따라 가속 ↔ NHx 보호층의 3구간으로 갈린다 (Goya 2026). N 함량 의존성은 Pranda 2023과 같은 방향 |
| poly-Si | **보호 가능** | 표면에 약 1.0 nm 산화층을 입히면 F 라디칼로부터 보호된다 (Matsui 2021). Goya 2026에서는 무보호로도 SiOCN 대비 1.5배 느리게 깎였다 |

### 공정으로 만들기

연구실 화학을 공정으로 옮길 때의 쟁점은 세 가지다.

**사이클화.** Shinoda 등(2019)은 CHF₃/O₂ 다운스트림 플라즈마에서 암모늄염의 자기제한 반응으로 Si₃N₄의 thermal-cyclic ALE를 구현했다. 제거 단계의 병목은 탈착 시간인데, Miyoshi(2017)는 IR 램프 어닐로 150°C까지 10초 안에 승온해 탈착 시간을 크게 줄였다.

**잔류 염.** 염이 다 날아가지 않으면 입자가 된다. Kwon과 Park(2022)은 HF VPD(기상 식각)를 거친 Si₃N₄ 웨이퍼 표면에 (NH₄)₂SiF₆ 분말이 생기는 것을 확인했다. 분말 밀도는 Si₃N₄ 두께 30→70 nm 구간에서 317→2101개/mm²로 늘었고(지름 약 10 µm), 완전 분해 조건으로 진공 오븐 170°C·120초·120 Torr 가열과 25°C·30초 DIW 세정을 제시했다. 염을 쓰는 공정은 "만드는 조건"만큼 "남김없이 지우는 조건"이 공정 창의 절반이다.

**온도 창.** 형성은 상온 안팎, 분해는 100~230°C — 이 사이에 소자가 견딜 열 예산과 처리량(탈착 시간)이 끼어든다. Lill 등(2024)의 DFT 계산은 물이 AFS 결합을 약화시켜(결합 에너지 0.47 → 0.35 eV) 분해 온도를 낮출 여지를 보였다. 제거 단계에 H₂O를 쓰는 설계로 이어지는 근거다.

### 선택비가 무너질 때와 보호층 설계

선택비는 조건 창의 안에서만 성립한다. 창을 벗어나는 방식은 대체로 네 가지다.

- **F 과잉.** 자유 F가 많아지면 염 경로를 거치지 않는 직접 식각이 전 물질에서 일어나 선택비가 무너진다. H₂로 F를 HF에 묶는 것(Volynets 2020)이 창을 넓히는 대표 손잡이다.
- **온도 이탈.** 너무 뜨거우면 형성과 분해가 동시에 진행돼 자기제한이 사라지고, 너무 차가우면 — 극저온 NF₃/NH₃ RIE에서는 — 염이 치밀한 패시베이션으로 굳어 깎아야 할 SiN이 오히려 보호된다 (Bang 2026, −60°C에서 AFS 층이 HF 등의 도달을 막는 거동). 같은 염이 온도에 따라 식각 중간상과 보호막을 오간다.
- **NH₃ 과잉.** 모든 표면에 염이 서면 깎을 쪽과 지킬 쪽의 구분이 사라지고 잔류 리스크만 남는다.
- **보호층의 소모.** 선택비를 상대 물질의 보호층으로 만든 설계는, 보호층이 깎여 나가는 순간 선택비도 같이 무너진다 — 시간(사이클 수)에 대한 마진으로 봐야 한다.

보호층 쪽의 설계 사례는 Matsui 등(2021)에 집약돼 있다. 깎지 않을 쪽에 ① 약 1.0 nm의 산화층을 입혀 poly-Si를 보호하고, ② Si 증착층, ③ TiNₓFᵧ + ammonium fluoride층 같은 희생·변환 층을 조건별로 조합해 SiCN의 고선택 식각을 만들었다. Goya 등(2026)의 NHx 보호층은 같은 원리가 타깃 물질 자체에서 일어난 경우다 — H₂ ≥ 40 sccm에서 SiOCN 표면에 NHx 층이 생겨 정작 깎아야 할 막의 식각이 느려지므로, 보호와 억제는 같은 현상의 양면이다.

**주입 방식의 선택.** 가스를 동시에 흘리는 연속 방식은 처리량이 좋지만 형성과 제거가 섞여 자기제한이 약하고, 노출 → 퍼지 → 가열(탈착)을 나눈 순차 사이클은 EPC 제어가 정확해지는 대신 탈착 시간이 처리량을 잡아먹는다 (Miyoshi 2017의 IR 어닐이 이 병목을 겨냥했다). 다운스트림 구성에서는 라디칼이 이동 중에 감쇠·재결합하므로 웨이퍼 내 균일도와 패턴 로딩(개구 면적에 따른 소모)이 연속·순차 모두에서 별도 변수로 남는다.

### 열린 문제 — 비어 있는 자리

문헌을 모아 보면 지도의 빈칸이 보인다.

- 내부 스페이서에 low-k(SiOCN·SiCO)를 넣은 **소자 실증은 아직 없다**. 소재 비교와 TCAD 평가는 있지만, 실제 나노시트 소자에서 형상 제어 식각까지 닫힌 보고는 이 편의 문헌 범위에서 확인되지 않는다.
- SiOCN의 **조성(특히 N 함량)과 선택 식각 거동의 상관**은 Pranda(2023)의 비례 관계와 Goya(2026)의 보호층 경쟁이 양쪽에서 조여 오는 주제다. 염 형성(질소가 필요)과 보호층 형성(NHx)이 같은 질소를 두고 경쟁한다는 그림이 잡히면, 조성 설계와 공정 설계를 한 번에 할 수 있다.
- AFS 화학은 원래 SiN·SiO₂의 이야기였다. 그것을 탄소를 품은 low-k 질화물로 확장할 때 선택비가 무엇으로 갈리는지 — 이 편이 모은 문헌이 그 질문에 대한 현재까지의 답이다.

**원문 그림 보기**

- AFS 형성과 탈착의 XPS·TDS 원본 데이터 — Miyoshi (2017), [doi:10.7567/JJAP.56.06HB01](https://doi.org/10.7567/JJAP.56.06HB01)
- SiN thermal-cyclic ALE의 자기제한 곡선 — Shinoda et al. (2019), [doi:10.1116/1.5111663](https://doi.org/10.1116/1.5111663)
- H₂ 첨가에 따른 SiOCN 식각 3구간과 XPS — Goya et al. (2026), [doi:10.1116/6.0005595](https://doi.org/10.1116/6.0005595)

**참고 논문**

- [Thin layer etching of silicon nitride: A comprehensive study of selective removal using NH₃/NF₃ remote plasma](https://doi.org/10.1116/1.4963072) — Possémé et al., J. Vac. Sci. Technol. A 34, 061301 (2016)
- [Thermal cyclic etching of silicon nitride using formation and desorption of ammonium fluorosilicate](https://doi.org/10.7567/APEX.9.106201) — Shinoda et al., Appl. Phys. Express 9, 106201 (2016)
- [Thin layer etching of silicon nitride using infrared annealing for short desorption time of ammonium fluorosilicate](https://doi.org/10.7567/JJAP.56.06HB01) — Miyoshi, Jpn. J. Appl. Phys. 56, 06HB01 (2017)
- [Role of NO in highly selective SiN/SiO₂ and SiN/Si etching with NF₃/O₂ remote plasma](https://doi.org/10.1116/1.5004546) — Barsukov et al., J. Vac. Sci. Technol. A 35, 061310 (2017)
- [Self-limiting reactions of ammonium salt in CHF₃/O₂ downstream plasma for thermal-cyclic atomic layer etching of silicon nitride](https://doi.org/10.1116/1.5111663) — Shinoda et al., J. Vac. Sci. Technol. A 37, 051002 (2019)
- [Silicon atomic layer etching by two-step plasma process consisting of oxidation and modification to form (NH₄)₂SiF₆, and its sublimation](https://doi.org/10.7567/JJAP.57.106505) — Song et al., Jpn. J. Appl. Phys. 57, 106505 (2018). 같은 AFS 중간상을 Si 식각으로 확장 — 산화·개질로 염을 만들고 진공 중 100 °C 이상에서 승화 제거
- [Layer etching of SiO₂ for surface cleaning using ammonium fluorosilicate with CF₄/NH₃ plasma](https://doi.org/10.1116/1.5132986) — Cho et al., J. Vac. Sci. Technol. A 38, 022604 (2020)
- [Highly selective Si₃N₄/SiO₂ etching using an NF₃/N₂/O₂/H₂ remote plasma. I. Plasma source and critical fluxes](https://doi.org/10.1116/1.5125568) — Volynets et al., J. Vac. Sci. Technol. A 38, 023007 (2020)
- [Vacuum ultraviolet-absorption spectroscopy and delocalized plasma-induced emission used for the species detection in a down-stream soft-etch plasma reactor](https://doi.org/10.1116/6.0000134) — Soriano et al., J. Vac. Sci. Technol. A 38, 043002 (2020)
- [Mechanism of highly selective etching of SiCN by using NF₃/Ar-based plasma](https://doi.org/10.1116/6.0000711) — Matsui et al., J. Vac. Sci. Technol. A 39, 043008 (2021)
- [Effective methods for eliminating (NH₄)₂SiF₆ powders generated on Si₃N₄ wafers processed by HF VPD](https://doi.org/10.1007/s40042-022-00625-5) — Kwon & Park, J. Korean Phys. Soc. 81, 903 (2022)
- [Significance of plasma-surface interactions in the etch behavior of low-k materials](https://doi.org/10.1116/6.0003014) — Pranda et al., J. Vac. Sci. Technol. A 41, 063009 (2023)
- [Low-temperature etching of silicon oxide and silicon nitride with hydrogen fluoride](https://doi.org/10.1116/6.0004019) — Lill et al., J. Vac. Sci. Technol. A 42, 063006 (2024)
- [Effects of H₂ addition on highly selective SiOCN etching using NF₃-based plasma](https://doi.org/10.1116/6.0005595) — Goya et al., J. Vac. Sci. Technol. A 44, 053213 (2026)
- Gil et al., Sci. Rep. (2023), doi:10.1038/s41598-023-38359-4 — NF₃/H₂ 리모트 + 메탄올 가열 사이클, SiO₂ EPC ≈13 nm/cycle, Si₃N₄ 대비 선택비 >50 (원문 대조 확인)
- Gill et al., Plasma Process. Polym. 18, 2100063 (2021), doi:10.1002/ppap.202100063 — NF₃/H₂ 사이클릭, SiO₂ EPC ≈7.5 nm/cycle, Si₃N₄ 대비 선택비 >40 (원문 대조 확인)
- Bang et al., J. Vac. Sci. Technol. A 44, 033209 (2026), doi:10.1116/6.0005206 — 극저온 NF₃/NH₃에서 AFS가 SiN 패시베이션으로 전환 (원문 대조 확인)

## 관련 항목

- [[AFS 화학]] — 선택 식각의 바탕 화학
- [[AFS 염의 제거와 잔류물]] — 염을 남김없이 지우는 조건과 잔류물 문제
- [[ALE (원자층 식각)]] — 사이클 사고방식의 원류
- [[내부 스페이서]] — 응용이 겨냥하는 자리
