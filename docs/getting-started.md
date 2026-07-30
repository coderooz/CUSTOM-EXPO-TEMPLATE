# Getting Started

## Quick Start

### Using the Template

```bash
npx create-expo-app MyApp --template expo-template-coderooz
cd MyApp
npm start
```

### Using the CLI (recommended for features)

```bash
npx @coderooz/cli create MyApp --with sqlite,camera,notifs
cd MyApp
npm start
```

## Project Structure

The template follows a clean, scalable structure:

```
src/
├── components/     # Reusable UI (Button, Header, Loading, auth forms)
├── context/        # React context providers (Alert, App, Theme, Toast, User)
├── hooks/          # Custom hooks (useStorage, UserHook)
├── lib/            # Utilities (storage, fetch, connectDb, utils)
├── navigation/     # Route configs (App, Auth, OnBoarding, Splash)
├── screens/        # Screen components (Auth, Home, Setting, Splash)
└── services/       # API / DB / Notifications (populated by feature packages)
```

## Monorepo Development

If you want to contribute to the template itself:

```bash
git clone https://github.com/coderooz/expo-template-coderooz
cd expo-template-coderooz
npm install
npm run build        # Build workspace packages
npm test             # Run tests
npm start            # Start Expo dev server
```

## Environment Setup

- Node.js 20+ (see `.nvmrc`)
- Android Studio for Android development
- Xcode for iOS development (macOS only)
- Expo Go or Dev Client for testing
