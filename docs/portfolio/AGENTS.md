# 에이전트 핸드오프 가이드 — 포트폴리오 리뉴얼

## 읽는 순서
1. `INTERVIEW.md` — 원천 데이터(본인 발언)
2. `ANALYSIS.md` — 인물 분석, 관계도, 히어로 카피 후보, 서사 아웃라인
3. `RESUME.md` — 경력 전체(★ = 부각)
4. `DESIGN_DIRECTION.md` — 레퍼런스와 페이지 구조
5. 루트 `README.md`, `ADDING_PROJECT.md`, `data/projects.js`

## 원칙
- ⚠️ **사이트의 중점은 이력서가 아니라 사람과 프로젝트 소개.** 경력 섹션은 보조적·컴팩트하게(모든 이력 표시는 OK).
- 목표는 "작업물 나열"이 아니라 **사람과 철학을 보여주는 포트폴리오**. 대상: 업계 실무자·디자이너·HR.
- 본인 표현을 우선. 사실을 만들어내지 말 것(추정은 표시하고 확인 요청).

## Do
- 정적 GitHub Pages 유지(빌드 없음, `.github/workflows/deploy.yml`이 레포 루트 전체를 배포).
- `data/projects.js` 데이터 주도 구조와 `ADDING_PROJECT.md` 흐름 유지(필드 추가 시 하위 호환 + 문서 갱신).
- 라이트/다크, 모바일 320px, `keep-all`, 접근성, `prefers-reduced-motion`.

## Don't
- 주소·전화번호·생년월일 **커밋 금지**. 이메일은 mailto 버튼(JS 조합)으로만, 평문 텍스트 금지. 경력기술서 원본 PDF/이미지 커밋 금지.
- 라임리를 성공작처럼 포장 금지 — "시작 → 방치 → 렛츠 캘린더의 출발점"으로.
- 히어로에 인물/초상 이미지 금지.
- `docs/`는 Pages로 함께 공개됨을 기억할 것.

## 결정된 사항 (2026-10-28)
- [x] 히어로 카피: "흩어진 기록을 / 데이터로 연결하여, / 인사이트를 비지니스로" (원문 그대로)
- [x] 히어로 이미지: 인물 배제, 카피에 맞는 직접 생성 이미지 권장
- [x] 렛츠 캠핑·픽·헤어 제작 계기 → INTERVIEW.md §7, ANALYSIS.md 표
- [x] 라임리 서술 흐름 확정
- [x] 크레소티 포함 전체 이력 표시 OK (단, 컴팩트)

- [x] 이메일: 이메일 주소는 연락 버튼 JS에 분할 저장 (아이디: pyw213 / 도메인: naver.com 형태로만 기록) — **텍스트 노출 금지, '이메일 / Email' mailto 버튼만**, JS 조합으로 HTML 원문 노출 방지
- [x] 라임리: 서비스 종료, 라이브 링크 없음, 스크린샷 확보 시 사용 OK (비공개 레포 `limery` 링크 금지)
- [x] 이중 언어: 한국어 주 + 영어 보조(서브타이틀). 히어로 영문: "Connecting scattered records into data, and turning insight into business."
- [x] 도메인: 없음, github.io 유지(추후 CNAME 가능)

## 아직 미결정
- (없음)

## 다음 단계
- [ ] 히어로 이미지 생성(인물 없음, 흩어진 기록 → 연결 → 인사이트) 후 `assets/`에 최적화(WebP/AVIF) 저장
- [ ] `data/projects.js`에 `intent / why / benefit` 필드 추가(옵션, 기존 렌더 유지)
- [ ] 라임리 항목 추가(status 'archived', url/githubUrl null)
- [ ] 라임리 스크린샷: 추후 비공개 `pyw31337/limery`의 index.html을 로컬 서빙 + 샘플 데이터로 캡처
- [ ] 영문 병기 필드(`summaryEn` 등) 추가
- [ ] 이메일 버튼(JS 난독화) 구현
- [ ] Hero → Narrative → Career → Projects 섹션 구현
- [ ] 온톨로지 연결 시각화 인터랙션
- [ ] Lighthouse·모바일 점검 후 main 푸시, Actions 배포 확인


## 진행 현황 (2026-10-28 KST)
- [x] 1차 리뉴얼 구현: `index.html` + `css/portfolio.css` + `js/portfolio.js` (구 `css/style.css`, `js/app.js`는 제거 — git 히스토리에 있음)
- [x] 히어로 이미지 생성(인물 없음): `assets/hero.webp`(데스크톱), `assets/hero-mobile.webp`(모바일 세로 크롭), `assets/hero.jpg`(폴백·OG)
- [x] `data/projects.js`에 `summaryEn/intent/why/benefit` 추가, 라임리(`status: 'archived'`, 링크 없음) 추가, featured = 렛츠 캘린더·컬처플로우·렛츠 뷰
- [x] 온톨로지 SVG 시각화(호버/포커스 인터랙션), 서비스 관계도, 경력 컴팩트(하이라이트 6 + 타임라인 + 접이식 상세)
- [x] 이메일 버튼(아이디/도메인 분할 data 속성, 클릭 시 JS 조합)
- [x] 라이트/다크, `prefers-reduced-motion`, 모바일 390px 확인, 콘솔 에러 0
- [ ] 라임리 스크린샷(로컬 서빙 + 샘플 데이터) → `screenshot` 필드에 연결
- [ ] 관계도 모바일: 현재 가로 스크롤(min-width 640px) → 세로 레이아웃 개선 여지
- [ ] 히어로 이미지 고해상도(현재 1280px 원본) 재생성 검토
- [ ] 렛츠 캘린더 스크린샷이 외부(raw.githubusercontent) URL → 로컬 `assets/screenshots/`로 교체 권장


## v2 원칙 (2026-10-28, 4차 피드백)
- **뿌리는 디자이너.** 기술·비즈니스는 '관심과 이해'로만 표현. 개발 스택(PHP/MySQL/HTML/CSS/jQuery/WordPress, AI·Firebase·정적웹·데이터파이프라인 등) 및 개발자 프레이밍은 사이트에 노출하지 않는다. 스킬은 디자인 툴(Photoshop·Illustrator·Figma·After Effects·Premiere)만.
- **라이트 기본.** 시스템 설정과 무관하게 흰 라이트 테마가 기본, 다크는 토글로만.
- 히어로 카피 3줄: 흩어진 **기록**을 / **데이터**로 연결하여, / **인사이트**를 **비지니스**로 — 키워드만 굵고 크게(그라디언트), 조사는 가늘게.
- 히어로 이미지: 사람 없는 밝은 디자이너 책상 매크로 정물(노트 장부·필름 사진·핀 꽂힌 지도·포스트잇 탭).
- 수상은 2002년 2건만(대덕대 21c 웹컨테스트 장려상, 기장군 청년회의소 홈페이지 경진대회 금상). 고교/1997 수상 언급 금지.
- 라임리 스크린샷 반영 완료(로컬 실행, 빈 데이터, 지역 블러).
