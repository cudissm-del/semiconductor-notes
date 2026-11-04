#!/usr/bin/env python3
"""Google Sheets 「SiOCN CCP」 → Claude 연구 대시보드 data.json (runs) 변환기.

규칙 정본: mapping.md
- 입력: ref/fresh/d1011.json, ref/fresh/d1101.json (Sheets values API 응답 사본)
       ref/claude_data.json (Claude 정본 — 비 runs 섹션과 수기 필드 승계용)
- 출력: out/data.json (Claude 정본에서 runs만 변환 결과로 교체)
- 표준 라이브러리만 사용. 없는 값은 null, Δ는 Before- After 재계산, 유량은 UI 그대로.
"""
import copy
import json
import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
FRESH = os.path.join(HERE, "ref", "fresh")
CLAUDE_PATH = os.path.join(HERE, "ref", "claude_data.json")
OUT_PATH = os.path.join(HERE, "out", "data.json")

FILMS = ["SiOCN", "구 SiOC", "New SiOC", "SiO₂"]


def fail(msg):
    raise SystemExit(f"[변환 중단] {msg}")


def load_values(name):
    with open(os.path.join(FRESH, name), encoding="utf-8") as f:
        d = json.load(f)
    return d["values"]


def cell(vals, row1, col0):
    """row1: 1-indexed 시트 행, col0: 0-indexed 열. 없으면 ''."""
    if row1 - 1 >= len(vals):
        return ""
    row = vals[row1 - 1]
    if col0 >= len(row):
        return ""
    v = row[col0]
    return v.strip() if isinstance(v, str) else v


def num(x):
    if x is None or x == "":
        return None
    try:
        return float(str(x).replace(",", ""))
    except ValueError:
        return None


def r2(x):
    if x is None:
        return None
    return round(x + 0.0, 2)


def delta(before, after):
    if before is None or after is None:
        return None
    return before - after


def norm_film(s):
    s = (s or "").strip()
    m = {"SiOCN": "SiOCN", "SiOC": "구 SiOC", "SiO2": "SiO₂",
         "new SiOC": "New SiOC", "New SiOC": "New SiOC"}
    if s not in m:
        fail(f"알 수 없는 재료명: {s!r}")
    return m[s]


def expect_film(vals, row1, col0, expected, ctx):
    got = cell(vals, row1, col0)
    if norm_film(got) != expected:
        fail(f"{ctx}: {row1}행 재료 라벨 불일치 — 기대 {expected}, 실제 {got!r}")


def res_entry(**kw):
    """None인 키는 넣지 않는다 (Claude 스키마 관례)."""
    return {k: r2(v) for k, v in kw.items() if v is not None}


# ---------------------------------------------------------------- 10/11 탭
def parse_1011(vals):
    # 열 (0-indexed, A열은 빈 열): 1 날짜 2 장비 3 Temp 4 Pressure 6 CF4 UI
    #     9 H2O UI 11 Power 12 Time 19 Type 20 Before 21 After 22 Cycle
    runs = {}

    def cond(row1):
        return dict(
            temp=int(num(cell(vals, row1, 3))),
            pressure=int(num(cell(vals, row1, 4))),
            cf4_ui=int(num(cell(vals, row1, 6))),
            h2o_ui=int(num(cell(vals, row1, 9))),
            power=int(num(cell(vals, row1, 11))),
            modi=int(num(cell(vals, row1, 12))),
        )

    # --- Modi만 10사이클 + RTP (행 3–14): 신규 R1011-modi10
    modi_d, rtp_d = {}, {}
    for r in range(3, 7):  # CCP = Modi ×10
        film = norm_film(cell(vals, r, 19))
        modi_d[film] = delta(num(cell(vals, r, 20)), num(cell(vals, r, 21)))
    for r in range(7, 11):  # RTP
        film = norm_film(cell(vals, r, 19))
        rtp_d[film] = delta(num(cell(vals, r, 20)), num(cell(vals, r, 21)))
    res = {}
    for film in FILMS:
        if film in modi_d:
            v = None
            if modi_d.get(film) is not None and rtp_d.get(film) is not None:
                v = modi_d[film] + rtp_d[film]
            res[film] = res_entry(v=v, modi=modi_d.get(film), rtp=rtp_d.get(film))
    c = cond(3)
    runs["R1011-modi10"] = dict(
        date="2026-10-11", temp=c["temp"], power=10, pressure=c["pressure"],
        h2o_ui=c["h2o_ui"], cf4_ui=c["cf4_ui"], mode="Modi ×10 + RTP (스텝 분해)",
        modi=c["modi"], cycles=10, kind="delta", res=res, _new=True)

    # --- 풀사이클 그룹 (행 15–26): (power, cycle) → id
    idmap = {(50, 2): "R1011-50w2", (10, 5): "R1011-10w5", (50, 5): "R1011-50w5"}
    groups = {}
    for r in range(15, 27):
        if cell(vals, r, 2) != "F.C":
            fail(f"10/11 {r}행: 장비 셀이 F.C가 아님 ({cell(vals, r, 2)!r})")
        key = (int(num(cell(vals, r, 11))), int(num(cell(vals, r, 22))))
        groups.setdefault(key, []).append(r)
    for key, rows in groups.items():
        if key not in idmap:
            fail(f"10/11: 예상 못 한 풀사이클 그룹 {key}")
        res = {}
        for r in rows:
            film = norm_film(cell(vals, r, 19))
            d = delta(num(cell(vals, r, 20)), num(cell(vals, r, 21)))
            res[film] = res_entry(v=d / key[1] if d is not None else None)
        c = cond(rows[0])
        runs[idmap[key]] = dict(
            date="2026-10-11", temp=c["temp"], power=c["power"],
            pressure=c["pressure"], h2o_ui=c["h2o_ui"], cf4_ui=c["cf4_ui"],
            mode=None, modi=c["modi"], cycles=key[1], kind="epc", res=res)
    return runs


# ---------------------------------------------------------------- 11/01 탭
def parse_1101(vals):
    # 열: 0 블록 라벨 1 재료 2 샘플 3 Before 4 Modi후/After 5 RTP후
    runs = {}
    B, D, E, F = 1, 3, 4, 5

    def film_block(rows, ctx):
        """rows: 행 번호 리스트 (첫 행에 재료 라벨). {film: [행...]} 반환."""
        out = {}
        for r in rows:
            lab = cell(vals, r, B)
            if lab:
                cur = norm_film(lab)
                out[cur] = []
            out[cur].append(r)
        return out

    # --- §2 반복 3회 (행 6–20)
    rep_rows = [6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20]
    groups = film_block(rep_rows, "rep")
    res = {}
    for film, rows in groups.items():
        ds = [delta(num(cell(vals, r, D)), num(cell(vals, r, E))) for r in rows]
        ds = [x for x in ds if x is not None]
        if not ds:
            continue
        mean = sum(ds) / len(ds)
        sd = None
        if len(ds) > 1:
            sd = math.sqrt(sum((x - mean) ** 2 for x in ds) / (len(ds) - 1))
        res[film] = res_entry(v=mean, sd=sd)
    runs["R1101-rep"] = dict(
        date="2026-11-01", temp=None, power=None, pressure=None, h2o_ui=None,
        cf4_ui=None, mode=None, modi=None, cycles=1, kind="delta", res=res)

    # --- §3 온도 3수준 (블록 시작행 24/29/34, 각 4행)
    for start, temp, rid in [(24, 20, "R1101-p20"), (29, 0, "R1101-0"),
                             (34, -20, "R1101-m20")]:
        res = {}
        for i, film in enumerate(["SiOCN", "구 SiOC", "New SiOC", "SiO₂"]):
            r = start + i
            expect_film(vals, r, B, film, f"온도 블록 {rid}")
            b, m, t = (num(cell(vals, r, D)), num(cell(vals, r, E)),
                       num(cell(vals, r, F)))
            res[film] = res_entry(v=delta(b, t), modi=delta(b, m),
                                  rtp=delta(m, t))
        runs[rid] = dict(
            date="2026-11-01", temp=temp, power=None, pressure=None, h2o_ui=6,
            cf4_ui=None, mode=None, modi=300, cycles=1, kind="delta",
            res=res, _series="temp1101")

    # --- 11/02 스텝 분해 세트 1·2 (Modi 행 63–66/68–71, RTP 행 74–77/79–82)
    for (mrows, rrows, rid) in [((63, 66), (74, 77), "R1102-s1"),
                                ((68, 71), (79, 82), "R1102-s2")]:
        res = {}
        for i, film in enumerate(["SiOCN", "구 SiOC", "New SiOC", "SiO₂"]):
            rm, rt = mrows[0] + i, rrows[0] + i
            expect_film(vals, rm, B, film, f"스텝 분해 {rid}")
            b, m = num(cell(vals, rm, D)), num(cell(vals, rm, E))
            t = num(cell(vals, rt, E))
            res[film] = res_entry(v=delta(b, t), modi=delta(b, m),
                                  rtp=delta(m, t))
        runs[rid] = dict(
            date="2026-11-02", temp=-20, power=None, pressure=None, h2o_ui=4,
            cf4_ui=None, mode="스텝 분해 1패스", modi=None, cycles=1,
            kind="delta", res=res, _new=True)

    # --- 11/02 5분 3사이클 EPC (행 87–90)
    def epc_block(start, modi_s, cycles, rid, date, extra=None):
        res = {}
        for i, film in enumerate(["SiOCN", "구 SiOC", "New SiOC", "SiO₂"]):
            r = start + i
            lab = cell(vals, r, B)
            b_raw, a_raw = cell(vals, r, D), cell(vals, r, E)
            if b_raw == "" and a_raw == "":
                if lab in ("SiOCN", "SiOC", "New SiOC", "SiO2"):
                    expect_film(vals, r, B, film, f"EPC 블록 {rid}")
                continue  # 기록 없는 막 (예: 90초 블록의 New·SiO₂)
            expect_film(vals, r, B, film, f"EPC 블록 {rid}")
            d = delta(num(b_raw), num(a_raw))
            res[film] = res_entry(v=d / cycles if d is not None else None)
        rec = dict(date=date, temp=-20, power=None, pressure=None, h2o_ui=4,
                   cf4_ui=None, mode=None, modi=modi_s, cycles=cycles,
                   kind="epc", res=res)
        if extra:
            rec.update(extra)
        runs[rid] = rec

    epc_block(87, 300, 3, "R1102-5m", "2026-11-02")
    epc_block(95, 240, 3, "R1102-4m", "2026-11-02")
    epc_block(100, 360, 3, "R1102-6m", "2026-11-02")
    epc_block(115, 60, 3, "R1102-1m", "2026-11-02", {"_new": True})
    epc_block(120, 150, 3, "R1102-150s", "2026-11-02", {"_new": True})
    epc_block(125, 90, 3, "R1102-90s", "2026-11-02", {"_new": True})

    # --- 11/02 궤적: 1사이클 (행 105–108, delta) + 3사이클 구간 (행 110–113, epc)
    res1 = {}
    for i, film in enumerate(["SiOCN", "구 SiOC", "New SiOC", "SiO₂"]):
        r = 105 + i
        expect_film(vals, r, B, film, "궤적 1사이클")
        res1[film] = res_entry(
            v=delta(num(cell(vals, r, D)), num(cell(vals, r, E))))
    runs["R1102-2m1c"] = dict(
        date="2026-11-02", temp=-20, power=None, pressure=None, h2o_ui=4,
        cf4_ui=None, mode="풀사이클 궤적 (1사이클 지점)", modi=120, cycles=1,
        kind="delta", res=res1, _new=True)
    res2 = {}
    for i, film in enumerate(["SiOCN", "구 SiOC", "New SiOC", "SiO₂"]):
        r = 110 + i
        expect_film(vals, r, B, film, "궤적 구간")
        d = delta(num(cell(vals, r, D)), num(cell(vals, r, E)))
        res2[film] = res_entry(v=d / 3 if d is not None else None)
    runs["R1102-2m"] = dict(
        date="2026-11-02", temp=-20, power=None, pressure=None, h2o_ui=4,
        cf4_ui=None, mode=None, modi=120, cycles=None, kind="epc", res=res2)

    # --- 비율 블록 (행 130–141). 날짜는 Claude 정본 (2026-11-01) 유지 — mapping.md 예외 규칙
    ratio = [("R1101-r1220", 130, [0, 1, 2], 4, 25),
             ("R1101-r1616", 134, [0, 1], 5, 20),
             ("R1101-r2408", 137, [0, 1], 6, 10),
             ("R1101-r2804", 140, [0, 1], 7, 5)]
    films_ratio = ["SiOCN", "구 SiOC", "SiO₂"]
    for rid, start, offs, h2o, cf4 in ratio:
        res = {}
        for off in offs:
            r = start + off
            film = films_ratio[off]
            expect_film(vals, r, B, film, f"비율 블록 {rid}")
            b, m, t = (num(cell(vals, r, D)), num(cell(vals, r, E)),
                       num(cell(vals, r, F)))
            res[film] = res_entry(v=delta(b, t), modi=delta(b, m),
                                  rtp=delta(m, t))
        runs[rid] = dict(
            date="2026-11-01", temp=None, power=None, pressure=None,
            h2o_ui=h2o, cf4_ui=cf4, mode=None, modi=300, cycles=3,
            kind="delta", res=res)

    # --- 11/04 Modi 단독 (블록 시작행 150/154/158/162, 10W는 169; 각 3행)
    cond04 = dict(temp=-20, power=50, pressure=50, h2o_ui=5, cf4_ui=20)
    for start, modi_s, rid, pw in [(150, 240, "R1104-240", 50),
                                   (154, 120, "R1104-120", 50),
                                   (158, 30, "R1104-30", 50),
                                   (162, 480, "R1104-480", 50),
                                   (169, 240, "R1104-240-10w", 10)]:
        res = {}
        for i, film in enumerate(["SiOCN", "구 SiOC", "SiO₂"]):
            r = start + i
            expect_film(vals, r, B, film, f"Modi 단독 {rid}")
            b, m, t = (num(cell(vals, r, D)), num(cell(vals, r, E)),
                       num(cell(vals, r, F)))
            res[film] = res_entry(v=delta(b, m), rtp=delta(m, t))
        c = dict(cond04)
        c["power"] = pw
        runs[rid] = dict(
            date="2026-11-04", mode=None, modi=modi_s, cycles=1, kind="delta",
            res=res, **c, _series=("modi1104" if pw == 50 else None))

    # --- 11/04 풀사이클 ×4 (행 175–177, D=Before, F=After)
    res = {}
    for i, film in enumerate(["SiOCN", "구 SiOC", "SiO₂"]):
        r = 175 + i
        expect_film(vals, r, B, film, "풀사이클 x4")
        res[film] = res_entry(
            v=delta(num(cell(vals, r, D)), num(cell(vals, r, F))))
    runs["R1104-x4"] = dict(
        date="2026-11-04", mode=None, modi=120, cycles=4, kind="delta",
        res=res, **cond04)
    return runs


# ---------------------------------------------------------------- 조립
CURATED = ("dir", "note", "flags", "series", "coupons", "mode")


def main():
    with open(CLAUDE_PATH, encoding="utf-8") as f:
        claude = json.load(f)
    claude_runs = {r["id"]: r for r in claude["runs"]}

    conv = {}
    conv.update(parse_1011(load_values("d1011.json")))
    conv.update(parse_1101(load_values("d1101.json")))

    out_runs = []
    for rid, c in conv.items():
        rec = {"id": rid, "date": c["date"], "status": "완료",
               "temp": c["temp"], "power": c["power"],
               "pressure": c["pressure"], "h2o_ui": c["h2o_ui"],
               "cf4_ui": c["cf4_ui"], "mode": c["mode"], "modi": c["modi"],
               "cycles": c["cycles"], "kind": c["kind"], "res": c["res"]}
        old = claude_runs.get(rid)
        if old is not None:
            for k in CURATED:
                if k in old:
                    rec[k] = old[k]
            if rec["mode"] is None:
                rec["mode"] = old.get("mode")
            if "_series" in c and "series" not in rec:
                pass  # series는 수기 영역 — 변환기가 부여하지 않음
        else:
            if rec["mode"] is None:
                rec["mode"] = "풀사이클" if rec["kind"] == "epc" else ""
            rec["dir"] = ""
            rec["note"] = "시트 변환 신규 — 해석 미작성 (2026-11-05 변환기)"
        # 필드 순서: Claude 스키마 순서로 정렬
        order = ["id", "date", "status", "temp", "power", "pressure",
                 "h2o_ui", "cf4_ui", "mode", "modi", "cycles", "kind",
                 "flags", "series", "res", "dir", "note", "coupons"]
        rec = {k: rec[k] for k in order if k in rec}
        out_runs.append(rec)

    # Claude 순서 유지 + 신규는 뒤에 날짜순
    rank = {r["id"]: i for i, r in enumerate(claude["runs"])}
    out_runs.sort(key=lambda r: (rank.get(r["id"], 999), r["date"], r["id"]))

    out = copy.deepcopy(claude)
    out["runs"] = out_runs
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    new_ids = [r["id"] for r in out_runs if r["id"] not in claude_runs]
    print(f"변환 런 {len(out_runs)}개 (기존 {len(claude_runs)}개 중 매칭 "
          f"{len(out_runs) - len(new_ids)}개, 신규 {len(new_ids)}개: "
          f"{', '.join(new_ids)})")
    print(f"출력: {OUT_PATH}")


if __name__ == "__main__":
    main()
