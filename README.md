# Coderooz — Expo Template

<p align="center">
  <img src=".github/assets/banner.svg" alt="Coderooz — Expo Template" width="100%" />
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Expo](https://img.shields.io/badge/Expo-Managed-orange.svg)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-Tailwind-informational)](https://www.nativewind.dev/)
[![CI Status](https://img.shields.io/badge/CI-Passing-brightgreen)](.github/workflows/ci.yml)

A production-ready Expo starter with TypeScript, NativeWind (Tailwind CSS), navigation, and composable feature packages — crafted for teams and solo developers building real apps fast.

---

## ✨ Features

| Category | Tech |
|----------|------|
| Framework | Expo (Managed Workflow) |
| Language | TypeScript (strict) |
| UI | NativeWind (Tailwind CSS) + Prettier plugin |
| Navigation | Stack + Drawer + Bottom Tabs |
| Storage | SQLite via feature package |
| Notifications | Push + local via feature package |
| Updates | Expo OTA Updates |
| Monorepo | npm workspaces with composable feature packages |
| CLI | Interactive scaffolding with `@coderooz/cli` |

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
npx @coderooz/cli add camera
npx @coderooz/cli update              # add missing template files
npx @coderooz/cli update --mode replace  # overwrite everything
npx @coderooz/cli update --mode update   # smart-merge configs
```

---

## 📁 Project Structure

```
.
├── packages/
│   ├── core/              # Shared types, manifest validation, hooks engine
│   ├── create-app/        # Scaffold + weave orchestration
│   ├── cli/               # Commander-based CLI
│   ├── feature-sqlite/    # SQLite + migration system
│   ├── feature-camera/    # Camera + image picker
│   └── feature-notifs/    # Push + local notifications
├── docs/                  # Jekyll documentation site (GitHub Pages)
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

## 🧩 Feature Packages

| Feature | Package | Description |
|---------|---------|-------------|
| SQLite | `@coderooz/feature-sqlite` | Database with migrations, typed queries, seed data |
| Camera | `@coderooz/feature-camera` | Camera capture, gallery picker, permissions |
| Notifications | `@coderooz/feature-notifs` | Push tokens, local notifications, channels |

Each feature is a `coderooz.json` manifest + `template/` directory that gets woven into your project — copying files, merging configs, installing dependencies, and running hooks.

---

## 🛠️ Monorepo Development (Contributors)

```bash
git clone https://github.com/coderooz/expo-template-coderooz
cd expo-template-coderooz
npm install
npm run build        # Build workspace packages
npm test             # Run tests (22+ passing)
npm start            # Start Expo dev server
```

### Before pushing

```bash
npm run lint
npm run typecheck
npm test
```

---

## 🗺️ Roadmap

| Status | Item |
|--------|------|
| ✔️ | Base TypeScript + NativeWind |
| ✔️ | Drawer/stack/tab navigation |
| ✔️ | Feature package system (sqlite, camera, notifs) |
| ✔️ | Interactive CLI (create, add, list) |
| 🔜 | Publish all packages to npm |
| 🔜 | shadcn/ui-style preset system |
| 🔜 | CI: Expo Doctor + type checks |
| 🔜 | More feature packages (auth, analytics, maps) |

---

## 📚 References & Documentation

| Resource | Link |
|----------|------|
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
