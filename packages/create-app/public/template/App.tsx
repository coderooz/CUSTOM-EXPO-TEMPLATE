/**@format
 * @coderooz
 * @author (Ranit Saha) <codeooz.dev@gmail.com>
 * @filePath App.tsx 
 * @lastModified 2025-11-24
 * @version @1.0.5 - Integration of Notifactions system.
 */

import * as Notifications from "expo-notifications";
import AppProvider from '@/context/AppProvider';
// import AppNavigationContainer from '@/navigation/AppNavigation';
import OnBoardingContainer from '@/navigation/OnBoardingNavigation';
import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log("Expo Push Token:", token.data);
    })();
  }, []);

  return (
    <AppProvider>
      <OnBoardingContainer />
    </AppProvider>
  );
}