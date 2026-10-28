
## v6 nav decision
- Proof → **Highlights**: ‘Proof’는 방어적·증명 강박의 어감. 시니어 포트폴리오에서 통용되는 중립적 큐레이션 용어. 한글 ‘성과’.
- About → **Philosophy**: 사용자 지적대로 About은 ‘~에 대하여’로 흐릿함. 섹션 내용(원칙·구조)이 곧 철학.
- Career → **Experience**: Career는 이력서 어감, Experience는 포트폴리오 표준이며 창업·마케팅 경험까지 포괄.
- Projects → **Selected Work**: ‘엄선한 작업’이라는 큐레이션 의도를 드러냄(Highlights와 역할 구분).
- Profile 유지: 소개+연락을 함께 담는 마지막 섹션이라 Contact보다 넓음.

## v7 hero decision (2026-10-28)
- 사용자 선택: Hero Lab 11 「조립 + 노드 그래프」를 메인 히어로로 채택. A5 정물 이미지 히어로는 태그 `hero-v5`로 보존.
- 의미: 흩어진 노드(기록) → 프로젝트별 클러스터(데이터) → 엠블럼 링에 도킹(비즈니스). 커서 이동이 단계를 진행, 클릭 시 전부 흩어졌다 재조립.
- 규칙: 흰 바탕·네이비 선, 오렌지는 락/호버에만. 텔레메트리는 추상 코드(P-0n, R-xxxx, 좌표)만 — 가짜 지표 금지. 헤드라인 왼쪽은 흰 스크림으로 가독성 확보.
- 성능/접근성: 화면 밖·탭 숨김 시 rAF 정지, 모바일 노드 40%, prefers-reduced-motion은 도킹 완료 정적 프레임, JS 없음은 `<noscript>` 포스터(assets/hero-v7*.webp/png). 다크 테마는 캔버스 invert+hue-rotate.
- HUD 언어 확장(절제): 섹션 패럴랙스 장식을 눈금자·레티클·크로스헤어 라벨(01 · HIGHLIGHTS 등)로 교체, 투명도 .22, 모바일 숨김. 하이라이트 장식이 우측 모서리 밖으로 넘치던 문제 해결(섹션 overflow-x: clip, 뷰포트 안 배치).
- 공유: OG/Twitter 이미지 assets/og.png(1200×630, 실제 히어로 렌더), 국문+영문 설명, 파비콘은 내비 마크(달력+오렌지 추세선) SVG + apple-touch-icon.
