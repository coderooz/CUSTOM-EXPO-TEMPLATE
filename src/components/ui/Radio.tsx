import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface RadioOption { label: string; value: string }

interface RadioProps {
  options: RadioOption[];
  selected: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export function RadioGroup({ options, selected, onSelect, disabled }: RadioProps) {
  const { colors } = useTheme();

  return (
    <View className="gap-3">
      {options.map((opt) => {
        const isSelected = opt.value === selected;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onSelect(opt.value)}
            disabled={disabled}
            className="flex-row items-center gap-3"
            style={{ opacity: disabled ? 0.4 : 1 }}
          >
            <View
              style={{
                width: 22, height: 22, borderRadius: 11,
                borderWidth: 2, borderColor: isSelected ? colors.primary : colors.border,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {isSelected && (
                <View
                  style={{
                    width: 12, height: 12, borderRadius: 6,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </View>
            <Text style={{ color: colors.foreground, fontSize: 16 }}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
