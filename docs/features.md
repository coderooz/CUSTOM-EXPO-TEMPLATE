# Features

## Base Template Features

| Category | Details |
|----------|---------|
| Framework | Expo (Managed Workflow) |
| Language | TypeScript (strict) |
| Styling | NativeWind v4 (Tailwind CSS) |
| Navigation | Stack + Drawer + Bottom Tabs |
| State | React Context providers (Alert, App, Theme, Toast, User) |
| Storage | Async Storage helpers |
| Auth | Auth context structure |
| Notifications | Expo Notifications utilities |
| Updates | Expo OTA Updates |
| Dev Experience | ESLint + Prettier + Metro configured |

## Feature Packages

Feature packages are composable modules that can be added to any Coderooz project.

### SQLite (`@coderooz/feature-sqlite`)

- Database initialization with configurable name
- Version-tracked migration system
- Typed query execution (`executeQuery`, `executeRun`)
- Seed data support for empty tables
- `expo-sqlite` plugin auto-registered

### Camera (`@coderooz/feature-camera`)

- Camera capture via `expo-camera`
- Image picker from gallery via `expo-image-picker`
- Image manipulation via `expo-image-manipulator`
- Unified permission handling
- React hook (`useCamera`) with flash and camera type toggling
- `expo-image-picker` plugin auto-registered

### Notifications (`@coderooz/feature-notifs`)

- Push notification registration with Expo push token
- Local notification scheduling and sending
- Notification response listener
- Android channel management (default, alerts, updates)
- Permission handling

## Feature Hook System

Each feature package includes a `coderooz.json` manifest that defines:

```json
{
  "name": "feature-name",
  "hooks": {
    "providers": [{ "import": "Provider", "path": "./Provider" }],
    "env": { "KEY": "value" },
    "config": [{ "file": "app.json", "path": "...", "value": "...", "type": "plugin" }],
    "app-json": ["expo-plugin"],
    "navigation": [{ "type": "add-screens", "group": "...", "screens": [] }],
    "services": [{ "import": "...", "path": "...", "initCall": "..." }],
    "post-install": [{ "command": "...", "cwd": "..." }]
  },
  "dependencies": {
    "expo-package": "~1.0.0"
  }
}
```
