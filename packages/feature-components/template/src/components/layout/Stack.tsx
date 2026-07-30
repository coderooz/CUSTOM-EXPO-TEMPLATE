import React from 'react';
import { View, ViewProps } from 'react-native';
import { spacing } from '@/theme/tokens';
import type { Spacing } from '@/theme/tokens';

type StackDirection = 'horizontal' | 'vertical';

interface StackProps extends ViewProps {
  direction?: StackDirection;
  gap?: Spacing | number;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  distribute?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

export function HStack(props: StackProps) {
  return <Stack direction="horizontal" {...props} />;
}

export function VStack(props: StackProps) {
  return <Stack direction="vertical" {...props} />;
}

export function Stack({
  direction = 'vertical',
  gap = 2,
  align = direction === 'horizontal' ? 'center' : 'stretch',
  distribute = 'flex-start',
  style,
  children,
  ...viewProps
}: StackProps) {
  return (
    <View
      style={[
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: typeof gap === 'number' ? gap : spacing[gap],
          alignItems: align,
          justifyContent: distribute,
        },
        style,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
}
