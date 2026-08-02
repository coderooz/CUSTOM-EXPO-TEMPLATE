import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, useUser, useClerk } from '@clerk/expo';

import type { AuthState, AuthUser } from '@/services/clerk/types';

interface AuthContextValue {
  state: AuthState;
  user: AuthUser | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  signOut: () => Promise<void>;
  getToken: (options?: { template?: string }) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const { signOut: clerkSignOut } = useClerk();

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (clerkUser) {
      setAuthUser({
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
        fullName: clerkUser.fullName,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      });
    } else {
      setAuthUser(null);
    }
  }, [clerkUser]);

  const handleSignOut = async () => {
    await clerkSignOut();
    setAuthUser(null);
  };

  const value: AuthContextValue = {
    state: { isLoaded, isSignedIn: isSignedIn ?? false },
    user: authUser,
    isLoaded,
    isSignedIn: isSignedIn ?? false,
    signOut: handleSignOut,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
