import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Input } from './Input';
import type { InputProps } from './Input';

interface PasswordInputProps extends Omit<InputProps, 'rightAdornment' | 'secureTextEntry'> {
  showToggle?: boolean;
}

export function PasswordInput({ showToggle = true, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <Input
      {...props}
      secureTextEntry={!visible}
      rightAdornment={
        showToggle ? (
          <TouchableOpacity onPress={() => setVisible(!visible)} className="px-1 py-2">
            <Text style={{ color: colors.mutedForeground, fontSize: 12, fontWeight: '600' }}>
              {visible ? 'HIDE' : 'SHOW'}
            </Text>
          </TouchableOpacity>
        ) : undefined
      }
    />
  );
}
