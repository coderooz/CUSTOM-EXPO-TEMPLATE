# @coderooz/cli

Command-line interface for scaffolding and extending Coderooz Expo projects.

## Usage

```bash
npx @coderooz/cli create my-app --with sqlite,camera
npx @coderooz/cli add camera
npx @coderooz/cli update        # add-missing (default)
npx @coderooz/cli update --mode replace
npx @coderooz/cli update --mode update
npx @coderooz/cli list
```

## Commands

| Command | Description |
|---------|-------------|
| `create <name>` | Scaffold a new project with optional `--with <features>` |
| `add <feature>` | Add a feature to an existing project |
| `update` | Sync an existing project with the latest Coderooz template |
| `list` | List available feature packages |
