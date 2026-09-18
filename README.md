# 송윤주 포트폴리오 웹 (portfolio_web)

라이트 테마 · 플랫 포스터 일러스트. **수영(레인) → 뜨개(편물) → 쉘(kubectl)** 하나의 시나리오로 읽히는 1인 포트폴리오.

## 스택
React 19 · TypeScript · Vite · Tailwind CSS v4 · GSAP(ScrollTrigger) · Canvas 2D

## 내용 수정은 여기 한 파일만
`src/data/profile.ts` — 이름, 한 줄 정의, 강점, KPI, 프로젝트 8건, 기술 매트릭스, 경력 타임라인, 교육, 자격.
화면 코드를 건드리지 않고 이 파일만 고치면 사이트가 바뀝니다.
터미널(파드/컨테이너) 문구는 `src/components/Terminal.tsx` 상단 `LINES` 배열에 있습니다.

## 시나리오 (스크롤 순서)
| 구간 | 장치 | 파일 |
|---|---|---|
| 히어로 | 레인 한 면, 한 사람이 계속 위로 간다 | `components/HeroPool.tsx`, `lib/pool.ts` |
| 01 지구력 | 편물 배경 + 풀린 실 한 가닥 | `components/Knit.tsx` |
| 03 프로젝트 | 레인 8개 = 프로젝트 8건. 읽어 내려갈수록 완주자가 늘고, 완주 수만큼 편물이 두 줄씩 떠진다 | `components/LaneBoard.tsx`, `components/Works.tsx` |
| 06 지금 | 완주 = Running. `kubectl get pods`로 song-yoonju 파드와 강점 컨테이너 6개 | `components/Terminal.tsx` |

레인 진행도는 각 프로젝트 행의 화면 위치로 계산합니다(`Works.tsx`의 `measure`).
모든 애니메이션은 `prefers-reduced-motion`이면 정지 프레임으로 떨어지고, 화면 밖에서는 rAF를 멈춥니다.

## 실행
```bash
npm install
npm run dev      # 로컬 미리보기
npm run build    # dist/ 생성
```

## 배포 두 가지
1. **Claude 아티팩트** — `dist/index.html`에서 `<head>`/`<body>` 안쪽만 꺼내 `artifact.html`로 만들고 `public/img`와 함께 게시. (현재 게시본)
2. **GitHub Pages / Vercel** — 이 폴더를 저장소로 올려 빌드 배포. `vite.config.ts`의 `base`를 저장소명에 맞게.

## 이 페이지의 원칙
- 논문 표·포스터·증명서로 확인되는 수치만 적는다.
- 증빙 없는 수상·순위는 넣지 않는다 (캡스톤 '은상', LG Aimers 순위 제외).
- 프로젝트마다 "잃은 것 · 남은 한계"를 함께 적는다.
- 전화번호·주소는 공개 페이지에 넣지 않는다 (이메일·GitHub만).
