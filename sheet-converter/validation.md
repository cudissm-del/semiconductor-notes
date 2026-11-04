# 검증 — 변환 결과 vs Claude 정본 data.json (2026-11-05)

- Claude 정본: `claude/research-siocn` 브랜치 research/siocn/data.json (SHA 39ac8f49), runs 21개
- 변환 결과: runs 28개 (기존 매칭 21개 + 신규 7개)
- 필드 단위 대조 (조건 필드 + res 값): 일치 248건, 신규 채움 27건, 변환 누락 0건, 반올림 수준 차이 0건, 불일치 0건

## 불일치 (양쪽 다 있는데 값이 다름)

없음.

## 반올림 수준 차이 (|Δ| ≤ 0.02 — 시트 원값의 소수 3자리 vs 2자리 반올림)

없음.

## 변환으로 새로 채워지는 빈칸 (Claude null/생략 → 변환 값)

| 런 | 필드 | 변환 값 |
|---|---|---|
| R1011-10w5 | modi | 60 |
| R1011-50w5 | modi | 60 |
| R1011-50w2 | modi | 60 |
| R1101-p20 | res.New SiOC.v | 3.14 |
| R1101-p20 | res.New SiOC.rtp | 0.47 |
| R1101-p20 | res.SiO₂.v | -2.22 |
| R1101-p20 | res.SiO₂.rtp | -0.22 |
| R1101-0 | res.New SiOC.v | -1.35 |
| R1101-0 | res.New SiOC.rtp | 3.31 |
| R1101-0 | res.SiO₂.v | 4.66 |
| R1101-0 | res.SiO₂.rtp | 3.02 |
| R1101-m20 | res.New SiOC.v | 4.41 |
| R1101-m20 | res.New SiOC.rtp | 2.25 |
| R1101-m20 | res.SiO₂.v | 0.76 |
| R1101-m20 | res.SiO₂.rtp | 1.46 |
| R1101-rep | res.New SiOC.v | 1.92 |
| R1101-rep | res.New SiOC.sd | 2.21 |
| R1102-2m | res.SiOCN.v | 5.83 |
| R1102-2m | res.New SiOC.v | 65.49 |
| R1102-2m | res.구 SiOC.v | 0.8 |
| R1102-2m | res.SiO₂.v | 1.81 |
| R1104-30 | res.SiOCN.rtp | -0.21 |
| R1104-30 | res.SiO₂.rtp | -0.55 |
| R1104-30 | res.구 SiOC.rtp | 2.33 |
| R1104-240-10w | res.SiOCN.rtp | 0.46 |
| R1104-240-10w | res.SiO₂.rtp | -0.16 |
| R1104-240-10w | res.구 SiOC.rtp | -2.88 |

## 변환 누락 (Claude에 있는데 변환이 못 만든 값)

없음.

## 신규 런 (Claude 정본에 없던 레코드 — 전부 시트 실측에서 생성)

- **R1011-modi10** (2026-10-11, Modi ×10 + RTP (스텝 분해), kind=delta, modi=60, cycles=10): SiOCN v 25.71/modi -31.73/rtp 57.44; 구 SiOC v 17.6/modi -25.95/rtp 43.55; New SiOC v 60.39/modi -14.18/rtp 74.57; SiO₂ v 41.25/modi -15.55/rtp 56.8
- **R1102-150s** (2026-11-02, 풀사이클, kind=epc, modi=150, cycles=3): SiOCN v 9.58; 구 SiOC v 4.34; New SiOC v 96.85; SiO₂ v 1.95
- **R1102-1m** (2026-11-02, 풀사이클, kind=epc, modi=60, cycles=3): SiOCN v 2.77; 구 SiOC v 0.65; New SiOC v 17.43; SiO₂ v 1.18
- **R1102-2m1c** (2026-11-02, 풀사이클 궤적 (1사이클 지점), kind=delta, modi=120, cycles=1): SiOCN v 12.63; 구 SiOC v 15.12; New SiOC v 61.23; SiO₂ v -0.26
- **R1102-90s** (2026-11-02, 풀사이클, kind=epc, modi=90, cycles=3): SiOCN v 10.14; 구 SiOC v 5.61
- **R1102-s1** (2026-11-02, 스텝 분해 1패스, kind=delta, modi=None, cycles=1): SiOCN v 1.92/modi 2.03/rtp -0.11; 구 SiOC v 3.01/modi 2.62/rtp 0.39; New SiOC v 6.04/modi 5.09/rtp 0.95; SiO₂ v -1.8/modi 0.39/rtp -2.19
- **R1102-s2** (2026-11-02, 스텝 분해 1패스, kind=delta, modi=None, cycles=1): SiOCN v 5.4/modi 3.28/rtp 2.12; 구 SiOC v 5.65/modi 5.08/rtp 0.57; New SiOC v 16.66/modi 15.76/rtp 0.9; SiO₂ v -2.41/modi 1.95/rtp -4.36

## coupons 대조 (생성 아님 — 시트 실값과의 대조만)

| 쿠폰 | 필드 | Claude | 시트 | 판정 | 출처 |
|---|---|---|---|---|---|
| C-SiOCN-1104 | start | 55.67 | 55.67 | 일치 | 11/01 탭 175행 Before |
| C-SiOCN-1104 | history after | 10.76 | 10.76 | 일치 | 11/01 탭 175행 최종 After |
| C-SiOC-1104 | start | 205.61 | 205.61 | 일치 | 11/01 탭 176행 Before |
| C-SiOC-1104 | history after | 181.78 | 181.78 | 일치 | 11/01 탭 176행 최종 After |
| C-SiOC-1101r | start | 211.36 | 211.36 | 일치 | 비율 블록 24:8 구 SiOC Before |
| C-SiOC-1101r | history[0] after | 181.3 | 181.3 | 일치 | 비율 블록 24:8 구 SiOC RTP 후 |
| C-SiOC-1101r | history[1] after | 153.13 | 153.13 | 일치 | 비율 블록 28:4 구 SiOC Modi 후 |
| C-SiOCN-1101a | history before | 46.26 | 46.26 | 일치 | 비율 블록 16:16 SiOCN Before |
| C-SiOCN-1101a | history after | 19.25 | 19.25 | 일치 | 비율 블록 16:16 SiOCN Modi 후 |

- C-SiOCN-1101a의 start 90.0은 포스트잇 출처라 시트에서 대조할 수 없다 (90초 블록의 Before 76.67은 시트 125행에 있음).

## 변환이 구조적으로 못 채우는 것

- `dir`·`note`·`flags`·`series`·`coupons` 링크: 해석·판정 영역이라 변환기가 만들지 않는다. 기존 런은 Claude 값을 승계했고, 신규 런은 비어 있다 (해석 작성은 교차검토 몫).
- 비율 블록 날짜: 시트에서는 11/02 섹션 아래이나 포스트잇·선행 이식 기준 2026-11-01로 Claude 정본과 일치시켰다 (mapping.md 예외 규칙).
- 「11/03」 탭은 조건 행만 있고 두께가 없어 런을 만들지 않았다. 「시트1」·10/07·10/08·10/10은 Claude 정본 runs의 범위 밖이라 변환하지 않았다.
- 렌더링 영향: R1011 3개 런에 modi=60이 채워지면 build_research.mjs의 조건 지도가 modi 60초 열을 새로 그리고, R1102-2m의 res가 차면 궤적 행에 구간 EPC가 표시된다. 채택 전 Claude 확인이 필요한 지점이다.
## 빌드 검증 (종단 확인)

- 변환된 data.json을 Claude의 `tools/build_research.mjs`로 실제 빌드 — 성공 (index.html 103 KB 생성, 신규 런 7개 전부 렌더링, '하한' 칩 표시 유지).
- 빌드 경고는 테스트 샌드박스에 백과 본문 (content/entries)이 비어 있어 나온 것뿐으로, data.json 자체와 무관하다.
