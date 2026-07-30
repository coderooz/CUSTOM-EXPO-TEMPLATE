# Coderooz Expo Template

A production-ready **Expo** starter with **TypeScript**, **NativeWind** (Tailwind CSS), and a **monorepo** architecture for composable feature packages.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Expo](https://img.shields.io/badge/Expo-Managed-orange.svg)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-Tailwind-informational)](https://www.nativewind.dev/)

---

## Quick Start

```sh
npx create-expo-app MyApp --template expo-template-coderooz
```

Or with the Coderooz CLI to add features:

```sh
npx @coderooz/cli create MyApp --with sqlite,camera
```

---

## What's Inside

| Layer | Description |
|-------|-------------|
| Expo Template | Base project with TypeScript, NativeWind, navigation, auth, theme |
| Feature Packages | Composable modules (`sqlite`, `camera`, `notifs`) that you opt into |
| CLI Tool | Interactive scaffolding with `npx @coderooz/cli` |

---

## Project Structure

```
expo-template-coderooz/
├── packages/
│   ├── core/              # Shared types, manifest validation, hooks engine
│   ├── create-app/        # Scaffold + weave orchestration
│   ├── cli/               # Commander-based CLI (create, add, list)
│   ├── feature-sqlite/    # SQLite + migration system
│   ├── feature-camera/    # Camera + image picker
│   └── feature-notifs/    # Push + local notifications
├── docs/                  # Jekyll-based documentation site
└── .github/               # CI/CD, issue templates, community files
```

---

## Links

- GitHub: [https://github.com/coderooz/expo-template-coderooz](https://github.com/coderooz/expo-template-coderooz)
- npm: [https://www.npmjs.com/package/expo-template-coderooz](https://www.npmjs.com/package/expo-template-coderooz)
- Issues: GitHub Issues
