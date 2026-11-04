#!/usr/bin/env python3
"""변환 결과 (out/data.json) vs Claude 정본 (ref/claude_data.json) 런 단위 대조.

산출: out/validation.md — 일치/신규 채움/변환 누락/불일치 + coupons 대조.
수치는 양쪽 실값만 쓴다.
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))


def load(p):
    with open(os.path.join(HERE, p), encoding="utf-8") as f:
        return json.load(f)


claude = load("ref/claude_data.json")
out = load("out/data.json")
sheet = load("ref/fresh/d1101.json")["values"]

C = {r["id"]: r for r in claude["runs"]}
O = {r["id"]: r for r in out["runs"]}

SCALARS = ["date", "temp", "power", "pressure", "h2o_ui", "cf4_ui", "modi",
           "cycles", "kind"]
RESKEYS = ["v", "modi", "rtp", "sd"]

n_match = n_fill = n_miss = 0
round_diffs, mismatches, fills, misses = [], [], [], []


def cmp_val(rid, field, a, b):
    """a=Claude, b=변환. 분류 카운트와 목록 갱신."""
    global n_match, n_fill, n_miss
    if a is None and b is None:
        return
    if a is None and b is not None:
        n_fill += 1
        fills.append((rid, field, b))
        return
    if a is not None and b is None:
        n_miss += 1
        misses.append((rid, field, a))
        return
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        d = abs(a - b)
        if d == 0:
            n_match += 1
        elif d <= 0.02:
            round_diffs.append((rid, field, a, b))
        else:
            mismatches.append((rid, field, a, b))
    else:
        if a == b:
            n_match += 1
        else:
            mismatches.append((rid, field, a, b))


for rid in C:
    if rid not in O:
        mismatches.append((rid, "(런 자체)", "있음", "없음"))
        continue
    for f in SCALARS:
        cmp_val(rid, f, C[rid].get(f), O[rid].get(f))
    films = set(C[rid].get("res", {})) | set(O[rid].get("res", {}))
    for film in films:
        ca = C[rid].get("res", {}).get(film, {})
        cb = O[rid].get("res", {}).get(film, {})
        for k in RESKEYS:
            cmp_val(rid, f"res.{film}.{k}", ca.get(k), cb.get(k))

new_ids = [rid for rid in O if rid not in C]

# ---------------------------------------------------------- coupons 대조
def cell(row1, col0):
    row = sheet[row1 - 1]
    return row[col0] if col0 < len(row) else ""


coupon_lines = []
cp = {c["id"]: c for c in claude["coupons"]}
checks = [
    ("C-SiOCN-1104", "start", cp["C-SiOCN-1104"]["start"],
     float(cell(175, 3)), "11/01 탭 175행 Before"),
    ("C-SiOCN-1104", "history after", cp["C-SiOCN-1104"]["history"][0]["after"],
     float(cell(175, 5)), "11/01 탭 175행 최종 After"),
    ("C-SiOC-1104", "start", cp["C-SiOC-1104"]["start"],
     float(cell(176, 3)), "11/01 탭 176행 Before"),
    ("C-SiOC-1104", "history after", cp["C-SiOC-1104"]["history"][0]["after"],
     float(cell(176, 5)), "11/01 탭 176행 최종 After"),
    ("C-SiOC-1101r", "start", cp["C-SiOC-1101r"]["start"],
     float(cell(138, 3)), "비율 블록 24:8 구 SiOC Before"),
    ("C-SiOC-1101r", "history[0] after", cp["C-SiOC-1101r"]["history"][0]["after"],
     float(cell(138, 5)), "비율 블록 24:8 구 SiOC RTP 후"),
    ("C-SiOC-1101r", "history[1] after", cp["C-SiOC-1101r"]["history"][1]["after"],
     float(cell(141, 4)), "비율 블록 28:4 구 SiOC Modi 후"),
    ("C-SiOCN-1101a", "history before", cp["C-SiOCN-1101a"]["history"][0]["before"],
     float(cell(134, 3)), "비율 블록 16:16 SiOCN Before"),
    ("C-SiOCN-1101a", "history after", cp["C-SiOCN-1101a"]["history"][0]["after"],
     float(cell(134, 4)), "비율 블록 16:16 SiOCN Modi 후"),
]
for cid, field, a, b, src in checks:
    ok = abs(a - b) < 0.005
    coupon_lines.append(
        f"| {cid} | {field} | {a} | {b} | {'일치' if ok else '**불일치**'} | {src} |")

# ---------------------------------------------------------- 리포트 작성
L = []
L.append("# 검증 — 변환 결과 vs Claude 정본 data.json (2026-11-05)")
L.append("")
L.append(f"- Claude 정본: `claude/research-siocn` 브랜치 research/siocn/data.json "
         f"(SHA 39ac8f49), runs {len(C)}개")
L.append(f"- 변환 결과: runs {len(O)}개 (기존 매칭 {len(C)}개 + 신규 {len(new_ids)}개)")
L.append(f"- 필드 단위 대조 (조건 필드 + res 값): 일치 {n_match}건, "
         f"신규 채움 {n_fill}건, 변환 누락 {n_miss}건, "
         f"반올림 수준 차이 {len(round_diffs)}건, 불일치 {len(mismatches)}건")
L.append("")
L.append("## 불일치 (양쪽 다 있는데 값이 다름)")
L.append("")
if mismatches:
    L.append("| 런 | 필드 | Claude | 변환 |")
    L.append("|---|---|---|---|")
    for rid, f, a, b in mismatches:
        L.append(f"| {rid} | {f} | {a} | {b} |")
else:
    L.append("없음.")
L.append("")
L.append("## 반올림 수준 차이 (|Δ| ≤ 0.02 — 시트 원값의 소수 3자리 vs 2자리 반올림)")
L.append("")
if round_diffs:
    L.append("| 런 | 필드 | Claude | 변환 |")
    L.append("|---|---|---|---|")
    for rid, f, a, b in round_diffs:
        L.append(f"| {rid} | {f} | {a} | {b} |")
else:
    L.append("없음.")
L.append("")
L.append("## 변환으로 새로 채워지는 빈칸 (Claude null/생략 → 변환 값)")
L.append("")
if fills:
    L.append("| 런 | 필드 | 변환 값 |")
    L.append("|---|---|---|")
    for rid, f, b in fills:
        L.append(f"| {rid} | {f} | {b} |")
else:
    L.append("없음.")
L.append("")
L.append("## 변환 누락 (Claude에 있는데 변환이 못 만든 값)")
L.append("")
if misses:
    L.append("| 런 | 필드 | Claude 값 |")
    L.append("|---|---|---|")
    for rid, f, a in misses:
        L.append(f"| {rid} | {f} | {a} |")
else:
    L.append("없음.")
L.append("")
L.append("## 신규 런 (Claude 정본에 없던 레코드 — 전부 시트 실측에서 생성)")
L.append("")
for rid in new_ids:
    r = O[rid]
    res_s = "; ".join(
        f"{film} " + "/".join(f"{k} {v}" for k, v in e.items())
        for film, e in r["res"].items())
    L.append(f"- **{rid}** ({r['date']}, {r.get('mode')}, kind={r['kind']}, "
             f"modi={r['modi']}, cycles={r['cycles']}): {res_s}")
L.append("")
L.append("## coupons 대조 (생성 아님 — 시트 실값과의 대조만)")
L.append("")
L.append("| 쿠폰 | 필드 | Claude | 시트 | 판정 | 출처 |")
L.append("|---|---|---|---|---|---|")
L.extend(coupon_lines)
L.append("")
L.append("- C-SiOCN-1101a의 start 90.0은 포스트잇 출처라 시트에서 대조할 수 없다 "
         "(90초 블록의 Before 76.67은 시트 125행에 있음).")
L.append("")
L.append("## 변환이 구조적으로 못 채우는 것")
L.append("")
L.append("- `dir`·`note`·`flags`·`series`·`coupons` 링크: 해석·판정 영역이라 변환기가 "
         "만들지 않는다. 기존 런은 Claude 값을 승계했고, 신규 런은 비어 있다 "
         "(해석 작성은 교차검토 몫).")
L.append("- 비율 블록 날짜: 시트에서는 11/02 섹션 아래이나 포스트잇·선행 이식 기준 "
         "2026-11-01로 Claude 정본과 일치시켰다 (mapping.md 예외 규칙).")
L.append("- 「11/03」 탭은 조건 행만 있고 두께가 없어 런을 만들지 않았다. "
         "「시트1」·10/07·10/08·10/10은 Claude 정본 runs의 범위 밖이라 변환하지 않았다.")
L.append("- 렌더링 영향: R1011 3개 런에 modi=60이 채워지면 build_research.mjs의 "
         "조건 지도가 modi 60초 열을 새로 그리고, R1102-2m의 res가 차면 궤적 행에 "
         "구간 EPC가 표시된다. 채택 전 Claude 확인이 필요한 지점이다.")
L.append("")

with open(os.path.join(HERE, "out", "validation.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(L))
print(f"일치 {n_match} / 신규채움 {n_fill} / 누락 {n_miss} / "
      f"반올림차이 {len(round_diffs)} / 불일치 {len(mismatches)} / 신규런 {len(new_ids)}")
print("validation.md 작성 완료")
