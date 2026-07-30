import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import type { AuthenticateOptions, BiometricStatus, BiometricType } from './types';

const BIOMETRIC_KEY = 'app_biometric_enabled';

export async function isAvailable(): Promise<boolean> {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) return false;

  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return enrolled;
}

export async function getBiometricType(): Promise<BiometricType> {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return 'fingerprint';
  }
  if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
    return 'facial';
  }
  if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
    return 'iris';
  }

  return null;
}

export async function getStatus(): Promise<BiometricStatus> {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  const type = await getBiometricType();

  return {
    isAvailable: compatible && enrolled,
    type,
    isEnrolled: enrolled,
  };
}

export async function authenticate(options: AuthenticateOptions = {}): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: options.promptMessage ?? 'Authenticate',
    fallbackLabel: options.fallbackLabel ?? 'Use passcode',
    cancelLabel: options.cancelLabel ?? 'Cancel',
    disableDeviceFallback: options.disableDeviceFallback ?? false,
  });

  return result.success;
}

export async function isBiometricEnabled(): Promise<boolean> {
  const value = await SecureStore.getItemAsync(BIOMETRIC_KEY);
  return value === 'true';
}

export async function setBiometricEnabled(enabled: boolean): Promise<void> {
  if (enabled) {
    await SecureStore.setItemAsync(BIOMETRIC_KEY, 'true');
  } else {
    await SecureStore.deleteItemAsync(BIOMETRIC_KEY);
  }
}

export async function authenticateWithBiometric(
  promptMessage?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const available = await isAvailable();
    if (!available) {
      return { success: false, error: 'Biometric authentication not available' };
    }

    const result = await authenticate({ promptMessage });
    return { success: result };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export type { AuthenticateOptions, BiometricStatus, BiometricType } from './types';
