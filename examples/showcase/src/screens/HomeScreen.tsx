/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/screens/HomeScreen.tsx
 * @accessPath @/screens/HomeScreen
 * @description Home Screen page
 * @created 2025-11-21
 * @lastModified 2025-11-22
 * @version 1.0.0
 */

import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/items/Button";
import storage from "@/lib/storage";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const handleClearLogs = async () => {
    try {
      await storage.clear(); // Clear all async storage
      Alert.alert("Success", "All stored data has been cleaned.");
    } catch (error) {
      Alert.alert("Error", "Unable to clear data. Try again later.");
      console.log("Clear Error:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-green-800">
      <Text className="text-2xl font-bold text-blue-500 mb-6">
        Home Screen
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        className="bg-blue-600 px-6 py-3 rounded-lg mb-6"
      >
        <Text className="text-white font-semibold text-lg">
          Go to Settings
        </Text>
      </TouchableOpacity>

      <Button
        variant="default"
        className="px-3 py-3 rounded-lg bg-white"
        onPress={handleClearLogs}
      >
        <Text className="text-black font-bold">Clean Logs</Text>
      </Button>
    </View>
  );
}