# ➕ 새로운 서비스 및 프로젝트 추가 가이드

`pyw31337/all` 허브는 새로운 사이트나 서비스를 매우 쉽고 직관적으로 추가할 수 있도록 **데이터 주도형(Data-driven)** 구조로 설계되었습니다.

별도의 빌드 단계나 복잡한 컴포넌트 수정 없이, `data/projects.js` 파일에 객체 하나만 추가하면 웹사이트의 카드, 상세 모달, 검색, 카테고리 필터 등에 자동으로 반영됩니다.

---

## 1. 서비스 추가 위치
파일 경로: [`data/projects.js`](data/projects.js)의 `PROJECTS` 배열

## 2. 객체 템플릿

```javascript
{
  id: 'service-slug',                 // 고유 ID (영문 소문자, 하이픈)
  slug: 'service-slug',               // 표시용 슬러그
  title: '서비스 한글명',             // 예: '렛츠캠핑'
  titleEn: 'Service English Name',    // 예: "Let's Camp"
  category: 'travel',                 // 카테고리 (아래 분류표 참고)
  categoryLabel: '여행 & 아웃도어',   // 카테고리 한글명
  status: 'live',                     // 'live' (운영 중) | 'beta' (베타) | 'in-progress' (개발 중)
  statusLabel: '운영 중',             // 상태 텍스트
  badge: '대표 특징 뱃지',            // 카드 우측 상단 뱃지 텍스트
  accentColor: '#3b82f6',             // 테마 대표 색상
  gradient: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)', // 상단 바 & 아이콘 그라디언트
  summary: '한 줄 소개글 (카드 메인에 노출)',
  description: `상세 소개 및 개발 배경, 주요 기능에 대한 자세한 설명.
줄바꿈을 포함하여 마크다운처럼 자유롭게 서술할 수 있습니다.`,
  highlights: [
    {
      title: '핵심 강점 또는 특징 1',
      desc: '해당 특징에 대한 구체적인 설명과 사용자가 얻는 가치'
    },
    {
      title: '핵심 강점 또는 특징 2',
      desc: '해당 특징에 대한 구체적인 설명과 사용자가 얻는 가치'
    },
    {
      title: '핵심 강점 또는 특징 3',
      desc: '해당 특징에 대한 구체적인 설명과 사용자가 얻는 가치'
    }
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], // 사용된 주요 기술 태그들
  stats: '대표 수치 (선택 사항)',     // 예: '전국 3,500+ 캠핑장', 'v1.4.9' 등
  url: 'https://...',                 // 라이브 서비스 접속 URL (없으면 null)
  githubUrl: 'https://github.com/pyw31337/...', // GitHub 저장소 (없거나 비공개면 null)
  featured: false                     // 강조 여부 (true/false)
}
```

---

## 3. 지원 카테고리 목록

| 카테고리 ID (`category`) | 라벨 (`categoryLabel`) | 아이콘 | 설명 |
| :--- | :--- | :--- | :--- |
| `travel` | 여행 & 아웃도어 | 텐트 (`tent`) | 캠핑, 여행, 아웃도어, 지도 관련 서비스 |
| `culture` | 문화 & 라이프 | 티켓 (`ticket`) | 공연, 전시, 영화, 문화 캘린더 등 |
| `mobility` | 모빌리티 & 인프라 | 비디오/카메라 (`video`) | CCTV, 도로교통, 지하철, 대중교통 등 |
| `tools` | 생산성 & 도구 | 도구 (`tool`) | 브라우저 확장도구, 개발자 유틸리티, 자동화 |
| `lifestyle` | 가족 & 라이프 | 하트 (`heart`) | 가계부, 가족 OS, 개인 기록 관리 등 |

> 새 카테고리를 추가하고 싶다면 `data/projects.js` 상단의 `CATEGORIES` 배열에도 동일하게 추가하시면 됩니다.

---

## 4. 로컬 테스트 및 배포

1. 브라우저에서 `index.html` 파일을 바로 열어 확인하거나, 로컬 웹 서버 실행:
   ```bash
   npx serve .
   # 또는
   python3 -m http.server 8000
   ```
2. 변경사항을 `main` 브랜치에 푸시하면 GitHub Actions에 의해 자동으로 배포됩니다:
   ```bash
   git add data/projects.js
   git commit -m "feat: 새 서비스 OOO 추가"
   git push origin main
   ```
