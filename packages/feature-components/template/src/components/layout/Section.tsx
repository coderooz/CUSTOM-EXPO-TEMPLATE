import React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SectionProps extends ViewProps {
  title?: string;
  subtitle?: string;
}

export function Section({ title, subtitle, style, children, ...props }: SectionProps) {
  const { colors } = useTheme();

  return (
    <View style={[{ gap: 12 }, style]} {...props}>
      {(title || subtitle) && (
        <View className="gap-1">
          {title && (
            <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: '600' }}>{title}</Text>
          )}
          {subtitle && (
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>{subtitle}</Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}
