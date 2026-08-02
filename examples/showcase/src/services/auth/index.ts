import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';

import type { AuthCredentials, SignupData, AuthSession, AuthUser, AuthState } from './types';

const TOKEN_KEY = process.env.EXPO_PUBLIC_AUTH_TOKEN_KEY ?? 'app_auth_token';
const REFRESH_TOKEN_KEY = 'app_refresh_token';
const USER_KEY = 'app_auth_user';

class AuthService {
  private state: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    token: null,
  };

  private listeners: Set<(state: AuthState) => void> = new Set();

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  async login(credentials: AuthCredentials): Promise<AuthSession> {
    this.state = { ...this.state, isLoading: true };
    this.notify();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const session: AuthSession = await response.json();

      await SecureStore.setItemAsync(TOKEN_KEY, session.token);
      if (session.refreshToken) {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, session.refreshToken);
      }
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(session.user));

      this.state = {
        isLoading: false,
        isAuthenticated: true,
        user: session.user,
        token: session.token,
      };
      this.notify();

      return session;
    } catch (error) {
      this.state = { ...this.state, isLoading: false };
      this.notify();
      throw error;
    }
  }

  async signup(data: SignupData): Promise<AuthSession> {
    this.state = { ...this.state, isLoading: true };
    this.notify();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const session: AuthSession = await response.json();

      await SecureStore.setItemAsync(TOKEN_KEY, session.token);
      if (session.refreshToken) {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, session.refreshToken);
      }
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(session.user));

      this.state = {
        isLoading: false,
        isAuthenticated: true,
        user: session.user,
        token: session.token,
      };
      this.notify();

      return session;
    } catch (error) {
      this.state = { ...this.state, isLoading: false };
      this.notify();
      throw error;
    }
  }

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);

    this.state = {
      isLoading: false,
      isAuthenticated: false,
      user: null,
      token: null,
    };
    this.notify();
  }

  async restoreSession(): Promise<AuthState> {
    this.state = { ...this.state, isLoading: true };
    this.notify();

    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userJson = await SecureStore.getItemAsync(USER_KEY);

      if (!token || !userJson) {
        this.state = {
          isLoading: false,
          isAuthenticated: false,
          user: null,
          token: null,
        };
        this.notify();
        return this.state;
      }

      const user: AuthUser = JSON.parse(userJson);

      this.state = {
        isLoading: false,
        isAuthenticated: true,
        user,
        token,
      };
      this.notify();

      return this.state;
    } catch {
      await this.logout();
      return this.state;
    }
  }

  async getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token !== null;
  }

  async refreshToken(): Promise<string | null> {
    const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    if (!refresh) return null;

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refresh }),
      });

      if (!response.ok) {
        await this.logout();
        return null;
      }

      const data = await response.json();
      await SecureStore.setItemAsync(TOKEN_KEY, data.token);

      this.state = { ...this.state, token: data.token };
      this.notify();

      return data.token;
    } catch {
      await this.logout();
      return null;
    }
  }

  async generateState(): Promise<string> {
    return Crypto.randomUUID();
  }

  getRedirectUri(): string {
    return makeRedirectUri();
  }

  async openBrowser(url: string): Promise<void> {
    await WebBrowser.openAuthSessionAsync(url);
  }
}

export const authService = new AuthService();
export type { AuthCredentials, SignupData, AuthSession, AuthUser, AuthState, AuthProvider } from './types';
