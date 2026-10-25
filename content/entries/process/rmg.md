---
title: RMG (Gate-last)
en: Replacement Metal Gate
cat: process
sub: 집적 흐름
tags: Gate-last, 더미 게이트
---

> 더미 게이트로 소자를 만든 뒤 그것을 들어내고 진짜 금속 게이트를 채우는 gate-last 흐름.

### Gate-first vs Gate-last (RMG)

| 구분 | Gate-first | Gate-last (RMG) |
| --- | --- | --- |
| 순서 | HKMG를 먼저 만들고 S/D 활성화 어닐 | 더미 poly로 S/D 공정 후 게이트 교체 |
| 장점 | 공정 단순 | 일함수 금속이 고온을 겪지 않아 Vt 안정 |
| 단점 | 고온에서 일함수·Vt가 이동 | 공정 단계 증가, 좁은 트렌치 매립 |
| 현재 | 일부 구세대에서 사용 | FinFET·GAA 표준 |

**RMG 흐름**

1. 더미 poly 게이트 + 스페이서 → S/D 형성·활성화 어닐 (고온 공정 모두 완료)
2. ILD0 증착 → CMP로 더미 게이트 윗면 노출
3. 더미 poly 제거 (습식·건식) → GAA라면 이어서 채널 릴리스
4. IL 형성 → HfO₂ ALD → 캡·일함수 금속 ALD → 충진 금속
5. CMP로 게이트 높이 정리 → 금속 리세스 + SiN 캡 ([[SAC]]로 연결)

**참고 논문**

- [High-K materials and metal gates for CMOS applications](https://doi.org/10.1016/j.mser.2014.11.001) — Robertson & Wallace, Mater. Sci. Eng. R 88, 1 (2015). High-k 밴드 정렬과 일함수의 표준 리뷰

## 관련 항목

- [[게이트 스택 (HKMG)]] — RMG가 만드는 구조
- [[FEOL]] — RMG가 들어가는 흐름
