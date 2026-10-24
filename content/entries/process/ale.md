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

**ALE 시너지** — 이 두 단계가 서로 얼마나 의존하는지 나타내는 지표다. 100%에 가까울수록 이상적인 ALE이다.

```latex
\text{Synergy}(\%) = \frac{\mathrm{EPC} - (A + B)}{\mathrm{EPC}} \times 100
```

EPC는 사이클당 식각 두께, A·B는 각 단계를 단독으로 돌렸을 때 깎이는 양이다. 예를 들어 사이클당 1nm가 깎이는데 A만으로 0.1nm, B만으로 0.1nm가 깎이면 시너지는 80%다.

**좋은 공정 창은 에너지 순서로 정해진다.** Lam Research의 Kanarik 등은 이상적인 ALE가 다음 순서를 만족해야 한다고 정리했다 — 개질 반응 장벽 < 개질 단계 에너지 < 개질층 탈착 에너지 < 제거 단계 이온 에너지 < 원래 막의 표면 결합 에너지. 즉 제거 이온은 개질층은 떼되 원래 막은 못 건드릴 만큼만 세야 한다.

&#91;embedded content: 자기제한 포화 곡선과 ALE 창 · George (2010), Kanarik et al. (2015) 재구성\]

왼쪽은 ALD가, 오른쪽은 ALE가 자기제한적인지 확인하는 대표적인 실험의 모양이다. ALD는 전구체를 더 오래 흘려도 GPC가 더 늘지 않아야 한다. ALE는 제거 단계 이온 에너지를 바꿔도 EPC가 거의 일정한 평탄 구간(ALE 창)이 있어야 한다. 창보다 낮은 에너지에서는 개질층이 떨어지지 않고, 높은 에너지에서는 개질되지 않은 막까지 스퍼터링된다.

| ALE 종류 | 원리 | 특징 | 적용 예 |
| --- | --- | --- | --- |
| 방향성(플라즈마) ALE | 개질 + 이온 제거 | 이방성, 바닥만 깎음 | 게이트·SAC 컨택 바닥, 스페이서, 금속(Ru·Mo) 식각 |
| 준(quasi)-ALE | FC 폴리머 얇게 증착 + Ar⁺ 제거 반복 | 완전한 자기제한은 아님, 높은 선택비 | 산화막 SAC 식각 (10nm급 로직 양산 적용) |
| 등방성(열) ALE | 불화·리간드 교환 등 열 반응 두 단계 | 플라즈마 없이 모든 방향으로 고르게 | GAA 측면 리세스·채널 릴리스 후보, 3D 구조 트리밍 |

**ALE가 주는 것.** 사이클 수로 깊이를 정하므로 종횡비에 덜 민감하고(ARDE 완화), 패턴 밀도와 무관하게 균일하며, 표면이 매끄럽다. Lam의 실험에서 연속 식각은 표면 거칠기를 원자 15층만큼 늘렸지만 ALE는 1층만 늘렸다. 대신 느리므로, 실제 공정은 대부분을 연속 식각으로 깎고 마지막 정밀 구간만 ALE로 처리하는 경우가 많다.

ALE는 10nm급 로직 양산부터 도입되었다. GAA의 리세스, 게이트 금속 리세스, 차세대 금속 배선 직접 식각이 대표적인 수요처다.

**원문 그림 보기**

- ALE 공정 창, 시너지, 산업 적용 사례 — Kanarik et al. (2015), [doi:10.1116/1.4913379](https://doi.org/10.1116/1.4913379)
- 열 ALE(불화 + 리간드 교환)의 반응 개념 — George & Lee (2016), [doi:10.1021/acsnano.6b02991](https://doi.org/10.1021/acsnano.6b02991)
- 고종횡비 구조 속 ALD 컨포멀성 분석 — Cremers et al. (2019, 오픈액세스), [doi:10.1063/1.5060967](https://doi.org/10.1063/1.5060967)

**참고 논문**

- [Atomic Layer Deposition: An Overview](https://doi.org/10.1021/cr900056b) — George, Chem. Rev. 110, 111 (2010). ALD 표면화학의 표준 리뷰
- [Surface chemistry of atomic layer deposition: A case study for the trimethylaluminum/water process](https://doi.org/10.1063/1.1940727) — Puurunen, J. Appl. Phys. 97, 121301 (2005). TMA/H₂O 공정으로 본 ALD 표면화학
- [Conformality in atomic layer deposition: Current status overview of analysis and modelling](https://doi.org/10.1063/1.5060967) — Cremers, Puurunen & Dendooven, Appl. Phys. Rev. 6, 021302 (2019). 컨포멀성 리뷰, CC BY 4.0 오픈액세스
- [Overview of atomic layer etching in the semiconductor industry](https://doi.org/10.1116/1.4913379) — Kanarik et al., J. Vac. Sci. Technol. A 33, 020802 (2015). ALE의 산업 적용 관점 정리
- [Prospects for Thermal Atomic Layer Etching Using Sequential, Self-Limiting Fluorination and Ligand-Exchange Reactions](https://doi.org/10.1021/acsnano.6b02991) — George & Lee, ACS Nano 10, 4889 (2016). 열 ALE의 개념
- [Future of plasma etching for microelectronics](https://doi.org/10.1116/6.0003579) — Oehrlein et al., J. Vac. Sci. Technol. B 42, 041501 (2024). ALE 절(II L) 참고

**연구 연결 — 암모늄염 ALE.** 이 장의 ALE 사이클(개질 → 제거)을 염 화학으로 구현한 대표 사례가 암모늄염 thermal-cyclic ALE다. 표면을 (NH₄)₂SiF₆ 염으로 바꾸는 단계가 자기제한적이고, 가열로 염을 분해하는 단계가 제거에 해당한다. Shinoda 등(2019)은 이 방식으로 Si₃N₄를 사이클 단위로 깎았고, 자세한 화학·선택비·진단은 [[AFS 선택 식각]]에 따로 모았다.

## 관련 항목

- [[ALD (원자층 증착)]] — ALE와 짝을 이루는 공정
- [[AFS 선택 식각]] — 염 화학으로 구현한 ALE
- [[건식 식각]] — ALE가 정밀도를 극단으로 민 형태
