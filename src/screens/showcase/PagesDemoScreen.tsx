import React from 'react';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { ShowcaseStackParamList } from '@/navigation/ShowcaseNavigation';

type Props = NativeStackScreenProps<ShowcaseStackParamList, 'PagesDemo'>;

const PAGES = [
  { key: 'About', title: 'About', description: 'App information' },
  { key: 'Licenses', title: 'Licenses', description: 'Third-party licenses' },
  { key: 'Policies', title: 'Policies', description: 'Privacy & terms' },
] as const;

export default function PagesDemoScreen({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <Screen>
      <VStack gap={4}>
        <Card p={4}>
          <VStack gap={1}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Static pages
            </Text>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
              Ready-made screens from the pages feature — no wiring needed.
            </Text>
          </VStack>
        </Card>

        {PAGES.map((page) => (
          <Card key={page.key} p={3}>
            <Button
              title={page.title}
              variant="secondary"
              onPress={() => navigation.navigate(page.key as never)}
            />
            <Text style={{ color: colors.mutedForeground, fontSize: 13, marginTop: 4 }}>
              {page.description}
            </Text>
          </Card>
        ))}
      </VStack>
    </Screen>
  );
}
