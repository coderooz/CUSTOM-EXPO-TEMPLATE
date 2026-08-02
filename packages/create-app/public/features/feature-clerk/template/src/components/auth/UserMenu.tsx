import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export function UserMenu() {
  const { user, isLoaded, isSignedIn, signOut } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn || !user) return null;

  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      {user.imageUrl ? (
        <Image
          source={{ uri: user.imageUrl }}
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
          <Text className="text-lg font-bold text-white">
            {user.fullName?.charAt(0) ?? user.email.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">
          {user.fullName ?? user.email}
        </Text>
        <Text className="text-sm text-gray-500">{user.email}</Text>
      </View>

      <TouchableOpacity
        onPress={signOut}
        className="rounded-lg border border-red-200 px-3 py-2"
      >
        <Text className="text-sm font-medium text-red-500">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
