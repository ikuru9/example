# AGENTS.md - 에이전트 코딩 가이드

이 저장소는 React 애플리케이션을 위한 **pnpm 모노레포**입니다. 변경 시 다음 규칙을 따르세요.

## 📁 저장소 구조

```
example/
├── apps/
│   ├── next-ts/          # Next.js 16 앱 (App Router)
│   └── vite-react/       # Vite 7 + TanStack Router
├── core/
│   └── utility/          # 공통 유틸리티
└── [workspace 설정 파일들]
```

**패키지 명명:** 모든 패키지는 `@example/*` 스코프를 사용합니다.

## 🚀 필수 명령어

### 워크스페이스 관리

```bash
# 의존성 설치
pnpm install

# 특정 패키지용 명령어 실행
pnpm -F=@example/next-ts [command]
pnpm -F=@example/vite-react [command]
pnpm -F=@example/utility [command]

# 루트 워크스페이스 단축키
pnpm next-ts [command]  # → pnpm -F=@example/next-ts
pnpm vite-react [command] # → pnpm -F=@example/vite-react
```

### 개발 서버

```bash
# Next.js 앱 (포트 3000)
pnpm next-ts dev

# Vite React 앱 (포트 3000)
pnpm vite-react dev
```

### 빌드 및 테스트 명령어

```bash
# Next.js
pnpm next-ts build
pnpm next-ts start
pnpm next-ts lint

# Vite React
pnpm vite-react build     # vite build + tsc 실행
pnpm vite-react preview    # 프로덕션 빌드 미리보기
pnpm vite-react test       # Vitest 테스트 실행
```

### 단일 테스트 파일 (Vite React)

```bash
# 특정 테스트 파일 실행
pnpm vite-react test Button.test.tsx
# 워치 모드
pnpm vite-react test Button.test.tsx --watch
```

### 코드 품질

```bash
# 전체 저장소 린트
pnpm lint

# 전체 저장소 포맷팅
pnpm fmt

# 스테이징된 파일만 린트 (커밋 전 실행)
pnpm lint:staged
pnpm fmt:staged
```

## 🔧 개발 도구

### Linting & Formatting

- **Linter:** oxlint (fast, ESLint-compatible)
- **Formatter:** oxfmt
- **Git Hooks:** lefthook (auto lint/format on commit)

### Testing

- **Vite React:** Vitest + @testing-library/react
- **Test files:** `*.test.tsx` or `*.spec.tsx`
- **Test location:** `tests/components/ui/` (mirrors source structure)

### TypeScript

- **Version:** TypeScript 5 with `strict: true`
- **Path Aliases:** `@/*` in both apps, `#/*` additional in Next.js
- **Test files:** `any` types allowed in test files

## 📝 커밋 규칙

Use **conventional commits** (enforced by commitlint):

- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring
- `style:` - Code style changes (no logic impact)
- `test:` - Test additions/changes
- `docs:` - Documentation
- `chore:` - Build process/dependency updates
- `perf:` - Performance improvements
- `wip:` - Work in progress

## ⚡ 에이전트를 위한 빠른 시작

1. **Navigate to correct app:** `cd apps/next-ts` or `cd apps/vite-react`
2. **Install deps:** `pnpm install` (from root if needed)
3. **Run dev server:** `pnpm dev`
4. **Make changes** following patterns above
5. **Check linting:** `pnpm lint` (runs automatically on commit)
6. **Run tests:** `pnpm test` (Vite React only)

## 🚫 중요 제한사항

- **NO `npm` or `yarn`** - use `pnpm` only (enforced by engines)
- **NO `@ts-ignore` or `as any`** in production code
- **NO bypassing git hooks** - they ensure code quality
- **NO direct style edits** to visual components - delegate visual changes to frontend-ui-ux-engineer agent
- **ALWAYS** use path aliases instead of relative imports
- **ALWAYS** run `lsp_diagnostics` on changed files before completion

## 🔍 검증 체크리스트

Before completing any task:

- [ ] `lsp_diagnostics` shows no errors on changed files
- [ ] `pnpm lint` passes (if applicable)
- [ ] Tests pass (if test changes made)
- [ ] Build succeeds (if build changes made)
- [ ] Following existing import/alias patterns
- [ ] Components use `cn()` utility for classes
