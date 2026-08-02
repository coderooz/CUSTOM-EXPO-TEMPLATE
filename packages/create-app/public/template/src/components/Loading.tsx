import {View, Text, ActivityIndicator} from "react-native";

export default function Loading() {
    return (
        <View className="flex-1 justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text className="text-blue-600 mt-4 text-lg font-medium">Loading...</Text>
        </View>

    )
}