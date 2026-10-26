# 반도체 공정 강의노트

패터닝부터 HBM까지, 반도체가 만들어지는 구조와 공정을 22개 장으로 정리한 학습용 사이트입니다.

**사이트:** https://cudissm-del.github.io/semiconductor-notes/

## 반도체 백과 (v2)

위 강의노트를 항목 단위 위키로 재편한 지식창고입니다.

**백과 주소:** https://cudissm-del.github.io/semiconductor-notes/v2/

- 영역 4개(공정 · 구조·재료 · 계측·분석 · 원리·운영) > 주제 20개 > 항목 95개, 3단 구조
- 항목 사이 위키 링크 544개, 역링크와 이전/다음 항목 이동
- 영역·주제를 가로지르는 태그 묶음, 항목 검색, 즐겨찾기(브라우저에 저장)
- 빌드: `content/entries/`의 항목 마크다운을 `build2.mjs`가 `v2/`로 변환 (`node build2.mjs`), 설계 문서는 `DESIGN.md`

## 기능

- 파트별 목차와 현재 위치 표시, 모바일 메뉴
- 용어·내용 검색 (`/` 키로 바로 검색)
- 본문의 "11장", "4-4장" 같은 참조를 누르면 해당 위치로 이동
- 밑줄 친 약어에 마우스를 올리거나 탭하면 풀이 표시, 부록 A 용어 사전
- 장마다 "읽음" 체크와 학습 진행률 (브라우저에 저장)
- 그림 클릭 시 확대, 다크 모드

## 구조

| 경로 | 내용 |
| --- | --- |
| `content/notes.md` | 원본 — Claude 문서 "반도체 공정 기초: 구조 · 공정 · 물질"을 마크다운으로 내보낸 것 |
| `src/diagrams.jsx`, `src/figs/` | 그림 25개 (빌드 시 정적 SVG로 변환). 이 밖에 Wikimedia Commons 자유 라이선스 이미지 16개를 본문에서 불러옴 |
| `src/glossary.js` | 용어 사전 |
| `src/template.html`, `src/site.css`, `src/site.js` | 페이지 틀, 스타일, 동작 |
| `build.mjs` | 빌드 스크립트 → `index.html` |
| `index.html`, `search-index.json`, `assets/` | GitHub Pages가 그대로 서비스하는 결과물 |
| `content/entries/` | 백과 항목 원본 (영역/주제/항목 마크다운) |
| `DESIGN.md` | 백과 설계 (분류 체계·등급·빌드 규칙) |
| `build2.mjs`, `src/wiki.css` | 백과 빌드 스크립트와 스타일 → `v2/` |
| `v2/` | 백과 결과물 (GitHub Pages가 `/v2/`로 서비스) |

## 업데이트 방법

**Claude와 함께 (기본)** — 원본 Claude 문서를 고치거나 새 장을 추가한 뒤, Claude에게 이 저장소 이름과 함께 "사이트 업데이트해줘"라고 하면 문서를 다시 내보내 빌드하고 커밋·푸시합니다. 새 그림이 생겼다면 `src/diagrams.jsx`에 함께 추가합니다.

**직접 할 때**

```bash
# content/notes.md 를 새로 내보낸 마크다운으로 교체한 뒤
npm install
npm run build
git add -A && git commit -m "노트 업데이트" && git push
```

푸시 후 1~2분 안에 GitHub Pages가 사이트를 갱신합니다.
