/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/screens/SplashScreen.tsx 
 * @access @/screens/SplashScreen
 * @description A startup/splash screen navigation.
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0
 */
import { View, Text, TouchableOpacity } from "react-native";
import useUserContext from "@/hooks/UserHook";
import { useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SplashScreen (){
    const { updateLaunch } = useUserContext();
    const updateLaunchState = useCallback(async () => {
        await AsyncStorage.setItem('hasLaunched', 'true');
        updateLaunch(false);
    }, [updateLaunch]);

    return (
        <View className="bg-indigo-700 flex-1 justify-center items-center">
            <Text className="text-center font-bold text-white mb-7">
                Onboarding Screen
            </Text>
            <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg" onPress={()=>{updateLaunchState()}}>
                <Text className="text-white font-semibold text-lg">
                    Onboard Success
                </Text>
            </TouchableOpacity>       
        </View>
    )
}