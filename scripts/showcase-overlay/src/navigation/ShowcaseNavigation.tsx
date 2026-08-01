import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShowcaseHome from '@/screens/showcase/ShowcaseHome';
import ThemeDemoScreen from '@/screens/showcase/ThemeDemoScreen';
import ComponentsDemoScreen from '@/screens/showcase/ComponentsDemoScreen';
import SqliteDemoScreen from '@/screens/showcase/SqliteDemoScreen';
import DynamicPagesDemoScreen from '@/screens/showcase/DynamicPagesDemoScreen';
import NotificationsDemoScreen from '@/screens/showcase/NotificationsDemoScreen';
import IconsDemoScreen from '@/screens/showcase/IconsDemoScreen';
import AuthDemoScreen from '@/screens/showcase/AuthDemoScreen';
import PagesDemoScreen from '@/screens/showcase/PagesDemoScreen';

import AboutScreen from '@/screens/pages/AboutScreen';
import LicensesScreen from '@/screens/pages/LicensesScreen';
import PoliciesScreen from '@/screens/pages/PoliciesScreen';

export type ShowcaseStackParamList = {
  ShowcaseHome: undefined;
  ThemeDemo: undefined;
  ComponentsDemo: undefined;
  SqliteDemo: undefined;
  DynamicPagesDemo: undefined;
  NotificationsDemo: undefined;
  IconsDemo: undefined;
  AuthDemo: undefined;
  PagesDemo: undefined;
  About: undefined;
  Licenses: undefined;
  Policies: undefined;
};

const Stack = createNativeStackNavigator<ShowcaseStackParamList>();

export default function ShowcaseNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShowcaseHome" component={ShowcaseHome} options={{ title: 'Coderooz Showcase' }} />
      <Stack.Screen name="ThemeDemo" component={ThemeDemoScreen} options={{ title: 'Design System' }} />
      <Stack.Screen name="ComponentsDemo" component={ComponentsDemoScreen} options={{ title: 'UI Components' }} />
      <Stack.Screen name="SqliteDemo" component={SqliteDemoScreen} options={{ title: 'SQLite' }} />
      <Stack.Screen name="DynamicPagesDemo" component={DynamicPagesDemoScreen} options={{ title: 'Dynamic Pages' }} />
      <Stack.Screen name="NotificationsDemo" component={NotificationsDemoScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="IconsDemo" component={IconsDemoScreen} options={{ title: 'Icons' }} />
      <Stack.Screen name="AuthDemo" component={AuthDemoScreen} options={{ title: 'Auth' }} />
      <Stack.Screen name="PagesDemo" component={PagesDemoScreen} options={{ title: 'Info Pages' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
      <Stack.Screen name="Licenses" component={LicensesScreen} options={{ title: 'Licenses' }} />
      <Stack.Screen name="Policies" component={PoliciesScreen} options={{ title: 'Policies' }} />
    </Stack.Navigator>
  );
}
