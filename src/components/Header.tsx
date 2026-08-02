import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { StackHeaderProps } from "@react-navigation/stack";

export default function HeaderComponent({ navigation, route, options, back }: StackHeaderProps) {
  const title =
    options?.title !== undefined
      ? options.title
      : route?.name ?? "Header";

  return (
    <View className="w-full h-24 bg-slate-300 flex-row items-center justify-between px-4">
      <View className="flex-1 justify-center items-center bg-red-500">
        {back && (
          <TouchableOpacity onPress={navigation.goBack} className="">
            <Ionicons name="arrow-back" size={22} color="black" />
          </TouchableOpacity>
        )}

        <Text className="text-2xl font-bold text-black flex-1">
          {title}
        </Text>
      </View>
      <TouchableOpacity className="mr-3" onPress={()=>navigation.navigate("Settings")}>
        <Ionicons name="settings" size={22} color="black"/>
      </TouchableOpacity>
    </View>
  );
}
