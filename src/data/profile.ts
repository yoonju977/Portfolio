export type Metric = { value: string; label: string; note?: string }

export type Project = {
  id: string
  index: string
  name: string
  subtitle: string
  period: string
  org: string
  role: string
  team: string
  domain: 'AI' | 'Infra' | 'Backend' | 'Product'
  problem: string
  did: string[]
  result: string
  numbers: Metric[]
  stack: string[]
  gained: string
  limit: string
  link?: { label: string; href: string }
  images?: { src: string; caption: string }[]
}

export const profile = {
  nameKo: '송윤주',
  nameEn: 'Song Yoon Ju',
  role: 'Backend · Infrastructure Engineer',
  year: '2026',
  oneLine: '현장의 반복 문제를 절차로 바꿔, AI 서비스를 멈추지 않게 운영하는 백엔드 개발자',
  tagline: '지구력',
  bio: '고객 데스크에서 6년 8개월을 보내고, 그 옆에서 학위와 프로젝트를 끝냈습니다. 지금은 모델이 아니라 모델이 멈추지 않는 구조를 만듭니다.',
  email: '',
  github: 'https://github.com/yoonju977',
  location: '',
}

export const marquee = [
  'Python', 'Django · DRF', 'FastAPI', 'PostgreSQL · Redis',
  'AWS ECS · Fargate', 'Docker', 'GitHub Actions', 'PyTorch',
  'KR-BERT', 'React · TypeScript', 'AWS SAA', 'SQLD',
]

export const endurance = {
  headline: '성실하다고 늘지 않고, 일주일 쉬었다고 무너지지도 않는다.',
  body: [
    'AI가 문제를 더 빨리, 더 많이 푸는 시대에 사람에게 남는 것은 지구력이라고 생각합니다. 지금 내가 가진 것을 얼마나 쓰고 있는지 알고, 모르면 모른다고 정확히 말하고, 다시 부딪칠 체력과 담아둘 공간을 남겨 두는 것.',
    '수영을 계속하는 이유가 그렇습니다. 네 가지 영법을 다 한다고 잘하는 게 아니라, 몸의 각도와 물의 저항을 얼마나 쓰느냐가 실력입니다. 쉬면 나쁜 습관이 빠져 오히려 나아지기도 합니다. 물은 거짓말하지 않습니다.',
    '뜨개질도 도안대로 뜨는 일이 아닙니다. 코가 빠지면 지나온 줄을 다 풀고 다시 뜹니다. 한 코와 한 줄이 모여 옷이 되는 그 반복이 결과를 만듭니다.',
    '제가 짜는 코드도 같습니다. AI를 쓰되 직접 부딪치고, 과정에서 나온 것을 기록하고 관리합니다. 좋은 수치만 남기지 않고 무엇을 내주었는지까지 적는 이유입니다.',
  ],
}

export const strengths = [
  {
    n: '01',
    title: '반복을 절차로 바꾼다',
    body: '데스크마다 답이 다르다는 민원이 반복되면, 친절이 아니라 일관성이 문제입니다. 공통 답변과 인계 기준을 문서로 만들었고 반복 민원은 주 4~5회에서 0~1회로 줄었습니다.',
    proof: '한국마사회 2019–2021',
  },
  {
    n: '02',
    title: '무엇을 내주었는지 잰다',
    body: '프루닝으로 추론을 1.54배 당긴 대신 검증 손실이 약 12% 늘었습니다. 좋은 값만 쓰지 않고 그 손해까지 논문 표에 남겼습니다.',
    proof: 'TCN 이펙터 연구 · 논문 표3',
  },
  {
    n: '03',
    title: '정확도보다 멈추지 않는 것',
    body: 'Top-1 93.1%보다 어려운 것은 50시간 동안 한 번도 멈추지 않는 일이었습니다. GPU 추론만 분리하고, 캐싱하고, 실패하면 자동으로 되돌렸습니다.',
    proof: 'MeDeviSe · 786명 무장애',
  },
  {
    n: '04',
    title: '혼자서도 끝을 본다',
    body: '병원 요구사항 정리부터 기술 선택, 화면, 서버, 배포, 인수인계 문서까지 혼자 만들었습니다. 지금도 그 부서에서 쓰고 있습니다.',
    proof: '고려대학교병원 · 1인 개발 · 배포 유지 중',
  },
]

export const kpis: Metric[] = [
  { value: '6년 8개월', label: '고객 접점 현장 근속', note: '2019.10 – 2026.06 · 근무·학업 병행' },
  { value: '8', label: '완주한 프로젝트', note: '연구 1 · 실서비스 배포 5 · 1인 개발 1' },
  { value: '786', label: 'MeDeviSe 베타 실사용자', note: '50시간 연속 운영 · 장애 0건' },
  { value: '103', label: 'BowwoW_Care 실사용자', note: '3일 운영 · 장애 0건' },
  { value: '96,510', label: '학습 문장 (증강 후)', note: '2.1만 → 9.65만 · 유사도 필터링' },
  { value: '4~5 → 0~1', label: '주간 반복 민원 (회)', note: '층별 응대 매뉴얼 통일 후' },
]

export const projects: Project[] = [
  {
    id: 'medevise',
    index: '01',
    name: 'MeDeviSe',
    subtitle: '자연어 증상 기반 병원 추천 서비스',
    period: '2025.08 – 2025.09',
    org: '한국과학기술원 SW교육센터 · 2025년 서초 AI 칼리지',
    role: '팀장 / AI 서빙 · 백엔드 · 인프라 · 데이터 증강',
    team: '5인',
    domain: 'Infra',
    problem:
      '증상은 있는데 어느 진료과로 가야 할지 모르는 사람이 상급병원으로 몰립니다. 모델을 93.1%까지 올린 다음 더 어려운 문제가 남았습니다 — 베타 기간 동안 한 번도 멈추지 않는 것. 그런데 Fargate는 GPU를 지원하지 않았습니다.',
    did: [
      'GPU 추론 컨테이너만 g4dn EC2로 분리하고 앱은 Fargate에 둔 뒤, ALB 경로 라우팅으로 /ml/* 와 /api/* 를 가름',
      '같은 증상 문장은 Redis에 캐싱해, 추론이 느려져도 나머지 응답이 영향받지 않게 격리함',
      '배포 실패 시 자동 롤백하는 GitHub Actions 파이프라인과, 팀원 누구나 배포할 수 있는 절차서를 만듦',
      'KR-BERT를 포함한 한국어 모델 5종을 비교하고, LLM 1차 생성 후 유사도 필터링으로 2차 증강해 학습 문장을 9.65만으로 늘림',
    ],
    result: '50시간 실서비스 베타를 실사용자 786명과 함께 무장애로 마쳤습니다.',
    numbers: [
      { value: '0.931', label: 'Top-1 정확도' },
      { value: '0.990', label: 'Top-3 정확도' },
      { value: '0.930', label: 'F1-macro' },
      { value: '96,510', label: '학습 문장' },
    ],
    stack: ['FastAPI', 'KR-BERT', 'PostgreSQL(RDS)', 'Redis', 'Docker', 'AWS ECS · Fargate', 'EC2 g4dn', 'ALB', 'Auto Scaling', 'CloudWatch', 'GitHub Actions', 'Next.js · TS'],
    gained:
      'Top-1 0.931 · Top-3 0.990 · F1-macro 0.930, 학습 문장 2.1만에서 9.65만으로 증강. 50시간 베타를 실사용자 786명과 무장애로 마침. Fargate와 EC2 GPU를 갈라 붙이고 ALB 경로 라우팅·Redis 캐싱·자동 롤백까지 직접 구성해 봄.',
    limit:
      '베타 서비스에 맞게 프라이빗 서브넷에 SSM으로 전환했어야 하나, 단일 AZ에 퍼블릭 서브넷, SSH가 열려 있었음. 형태소 분석과 불용어를 지운 테스트에서 모델 성능 차이에 대한 증명을 해내지 못함.',
    images: [
      { src: 'img/p2_cloud_archi.jpg', caption: 'AWS 구성 — 앱(Fargate)과 GPU 추론(EC2 g4dn ASG) 분리' },
      { src: 'img/p2_ui.jpg', caption: '데이터 모델 — 증상·질환·병원·의료장비 16개 테이블' },
    ],
  },
  {
    id: 'bowwow',
    index: '02',
    name: 'BowwoW_Care',
    subtitle: '반려견 통합 헬스케어 플랫폼 · 졸업 캡스톤',
    period: '2025.02 – 2025.06',
    org: '한국외국어대학교 바이오메디컬공학부',
    role: '전체 팀장 / 인프라 · ML 서빙 · PM',
    team: '8인',
    domain: 'Backend',
    problem:
      '8명이 각자 다른 방식으로 작업하니 병합 충돌과 재작업이 반복됐습니다. 저는 현장 근무 후 저녁과 주말에만 팀을 운영할 수 있었습니다.',
    did: [
      '기능을 더 만들기 전에 기준부터 세움 — 메인(웹)·사료추천(AI)·챗봇(LangChain) 3개 서비스 컨테이너로 나누고 모니터링·보안을 먼저 붙임',
      'GitHub Actions Blue-Green 무중단 배포와 롤백 경로를 정하고, 배포 전후 체크리스트를 문서로 남김',
      'GPT-4 API와 LangChain으로 증상 추출 → 질병 매핑 → 응답 생성 체인을 구성함',
      'AAFCO·NRC 영양 기준을 규칙 필터에 넣고 다중 스코어링으로 사료를 추천함',
    ],
    result:
      '8개 기능을 통합해 배포했고, 3일 운영 · 실사용자 103명 동안 장애가 0건이었습니다. 장애가 없었던 것은 운이 아니라 체크리스트와 롤백 경로 덕분입니다.',
    numbers: [
      { value: '78%', label: '증상 추출 precision' },
      { value: '60%', label: '챗봇 Top-1 정확도' },
      { value: '0.72', label: '사료 추천 NDCG' },
      { value: '0건', label: '운영 장애' },
    ],
    stack: ['Next.js', 'FastAPI', 'WebSocket', 'Redis · Celery', 'GPT-4 · LangChain', 'AWS ECS Fargate', 'Blue-Green', 'WAF · VPC', 'Nginx', 'JWT'],
    gained:
      '8개 기능을 하나로 통합해 배포, 3일 운영·실사용자 103명·장애 0건. 증상 추출 precision 78%, 사료 추천 Precision 0.67 · NDCG 0.72 · Calibration 0.93. 8인 팀을 사람이 아니라 절차(체크리스트·롤백 경로)로 굴려 봄.',
    limit:
      '챗봇 Top-1은 60%에 머물렀습니다. MSA 설계이나 실제 베타 서비스 배포 당시 LLM 호출 시간이 오래 걸려 답변이 너무 늦어졌고, 기존 답변과 유사한 병명으로 추정될 시 이전 답변을 S3에서 가져오는 방식으로 우회함. 실시간 LLM 호출과 응답 시간을 줄이는 방식을 더 고민해 보는 계기가 됨.',
    images: [
      { src: 'img/p3_cloud_archi.jpg', caption: '클라우드 구성 — 3개 서비스 컨테이너 분리와 무중단 배포' },
      { src: 'img/p3_sys_archi.jpg', caption: '시스템 구성 — 8개 기능과 데이터 흐름' },
    ],
  },
  {
    id: 'tcn',
    index: '03',
    name: 'Guitar Effects Emulation',
    subtitle: 'TCN 기반 기타 이펙터 실시간 에뮬레이션 · 팀장',
    period: '2024.10 – 2024.12',
    org: '한국외국어대학교 컴퓨터공학부 인공지능특강 팀 프로젝트',
    role: '팀장 / 모델 설계 · 전처리 · 손실함수 · 경량화',
    team: '3인',
    domain: 'AI',
    problem:
      'WaveNet은 음질은 좋지만 평균 추론 0.0055초, SNR -3.58dB로 실시간과 거리가 멀었습니다. 데이터도 없었습니다 — 공개 데이터셋은 브랜드·세팅·길이가 제각각이라 1차 회의에서 주제 변경까지 검토했습니다.',
    did: [
      '팀원이 각자 클린 톤을 90분씩 녹음하고 소프트웨어 이펙터로 페어 데이터를 직접 만듦',
      '수용 영역이 짧을수록 빠르다는 근거로 WaveNet에서 TCN으로 구조를 전환함',
      'RMS 정규화 · Cross-Correlation 동기화 · STFT 전처리 · 50% 오버랩 세그먼트로 입출력 정합성을 맞춤',
      'MSE + STFT + Perceptual(Mel) 손실을 결합하고, L1 프루닝 약 20% 후 5에폭 파인튜닝함',
    ],
    result:
      'SNR을 -3.58dB에서 +2.10dB로, 평균 추론을 0.0055초에서 0.0013초로 줄였습니다. 최종 발표에서 교수평가 팀점수 12.5/15로 5개 팀 중 1위를 받았습니다.',
    numbers: [
      { value: '+2.10dB', label: 'SNR (−3.58dB에서)' },
      { value: '0.0013s', label: '평균 추론 (0.0055s에서)' },
      { value: '0.96M', label: '파라미터 (1.20M에서)' },
      { value: '12.5/15', label: '교수평가 · 5팀 중 1위' },
    ],
    stack: ['PyTorch', 'torchaudio', 'librosa', 'numpy · scipy', 'TCN', 'WaveNet', 'L1 Pruning', 'STFT'],
    gained:
      'SNR −3.58dB → +2.10dB, 평균 추론 0.0055s → 0.0013s, 파라미터 1.20M → 0.96M. 교수평가 팀점수 12.5/15로 5팀 중 1위. 프루닝 뒤 검증 손실이 0.0092에서 0.0103으로 약 12% 늘어난 것까지 표에 남겨, 속도를 얻고 무엇을 내주었는지를 기록으로 만듦.',
    limit:
      '노이즈 게이트는 학습을 악화시켜 적용하지 못했고, 단일 이펙터·단일 설정값 조건만 학습시켰음.',
  },
  {
    id: 'precepter',
    index: '04',
    name: '프리셉터 체크리스트',
    subtitle: '신규간호사 교육 체크리스트 웹앱 · 1인 개발 · 실사용 중',
    period: '2026.04 – 2026.06',
    org: '고려대학교병원 간호행정부',
    role: '1인 개발 / 요구사항 · 설계 · 프론트 · GAS 서버 · 배포 · 문서',
    team: '1인',
    domain: 'Product',
    problem:
      '종이 체크리스트는 역할별 권한 분리, 서명, 집계, 보관이 모두 번거롭습니다. 병원 조건은 두 가지였습니다 — 최종 출력물은 기존 엑셀 양식과 디자인이 같아야 하고, 별도 서버나 SQL 같은 무거운 백엔드는 피할 것.',
    did: [
      'GitHub Pages 정적 배포에 맞춰 Next.js 대신 Vite + React를 고르고, 이유를 technical-decision.md에 남김',
      'Google Drive를 직접 부르는 대신 Apps Script를 중간 서버로 두어 OAuth·권한 문제를 피함',
      '프리셉터가 1명일 수도 2명일 수도 있어, 문항별 담당자를 저장하지 않고 역할이 평가하는 구조로 설계를 바꿈',
      'ExcelJS로 원본 템플릿에 점수·서명 이미지를 그대로 채워 넣고, 미답변 문항이 있으면 제출을 막음',
    ],
    result:
      '실제 병원 부서에서 사용 중이며 배포를 유지하고 있습니다. 비개발자 담당자가 이어받을 수 있도록 작업 가이드와 개발 히스토리까지 남겼습니다.',
    numbers: [
      { value: '4개', label: '역할별 권한 분리' },
      { value: '158 / 82', label: '4주 / 8주 문항 수' },
      { value: '28', label: '커밋' },
      { value: '6종', label: '인수인계 문서' },
    ],
    stack: ['React 19', 'TypeScript', 'Vite 8', 'Tailwind v4', 'ExcelJS', 'signature_pad', 'Google Apps Script', 'GitHub Pages'],
    gained:
      '요구사항 정리부터 기술 선택·개발·배포·인수인계 문서까지 1인으로 완주. 역할 4개 권한 분리, 4주 158문항·8주 82문항, 28 커밋, 인수인계 문서 6종. 실제 병원 부서에서 사용 중이고 배포를 유지하고 있음.',
    limit:
      '실 사용자의 기술요구서에 맞게 개발하는 것이 어려웠음. 같은 신규간호사라도 부서 입력이 다르거나 성명에 공백이 있으면 Drive 폴더가 둘로 갈리는 등 비효율적인 DB 운영과 방식, 로그 미작성 등으로 경량화 우선시 및 기술요구서에 나온 대로 개발하는 것을 최우선으로 하여 효율성·운영·유지 방면에서 이를 맞춰가는 것이 어려웠음. 개발자 시선의 효율·안정성과 실제 사용자가 쓸 방식, 이 갭 차이를 맞추는 데서 경험을 얻게 됨.',
    link: { label: 'yoonju977.github.io/precepter_checklist', href: 'https://yoonju977.github.io/precepter_checklist/' },
  },
  {
    id: 'hanium',
    index: '05',
    name: '원스톱 말 등록 서비스',
    subtitle: 'Vision AI 개체식별 기반 등록 디지털화 · 2025 한이음 드림업',
    period: '2025.04 – 2025.10',
    org: '과학기술정보통신부 주최 · 한국마사회 연계',
    role: '등록·조회 API, DB/ETL, 보안·배포·운영 + 모델 서빙·검증 참여',
    team: '멘티 5인 + 멘토 1',
    domain: 'Backend',
    problem:
      '말 등록과 이력 관리가 수기·우편 중심이라 정보 신뢰성과 동물복지에 사각지대가 있었습니다. 팀원 대부분은 영상 인식 모델을 만들고 싶어 했고, 인식 결과를 실제 등록 시스템과 DB로 연결할 사람이 필요했습니다.',
    did: [
      '저도 모델 개발을 하고 싶었지만 팀 결과를 위해 연결 역할을 맡음',
      '인식 결과를 등록·조회 API와 DB/ETL로 잇고 인증·보안·배포·운영 구조를 만듦',
      '팀이 6개 모델을 테스트해 3개로 좁히는 동안 서빙과 검증(QA)에 참여함',
      '한국마사회 현장에서 6년을 일한 경험으로 등록 업무의 예외 상황을 정리함',
    ],
    result:
      '사진·영상 업로드만으로 특징을 인식하고 중복을 검증해 개체 ID를 부여하는 흐름을 만들었고, 등록 처리 시간이 수 일에서 수 분으로 줄었습니다.',
    numbers: [
      { value: '수 일 → 수 분', label: '등록 처리 시간' },
      { value: '7개월', label: '수행 기간' },
      { value: '18개', label: '표준 촬영 부위' },
      { value: '6 → 3', label: '모델 테스트 → 선정' },
    ],
    stack: ['AWS Cloud9', 'Ubuntu · GPU 워크스테이션', 'REST API', 'ETL', 'SegFormer · YOLOv5(팀)', 'Git · SVN · Confluence'],
    gained:
      '등록 처리 시간을 수 일에서 수 분으로 줄임. 7개월 수행, 표준 촬영 부위 18개, 모델 6개 테스트 후 3개 선정. 실제 기업체 데이터를 활용하여 전반적인 AI 모델링 역할과 서비스 개발·배포·운영을 경험해 볼 수 있었음.',
    limit:
      '포스터 발표는 했으나 학회 논문을 제출하지 못함. 역할 분담에서 AI 모델링에 참여하고 싶었으나 백엔드 경험이 있는 팀원이 한정적이라 AI 담당 역할에 직접적인 참여는 어려웠음. 멘토님께 요청하여 AI 모델링 과정에서의 부분적인 보조 역할을 받아 추후 성능 업스케일에 도움을 줌.',
  },
  {
    id: 'hunsuking',
    index: '06',
    name: '훈수왕',
    subtitle: 'AI가 훈수를 두는 질문 커뮤니티 · 백엔드 팀장',
    period: '2024.08 – 2024.09',
    org: '넥스트러너스 OZ 코딩스쿨 최종 프로젝트',
    role: '백엔드 팀장 / CD · AWS 환경 구축 · 서버 테스트 · 유저 기능',
    team: '6인 (FE 3 · BE 3)',
    domain: 'Backend',
    problem:
      '채택된 질문에 GPT-4o mini가 추가 답변을 다는 커뮤니티를 5주 안에 배포해야 했습니다. 기능이 도는 것과 부하를 견디는 것은 다른 문제였습니다.',
    did: [
      'EC2 · S3 · RDS · Jenkins(CD) · ELB · CloudFront · Route53 · ACM으로 배포·HTTPS 환경을 구축함',
      'Locust로 부하 테스트를 두 번 돌려 어디서 무너지는지 찾음',
      '게시글 CRUD · 댓글 · 채택 · 알림 · 태그 · 검색 등 메인 유저 기능을 구현함',
      '단위 테스트를 붙여 전체 커버리지 81%까지 올림',
    ],
    result:
      '배포한 서비스가 동시 사용자 30명까지 실패 0건으로 버텼고, 90명 구간부터 실패가 시작되는 지점을 기록으로 남겼습니다.',
    numbers: [
      { value: '81%', label: '단위 테스트 커버리지' },
      { value: '30명', label: '동시 접속 실패 0건' },
      { value: '90명', label: '실패 시작 지점' },
      { value: '11개', label: 'DB 스키마' },
    ],
    stack: ['Django · DRF', 'PostgreSQL', 'Docker · Poetry', 'Jenkins', 'Locust', 'AWS EC2 · S3 · RDS', 'CloudFront · Route53', 'GitHub Actions'],
    gained:
      '단위 테스트 전체 커버리지 81%(2,829 statements), 동시 30명 실패 0건, DB 스키마 11개를 5주 안에 배포까지. EC2·S3·RDS·Jenkins·ELB·CloudFront·Route53·ACM으로 배포와 HTTPS 환경을 직접 세워 봄.',
    limit:
      '인증 관련 뷰의 커버리지는 마감 안에 올리지 못함. 실제 베타 서비스 당시 Locust 테스트 때와 다른 유저 로그 양상이 보여, 이후 QA 테스트와 실제 유저의 행동성이 다를 수 있다는 것을 깨닫게 됨.',
    images: [{ src: 'img/p5_notify.jpg', caption: '알림 처리 로직' }],
  },
  {
    id: 'hancycle',
    index: '07',
    name: '한바퀴',
    subtitle: '장기 여행자 지역 정보 커뮤니티 · 첫 팀장',
    period: '2024.07 – 2024.08',
    org: '넥스트러너스 OZ 코딩스쿨',
    role: '전체 팀장 겸 백엔드 팀장 / TDD · CI/CD · 검색 · 스크래핑',
    team: '7인 (FE 4 · BE 3)',
    domain: 'Backend',
    problem:
      'API 명세를 먼저 합의하는 규칙을 세웠는데도 백엔드 팀원 간 진도 차이가 벌어졌습니다. 마감이 다가오자 제가 팀원 코드를 직접 고치기 시작했습니다.',
    did: [
      'pytest 기반 TDD와 flake8 · black · isort 코드 컨벤션을 팀 규칙으로 잡음',
      'GitHub Actions CI/CD로 EC2 배포를 자동화함',
      'Elasticsearch 검색, BeautifulSoup·Selenium 도시정보 스크래핑, crontab 기상청 날씨 자동화를 구현함',
      '4주 동안 18회 회의를 돌리며 6개 앱을 나눠 관리함',
    ],
    result:
      '결과물은 기한 안에 배포했습니다. 다만 “제가 빠지면 멈추는 구조”를 만들었다는 것이 남았고, 이후 캡스톤에서는 제가 아니라 절차가 품질을 지키게 바꿨습니다.',
    numbers: [
      { value: '7인', label: '팀 규모 · 첫 팀장' },
      { value: '4주', label: '개발 기간' },
      { value: '18회', label: '팀 회의' },
      { value: '6개', label: 'Django 앱' },
    ],
    stack: ['Python 3.11', 'Django 4.2 · DRF', 'PostgreSQL 15', 'Elasticsearch 7.17', 'JWT · Swagger', 'Docker', 'AWS EC2 · RDS · S3', 'BeautifulSoup · Selenium'],
    gained:
      '7인 팀의 첫 전체 팀장으로 4주·회의 18회를 돌려 기한 안에 배포. Django 앱 6개를 나눠 관리하고, pytest TDD와 코드 컨벤션을 팀 규칙으로 세워 봄.',
    limit:
      '마감이 다가오자 팀원 코드를 직접 고쳐 “제가 빠지면 멈추는 구조”를 만들었음. 이후 캡스톤에서는 절차가 품질을 지키게 바꿨고, 지금 규칙은 고치기 전에 원인과 수정 이유를 기록하고 담당자에게 넘기는 것.',
  },
  {
    id: 'aimers',
    index: '08',
    name: 'LG Aimers 5기',
    subtitle: '제품 이상 여부 판별 해커톤 · LG디스플레이 실데이터',
    period: '2024.07 – 2024.08',
    org: 'LG AI연구원',
    role: '앙상블 모델 테스팅 · 최종 제출 모델 구성',
    team: '5인',
    domain: 'AI',
    problem:
      'Auto clave, Dam dispensing, Fill dispensing 등 서로 다른 공정에서 나온 정형 데이터를 합쳐 이상을 탐지해야 했습니다.',
    did: [
      'Phase I 온라인 교육(ML 개론·지도학습·딥러닝·제조 데이터 분석·품질경영·AI 윤리)을 이수함',
      '여러 앙상블 조합을 테스트하고 공정별 데이터를 결합하는 구성을 검증함',
      '최종적으로 XGBoost + RandomForest 앙상블을 제출함',
    ],
    result: 'Phase II 온라인 해커톤에 팀으로 참가해 최종 제출을 완료했습니다.',
    numbers: [
      { value: '5인', label: '팀 규모' },
      { value: '2개월', label: '교육 + 해커톤' },
      { value: '4종', label: '공정 데이터' },
    ],
    stack: ['XGBoost', 'RandomForest', 'scikit-learn', 'pandas'],
    gained:
      'Phase I 교육을 이수하고 Phase II 온라인 해커톤에 5인 팀으로 참가해 최종 제출까지 마침. 여러 앙상블 조합을 테스트해 XGBoost + RandomForest 구성을 골랐고, 4종 공정 데이터를 결합한 이상 탐지를 다뤄 봄.',
    limit:
      '오프라인으로 대면할 기회가 없어 온라인으로만 팀 구성 및 활동을 하였으나, 그럼에도 불구하고 다들 열정적으로 참여. 그러나 아쉽게도 결승에는 오르지 못함.',
  },
]

export const stackMatrix = [
  {
    area: '백엔드',
    items: ['Python', 'Django · DRF · ORM', 'FastAPI · Pydantic', 'WebSocket', 'Celery + Redis', 'REST API 설계'],
    proof: 'MeDeviSe · BowwoW_Care · 훈수왕 · 한바퀴 · 한이음',
  },
  {
    area: '인프라 · 클라우드',
    items: ['AWS ECS(Fargate/EC2)', 'ECR · RDS · S3 · ALB', 'Route53 · ACM · WAF', 'Auto Scaling · CloudWatch', 'CloudFormation', 'Nginx'],
    proof: '배포·운영 4건 · AWS SAA(SAA-C03) 2026.09',
  },
  {
    area: 'CI/CD · 운영',
    items: ['GitHub Actions', 'Blue-Green 무중단 배포', '자동 롤백', 'Jenkins', 'Docker · Compose', 'Locust 부하 테스트'],
    proof: 'MeDeviSe · BowwoW_Care · 훈수왕',
  },
  {
    area: '데이터 · DB',
    items: ['PostgreSQL', 'Redis', 'ERD 설계', 'ETL', '공공 API(심평원 · 마사회)', 'SQL'],
    proof: 'SQLD 2025.06 · 스키마 11개(훈수왕) · 15+ 테이블(MeDeviSe)',
  },
  {
    area: '딥러닝',
    items: ['PyTorch · torchaudio', 'TCN · WaveNet', 'KR-BERT · KoBERT · KLUE-RoBERTa', '형태소 분석', '프루닝 · 파인튜닝', 'GPT-4 · LangChain'],
    proof: 'TCN 팀 프로젝트 팀장 · MeDeviSe 5종 비교 · BowwoW_Care 체인',
  },
  {
    area: '프론트 · 협업',
    items: ['React 19 · TypeScript', 'Vite · Tailwind', 'Next.js', 'Git · SVN', 'Swagger · Redoc', 'Notion · Confluence · Figma'],
    proof: '프리셉터 체크리스트(실사용) · 전 프로젝트',
  },
]

export const timeline = [
  {
    period: '2026.01 – 2026.06',
    title: '놀라운지 고객접점 CS팀 매니징',
    org: '한국마사회 서울고객안전부',
    body: '코로나 이후 매뉴얼이 사라졌던 외국인 안내를 디지털화하고, 한·중·일 3개 언어 안내 멘트 가이드와 이벤트 QR 팜플렛, 초보 고객용 승식 안내·구매존 배치를 만듦.',
  },
  {
    period: '2024.03 – 2026.01',
    title: '회원실 발권 · 주간 스크럼 운영',
    org: '한국마사회 서울고객안전부',
    body: '매뉴얼상 불가였던 쿠폰 고객 좌석 변경을 전산·운영 제한 확인 후 기준을 재정립함. 매니저 부재 시 응대가 지연되는 문제는 주 1회 5분 스크럼으로 1년 3개월 유지했음.',
  },
  {
    period: '2019.10 – 2021.10',
    title: '중앙안내 · 층별 데스크 순환',
    org: '한국마사회 서울고객안전부',
    body: '데스크마다 다르던 응대 기준을 공통 매뉴얼로 문서화·통일함. 해당 데스크 반복 민원이 주 4~5회에서 0~1회로 줄었음.',
  },
]

export const education = [
  { period: '2025.04 – 2025.09', name: '2025년 서초 AI 칼리지 (22주)', org: '한국과학기술원 SW교육센터', note: '수료증 제10919호' },
  { period: '2025.04 – 2025.10', name: '한이음 드림업 ICT멘토링', org: '과기정통부 · IITP · 한국정보산업연합회', note: '수행확인서' },
  { period: '2024.03 – 2024.09', name: '초격차 캠프 백엔드 코스 (960시간)', org: '넥스트러너스 · K-Digital Training', note: '고용24 직업훈련이력 확인원' },
  { period: '2024.07 – 2024.08', name: 'LG Aimers 5기 Data Intelligence', org: 'LG AI연구원', note: '이수증 2종' },
  { period: '2017.03 – 2025.08', name: '한국외국어대학교 바이오메디컬공학부 공학사', org: '부전공 컴퓨터·전자시스템공학', note: '재직 중 병행' },
]

export const certs = [
  { name: 'AWS Certified Solutions Architect – Associate', date: '2026.09', org: 'Amazon Web Services' },
  { name: 'SQL 개발자 (SQLD)', date: '2025.06', org: '한국데이터산업진흥원' },
  { name: 'TOEIC Speaking 150 · Intermediate High', date: '2025.02', org: 'YBM' },
  { name: '한국사능력검정시험 2급', date: '2021.08', org: '국사편찬위원회' },
]
