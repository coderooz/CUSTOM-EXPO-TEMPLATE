import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { registry } from '@/services/page-engine/registry';
import { SectionErrorBoundary } from './ErrorBoundary';
import type { SectionConfig } from '@/services/page-engine/types';

interface SectionRendererProps {
  section: SectionConfig;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const { colors } = useTheme();
  const Component = registry.getComponent(section.type);

  if (!Component) {
    return (
      <View style={{ padding: 12, margin: 4, borderRadius: 8, backgroundColor: colors.muted }}>
        <Text style={{ color: colors.mutedForeground, fontSize: 11 }}>
          Unknown section type: {section.type} (id: {section.id})
        </Text>
      </View>
    );
  }

  return (
    <SectionErrorBoundary sectionId={section.id}>
      <Component {...section} />
    </SectionErrorBoundary>
  );
}
