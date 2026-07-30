import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', message = 'An unexpected error occurred. Please try again.', onRetry }: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 8 }}>
      <Text style={{ fontSize: 48 }}>⚠️</Text>
      <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
        {title}
      </Text>
      <Text style={{ color: colors.mutedForeground, fontSize: 14, textAlign: 'center', maxWidth: 300, lineHeight: 20 }}>
        {message}
      </Text>
      {onRetry && (
        <View style={{ marginTop: 8 }}>
          <Button title="Try Again" onPress={onRetry} variant="primary" size="sm" />
        </View>
      )}
    </View>
  );
}
