# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Python Playground Frontend - A React + TypeScript + Vite application for interactive coding exercises with real-time evaluation. Students select subjects/units/problems, write Python code in Monaco Editor, submit for backend evaluation, and receive detailed test results with a progressive 4-level hint system.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:5173)
npm run dev

# Type checking (run before committing)
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check

# Production build
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

Required environment variable in `.env`:

```bash
# Development (local backend)
VITE_API_URL=http://localhost:49000

# Production (current Render deployment)
VITE_API_URL=https://enrenderback-1.onrender.com
```

**Important**:
- Vite embeds `VITE_*` variables at build time. Change `.env` and rebuild for different environments.
- The `.env` file is gitignored - copy from `.env.example` and modify as needed.
- Current production backend: `https://enrenderback-1.onrender.com`

## Architecture

### Component Hierarchy

```
App.tsx (root)
├── LanguageLogo (dynamic logos based on subject)
├── Playground (student interface - tab 1)
│   ├── Subject/Unit/Problem selectors (3-level hierarchy)
│   ├── Monaco Editor (code editing)
│   ├── Hint system (4 progressive levels)
│   ├── Anti-cheating system (anti-paste + tab monitoring)
│   └── Results display (public tests detailed, hidden tests outcome-only)
└── AdminPanel (instructor interface - tab 2)
    ├── Statistics summary
    ├── Recent submissions table
    └── Per-problem breakdown
```

### State Management

No Redux/Zustand - uses React hooks (useState, useEffect, useCallback, useRef).

**Key state locations:**
- `Playground.tsx`: Subjects, units, problems, code editor content, submission results, polling status, hint levels
- `App.tsx`: Active tab, selected subject ID (for logo sync)
- `AdminPanel.tsx`: Summary stats, submissions list

### Data Flow

1. **Hierarchical loading**: Subjects → Units (when subject selected) → Problems (when unit selected)
2. **Code persistence**: Editor content auto-saved to localStorage (key: `playground-code-${problemId}`)
3. **Submission flow**: POST `/api/submit` → Poll GET `/api/result/${jobId}` every 1s → Display results
4. **Polling management**: Uses AbortController + setTimeout refs for cleanup to prevent memory leaks

### API Integration

All API calls via axios from `src/config.ts` using `API_BASE_URL`:

```typescript
// Hierarchy endpoints
GET ${API_BASE_URL}/api/subjects
GET ${API_BASE_URL}/api/subjects/${subjectId}/units
GET ${API_BASE_URL}/api/subjects/${subjectId}/units/${unitId}/problems

// Submission endpoints
POST ${API_BASE_URL}/api/submit
  Body: { problem_id, code, student_id }
  Returns: { job_id, status }

GET ${API_BASE_URL}/api/result/${jobId}
  Returns: { status, score_total, score_max, test_results[], ... }

// Admin endpoints
GET ${API_BASE_URL}/api/admin/summary
GET ${API_BASE_URL}/api/admin/submissions?limit=20
```

### Type System

All API types defined in `src/types/api.ts`:
- `Subject`, `Unit`, `Problem`, `ProblemMetadata`
- `SubmissionResult`, `TestResult`, `TestOutcome`, `TestVisibility`
- `AdminSummary`, `Submission`, `ProblemStats`

**Critical types:**
- `TestVisibility`: `'public' | 'hidden'` - public tests show full details, hidden tests only show pass/fail
- `SubmissionStatus`: `'pending' | 'queued' | 'running' | 'completed' | 'failed' | 'timeout' | 'error'`

### Anti-Cheating Features

Located in `Playground.tsx`:

1. **Anti-paste system** (lines ~400-450):
   - Blocks Ctrl+V, Cmd+V, right-click paste
   - Shows educational banner when blocked
   - Allows typing code manually

2. **Tab monitoring system** (lines ~54-130):
   - Tracks `visibilitychange` events
   - 2 warnings before lockout
   - Blocks common shortcuts (Ctrl+T, Ctrl+N, Ctrl+W)
   - Shows `beforeunload` prompt to prevent easy tab closing

**Important**: Anti-cheating hooks run in `useEffect`, cleanup functions prevent multiple alerts.

### Dynamic Logos

`LanguageLogo.tsx` renders different logos based on `subjectId`:
- `programacion-1`: Python
- `programacion-2`: Java
- `programacion-3`: Spring Boot
- `programacion-4`: FastAPI
- `paradigmas`: Java + SWI-Prolog + Haskell (3 logos side-by-side)
- `frontend`: HTML5 + CSS3 + JavaScript + TypeScript (4 logos)
- `backend`: Python + FastAPI (2 logos)
- `algoritmos`: PSeInt (flowchart diagram)

Multi-logo subjects use flexbox with gap for layout.

## Code Style

### ESLint Configuration

- No unused vars (warn with `_` prefix allowed)
- `no-console` allows warn/error/info only
- React hooks rules enforced
- TypeScript `any` discouraged (warn)

### Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100
}
```

**Key convention**: No semicolons, single quotes, 100 char line width.

## Common Development Patterns

### Adding a new API endpoint

1. Define types in `src/types/api.ts`
2. Make axios call with `${API_BASE_URL}/api/...`
3. Handle errors with try/catch and AxiosError type
4. Update loading states before/after request

### Adding a new component

1. Create in `src/components/ComponentName.tsx`
2. Define props interface: `interface ComponentNameProps { ... }`
3. Import types from `src/types/api.ts` as needed
4. Export default component

### Monaco Editor configuration

Located in `Playground.tsx`:
- Language: `python`
- Theme: `vs-dark`
- Options: minimap disabled, fontSize 14, lineNumbers on, automaticLayout enabled
- onChange handler updates code state and localStorage

### Polling pattern

```typescript
const pollResult = useCallback(async (jobId: string) => {
  pollingControllerRef.current = new AbortController()
  // Recursive polling with 1s delay
  // Stop when status is terminal (completed/failed/error/timeout)
  // Cleanup with AbortController on unmount
}, [])
```

Always cleanup polling refs in useEffect return function.

## Testing Checklist

Before committing changes:

1. Run `npm run type-check` - must pass with zero errors
2. Run `npm run lint` - fix all errors, address warnings
3. Run `npm run format:check` - auto-fix with `npm run format` if needed
4. Test in development: navigation, editor, submission, polling, hints, anti-cheat
5. Verify localStorage persists code between reloads
6. Check console for errors/warnings

## Build and Deployment

```bash
# 1. Set production API URL in .env
# Edit .env file or run:
echo "VITE_API_URL=https://enrenderback-1.onrender.com" > .env

# 2. Build
npm run build

# 3. Output in dist/ directory
# Deploy dist/ to static hosting (Vercel, Netlify, S3, etc.)

# 4. Optional: Preview locally
npm run preview
```

**Production deployment checklist**:
1. Ensure `.env` has correct `VITE_API_URL` (currently: `https://enrenderback-1.onrender.com`)
2. Run `npm run type-check` and `npm run lint` to catch errors
3. Build with `npm run build`
4. Deploy `dist/` folder to hosting platform
5. Verify backend CORS allows frontend domain

**Remember**:
- Vite proxy in `vite.config.ts` only works in development (`npm run dev`). Production builds use `VITE_API_URL` directly.
- This project is designed for static hosting deployment (no Docker needed).

## Troubleshooting

### TypeScript errors in build
- Run `npm run type-check` to see exact errors
- Fix type issues in `src/types/api.ts` or component props
- Ensure strict mode compliance (defined in `tsconfig.json`)

### CORS errors
- Backend must allow frontend origin
- Check `VITE_API_URL` points to correct backend
- In development, use Vite proxy or enable CORS on backend

### Polling doesn't stop
- Check `pollingControllerRef.current?.abort()` called in cleanup
- Verify terminal statuses: `completed`, `failed`, `error`, `timeout`
- Clear `pollingTimeoutRef.current` in cleanup

### Editor loses focus/content
- Verify localStorage key matches: `playground-code-${selectedProblemId}`
- Check Monaco Editor `value` and `onChange` props wired correctly
- Ensure `selectedProblemId` is stable (doesn't change unexpectedly)

## Key Files Reference

- `src/App.tsx:10` - Subject ID state for logo sync
- `src/components/Playground.tsx:21-52` - Main state declarations
- `src/components/Playground.tsx:400-450` - Anti-paste implementation
- `src/components/Playground.tsx:54-130` - Tab monitoring implementation
- `src/components/LanguageLogo.tsx:8` - Logo mapping logic
- `src/types/api.ts` - All TypeScript interfaces
- `src/config.ts:7` - API base URL configuration
- `vite.config.ts:12-18` - Development proxy setup
