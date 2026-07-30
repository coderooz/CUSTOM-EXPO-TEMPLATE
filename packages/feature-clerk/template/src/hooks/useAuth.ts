import { useAuth, useUser } from '@clerk/expo';

export function useAuth() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const signOut = async () => {
    const { useClerk } = await import('@clerk/expo');
    const { signOut: clerkSignOut } = useClerk();
    await clerkSignOut();
  };

  return {
    isLoaded,
    isSignedIn: isSignedIn ?? false,
    user: user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? '',
          fullName: user.fullName,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        }
      : null,
    getToken,
    signOut,
  };
}
