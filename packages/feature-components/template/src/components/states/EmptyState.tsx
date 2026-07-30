import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onPress: () => void };
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 8 }}>
      <Text style={{ fontSize: 48 }}>{icon}</Text>
      <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
        {title}
      </Text>
      {description && (
        <Text style={{ color: colors.mutedForeground, fontSize: 14, textAlign: 'center', maxWidth: 280, lineHeight: 20 }}>
          {description}
        </Text>
      )}
      {action && (
        <View style={{ marginTop: 8 }}>
          <Button title={action.label} onPress={action.onPress} size="sm" />
        </View>
      )}
    </View>
  );
}
