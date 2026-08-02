import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  variant?: 'filled' | 'outline';
}

export function Chip({ label, selected, onPress, removable, onRemove, variant = 'filled' }: ChipProps) {
  const { colors } = useTheme();
  const isFilled = variant === 'filled';
  const bg = selected ? colors.primary : (isFilled ? colors.secondary : 'transparent');
  const textColor = selected ? colors.primaryForeground : colors.foreground;
  const borderColor = selected ? colors.primary : colors.border;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress && !removable}
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 4,
        paddingHorizontal: 10, paddingVertical: 6,
        borderRadius: 16, backgroundColor: bg,
        borderWidth: isFilled ? 0 : 1, borderColor,
      }}
    >
      <Text style={{ color: textColor, fontSize: 13, fontWeight: '500' }}>{label}</Text>
      {removable && (
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={{ color: textColor, fontSize: 14, marginLeft: 2 }}>✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
