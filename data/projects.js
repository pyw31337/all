/**
 * pyw31337 Hub - Projects & Services Registry
 */

export const CATEGORIES = [
  { id: 'all', label: '전체 보기', icon: 'grid' },
  { id: 'travel', label: '여행 & 아웃도어', icon: 'tent' },
  { id: 'culture', label: '문화 & 라이프', icon: 'ticket' },
  { id: 'mobility', label: '모빌리티 & 인프라', icon: 'video' },
  { id: 'tools', label: '생산성 & 도구', icon: 'tool' }
];

export const PROJECTS = [
  {
    id: 'camp',
    slug: 'camp',
    title: '렛츠 캠핑',
    titleEn: "Let's Camp",
    category: 'travel',
    categoryLabel: '여행 & 아웃도어',
    status: 'live',
    statusLabel: '운영 중',
    badge: '전국 캠핑장 통합',
    accentColor: '#10b981', // emerald
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    bgGlow: 'radial-gradient(ellipse at 85% 25%, rgba(16, 185, 129, 0.22) 0%, transparent 65%)',
    summary: '전국 공영·민간 캠핑장의 사양, 예약 방식, 오픈 일정 및 날씨 정보를 한곳에서 비교하는 캠핑 탐색 포털',
    description: `전국 각지에 흩어져 있는 고캠핑 공공데이터와 지자체/민간 예약 채널을 체계적으로 수집·정규화하여, 캠퍼들이 예약 실패 없이 최적의 사이트를 발견할 수 있도록 돕는 서비스입니다.
복잡한 예약 오픈 일정을 캘린더 피드로 제공하고, 시설 사양부터 주변 날씨까지 한 화면에서 직관적으로 파악할 수 있습니다.`,
    highlights: [
      {
        icon: 'database',
        title: '표준화된 캠핑 데이터 파이프라인',
        desc: '고캠핑 및 공공데이터를 정기 수집·정규화하여 정확한 부대시설, 반려동물 동반 여부, 전기/온수 정보를 제공합니다.'
      },
      {
        icon: 'calendarIcon',
        title: '예약 오픈 캘린더 & .ics 구독',
        desc: '매달 치열한 예약 오픈일을 놓치지 않도록 일정 캘린더 계산 및 모바일 캘린더 앱 연동(.ics 피드)을 지원합니다.'
      },
      {
        icon: 'compass',
        title: '무학습 직관적 탐색 UX',
        desc: '불필요한 단계 없이 원하는 지역, 글램핑/카라반/오토캠핑 등 형태별 필터링과 지도 기반 위치 탐색을 지원합니다.'
      }
    ],
    techStack: ['Vanilla JS', 'TypeScript', 'PostgreSQL', 'GitHub Actions', 'GitHub Pages'],
    stats: '전국 3,500+ 캠핑장',
    story: {
      problem: '캠핑장을 고르려면 시설 사양, 예약 채널, 오픈일, 날씨를 서로 다른 화면에서 반복해서 대조해야 했습니다.',
      solution: '흩어진 정보를 정규화하고, 탐색부터 예약 계획까지 한 흐름으로 연결했습니다.',
      metrics: [
        { value: '3,500+', label: '비교 가능한 캠핑장', detail: '전국 공영·민간 캠핑장 정보' },
        { value: '1', label: '탐색 화면', detail: '사양·예약·날씨를 함께 확인' },
        { value: '.ics', label: '일정 구독', detail: '예약 오픈일을 개인 캘린더로' }
      ],
      flow: [
        { icon: 'search', title: '분산된 정보', desc: '시설·예약·날씨를 따로 찾음' },
        { icon: 'layers', title: '데이터 정리', desc: '같은 기준으로 비교 가능' },
        { icon: 'calendarIcon', title: '예약 계획', desc: '오픈일을 놓치지 않음' }
      ]
    },
    url: 'https://pyw31337.github.io/camp/',
    githubUrl: 'https://github.com/pyw31337/camp',
    screenshot: 'assets/screenshots/camp.png',
    iconPath: 'assets/icons/camp.svg',
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
    accentGlow: 'rgba(139, 92, 246, 0.35)',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    bgGlow: 'radial-gradient(ellipse at 85% 25%, rgba(139, 92, 246, 0.22) 0%, transparent 65%)',
    summary: '한국의 공연, 전시, 영화, 스포츠, 축제 일정을 여러 공식/티켓 소스에서 모아 한눈에 탐색하는 문화 캘린더',
    description: `인터파크, YES24, 국가유산청, 영화관 실시간 상영시간표 등 파편화된 문화 예술 일정을 하나의 타임라인과 지도로 통합한 정적 웹 서비스입니다.
지역 및 공연장 딕셔너리를 기반으로 검색 정확도를 극대화했으며, 설치형 PWA를 지원해 언제든 편리하게 문화 생활을 즐길 수 있습니다.`,
    highlights: [
      {
        icon: 'sparkles',
        title: '멀티 소스 자동 수집 엔진',
        desc: '인터파크, YES24, 메가박스/CGV 상영시간표, 국가유산청 공공데이터를 스케줄러가 매일 수집 및 검증합니다.'
      },
      {
        icon: 'refresh',
        title: '하이브리드 데이터 갱신 구조',
        desc: '로컬 스케줄러와 GitHub Actions 폴백 파이프라인을 연계해 IP 차단 없이 신선하고 신뢰성 높은 데이터를 유지합니다.'
      },
      {
        icon: 'zap',
        title: '초고속 정적 배포 & PWA',
        desc: 'Next.js App Router 정적 익스포트(SSG)와 Tailwind CSS 4를 적용하여 번개처럼 빠른 속도와 오프라인 앱 경험을 제공합니다.'
      }
    ],
    techStack: ['Next.js 19', 'React', 'Tailwind CSS 4', 'TypeScript', 'Playwright', 'PWA'],
    stats: '5+ 주요 예매처 통합',
    story: {
      problem: '공연, 전시, 영화, 스포츠 일정은 예매처와 기관마다 흩어져 있어 한 번의 외출 계획에도 여러 검색이 필요했습니다.',
      solution: '서로 다른 문화 일정을 한 타임라인과 지도로 모아, 탐색의 시작점을 하나로 만들었습니다.',
      metrics: [
        { value: '5+', label: '주요 소스 통합', detail: '예매처·공공 문화 데이터' },
        { value: '매일', label: '수집·검증 주기', detail: '새 일정의 신선도 관리' },
        { value: 'PWA', label: '설치형 경험', detail: '필요할 때 빠르게 다시 열기' }
      ],
      flow: [
        { icon: 'search', title: '여러 예매처', desc: '각각의 검색 경험' },
        { icon: 'refresh', title: '수집·검증', desc: '일정을 같은 포맷으로 정리' },
        { icon: 'mapPin', title: '한 번에 탐색', desc: '시간과 장소를 함께 판단' }
      ]
    },
    url: 'https://pyw31337.github.io/culture/',
    githubUrl: 'https://github.com/pyw31337/culture',
    screenshot: 'assets/screenshots/culture.png',
    iconPath: 'assets/icons/framed/culture.png',
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
    accentGlow: 'rgba(59, 130, 246, 0.35)',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
    bgGlow: 'radial-gradient(ellipse at 85% 25%, rgba(59, 130, 246, 0.22) 0%, transparent 65%)',
    summary: '전국 고속도로, 국도, 도심 실시간 도로 상황과 재난 CCTV를 지도 위에서 즉시 감상하는 라이브 뷰어',
    description: `한국도로공사 ITS, 경찰청 UTIC, 제주교통정보센터, 서울 GITS, KBS 재난망 등 전국 각지의 CCTV 피드를 수집, 정규화, 검증하여 지도와 목록에서 실시간으로 스트리밍하는 플랫폼입니다.
FFmpeg 기반 저지연 HLS 변환 프록시와 적응형 수집(Adaptive Collection) 주기를 통해 안정적인 가용성을 보장합니다.`,
    highlights: [
      {
        icon: 'mapPin',
        title: '전국 교통 & 재난 CCTV 통합',
        desc: '고속도로, 주요 국도, 도심 교차로부터 제주 해안도로까지 분산된 CCTV를 표준 좌표계로 단일 지도에 매핑했습니다.'
      },
      {
        icon: 'film',
        title: '자체 HLS 프록시 & 캐시 아키텍처',
        desc: 'RTSP/비표준 스트림을 고효율 FFmpeg 파이프라인과 Z3 캐시로 웹 표준 HLS로 실시간 변환하여 부드럽게 재생합니다.'
      },
      {
        icon: 'globe',
        title: '월드 투어 & 대용량 렌더링 최적화',
        desc: '수천 개의 마커를 클러스터링과 가상화 기법으로 쾌적하게 렌더링하며, 주요 경관을 둘러보는 World Tour 모드를 제공합니다.'
      }
    ],
    techStack: ['Python', 'FastAPI/Flask', 'FFmpeg', 'Vanilla JS', 'Kakao Maps', 'HLS.js'],
    stats: '전국 실시간 교통망',
    story: {
      problem: '도로·재난 CCTV는 기관별 사이트와 서로 다른 스트리밍 형식에 나뉘어 있어, 필요한 장면을 바로 확인하기 어려웠습니다.',
      solution: '분산된 피드를 지도와 웹 표준 재생 환경으로 모아, 위치를 고르고 바로 보는 흐름으로 단순화했습니다.',
      metrics: [
        { value: '1', label: '통합 지도', detail: '교통·재난 CCTV 탐색 창구' },
        { value: 'HLS', label: '웹 표준 재생', detail: '비표준 스트림을 재생 가능한 형태로' },
        { value: '실시간', label: '도로 상황 확인', detail: '필요한 시점의 라이브 화면' }
      ],
      flow: [
        { icon: 'globe', title: '기관별 피드', desc: '찾는 경로와 형식이 제각각' },
        { icon: 'film', title: '표준화', desc: 'HLS 프록시·캐시로 변환' },
        { icon: 'mapPin', title: '지도에서 즉시 보기', desc: '위치 선택 후 바로 재생' }
      ]
    },
    url: 'https://pyw31337.github.io/cctv/',
    githubUrl: 'https://github.com/pyw31337/cctv',
    screenshot: 'assets/screenshots/cctv.png',
    iconPath: 'assets/icons/framed/cctv.png',
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
    accentGlow: 'rgba(245, 158, 11, 0.35)',
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    bgGlow: 'radial-gradient(ellipse at 85% 25%, rgba(245, 158, 11, 0.22) 0%, transparent 65%)',
    summary: '웹페이지의 원본 이미지, 영상, SVG, 웹폰트 및 디자인 토큰을 Alt+클릭 한 번으로 즉시 추출하는 Chromium 확장 프로그램',
    description: `웹 서핑 중 마음에 드는 고화질 원본 이미지, 백그라운드 영상, 인라인 SVG 아이콘, 글꼴, 색상 팔레트와 CSS 디자인 토큰을 복잡한 개발자 도구 없이 마우스 Alt+클릭 단 한 번으로 찾아내고 다운로드할 수 있는 강력한 생산성 도구입니다.`,
    highlights: [
      {
        icon: 'mousePointer',
        title: '단 한 번의 Alt+클릭 인스펙트',
        desc: '요소 위에 마우스를 올리고 Alt를 누르면 가려진 원본 자산(CSS 배경, 미디어, SVG)을 오버레이로 즉시 확인합니다.'
      },
      {
        icon: 'palette',
        title: '완벽한 디자인 시스템 토큰 추출',
        desc: '선택한 요소의 폰트 패밀리, 크기, 행간, 색상 코드(HEX/RGB), 테두리 및 그림자 값을 클립보드로 원클릭 복사합니다.'
      },
      {
        icon: 'code',
        title: 'Shadow DOM & 복합 미디어 지원',
        desc: '일반적인 저장 방식으로는 다운로드하기 힘든 복잡한 중첩 구조와 인라인 SVG 코드까지 깨끗한 코드로 추출합니다.'
      }
    ],
    techStack: ['Chrome Extension (MV3)', 'TypeScript', 'Tailwind CSS', 'DOM API'],
    stats: 'v1.4.9 안정 버전',
    story: {
      problem: '페이지의 원본 이미지, SVG, 글꼴과 디자인 토큰을 확인하려면 개발자 도구를 여러 번 열고 요소를 추적해야 했습니다.',
      solution: '보는 화면 위에서 Alt+클릭 한 번으로 자산과 스타일 정보를 읽을 수 있게 만들었습니다.',
      metrics: [
        { value: 'Alt+클릭', label: '시작 동작', detail: '보는 위치에서 바로 인스펙트' },
        { value: '4+', label: '추출 대상', detail: '미디어·SVG·폰트·디자인 토큰' },
        { value: 'v1.4.9', label: '현재 안정 버전', detail: 'Chromium 확장 프로그램' }
      ],
      flow: [
        { icon: 'mousePointer', title: '화면에서 선택', desc: '궁금한 요소를 가리킴' },
        { icon: 'search', title: '원본 추적', desc: 'DOM·배경·Shadow DOM 탐색' },
        { icon: 'code', title: '정보를 가져오기', desc: '원본·토큰을 즉시 활용' }
      ]
    },
    url: 'https://pyw31337.github.io/pick/',
    githubUrl: 'https://github.com/pyw31337/pick',
    secondaryRepoUrl: 'https://github.com/pyw31337/source-lens',
    screenshot: 'assets/screenshots/pick.png',
    iconPath: 'assets/icons/framed/pick.png',
    featured: true
  },
  {
    id: 'calendar',
    slug: 'calendar',
    title: '렛츠 캘린더',
    titleEn: "Let's Calendar · Moaelga",
    category: 'culture',
    categoryLabel: '문화 & 라이프',
    status: 'live',
    statusLabel: '운영 중',
    badge: '모아엘가 · 실시간 공유 캘린더',
    accentColor: '#ec4899', // pink
    accentGlow: 'rgba(236, 72, 153, 0.35)',
    gradient: 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)',
    bgGlow: 'radial-gradient(ellipse at 85% 25%, rgba(236, 72, 153, 0.22) 0%, transparent 65%)',
    summary: '모아엘가 구성원이 링크 하나로 일정, 장소, 기록을 함께 보고 가능한 날짜를 실시간으로 조율하는 공유 캘린더',
    description: `모아엘가 캘린더를 기준으로, 가족과 소규모 모임이 날짜를 정하기 위해 대화방을 끝없이 오가는 불편을 줄이기 위해 만든 서비스입니다.
모임 전용 링크를 열면 바로 참여할 수 있고, 각 구성원의 가능 날짜와 일정 변화가 같은 화면에 실시간 반영됩니다.`,
    highlights: [
      {
        icon: 'link',
        title: '모아엘가 링크 기반 참여',
        desc: '회원가입이나 앱 설치 없이 모아엘가 전용 링크를 열어 일정, 장소, 기록을 함께 확인합니다.'
      },
      {
        icon: 'sync',
        title: 'Firebase 실시간 양방향 동기화',
        desc: '동시에 여러 멤버가 접속해 날짜를 체크해도 Firestore 스냅샷 구독을 통해 화면 새로고침 없이 즉각 동기화됩니다.'
      },
      {
        icon: 'share',
        title: '공유용 전용 미리보기',
        desc: '모아엘가 전용 공유 URL(/share/cw/)은 모임 이름과 현황을 담은 미리보기 카드를 메신저에서 보여줍니다.'
      }
    ],
    techStack: ['Vanilla JS', 'Firebase Firestore', 'CSS Grid', 'GitHub Pages'],
    stats: '모아엘가 실시간 일정 조율',
    story: {
      problem: '날짜를 잡을 때 대화방에서 후보일을 다시 묻고, 답을 취합하고, 바뀐 내용을 다시 알리는 일이 반복됐습니다.',
      solution: '모아엘가 전용 링크 하나에서 각자의 가능 날짜와 모임 정보를 같은 화면으로 모았습니다.',
      metrics: [
        { value: '0', label: '가입·설치 단계', detail: '링크를 열면 바로 참여' },
        { value: '1', label: '모아엘가 공유 링크', detail: '같은 캘린더로 연결' },
        { value: '0', label: '새로고침 필요', detail: '날짜 선택이 실시간으로 반영' }
      ],
      metricNote: '수치는 사용자 흐름에서 없앤 단계와 동기화 방식에 따른 마찰 감소 지표입니다.',
      flow: [
        { icon: 'users', title: '대화방에서 조율', desc: '후보일과 답을 반복해서 취합' },
        { icon: 'link', title: '모아엘가 링크 공유', desc: '같은 캘린더로 바로 입장' },
        { icon: 'sync', title: '실시간으로 합의', desc: '가능 날짜가 즉시 함께 보임' }
      ]
    },
    previewContext: {
      eyebrow: 'MOAELGA CALENDAR · LIVE REFERENCE',
      title: '한 링크로 모이는 우리 일정',
      desc: '일정, 장소, 기록을 같은 캘린더에서 함께 확인',
      pills: ['로그인 없이 참여', '가능 날짜 실시간 반영']
    },
    url: 'https://pyw31337.github.io/calendar/?id=cw',
    githubUrl: 'https://github.com/pyw31337/calendar',
    screenshot: 'assets/screenshots/calendar.png',
    iconPath: 'assets/icons/framed/calendar.png',
    featured: false
  }
];

export const PORTFOLIO_STATS = {
  totalProjects: PROJECTS.length,
  liveServices: PROJECTS.filter(p => p.status === 'live').length,
  publicRepos: PROJECTS.filter(p => Boolean(p.githubUrl)).length,
  techCategories: ['Frontend', 'Backend & Streaming', 'Browser Extensions', 'Data Pipeline']
};
