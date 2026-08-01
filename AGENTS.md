# Coderooz — Expo Template (AI Agent Guide)

This file gives **any AI agent** working in this repository, in a project scaffolded
from this template, or in the Coderooz CLI ecosystem the full context needed to be
productive and safe. It ships with the template, so every generated project gets it too.

**Related files (read in this order):**
1. `LLM.txt` — single-context entry point for building projects with this template (features, structure, usage)
2. `GOVERNANCE.md` — mandatory governance rules for AI agents (reports, naming, validation, hygiene)
3. `README.md` — human-facing overview
4. `docs/` — Jekyll documentation site (GitHub Pages)

---

## Identity

- **Project:** `expo-template-coderooz`
- **Owner:** Coderooz (Ranit Saha)
- **Role:** Solo Developer / Founder
- **Stack:** Expo (Managed) + TypeScript (strict) + NativeWind (Tailwind) + React Navigation
- **GitHub:** https://github.com/coderooz/expo-template-coderooz
- **npm:** https://www.npmjs.com/package/expo-template-coderooz
- **Docs:** https://coderooz.github.io/expo-template-coderooz/

---

## What This Project Is

A production-ready Expo starter template with **composable feature packages**. It is
used three ways:

| Use case | Command |
|----------|---------|
| Scaffold directly (no features) | `npx create-expo-app my-app --template expo-template-coderooz` |
| Scaffold with features (CLI) | `npx @coderooz/cli create my-app --with sqlite,camera,notifs` |
| Add features to an existing app | `npx @coderooz/cli add camera,notifs` |

A generated project is a **standalone Expo app** (not a monorepo). Feature packages are
"woven" into it: their `template/` files are copied in, `package.json` deps are merged,
`app.json` plugins are appended, `.env.example` vars are merged, and hooks run.

---

## Repository Layout (monorepo)

```
.
├── packages/
│   ├── core/              # Types, manifest validation, config merge, hooks engine
│   ├── create-app/        # Scaffold + weave orchestration (+ public/template, public/features)
│   ├── cli/               # Commander-based CLI (create, add, list, update)
│   └── feature-*/         # 12 composable feature packages
├── docs/                  # Jekyll documentation site (GitHub Pages)
├── scripts/               # Build + release validation tooling
│   └── showcase-overlay/  # Source for the showcase example
├── examples/showcase/     # Generated showcase app (build output — regenerate, don't edit)
├── .github/               # CI/CD, issue templates, community files
├── .opencode/             # OpenCode agents + session state
├── App.tsx                # Template app entry
└── src/                   # Base template app source
```

### `packages/` in detail

| Package | Purpose |
|---------|---------|
| `@coderooz/core` | Zod-validated feature manifests, config merge, template copier, dependency merger, hooks engine, reconcile engine |
| `@coderooz/create-app` | Scaffold orchestration, multi-feature weaving, update/reconcile modes |
| `@coderooz/cli` | Commander CLI: `create`, `add`, `list`, `update` |
| `@coderooz/feature-*` | 12 composable feature packages (see table below) |

Each feature package has a `coderooz.json` manifest and a `template/` directory. The
manifest declares `requires`, `provides`, `hooks` (providers, navigation, env, config,
app-json, services, post-install) and `dependencies`.

**Important:** `packages/create-app/public/` is **generated** by `scripts/bundle-assets.js`
from the root package files + feature packages. Never edit files under
`packages/create-app/public/` directly — edit the root/template source and run `npm run build`.

---

## Feature Packages (12)

| Feature | Package | Requires | Provides |
|---------|---------|----------|----------|
| Auth | `@coderooz/feature-auth` | — | token mgmt, sessions, secure storage |
| Biometrics | `@coderooz/feature-biometrics` | — | fingerprint / Face ID |
| Camera | `@coderooz/feature-camera` | — | capture, picker, permissions |
| Clerk | `@coderooz/feature-clerk` | — | sign-in/up, OAuth, profile |
| Components | `@coderooz/feature-components` | design-system | UI, states, layouts |
| Design System | `@coderooz/feature-design-system` | — | theme, primitives, tokens |
| Dynamic Pages | `@coderooz/feature-dynamic-pages` | design-system, components, sqlite | page-engine, screens |
| Icons | `@coderooz/feature-icons` | — | typed icons |
| Messages | `@coderooz/feature-message` | — | SMS, OTP, phone validation |
| Notifications | `@coderooz/feature-notifs` | — | push, local, channels |
| Pages | `@coderooz/feature-pages` | — | About, Licenses, Policies |
| SQLite | `@coderooz/feature-sqlite` | — | migrations, typed queries |

Dependencies declared in `requires` are pulled in automatically: selecting
`dynamic-pages` also installs `design-system`, `components`, and `sqlite`.

---

## Generated App Structure

A scaffolded project looks like this:

```
src/
├── components/     # Reusable UI components (base + feature-woven)
├── context/        # React context providers (Alert, App, Theme, Toast, User, PageEngine)
├── hooks/          # Custom hooks
├── lib/            # Utilities (utils, storage, fetchData, connectDb)
├── navigation/     # Route configs (App, Auth, OnBoarding, Splash)
├── screens/        # Screen components
├── services/       # API / DB / Notifications / page-engine / icons / auth
├── theme/          # Design tokens, colors, color schemes
├── templates/      # Built-in dynamic-page templates (feature-dynamic-pages)
├── primitives/     # Primitive components (feature-design-system)
└── data/           # Static manifests (e.g. showcase-manifest)
```

### Path aliases (`tsconfig.json`)

All `@/` imports resolve to `src/`:

| Alias | Maps to |
|-------|---------|
| `@/components/*` | `src/components/*` |
| `@/lib/*` | `src/lib/*` |
| `@/screens/*` | `src/screens/*` |
| `@/context/*` | `src/context/*` |
| `@/hooks/*` | `src/hooks/*` |
| `@/navigation/*` | `src/navigation/*` |
| `@/theme/*` | `src/theme/*` |
| `@/services/*` | `src/services/*` |
| `@/primitives/*` | `src/primitives/*` |
| `@/templates/*` | `src/templates/*` |
| `@/data/*` | `src/data/*` |

---

## Building With the Template

For hands-on guidance on using the features, services, and conventions when building a
project, read **`LLM.txt`** — it is the single-context entry point for AI agents building
apps on top of this template.

---

## CLI Usage

```bash
npx @coderooz/cli create <name> [--with sqlite,camera,notifs]
npx @coderooz/cli add <feature>            # comma-separated works
npx @coderooz/cli update [-m add-missing|replace|update]
npx @coderooz/cli list                     # list available features
```

`update` modes:
- `add-missing` (default) — only add files that don't exist
- `replace` — overwrite all template files
- `update` — smart-merge JSON configs, overwrite other files

---

## Conventions

- TypeScript strict mode
- `interface` for object shapes, `type` for unions/utilities
- `const` over `let`, never `var`
- `async/await` over raw promises
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Avoid `any` — use `unknown` and narrow with type guards
- Conventional commits: `type(scope): message`
- No comments in code unless explicitly asked
- Style with `StyleSheet.create()`, not inline objects (React Native)
- Never hardcode dimensions — use `useWindowDimensions()`

---

## Workflows (root / monorepo)

| Command | What it does |
|---------|--------------|
| `npm run build` | Build core, create-app, cli + bundle template assets |
| `npm run build:all` | Build all 12 feature packages too |
| `npm test` | Vitest (core, feature-design-system, feature-dynamic-pages) |
| `npm run lint` | ESLint via expo |
| `npm run typecheck` | TypeScript `--noEmit` |
| `npm run start` | Expo dev server |

**Before finishing any task:** run `npm run lint`, `npm run typecheck`, `npm test`,
`npm run build:all`.

### Showcase example

`examples/showcase/` is a runnable app demonstrating the showcase feature set (design
system, components, sqlite, dynamic-pages, notifs, icons, pages, auth). It is
**generated**, not hand-edited:

```bash
npm run build                      # re-bundle features into create-app/public
node scripts/build-example.js      # regenerate examples/showcase/
cd examples/showcase && npm install
npx tsc --noEmit                   # should be clean
```

The overlay source lives in `scripts/showcase-overlay/`.

---

## AI Governance (summary)

`GOVERNANCE.md` is the enforceable rulebook for AI agents. Key rules:

1. **No root-level reports** — reports/audits go in `Reports/{Category}/`, not repo root
2. **Use `.workspace/`** for temporary files (never commit them)
3. **Naming convention** — `{CATEGORY}_{DESCRIPTOR}_{YYYYMMDD}.md`
4. **Index reports** in `REPORT_INDEX.md`
5. **Validate before finishing** — lint, typecheck, test, build
6. **Never commit secrets, API keys, or `.env` files**
7. **Never run destructive commands without confirmation**
8. **Read before editing** — validate context first

---

## Branching Strategy

`main` is the only permanent *source* branch. Feature source lives only on `main`
(`packages/feature-*`). Generated outputs live on artifact branches (`examples/<name>`,
`gh-pages`) or are produced by CI. Release maintenance uses `v1.x`-style lines.
Short-lived `feat/*`, `fix/*`, `chore/*`, `docs/*` branches merge back to `main`.
See `docs/branching-strategy.md` for the full design.

---

## Documentation

- `docs/` — Jekyll documentation site (deployed to GitHub Pages)
  - `getting-started.md`, `features.md`, `ui-components.md`, `api-integration.md`,
    `cli-commands.md`, `ai-governance.md`, `branching-strategy.md`, `changelog.md`
- `docs/_sidebar.md` + `docs/_config.yml` — navigation
- `CHANGELOG.md` — release history
- Offline doc sets are available on the maintainer's machine at `C:\Code_Works\Docs\`
  (see `C:\Code_Works\Docs\DOCS_CATALOG.md`); consult them when working with Expo SDK,
  React Navigation, NativeWind, or npm tooling.

---

## Security Notes

- Never log, expose, or commit secrets, API keys, tokens, or passwords
- `.env.example` ships template placeholders only — real `.env` files are gitignored
- Auth uses `expo-secure-store` for token persistence
- Validate and sanitize all user inputs
