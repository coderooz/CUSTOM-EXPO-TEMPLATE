# Documentation Compatibility Audit — Report

**Report ID:** REPORT_DOC_COMPAT_AUDIT_20260801
**Date:** 2026-08-01
**Author:** OpenCode (AI agent)
**Status:** Final
**Category:** Governance

---

## Executive Summary

Audited all repository documentation for **human + AI/LLM compatibility**: doc-site
internal links, accuracy of claims against the actual codebase, tooling alignment with
documented behavior, and version drift. Fixed 10 files. Key findings and fixes:

1. **Broken baseurl links** — several docs pages used root-absolute internal links
   (`](/ai-governance)`) that resolve outside the Jekyll `baseurl`
   (`/expo-template-coderooz`). Converted to relative links in 4 files.
2. **Stale showcase claims** — `docs/showcase.md`, `docs/index.md`,
   `docs/ai-governance.md`, and `AGENTS.md` claimed the showcase demonstrates
   "all 12 features" / "every feature package"; the actual `examples/showcase.json`
   weaves **8 features** (design-system, components, sqlite, dynamic-pages, notifs,
   icons, pages, auth). Corrected to list the real set and note the 4 excluded
   (camera, biometrics, message, clerk).
3. **Tooling/docs mismatch** — docs promised `npm test` covers core +
   feature-design-system + feature-dynamic-pages (112 tests), but only core had a
   `test` script. Added `test`/`test:watch` scripts to both feature packages and
   updated the root `test` script. Verified: **112 tests pass** (55 + 17 + 40).
4. **Version drift** — `docs/features.md` manifest example showed `1.0.3`;
   current version is `1.0.4`.
5. **README roadmap** — CI row was stale (CI already runs on every PR); split into
   implemented + planned items.
6. **Deployment gap (not fixable from repo alone)** — the live docs site at
   `https://coderooz.github.io/expo-template-coderooz/` predates 1.0.4: the three new
   pages (`ai-governance`, `showcase`, `branching-strategy`) return 404. There is no
   Pages workflow in `.github/workflows/` and no `gh-pages` branch on origin, so
   redeployment requires a push of `main` (and, if the site is configured to build from
   `docs/` via GitHub Pages settings, that push is sufficient).

---

## Details

### 1. Broken baseurl internal links

The Jekyll site uses `baseurl: "/expo-template-coderooz"`. Root-absolute markdown links
(`](/)`, `](/getting-started)`) render as `https://coderooz.github.io/<page>` — outside
the baseurl — and 404. Relative links (`](getting-started)`) resolve correctly under the
baseurl and match how GitHub Pages serves the site. Verified live: GitHub Pages serves
extensionless, `.md`, and `.html` forms of each page, so relative links are safe.

Fixed files:
- `docs/index.md` — AI Governance / Showcase / Branching Strategy links → relative
- `docs/getting-started.md` — AI Governance / Showcase links → relative
- `docs/ai-governance.md` — Branching Strategy / Showcase links → relative
- `docs/_sidebar.md` — all 10 nav links → relative `.md`-style

No root-absolute internal links remain in `docs/*.md`.

### 2. Showcase feature-count accuracy

`examples/showcase.json` weaves: design-system, components, sqlite, dynamic-pages,
notifs, icons, pages, auth (8 features). It does **not** include camera, biometrics,
message, or clerk. Corrected the following to describe the actual set:
- `docs/index.md` — "demonstrating all 12 features" → "8 composable feature packages"
- `docs/showcase.md` — rewrote "What It Shows" with the real 8-feature list + note that
  camera/biometrics/messages/clerk are addable via `npx @coderooz/cli add`
- `docs/ai-governance.md` — "every feature package" → "showcase feature set"
- `AGENTS.md` — "all feature packages" → explicit 8-feature list

### 3. Tooling/docs alignment for `npm test`

- `packages/feature-design-system/package.json` — added `test` + `test:watch` scripts
- `packages/feature-dynamic-pages/package.json` — added `test` + `test:watch` scripts
- Root `package.json` — `test` now runs all three workspaces:
  `@coderooz/core`, `@coderooz/feature-design-system`, `@coderooz/feature-dynamic-pages`

`npm test` now executes the full documented suite: **112 tests pass**
(55 core + 17 design-system + 40 dynamic-pages). This matches the claim in
`AGENTS.md`, `GOVERNANCE.md`, `LLM.txt`, and the docs site.

### 4. Version drift

- `docs/features.md` — manifest example `"version": "1.0.3"` → `"1.0.4"`.

### 5. README roadmap

- Split `CI: Expo Doctor + type checks on every PR` into:
  - `✔️ CI: lint, typecheck, test, build on every PR` (implemented — `.github/workflows/ci.yml`)
  - `🔜 CI: Expo Doctor checks` (not yet wired into CI)

---

## Files Changed

| File | Change |
|------|--------|
| `docs/index.md` | Showcase claim + 3 relative links |
| `docs/getting-started.md` | 2 relative links |
| `docs/ai-governance.md` | 2 relative links + showcase claim |
| `docs/_sidebar.md` | 10 relative nav links |
| `docs/showcase.md` | Accurate 8-feature description |
| `docs/features.md` | Version `1.0.4` |
| `AGENTS.md` | Accurate showcase feature set |
| `README.md` | Roadmap CI split |
| `package.json` | Root `test` runs all 3 test workspaces |
| `packages/feature-design-system/package.json` | `test` + `test:watch` scripts |
| `packages/feature-dynamic-pages/package.json` | `test` + `test:watch` scripts |

Template bundle re-generated (`npm run build`); `AGENTS.md`, `LLM.txt`,
`GOVERNANCE.md` hash-verified **in sync** with `packages/create-app/public/template/`.

---

## Validation Results

| Check | Command | Result |
|-------|---------|--------|
| Root lint | `npm run lint` | Clean |
| Root typecheck | `npm run typecheck` | Clean |
| Tests | `npm test` | 112 passed (55 + 17 + 40) |
| Build | `npm run build` | Clean (23 template items, 12 feature packages) |
| Build all | `npm run build:all` | Clean; all 12 feature packages validated |
| Template sync | hash compare | AGENTS.md / LLM.txt / GOVERNANCE.md SYNCED |

---

## Recommendations

1. **Deploy the docs site** — push `main` to origin so GitHub Pages rebuilds with the
   1.0.4 pages (ai-governance, showcase, branching-strategy currently 404). If Pages is
   not configured to build from `docs/` on `main`, add a `pages.yml` workflow (or enable
   "Deploy from a branch: main /docs" in repo settings).
2. `docs/_sidebar.md` is a Jekyll-adjacent nav file; it is not referenced by the custom
   layouts in `docs/_layouts/`. Consider deleting it or wiring it into the layouts — its
   links are now relative and harmless either way.
3. No further doc/tooling incompatibilities found. Future doc changes should keep
   internal links relative and re-run `npm run build` after touching `AGENTS.md`,
   `LLM.txt`, or `GOVERNANCE.md`.

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-01 | Initial creation |
