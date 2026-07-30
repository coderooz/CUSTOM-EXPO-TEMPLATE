import React from 'react';
import { ClerkProvider as BaseClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import * as WebBrowser from 'expo-web-browser';

import { getPublishableKey, getTokenCache } from '@/services/clerk';

interface ClerkProviderProps {
  children: React.ReactNode;
  publishableKey?: string;
}

export function ClerkProvider({
  children,
  publishableKey,
}: ClerkProviderProps) {
  const key = publishableKey ?? getPublishableKey();
  const cache = tokenCache ?? getTokenCache();

  WebBrowser.maybeCompleteAuthSession();

  return (
    <BaseClerkProvider publishableKey={key} tokenCache={cache}>
      {children}
    </BaseClerkProvider>
  );
}
