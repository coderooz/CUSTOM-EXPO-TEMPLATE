import { useSSO } from '@clerk/expo';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

interface OAuthButtonsProps {
  onError?: (error: string) => void;
}

const PROVIDERS = [
  { strategy: 'oauth_google' as const, label: 'Google', icon: 'G' },
  { strategy: 'oauth_apple' as const, label: 'Apple', icon: 'A' },
  { strategy: 'oauth_github' as const, label: 'GitHub', icon: 'GH' },
];

export function OAuthButtons({ onError }: OAuthButtonsProps) {
  const { startSSOFlow } = useSSO();

  const handleOAuth = async (strategy: string) => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Platform.select({
          web: window.location.href,
          default: 'yourapp://auth/callback',
        }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'OAuth failed';
      onError?.(message);
    }
  };

  const filtered = Platform.OS === 'ios'
    ? PROVIDERS
    : PROVIDERS.filter((p) => p.strategy !== 'oauth_apple');

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-4">
        <View className="h-px flex-1 bg-gray-200" />
        <Text className="text-sm text-gray-500">Or continue with</Text>
        <View className="h-px flex-1 bg-gray-200" />
      </View>

      <View className="flex-row justify-center gap-4">
        {filtered.map((provider) => (
          <TouchableOpacity
            key={provider.strategy}
            onPress={() => handleOAuth(provider.strategy)}
            className="h-12 w-12 items-center justify-center rounded-full border border-gray-300"
            accessibilityLabel={`Sign in with ${provider.label}`}
          >
            <Text className="text-lg font-bold text-gray-700">
              {provider.icon}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
