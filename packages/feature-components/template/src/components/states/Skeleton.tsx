import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  lines?: number;
}

export function Skeleton({ width = '100%', height = 16, rounded = 'md', lines }: SkeletonProps) {
  const { colors, isDark } = useTheme();
  const bg = isDark ? colors.muted : '#e5e7eb';

  const radii = { sm: 4, md: 8, lg: 12, full: 9999 };

  if (lines) {
    return (
      <View className="gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <View
            key={i}
            style={{
              width: i === lines - 1 ? '60%' : width,
              height, borderRadius: radii[rounded],
              backgroundColor: bg, opacity: 0.7,
            }}
          />
        ))}
      </View>
    );
  }

  return (
    <View
      style={{
        width: width as any, height, borderRadius: radii[rounded],
        backgroundColor: bg, opacity: 0.7,
      }}
    />
  );
}
