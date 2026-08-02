/**@format
 * @coderooz
 * @filePath src/screens/SettingScreen.tsx
 * @accessPath @/screens/SettingScreen
 */
import { Text, View, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 items-center justify-center bg-green-800">
      <Text className="text-2xl font-bold text-blue-500 mb-6">
        Setting Screen
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="bg-blue-600 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">
          Go to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}