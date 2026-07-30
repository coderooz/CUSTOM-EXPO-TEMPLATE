# Changelog

## 1.0.3

### Added
- AGENTS.md with project context and local docs reference
- opencode.jsonc project-level OpenCode config
- .prettierrc with Tailwind plugin
- .editorconfig for consistent IDE settings
- .nvmrc for Node version pinning
- .env.example for environment variables
- Root-level CHANGELOG.md
- Vitest test suite (22 tests) for core modules
- Workspace build scripts (`npm run build`, `npm test`)

### Changed
- README.md documentation improvements
- Migrated to npm workspaces monorepo
- Standardized gitignore at root level

## 1.0.2

### Added
- GitHub Pages documentation site (Jekyll)
- CI/CD workflows (lint, typecheck, test, build)
- CODEOWNERS, dependabot, FUNDING.yml
- Issue templates (bug report, feature request)
- PR template
- SECURITY.md and CODE_OF_CONDUCT.md

## 1.0.1

### Added
- Base TypeScript + NativeWind setup
- Drawer/stack/tab navigation scaffold
- Context providers (Alert, App, Theme, Toast, User)
- SQLite and notifications dependencies
- EAS build profiles (dev, preview, production)
- ESLint flat config

## 1.0.0 — Initial Release

- Initial project scaffold
- Expo managed workflow
- TypeScript strict mode
- NativeWind v4 + Tailwind CSS
- Basic file structure (components, screens, hooks, context, lib)
