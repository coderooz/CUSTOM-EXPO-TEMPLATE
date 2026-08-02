import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CenteredScreenProps extends ViewProps {
  padded?: boolean;
}

export function CenteredScreen({ padded = true, style, children, ...props }: CenteredScreenProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1, justifyContent: 'center', alignItems: 'center',
          backgroundColor: colors.background,
        },
        padded && { paddingHorizontal: 24 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
