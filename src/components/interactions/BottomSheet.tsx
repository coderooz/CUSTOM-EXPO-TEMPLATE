import React, { useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheetLib, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@/hooks/useTheme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  snapPoints?: string[];
  children: React.ReactNode;
  title?: string;
}

export function BottomSheet({ visible, onClose, snapPoints: sp, children, title }: BottomSheetProps) {
  const { colors, isDark } = useTheme();
  const ref = useRef<BottomSheetLib>(null);
  const snapPoints = useMemo(() => sp ?? ['50%', '90%'], [sp]);

  const handleChange = useCallback((index: number) => {
    if (index === -1) onClose();
  }, [onClose]);

  if (!visible) return null;

  return (
    <BottomSheetLib
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleChange}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: colors.card }}
      handleIndicatorStyle={{ backgroundColor: colors.mutedForeground }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
      )}
    >
      <BottomSheetView style={{ flex: 1, paddingHorizontal: 16 }}>
        {title && (
          <Text style={{
            color: colors.cardForeground, fontSize: 18, fontWeight: '700',
            marginBottom: 16, textAlign: 'center',
          }}>
            {title}
          </Text>
        )}
        {children}
      </BottomSheetView>
    </BottomSheetLib>
  );
}
