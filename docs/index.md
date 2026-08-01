# Coderooz Expo Template

A production-ready **Expo** starter with **TypeScript**, **NativeWind** (Tailwind CSS), and a **monorepo** architecture for composable feature packages.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Expo](https://img.shields.io/badge/Expo-Managed-orange.svg)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-Tailwind-informational)](https://www.nativewind.dev/)

---

## Quick Start

```sh
npx create-expo-app my-app --template expo-template-coderooz
```

Or with the Coderooz CLI to add features:

```sh
npx @coderooz/cli create my-app --with sqlite,camera
```

---

## What's Inside

| Layer | Description |
|-------|-------------|
| Expo Template | Base project with TypeScript, NativeWind, navigation, theme |
| Feature Packages | 12 composable modules (`sqlite`, `camera`, `notifs`, `dynamic-pages`, ...) |
| CLI Tool | Interactive scaffolding with `npx @coderooz/cli` (create / add / list / update) |
| AI Governance | `AGENTS.md` + `GOVERNANCE.md` ship in every scaffolded project |
| Showcase | `examples/showcase/` — a runnable app demonstrating all 12 features |

---

## Project Structure

```
expo-template-coderooz/
├── packages/
│   ├── core/              # Types, manifest validation, config merge, hooks engine
│   ├── create-app/        # Scaffold + weave orchestration
│   ├── cli/               # Commander-based CLI (create, add, list, update)
│   └── feature-*/         # 12 composable feature packages
├── docs/                  # Jekyll-based documentation site
├── scripts/               # Build + release validation tooling
└── .github/               # CI/CD, issue templates, community files
```

---

## Links

- GitHub: [https://github.com/coderooz/expo-template-coderooz](https://github.com/coderooz/expo-template-coderooz)
- npm: [https://www.npmjs.com/package/expo-template-coderooz](https://www.npmjs.com/package/expo-template-coderooz)
- Issues: GitHub Issues

## For AI Agents

Every scaffolded project ships with an AI governance layer — `LLM.txt`, `AGENTS.md`, and
`GOVERNANCE.md` give AI coding agents full context on how to use the template. Read
[AI Governance](/ai-governance) for the enforceable rules, see the
[Showcase](/showcase) for a full-featured example app, or the
[Branching Strategy](/branching-strategy) for how the repository is organized.
