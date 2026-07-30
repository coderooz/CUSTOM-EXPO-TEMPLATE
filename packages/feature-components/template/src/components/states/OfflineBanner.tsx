import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface OfflineBannerProps {
  visible?: boolean;
}

export function OfflineBanner({ visible = true }: OfflineBannerProps) {
  const { colors } = useTheme();
  if (!visible) return null;

  return (
    <View style={{ backgroundColor: '#f59e0b', paddingVertical: 6, paddingHorizontal: 16, alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
        You are offline. Some features may be unavailable.
      </Text>
    </View>
  );
}
