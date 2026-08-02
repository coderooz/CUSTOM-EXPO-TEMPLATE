import React from 'react';
import { Pressable as RNPressable, PressableProps as RNPressableProps, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';

interface PressablePrimitiveProps extends RNPressableProps {
  variant?: 'ghost' | 'filled' | 'outline';
}

export function PressablePrimitive({
  variant = 'ghost',
  style,
  disabled,
  ...props
}: PressablePrimitiveProps) {
  const { colors, isDark } = useTheme();

  const getStateStyle = (pressed: boolean): ViewStyle => {
    if (disabled) return { opacity: 0.4 };
    if (pressed) return { opacity: 0.7 };
    return {};
  };

  return (
    <RNPressable
      style={({ pressed }) => [
        getStateStyle(pressed),
        style as ViewStyle,
      ]}
      disabled={disabled}
      accessibilityRole="button"
      {...props}
    />
  );
}
