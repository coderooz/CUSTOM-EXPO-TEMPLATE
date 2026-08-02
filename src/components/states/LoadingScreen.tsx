import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, gap: 12 }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ color: colors.mutedForeground, fontSize: 15 }}>{message}</Text>
    </View>
  );
}
