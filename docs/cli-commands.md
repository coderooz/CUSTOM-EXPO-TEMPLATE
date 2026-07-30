# CLI Commands

The Coderooz CLI provides commands to scaffold and extend Expo projects.

## Installation

```sh
npm install -g @coderooz/cli
```

Or use directly:

```sh
npx @coderooz/cli <command>
```

## Commands

### `create`

Scaffold a new Expo project with optional features.

```sh
coderooz create <app-name> [options]
```

| Option | Description |
|--------|-------------|
| `--with <features>` | Comma-separated feature list (e.g., `sqlite,camera,notifs`) |
| `--template <name>` | Template name (defaults to `expo-template-coderooz`) |

Examples:

```sh
coderooz create my-app
coderooz create my-app --with sqlite
coderooz create my-app --with sqlite,camera,notifs
```

### `add`

Add a feature to an existing project.

```sh
coderooz add <feature>
```

Example:

```sh
cd my-app
coderooz add camera
```

### `list`

List all available features.

```sh
coderooz list
```

### `update`

Sync an existing project with the latest Coderooz template.

```sh
coderooz update [options]
```

| Option | Description |
|--------|-------------|
| `-m, --mode <mode>` | Reconciliation mode: `add-missing` (default), `replace`, or `update` |
| `-p, --project-dir <path>` | Project directory (defaults to current directory) |

**Modes:**

- `add-missing` — Only add files that don't exist in the project. Never overwrites.
- `replace` — Overwrite all template files, whether they exist or not.
- `update` — Smart-merge JSON configs (`package.json`, `app.json`, `tsconfig.json`), overwrite other files.

Examples:

```sh
coderooz update                                    # add missing files
coderooz update --mode replace                     # full reset
coderooz update --mode update                      # merge configs
coderooz update -p /path/to/project -m update      # specify project
```

## Available Features

| Feature | Package | Description |
|---------|---------|-------------|
| `sqlite` | `@coderooz/feature-sqlite` | SQLite database with migrations |
| `camera` | `@coderooz/feature-camera` | Camera capture & image picker |
| `notifs` | `@coderooz/feature-notifs` | Push & local notifications |

## Template Commands

When using the template directly (without the CLI):

| Command | Action |
|---------|--------|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run on web |
| `npm run lint` | Check lint issues |
| `npm run typecheck` | Run TypeScript type check |
| `npm test` | Run tests |
| `npm run build` | Build workspace packages |
