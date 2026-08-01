import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from '@/context/ThemeProvider';
import { PageEngineProvider } from '@/context/PageEngineProvider';
import { registerMarketingTemplates } from '@/templates/built-in/marketing';
import { showcaseManifest } from '@/data/showcase-manifest';

import ShowcaseNavigation from '@/navigation/ShowcaseNavigation';

registerMarketingTemplates();

const fetchManifest = async (): Promise<Response> =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => showcaseManifest,
  }) as Response;

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PageEngineProvider configUrl="coderooz-showcase://manifest" fetchFn={fetchManifest}>
          <NavigationContainer>
            <ShowcaseNavigation />
            <StatusBar style="auto" />
          </NavigationContainer>
        </PageEngineProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
