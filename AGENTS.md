# Trakr — Agent Guide

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

No test framework, linter, or CI is configured.

## Architecture

Single-page React app (no router) with a top-level `App` component holding all state. Data flows unidirectionally: **App → KanbanBoard → Column → PriorityCard**.

### Component hierarchy

```
App
├── KanbanBoard
│   └── Column (×3: Backlog, In Progress, Completed)
│       └── PriorityCard
│           └── PriorityEditor  (inline, swaps in when editing)
├── AddPriorityForm   (modal, conditional render)
└── ManageGoalsModal  (modal, conditional render)
```

### Data layer

- `src/data/storage.js` — localStorage CRUD for priorities (key: `trakr-priorities`)
- `src/data/goalStorage.js` — localStorage CRUD for goals (key: `trakr-goals`)

Both modules are abstracted so they can be swapped for API calls later. Each entity gets `id: crypto.randomUUID()` and `createdAt` (priorities only).

### State pattern

App re-reads from localStorage after every mutation (e.g. `setPriorities(getPriorities())`). There is no React context or state management library — state lives entirely in `App` and is pushed down via props.

### Types

- `src/types/priority.js` — `STATUSES` enum (`backlog`, `in-progress`, `completed`), `STATUS_LABELS`, and `STORAGE_KEY`
- `src/types/goal.js` — `STORAGE_KEY` only

## Conventions

- **No build step beyond Vite + Tailwind** — no ESLint, Prettier, or test runner configured
- **Tailwind v4** with `@theme` directive in `index.css` (not `tailwind.config.js`) — custom colors defined as CSS variables (`--color-primary-*`, `--color-accent-*`, `--color-gray-*`)
- **Dark theme only** — base colors are dark (`gray-900` = `#0a0a0f`)
- **Inline SVGs** — no icon library; icons are hardcoded as SVG elements
- **Function components with default exports** — no named exports for components
- **ES modules** — `"type": "module"` in package.json
- **No TypeScript** — plain JSX/JS

## Gotchas

- **Tailwind v4 config**: colors are defined in `index.css` via `@theme`, not in `tailwind.config.js` (which is empty). Adding new colors requires editing `index.css`.
- **localStorage re-read pattern**: after every mutation, state is refreshed by re-reading from localStorage rather than computing the new state in-memory. If refactoring to a proper state management approach, this pattern would change.
- **No form validation beyond `required`**: the only validation is HTML `required` on the title field and `.trim()` checks.
- **Status update via `<select>` on PriorityCard**: moving a priority changes both its status and re-renders it in the new column — there's no drag-and-drop.
- **`sendInProgressEmail` uses `mailto:`**: it opens the user's email client with a pre-filled body; no actual email is sent server-side.
