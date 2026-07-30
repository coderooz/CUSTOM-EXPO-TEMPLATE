import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface PermissionGateProps {
  granted: boolean;
  title?: string;
  message?: string;
  actionLabel?: string;
  onRequest?: () => void;
  children: React.ReactNode;
}

export function PermissionGate({
  granted, title = 'Permission Required',
  message = 'This feature needs permission to work.',
  actionLabel = 'Grant Permission',
  onRequest, children,
}: PermissionGateProps) {
  const { colors } = useTheme();

  if (granted) return <>{children}</>;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 8 }}>
      <Text style={{ fontSize: 48 }}>🔒</Text>
      <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
        {title}
      </Text>
      <Text style={{ color: colors.mutedForeground, fontSize: 14, textAlign: 'center', maxWidth: 300, lineHeight: 20 }}>
        {message}
      </Text>
      {onRequest && (
        <TouchableOpacity
          onPress={onRequest}
          style={{
            marginTop: 12, backgroundColor: colors.primary,
            paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8,
          }}
        >
          <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 15 }}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
