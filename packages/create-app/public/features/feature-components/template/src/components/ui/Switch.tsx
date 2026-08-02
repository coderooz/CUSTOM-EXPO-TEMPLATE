import React from 'react';
import { TouchableOpacity, View, Text, Animated } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SwitchProps {
  value: boolean;
  onToggle: () => void;
  disabled?: boolean;
  label?: string;
}

export function Switch({ value, onToggle, disabled, label }: SwitchProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      className="flex-row items-center gap-3"
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      <View
        style={{
          width: 48, height: 28, borderRadius: 14,
          backgroundColor: value ? colors.primary : colors.muted,
          justifyContent: 'center',
          paddingHorizontal: 2,
        }}
      >
        <View
          style={{
            width: 24, height: 24, borderRadius: 12,
            backgroundColor: '#fff',
            alignSelf: value ? 'flex-end' : 'flex-start',
          }}
        />
      </View>
      {label && <Text style={{ color: colors.foreground, fontSize: 16 }}>{label}</Text>}
    </TouchableOpacity>
  );
}
