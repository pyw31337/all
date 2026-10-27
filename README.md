# PYW Hub | 박영우 서비스 & 프로젝트 아카이브

> **공식 서비스 URL:** [https://pyw31337.github.io/all/](https://pyw31337.github.io/all/)  
> 박영우([@pyw31337](https://github.com/pyw31337))가 직접 설계하고 개발·운영하는 모든 사이트와 프로덕트를 한눈에 모아보고 탐색할 수 있는 올인원 포트폴리오 허브입니다.

---

## 🌟 수록된 주요 서비스 라인업

| 서비스명 | 영문명/슬러그 | 카테고리 | 핵심 요약 | 라이브 링크 | 저장소 |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **렛츠캠핑** | Let's Camp (`camp`) | 여행 & 아웃도어 | 전국 3,500+ 캠핑장 사양·예약 일정·날씨 비교 포털 | [바로가기](https://pyw31337.github.io/camp/) | [GitHub](https://github.com/pyw31337/camp) |
| **컬처플로우** | Culture Flow (`culture`) | 문화 & 라이프 | 전국 공연·전시·영화·스포츠 통합 문화 캘린더 (PWA) | [바로가기](https://pyw31337.github.io/culture/) | [GitHub](https://github.com/pyw31337/culture) |
| **렛츠 뷰** | Let's View (`cctv`) | 모빌리티 & 인프라 | 전국 고속도로·국도·도심 실시간 도로/재난 CCTV 뷰어 | [바로가기](https://pyw31337.github.io/cctv/) | [GitHub](https://github.com/pyw31337/cctv) |
| **렛츠 픽** | Let's Pick (`pick`) | 생산성 & 도구 | 원본 미디어·SVG·CSS 토큰 원클릭 추출 확장도구 (v1.4.9) | [바로가기](https://pyw31337.github.io/pick/) | [GitHub](https://github.com/pyw31337/pick) |
| **렛츠 캘린더** | Let's Calendar (`calendar`) | 문화 & 라이프 | 로그인 없는 실시간 모임 일정 조율 & 가능 날짜 웹 달력 | [바로가기](https://pyw31337.github.io/calendar/?id=kkot) | [GitHub](https://github.com/pyw31337/calendar) |
| **메트로 라이브** | Metro Live (`metro`) | 모빌리티 & 인프라 | 수도권 지하철 실시간 열차 위치 지도 & 경로/편의시설 안내 | [바로가기](https://pyw31337.github.io/metro/) | [GitHub](https://github.com/pyw31337/metro) |
| **라임리** | Limery (`limery`) | 가족 & 라이프 | 18년 가계부 + 1,200곳 장소 아카이브 + AI 가족 라이프 OS | [바로가기](https://limery.pages.dev) | *(Private)* |

---

## 🚀 포트폴리오 웹사이트 주요 특징

1. **포트폴리오 맞춤형 세련된 UI/UX**
   - 현대적인 글래스모피즘과 다크/라이트 테마 자동 감지 및 원클릭 토글
   - 실시간 카테고리 필터링(여행, 문화, 모빌리티, 도구, 가족 등)
   - 서비스명, 설명, 기술 스택, 키워드를 즉시 검색하는 반응형 실시간 검색창
   - 서비스별 고유 브랜드 그라디언트 및 라이브 운영 펄싱 닷(Live Dot) 인디케이터

2. **모던 웹 표준 기반 구축 (Modern Web Standards)**
   - 최신 웹 표준 `<dialog>` 기반의 상세 모달 및 Light-Dismiss (바깥 클릭/Esc 닫기)
   - `@starting-style` 및 CSS 이산 트랜지션 기반 부드러운 모달 진입/종료 애니메이션
   - `prefers-reduced-motion` 미디어 쿼리를 통한 모션 민감 사용자 배려
   - 외부 무거운 프레임워크 의존 없는 순수 모던 Vanilla JS (ES Modules) 초고속 로딩

3. **데이터 주도형 구조 (Easy to Extend)**
   - 모든 서비스 데이터가 [`data/projects.js`](data/projects.js)에 구조화되어 있어, 새로운 서비스를 코드 수정 없이 JSON/객체 추가만으로 즉시 포트폴리오에 반영 가능
   - 자세한 안내는 [`ADDING_PROJECT.md`](ADDING_PROJECT.md) 참고

---

## 🛠️ 로컬 실행 방법

별도의 복잡한 빌드나 설치 과정 없이 정적 웹 서버로 즉시 구동 가능합니다.

```bash
# 저장소 복제
git clone https://github.com/pyw31337/all.git
cd all

# 로컬 서버 실행 (예: Python 또는 Node)
python3 -m http.server 8000
# 또는
npx serve .
```

브라우저에서 `http://localhost:8000` 을 열면 바로 확인할 수 있습니다.

---

## 📦 자동 배포 파이프라인

`main` 브랜치에 코드를 푸시하면 GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))가 자동으로 GitHub Pages에 배포합니다.
배포 상태는 저장소의 Actions 탭에서 실시간으로 확인할 수 있습니다.
