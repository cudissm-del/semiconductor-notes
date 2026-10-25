---
title: 식각 비이상 현상
en: Etch Non-idealities
cat: phenomena
sub: 플라즈마
tags: ARDE, 로딩, 프로파일
---

> 로딩 효과·ARDE·프로파일 이상처럼 실제 식각이 이상에서 벗어나는 현상들과, 공정을 평가하는 지표들.

### 공정 지표와 비이상 현상

| 항목 | 의미 / 원인 |
| --- | --- |
| 식각 속도, 균일도 | 웨이퍼 전체에서 같은 속도로 깎이는가 |
| 선택비 | 깎을 막 ÷ 마스크·하부막 식각 속도 |
| CD, 프로파일 각도 | 원하는 선폭·수직도 유지 |
| ARDE | 좁고 깊은 구멍일수록 느려짐 — 이온·라디칼이 바닥까지 못 가고 생성물이 못 빠져나옴 |
| 마이크로로딩 | 패턴이 빽빽한 곳과 성긴 곳의 속도 차이 — 라디칼 국부 소모 |
| Bowing, Twisting | 측벽에 반사된 이온, 전하 축적으로 구멍이 휘거나 비틀림 (HARC의 핵심 난제) |
| Notching, 마이크로트렌칭 | 절연막 표면 전하로 이온이 휘어 바닥 모서리가 파임 |
| 플라즈마 유도 손상 | 게이트 산화막 차징, UV에 의한 결합 절단, 이온에 의한 격자 손상 |

**\[이미지\]** [폭이 다른 Si 미세 채널을 같은 조건으로 ICP-DRIE한 단면 — 좁은 채널일수록 얕게 깎인 ARDE](https://commons.wikimedia.org/wiki/File:Etch_depth.jpg) · Mgerlt, CC BY-SA 4.0

&#91;embedded content: ARDE: 일반 식각과 극저온 식각 · Oehrlein et al. (2024) 재구성\]

ARDE는 좁고 깊은 구조에서 라디칼과 이온이 바닥까지 덜 도달하고, 반응 생성물이 덜 빠져나오기 때문에 생긴다. 3D NAND 채널홀처럼 종횡비가 수십 : 1에 이르는 식각에서는 이 감소가 생산성을 좌우한다. Oehrlein 등(2024)의 식각 로드맵 논문은 일반 식각과 극저온 식각의 종횡비 의존성을 비교하며, 극저온 식각을 고종횡비 식각의 유력한 방향으로 다룬다.

**끝점 검출(EPD).** 식각이 하부막에 닿는 순간을 플라즈마 발광 스펙트럼(OES)이나 막 두께 간섭 신호로 잡아 멈춘다. 끝점 이후의 과식각(over-etch) 양과 그동안의 선택비가 실제 공정 마진을 정한다. 원자층 단위의 제어가 필요해지면 [[ALE]]로 넘어간다.

**영상으로 보기**

- [Lam Research Sense.i 플라즈마 식각 플랫폼](https://www.youtube.com/watch?v=1tW_ebhUeIA) — 장비사 공식 식각 플랫폼 소개 (영어)

**원문 그림 보기**

- 이온-라디칼 시너지의 원본 데이터 — Coburn & Winters (1979), [doi:10.1063/1.326355](https://doi.org/10.1063/1.326355)
- FC 막 두께와 식각 속도 측정 — Schaepkens et al. (1999), [doi:10.1116/1.582108](https://doi.org/10.1116/1.582108)
- 고종횡비 식각의 문제(bowing, twisting)와 극저온 식각, 식각 기술 로드맵 전반 — Oehrlein et al. (2024, 오픈액세스), [doi:10.1116/6.0003579](https://doi.org/10.1116/6.0003579)

**참고 논문**

- [Ion- and electron-assisted gas-surface chemistry—An important effect in plasma etching](https://doi.org/10.1063/1.326355) — Coburn & Winters, J. Appl. Phys. 50, 3189 (1979). 이온-중성 시너지, 즉 방향성 식각의 원전
- [Study of the SiO₂-to-Si₃N₄ etch selectivity mechanism in inductively coupled fluorocarbon plasmas and a comparison with the SiO₂-to-Si mechanism](https://doi.org/10.1116/1.582108) — Schaepkens et al., J. Vac. Sci. Technol. A 17, 26 (1999). FC 막 두께와 선택비의 관계
- [Future of plasma etching for microelectronics: Challenges and opportunities](https://doi.org/10.1116/6.0003579) — Oehrlein et al., J. Vac. Sci. Technol. B 42, 041501 (2024). 식각 로드맵 리뷰, CC BY 4.0 오픈액세스
- *Principles of Plasma Discharges and Materials Processing* — Lieberman & Lichtenberg, 2nd ed., Wiley (2005). 플라즈마 물리와 식각의 표준 교재

### 정량 지표로 읽는 법 (교재 전형 정의)

- **불균일도** — (최대 − 최소) / (2 × 평균) × 100 [%].
- **선택비** — S = (깎을 막의 식각률) / (남길 막의 식각률). 과식각이 본식각의 20%이고 선택비가 10이면 하부막 손실은 목표 깊이의 약 2%에 그친다(산술 예시).
- **ARDE 곡선** — 깊이를 종횡비(AR)의 함수로 그린 곡선. 꺾이는 지점이 수송 제한의 시작이다.
- **프로파일 각도** — 90°가 수직. 크면 테이퍼, 측벽이 부풀면 bowing이다.

### 대응 지도

| 현상 | 1차 대응 | 대가·주의점 |
| --- | --- | --- |
| ARDE | 펄스 플라즈마, 압력·체류시간 조정, 극저온 식각 | 처리량 저하, 조건 창 축소 |
| 마이크로로딩 | 더미 패턴으로 밀도 균일화, 라디칼 공급 여유 | 레이아웃 제약 |
| Bowing·twisting | 패시베이션 균형, 이온 에너지·각도 제어, 펄스 바이어스 | 과하면 식각 정지 |
| Notching | 끝점 정밀도 향상, 과식각 최소화 | 끝점 신호가 약한 조합에서는 한계 |
| 플라즈마 유도 손상 | 저에너지 이온, 리모트 플라즈마 | 식각률·이방성과 트레이드오프 |

비이상 현상끼리도 서로 묶여 있다. ARDE를 잡으려고 패시베이션을 세게 하면 bowing과 식각 정지가 따라오고, 손상을 줄이려고 이온 에너지를 낮추면 프로파일이 무너진다. 공정 개발은 단일 현상의 제거가 아니라 지표 묶음의 균형이다.

## 근거

- 지표 정의·산술 예시 — 교재 전형 정의(논문 실측 아님). ARDE·극저온 식각 — 보유 논문: Oehrlein et al. (2024).

## 관련 항목

- [[건식 식각]] — 비이상 현상이 나타나는 공정
- [[플라즈마 기초]] — 현상의 배경
