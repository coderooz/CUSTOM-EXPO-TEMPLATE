/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @description Authentication page of the page.
 * @filePath src/screens/AuthScreen.tsx 
 * @accessPath @/screen/AuthScreen
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0
 */

import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInRight, FadeOutLeft, LinearTransition } from "react-native-reanimated";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";


export default function AuthScreen() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
      <View className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-4">
        
        {/* Tabs */}
        <View className="flex-row mb-4 bg-neutral-100 rounded-xl p-1">
          <TouchableOpacity className={`flex-1 py-3 rounded-xl ${tab === "login" ? "bg-purple-600" : ""}`} onPress={() => setTab("login")}>
            <Text className={`text-center font-semibold ${tab === "login" ? "text-white" : "text-neutral-500"}`} >Login</Text>
          </TouchableOpacity>

          <TouchableOpacity className={`flex-1 py-3 rounded-xl ${tab === "signup" ? "bg-purple-600" : ""}`} onPress={() => setTab("signup")}>
            <Text className={`text-center font-semibold ${tab === "signup" ? "text-white" : "text-neutral-500"}`}>Signup</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          key={`${tab}_text`}
          entering={FadeInRight.duration(350)}
          exiting={FadeOutLeft.duration(200)}
          layout={LinearTransition.springify()}>
            {tab==="login" ? (
                <>
                    <View className="items-center mb-10" key="loginText">
                        <Text className="mb-2 text-4xl shadow font-bold shadow-slate-400">Login</Text>
                        <Text className="text-lg font-medium ">Enter login info to enter</Text>
                    </View>
                </>
            ) : (
                <>
                    <View className="items-center mb-10" key="signupText">
                        <Text className="mb-2 text-4xl shadow font-bold shadow-slate-400">Sign Up</Text>
                        <Text className="text-lg font-medium ">Enter login info to enter</Text>
                    </View>
                </>
            )}
            
        </Animated.View>

        {/* Animated Form Swap */}
        <Animated.View
          key={tab}
          entering={FadeInRight.duration(350)}
          exiting={FadeOutLeft.duration(200)}
          layout={LinearTransition.springify()}
        >
          {tab === "login" ? <LoginForm key="loginForm" /> : <SignupForm key="signupForm"/>}
        </Animated.View>
      </View>
    </View>
  );
}
