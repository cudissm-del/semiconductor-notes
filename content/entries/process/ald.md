---
title: ALD (원자층 증착)
en: Atomic Layer Deposition
cat: process
sub: 증착·성막
tags: 자기제한, 전구체
---

> 전구체와 반응 가스를 번갈아 넣어 표면 반응의 자기제한성으로 한 층씩 쌓는 증착.

ALD(원자층 증착)와 ALE(원자층 식각)는 반응을 두 단계로 나누고, 각 단계가 표면에서 저절로 멈추게(자기제한) 만들어 사이클 수로 두께를 제어한다. 핵심은 "한 사이클에 정확히 원자 한 층"이 아니라 **매 사이클이 스스로 멈춘다**는 점이며, 그래서 웨이퍼 전체와 깊은 구조 속에서도 결과가 고르다.

### ALD — 한 층씩 쌓기

1. **전구체 A 주입** — 표면 반응 자리에만 흡착하고, 자리가 다 차면 더 붙지 않는다(자기제한).
2. **퍼지** — 남은 A와 부산물 제거.
3. **반응물 B 주입** — 흡착된 A와 반응해 막 한 층을 완성하고 다음 흡착 자리를 만든다.
4. **퍼지** — 다시 비우고 1로 돌아간다.

**\[이미지\]** [ALD 한 사이클의 네 단계 — 반응물 A 흡착, 퍼지, 반응물 B 반응, 퍼지](https://commons.wikimedia.org/wiki/File:ALD_cartoon_Steps_1-4_Reactant_A_with_three_ligands_no_inert.jpg) · Aristeidis Goulas, Riikka L. Puurunen, J. Ruud van Ommen, CC BY 4.0

| 막 | 전구체 A | 반응물 B | 용도 |
| --- | --- | --- | --- |
| Al₂O₃ | TMA (트리메틸알루미늄) | H₂O, O₃ | 식각정지, 캡, 커패시터 유전체 |
| HfO₂ | HfCl₄, TEMAHf 등 | H₂O, O₃ | High-k 게이트 |
| TiN | TiCl₄ | NH₃ | 일함수 금속, 배리어, DRAM 전극 |
| SiO₂ / SiN | 아미노실란, 클로로실란 | O₂·N₂ 플라즈마, NH₃ | SADP 스페이서, 라이너, 내부 스페이서 |

**\[이미지\]** [대표 ALD 공정의 단순화한 반응 경로 — (a) TMA/H₂O → Al₂O₃, (b) HfCl₄/H₂O → HfO₂, (c) MeCpPtMe₃/O₃ → Pt](https://commons.wikimedia.org/wiki/File:3-ALD-reaction-schemes.png) · J. Ruud van Ommen, Riikka L. Puurunen, CC BY 4.0

- **열 ALD vs 플라즈마 ALD(PEALD)** — PEALD는 플라즈마 라디칼로 더 낮은 온도와 치밀한 막을 얻지만, 라디칼이 깊은 구조 바닥까지 덜 닿아 컨포멀성이 다소 떨어질 수 있다.
- **영역 선택 증착(ASD)** — 특정 표면에만 자라도록 억제제를 쓰는 기술. 자기정렬 비아 등에 연구된다.

**ALD 온도 창.** 자기제한이 성립하는 온도 범위가 있다. 너무 낮으면 전구체가 물리흡착으로 여러 층 쌓이거나(응축) 반응이 다 끝나지 않는다. 너무 높으면 전구체가 열분해되어 CVD처럼 계속 쌓이거나, 흡착된 종이 다시 떨어져 나간다. 그래서 공정 개발은 이 창 안에서 사이클당 성장량(GPC)이 일정한지 확인하는 것부터 시작한다.

**\[이미지\]** [ALD 온도 창 개념 — 창 밖에서는 응축(L1)·불완전 반응(L2)·열분해(H1)·탈착(H2)으로 자기제한이 깨진다 (Suntola 1989의 그림을 재구성)](https://commons.wikimedia.org/wiki/File:Illustration_of_the_ALD_temperature_window.png) · Riikka L. Puurunen, J. Ruud van Ommen, CC BY 4.0

## 관련 항목

- [[ALE (원자층 식각)]] — 쌓기의 반대편
- [[증착]] — ALD가 속한 방법 비교
