---
title: ALE (원자층 식각)
en: Atomic Layer Etching
cat: process
sub: 식각
tags: 자기제한, 사이클
---

> 개질과 제거를 나눈 사이클로 한 층씩 깎는 자기제한 식각. ALD의 거울상이다.

### ALE — 한 층씩 깎기

1. **개질(A)** — Cl₂, FC 등으로 표면 몇 원자층만 반응시켜 결합을 약하게 만든다. 이 단계만으로는 거의 깎이지 않아야 한다.
2. **퍼지**
3. **제거(B)** — Ar⁺ 같은 저에너지 이온으로 개질층만 떼어낸다. 개질되지 않은 원래 막은 이 에너지로 거의 안 깎여야 한다.
4. **퍼지** — 표면이 원래 상태로 "리셋"되고 다음 사이클로.

&#91;embedded content: ALE 한 사이클 · 개질 → 퍼지 → 제거 → 퍼지\]

이 구조가 성립하려면 두 가지가 동시에 참이어야 한다. 각 단계가 **자기제한적**일 것 (노출을 늘려도 반응이 일정 깊이에서 멈출 것), 그리고 두 단계가 **서로에게만 의존**할 것 (한 단계만으로는 깎이지 않을 것). 아래 절들은 이 두 조건이 실제로는 어떤 화학으로 구현되고, 어디서 어떻게 깨지는지를 재료·문헌별로 뜯어본 것이다.

### 표면 화학 — 무엇이, 왜 깎이는가

열 ALE의 화학은 결국 하나의 열역학 관문을 통과해야 한다. **식각 생성물이 그 온도에서 휘발성이어야 한다.** 개질이 표면을 아무리 바꿔도 생성물이 표면에 남아 있으면 식각은 한 층에서 멈추고, 반대로 개질 없이도 생성물이 휘발성이면 그건 ALE가 아니라 자발(연속) 식각이다. 재료군마다 이 관문을 통과하는 방식이 다르고, 그 방식이 곧 메커니즘 분류가 된다 (George, 2020).

**불화 + 리간드 교환 — 금속 산화물의 표준형.** 대부분의 금속 불화물은 대응하는 산화물보다 안정하므로, HF로 표면을 불화하는 반응은 열화학적으로 유리하게 진행된다. 문제는 그렇게 만든 금속 불화물 층 자체가 너무 안정하다는 것이다. 금속–F–금속 브리지 결합이 층을 붙잡고 있어서 그냥은 떨어지지 않는다. 리간드 교환은 인접한 금속 중심 사이의 transmetalation으로 이 브리지를 끊는다. F를 다른 리간드로 바꿔 휘발성 착물로 만들어 날리는 단계다. Al₂O₃의 경우가 표준 예시다.

```latex
\mathrm{Al_2O_3 + 6HF + 4Al(CH_3)_3 \rightarrow 6AlF(CH_3)_2 + 3H_2O}
```

반쪽 반응으로 나누면 (A) HF가 표면을 AlF₃로 바꾸고, (B) TMA가 리간드 교환으로 AlF(CH₃)₂(다이메틸알루미늄 플루오라이드)를 떼어낸다. QCM으로는 200 °C에서 사이클당 −8.4 ng/cm²의 선형 질량 감소가 관측됐고, HF 압력을 4~8 Torr로 올리면 불화층이 5~6 Å까지 두꺼워져 식각량이 약 2.5 Å/cycle (300 °C)까지 커진다 — 불화층의 두께가 곧 그 사이클의 식각량을 정한다는 뜻이다. Sn(acac)₂를 쓰는 계열도 같은 골격이고, 휘발 생성물은 AlF(acac)₂로 추정된다. 단, 이 경로는 **금속 불화물 자체가 휘발성인 재료에서는 성립하지 않는다.** 그런 재료는 불화 단계에서 자발 식각이 일어나 자기제한이 무너지므로, 아래의 전환이나 산화 경로가 필요하다.

**전환(conversion) 식각 — SiO₂가 이 경로를 타는 이유.** SiO₂는 낮은 TMA 노출에서는 불화+리간드 교환만으로 깎을 직접 경로가 없다. 대신 TMA가 표면을 아예 다른 물질로 바꿔버린다 (DuMont et al., 2017).

```latex
\mathrm{3SiO_2 + 4Al(CH_3)_3 \rightarrow 2Al_2O_3 + 3Si(CH_3)_4}
```

표면의 SiO₂가 Al₂O₃·알루미노실리케이트·환원된 Si 종으로 전환되고, Si는 휘발성인 Si(CH₃)₄로 빠져나간다 (XPS로 환원된 Si 종 확인). 이렇게 전환된 층은 Al₂O₃이므로, 다음 HF 노출에서 불화되고 다음 TMA 노출에서 리간드 교환으로 제거된다. 즉 SiO₂ ALE는 "전환 → 불화 → 리간드 교환"의 3단 구조이고, **사이클당 식각량은 전환이 표면 아래로 얼마나 진행했는가**로 정해진다. 이것이 뒤 절에서 보는 EPC 압력 의존의 기원이다.

**산화 + 전환 — 원소 물질과 질화물.** Si나 TiN 같은 재료는 그 자체로는 안정하고 휘발성인 식각 생성물을 만들 산화 상태에 있지 않다. 그래서 먼저 산화 상태를 끌어올린다. Si는 O₂로 표면을 SiO₂로 만든 뒤 위의 전환 경로를 태우고 (Abdulagatov et al., 2018: O₂–HF–TMA 순서, 290 °C에서 0.4 Å/cycle, 전환된 SiO₂ 두께 10~11 Å), Si₃N₄는 산화 → HF → TMA의 3단계로 290 °C에서 0.25 Å/cycle (O₂ 산화) 또는 0.47 Å/cycle (O₃ 산화)을 얻는다 (Abdulagatov et al., 2020). 반응물 순서도 변수다. Si에서 순서를 O₂–TMA–HF로 바꾸면 식각량이 0.4에서 0.2 Å/cycle로 떨어진다 — 전환이 불화보다 먼저 일어나야 한다는 메커니즘의 방증이다. 금속 쪽에서는 Ru의 산소 흡착 + 이온 제거 (Kim et al., 2024)처럼 산화가 개질을 맡는 플라즈마형이 있고, 염소화 경로 (예: WF₆를 이용한 TiO₂의 Cl/F 리간드 교환)도 같은 "산화 상태를 휘발성 생성물에 맞추는" 논리의 변형이다.

**활성종을 바꾸면 선택이 뒤집힌다 — NH₃ 공동 주입.** Junige & George (2024)는 같은 TMA/HF 화학에서 HF에 NH₃를 함께 흘리는 것만으로 SiO₂/SiNₓ 선택이 역전됨을 보였다 (275 °C). NH₃가 없으면 열 ALE의 EPC는 SiO₂ 0.20, SiNₓ 1.06 Å/cycle로 SiNₓ가 약 5배 빨리 깎인다. NH₃를 공동 주입하면 SiO₂의 EPC가 8.83 Å/cycle로 뛰고 SiNₓ는 사실상 0이 되어 선택 인자가 >1000:1로 뒤집힌다. 저자들은 이를 표면 활성종이 F⁻에서 HF₂⁻로 바뀌기 때문으로 해석한다. 조건표의 숫자가 아니라 **어느 종이 표면에서 일하는가**가 선택비를 정한다는, 메커니즘 중심 해석의 좋은 예다.

### 자기제한은 어디서 오는가

"자기제한적"이라는 말은 하나의 현상이 아니다. 포화가 어디서 오는지를 시스템별로 구분해야 EPC의 거동을 예측할 수 있다.

**흡착 부위 포화형.** 개질종의 흡착이 단층에서 멈추는 경우다. Miyoshi et al. (2022)의 HF/NH₃ 순차 노출 SiO₂ ALE (개질 → 어닐로 염 제거)에서는 EPC가 노출 시간에 대해 약 0.9 nm/cycle에서 포화했고, 그 곡선이 Langmuir 흡착 모델과 잘 맞았다. 흡착과 탈착이 평형을 이루는 동안만 개질층이 자라고 평형 두께에서 멈춘다는 그림이다. 포화값이 단층보다 훨씬 큰 0.9 nm/cycle인 것도 이 그림과 모순되지 않는다 — 포화하는 것은 "층 수"가 아니라 평형 피복량이다.

**전환 깊이 제한형.** DuMont의 SiO₂ 전환 식각에서는 FTIR로 두 반쪽 반응 모두 노출 시간에 대해 자기제한 거동을 확인했지만, **EPC 자체는 반응물 압력의 강한 함수였다.** 정적 압력 0.1 → 4.0 Torr에서 XRR 기준 0.027 → 0.31 Å/cycle로 10배 넘게 변했고, 약 0.08 Torr의 viscous flow 조건에서는 식각 자체가 일어나지 않았다. 즉 반쪽 반응의 "포화"는 주어진 압력에서의 포화일 뿐, 포화량은 전환 반응이 표면 아래로 도달하는 깊이가 정한다. 자기제한 곡선 하나로 ALE임을 판정할 수 없고, 압력 (또는 플럭스)까지 흔들어 봐야 하는 이유다.

**생성물 층 장벽형.** 개질 생성물 층이 반응종의 확산을 막아 스스로 성장을 멈추는 경우로, 암모늄염 (AFS) 화학이 대표적이다. 이 항목에서는 메커니즘만 짚고, 정량 논의는 [[AFS 화학]]과 [[AFS 선택 식각]]에 맡긴다.

**포화 ≠ 단층 제거.** ALE라는 이름과 달리 EPC가 단층 (수 Å)일 필요는 없다. 문헌의 EPC는 DuMont의 0.027 Å/cycle부터, Cl 흡착 + Ar⁺ 제거 Si ALE의 창에서 보고된 약 14 Å/cycle까지 세 자릿수에 걸쳐 분포한다. Kanarik et al. (2015)의 지적대로 EPC는 ALE를 정의하는 요소가 아니며, 단층 제거는 보편적인 기대가 아니다. Si ALE에서 EPC가 연구마다 다른 이유조차 아직 완전히 이해되지 않았고, 입체 장애와 초기 표면 거칠기가 거론되는 수준이다.

**자기제한이 깨지는 자리.** 대표 경로는 셋이다. 첫째, **자연 식각** — 개질 단계의 반응물이 단독으로 계속 깎는 경우다. Junige & George (2024)에서 HF 단독 노출 (3 Torr, 275 °C)의 자연 식각률은 SiO₂ 0.03 Å/min으로 무시할 수준이었지만 SiNₓ는 1.72 Å/min에 달해, SiNₓ의 "ALE"에서는 오히려 자연 식각이 사이클 식각을 지배했다. 같은 화학인데 재료에 따라 한쪽은 이상적 ALE, 한쪽은 사실상 연속 식각인 것이다. 둘째, **CVD 성분 혼입** — FC 계열에서 개질 (증착) 단계의 플럭스가 과하면 개질층이 포화 없이 자라 증착 공정에 가까워진다. 셋째, **퍼지 부족으로 인한 단계 겹침** — 잔류 반응물과 다음 단계 종이 만나면 기상·표면에서 동시 반응이 일어나 자기제한이 풀린다. 퍼지 시간 배분이 처리량 절에서 다시 등장한다.

### 시너지 — "ALE인가"를 판정하는 법

**ALE 시너지**는 두 단계가 서로 얼마나 의존하는지를 나타내는 지표다. 100%에 가까울수록 이상적인 ALE이다 (Kanarik et al., 2017).

```latex
\text{Synergy}(\%) = \frac{\mathrm{EPC} - (A + B)}{\mathrm{EPC}} \times 100
```

EPC는 사이클당 식각 두께, A·B는 각 단계를 단독으로 반복했을 때 깎이는 양이다. Kanarik 등의 예로, EPC가 0.7 nm/cycle인데 A 단독 0.03, B 단독 0.04 nm/cycle이면 시너지는 90%다. 앞 절의 Junige 사례에 이 잣대를 대면 구도가 분명해진다. SiO₂는 HF 자연 식각이 0.03 Å/min으로 작아 시너지가 이상에 가깝지만, SiNₓ는 자연 식각이 커서 같은 절차를 돌려도 시너지가 낮다. **시너지는 공정의 속성이기 전에 재료–화학 쌍의 속성이다.**

시너지의 크기를 가르는 물리량은 벌크 표면 결합 에너지 E_O다. Kanarik et al. (2017)은 Si, Ge, C, W,
...[truncated 8317 chars] GaN, SiO₂ 여섯 재료에서 시너지가 벌크 표면 결합 에너지와 함께 커짐을 보였다. E_O는 승화열로 추정하며 대략 2~10 eV 범위에 있고 Si는 4.7 eV다. 개질층을 떼는 데 필요한 에너지 (E_des; SiCl₂의 열탈착에 대해 약 2.3 eV로 계산)와 벌크를 떼는 E_O 사이의 간격이 넓을수록, 제거 단계의 에너지를 그 사이에 넣을 여지가 커져 시너지가 높아진다.

**좋은 공정 창은 에너지 순서로 정해진다.** 이상적인 ALE는 다음 순서를 만족해야 한다 — 개질 반응 장벽 < 개질 단계 에너지 < 개질층 탈착 에너지 < 제거 단계 이온 에너지 < 원래 막의 표면 결합 에너지 (E_mod < ε_A < E_des < ε_B < E_O). 제거 이온은 개질층은 떼되 원래 막은 못 건드릴 만큼만 세야 하고, 이 순서가 성립하는 구간이 ALE 창이다.

&#91;embedded content: 자기제한 포화 곡선과 ALE 창 · George (2010), Kanarik et al. (2015) 재구성\]

왼쪽은 ALD가, 오른쪽은 ALE가 자기제한적인지 확인하는 대표적인 실험의 모양이다. ALD는 전구체를 더 오래 흘려도 GPC가 더 늘지 않아야 한다. ALE는 제거 단계 이온 에너지를 바꿔도 EPC가 거의 일정한 평탄 구간(ALE 창)이 있어야 한다. 창보다 낮은 에너지에서는 개질층이 떨어지지 않고, 높은 에너지에서는 개질되지 않은 막까지 스퍼터링된다.

판정 실험은 세 가지로 수렴한다. ① **반쪽 사이클 분리 실험** — A만, B만 반복해 A·B 값을 재는 것. Venugopal et al. (2026)은 SF₆ 흡착 단독으로도, Ar 플라즈마 단독으로도 SiO₂가 깎이지 않음을 분리 실험으로 확인해 시너지 100%를 주장했다. ② **포화 곡선** — 노출 시간과 이온 에너지 두 축 모두에서 EPC가 평탄해야 하며, 앞 절처럼 압력 의존이 숨어 있을 수 있어 조건을 흔들어 확인한다. ③ **측정법** — EPC는 in situ 엘립소메트리로 사이클 중 두께를 직접 추적하거나 (Abdulagatov, Miyoshi 등), QCM으로 질량 변화를 재는 (George 그룹의 열 ALE) 방식이 표준이고, 개질층의 화학 상태는 XPS·in situ FTIR이 맡는다.

### 변형들 — 열·플라즈마·극저온·방향성

| ALE 종류 | 원리 | 특징 | 적용 예 |
| --- | --- | --- | --- |
| 방향성(플라즈마) ALE | 개질 + 이온 제거 | 이방성, 바닥만 깎음 | 게이트·SAC 컨택 바닥, 스페이서, 금속(Ru·Mo) 식각 |
| 준(quasi)-ALE | FC 폴리머 얇게 증착 + Ar⁺ 제거 반복 | 완전한 자기제한은 아님, 높은 선택비 | 산화막 SAC 식각 (10nm급 로직 양산 적용) |
| 등방성(열) ALE | 불화·리간드 교환 등 열 반응 두 단계 | 플라즈마 없이 모든 방향으로 고르게 | GAA 측면 리세스·채널 릴리스 후보, 3D 구조 트리밍 |
| 극저온(cryo) ALE | HF 응축·흡착층 개질 + 저에너지 이온 제거 | 온도가 EPC와 선택비를 뒤집는 노브 | SiO₂/SiN 초고선택 식각 (연구 단계) |

**열과 플라즈마의 본질적 차이는 에너지를 넣는 방식이다.** 열 ALE는 온도 하나로 두 반쪽 반응의 속도를 모두 정한다. Arrhenius 거동이라 공정 창은 온도 구간으로 주어지고, 방향성은 없지만 손상도 없다. 플라즈마 ALE는 개질 (라디칼 화학)과 제거 (이온 에너지)를 독립 노브로 분리할 수 있고 이온이 방향성을 만들지만, 이온 에너지 분포의 꼬리가 벌크 손상과 창 밖 스퍼터링의 원인이 된다. 그래서 플라즈마 ALE의 창은 이온 에너지 축에서, 열 ALE의 창은 온도 축에서 무너지는 방식으로 서로 다르다. 중간 지대도 있다. Metzler et al. (2016)의 플럭스 제어형은 플라즈마를 끄지 않은 채 C₄F₈ 주입과 저에너지 Ar⁺ 충격을 주기적으로 동기화해, 시간 분리를 플럭스 변조로 대체했다. 전구체를 CHF₃로 바꾸면 FC 막이 쌓이는 쪽으로 기울어 SiO₂/Si 선택 식각이 된다.

**극저온에서는 응축층이 반응장이 된다.** Hsiao et al. (2024)은 HF dose + Ar 제거로 SiN을 깎는 극저온 ALE를 in situ 엘립소메트리·ATR-FTIR로 추적했다. 개질층은 화학흡착된 AFS와 그 위에 물리흡착된 HF/NHₓFᵧ의 이중 구조였고, 온도를 내릴수록 이 층이 안정해져 EPC가 줄었다. −60 °C에서는 약 23 eV의 Ar 이온으로 화학흡착층을 분해할 수 없어 식각이 사실상 멈춘다. 이온 에너지 피크 (17~23 eV)가 SiN의 스퍼터 임계 (약 25 eV) 아래에 있어 벌크는 보호되는 구조다. 주목할 점은 자기제한이 나타나는 온도 구간이다. −30 °C에서는 Ar 시간에 대해 EPC가 약 0.2 nm/cycle로 포화하고 HF dose 시간 (3~120 s)에 무감했지만, 20 °C에서는 포화가 나타나지 않았다. **상온에서 열리고 저온에서 닫히는 게 아니라, 이 시스템에서는 거꾸로다.**

같은 그룹의 후속 연구 (Hsiao et al., 2026)는 저온이 선택비를 뒤집는 노브임을 보였다. HF dose에 에탄올 5%를 섞으면, 극저온에서 HF와 에탄올의 공동 흡착이 SiO₂ 불화의 활성화 에너지를 낮춰 SiO₂의 EPC가 온도 하강 (20 → −60 °C)과 함께 0.25 → 0.79 nm/cycle로 커진다. 반대로 SiN은 AFS 층이 안정해질수록 EPC가 0.29 → 0으로 사라져, SiO₂/SiN 선택비는 0.87에서 사실상 무한대까지 벌어진다 (Ts ≤ −40 °C). 에탄올이 없으면 SiO₂에서는 어느 온도에서도 시너지가 관찰되지 않았다. 극저온 ALE의 포화는 화학흡착 부위 포화라기보다 **응축·흡착 평형이 정하는 개질량**에 가까워, 고전적 ALE의 자기제한 그림과는 기원이 다르다는 점이 이 변형의 경계 문제다.

**방향성의 창은 이온 에너지로 정해진다.** Cl 흡착 + Ar⁺ 제거 Si ALE에서 이상적 창으로 보고된 구간은 Ar⁺ 60~80 eV, EPC 약 14 Å다. 같은 에너지에서 SiO₂는 70 eV까지 EPC가 사실상 0이었는데, Si–O 결합 (6.4 eV)이 Si–Cl (4.2 eV)보다 강해 Cl 치환 자체가 열역학적으로 불리하기 때문이다. Osonio et al. (2023)의 지형 선택적 ALE는 라디칼 불화로 전체를 개질한 뒤 이온이 닿는 수평면만 제거해, 방향성을 "깎는 방향"이 아니라 "남기는 방향"의 설계에 쓴 예다.

**quasi-ALE의 S-곡선은 포화 곡선과 다른 축이다.** Wang et al. (2017)이 선택비 최적화에 쓴 S-곡선은 노출량이 아니라 제거 (탈착) 시간에 대한 식각/증착 경향의 곡선이다. 제거가 짧으면 FC가 남아 증착 쪽으로, 길면 개질층이 다 날아가 선택비가 무너지는 쪽으로 기운다. 지형 구조에서는 입구에 폴리머가 쌓이는 클로깅이 식각을 멈추게 하며, 그 마진이 지형의 민감한 함수라는 것이 이 연구의 또 다른 축이다. quasi-ALE를 고전적 ALE와 가르는 것은 포화의 부재 자체보다, **포화 대신 균형점으로 공정을 잡는** 설계 철학이다.

### 표면 거칠기 — 매끄러워지는 조건과 거칠어지는 조건

ALE가 매끄럽다는 통념에는 메커니즘이 있다 (Kanarik et al., 2015). 연속 플라즈마 식각에서는 반응성 이온 (Cl⁺, Cl₂⁺)까지 고에너지로 표면을 때려 Si–Si 결합을 끊고, 들어간 Cl이 격자를 변형시키는 손상층이 누적된다. 게다가 강한 Si–Cl 결합은 표면 원자의 확산 장벽을 높여, 생긴 요철이 스스로 펴지는 것까지 막는다. ALE의 제거 단계에는 비활성 Ar⁺만 있고, 스퍼터 임계보다 낮은 에너지에서는 끊긴 결합이 개질종이 제거된 뒤 다시 붙을 수 있어, 사이클이 끝날 때마다 표면이 "리셋"되는 방향으로 작용한다. 정량 근거로는 열 Si ALE에서 최적 조건의 RMS 거칠기가 식각 전후 모두 2.0 ± 0.2 Å로 유지됐다는 보고가 있다 (Abdulagatov et al., 2018).

거칠어지는 경계도 같은 논문 안에 있다. 그 Si ALE에서 O₂ 정적 압력을 최적점 아래 (250 Torr 미만)로 낮추자 식각률이 떨어지면서 RMS 거칠기가 오히려 커졌다. 개질이 불균일해지면 — 덮인 곳과 안 덮인 곳의 제거량이 달라지면 — 사이클은 요철을 지우는 게 아니라 새기는 쪽으로 일한다. 개질 단계 자체의 화학 식각이 언더컷과 거칠기를 만드는 것도 오래 지적된 실패 모드다. 정리하면 거칠기는 "ALE인가 아닌가"가 아니라 **개질의 균일성과 제거 에너지가 창 안에 있는가**의 함수다.

### 처리량 — 숫자로 보는 한계와, 그럼에도 쓰는 자리

처리량은 EPC와 사이클 시간을 곱하면 바로 보인다. DuMont et al. (2017)의 조건은 반쪽 반응마다 노출 20 s + 퍼지 120 s, 즉 사이클 280 s다. 이 조건의 최대 EPC 0.31 Å/cycle로 10 nm를 깎으려면 약 320 사이클, 시간으로는 약 25 시간이 걸린다 (단순 환산). 반대로 EPC가 큰 화학 — Miyoshi의 0.9 nm/cycle, 플라즈마 ALE의 Å~nm급 — 을 써도 이번엔 퍼지가 발목을 잡는다. 산업 관점의 정리 (Lee et al., 2026)에 따르면 퍼지는 전체 사이클 시간의 절반 이상을 차지하는 경우가 흔하고, 같은 패턴을 깎는 데 ALE가 기존 RIE보다 약 5배 오래 걸렸다 (자사 라인 기준). 퍼지를 함부로 줄일 수 없는 이유는 앞 절의 실패 모드와 직결된다. 잔류 반응물이 다음 단계와 겹치면 자기제한이 풀리고, 물리흡착종의 아웃개싱 꼬리와 고종횡비 구조 안의 Knudsen 확산이 요구 퍼지 시간을 물리적으로 정한다.

그럼에도 ALE를 쓰는 자리는 "전체를 ALE로"가 아니다. 대부분을 연속 식각으로 깎고 마지막 수 nm의 정밀 구간만 ALE로 처리하는 하이브리드가 표준 구도다. ALE의 단가가 정당화되는 곳은 선택비와 손상의 이득이 곧바로 소자 특성으로 환산되는 자리 — 예컨대 SAC 식각에서 게이트 숄더 손실 감소가 누설 전류 감소로 이어지는 경우 (Lee et al., 2026) — 와, 깊이 오차가 곧바로 실패가 되는 리세스·릴리스 구간이다. 공정 단순화 쪽에서는 사이클을 플라즈마 펄스 단위로 접는 "1 펄스 = 1 사이클" 스킴 같은, 시간 분리 방식을 바꾸려는 시도도 나온다.

ALE는 10nm급 로직 양산부터 도입되었다. GAA의 리세스, 게이트 금속 리세스, 차세대 금속 배선 직접 식각이 대표적인 수요처다.

**원문 그림 보기**

- ALE 공정 창, 시너지, 산업 적용 사례 — Kanarik et al. (2015), [doi:10.1116/1.4913379](https://doi.org/10.1116/1.4913379)
- 열 ALE(불화 + 리간드 교환)의 반응 개념 — George & Lee (2016), [doi:10.1021/acsnano.6b02991](https://doi.org/10.1021/acsnano.6b02991)
- 고종횡비 구조 속 ALD 컨포멀성 분석 — Cremers et al. (2019, 오픈액세스), [doi:10.1063/1.5060967](https://doi.org/10.1063/1.5060967)

**참고 논문**

- [Mechanisms of Thermal Atomic Layer Etching](https://doi.org/10.1021/acs.accounts.0c00084) — George, Acc. Chem. Res. 53 (2020). 열 ALE 메커니즘 분류 (불화+리간드 교환, 전환, 산화, 자기제한 리간드, 온도 변조)
- [Thermal Atomic Layer Etching of Silicon Dioxide Using Sequential, Self-Limiting Reactions](https://doi.org/10.1021/acsami.7b01259) — DuMont et al., ACS Appl. Mater. Interfaces 9 (2017). SiO₂ 전환 식각, EPC 압력 의존 0.027~0.31 Å/cycle
- [Predicting synergy in atomic layer etching](https://doi.org/10.1116/1.4979019) — Kanarik et al., J. Vac. Sci. Technol. A 35, 05C302 (2017). 시너지 정의와 표면 결합 에너지 스케일링
- [Overview of atomic layer etching in the semiconductor industry](https://doi.org/10.1116/1.4913379) — Kanarik et al., J. Vac. Sci. Technol. A 33, 020802 (2015). ALE의 산업 적용 관점 정리, 표면 리셋·스무딩 논의
- [Selectivity between SiO₂ and SiNₓ during thermal atomic layer etching using Al(CH₃)₃/HF and spontaneous etching using HF and effect of HF + NH₃ codosing](https://doi.org/10.1021/acs.chemmater.4c01040) — Junige & George, Chem. Mater. 36, 6950 (2024). 자연 식각 정량과 NH₃ 공동 주입에 의한 선택 역전 (>1000:1)
- [Atomic layer etching of SiO₂ with self-limiting behavior on the surface modification step using sequential exposure of HF and NH₃](https://doi.org/10.1116/6.0001517) — Miyoshi et al., J. Vac. Sci. Technol. A 40 (2022). 개질 단계 자기제한과 Langmuir 흡착 모델, EPC 0.9 nm/cycle
- [In Situ Monitoring Surface Reactions in Cryogenic ALE of Silicon Nitride by Alternating HF Dose and Ar Plasmas](https://doi.org/10.1021/acs.chemmater.4c01835) — Hsiao et al., Chem. Mater. 36 (2024). 극저온 개질층의 이중 구조와 온도 역전 거동
- [Cryogenic-Assisted HF Surface Reactions Enabling Reversibly Ultra-High Selectivity of ALE Between SiO₂ and SiN](https://doi.org/10.1002/smtd.202501744) — Hsiao et al., Small Methods (2026). 에탄올 공동 흡착으로 선택비를 무한대까지 역전
- Thermal Atomic Layer Etching of Silicon Using an Oxidation, Fluorination, and Ligand-Exchange Mechanism — Abdulagatov et al. (2018). Si 열 ALE 0.4 Å/cycle, 거칠기 2.0 Å 유지
- [Thermal atomic layer etching of silicon nitride using an oxidation and 'conversion etch' mechanism](https://doi.org/10.1116/1.5140481) — Abdulagatov & George, J. Vac. Sci. Technol. A 38 (2020). Si₃N₄ 열 ALE (산화+전환)
- Fluorocarbon Assisted Atomic Layer Etching of SiO₂ and Si Using Cyclic Ar/C₄F₈ and Ar/CHF₃ Plasma — Metzler et al., J. Vac. Sci. Technol. A 34 (2016). 플럭스 제어형 사이클릭 ALE
- [Quasiatomic layer etching of silicon oxide selective to silicon nitride in topographic structures using fluorocarbon plasmas](https://doi.org/10.1116/1.4978224) — Wang et al., J. Vac. Sci. Technol. A 35 (2017). S-곡선으로 선택비 최적화, 클로깅
- [Topographically-selective atomic layer etching of SiO₂ using radical fluorination of the surface followed by Ar ion bombardment](https://doi.org/10.35848/1347-4065/ad0c46) — Osonio et al., Jpn. J. Appl. Phys. 62, 121001 (2023)
- [Atomic-layer precision etching of SiO₂ using sequential molecular adsorption and plasma activation](https://doi.org/10.1039/D5TC03428K) — Venugopal et al., J. Mater. Chem. C 14, 1009 (2026). SF₆ 흡착 + Ar 플라즈마, 시너지 100%, CC BY 4.0
- Plasma Atomic Layer Etching of Ruthenium by Oxygen Adsorption-Removal Cyclic Process — Kim et al., Appl. Surf. Sci. (2024). 금속 ALE의 산화+제거형
- Atomic Layer Etching for Low-k Fine Patterning: Industrial Perspective — Lee et al., J. Vac. Sci. Technol. A 44, 058501 (2026). 퍼지·처리량 한계와 산업 적용의 논리
- [Atomic Layer Deposition: An Overview](https://doi.org/10.1021/cr900056b) — George, Chem. Rev. 110, 111 (2010). ALD 표면화학의 표준 리뷰
- [Surface chemistry of atomic layer deposition: A case study for the trimethylaluminum/water process](https://doi.org/10.1063/1.1940727) — Puurunen, J. Appl. Phys. 97, 121301 (2005). TMA/H₂O 공정으로 본 ALD 표면화학
- [Conformality in atomic layer deposition: Current status overview of analysis and modelling](https://doi.org/10.1063/1.5060967) — Cremers, Puurunen & Dendooven, Appl. Phys. Rev. 6, 021302 (2019). 컨포멀성 리뷰, CC BY 4.0 오픈액세스
- [Prospects for Thermal Atomic Layer Etching Using Sequential, Self-Limiting Fluorination and Ligand-Exchange Reactions](https://doi.org/10.1021/acsnano.6b02991) — George & Lee, ACS Nano 10, 4889 (2016). 열 ALE의 개념
- [Future of plasma etching for microelectronics](https://doi.org/10.1116/6.0003579) — Oehrlein et al., J. Vac. Sci. Technol. B 42, 041501 (2024). ALE 절(II L) 참고

**연구 연결 — 암모늄염 ALE.** 이 장의 ALE 사이클(개질 → 제거)을 염 화학으로 구현한 대표 사례가 암모늄염 thermal-cyclic ALE다. 표면을 (NH₄)₂SiF₆ 염으로 바꾸는 단계가 자기제한적이고, 가열로 염을 분해하는 단계가 제거에 해당한다. Shinoda 등(2019)은 이 방식으로 Si₃N₄를 사이클 단위로 깎았고, 자세한 화학·선택비·진단은 [[AFS 선택 식각]]에 따로 모았다.

## 관련 항목

- [[ALD (원자층 증착)]] — ALE와 짝을 이루는 공정
- [[AFS 선택 식각]] — 염 화학으로 구현한 ALE
- [[건식 식각]] — ALE가 정밀도를 극단으로 민 형태
