import React from 'react';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack } from '@/components/layout/Stack';
import { useTheme } from '@/hooks/useTheme';
import { DynamicScreen } from '@/components/dynamic/DynamicScreen';
import { usePages } from '@/hooks/usePage';

export default function DynamicPagesDemoScreen() {
  const { colors } = useTheme();
  const { pages } = usePages();

  return (
    <Screen>
      <VStack gap={4} style={{ flex: 1 }}>
        <Card p={4}>
          <VStack gap={1}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Page engine
            </Text>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
              {pages.length} page(s) loaded from the bundled manifest · rendered by DynamicScreen below
            </Text>
          </VStack>
        </Card>
        <DynamicScreen slug="home" />
      </VStack>
    </Screen>
  );
}
