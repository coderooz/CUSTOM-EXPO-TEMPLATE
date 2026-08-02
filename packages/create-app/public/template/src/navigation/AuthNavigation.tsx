/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/navigation/AuthNaviation.tsx 
 * @accessPath @/navigation/AuthNaviation
 * @description A navigation stach for handling the user Authentication and login.
 * @created 2025-11-21
 * @lastModified 2025-11-23
 * @version 1.0.1 - Updated version of the previous version.
 */


import { createStackNavigator } from '@react-navigation/stack';
import AppNavigationContainer from '@/navigation/AppNavigation';
import AuthScreen from "@/screens/AuthScreen";
import useUserContext from "@/hooks/UserHook";

const Stack = createStackNavigator();

export default function AuthNaviationContainer() {

    const { isAuthenticated } = useUserContext();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                isAuthenticated ? (
                    <Stack.Screen name="AppContainer" component={AppNavigationContainer} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthScreen} />
                )
            }
        </Stack.Navigator>
    );
}