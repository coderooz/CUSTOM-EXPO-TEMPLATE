# @coderooz/feature-clerk

Clerk authentication for Coderooz Expo projects. Uses `@clerk/expo` with custom flows — works in Expo Go and on development builds.

## What's Included

- `ClerkProvider` root setup with `tokenCache` (session survives app restarts)
- `AuthProvider` context wrapping Clerk hooks — integrates with existing app
- Sign-in form (email + password) with combined sign-in-or-up flow
- Sign-up form (email + password + email verification)
- OAuth buttons (Google, Apple, GitHub)
- `UserMenu` component with user avatar and sign-out
- `useAuth` hook — typed wrapper around `useAuth()` + `useUser()`
- Auth service utilities for backend calls and token management
- Expo Router layout guards for protected routes
- Captcha mount point included on sign-up

## Prerequisites

1. Clerk Dashboard → **Native applications** — enable it
2. Enable auth strategies under **User & authentication**
3. Add `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` to your `.env` file
4. Add `"expo-secure-store"` and `"@clerk/expo"` to `app.json` plugins

## Usage

```tsx
// Wrap your app with the ClerkProvider
import { ClerkProvider } from '@/context/ClerkProvider';

export default function App() {
  return <ClerkProvider>{/* Your app */}</ClerkProvider>;
}

// Use the auth hook
import { useAuth } from '@/hooks/useAuth';

function Profile() {
  const { user, isSignedIn, signOut } = useAuth();
  if (!isSignedIn) return <SignInScreen />;
  return <Text>Hello {user?.fullName}</Text>;
}
```
