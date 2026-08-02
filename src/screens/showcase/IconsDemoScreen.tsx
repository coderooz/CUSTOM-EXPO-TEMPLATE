import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack, HStack } from '@/components/layout/Stack';
import { Chip } from '@/components/ui/Chip';
import { useTheme } from '@/hooks/useTheme';
import { Icon } from '@/services/icons';
import type { IconFamily } from '@/services/icons/types';

const FAMILIES: IconFamily[] = ['Ionicons', 'MaterialIcons', 'Feather', 'MaterialCommunityIcons', 'FontAwesome5', 'Octicons'];

const FAMILY_ICONS: Record<Exclude<IconFamily, 'Custom'>, string[]> = {
  Ionicons: ['home', 'heart', 'star', 'settings', 'person', 'notifications'],
  MaterialIcons: ['home', 'favorite', 'star', 'settings', 'person', 'notifications'],
  Feather: ['home', 'heart', 'star', 'settings', 'user', 'bell'],
  MaterialCommunityIcons: ['home', 'heart', 'star', 'cog', 'account', 'bell'],
  FontAwesome5: ['home', 'heart', 'star', 'cog', 'user', 'bell'],
  Octicons: ['home', 'heart', 'star', 'gear', 'person', 'bell'],
};

export default function IconsDemoScreen() {
  const { colors } = useTheme();
  const [family, setFamily] = useState<IconFamily>('Ionicons');
  const icons = family === 'Custom' ? [] : FAMILY_ICONS[family] ?? [];

  return (
    <Screen>
      <VStack gap={4}>
        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Icon family
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {FAMILIES.map((f) => (
                <Chip key={f} label={f} selected={family === f} onPress={() => setFamily(f)} />
              ))}
            </View>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
              Default family from EXPO_PUBLIC_ICON_DEFAULT_FAMILY
            </Text>
          </VStack>
        </Card>

        <Card p={4}>
          <VStack gap={3}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Icons ({family})
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
              {icons.map((name) => (
                <VStack key={name} gap={1} align="center">
                  <Icon name={name} size={32} color={colors.primary} family={family} />
                  <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{name}</Text>
                </VStack>
              ))}
            </View>
            <HStack gap={2} align="center">
              <Icon name="home" size={20} color={colors.mutedForeground} family={family} />
              <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
                Icon + IconButton are available from @/services/icons
              </Text>
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </Screen>
  );
}
