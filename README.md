# Coderooz — Expo Template

<p align="center">
  <img src=".github/assets/banner.svg" alt="Coderooz — Expo Template" width="100%" />
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Expo](https://img.shields.io/badge/Expo-Managed-orange.svg)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-Tailwind-informational)](https://www.nativewind.dev/)

A production-ready Expo starter with TypeScript, NativeWind (Tailwind CSS), navigation, and a composable feature-package system — crafted for teams and solo developers building real apps fast.

---

## ✨ Features

| Category | Tech |
|----------|------|
| Framework | Expo (Managed Workflow) |
| Language | TypeScript (strict) |
| UI | NativeWind (Tailwind CSS) + Prettier plugin |
| Navigation | Stack + Drawer + Bottom Tabs |
| Storage | SQLite via `@coderooz/feature-sqlite` |
| Notifications | Push + local via `@coderooz/feature-notifs` |
| Updates | Expo OTA Updates |
| Monorepo | npm workspaces with composable feature packages |
| CLI | Scaffolding with `@coderooz/cli` (create / add / list / update) |

---

## 🚀 Quick Start

### Use the template directly (no extra features)

```bash
npx create-expo-app my-app --template expo-template-coderooz
cd my-app
npm start
```

### Use the CLI (recommended — choose your features)

```bash
npx @coderooz/cli create my-app --with sqlite,camera,notifs
cd my-app
npm start
```

### Add features or update an existing project

```bash
cd my-app
npx @coderooz/cli add camera,notifs      # comma-separated works too
npx @coderooz/cli update                 # add missing template files
npx @coderooz/cli update --mode replace  # overwrite everything
npx @coderooz/cli update --mode update   # smart-merge configs
npx @coderooz/cli list                   # list available features
```

---

## 📁 Project Structure

```
.
├── packages/
│   ├── core/              # Types, manifest validation, config merge, hooks engine
│   ├── create-app/        # Scaffold + weave orchestration
│   ├── cli/               # Commander-based CLI
│   └── feature-*/         # 12 composable feature packages
├── docs/                  # Jekyll documentation site (GitHub Pages)
├── scripts/               # Build + release validation tooling
├── .github/               # CI/CD, issue templates, community files
├── App.tsx                # Template app entry
└── src/
    ├── components/        # Reusable UI components
    ├── context/           # React context providers
    ├── hooks/             # Custom hooks
    ├── lib/               # Utilities
    ├── navigation/        # Route configs
    ├── screens/           # Screen components
    └── services/          # API / DB / Notifications (populated by features)
```

---

## 🧩 Feature Packages (12)

| Feature | Package | Requires | Provides |
|---------|---------|----------|----------|
| Auth | `@coderooz/feature-auth` | — | token mgmt, sessions |
| Biometrics | `@coderooz/feature-biometrics` | — | fingerprint / Face ID |
| Camera | `@coderooz/feature-camera` | — | capture, picker, permissions |
| Clerk | `@coderooz/feature-clerk` | — | sign-in/up, OAuth, profile |
| Components | `@coderooz/feature-components` | design-system | UI, states, layouts |
| Design System | `@coderooz/feature-design-system` | — | theme, primitives |
| Dynamic Pages | `@coderooz/feature-dynamic-pages` | design-system, components, sqlite | page-engine, screens |
| Icons | `@coderooz/feature-icons` | — | typed icons |
| Messages | `@coderooz/feature-message` | — | SMS, OTP, phone validation |
| Notifications | `@coderooz/feature-notifs` | — | push, local, channels |
| Pages | `@coderooz/feature-pages` | — | About, Licenses, Policies |
| SQLite | `@coderooz/feature-sqlite` | — | migrations, typed queries |

Each feature is a `coderooz.json` manifest + `template/` directory that gets woven into your project — copying files, merging configs, installing dependencies, and running hooks. Dependencies declared in `requires` are pulled in automatically: selecting `dynamic-pages` also installs `design-system`, `components`, and `sqlite`.

---

## 🛠️ Monorepo Development (Contributors)

```bash
git clone https://github.com/coderooz/expo-template-coderooz
cd expo-template-coderooz
npm install
npm run build          # Build core, create-app, cli
npm run build:all      # Validate all 12 feature packages
npm test               # Unit tests (core, design-system, dynamic-pages)
npm run lint           # ESLint via expo
npm run typecheck      # TypeScript --noEmit
```

### Before pushing

```bash
npm run lint
npm run typecheck
npm test
npm run build:all
```

---

## 🗺️ Roadmap

| Status | Item |
|--------|------|
| ✔️ | Base TypeScript + NativeWind |
| ✔️ | Drawer/stack/tab navigation |
| ✔️ | 12 composable feature packages |
| ✔️ | Interactive CLI (create, add, list, update) |
| ✔️ | All packages published to npm |
| ✔️ | Example showcase app (`examples/showcase`) |
| ✔️ | CI: lint, typecheck, test, build on every PR |
| 🔜 | CI: Expo Doctor checks |
| 🔜 | shadcn/ui-style preset system |

---

## 📚 References & Documentation

| Resource | Link |
|----------|------|
| Project docs | https://coderooz.github.io/expo-template-coderooz/ |
| Expo docs | https://docs.expo.dev |
| NativeWind | https://www.nativewind.dev |
| React Navigation | https://reactnavigation.org |
| Expo SQLite | https://docs.expo.dev/versions/latest/sdk/sqlite |
| Expo Notifications | https://docs.expo.dev/versions/latest/sdk/notifications |

---

## 🙋 Support

- ⭐ Star the repository
- 🗣️ Share with other Expo developers
- 🤝 Contribute features and fixes

Discussions, feature requests & issues: https://github.com/coderooz/expo-template-coderooz/issues

---

## 👤 Author

**Coderooz (Ranit Saha)**
- GitHub: https://github.com/coderooz
- Website: https://coderooz.in
- Email: coderooz@outlook.com

---

## 📜 License

MIT © Coderooz
