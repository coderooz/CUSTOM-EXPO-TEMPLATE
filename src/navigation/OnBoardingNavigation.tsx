/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/navigation/AppNaviation.tsx 
 * @accessPath @/navigation/AppNaviation
 * @description Handles Onboarding page naviation
 * @created 2025-11-22
 * @lastModified 2025-11-23
 * @version 1.0.0 - Initial Version
 */

import { useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
// import AppNavigationContainer from "@/navigation/AppNavigation";
import AuthNaviationContainer from "@/navigation/AuthNavigation";
import SplashScreen from "@/screens/SplashScreen";
import useUserContext from "@/hooks/UserHook";
import storage from "@/lib/storage";

const Stack = createStackNavigator();

/**
 * AppNavigationContainer
 * ----------------------
 * The container that stores all the navigation stack of the major pages of the application.
 * 
 * @returns React.ReactNode
 */

export default function OnBoardingContainer() {

    const { isFirstLaunch, updateLaunch } = useUserContext();

    useEffect(() => {
      const checkStatus = async () => {
        const firstTime = await storage.get<boolean>("hasLaunched");
        updateLaunch(firstTime === null);
      };
      checkStatus();
    }, [updateLaunch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={SplashScreen} />
        ) : (
          <Stack.Screen name="AuthContainer" component={AuthNaviationContainer} />
        )}
    </Stack.Navigator>
  );
}