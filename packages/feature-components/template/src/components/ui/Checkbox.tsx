import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onToggle, label, disabled }: CheckboxProps) {
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
          width: 22, height: 22, borderRadius: 4,
          borderWidth: 2, borderColor: checked ? colors.primary : colors.border,
          backgroundColor: checked ? colors.primary : 'transparent',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        {checked && <Text style={{ color: colors.primaryForeground, fontSize: 14, fontWeight: '700' }}>✓</Text>}
      </View>
      {label && <Text style={{ color: colors.foreground, fontSize: 16 }}>{label}</Text>}
    </TouchableOpacity>
  );
}
