import React from 'react';
import { ScrollView, ScrollViewProps, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

interface ScrollableScreenProps extends ScrollViewProps {
  padded?: boolean;
  avoidKeyboard?: boolean;
}

export function ScrollableScreen({ padded = true, avoidKeyboard = false, style, children, ...props }: ScrollableScreenProps) {
  const { colors } = useTheme();
  const content = (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[
        padded && { paddingHorizontal: 16, paddingVertical: 16 },
        style,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );

  if (avoidKeyboard) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>{content}</SafeAreaView>;
}
