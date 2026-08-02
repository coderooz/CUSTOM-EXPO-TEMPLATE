# Changelog

## [1.2.0](https://github.com/coderooz/expo-template-coderooz/compare/v1.1.0...v1.2.0) (2026-08-02)


### Features

* **cli:** add CLI and create-app scaffold packages ([769f7ca](https://github.com/coderooz/expo-template-coderooz/commit/769f7caa4b37780cda3525d6c894464633b16f50))
* **core:** add core package with types, validators, and manifest system ([4ef0427](https://github.com/coderooz/expo-template-coderooz/commit/4ef04277bc33a8b39c789a24c17aeaeb45d27d87))
* **feature:** add 8 base feature packages ([0d3db66](https://github.com/coderooz/expo-template-coderooz/commit/0d3db6670f2ddd966bfe16bf8d99135dc1dd3641))
* **feature:** add clerk auth, design system, components, and dynamic page engine ([ed8b523](https://github.com/coderooz/expo-template-coderooz/commit/ed8b5232c5fabb9d8050783334591809483c4988))
* **governance:** add AI governance layer (AGENTS, GOVERNANCE, LLM) ([47f90a3](https://github.com/coderooz/expo-template-coderooz/commit/47f90a3650080f5e4d449475832201bc7dca2c2e))
* **packages:** update feature manifests, template sources, core hooks, cli commands ([d0b95d5](https://github.com/coderooz/expo-template-coderooz/commit/d0b95d5a67846876e360edfcf740e54e4ab426b3))
* **scripts:** add asset bundling and release validation scripts ([3f37436](https://github.com/coderooz/expo-template-coderooz/commit/3f37436a3e99cf72763f69c6ea59c0fd15ce5094))
* **tooling:** config-driven example builder, examples-sync workflow, vN.x release triggers ([f0895f7](https://github.com/coderooz/expo-template-coderooz/commit/f0895f78fb22f133d287c1cb7de292b08016b7ad))


### Bug Fixes

* **build:** validate features via validate-features.js; sync coderooz.json manifests to 1.0.4 ([6def330](https://github.com/coderooz/expo-template-coderooz/commit/6def3306e06961853845ec5532cf1a0577216696))
* **camera:** use expo-camera v17 permission API and valid MediaType values ([047f4d3](https://github.com/coderooz/expo-template-coderooz/commit/047f4d38f5de6d6067151a452fea85a9b9784498))
* **showcase:** give DynamicPages demo flex: 1 so ScrollView renders; add emulator verification report ([84b27a5](https://github.com/coderooz/expo-template-coderooz/commit/84b27a57de7e02f920a3c1556092e37cf0c0c489))
* **template:** make npm scripts standalone-safe in scaffolded apps ([ed11279](https://github.com/coderooz/expo-template-coderooz/commit/ed11279f12dca5dbc9df32b59186704c1282bdd7))
* **update:** safe-merge standalone configs ([a4a7d4b](https://github.com/coderooz/expo-template-coderooz/commit/a4a7d4bc48c741e5e4275158228a11f9f6c3ff31))

## [1.1.0](https://github.com/coderooz/expo-template-coderooz/compare/v1.0.3...v1.1.0) (2026-08-02)


### Features

* **cli:** add CLI and create-app scaffold packages ([769f7ca](https://github.com/coderooz/expo-template-coderooz/commit/769f7caa4b37780cda3525d6c894464633b16f50))
* **core:** add core package with types, validators, and manifest system ([4ef0427](https://github.com/coderooz/expo-template-coderooz/commit/4ef04277bc33a8b39c789a24c17aeaeb45d27d87))
* **feature:** add 8 base feature packages ([0d3db66](https://github.com/coderooz/expo-template-coderooz/commit/0d3db6670f2ddd966bfe16bf8d99135dc1dd3641))
* **feature:** add clerk auth, design system, components, and dynamic page engine ([ed8b523](https://github.com/coderooz/expo-template-coderooz/commit/ed8b5232c5fabb9d8050783334591809483c4988))
* **governance:** add AI governance layer (AGENTS, GOVERNANCE, LLM) ([47f90a3](https://github.com/coderooz/expo-template-coderooz/commit/47f90a3650080f5e4d449475832201bc7dca2c2e))
* **packages:** update feature manifests, template sources, core hooks, cli commands ([d0b95d5](https://github.com/coderooz/expo-template-coderooz/commit/d0b95d5a67846876e360edfcf740e54e4ab426b3))
* **scripts:** add asset bundling and release validation scripts ([3f37436](https://github.com/coderooz/expo-template-coderooz/commit/3f37436a3e99cf72763f69c6ea59c0fd15ce5094))
* **tooling:** config-driven example builder, examples-sync workflow, vN.x release triggers ([f0895f7](https://github.com/coderooz/expo-template-coderooz/commit/f0895f78fb22f133d287c1cb7de292b08016b7ad))


### Bug Fixes

* **build:** validate features via validate-features.js; sync coderooz.json manifests to 1.0.4 ([6def330](https://github.com/coderooz/expo-template-coderooz/commit/6def3306e06961853845ec5532cf1a0577216696))
* **camera:** use expo-camera v17 permission API and valid MediaType values ([047f4d3](https://github.com/coderooz/expo-template-coderooz/commit/047f4d38f5de6d6067151a452fea85a9b9784498))
* **showcase:** give DynamicPages demo flex: 1 so ScrollView renders; add emulator verification report ([84b27a5](https://github.com/coderooz/expo-template-coderooz/commit/84b27a57de7e02f920a3c1556092e37cf0c0c489))
* **template:** make npm scripts standalone-safe in scaffolded apps ([ed11279](https://github.com/coderooz/expo-template-coderooz/commit/ed11279f12dca5dbc9df32b59186704c1282bdd7))
* **update:** safe-merge standalone configs ([a4a7d4b](https://github.com/coderooz/expo-template-coderooz/commit/a4a7d4bc48c741e5e4275158228a11f9f6c3ff31))

## [1.0.4]

### Added
- **AI governance layer** for the template + generated projects:
  - `GOVERNANCE.md` — enforceable rulebook for AI agents (reports, naming, validation, hygiene, security)
  - `LLM.txt` — single-context AI entry point for building projects with the template
  - Expanded `AGENTS.md` — full context for all 12 feature packages, showcase, docs, and governance
  - `GOVERNANCE.md` + `LLM.txt` added to root `package.json` `files` so they ship in the published template
- **Branching strategy** design + implementation — `docs/branching-strategy.md`:
  - `main` as the only permanent source branch (feature source in `packages/feature-*`)
  - `v1.x` release maintenance lines for patches/hotfixes
  - `examples/<name>` artifact branches for generated example apps (CI-synced)
  - No long-lived feature branches; short-lived `feat/*`/`fix/*`/`chore/*`/`docs/*`
  - AI context stays on `main` (a separate AI branch is not beneficial)
  - `scripts/build-example.js` generalized to read `examples/*.json` configs
    (`--config <path>`, default `examples/showcase.json`)
  - `.github/workflows/examples-sync.yml` regenerates example branches on `main` push
  - `release.yml` / `publish.yml` triggers narrowed to `main` + `vN.x`
- docs: `ai-governance.md`, `showcase.md`, and `branching-strategy.md` pages
- docs: nav + sidebar entries for AI Governance, Showcase, Branching Strategy
- docs: index and getting-started reference the AI governance layer

### Changed
- `opencode.jsonc` (root + template) now loads `AGENTS.md` + `GOVERNANCE.md` + `LLM.txt` as instructions
- `GOVERNANCE.md` gained a branching-rules section + AI context maintenance rule
- `AGENTS.md` now leads with `LLM.txt` as the single-context entry point
- Standalone-safe npm scripts: `test`, `build`, `build:all` now delegate to internal
  `:mono` variants inside the monorepo and degrade gracefully in scaffolded apps
  (fixes `No workspaces found` failures). Powered by `scripts/template-scripts.cjs`,
  which ships in the published template.
- `workspaces` simplified to a single `packages/*` glob (no behavior change in the monorepo)
- `app.json` version aligned to `1.0.4`
- docs/changelog.md synced with root CHANGELOG.md

## [1.0.3]

### Added
- AGENTS.md with project context and local docs reference
- opencode.jsonc project-level OpenCode config
- .prettierrc with Tailwind plugin
- .editorconfig for consistent IDE settings
- .nvmrc for Node version pinning
- .env.example for environment variables
- typecheck npm script
- root-level CHANGELOG.md
- **Feature package system** with composable `@coderooz/feature-*` packages
  - `@coderooz/feature-sqlite` — SQLite database with migrations, typed queries, seed data
  - `@coderooz/feature-camera` — Camera capture, gallery picker, image manipulation, permissions
  - `@coderooz/feature-notifs` — Push notifications, local scheduling, channels, permissions
- **Core engine** (`@coderooz/core`) with:
  - Zod-validated feature manifests
  - Config merge/deep merge utilities
  - Template file copier
  - Dependency merger with conflict warnings
  - Hooks engine (providers, navigation, env, config, app-json, services, post-install)
- **Scaffold orchestration** (`@coderooz/create-app`) with:
  - Base project scaffolding via `npx create-expo-app`
  - Multi-feature weaving with conflict detection
  - Feature name resolution (short names → package dirs)
  - Post-install and next-steps print
- **CLI** (`@coderooz/cli`) with:
  - `coderooz create <name>` — scaffold new project
  - `coderooz add <feature>` — add feature to existing project
  - `coderooz list` — list available features
- npm workspaces monorepo config (6 packages)
- **Template reconciliation engine** (`@coderooz/core/src/reconcile.ts`) with:
  - Three modes: `add-missing` (default), `replace`, `update` (smart-merge for JSON)
  - Directory expansion for recursive file tree comparisons
  - Skip-paths support for ignoring node_modules, .git, etc.
  - Per-file action reporting (added/replaced/merged/skipped/unchanged)
- **Update orchestration** (`@coderooz/create-app/src/update.ts`)
  - Reads template manifest from root `package.json` `files` field
  - Logs a summary of all file actions taken
- **CLI update command** (`coderooz update`)
  - `coderooz update` — add missing template files
  - `coderooz update --mode replace` — overwrite everything
  - `coderooz update --mode update` — smart-merge JSON, overwrite rest (preserves app identity + feature plugins)
- Vitest test suite (33 tests) for core modules (manifest, merge, files, reconcile)
- README.md for all 6 packages
- Updated docs/ site with monorepo, CLI, and feature package documentation
- tsconfig.json for feature packages (excludes template/ directory)

### Changed
- README.md updated with monorepo + CLI + feature package documentation
- AGENTS.md updated with full monorepo layout and CLI usage
- docs/index.md, docs/features.md, docs/cli-commands.md, docs/getting-started.md — rewritten for monorepo
- docs/_sidebar.md — fixed broken links
- docs/api-integration.md — strict TypeScript types (removed `any`)
- docs/ui-components.md — fixed component names and usage examples
- docs/changelog.md — synced with root CHANGELOG.md
- Removed stale VitePress config (`docs/assets/.vitepress/`)
- Removed inconsistent `conflicts: []` from camera feature manifest
- Standardized feature package structure (package.json, coderooz.json, template/)

## [1.0.2]

### Added
- GitHub Pages documentation site (VitePress + Jekyll)
- CI/CD workflows (lint, typecheck, test, build)
- CODEOWNERS, dependabot, FUNDING.yml
- Issue templates (bug report, feature request)
- PR template
- SECURITY.md and CODE_OF_CONDUCT.md

## [1.0.1]

### Added
- Base TypeScript + NativeWind setup
- Drawer/stack/tab navigation scaffold
- Context providers (Alert, App, Theme, Toast, User)
- SQLite and notifications dependencies
- EAS build profiles (dev, preview, production)
- ESLint flat config

## [1.0.0]

### Added
- Initial project scaffold
- Expo managed workflow
- TypeScript strict mode
- NativeWind v4 + Tailwind CSS
- Basic file structure (components, screens, hooks, context, lib)
