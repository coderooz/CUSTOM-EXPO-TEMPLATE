# @coderooz/feature-sqlite

SQLite database feature for Coderooz Expo projects. Includes database initialization, version-tracked migration system, typed query execution, and seed data support.

## What's Included

- Database initialization with configurable name
- Version-tracked migration system
- Typed query execution (`executeQuery`, `executeRun`)
- Seed data support for empty tables
- `expo-sqlite` plugin auto-registered

## Usage

```ts
import { initializeDatabase, executeQuery, executeRun } from '@/services/db';

await initializeDatabase({ name: 'app.db' });
const users = await executeQuery<User>('SELECT * FROM users WHERE active = ?', true);
await executeRun('UPDATE users SET name = ? WHERE id = ?', 'Alice', 1);
```

## Install

```sh
npx @coderooz/cli add sqlite
```
