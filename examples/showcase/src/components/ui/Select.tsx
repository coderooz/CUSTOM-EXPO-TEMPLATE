import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  options: SelectOption[];
  onSelect: (option: SelectOption) => void;
  placeholder?: string;
  error?: string;
}

export function Select({ label, value, options, onSelect, placeholder = 'Select...', error }: SelectProps) {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();
  const selected = options.find((o) => o.value === value);

  return (
    <View className="gap-1.5">
      {label && (
        <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: '500' }}>{label}</Text>
      )}

      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: error ? colors.destructive : colors.border,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: selected ? colors.foreground : colors.mutedForeground, fontSize: 16 }}>
          {selected ? selected.label : placeholder}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={{ color: colors.destructive, fontSize: 12 }}>{error}</Text>
      )}

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
          onPress={() => setOpen(false)}
        >
          <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '60%' }}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => { onSelect(item); setOpen(false); }}
                  style={{
                    paddingHorizontal: 16, paddingVertical: 14,
                    borderBottomWidth: 1, borderBottomColor: colors.border,
                    backgroundColor: item.value === value ? colors.muted : 'transparent',
                  }}
                >
                  <Text style={{ color: colors.foreground, fontSize: 16 }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
