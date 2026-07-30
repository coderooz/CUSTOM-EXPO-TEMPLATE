# Coderooz Expo Template — Project Guide

## Identity

- **Project:** `expo-template-coderooz`
- **Owner:** Coderooz (Ranit Saha)
- **Stack:** Expo (Managed) + TypeScript (strict) + NativeWind (Tailwind) + React Navigation
- **GitHub:** https://github.com/coderooz/expo-template-coderooz
- **npm:** https://www.npmjs.com/package/expo-template-coderooz
- **Monorepo:** npm workspaces in `packages/*`
- **npm Packages:** 4 published packages — `expo-template-coderooz` (template), `@coderooz/core`, `@coderooz/create-app`, `@coderooz/cli` — plus 3 feature packages (`@coderooz/feature-*`) for local consumption

## Purpose

Production-ready Expo starter template with composable feature packages. Used via `create-expo-app --template expo-template-coderooz` or the Coderooz CLI (`npx @coderooz/cli create my-app --with sqlite,camera`).

## Package Layout

```
packages/
├── core/              # Types, manifest validation, config merge, hooks engine
├── create-app/        # Scaffold + weave orchestration
├── cli/               # Commander-based CLI (create, add, list)
├── feature-sqlite/    # SQLite + migration system
├── feature-camera/    # Camera + image picker
└── feature-notifs/    # Push + local notifications
```

Each feature package has a `coderooz.json` manifest and `template/` directory copied into the target project.

## Conventions

- TypeScript strict mode
- `interface` for object shapes, `type` for unions/utilities
- `const` over `let`, never `var`
- `async/await` over raw promises
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Conventional commits: `type(scope): message`
- No comments in code unless explicitly asked

## Workflows

- `npm run build` — Build workspace packages (core, create-app, cli)
- `npm run test` — Run Vitest tests for core
- `npm run lint` — ESLint via expo
- `npm run typecheck` — TypeScript `--noEmit`

## CLI Usage

```bash
npx @coderooz/cli create <name> [--with sqlite,camera,notifs]
npx @coderooz/cli add <feature>
npx @coderooz/cli update [-m add-missing|replace|update]
npx @coderooz/cli list
```

## Local Documentation

Offline documentation sets available at `C:\Code_Works\Docs\`. Key sets:

| Set | Path |
|-----|------|
| Expo SDK | `C:\Code_Works\Docs\expo\` |
| React Native | `C:\Code_Works\Docs\react\` |
| Tailwind CSS | `C:\Code_Works\Docs\tailwindcss\` |
| React Navigation | `C:\Code_Works\Docs\react\` |
| GitHub Actions | `C:\Code_Works\Docs\github\` |
| npm | `C:\Code_Works\Docs\npm\` |
| OpenCode | `C:\Code_Works\Docs\opencode\` |

Full catalog: `C:\Code_Works\Docs\DOCS_CATALOG.md`
