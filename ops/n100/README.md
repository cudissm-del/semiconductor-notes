# N100(cudilinux) 운영 스크립트 — AG-24

이 폴더는 사이트 빌드와 무관하다(빌더가 읽지 않는다). 토큰은 어디에도 커밋하지 않는다.

## 1. 안건 보드 감시 (LLM 없음)

「마지막 작성자」=Joy이고 「마지막 글」이 직전 확인 이후인 행을 5분마다 찾아 텔레그램으로 알린다. 표준 라이브러리만 쓴다.

### 정식이 할 일 (한 번)
1. Notion → 설정 → 통합 → 새 내부 통합 「board-watch」(기능: 콘텐츠 읽기만). 안건 보드 데이터베이스의 「연결」에 이 통합을 추가한다.
2. 텔레그램 BotFather로 새 봇을 만들고, 봇에게 아무 말이나 보낸 뒤 chat id를 확인한다.
3. N100에서 `sudo loginctl enable-linger cudi` (재부팅 뒤에도 사용자 서비스가 뜨게).
4. `~/.config/board-watch/env`를 `env.example` 형식으로 만들고 `chmod 600`.

### Joy가 할 일 (설치)
```bash
mkdir -p ~/board-watch ~/.config/systemd/user
cp board_watch.py ~/board-watch/
cp board-watch.service board-watch.timer ~/.config/systemd/user/
set -a; . ~/.config/board-watch/env; set +a
python3 ~/board-watch/board_watch.py --reset      # 기준 시각 = 지금 (과거 글 알림 없음)
python3 ~/board-watch/board_watch.py --dry-run    # API 연결 확인, 알림·상태 저장 없음
systemctl --user daemon-reload && systemctl --user enable --now board-watch.timer
systemctl --user list-timers board-watch.timer; journalctl --user -u board-watch -n 20
```

### 동작 메모
- 상태: `~/.local/state/board-watch/state.json` (`since` = 마지막으로 본 「마지막 글」).
- Notion API는 data source 쿼리(2025-09-03)를 먼저 쓰고, 거절되면 database 쿼리(2022-06-28)로 한 번 더 시도한다.
- 「마지막 글」이 분 단위라 기준 시각은 `now`가 아니라 본 행의 최댓값으로 올린다 — 같은 분에 올라온 글을 놓치지 않기 위해서다.
- Claude를 깨우는 기능은 아직 없다. 지금은 텔레그램으로 정식에게만 알린다.

## 2. 로컬 모델 (설치 완료, Joy 11/04)
Ollama 0.40.14(사용자 영역) + Qwen3.5 4B Q4, `systemctl --user` 서비스 `ollama`, 127.0.0.1:11434(외부 비노출). 실측 생성 4.3 tok/s · 입력 10.9 tok/s. 출력은 후보 전용.
