/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/context/AppProvider.tsx 
 * @accessPath @/context/AppProvider
 * @description A god provider the that contains all the other contexts & provider used within the application.
 * @created 2025-11-21
 * @lastModified 2025-11-23
 * @version - 1.0.1 - Minor Improvements.
 */

import { ThemeProvider } from '@/context/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from '@/context/UserProvider';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <UserProvider>
          <NavigationContainer>
            {children}
            <StatusBar hidden animated/>
          </NavigationContainer>
        </UserProvider>
      </ThemeProvider>
    </Suspense>
  );
}