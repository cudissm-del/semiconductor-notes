---
title: 게이트 스택 (HKMG)
en: Gate Stack (HKMG)
cat: devices
sub: 트랜지스터
tags: High-k, 금속 게이트, EOT
---

> High-k 절연막과 금속 게이트로 이뤄진 게이트 구조. EOT, 일함수, 문턱전압 조정의 원리.

HKMG(High-k Metal Gate)는 SiO₂ 게이트 절연막을 고유전율 막(HfO₂)으로, poly-Si 전극을 금속으로 바꾼 게이트 구조다. 45nm 세대 이후 거의 모든 고성능 로직이 HKMG를 쓰며, 지금은 더미 게이트를 나중에 교체하는 RMG(gate-last) 방식이 표준이다.

### 왜 High-k인가 — EOT

SiO₂를 1nm대까지 얇게 만들자 전자가 막을 뚫고 지나가는 터널링 누설이 폭증했다. High-k 막은 물리적으로 두껍게 만들어 누설을 막으면서도 같은 정전용량을 낸다. 이 "SiO₂로 환산한 두께"가 EOT다.

```latex
\mathrm{EOT} = t_{\text{high-}k} \times \frac{3.9}{k_{\text{high-}k}}
```

예: k≈20인 HfO₂ 3nm는 EOT 약 0.6nm에 해당한다. 실제 스택은 Si와 HfO₂ 사이에 얇은 SiO₂ 계면층(IL)이 있어 전체 EOT는 이보다 크다.

### 왜 Metal Gate인가

- **poly 공핍** — poly-Si 전극 쪽에도 공핍층이 생겨 EOT가 늘어나는 효과.
- **페르미 준위 고정(pinning)** — poly-Si와 HfO₂ 계면 반응으로 문턱전압이 원하는 값에서 벗어남.
- **이동도 저하** — High-k의 소프트 포논 산란을 금속 전극이 일부 차폐.

### 일함수로 문턱전압을 정한다

게이트 금속의 일함수가 문턱전압을 정한다. NMOS는 Si 전도대 근처(약 4.1eV), PMOS는 가전자대 근처(약 5.2eV)의 일함수가 필요하다.

| 층 (아래→위) | 물질 예 | 역할 |
| --- | --- | --- |
| 계면층 (IL) | SiO₂ (화학 산화) | Si와 High-k 사이 계면 품질 확보 |
| High-k | HfO₂ | 게이트 유전체 |
| 캡 / 배리어 | TiN, TaN | 확산 방지, 식각 정지 |
| 일함수 금속 | PMOS: TiN 계열 / NMOS: TiAl, TiAlC | 문턱전압 설정 |
| 충진 금속 | W (또는 Al) | 게이트 저항 감소 |

&#91;embedded content: HKMG 게이트 스택 단면 · 층별 역할과 EOT]

여러 문턱전압(multi-Vt) 소자는 일함수 금속 두께·조성을 바꾸거나, La₂O₃(n형)·Al₂O₃(p형) 같은 **다이폴층**을 넣어 만든다. GAA에서는 시트 사이 틈이 좁아 금속을 두껍게 넣을 수 없으므로 다이폴 방식의 비중이 커진다.

## 관련 항목

- [[RMG (Gate-last)]] — 게이트를 만드는 순서
- [[절연막]] — 게이트 절연막의 재료 경쟁
- [[FEOL]] — 게이트가 만들어지는 흐름
