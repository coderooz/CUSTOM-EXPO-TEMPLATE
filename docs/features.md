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

Feature packages are composable modules that can be added to any Coderooz project. Each is a `coderooz.json` manifest + `template/` directory. Dependencies declared in `requires` are pulled in automatically.

### Auth (`@coderooz/feature-auth`)

- Provider-agnostic authentication service
- Token management and session persistence
- Pluggable auth providers

### Biometrics (`@coderooz/feature-biometrics`)

- Biometric authentication (fingerprint, Face ID)
- Secure credential storage
- Permission handling

### Camera (`@coderooz/feature-camera`)

- Camera capture via `expo-camera`
- Image picker from gallery via `expo-image-picker`
- Image manipulation via `expo-image-manipulator`
- Unified permission handling
- React hook (`useCamera`) with flash and camera type toggling
- `expo-image-picker` plugin auto-registered

### Clerk (`@coderooz/feature-clerk`)

- Clerk authentication integration
- Sign-in, sign-up, and OAuth flows
- User profile and session management

### Components (`@coderooz/feature-components`)

- Reusable UI components: buttons, inputs, dialogs, sheets, snackbars
- Component states and screen layouts
- **Requires:** `design-system`

### Design System (`@coderooz/feature-design-system`)

- Design tokens (spacing, typography, radius, shadows)
- Color schemes with semantic scales
- Theme engine (light / dark / high-contrast)
- Primitive components

### Dynamic Pages (`@coderooz/feature-dynamic-pages`)

- Config-driven runtime page resolution
- Template / component / action registries
- SQLite-backed config caching with network fallback
- Hot-reload of page configs
- **Requires:** `design-system`, `components`, `sqlite`

### Icons (`@coderooz/feature-icons`)

- Typed icon system
- Vector icons with SVG registry
- Icon button components

### Messages (`@coderooz/feature-message`)

- SMS sending
- OTP auto-read from clipboard
- Phone number validation and messaging utilities

### Notifications (`@coderooz/feature-notifs`)

- Push notification registration with Expo push token
- Local notification scheduling and sending
- Notification response listener
- Android channel management (default, alerts, updates)
- Permission handling

### Pages (`@coderooz/feature-pages`)

- Standard info screens: About, Licenses, Policies, App Info

### SQLite (`@coderooz/feature-sqlite`)

- Database initialization with configurable name
- Version-tracked migration system
- Typed query execution (`executeQuery`, `executeRun`)
- Seed data support for empty tables
- `expo-sqlite` plugin auto-registered

## Feature Hook System

Each feature package includes a `coderooz.json` manifest that defines:

```json
{
  "name": "feature-name",
  "version": "1.0.4",
  "requires": ["design-system"],
  "provides": ["ui", "states"],
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
