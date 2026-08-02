import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  leftAdornment,
  rightAdornment,
  style,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.destructive : focused ? colors.ring : colors.border;

  return (
    <View className="gap-1.5">
      {label && (
        <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: '500' }}>
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor,
          borderRadius: 8,
          backgroundColor: colors.background,
          paddingHorizontal: 12,
          minHeight: 44,
        }}
      >
        {leftAdornment}
        <RNTextInput
          style={[
            {
              flex: 1,
              fontSize: 16,
              color: colors.foreground,
              paddingVertical: 10,
              paddingHorizontal: leftAdornment ? 6 : 0,
            },
            style,
          ]}
          placeholderTextColor={colors.mutedForeground}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightAdornment}
      </View>

      {error && (
        <Text style={{ color: colors.destructive, fontSize: 12 }}>{error}</Text>
      )}
      {helperText && !error && (
        <Text style={{ color: colors.mutedForeground, fontSize: 12 }}>{helperText}</Text>
      )}
    </View>
  );
}
