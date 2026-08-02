import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Application from 'expo-application';

export default function AboutScreen() {
  const appName = process.env.EXPO_PUBLIC_APP_NAME ?? 'MyApp';
  const appVersion = Application.nativeApplicationVersion ?? '1.0.0';
  const buildNumber = Application.nativeBuildVersion ?? '1';

  const links = [
    { label: 'Website', url: 'https://coderooz.in' },
    { label: 'GitHub', url: 'https://github.com/coderooz' },
    { label: 'Email', url: 'mailto:coderooz@outlook.com' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <View className="items-center py-10">
          <View className="h-20 w-20 items-center justify-center rounded-2xl bg-blue-500">
            <Text className="text-4xl font-bold text-white">
              {appName.charAt(0)}
            </Text>
          </View>

          <Text className="mt-4 text-2xl font-bold text-gray-900">
            {appName}
          </Text>

          <Text className="mt-1 text-sm text-gray-500">
            Version {appVersion} (Build {buildNumber})
          </Text>
        </View>

        <View className="space-y-3">
          {links.map((link) => (
            <TouchableOpacity
              key={link.label}
              onPress={() => Linking.openURL(link.url)}
              className="flex-row items-center justify-between rounded-xl bg-gray-50 px-4 py-4"
            >
              <Text className="text-base text-gray-900">{link.label}</Text>
              <Text className="text-blue-500">Open</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="mt-8 text-center text-xs text-gray-400">
          Made with ❤️ by Coderooz
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
