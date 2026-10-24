# 반도체 공정 강의노트

패터닝부터 HBM까지, 반도체가 만들어지는 구조와 공정을 22개 장으로 정리한 학습용 사이트입니다.

**사이트:** https://cudissm-del.github.io/semiconductor-notes/

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
| `src/diagrams.jsx` | 그림 8개 (빌드 시 정적 SVG로 변환) |
| `src/glossary.js` | 용어 사전 |
| `src/template.html`, `src/site.css`, `src/site.js` | 페이지 틀, 스타일, 동작 |
| `build.mjs` | 빌드 스크립트 → `index.html` |
| `index.html`, `assets/` | GitHub Pages가 그대로 서비스하는 결과물 |

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
