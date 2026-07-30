import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface MenuItem {
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
}

interface MenuProps {
  items: MenuItem[];
  trigger: React.ReactNode;
}

export function Menu({ items, trigger }: MenuProps) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {trigger}
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              backgroundColor: colors.card, borderRadius: 12,
              minWidth: 200, paddingVertical: 4,
              shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15, shadowRadius: 12, elevation: 8,
            }}>
              {items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => { item.onPress(); setVisible(false); }}
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: 8,
                    paddingHorizontal: 16, paddingVertical: 12,
                    borderBottomWidth: i < items.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  {item.icon && <Text style={{ fontSize: 16 }}>{item.icon}</Text>}
                  <Text style={{
                    color: item.destructive ? colors.destructive : colors.cardForeground,
                    fontSize: 15,
                  }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
