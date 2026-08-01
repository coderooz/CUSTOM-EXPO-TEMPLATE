import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type SnackbarVariant = 'default' | 'success' | 'error' | 'warning';

interface SnackbarProps {
  visible: boolean;
  message: string;
  variant?: SnackbarVariant;
  action?: { label: string; onPress: () => void };
  onDismiss: () => void;
  duration?: number;
  style?: ViewStyle;
}

const variantColors: Record<SnackbarVariant, { bg: string; text: string }> = {
  default: { bg: '#1f2937', text: '#fff' },
  success: { bg: '#059669', text: '#fff' },
  error: { bg: '#dc2626', text: '#fff' },
  warning: { bg: '#d97706', text: '#fff' },
};

export function Snackbar({ visible, message, variant = 'default', action, onDismiss, duration = 3000, style }: SnackbarProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();

      timerRef.current = setTimeout(() => {
        handleDismiss();
      }, duration);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [visible]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 50, duration: 150, useNativeDriver: true }),
    ]).start(() => onDismiss());
  };

  if (!visible) return null;

  const vc = variantColors[variant];

  return (
    <Animated.View
      style={[
        {
          position: 'absolute', bottom: 24, left: 16, right: 16,
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: vc.bg, borderRadius: 12,
          paddingHorizontal: 16, paddingVertical: 14,
          shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15, shadowRadius: 8, elevation: 6,
          opacity, transform: [{ translateY }],
        },
        style,
      ]}
    >
      <Text style={{ flex: 1, color: vc.text, fontSize: 14, lineHeight: 20 }}>{message}</Text>
      {action && (
        <TouchableOpacity onPress={action.onPress} className="ml-3">
          <Text style={{ color: vc.text, fontSize: 13, fontWeight: '700' }}>{action.label}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
