# Template Packaging Test + Standalone-App Fix — Report

**Report ID:** REPORT_TEMPLATE_PACKAGING_TEST_20260802
**Date:** 2026-08-02
**Author:** OpenCode (AI agent)
**Status:** Final
**Category:** Governance

---

## Executive Summary

Tested the published `expo-template-coderooz` package end-to-end: `npm pack` tarball
contents, a real `create-expo-app` scaffold of a fresh standalone app, install, and the
documented npm scripts. Found and fixed a **defect that made every scaffolded app fail
`npm test` and `npm run build`** (both exited 1 with `No workspaces found`).

**Root cause:** the template ships the monorepo-root `package.json` verbatim into every
standalone app. `create-expo-app` copies it unchanged, so scaffolded apps inherited the
monorepo `workspaces` list and the workspace-scoped `test`/`build`/`build:all` scripts,
which reference `@coderooz/*` packages that do not exist in a standalone project.

**Fix:** made the npm scripts standalone-safe while keeping the monorepo workflows intact.

1. Added `scripts/template-scripts.cjs` — a guard that detects whether a `packages/`
   workspace exists. In the monorepo it delegates to internal `:mono` variants
   (`test:mono`, `build:mono`, `build:all:mono`); in a standalone app `npm test` runs
   Vitest (`--passWithNoTests`) and `npm run build`/`npm run build:all` print a
   monorepo-only notice and exit 0.
2. Root `package.json` — `test`/`build`/`build:all` now invoke the guard; the original
   workspace commands were moved to `:mono` scripts; `workspaces` simplified to a
   `packages/*` glob; `scripts/template-scripts.cjs` added to `files` so it ships.
3. `app.json` version aligned `1.0.2` → `1.0.4` (previously drifted from the package).

Verified in a **fresh `create-expo-app` scaffold** (tarball + `file:` template): after
`npm install` (996 packages), `npm run typecheck`, `npm run lint`, `npm test`, and
`npm run build` / `npm run build:all` all exit 0. Monorepo validation remains green
(112 tests, build, build:all).

---

## Details

### 1. Pack test

`npm pack` produced `expo-template-coderooz-1.0.4.tgz` (53 files, ~80.5 kB). All
expected template files present (`.editorconfig`, `.env.example`, `.nvmrc`, `app.json`,
`package.json`, `template.json`, `tsconfig.json`, `opencode.jsonc`, `AGENTS.md`,
`GOVERNANCE.md`, `LLM.txt`, `App.tsx`, `index.ts`, `src/`, `assets/`, configs).

### 2. Scaffold test — defect reproduced

A fresh scaffold (`npx create-expo-app coderooz-test-app3 --template file:<tgz> --no-install`)
confirmed `create-expo-app` copies the template `package.json` verbatim (it only rewrites
`name`, `version → 1.0.0`, adds `private: true`, drops `repository`). The scaffolded app
therefore contained:

- `workspaces: ["packages/core", … 15 explicit entries]`
- `test` / `build` / `build:all` scripts using `-w @coderooz/*` and `node scripts/…`
  files that do not ship in a standalone app

Result in the scaffolded app (before fix, reproduced on `coderooz-test-app2`):
- `npm test` → `npm error No workspaces found:` — EXIT 1
- `npm run build` → `No workspaces found` — EXIT 1
- `npm run typecheck` / `npm run lint` → EXIT 0 (unaffected)

`npm install` itself succeeded (996 packages) — npm tolerates the missing workspace
globs, but any `-w`-flagged script fails.

### 3. Fix applied

- **`scripts/template-scripts.cjs`** (new, shipped in `files`):
  - monorepo → `npm run <script>:mono`
  - standalone `test` → `npx --no-install vitest run --passWithNoTests` (falls back to an
    informational notice + exit 0 if vitest is absent)
  - standalone `build` / `build:all` → monorepo-only notice + exit 0
- **`package.json`**:
  - `test` / `build` / `build:all` → `node scripts/template-scripts.cjs <script>`
  - `test:mono` / `build:mono` / `build:all:mono` hold the original workspace commands
  - `workspaces` → `["packages/*"]` (all 15 subdirs verified to have `package.json`; no
    behavior change in the monorepo)
  - `files` → added `scripts/template-scripts.cjs`
- **`app.json`**: `version` `1.0.2` → `1.0.4`
- **Docs kept in sync**: `CHANGELOG.md` + `docs/changelog.md` updated; `AGENTS.md` and
  `LLM.txt` now describe the guarded standalone behavior; template re-bundled via
  `npm run build` and hash-verified in sync with `packages/create-app/public/template/`.

### 4. Verification (fresh scaffold, `coderooz-test-app3`)

| Command | Result |
|---------|--------|
| `npm install` | 996 packages, postinstall OK |
| `npm run typecheck` | EXIT 0 |
| `npm run lint` | EXIT 0 |
| `npm test` | EXIT 0 — Vitest runs, "No test files found, exiting with code 0" |
| `npm run build` | EXIT 0 — monorepo-only notice |
| `npm run build:all` | EXIT 0 — monorepo-only notice |
| `create-expo-app` app.json | `version` preserved as `1.0.4`; name/slug rewritten to app name |

---

## Files Changed

| File | Change |
|------|--------|
| `scripts/template-scripts.cjs` | New — standalone/monorepo script guard (ships in template) |
| `package.json` | Guarded `test`/`build`/`build:all`; added `:mono` variants; `workspaces` → `packages/*`; `files` + guard |
| `app.json` | Version `1.0.2` → `1.0.4` |
| `CHANGELOG.md` | 1.0.4 Changed entries for the packaging fix |
| `docs/changelog.md` | Synced with root CHANGELOG.md |
| `AGENTS.md` | Note on guarded scripts in standalone apps + `:mono` variants |
| `LLM.txt` | Scaffolded-project commands: `npm test` / `npm run build` rows |

Generated (re-bundled via `npm run build`): `packages/create-app/public/template/*`
(24 items), `expo-template-coderooz-1.0.4.tgz` (regenerated).

---

## Validation Results

| Check | Command | Result |
|-------|---------|--------|
| Root lint | `npm run lint` | Clean |
| Root typecheck | `npm run typecheck` | Clean |
| Tests (monorepo) | `npm test` | 112 passed (55 + 17 + 40) |
| Build | `npm run build` | Clean (24 template items, 12 feature packages) |
| Build all | `npm run build:all` | Clean; all 12 feature packages validated |
| Template sync | hash compare | AGENTS.md / LLM.txt / GOVERNANCE.md / CHANGELOG.md / package.json / guard SYNCED |
| Standalone scaffold | fresh `create-expo-app` | typecheck/lint/test/build/build:all all EXIT 0 |

---

## Recommendations

1. **Publish + push 1.0.4** — the packaging fix only reaches users when `main` is pushed
   and the package is published. The live docs site also still predates 1.0.4 (see the
   deployment gap from REPORT_DOC_COMPAT_AUDIT_20260801).
2. **Optional polish (not blocking):** `template.json` `displayName` is still
   `"custom-expo-template"` (a leftover) and root `author` email
   (`coderooz.dev@gmail.com`) differs from the documented `coderooz@outlook.com`. Both are
   cosmetic; leave for a future chore.
3. **Regression guard:** keep `scripts/template-scripts.cjs` in the root `files` allowlist
   — dropping it would silently re-break `npm test` in scaffolded apps.
4. Clean up local test artifacts (`coderooz-test-app`, `coderooz-test-app2`,
   `coderooz-test-app3`) and the regenerated tarball unless it is needed.

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-02 | Initial creation |
