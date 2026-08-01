import React from 'react';
import { Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack, HStack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { useTheme } from '@/hooks/useTheme';
import { colorSchemes } from '@/theme/color-schemes';

export default function ThemeDemoScreen() {
  const { mode, scheme, colors, contrast, setMode, setScheme, setContrast, toggleMode, isDark } = useTheme();

  return (
    <Screen>
      <VStack gap={4}>
        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Theme mode
            </Text>
            <HStack gap={2}>
              <Chip label="Light" selected={mode === 'light' && contrast !== 'high'} onPress={() => setMode('light')} />
              <Chip label="Dark" selected={mode === 'dark' && contrast !== 'high'} onPress={() => setMode('dark')} />
              <Chip label="High Contrast" selected={contrast === 'high'} onPress={() => setContrast(contrast === 'high' ? 'normal' : 'high')} />
            </HStack>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
              Current mode: {contrast === 'high' ? 'high-contrast' : mode} · isDark: {String(isDark)}
            </Text>
          </VStack>
        </Card>

        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Color scheme
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {colorSchemes.map((s) => (
                <Chip
                  key={s.id}
                  label={s.label}
                  selected={scheme.id === s.id}
                  onPress={() => setScheme(s.id)}
                />
              ))}
            </View>
          </VStack>
        </Card>

        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Semantic colors
            </Text>
            <HStack gap={2}>
              <Swatch label="primary" color={colors.primary} />
              <Swatch label="background" color={colors.background} />
              <Swatch label="card" color={colors.card} />
              <Swatch label="muted" color={colors.muted} />
              <Swatch label="destructive" color={colors.destructive} />
            </HStack>
          </VStack>
        </Card>

        <Button title={`Toggle theme (now ${isDark ? 'dark' : 'light'})`} onPress={toggleMode} />
      </VStack>
    </Screen>
  );
}

function Swatch({ label, color }: { label: string; color: string }) {
  return (
    <VStack gap={1} align="center">
      <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: color, borderWidth: 1, borderColor: '#8888' }} />
      <Text style={{ fontSize: 11, color: '#888' }}>{label}</Text>
    </VStack>
  );
}
