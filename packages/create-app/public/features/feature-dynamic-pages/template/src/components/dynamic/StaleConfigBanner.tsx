import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useVersionCheck } from '@/hooks/useVersionCheck';

interface StaleConfigBannerProps {
  showDetails?: boolean;
  onRefresh?: () => void;
  onDismiss?: () => void;
}

export function StaleConfigBanner({ showDetails = false, onRefresh, onDismiss }: StaleConfigBannerProps) {
  const { colors } = useTheme();
  const { stalePages, hasStalePages, acknowledgeStale, refresh, count } = useVersionCheck();

  if (!hasStalePages) return null;

  const handleRefresh = async () => {
    await refresh();
    onRefresh?.();
  };

  const handleDismiss = async () => {
    await acknowledgeStale();
    onDismiss?.();
  };

  return (
    <View style={{
      backgroundColor: '#f59e0b',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#d97706',
    }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 flex-1">
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>
            ⚠️ {count} page{count !== 1 ? 's' : ''} updated
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={handleRefresh}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>Reload</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDismiss}>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDetails && stalePages.length > 0 && (
        <View style={{ marginTop: 6, gap: 2 }}>
          {stalePages.map((page) => (
            <View key={page.slug} className="flex-row items-center gap-2">
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11 }}>•</Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11 }}>
                {page.title} — v{page.oldVersion} → v{page.newVersion}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export function StaleConfigModal() {
  const { colors } = useTheme();
  const { stalePages, hasStalePages, acknowledgeStale, refresh } = useVersionCheck();

  if (!hasStalePages) return null;

  return (
    <View style={{
      position: 'absolute', top: 60, left: 16, right: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15, shadowRadius: 12, elevation: 10,
      borderWidth: 1, borderColor: colors.border,
      zIndex: 100,
    }}>
      <Text style={{ color: colors.cardForeground, fontSize: 15, fontWeight: '700', marginBottom: 8 }}>
        Config Updates Available
      </Text>

      {stalePages.map((page) => (
        <View key={page.slug} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
          <Text style={{ color: colors.foreground, fontSize: 13 }}>{page.title}</Text>
          <Text style={{ color: colors.mutedForeground, fontSize: 12 }}>
            v{page.oldVersion} → v{page.newVersion}
          </Text>
        </View>
      ))}

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        <TouchableOpacity
          onPress={() => acknowledgeStale()}
          style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, backgroundColor: colors.muted }}
        >
          <Text style={{ color: colors.foreground, fontSize: 13, fontWeight: '500' }}>Dismiss</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refresh()}
          style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, backgroundColor: colors.primary }}
        >
          <Text style={{ color: colors.primaryForeground, fontSize: 13, fontWeight: '600' }}>Reload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
