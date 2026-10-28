# pyw31337 Hub | 박영우 서비스 & 프로젝트 아카이브

> **공식 서비스 URL:** [https://pyw31337.github.io/all/](https://pyw31337.github.io/all/)  
> 박영우([@pyw31337](https://github.com/pyw31337))가 직접 설계하고 개발·운영하는 프로덕트들을 한눈에 모아보고 탐색할 수 있는 1단 비주얼 쇼케이스 허브입니다.

---

> 🧭 **포트폴리오 리뉴얼 1차 적용 완료 (2026-10-28)** — Hero → About(철학·온톨로지·관계도) → Career → Projects 구조. 파일: `index.html`, `css/portfolio.css`, `js/portfolio.js`, 데이터 `data/projects.js`. — 인터뷰·분석·디자인 방향 문서: [`docs/portfolio/AGENTS.md`](docs/portfolio/AGENTS.md)

---

## 🌟 수록된 주요 서비스 라인업

| 서비스명 | 영문명/슬러그 | 카테고리 | 핵심 요약 | 라이브 링크 | 저장소 |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **렛츠 캠핑** | Let's Camp (`camp`) | 여행 & 아웃도어 | 전국 3,500+ 캠핑장 사양·예약 일정·날씨 비교 포털 | [바로가기](https://pyw31337.github.io/camp/) | [GitHub](https://github.com/pyw31337/camp) |
| **컬처플로우** | Culture Flow (`culture`) | 문화 & 라이프 | 전국 공연·전시·영화·스포츠 통합 문화 캘린더 (PWA) | [바로가기](https://pyw31337.github.io/culture/) | [GitHub](https://github.com/pyw31337/culture) |
| **렛츠 뷰** | Let's View (`cctv`) | 모빌리티 & 인프라 | 전국 고속도로·국도·도심 실시간 도로/재난 CCTV 뷰어 | [바로가기](https://pyw31337.github.io/cctv/) | [GitHub](https://github.com/pyw31337/cctv) |
| **렛츠 픽** | Let's Pick (`pick`) | 생산성 & 도구 | 원본 미디어·SVG·CSS 토큰 원클릭 추출 확장도구 (v1.4.9) | [바로가기](https://pyw31337.github.io/pick/) | [GitHub](https://github.com/pyw31337/pick) |
| **렛츠 캘린더** | Let's Calendar (`calendar`) | 문화 & 라이프 | 로그인 없는 실시간 모임 일정 조율 & 가능 날짜 웹 달력 | [바로가기](https://pyw31337.github.io/calendar/?id=cw) | [GitHub](https://github.com/pyw31337/calendar) |
| **렛츠 헤어** | Let's Hair (`hair`) | 생산성 & 도구 | 링크 기반 10초 무가입 미용실 예약 & 멀티 테넌트 SaaS | [바로가기](https://pyw31337.github.io/hair/?shop=jhair) | [GitHub](https://github.com/pyw31337/hair) |

---

## 🚀 포트폴리오 웹사이트 주요 특징

1. **1단 대형 비주얼 쇼케이스 (Single-Column Feature Sections)**
   - 3단 카드 대신, 서비스 하나하나가 하나의 독립된 섹션처럼 웅장하게 펼쳐지는 1단 레이아웃.
   - 각 서비스별 고유 앰비언트 글로우 그래픽 배경과 모던 기하학 패턴 적용.
   - 실제 운영 중인 서비스의 고화질 캡처 화면을 브라우저 윈도우 프레임 목업에 탑재하여 시각적 직관성 극대화.

2. **한글 가독성 및 반응형 모바일 최적화 (320px 완벽 지원)**
   - 모든 한글 텍스트에 `word-break: keep-all;`을 전면 적용하여 단어 중간에 어색한 줄바꿈 발생 방지.
   - 모바일 320px(초소형 화면)부터 태블릿, 데스크톱까지 사파리, 크롬, 웨일 브라우저 완벽 대응.
   - iOS 사파리 주소창 인풋 줌인 버그 방지(`font-size: 16px`) 및 Safe Area Inset(노치/홈바) 적용.

3. **풍부한 아이콘 & 인터랙티브 기능**
   - 각 기능과 장점마다 맞춤형 SVG 아이콘 배지 장착.
   - 실시간 카테고리 필터링(여행, 문화, 모빌리티, 도구 등) 및 실시간 검색.
   - `<dialog>` 기반의 상세 모달 및 Light-Dismiss (바깥 클릭/Esc 닫기).
   - 다크 모드 / 라이트 모드 실시간 토글.

4. **데이터 주도형 구조 (Easy to Extend)**
   - 새로운 서비스는 [`data/projects.js`](data/projects.js)에 객체를 추가하기만 하면 포트폴리오 쇼케이스에 자동으로 반영됩니다.
   - 상세 설명은 [`ADDING_PROJECT.md`](ADDING_PROJECT.md)를 참고하세요.

---

## 🛠️ 로컬 실행 방법

```bash
# 로컬 웹 서버 실행 (별도 빌드 필요 없음)
python3 -m http.server 8000
# 또는
npx serve .
```

브라우저에서 `http://localhost:8000` 을 열면 바로 확인할 수 있습니다.
