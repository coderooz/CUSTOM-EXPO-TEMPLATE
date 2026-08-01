import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack, HStack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

import type { ShowcaseStackParamList } from '@/navigation/ShowcaseNavigation';

type Nav = NativeStackNavigationProp<ShowcaseStackParamList>;

const ITEMS: { key: keyof ShowcaseStackParamList; title: string; description: string; icon: string }[] = [
  { key: 'ThemeDemo', title: 'Design System', description: 'Tokens, color schemes, light/dark/high-contrast', icon: '🎨' },
  { key: 'ComponentsDemo', title: 'UI Components', description: 'Buttons, inputs, cards, states', icon: '🧩' },
  { key: 'SqliteDemo', title: 'SQLite', description: 'Typed queries, migrations, seed data', icon: '🗄️' },
  { key: 'DynamicPagesDemo', title: 'Dynamic Pages', description: 'Config-driven runtime page rendering', icon: '📄' },
  { key: 'NotificationsDemo', title: 'Notifications', description: 'Local + push with channels', icon: '🔔' },
  { key: 'IconsDemo', title: 'Icons', description: 'Vector icon families + SVG registry', icon: '✨' },
  { key: 'AuthDemo', title: 'Auth', description: 'Token management + session persistence', icon: '🔑' },
  { key: 'PagesDemo', title: 'Info Pages', description: 'About, Licenses, Policies', icon: '📋' },
];

export default function ShowcaseHome() {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();

  return (
    <Screen>
      <VStack gap={4}>
        <Card p={5}>
          <HStack gap={3} align="center">
            <Text style={{ fontSize: 32 }}>{'🚀'}</Text>
            <VStack gap={1} style={{ flex: 1 }}>
              <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: '700' }}>
                Coderooz Expo Template
              </Text>
              <Text style={{ color: colors.mutedForeground, fontSize: 14 }}>
                Composable feature packages woven into one app. Pick a feature to explore.
              </Text>
            </VStack>
          </HStack>
        </Card>

        {ITEMS.map((item) => (
          <Card key={item.key} p={4} shadow="sm">
            <HStack gap={3} align="center" distribute="space-between">
              <HStack gap={3} align="center" style={{ flex: 1 }}>
                <Text style={{ fontSize: 28 }}>{item.icon}</Text>
                <VStack gap={0.5} style={{ flex: 1 }}>
                  <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
                    {item.description}
                  </Text>
                </VStack>
              </HStack>
              <Button
                title="Open"
                size="sm"
                variant="outline"
                onPress={() => navigation.navigate(item.key as never)}
              />
            </HStack>
          </Card>
        ))}
      </VStack>
    </Screen>
  );
}
