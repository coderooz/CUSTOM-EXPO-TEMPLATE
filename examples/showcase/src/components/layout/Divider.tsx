import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface DividerProps extends ViewProps {
  label?: string;
}

export function Divider({ label, style, ...props }: DividerProps) {
  const { colors } = useTheme();

  if (label) {
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, style]} {...props}>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
        <View style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: colors.muted, borderRadius: 4 }}>
          <Text style={{ color: colors.mutedForeground, fontSize: 11, fontWeight: '500' }}>{label}</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
      </View>
    );
  }

  return <View style={[{ height: 1, backgroundColor: colors.border }, style]} {...props} />;
}
