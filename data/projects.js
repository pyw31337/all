/**
 * pyw31337 Hub - Projects & Services Registry
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
    title: '렛츠 캠핑',
    titleEn: "Let's Camp",
    summaryEn: "Compare campsites by spec — like a price-comparison site.",
    intent: "캠핑장을 '다나와처럼' 표준 스펙으로 비교·선택하는 플랫폼",
    why: "캠핏·땡큐캠핑 등 기존 서비스의 수만 개 업장 데이터가 정규화되지 않고 파편화되어, 일일이 비교·매칭하기 어려웠습니다.",
    benefit: "사양·예약 오픈·날씨를 같은 기준으로 비교하고, 예약 타이밍을 놓치지 않습니다.",
    releaseDate: '26.10.22(목)',
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
    featured: false
  },
  {
    id: 'culture',
    slug: 'culture',
    title: '컬처플로우',
    titleEn: 'Culture Flow',
    summaryEn: "A cultural events hub that now powers my other services.",
    intent: "공연·전시·지역 행사를 한곳에 모은 문화 캘린더 허브",
    why: "콘서트·뮤지컬·지역 행사를 직접 찾아다니기 좋으려고 만들었고, 이후 렛츠 캠핑·렛츠 캘린더에 연동되며 허브가 되었습니다.",
    benefit: "문화 생활자는 흩어진 예매처를 오가지 않고, 제 다른 서비스들은 주변 행사 데이터를 그대로 재사용합니다.",
    releaseDate: '26.01.30',
    category: 'culture',
    categoryLabel: '문화 & 라이프',
    status: 'live',
    statusLabel: '운영 중',
    badge: '문화 캘린더 허브',
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
    summaryEn: "See every camera along a road or around a spot — at once.",
    intent: "길 하나, 스팟 하나 주변의 CCTV를 한 화면에 모아 보는 뷰어",
    why: "지도에서 지점을 하나씩 눌러 영상을 여는 불편함에서 시작했습니다.",
    benefit: "운전자와 여행자는 경로 전체의 교통량과 날씨를 한 번에 확인하고, 해외 라이브 영상까지 둘러볼 수 있습니다.",
    releaseDate: '26.01.15',
    category: 'mobility',
    categoryLabel: '모빌리티 & 인프라',
    status: 'live',
    statusLabel: '운영 중',
    badge: '전국 실시간 CCTV',
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
    summaryEn: "Extract original media, SVG and CSS tokens in one click.",
    intent: "원본 이미지·SVG·CSS 토큰을 바로 추출하는 디자이너용 확장 프로그램",
    why: "원본 이미지를 찾으려고 매번 개발자 모드를 여는 번거로움에서 시작해, 디자이너에게 필요한 추출 기능으로 확장하며 계속 다듬고 있습니다.",
    benefit: "디자이너는 레퍼런스 수집과 분석에 드는 시간을 줄이고, 코드 없이 디자인 토큰을 가져옵니다.",
    releaseDate: '26.10.08',
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
    featured: false
  },
  {
    id: 'calendar',
    slug: 'calendar',
    title: '렛츠 캘린더',
    titleEn: "Let's Calendar",
    summaryEn: "One timeline for who, where, what and how much — per gathering.",
    intent: "모임의 하루를 사람·장소·사진·일정·지출로 엮는 타임라인 온톨로지",
    why: "한 번에 다 잇기엔 너무 컸던 '삶의 기록 연결'을, 소모임 단위로 줄여 끝까지 완성했습니다.",
    benefit: "모임 구성원은 누구와 어디서 무엇을 했는지 한눈에 보고, 지출은 투명하게 정산하며, 장소·인물 기준으로 기록을 다시 찾습니다.",
    releaseDate: '26.08.12',
    category: 'culture',
    categoryLabel: '문화 & 라이프',
    status: 'live',
    statusLabel: '운영 중',
    badge: '실시간 공유 캘린더',
    accentColor: '#ec4899', // pink
    accentGlow: 'rgba(236, 72, 153, 0.35)',
    gradient: 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)',
    bgGlow: 'radial-gradient(ellipse at 85% 25%, rgba(236, 72, 153, 0.22) 0%, transparent 65%)',
    summary: '캘린더 구성원이 링크 하나로 일정, 장소, 기록을 함께 보고 가능한 날짜를 실시간으로 조율하는 공유 캘린더',
    description: `로그인이나 회원가입 없이 링크 하나로 가족과 소규모 모임 구성원이 일정과 가능한 날짜를 같은 화면에서 실시간으로 조율하는 공유 캘린더 서비스입니다.
모임 전용 링크를 열면 바로 참여할 수 있고, 각 구성원의 가능 날짜와 일정 변화가 같은 화면에 실시간 반영됩니다.`,
    highlights: [
      {
        icon: 'link',
        title: '캘린더 링크 기반 참여',
        desc: '회원가입이나 앱 설치 없이 캘린더 전용 링크를 열어 일정, 장소, 기록을 함께 확인합니다.'
      },
      {
        icon: 'sync',
        title: 'Firebase 실시간 양방향 동기화',
        desc: '동시에 여러 멤버가 접속해 날짜를 체크해도 Firestore 스냅샷 구독을 통해 화면 새로고침 없이 즉각 동기화됩니다.'
      },
      {
        icon: 'share',
        title: '공유용 전용 미리보기',
        desc: '캘런더 전용 공유 URL은 모임 이름과 현황을 담은 미리보기 카드를 메신저에서 보여줍니다.'
      }
    ],
    techStack: ['Vanilla JS', 'Firebase Firestore', 'CSS Grid', 'GitHub Pages'],
    stats: '실시간 일정 조율',
    story: {
      problem: '날짜를 잡을 때 대화방에서 후보일을 다시 묻고, 답을 취합하고, 바뀐 내용을 다시 알리는 일이 반복됐습니다.',
      solution: '캘린더 전용 링크 하나에서 각자의 가능 날짜와 모임 정보를 같은 화면으로 모았습니다.',
      metrics: [
        { value: '0', label: '가입·설치 단계', detail: '링크를 열면 바로 참여' },
        { value: '1', label: '전용 공유 링크', detail: '같은 캘린더로 연결' },
        { value: '0', label: '새로고침 필요', detail: '날짜 선택이 실시간으로 반영' }
      ],
      metricNote: '수치는 사용자 흐름에서 없앤 단계와 동기화 방식에 따른 마찰 감소 지표입니다.',
      flow: [
        { icon: 'users', title: '대화방에서 조율', desc: '후보일과 답을 반복해서 취합' },
        { icon: 'link', title: '캘린더 링크 공유', desc: '같은 캘린더로 바로 입장' },
        { icon: 'sync', title: '실시간으로 합의', desc: '가능 날짜가 즉시 함께 보임' }
      ]
    },
    previewContext: {
      eyebrow: 'LETS CALENDAR · LIVE REFERENCE',
      title: '한 링크로 모이는 우리 일정',
      desc: '일정, 장소, 기록을 같은 캘린더에서 함께 확인',
      pills: ['로그인 없이 참여', '가능 날짜 실시간 반영']
    },
    screenStory: {
      title: '모아엘가 화면으로 보는 조율의 흐름',
      caption: '모아엘가 운영 UI의 공유 캘린더 구조',
      detail: '실제 캘린더 화면의 세 영역을 따라, 구성원이 같은 정보를 보고 약속을 정하는 흐름을 설명합니다.',
      callouts: [
        {
          label: '01',
          title: '함께 확인하는 월간 일정',
          desc: '중앙의 월간 화면에서 구성원의 일정과 모임 확정일을 한 기준으로 확인합니다.',
          pin: { x: 61, y: 66 }
        },
        {
          label: '02',
          title: '가까운 모임을 먼저 보여주는 상단 영역',
          desc: '다가오는 확정 일정과 D-day를 먼저 보여줘, 대화방을 다시 열지 않아도 다음 약속을 확인할 수 있습니다.',
          pin: { x: 65, y: 28 }
        },
        {
          label: '03',
          title: '일정과 이어지는 공동 기록',
          desc: '왼쪽 메뉴에서 채팅·장소·메모·갤러리로 이어져, 일정의 맥락을 같은 공간에서 계속 확인합니다.',
          pin: { x: 10, y: 48 }
        }
      ]
    },
    url: 'https://pyw31337.github.io/calendar/?id=cw',
    githubUrl: 'https://github.com/pyw31337/calendar',
    screenshot: 'assets/screenshots/calendar.webp',
    iconPath: 'assets/icons/framed/calendar.png',
    featured: true
  },
  {
    id: 'hair',
    slug: 'hair',
    title: '렛츠 헤어',
    titleEn: "Let's Hair",
    summaryEn: "10-second, sign-up-free booking for neighborhood salons.",
    intent: "링크 하나로 10초 만에 끝나는 무가입 미용실 예약",
    why: "20년째 미용실을 하시는 어머니가 시술 중에도 전화 예약을 받는 모습을 보고 만들었습니다.",
    benefit: "네이버 예약도 어려운 40~60대 고객은 쉽게 예약하고, 1인 미용실 원장님은 전화 응대 부담에서 벗어납니다.",
    releaseDate: '24.03.28',
    category: 'tools',
    categoryLabel: '생산성 & 도구',
    status: 'live',
    statusLabel: '운영 중',
    badge: '무가입 10초 예약',
    accentColor: '#f43f5e', // rose
    accentGlow: 'rgba(244, 63, 94, 0.35)',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #fb7185 100%)',
    bgGlow: 'radial-gradient(ellipse at 85% 25%, rgba(244, 63, 94, 0.22) 0%, transparent 65%)',
    summary: '1인 미용실과 뷰티숍을 위해 링크 하나로 로그인 없이 예약하고, 아이디 발급만으로 누구나 무료 매장 예약 시스템을 개설하는 실시간 예약 솔루션',
    description: `시술 중 끊임없이 걸려오는 예약 문의 전화와 대화방 조율의 불편함을 해소하기 위해 탄생한 미용실 전용 실시간 예약 시스템입니다.
고객은 회원가입이나 앱 설치 없이 링크 하나로 원하는 날짜와 시술 항목을 선택하여 10초 만에 예약할 수 있으며, 휴대폰 뒷번호로 간편하게 취소할 수 있습니다.
또한 아이디 발급만으로 어떤 매장이든 자신만의 예약 캘린더와 관리자 대시보드를 즉시 개설할 수 있는 멀티 테넌트 SaaS 구조로 확장되었습니다.`,
    highlights: [
      {
        icon: 'link',
        title: '링크 기반 10초 무가입 예약',
        desc: '회원가입과 앱 설치 없이 매장 링크만 열어 1시간 단위 슬롯에서 원하는 시술을 즉시 예약합니다.'
      },
      {
        icon: 'sync',
        title: 'Firestore 실시간 중복 방지',
        desc: '동시 접속 환경에서도 실시간 스냅샷 동기화를 통해 예약 즉시 다른 화면에서 마감 처리되어 이중 예약을 차단합니다.'
      },
      {
        icon: 'share',
        title: '원클릭 멀티 테넌트 숍 개설',
        desc: '아이디 하나만 발급받으면 독립된 매장명, 영업시간, 휴무일, 시술 메뉴, 관리자 모드를 가진 예약 시스템이 즉시 생성됩니다.'
      }
    ],
    techStack: ['Vanilla JS', 'Firebase Firestore', 'CSS 3D Flip', 'PWA', 'GitHub Pages'],
    stats: '무가입 10초 예약 · 멀티 SaaS',
    story: {
      problem: '시술 중 걸려오는 예약 문의 전화로 작업 흐름이 끊기고, 문자 조율의 번거로움과 상용 솔루션의 고가 수수료 부담이 있었습니다.',
      solution: '로그인 없는 링크형 예약과 실시간 Firestore 동기화, 뒷번호 간편 취소, 멀티 숍 무료 개설 시스템을 구축했습니다.',
      metrics: [
        { value: '0단계', label: '가입·설치 과정', detail: '링크를 열면 10초 만에 예약 완료' },
        { value: '0원', label: '월 운영 수수료', detail: '서버리스 BaaS 구조로 무료 운영' },
        { value: '100%', label: '실시간 중복 차단', detail: 'Firestore 리스너로 즉시 마감 반영' }
      ],
      metricNote: '수치는 사용자 흐름 마찰 제거 및 Firestore 실시간 동기화로 검증된 개선 지표입니다.',
      flow: [
        { icon: 'phone', title: '전화·문자 조율', desc: '시술 중 전화 응대와 대화 반복' },
        { icon: 'link', title: '예약 링크 공유', desc: '날짜·시간대 실시간 선택' },
        { icon: 'sync', title: '10초 예약 완료', desc: '중복 차단 및 뒷번호 간편 취소' }
      ]
    },
    previewContext: {
      eyebrow: 'LETS HAIR · MULTI-TENANT SAAS',
      title: '전화 없는 편안한 시술 예약',
      desc: '로그인 없이 10초 예약, 아이디 발급으로 내 매장 즉시 개설',
      pills: ['무가입 10초 예약', '실시간 중복 방지', '멀티 숍 SaaS']
    },
    url: 'https://pyw31337.github.io/hair/?shop=jhair',
    githubUrl: 'https://github.com/pyw31337/hair',
    screenshot: 'assets/screenshots/hair.webp',
    iconPath: 'assets/icons/framed/jhair.png',
    featured: false
  },
  {
    id: 'limery',
    slug: 'limery',
    title: '라임리',
    titleEn: 'Limery',
    summaryEn: 'Where it started — and why it paused.',
    intent: '20년간 쌓인 사진·지도·일정 데이터를 하나로 잇는 가족 OS (Live your memory)',
    why: '20년치 사진·지도·일정을 한 번에 잇기엔 범위가 너무 넓어 멈췄습니다.',
    benefit: '그 교훈으로 범위를 좁힌 렛츠 캘린더를 끝까지 만들 수 있었습니다.',
    category: 'lifestyle',
    categoryLabel: '가족 & 라이프',
    status: 'archived',
    statusLabel: '아카이브',
    badge: '렛츠 캘린더의 출발점',
    accentColor: '#84cc16',
    summary: '렛츠 캘린더의 출발점이 된, 멈춘 실험',
    description: '',
    highlights: [],
    techStack: ['JavaScript', 'Supabase', 'Cloudflare'],
    stats: '아카이브',
    url: null,
    githubUrl: null,
    screenshot: 'assets/screenshots/limery.webp',
    featured: false
  }
];

export const PORTFOLIO_STATS = {
  totalProjects: PROJECTS.length,
  liveServices: PROJECTS.filter(p => p.status === 'live').length,
  publicRepos: PROJECTS.filter(p => Boolean(p.githubUrl)).length,
  techCategories: ['Frontend', 'Backend & Streaming', 'Browser Extensions', 'Data Pipeline']
};
