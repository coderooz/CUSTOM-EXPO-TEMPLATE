export interface AuthState {
  isLoaded: boolean;
  isSignedIn: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
}

export interface AuthError {
  code: string;
  message: string;
  longMessage?: string;
}

export interface FieldErrors {
  identifier?: string;
  password?: string;
  code?: string;
  [key: string]: string | undefined;
}

export type AuthStrategy = 'email' | 'phone' | 'google' | 'apple' | 'github';
