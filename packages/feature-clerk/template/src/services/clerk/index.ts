const TOKEN_CACHE_KEY = 'clerk_session';

export function getTokenCache() {
  return {
    getToken: async (key: string): Promise<string | null> => {
      try {
        const SecureStore = require('expo-secure-store');
        return await SecureStore.getItemAsync(key);
      } catch {
        return null;
      }
    },
    saveToken: async (key: string, value: string): Promise<void> => {
      try {
        const SecureStore = require('expo-secure-store');
        await SecureStore.setItemAsync(key, value);
      } catch {
        return;
      }
    },
    deleteToken: async (key: string): Promise<void> => {
      try {
        const SecureStore = require('expo-secure-store');
        await SecureStore.deleteItemAsync(key);
      } catch {
        return;
      }
    },
  };
}

export function validatePublishableKey(key: string | undefined): key is string {
  if (!key) {
    console.error(
      'Missing Clerk Publishable Key. Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file.',
    );
    return false;
  }
  return true;
}

export function getPublishableKey(): string {
  const key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!validatePublishableKey(key)) {
    throw new Error('Clerk Publishable Key is required');
  }
  return key;
}

export async function getAuthToken(
  getToken: (options?: { template?: string }) => Promise<string | null>,
  template?: string,
): Promise<string | null> {
  try {
    return await getToken({ template });
  } catch {
    return null;
  }
}

export function buildAuthHeader(token: string | null): Record<string, string> {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
