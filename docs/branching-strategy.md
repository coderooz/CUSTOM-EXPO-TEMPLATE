# Branching Strategy — expo-template-coderooz

Tailored for the architecture of this monorepo: a template package + 12 composable
feature packages + CLI + a generated docs site + generated example apps.

**Guiding principle:** everything that is *source* lives on `main`. Everything that is
*generated output* (example apps, docs site, npm artifacts) lives in its own artifact
branch or is produced by CI. Long-lived branches are never created for feature source.

---

## 1. Branch Map

| Branch | Purpose | Permanent | Written by |
|--------|---------|-----------|------------|
| `main` | Active development — all source (template, features, CLI, docs, AI context) | ✅ | Humans (PRs) |
| `v1.x`, `v2.x`, … | Release maintenance lines — patch fixes for released versions | ✅ (one per minor line) | Humans (PRs) |
| `examples/<name>` | A fully generated Expo app (showcase, notes-app, ecommerce, …) | ✅ (one per example) | CI sync workflow only |
| `gh-pages` | Generated Jekyll docs site (GitHub Pages) | ✅ | CI pages workflow only |
| `feat/*`, `fix/*`, `chore/*`, `docs/*` | Short-lived development branches | ❌ — deleted after merge | Humans (PRs) |

---

## 2. Source Branches

### `main` — active development (permanent)

The single source of truth. Contains:

- Base template (`App.tsx`, `src/`, `app.json`, `package.json`, …)
- All 12 feature packages (`packages/feature-*`)
- Tooling (`packages/core`, `packages/create-app`, `packages/cli`, `scripts/`)
- Docs site source (`docs/`)
- AI context files (`AGENTS.md`, `GOVERNANCE.md`, `LLM.txt`)

Rules:

- Everything merges to `main` via PR + review. No direct pushes by contributors.
- CI runs on every PR and every push to `main` (lint, typecheck, test, build).
- `main` must always be releasable — if it isn't, fix forward.

### `v1.x`, `v2.x` — release maintenance (permanent)

One branch per supported minor release line, created at the time of that release
(e.g. `v1.x` when `v1.0.0` ships). Used **only** for:

- Patch fixes (`fix/*` → `v1.x`)
- Security hotfixes (backport to all active `vN.x` lines)

New features never land on release branches — they belong on `main`.

### `feat/*`, `fix/*`, `chore/*`, `docs/*` — temporary (short-lived)

Standard short-lived branches for active work. Rules:

- Name: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>`
- Branch off `main` (or the target release branch for backports)
- Merge back via PR; delete after merge
- **Never** create long-lived branches like `feature/sqlite` or `feature/camera` —
  feature source lives only in `packages/feature-*/` on `main`

---

## 3. Release Workflow

Current automation (already in place) drives releases from `main`:

1. `feat`/`fix` PRs merge to `main`
2. **Release Please** (`release.yml`) opens a release PR, bumps versions, tags a release,
   and runs `npm run build` + `npm publish` on release creation
3. **Auto-tag** (`auto-tag.yml`) tags `vX.Y.Z` on `package.json` bumps

Adding a release maintenance line:

- On each minor release (e.g. `v1.0.0`), create `v1.x` from the release tag:
  `git checkout -b v1.x v1.0.0`
- Patch fixes go to `v1.x` and are tagged `v1.0.1`, `v1.0.2`, …
- A new minor (or major) moves forward on `main` only

**Single release path:** `release.yml` (Release Please) is the sole release mechanism. It runs on
`main` and `v[0-9]+.x`, opens release PRs, tags releases, and publishes to npm on release creation.
The old `publish.yml` (auto patch-bump + publish on `main`) was removed — it double-versioned
alongside Release Please and never wired npm auth.

---

## 4. Example Application Branches

Each example is a **fully generated Expo app** produced by the CLI weave pipeline
(`npm run build` → weave features → customize `package.json`/`app.json`). The showcase
is the canonical one; more can be added (`notes-app`, `ecommerce`, `chat`, …).

### Convention

- Branch name: `examples/<name>` (e.g. `examples/showcase`, `examples/notes-app`)
- Content: the generated app at its root — **no monorepo, no `packages/`** — exactly
  what a user gets from `npx @coderooz/cli create`
- Each branch is an **artifact**: never hand-edited, never merged, no PRs

### How examples are defined

The feature set and overlay for each example live on `main` as a config file:

```
examples/<name>.json
```

```json
{
  "name": "showcase",
  "appName": "coderooz-showcase",
  "appTitle": "Coderooz Showcase",
  "slug": "coderooz-showcase",
  "features": ["design-system", "components", "sqlite", "dynamic-pages", "notifs", "icons", "pages", "auth"],
  "overlay": "scripts/showcase-overlay",
  "dependencies": ["zod", "@gorhom/bottom-sheet", "expo-secure-store", "expo-web-browser"]
}
```

`scripts/build-example.js` reads any `<name>.json` config (via `--config examples/<name>.json`,
defaulting to `examples/showcase.json`) and emits to `examples/<name>/` locally — or the
sync workflow regenerates and commits it to the artifact branch.

### How examples stay synchronized with the template

Because example branches are generated output, they would otherwise drift from `main`
as the template and features evolve. Fix: a **sync workflow** that regenerates them.

```
.github/workflows/examples-sync.yml
```

- Triggers: `push` to `main` (paths: `packages/**`, `scripts/**`, `App.tsx`, `src/**`, `examples/*.json`)
- Job: checkout `main` → `npm ci` → `npm run build` → for each `examples/*.json`,
  regenerate the app → `git checkout examples/<name>` → replace contents → commit + push
- Result: `examples/showcase`, `examples/notes-app`, … always reflect current `main`

> This is the same mechanism GitHub uses for `gh-pages` artifact branches. Force-push is
> acceptable on artifact branches because they are not shared for development.

### Recommended change (script)

Generalize `scripts/build-example.js` to accept `--config examples/<name>.json` instead
of hardcoding `SHOWCASE_FEATURES` and the showcase overlay path. The current script
becomes the `showcase` config — no behavior change for the existing example.

**Status: implemented.** `scripts/build-example.js` now reads any `examples/*.json` config
(`--config <path>`, default `examples/showcase.json`), and `.github/workflows/examples-sync.yml`
regenerates every example branch on push to `main`.

---

## 5. Documentation Workflow

- **Source:** `docs/` (Jekyll) lives on `main`, edited alongside the code it documents.
- **Deploy:** GitHub Pages renders the site. Two options:

  **Option A (recommended, zero branching):** enable Pages on the `main` branch
  `/docs` folder. No `gh-pages` branch needed — Pages reads `docs/` straight from `main`.

  **Option B (artifact branch):** a `pages.yml` workflow builds the Jekyll site and
  commits it to `gh-pages`. Use only if a separate static output is required.

- **Recommended change:** today there is **no Pages workflow**. Enable Option A in
  repository settings (Settings → Pages → Deploy from branch → `main` → `/docs`).

---

## 6. AI Context Files

### Files (all live on `main`, versioned with the code)

| File | Audience | Purpose |
|------|----------|---------|
| `LLM.txt` | AI coding agents | Single-context entry point: what the template is, features, structure, how to build with it |
| `AGENTS.md` | AI coding agents | Deep context: conventions, workflows, monorepo layout, weave pipeline |
| `GOVERNANCE.md` | AI coding agents | Enforceable rules: validation gates, report hygiene, security, branch rules |
| `docs/` | Humans + AI | Full reference (features, UI components, API, CLI) |

### Should AI context live on a separate branch? — **No**

A dedicated "AI branch" is **not beneficial** here, and is actively harmful:

1. **AI agents clone `main`.** Context on another branch is invisible unless the agent
   knows to switch branches — the one thing a fresh agent won't do.
2. **Context must match the code.** The files describe the current template. If they sit
   on a branch, they drift from `main` and mislead agents.
3. **They ship in the npm package.** `AGENTS.md`, `GOVERNANCE.md`, and `LLM.txt` are in
   the template's `files` array. The published package can only reflect what's on `main`.
4. **They change at the same cadence as code.** No separate review/release rhythm exists,
   so a branch buys nothing.

**Better than a branch:** keep the files on `main`, and let the docs site publish an
AI-readable mirror. If a single aggregated context file is ever needed, generate it at
release time (`llms.txt` from `docs/` content) into the Pages output — a *generated
artifact*, not a source branch.

### Maintenance rules

- Update `LLM.txt` / `AGENTS.md` / `GOVERNANCE.md` **in the same PR** as any template or
  feature change that affects documented behavior (new feature, changed manifest hooks,
  new CLI flags, structure changes).
- Run `npm run build` after editing them — they are bundled into the template, which is
  republished to npm.

---

## 7. Simplest Long-Term Strategy (recommendation)

Keep it minimal:

1. **`main`** is the only permanent *source* branch.
2. **`v1.x`, `v2.x`, …** release lines — created only when a maintenance line is needed,
   never speculatively.
3. **`examples/<name>`** artifact branches — created when an example is added,
   regenerated by the sync workflow.
4. **No `gh-pages`** — serve Pages from `main` `/docs`.
5. **No AI branch** — AI context lives on `main`, ships with the package, mirrored on the
   docs site.
6. **Short-lived `feat/*`, `fix/*`, `chore/*`, `docs/*`** branches for all active work.

This gives:

| Audience | Wins |
|----------|------|
| Developers | Trivial workflow: branch → PR → main; examples auto-regenerate |
| Open-source contributors | Clear, low-friction PR path; docs serve from main |
| AI coding agents | Context on `main` + shipped in package — always current |
| Template users | Can browse any example app as a ready-to-run reference |

**Total permanent branches:** `main` + one `vN.x` per active release line + one
`examples/<name>` per example. Usually 3–5 branches in practice.
