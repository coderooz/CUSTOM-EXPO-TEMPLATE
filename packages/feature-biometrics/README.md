# @coderooz/feature-biometrics

Biometric authentication for Coderooz Expo projects. Supports fingerprint (Android), Face ID (iOS), and iris scanning where available.

## What's Included

- Biometric availability checking
- Biometric enrollment (device-level)
- Biometric authentication with fallback
- Secure credential storage with biometric protection via `expo-secure-store`
- TypeScript types for biometric policy and results

## Usage

```ts
import { authenticate, isAvailable, getBiometricType } from '@/services/biometrics';

// Check availability
const available = await isAvailable();
if (!available) return;

// Get supported type
const type = await getBiometricType();
console.log(`Supported: ${type}`); // 'fingerprint' | 'facial' | 'iris' | null

// Authenticate
const result = await authenticate({
  promptMessage: 'Verify your identity',
  fallbackLabel: 'Use passcode',
});
```
