import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LICENSES = [
  {
    name: 'expo',
    license: 'MIT',
    description: 'Expo framework and SDK modules',
  },
  {
    name: 'react-native',
    license: 'MIT',
    description: 'React Native core framework',
  },
  {
    name: 'nativewind',
    license: 'MIT',
    description: 'Tailwind CSS for React Native',
  },
  {
    name: 'react-navigation',
    license: 'MIT',
    description: 'Routing and navigation for React Native',
  },
  {
    name: 'react-native-reanimated',
    license: 'MIT',
    description: 'Animation library for React Native',
  },
  {
    name: 'react-native-gesture-handler',
    license: 'MIT',
    description: 'Gesture handling for React Native',
  },
];

export default function LicensesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <Text className="py-4 text-2xl font-bold text-gray-900">
          Open Source Licenses
        </Text>

        <Text className="mb-6 text-sm leading-5 text-gray-500">
          This app uses the following open source libraries. We are grateful to
          the maintainers and contributors.
        </Text>

        {LICENSES.map((lib) => (
          <View
            key={lib.name}
            className="mb-3 rounded-xl border border-gray-200 px-4 py-4"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-gray-900">
                {lib.name}
              </Text>
              <View className="rounded-md bg-blue-50 px-2 py-0.5">
                <Text className="text-xs font-medium text-blue-600">
                  {lib.license}
                </Text>
              </View>
            </View>
            <Text className="mt-1 text-sm text-gray-500">
              {lib.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
