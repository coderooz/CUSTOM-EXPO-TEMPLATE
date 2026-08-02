import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';

interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface DialogProps {
  visible: boolean;
  title: string;
  description?: string;
  actions: DialogAction[];
  onClose: () => void;
}

export function Dialog({ visible, title, description, actions, onClose }: DialogProps) {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{
            backgroundColor: colors.card, borderRadius: 16,
            padding: 24, width: '100%', maxWidth: 400,
            shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2, shadowRadius: 24, elevation: 10,
          }}
        >
          <Text style={{ color: colors.cardForeground, fontSize: 18, fontWeight: '700', marginBottom: 8 }}>
            {title}
          </Text>
          {description && (
            <Text style={{ color: colors.mutedForeground, fontSize: 14, lineHeight: 20, marginBottom: 20 }}>
              {description}
            </Text>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            {actions.map((action, i) => (
              <Button
                key={i}
                title={action.label}
                onPress={action.onPress}
                variant={action.variant ?? (i === 0 ? 'primary' : 'secondary')}
                size="sm"
              />
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
