# 매핑표 — Google Sheets 「SiOCN CCP」 → Claude 연구 대시보드 data.json (runs)

작성: 2026-11-05 Joy. 변환기 `sheet_to_research_json.py`의 규칙 정본.
스키마 기준: repo `claude/research-siocn` 브랜치 `research/siocn/data.json` (SHA 39ac8f49) + `tools/build_research.mjs`의 필드 사용 방식.

## 전체 설계

- 변환 대상은 **`runs` 배열뿐**이다. meta·overview·calib·papers·hypotheses·timeline·measurement·plans·roadmap·decisions·links는 수기 큐레이션 영역이라 변환기가 건드리지 않고, 출력 파일에서는 Claude 정본 값을 그대로 승계한다.
- `coupons`도 변환 대상이 아니다 (체인·포스트잇 등 시트 밖 정보가 섞임). 단, 검증에서 시트 값과 대조는 한다.
- 출력 `out/data.json` = Claude 정본 로드 → `runs`만 변환 결과로 교체한 파일.
- 런 레코드 안에서 **수기 필드 (`dir`, `note`, `flags`, `series`, `coupons`)는 변환기가 만들지 않는다.** 기존 레코드와 id가 매칭되면 Claude 값을 승계하고, 신규 런은 `dir: ""`, `note: "시트 변환 신규 — 해석 미작성"`, `flags` 없음으로 둔다. (예외: `flags: ["하한"]` 같은 판정성 표식은 승계로만 유지되며, 변환기가 새로 부여하지 않는다. 11/04 SiOCN 하한 추정치 표기는 기존 레코드 R1104-x4의 `flags`·`note` 승계로 보존된다.)

## 공통 규칙

| 규칙 | 내용 |
|---|---|
| 없는 값 | `null`. 0이나 빈 문자열로 채우지 않는다 (Claude 스키마 관례 — 화면에 '기록 없음') |
| Δ 재계산 | 모든 두께 Δ는 시트 기입 Δ/EPC 열을 믿지 않고 **Before − After로 재계산**한다. 한쪽이라도 비면 그 Δ는 만들지 않는다 (해당 키 생략 또는 null) |
| Δ 부호 | 양수 = 식각, 음수 = 성장 |
| EPC | Δ ÷ 사이클 수로 재계산 |
| 반올림 | 소수 2자리 (Claude 수기 값의 관례와 동일) |
| sd | 반복 측정 표준편차는 표본 표준편차 (n−1) |
| 유량 | **UI 값을 그대로** `h2o_ui`·`cf4_ui`에 넣는다. sccm 환산은 Claude 빌드가 `calib` 보정표로 하므로 변환기에서 환산하지 않는다 |
| 조건 출처 | 탭의 조건 행·블록 메모 기준. 시트에 구조화된 기록이 없으면 null |
| 재료명 | 시트 `SiOC` → `구 SiOC`, `new SiOC`/`New SiOC` → `New SiOC`, `SiO2` → `SiO₂`, `SiOCN` → `SiOCN` |
| 날짜 | ISO `YYYY-MM-DD`. 블록이 속한 날짜 섹션 기준 (예외: 비율 블록 — 아래 참조) |

## runs 필드 매핑

| data.json 필드 | 타입 | 출처 |
|---|---|---|
| `id` | str | 규칙: `R<MMDD>-<접미>`. 기존 레코드는 Claude id를 그대로 쓴다. 신규 런 id는 검증 리포트에 '신규'로 표시 |
| `date` | str | 탭·섹션 날짜 |
| `status` | str | 두께 실측이 있는 런은 `"완료"` |
| `temp` | int\|null | 조건 행 Temp (℃). 「11/01」 탭은 섹션 헤더의 온도 |
| `power` | int\|null | 조건 행 Power (W) |
| `pressure` | int\|null | 조건 행 Pressure (mTorr) |
| `h2o_ui` / `cf4_ui` | int\|null | 조건 행 UI Flow (UI 단위 그대로) |
| `mode` | str | 블록 성격 (풀사이클 / 스텝 분해 1패스 / Modi 단독 / 풀사이클 ×4 (총량) / H₂O 분율 블록 등 — 기존 레코드는 Claude 표기 승계, 신규는 같은 어휘로) |
| `modi` | int\|null | Modi 시간 (초). 풀사이클 EPC 런에서도 조건 행 Time이 있으면 채운다 |
| `cycles` | int\|null | 사이클 수. 궤적 레코드 (R1102-2m)는 Claude 관례대로 null |
| `kind` | str | `"epc"` = res 값이 Å/cycle, `"delta"` = res 값이 Å (총 Δ 또는 스텝 Δ) |
| `res.<막>.v` | num | kind=epc면 EPC, kind=delta면 순 Δ (Before − 최종 After) |
| `res.<막>.modi` | num | 스텝 분해에서 Modi 단계 Δ (Before − Modi 후) |
| `res.<막>.rtp` | num | 스텝 분해에서 RTP 단계 Δ (Modi 후 − RTP 후) |
| `res.<막>.sd` | num | 반복 블록의 표본 표준편차 (v와 쌍) |

## 탭·블록별 출처

### 「10/11 F.C」 탭 (구조화 양식: 조건 열 + Before/After/Cycle/EPC)
- F.C 5사이클 10 W (샘플 3번) → `R1011-10w5`, F.C 5사이클 50 W (샘플 4번) → `R1011-50w5`, F.C 2사이클 50 W (샘플 1번) → `R1011-50w2`. kind=epc, res.v = (Before−After)/Cycle 재계산.
- Modi만 10사이클 (10 W) → RTP → 합산 행 블록은 **신규 런 `R1011-modi10`** (kind=delta, modi 시간 60×10, cycles 10, res에 modi/rtp/v 스텝 분해). Claude 정본에는 레코드가 없고 note에서만 언급된다.

### 「11/01」 탭 (메모형 — 섹션 헤더 + 재료 행 블록. 열: 재료/샘플/Before/Modi 후/RTP 후)
| 블록 (행) | 변환先 | 비고 |
|---|---|---|
| §2 초기 두께 제거, Full Cycle 1회 × 샘플 3개 (6–20) | `R1101-rep` (kind=delta, res.v=평균, res.sd=표본sd) | 온도·파워·압력 기록 없음 → null. New SiOC도 계산해 채운다 (Claude 수기에는 없음 — 검증에 신규 채움으로 보고) |
| §3 Modi 5분 온도 3수준 (24–37) | `R1101-p20` / `R1101-0` / `R1101-m20` (kind=delta, 스텝 분해) | h2o_ui=6 (메모·선행 이식 기준), cf4_ui·power·pressure null. SiO₂·New SiOC도 modi/rtp/v를 전부 계산해 채운다 (Claude 수기는 modi만 — 검증에 신규 채움으로 보고) |
| 11/02 §스텝 분해 세트 1·2 (63–82) | **신규 `R1102-s1` / `R1102-s2`** (kind=delta, 스텝 분해, temp −20, h2o_ui 4) | Modi 시간 기록 없음 → modi null. 세트 구분은 stable time (짧음/늘림) — note는 수기 영역이라 변환기가 쓰지 않는다 |
| 11/02 5분 3사이클 EPC (87–90) | `R1102-5m` (kind=epc) | |
| 11/02 Modi 시간 split (95–126) | 4분→`R1102-4m`, 6분→`R1102-6m` (기존). **신규: 60초→`R1102-1m`, 150초→`R1102-150s`, 90초→`R1102-90s`** (전부 kind=epc, cycles 3) | |
| 11/02 궤적 2분 (105–113) | 1사이클 지점 → **신규 `R1102-2m1c`** (kind=delta, cycles 1). 이어진 3사이클 구간 EPC → 기존 `R1102-2m`의 빈 `res`를 채운다 (kind=epc 유지, cycles는 null 유지) | Claude note의 "사이클별 원값은 시트에서 이식 대기" 항목 |
| H₂O:CF₄ 비율 블록 (130–141) | `R1101-r1220` / `r1616` / `r2408` / `r2804` (kind=delta, 스텝 분해) | **날짜 예외**: 시트에서는 11/02 섹션 아래에 있으나, 포스트잇·선행 이식 (Joy) 기준 2026-11-01로 Claude 정본과 일치시킨다 (검증에 출처 차이로 기록). 조건 (UI 쌍)은 행 라벨 (4:25 등), temp·power·pressure는 기록 없음 → null. RTP 후 열이 빈 막은 modi만 |
| 11/04 Modi 단독 시리즈 (150–171) | `R1104-30` / `120` / `240` / `480` / `240-10w` (kind=delta) | 조건은 행 148 메모 (16:16 = H₂O UI 5·CF₄ UI 20, 50 W, 50 mTorr), 10 W 블록은 행 167 메모. res.v = Modi Δ, res.rtp = RTP Δ (측정 열이 있으면 채운다 — Claude 수기가 ≈0으로 생략한 30초·10 W 블록도 계산값 채움, 검증에 보고) |
| 11/04 풀사이클 ×4 (175–177) | `R1104-x4` (kind=delta, cycles 4, modi 120) | Before/최종 After만 있어 v만 계산. 하한 표기는 기존 레코드의 flags·note 승계로 보존 |

### 범위 외 (변환하지 않음)
- 「시트1」 (08/29–31), 「10/07 Full cycle」, 「10/08 F.C」, 「10/10 F.C」: Claude 정본 `runs`에 대응 레코드가 없는 구간 (timeline에만 있음). 변환 대상에서 제외하고 검증 리포트에 명시한다.
- 「11/03」 탭: 조건 행만 있고 두께가 없어 런을 만들지 않는다.
- 「기본 실험조건」 탭: 거의 비어 있음.

## coupons 대조 규칙 (생성 아님)
- `C-SiOCN-1104` / `C-SiOC-1104`: 「11/01」 탭 175–177행 Before/After와 대조.
- `C-SiOC-1101r`: 비율 블록 행 138 (211.36→181.30) · 행 141 (181.30→153.13) 체인과 대조.
- `C-SiOCN-1101a`: 행 134의 Before 46.26 · Modi 후 19.25와 대조. start 90.0은 포스트잇 출처라 시트 대조 불가로 표시.
