import React from 'react';
import { View, ViewProps } from 'react-native';
import { spacing } from '@/theme/tokens';
import type { Spacing } from '@/theme/tokens';

interface GridProps extends ViewProps {
  columns: number;
  gap?: Spacing | number;
}

export function Grid({ columns, gap = 3, style, children, ...props }: GridProps) {
  const gapVal = typeof gap === 'number' ? gap : spacing[gap];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -gapVal / 2,
        },
        style,
      ]}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <View style={{ width: `${100 / columns}%`, paddingHorizontal: gapVal / 2, marginBottom: gapVal }}>
          {child}
        </View>
      ))}
    </View>
  );
}
