import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Input } from './Input';
import type { InputProps } from './Input';

interface SearchInputProps extends Omit<InputProps, 'leftAdornment' | 'rightAdornment'> {
  onClear?: () => void;
}

export function SearchInput({ onClear, value, ...props }: SearchInputProps) {
  const { colors } = useTheme();

  return (
    <Input
      {...props}
      value={value}
      placeholder="Search..."
      autoCapitalize="none"
      autoCorrect={false}
      leftAdornment={<Text style={{ color: colors.mutedForeground, marginRight: 6 }}>🔍</Text>}
      rightAdornment={
        value && onClear ? (
          <TouchableOpacity onPress={onClear} className="px-1 py-2">
            <Text style={{ color: colors.mutedForeground, fontSize: 14 }}>✕</Text>
          </TouchableOpacity>
        ) : undefined
      }
    />
  );
}
