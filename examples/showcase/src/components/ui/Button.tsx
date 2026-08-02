import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const sizeStyles: Record<ButtonSize, { height: number; px: number; fontSize: number }> = {
  sm: { height: 36, px: 12, fontSize: 14 },
  md: { height: 44, px: 16, fontSize: 16 },
  lg: { height: 52, px: 24, fontSize: 18 },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
}: ButtonProps) {
  const { colors } = useTheme();
  const s = sizeStyles[size];

  const variantStyle = (): { bg: string; text: string; border?: string } => {
    switch (variant) {
      case 'primary': return { bg: colors.primary, text: colors.primaryForeground };
      case 'secondary': return { bg: colors.secondary, text: colors.secondaryForeground };
      case 'outline': return { bg: 'transparent', text: colors.foreground, border: colors.border };
      case 'ghost': return { bg: 'transparent', text: colors.foreground };
      case 'danger': return { bg: colors.destructive, text: colors.destructiveForeground };
    }
  };

  const vs = variantStyle();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        {
          height: s.height,
          paddingHorizontal: s.px,
          borderRadius: 8,
          backgroundColor: vs.bg,
          borderWidth: vs.border ? 1 : 0,
          borderColor: vs.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={vs.text} />
      ) : (
        <>
          {icon}
          <Text style={{ color: vs.text, fontSize: s.fontSize, fontWeight: '600' }}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
