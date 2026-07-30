export type BiometricType = 'fingerprint' | 'facial' | 'iris' | null;

export interface AuthenticateOptions {
  promptMessage?: string;
  fallbackLabel?: string;
  cancelLabel?: string;
  disableDeviceFallback?: boolean;
}

export interface BiometricStatus {
  isAvailable: boolean;
  type: BiometricType;
  isEnrolled: boolean;
}
