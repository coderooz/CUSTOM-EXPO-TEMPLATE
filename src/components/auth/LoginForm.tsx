/**@format
 * @coderooz
 * @author (Ranit Saha) <codeooz.dev@gmail.com>
 * @description
 * @filePath src/components/auth/login.tsx 
 * @accessPath  @/components/auth/login
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0
 */

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import useUserContext from "@/hooks/UserHook";
import { useState } from "react";


export default function LoginForm() {
  const { setUserData } = useUserContext();
  const [ inputMain, setInputMain ] = useState<string | undefined>();
  const [inputPassword, serInputPassword] = useState<string | undefined>();
  const SubmitForm = () => {
    setUserData({
      id: 1,
      userName: inputMain as string,
      name: {
        first_name: "User_First",
        last_name: "User_Last",
        full_name : "User_First User_Last",
      },
      clerkId: 1,
      isLogged: true
    })
  }

  return (
    <View className="space-y-4">
      {/* Inputs */}
      <TextInput
        placeholder="Email / Phone / Username"
        className="border rounded-xl px-4 py-3 text-base mb-6"
        value={inputMain}
        onChangeText={(val)=>setInputMain(val)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border rounded-xl px-4 py-3 text-base mb-6"
        value={inputPassword}
        onChangeText={(val)=>serInputPassword(val)}
      />

      {/* Forgot + MPIN / FP */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity>
          <Text className="text-purple-600 font-semibold">Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-purple-600 font-semibold">Use MPIN / Fingerprint</Text>
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity onPress={()=>SubmitForm()} className="bg-purple-600 py-3 rounded-xl flex-row justify-center gap-2">
        <MaterialIcons name="login" size={24} color="white" />
        <Text className="text-center text-white font-semibold">Login</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <Text className="text-center text-neutral-500 my-1">Or continue with</Text>
      <View className="flex-row justify-center space-x-6 gap-3">
        <TouchableOpacity>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="github" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
