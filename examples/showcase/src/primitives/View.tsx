import React from 'react';
import { View as RNView, ViewProps as RNViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { spacing, borderRadius } from '@/theme/tokens';
import type { Spacing, BorderRadius } from '@/theme/tokens';

interface ViewPrimitiveProps extends RNViewProps {
  gap?: Spacing | number;
  p?: Spacing;
  px?: Spacing;
  py?: Spacing;
  rounded?: BorderRadius | number;
  bg?: string;
}

export function ViewPrimitive({
  gap,
  p,
  px,
  py,
  rounded,
  bg,
  style,
  children,
  ...props
}: ViewPrimitiveProps) {
  const { colors } = useTheme();

  return (
    <RNView
      style={[
        {
          gap: gap !== undefined ? (typeof gap === 'number' ? gap : spacing[gap]) : undefined,
          padding: p !== undefined ? spacing[p] : undefined,
          paddingHorizontal: px !== undefined ? spacing[px] : undefined,
          paddingVertical: py !== undefined ? spacing[py] : undefined,
          borderRadius: rounded !== undefined
            ? (typeof rounded === 'number' ? rounded : borderRadius[rounded])
            : undefined,
          backgroundColor: bg ?? 'transparent',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNView>
  );
}
