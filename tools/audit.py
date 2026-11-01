#!/usr/bin/env python3
"""백과 항목 판정 — DESIGN.md 「콘텐츠 기준」의 기계 검사 부분.

사용:
  python3 tools/audit.py                      # 전 항목 기본형 판정
  python3 tools/audit.py --deep process/etch  # 경로 접두사로 거르고 심화형 형식 요건까지

기본형: 본문 3,000자 이상(프론트매터·코드/수식 블록·링크 URL·표 구분자·마크업 제외, 공백 1칸)
        + 고유 DOI 1개 이상 + `##`/`###` 근거 절.
심화형(형식 요건, 기계 검사): ① 통합 표(한 표에 저자-연도 인용 3개 이상) ② 그림 1개 이상과
        「재구성」 표기 ⑥ 원문 위치(Fig./Table 번호). ③④⑤(메커니즘·논문 간 비교·실패 모드)는 교차 검토에서 본다.
"""
import glob, os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'content', 'entries')
args = sys.argv[1:]
deep = '--deep' in args
prefixes = [a for a in args if not a.startswith('--')] or ['']

AUTHOR_YEAR = re.compile(r'(?:et al\.|[A-Z][^\W\d_]+(?:\s(?:&|·)\s[A-Z][^\W\d_]+)?)\s*\(?(?:19|20)\d\d\)?')


def basic(body):
    p = re.sub(r'```.*?```', '', body, flags=re.S)
    p = re.sub(r'\[\[([^\]|]+)(\|[^\]]*)?\]\]', r'\1', p)
    p = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', p)
    p = re.sub(r'https?://\S+', '', p)
    p = re.sub(r'^\s*\|?\s*:?-{3,}.*$', '', p, flags=re.M)
    p = re.sub(r'[#>*_`|]', '', p)
    n = len(re.sub(r'\s+', ' ', p).strip())
    doi = len(set(re.findall(r'10\.\d{4,9}/[^\s)\]>,;]+', body)))
    has = bool(re.search(r'^#{2,3}\s*근거', body, re.M))
    return n, doi, has, (n >= 3000 and doi >= 1 and has)


def deep_check(body):
    figs = len(re.findall(r'&#91;embedded content:|!\[[^\]]*\]\(img/|\*\*\[이미지\]\*\*', body))
    recon = '재구성' in body
    tables = re.findall(r'(?:^\|.*\|\s*\n)+', body, re.M)
    lit = sum(1 for t in tables if len(AUTHOR_YEAR.findall(t)) >= 3)
    figref = len(re.findall(r'(?:Fig\.|Figure|Table)\s*\d', body))
    return figs, recon, lit, figref, (lit >= 1 and figs >= 1 and recon and figref >= 1)


rows, ok_b, ok_d = [], 0, 0
for f in sorted(glob.glob(f'{ROOT}/**/*.md', recursive=True)):
    rel = os.path.relpath(f, ROOT)
    if not any(rel.startswith(p) for p in prefixes):
        continue
    s = open(f, encoding='utf-8').read()
    body = re.sub(r'^---.*?---', '', s, count=1, flags=re.S)
    n, doi, has, ok = basic(body)
    ok_b += ok
    row = [rel, n, doi, 'O' if has else 'X', '기본형' if ok else '미달']
    if deep:
        figs, recon, lit, figref, dok = deep_check(body)
        ok_d += dok
        row += [f'그림{figs}', '재구성' if recon else '-', f'통합표{lit}', f'위치{figref}', '심화형(형식)' if dok else '-']
    rows.append(row)

print('\t'.join(['항목', '글자', 'DOI', '근거절', '판정'] + (['그림', '재구성', '통합표', '원문위치', '심화'] if deep else [])))
for r in rows:
    print('\t'.join(map(str, r)))
print(f'# 기본형 {ok_b}/{len(rows)}' + (f' · 심화형 형식 요건 {ok_d}/{len(rows)}' if deep else ''))
