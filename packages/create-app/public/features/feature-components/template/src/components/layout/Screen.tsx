import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

interface ScreenProps extends ViewProps {
  padded?: boolean;
  safe?: boolean;
}

export function Screen({ padded = true, safe = true, style, children, ...props }: ScreenProps) {
  const { colors } = useTheme();
  const Container = safe ? SafeAreaView : View;

  return (
    <Container
      style={[
        { flex: 1, backgroundColor: colors.background },
        padded && { paddingHorizontal: 16 },
        style,
      ]}
      {...props}
    >
      {children}
    </Container>
  );
}
