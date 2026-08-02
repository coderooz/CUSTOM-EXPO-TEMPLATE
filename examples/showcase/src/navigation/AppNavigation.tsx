/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/navigation/AppNaviation.tsx 
 * @accessPath @/navigation/AppNaviation
 * @description
 * @created 2025-11-21
 * @lastModified 2025-11-23
 * @version 1.0.1 - Updated version of the previous version.
 */

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import SettingScreen from '@/screens/SettingScreen';
import HeaderComponent from '@/components/Header';

const Stack = createStackNavigator();


/**
 * AppNavigationContainer
 * ----------------------
 * The container that stores all the navigation stack of the major pages of the application.
 * 
 * @returns React.ReactNode
 */

export default function AppNavigationContainer() {

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <HeaderComponent {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
    </Stack.Navigator>
  );
}