#!/usr/bin/env python3
"""안건 보드 감시 — N100(cudilinux)에서 systemd --user 타이머로 돈다. LLM 없음.

Notion 「안건 보드」에서 「마지막 작성자」가 WATCH_AUTHORS(기본 Joy)이고
「마지막 글」이 직전 확인 이후인 행을 찾아 텔레그램으로 알린다.
표준 라이브러리만 쓴다(pip 설치 없음).

설정은 환경 파일(~/.config/board-watch/env)에서 읽는다. 토큰을 이 파일·저장소·채팅에 적지 않는다.
  NOTION_TOKEN        감시 전용 Notion 통합 토큰(읽기 전용, 안건 보드만 공유)
  TELEGRAM_BOT_TOKEN  감시 알림용 텔레그램 봇 토큰
  TELEGRAM_CHAT_ID    알림 받을 채팅 id
  WATCH_AUTHORS       쉼표 구분, 기본 "Joy"
  DATA_SOURCE_ID      기본 395f31d9-3cff-4fdd-abca-5a3678875fe4
  DATABASE_ID         기본 9130d5da454c4131bad2a154770c011d (구 API 폴백용)

사용:
  board_watch.py            한 번 확인하고 끝낸다(타이머가 부른다)
  board_watch.py --dry-run  알림을 보내지 않고 출력만 한다(상태는 저장하지 않음)
  board_watch.py --reset    상태를 지금 시각으로 초기화한다(과거 글 알림 없이 시작)
"""
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

NOTION_VERSION_NEW = "2025-09-03"   # data source API
NOTION_VERSION_OLD = "2022-06-28"   # database query API (폴백)
STATE = Path(os.environ.get("XDG_STATE_HOME", Path.home() / ".local/state")) / "board-watch" / "state.json"
KST = timezone(timedelta(hours=9))
PROP_AUTHOR, PROP_LAST, PROP_TITLE, PROP_NO, PROP_STATUS = "마지막 작성자", "마지막 글", "안건", "번호", "상태"


def env(name, default=None, required=False):
    v = os.environ.get(name, default)
    if required and not v:
        sys.exit(f"board-watch: 환경 변수 {name}가 없다 (~/.config/board-watch/env 확인)")
    return v


def http(method, url, headers, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={"Content-Type": "application/json", **headers})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def query_board(token):
    """「마지막 글」 내림차순 상위 10행. 새 API가 거절하면 구 API로 한 번 더 시도한다."""
    body = {"sorts": [{"property": PROP_LAST, "direction": "descending"}], "page_size": 10}
    auth = {"Authorization": f"Bearer {token}"}
    try:
        ds = env("DATA_SOURCE_ID", "395f31d9-3cff-4fdd-abca-5a3678875fe4")
        return http("POST", f"https://api.notion.com/v1/data_sources/{ds}/query",
                    {**auth, "Notion-Version": NOTION_VERSION_NEW}, body)["results"]
    except urllib.error.HTTPError as e:
        if e.code not in (400, 404):
            raise
        db = env("DATABASE_ID", "9130d5da454c4131bad2a154770c011d")
        return http("POST", f"https://api.notion.com/v1/databases/{db}/query",
                    {**auth, "Notion-Version": NOTION_VERSION_OLD}, body)["results"]


def parse_row(page):
    p = page.get("properties", {})
    def text(prop):
        v = p.get(prop) or {}
        t = v.get("type")
        if t in ("title", "rich_text"):
            return "".join(x.get("plain_text", "") for x in v.get(t, []))
        if t in ("select", "status"):
            return (v.get(t) or {}).get("name", "")
        if t == "unique_id":
            u = v.get("unique_id") or {}
            return f"{u.get('prefix') or ''}{'-' if u.get('prefix') else ''}{u.get('number', '')}"
        if t == "number":
            return str(v.get("number") or "")
        return ""
    last = ((p.get(PROP_LAST) or {}).get("date") or {}).get("start")
    return {
        "no": text(PROP_NO), "title": text(PROP_TITLE), "author": text(PROP_AUTHOR),
        "status": text(PROP_STATUS), "last": last, "url": page.get("url", ""),
    }


def to_dt(s):
    if not s:
        return None
    d = datetime.fromisoformat(s.replace("Z", "+00:00"))
    return d if d.tzinfo else d.replace(tzinfo=timezone.utc)


def load_state():
    try:
        return json.loads(STATE.read_text())
    except (FileNotFoundError, ValueError):
        return {}


def save_state(st):
    STATE.parent.mkdir(parents=True, exist_ok=True)
    tmp = STATE.with_suffix(".tmp")
    tmp.write_text(json.dumps(st, ensure_ascii=False, indent=1))
    tmp.replace(STATE)


def new_posts(rows, since, authors):
    out = []
    for r in rows:
        d = to_dt(r["last"])
        if d and d > since and r["author"] in authors:
            out.append(r)
    return sorted(out, key=lambda r: to_dt(r["last"]))


def kst(s):
    return to_dt(s).astimezone(KST).strftime("%m/%d %H:%M")


def message(posts):
    lines = [f"📋 안건 보드 새 글 {len(posts)}건"]
    for r in posts:
        lines.append(f"• {r['no']} {r['title']}\n  {r['author']} · {kst(r['last'])} KST · {r['status']}\n  {r['url']}")
    return "\n".join(lines)


def telegram(text):
    tok, chat = env("TELEGRAM_BOT_TOKEN", required=True), env("TELEGRAM_CHAT_ID", required=True)
    http("POST", f"https://api.telegram.org/bot{tok}/sendMessage", {},
         {"chat_id": chat, "text": text, "disable_web_page_preview": True})


def main(argv):
    dry, reset = "--dry-run" in argv, "--reset" in argv
    now = datetime.now(timezone.utc)
    st = load_state()
    if reset or "since" not in st:
        st["since"] = now.isoformat()
        if not dry:
            save_state(st)
        print(f"board-watch: 기준 시각을 {st['since']}로 맞췄다(과거 글은 알리지 않음)")
        if reset:
            return 0
    since = to_dt(st["since"])
    authors = {a.strip() for a in env("WATCH_AUTHORS", "Joy").split(",") if a.strip()}
    rows = [parse_row(p) for p in query_board(env("NOTION_TOKEN", required=True))]
    posts = new_posts(rows, since, authors)
    if posts:
        text = message(posts)
        print(text)
        if not dry:
            telegram(text)
    # 기준 시각은 이번에 본 가장 늦은 「마지막 글」로 올린다(분 단위 표기라 now로 올리면 같은 분의 글을 놓칠 수 있다)
    latest = max([to_dt(r["last"]) for r in rows if r["last"]] + [since])
    st.update(since=latest.isoformat(), checked=now.isoformat(), last_count=len(posts))
    if not dry:
        save_state(st)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main(sys.argv[1:]))
    except urllib.error.HTTPError as e:
        sys.exit(f"board-watch: HTTP {e.code} {e.read().decode(errors='replace')[:300]}")
    except urllib.error.URLError as e:
        sys.exit(f"board-watch: 네트워크 오류 {e.reason}")
