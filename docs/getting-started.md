# Getting Started

## Quick Start

### Using the Template

```bash
npx create-expo-app my-app --template expo-template-coderooz
cd my-app
npm start
```

### Using the CLI (recommended for features)

```bash
npx @coderooz/cli create my-app --with sqlite,camera,notifs
cd my-app
npm start
```

## Project Structure

The template follows a clean, scalable structure:

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers (Alert, App, Theme, Toast, User)
├── hooks/          # Custom hooks
├── lib/            # Utilities
├── navigation/     # Route configs
├── screens/        # Screen components
└── services/       # API / DB / Notifications (populated by feature packages)
```

## Adding Features

```bash
cd my-app
npx @coderooz/cli add camera,notifs        # comma-separated
npx @coderooz/cli list                     # see available features
npx @coderooz/cli update                   # sync missing template files
```

Selecting a feature pulls in its dependencies automatically. For example,
`dynamic-pages` also installs `design-system`, `components`, and `sqlite`.

## Monorepo Development

If you want to contribute to the template itself:

```bash
git clone https://github.com/coderooz/expo-template-coderooz
cd expo-template-coderooz
npm install
npm run build         # Build workspace packages
npm run build:all     # Validate all feature packages
npm test              # Run unit tests
npm run lint          # ESLint
npm run typecheck     # TypeScript check
```

## Environment Setup

- Node.js 20+ (see `.nvmrc`)
- Android Studio for Android development
- Xcode for iOS development (macOS only)
- Expo Go or Dev Client for testing

## AI Governance

Every scaffolded project includes an AI-agent governance layer:

- `LLM.txt` — single-context entry point for AI agents building with the template
- `AGENTS.md` — project identity, structure, conventions, workflows
- `GOVERNANCE.md` — enforceable rules (reports, naming, validation, hygiene, security)
- `opencode.jsonc` — OpenCode config that loads these as instructions

These files ship as part of the template. See [AI Governance](ai-governance) for details,
and the [Showcase](showcase) for a full-featured example app.
