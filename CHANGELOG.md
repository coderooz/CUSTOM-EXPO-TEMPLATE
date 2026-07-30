# Changelog

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
  - `coderooz update --mode update` — smart-merge JSON, overwrite rest
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
