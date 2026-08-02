export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData extends AuthCredentials {
  name: string;
  [key: string]: unknown;
}

export interface AuthSession {
  token: string;
  refreshToken?: string;
  user: AuthUser;
  expiresAt?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
}

export type AuthProvider = 'jwt' | 'oauth';
