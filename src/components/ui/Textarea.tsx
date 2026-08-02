import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface TextareaProps extends TextInputProps {
  label?: string;
  error?: string;
  minHeight?: number;
}

export function Textarea({ label, error, minHeight = 100, style, ...props }: TextareaProps) {
  const { colors } = useTheme();

  return (
    <View className="gap-1.5">
      {label && (
        <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: '500' }}>{label}</Text>
      )}
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: error ? colors.destructive : colors.border,
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            color: colors.foreground,
            minHeight,
            textAlignVertical: 'top',
            backgroundColor: colors.background,
          },
          style,
        ]}
        placeholderTextColor={colors.mutedForeground}
        multiline
        {...props}
      />
      {error && (
        <Text style={{ color: colors.destructive, fontSize: 12 }}>{error}</Text>
      )}
    </View>
  );
}
