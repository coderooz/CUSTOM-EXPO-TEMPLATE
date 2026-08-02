import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import type { Spacing, BorderRadius } from '@/theme/tokens';
import { spacing as sp, borderRadius as br, shadow as sh } from '@/theme/tokens';
import type { ShadowSize } from '@/theme/tokens';

interface CardProps extends ViewProps {
  p?: Spacing;
  rounded?: BorderRadius;
  shadow?: ShadowSize;
}

export function Card({ p = 4, rounded = 'lg', shadow: shadowSize, style, children, ...props }: CardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          padding: sp[p],
          borderRadius: br[rounded],
          backgroundColor: colors.card,
          ...(shadowSize ? sh[shadowSize] : {}),
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
