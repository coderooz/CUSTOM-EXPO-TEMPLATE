import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { typography } from '@/theme/tokens';
import type { TypographyVariant } from '@/theme/tokens';

interface TextPrimitiveProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: string;
}

export function TextPrimitive({
  variant = 'body',
  color: customColor,
  style,
  children,
  ...props
}: TextPrimitiveProps) {
  const { colors } = useTheme();
  const typeStyle = typography[variant];

  return (
    <RNText
      style={[
        {
          fontSize: typeStyle.fontSize,
          lineHeight: typeStyle.fontSize * typeStyle.lineHeight,
          fontWeight: typeStyle.fontWeight,
          color: customColor ?? colors.foreground,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}
