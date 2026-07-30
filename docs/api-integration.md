# API Integration Guide

Use `src/lib/api.ts` as base:

```ts
export const api = {
  get: async <T = unknown>(url: string): Promise<T> =>
    fetch(url).then(res => res.json()),
  post: async <T = unknown>(url: string, data: Record<string, unknown>): Promise<T> =>
    fetch(url, { method: "POST", body: JSON.stringify(data) }).then(res => res.json()),
};
```

Usage:

```ts
import { api } from "@/lib/api";

const users = await api.get<User[]>("/users");
const created = await api.post<User>("/users", { name: "Alice" });
```
