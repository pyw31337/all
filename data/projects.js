/**
 * PYW Hub - Projects & Services Registry
 * 
 * 새 서비스를 추가하려면 아래 배열에 객체를 하나 추가하기만 하면 됩니다.
 * index.html의 카드, 카테고리 필터, 검색, 상세 모달 등에 자동으로 반영됩니다.
 */

export const CATEGORIES = [
  { id: 'all', label: '전체 보기', icon: 'grid' },
  { id: 'travel', label: '여행 & 아웃도어', icon: 'tent' },
  { id: 'culture', label: '문화 & 라이프', icon: 'ticket' },
  { id: 'mobility', label: '모빌리티 & 인프라', icon: 'video' },
  { id: 'tools', label: '생산성 & 도구', icon: 'tool' },
  { id: 'lifestyle', label: '가족 & 라이프', icon: 'heart' }
];

export const PROJECTS = [
  {
    id: 'camp',
    slug: 'camp',
    title: '렛츠캠핑',
    titleEn: "Let's Camp",
    category: 'travel',
    categoryLabel: '여행 & 아웃도어',
    status: 'live',
    statusLabel: '운영 중',
    badge: '전국 캠핑장 통합',
    accentColor: '#10b981', // emerald
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    summary: '전국 공영·민간 캠핑장의 사양, 예약 방식, 오픈 일정 및 날씨 정보를 한곳에서 비교하는 캠핑 탐색 포털',
    description: `전국 각지에 흩어져 있는 고캠핑 공공데이터와 지자체/민간 예약 채널을 체계적으로 수집·정규화하여, 캠퍼들이 예약 실패 없이 최적의 사이트를 발견할 수 있도록 돕는 서비스입니다.
복잡한 예약 오픈 일정을 캘린더 피드로 제공하고, 시설 사양부터 주변 날씨까지 한 화면에서 직관적으로 파악할 수 있습니다.`,
    highlights: [
      {
        title: '표준화된 캠핑 데이터 파이프라인',
        desc: '고캠핑 및 공공데이터를 정기 수집·정규화하여 정확한 부대시설, 반려동물 동반 여부, 전기/온수 정보를 제공합니다.'
      },
      {
        title: '예약 오픈 캘린더 & .ics 구독',
        desc: '매달 치열한 예약 오픈일을 놓치지 않도록 일정 캘린더 계산 및 모바일 캘린더 앱 연동(.ics 피드)을 지원합니다.'
      },
      {
        title: '무학습 직관적 탐색 UX',
        desc: '불필요한 단계 없이 원하는 지역, 글램핑/카라반/오토캠핑 등 형태별 필터링과 지도 기반 위치 탐색을 지원합니다.'
      }
    ],
    techStack: ['Vanilla JS', 'TypeScript', 'PostgreSQL', 'GitHub Actions', 'GitHub Pages'],
    stats: '전국 3,500+ 캠핑장',
    url: 'https://pyw31337.github.io/camp/',
    githubUrl: 'https://github.com/pyw31337/camp',
    featured: true
  },
  {
    id: 'culture',
    slug: 'culture',
    title: '컬처플로우',
    titleEn: 'Culture Flow',
    category: 'culture',
    categoryLabel: '문화 & 라이프',
    status: 'live',
    statusLabel: '운영 중',
    badge: 'Next.js 19 · PWA',
    accentColor: '#8b5cf6', // violet
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    summary: '한국의 공연, 전시, 영화, 스포츠, 축제 일정을 여러 공식/티켓 소스에서 모아 한눈에 탐색하는 문화 캘린더',
    description: `인터파크, YES24, 국가유산청, 영화관 실시간 상영시간표 등 파편화된 문화 예술 일정을 하나의 타임라인과 지도로 통합한 정적 웹 서비스입니다.
지역 및 공연장 딕셔너리를 기반으로 검색 정확도를 극대화했으며, 설치형 PWA를 지원해 언제든 편리하게 문화 생활을 즐길 수 있습니다.`,
    highlights: [
      {
        title: '멀티 소스 자동 수집 엔진',
        desc: '인터파크, YES24, 메가박스/CGV 상영시간표, 국가유산청 공공데이터를 스케줄러가 매일 수집 및 검증합니다.'
      },
      {
        title: '하이브리드 데이터 갱신 구조',
        desc: '로컬 스케줄러와 GitHub Actions 폴백 파이프라인을 연계해 IP 차단 없이 신선하고 신뢰성 높은 데이터를 유지합니다.'
      },
      {
        title: '초고속 정적 배포 & PWA',
        desc: 'Next.js App Router 정적 익스포트(SSG)와 Tailwind CSS 4를 적용하여 번개처럼 빠른 속도와 오프라인 앱 경험을 제공합니다.'
      }
    ],
    techStack: ['Next.js 19', 'React', 'Tailwind CSS 4', 'TypeScript', 'Playwright', 'PWA'],
    stats: '5+ 주요 예매처 통합',
    url: 'https://pyw31337.github.io/culture/',
    githubUrl: 'https://github.com/pyw31337/culture',
    featured: true
  },
  {
    id: 'cctv',
    slug: 'cctv',
    title: '렛츠 뷰',
    titleEn: "Let's View",
    category: 'mobility',
    categoryLabel: '모빌리티 & 인프라',
    status: 'live',
    statusLabel: '운영 중',
    badge: '초저지연 HLS 스트리밍',
    accentColor: '#3b82f6', // blue
    gradient: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
    summary: '전국 고속도로, 국도, 도심 실시간 도로 상황과 재난 CCTV를 지도 위에서 즉시 감상하는 라이브 뷰어',
    description: `한국도로공사 ITS, 경찰청 UTIC, 제주교통정보센터, 서울 GITS, KBS 재난망 등 전국 각지의 CCTV 피드를 수집, 정규화, 검증하여 지도와 목록에서 실시간으로 스트리밍하는 플랫폼입니다.
FFmpeg 기반 저지연 HLS 변환 프록시와 적응형 수집(Adaptive Collection) 주기를 통해 안정적인 가용성을 보장합니다.`,
    highlights: [
      {
        title: '전국 교통 & 재난 CCTV 통합',
        desc: '고속도로, 주요 국도, 도심 교차로부터 제주 해안도로까지 분산된 CCTV를 표준 좌표계로 단일 지도에 매핑했습니다.'
      },
      {
        title: '자체 HLS 프록시 & 캐시 아키텍처',
        desc: 'RTSP/비표준 스트림을 고효율 FFmpeg 파이프라인과 Z3 캐시로 웹 표준 HLS로 실시간 변환하여 부드럽게 재생합니다.'
      },
      {
        title: '월드 투어 & 대용량 렌더링 최적화',
        desc: '수천 개의 마커를 클러스터링과 가상화 기법으로 쾌적하게 렌더링하며, 주요 경관을 둘러보는 World Tour 모드를 제공합니다.'
      }
    ],
    techStack: ['Python', 'FastAPI/Flask', 'FFmpeg', 'Vanilla JS', 'Kakao Maps', 'HLS.js'],
    stats: '전국 실시간 교통망',
    url: 'https://pyw31337.github.io/cctv/',
    githubUrl: 'https://github.com/pyw31337/cctv',
    featured: true
  },
  {
    id: 'pick',
    slug: 'pick',
    title: '렛츠 픽',
    titleEn: "Let's Pick",
    category: 'tools',
    categoryLabel: '생산성 & 도구',
    status: 'live',
    statusLabel: '배포 완료',
    badge: 'Chrome Extension · v1.4.9',
    accentColor: '#f59e0b', // amber
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    summary: '웹페이지의 원본 이미지, 영상, SVG, 웹폰트 및 디자인 토큰을 Alt+클릭 한 번으로 즉시 추출하는 Chromium 확장 프로그램',
    description: `웹 서핑 중 마음에 드는 고화질 원본 이미지, 백그라운드 영상, 인라인 SVG 아이콘, 글꼴, 색상 팔레트와 CSS 디자인 토큰을 복잡한 개발자 도구 없이 마우스 Alt+클릭 단 한 번으로 찾아내고 다운로드할 수 있는 강력한 생산성 도구입니다.`,
    highlights: [
      {
        title: '단 한 번의 Alt+클릭 인스펙트',
        desc: '요소 위에 마우스를 올리고 Alt를 누르면 가려진 원본 자산(CSS 배경, 미디어, SVG)을 오버레이로 즉시 확인합니다.'
      },
      {
        title: '완벽한 디자인 시스템 토큰 추출',
        desc: '선택한 요소의 폰트 패밀리, 크기, 행간, 색상 코드(HEX/RGB), 테두리 및 그림자 값을 클립보드로 원클릭 복사합니다.'
      },
      {
        title: 'Shadow DOM & 복합 미디어 지원',
        desc: '일반적인 저장 방식으로는 다운로드하기 힘든 복잡한 중첩 구조와 인라인 SVG 코드까지 깨끗한 코드로 추출합니다.'
      }
    ],
    techStack: ['Chrome Extension (MV3)', 'TypeScript', 'Tailwind CSS', 'DOM API'],
    stats: 'v1.4.9 안정 버전',
    url: 'https://pyw31337.github.io/pick/',
    githubUrl: 'https://github.com/pyw31337/pick',
    secondaryRepoUrl: 'https://github.com/pyw31337/source-lens',
    featured: true
  },
  {
    id: 'calendar',
    slug: 'calendar',
    title: '렛츠 캘린더',
    titleEn: "Let's Calendar",
    category: 'culture',
    categoryLabel: '문화 & 라이프',
    status: 'live',
    statusLabel: '운영 중',
    badge: 'Firestore 실시간 동기화',
    accentColor: '#ec4899', // pink
    gradient: 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)',
    summary: '로그인 없이 공유 링크 하나로 사모임 일정 조율 및 참석 가능 날짜를 실시간 취합하는 웹 캘린더',
    description: `동호회, 친구 모임, 스터디 등 여러 사람이 만날 날짜를 잡을 때 겪는 번거로움을 해결하기 위해 탄생한 서비스입니다.
URL의 고유 ID 파라미터로 개별 모임 캘린더가 자동 생성되며, 참석자들이 가능한 날짜를 누르면 실시간으로 참석 현황 히트맵이 업데이트됩니다.`,
    highlights: [
      {
        title: 'URL 기반 제로-로그인 인스턴스',
        desc: '회원가입이나 앱 설치 없이 고유 URL 링크 공유만으로 즉시 전용 캘린더가 생성되고 투표에 참여할 수 있습니다.'
      },
      {
        title: 'Firebase 실시간 양방향 동기화',
        desc: '동시에 여러 멤버가 접속해 날짜를 체크해도 Firestore 스냅샷 구독을 통해 화면 새로고침 없이 즉각 동기화됩니다.'
      },
      {
        title: '카카오톡 맞춤형 동적 Open Graph',
        desc: '모임 이름과 현황이 담긴 전용 공유 URL(/share/{id}/)을 제공해 메신저 공유 시 매력적인 미리보기 카드를 렌더링합니다.'
      }
    ],
    techStack: ['Vanilla JS', 'Firebase Firestore', 'CSS Grid', 'GitHub Pages'],
    stats: '실시간 일정 조율',
    url: 'https://pyw31337.github.io/calendar/?id=kkot',
    githubUrl: 'https://github.com/pyw31337/calendar',
    featured: false
  },
  {
    id: 'metro',
    slug: 'metro',
    title: '메트로 라이브',
    titleEn: 'Metro Live',
    category: 'mobility',
    categoryLabel: '모빌리티 & 인프라',
    status: 'live',
    statusLabel: '운영 중',
    badge: '실시간 열차 위치 추적',
    accentColor: '#06b6d4', // cyan
    gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    summary: '수도권 지하철 열차의 실시간 운행 위치를 지도상에 시각화하고 최적 경로와 역사 편의시설을 제공하는 웹앱',
    description: `서울시 열린데이터광장의 실시간 열차 위치 데이터를 바탕으로, 열차의 역 진입·출발 이벤트와 역간 소요시간을 보간 계산하여 열차의 현재 위치를 지도 위에 생생하게 움직이는 마커로 표시합니다.
또한 환승 경로와 버스 연계, 출구별 화장실 위치 정보까지 한 화면에서 빠르게 확인할 수 있습니다.`,
    highlights: [
      {
        title: '정밀 소요시간 보간 위치 추정',
        desc: '단순 이벤트 알림을 넘어 열차 시간표 데이터와 거리 계산식을 접목해 열차의 움직임을 매끄러운 캔버스 애니메이션으로 표현합니다.'
      },
      {
        title: 'Cloudflare Worker 고성능 중계',
        desc: 'CORS 제약 해소 및 12초 고성능 엣지 캐싱을 적용한 Worker 프록시를 통해 API 부하를 줄이고 빠른 응답성을 실현했습니다.'
      },
      {
        title: '원스톱 대중교통 정보 허브',
        desc: '지하철 위치뿐 아니라 연계 버스 도착 정보와 역 내부 화장실/엘리베이터 위치까지 시민에게 꼭 필요한 정보를 묶었습니다.'
      }
    ],
    techStack: ['Next.js', 'React', 'Cloudflare Workers', 'Transit OpenAPI', 'Tailwind CSS'],
    stats: '수도권 전 노선 실시간',
    url: 'https://pyw31337.github.io/metro/',
    githubUrl: 'https://github.com/pyw31337/metro',
    featured: false
  },
  {
    id: 'limery',
    slug: 'limery',
    title: '라임리',
    titleEn: 'Limery (Live Your Memory)',
    category: 'lifestyle',
    categoryLabel: '가족 & 라이프',
    status: 'live',
    statusLabel: '가족 운영 중',
    badge: '패밀리 OS · 18년 아카이브',
    accentColor: '#14b8a6', // teal
    gradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    summary: '18년 치 가계부, 1,200곳의 방문 장소 아카이브, 캘린더, 사진, AI 컨설턴트가 결합된 프라이빗 가족 라이프 OS',
    description: `가족의 소중한 일상과 기억을 기록하고 미래를 계획하는 단일 통합 웹앱입니다.
18년 동안 누적된 가계부 데이터 분석부터 1,200곳이 넘는 가족 여행지/맛집 공간 아카이브, 구성원 캘린더 동기화, 가족 전용 AI 컨설턴트까지 탄탄하게 결합된 프라이빗 라이프 플랫폼입니다.`,
    highlights: [
      {
        title: '18년 가계부 & 1,200곳 장소 아카이브',
        desc: '장기간 축적된 가계 지출 패턴과 온 가족의 추억이 담긴 방문 장소를 시각화된 차트와 지도로 아카이빙했습니다.'
      },
      {
        title: '초경량 Vanilla JS ES Modules',
        desc: '외부 무거운 프레임워크 없이 모던 Vanilla JS와 Hash Router만으로 군더더기 없는 번개 같은 실행 속도를 자랑합니다.'
      },
      {
        title: '견고한 보안 & 엣지 스토리지',
        desc: 'Supabase PostgreSQL RLS(Row Level Security)로 가족 데이터를 안전하게 보호하며, Cloudflare R2로 대용량 미디어를 관리합니다.'
      }
    ],
    techStack: ['Vanilla JS (ES Modules)', 'Supabase (PostgreSQL)', 'Cloudflare Pages & R2', 'AI Consultant'],
    stats: '18년 가계부 · 1,200곳 장소',
    url: 'https://limery.pages.dev',
    githubUrl: null, // Private repo
    featured: false
  }
];

export const PORTFOLIO_STATS = {
  totalProjects: PROJECTS.length,
  liveServices: PROJECTS.filter(p => p.status === 'live').length,
  publicRepos: 6,
  techCategories: ['Frontend', 'Backend & Streaming', 'Browser Extensions', 'Data Pipeline', 'Edge & Serverless']
};
