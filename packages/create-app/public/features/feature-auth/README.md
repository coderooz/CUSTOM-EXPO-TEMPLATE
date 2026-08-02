# @coderooz/feature-auth

Authentication service for Coderooz Expo projects. Provides a service-based auth system with token management, session persistence, and provider-agnostic design.

## What's Included

- Auth service with login, signup, logout, and token refresh
- Secure token storage via `expo-secure-store`
- Session persistence across app restarts
- Provider-agnostic — works with any backend API
- TypeScript types for auth state and payloads

## Usage

```ts
import { authService } from '@/services/auth';

// Login
const session = await authService.login({ email, password });
console.log(session.user.name);

// Check auth state
const isAuthenticated = await authService.isAuthenticated();

// Logout
await authService.logout();
```

## Install

```sh
npx @coderooz/cli add auth
```
