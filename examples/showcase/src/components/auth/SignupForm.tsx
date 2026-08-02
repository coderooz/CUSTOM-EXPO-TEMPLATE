/**@format
 * @coderooz
 * @author (Ranit Saha) <codeooz.dev@gmail.com>
 * @description
 * @filePath src/components/auth/signup.tsx 
 * @accessPath  @/components/auth/signup
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0
 */

import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import useUserContext from "@/hooks/UserHook";

export default function SignupForm() {
  
  
  return (
    <View className="space-y-4">
      <View className="flex-row space-x-2 mb-6 gap-2">
        <TextInput
          placeholder="First name"
          className="flex-1 border rounded-xl px-4 py-3 text-base"
        />
        <TextInput
          placeholder="Last name"
          className="flex-1 border rounded-xl px-4 py-3 text-base"
        />
      </View>

      <TextInput
        placeholder="Email"
        className="border rounded-xl px-4 py-3 text-base  mb-6"
      />
      <TextInput
        placeholder="Phone number"
        className="border rounded-xl px-4 py-3 text-base mb-6"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border rounded-xl px-4 py-3 text-base mb-6"
      />

      {/* Button */}
      <TouchableOpacity className="bg-purple-600 py-3 rounded-xl flex-row justify-center gap-2">
        <MaterialCommunityIcons name="account-arrow-left" size={24} color="white" />
        <Text className="text-center text-white font-semibold">Create Account</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <Text className="text-center text-neutral-500 my-1">Or continue with</Text>
      <View className="flex-row justify-center space-x-6 gap-3">
        <TouchableOpacity>
          <FontAwesome name="google" size={28} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={28} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="github" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
