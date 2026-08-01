# API Integration Guide

The template provides networking utilities under `src/lib/`:

| File | Purpose |
|------|---------|
| `src/lib/utils.ts` | Shared helpers (formatting, common utilities) |
| `src/lib/storage.ts` | Async Storage wrappers for persisted data |
| `src/lib/fetchData.ts` | Placeholder for your API client (empty by design) |
| `src/lib/connectDb.ts` | Placeholder for database connection setup (empty by design) |

The base template deliberately ships minimal stubs so you can wire your own backend.
A typical `fetch` client looks like:

```ts
// src/lib/api.ts (create this file)
export const api = {
  get: async <T = unknown>(url: string): Promise<T> =>
    fetch(url).then((res) => res.json()),
  post: async <T = unknown>(url: string, data: Record<string, unknown>): Promise<T> =>
    fetch(url, { method: "POST", body: JSON.stringify(data) }).then((res) => res.json()),
};
```

Usage:

```ts
import { api } from "@/lib/api";

const users = await api.get<User[]>("/users");
const created = await api.post<User>("/users", { name: "Alice" });
```

## Environment Variables

Use Expo public environment variables for API endpoints:

```
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
```

```ts
const API_URL = process.env.EXPO_PUBLIC_API_URL;
```

## Related Feature Packages

- `@coderooz/feature-auth` — token management, session persistence, request auth
- `@coderooz/feature-sqlite` — offline data layer with typed queries
- `@coderooz/feature-message` — SMS / OTP / phone validation
