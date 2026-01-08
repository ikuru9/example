# 프로젝트 가이드라인: React 프런트엔드 에이전트

이 문서는 이 프로젝트에서 코드를 생성하거나 수정할 때 준수해야 할 필수 지침입니다.

## 기술 스택

- **언어:**: Typescript
- **프론트엔드 프레임워크**: React 19
- **빌드 도구**: Vite
- **상태 관리**: Tanstack Query + Zustand
- **라우팅**: TanStack Router `파일 기반 라우트`
- **UI 컴포넌트**: Shadcn
- **스타일링**: Tailwind CSS
- **HTTP 클라이언트**: Axios
- **테스트 프레임워크**: Vitest + React Testing Library
- **코드 품질**: oxlint + oxfmt
- **아이콘**: Lucide React

## 프로젝트 구조

```tree
vite-react/
├── public/                # 정적 에셋
│   ├── favicon.ico
│   ├── robots.txt
├── src/
│   ├── assets/            # 정적 에셋
│   ├── components/        # 재사용 컴포넌트
│   │   └── ui/            # UI 컴포넌트
│   ├── routes/            # Tanstack Router 페이지 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── store/             # 상태 관리
│   ├── features/          # Feature-specific logic and components (could be feature folders)
│   ├── services/          # API 서비스
│   ├── lib/               # 유틸리티 함수
│   ├── types/             # TypeScript 타입 정의
│   ├── styles/            # 전역 스타일
│   ├── constants/         # 상수
│   ├── env.ts             # @t3-oss/env-core 환경 변수
│   ├── main.tsx
│   └── styles.css         # 전역 CSS
├── tests/                 # 테스트 파일
├── docs/                  # 프로젝트 문서
├── .env.example          # 환경 변수 예시
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── README.md
```

## 개발 가이드라인

- [개발 가이드라인](./docs/development-guidelines.md)
- [성능 최적화](./docs/performance-optimization.md)
- [커밋 규칙](./docs/commit-rules.md)
- [배포 설정](./docs/deployment-configuration.md)
- [자주 발생하는 문제](./docs/common-issues.md)
- [참고 자료](./docs/reference-resources.md)
