import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SplitLayoutProps extends ViewProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  sidebarWidth?: number;
}

export function SplitLayout({ sidebar, content, sidebarWidth = 280, style, ...props }: SplitLayoutProps) {
  const { colors } = useTheme();

  return (
    <View style={[{ flex: 1, flexDirection: 'row', backgroundColor: colors.background }, style]} {...props}>
      <View style={{ width: sidebarWidth, backgroundColor: colors.card, borderRightWidth: 1, borderRightColor: colors.border }}>
        {sidebar}
      </View>
      <View style={{ flex: 1 }}>{content}</View>
    </View>
  );
}
