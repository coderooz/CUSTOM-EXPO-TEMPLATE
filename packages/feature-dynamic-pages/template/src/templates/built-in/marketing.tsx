import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/layout/Card';
import { Section } from '@/components/layout/Section';
import { registry } from '@/services/page-engine/registry';
import type { SectionConfig } from '@/services/page-engine/types';

function HeroBanner(section: SectionConfig) {
  const { colors } = useTheme();
  const data = section.data ?? {};
  return (
    <View style={{ padding: 24, backgroundColor: colors.primary, alignItems: 'center', gap: 12 }}>
      {data.title && <Text style={{ color: colors.primaryForeground, fontSize: 32, fontWeight: '700', textAlign: 'center' }}>{data.title as string}</Text>}
      {data.subtitle && <Text style={{ color: colors.primaryForeground, fontSize: 16, opacity: 0.9, textAlign: 'center', maxWidth: 320 }}>{data.subtitle as string}</Text>}
      {data.cta && (
        <Button
          title={(data.cta as { label: string }).label ?? 'Get Started'}
          onPress={() => {}}
          variant="secondary"
          size="lg"
        />
      )}
    </View>
  );
}

function FeatureGrid(section: SectionConfig) {
  const { colors } = useTheme();
  const features = (section.data?.items as Array<{ title: string; description: string; icon?: string }>) ?? [];
  return (
    <Section title={section.title} subtitle={section.subtitle}>
      <View style={{ padding: 16, gap: 12 }}>
        {features.map((feature, i) => (
          <Card key={i} p={4} shadow="sm">
            <View style={{ gap: 4 }}>
              {feature.icon && <Text style={{ fontSize: 24 }}>{feature.icon}</Text>}
              <Text style={{ color: colors.cardForeground, fontSize: 16, fontWeight: '600' }}>{feature.title}</Text>
              <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>{feature.description}</Text>
            </View>
          </Card>
        ))}
      </View>
    </Section>
  );
}

function CTASection(section: SectionConfig) {
  const { colors } = useTheme();
  const data = section.data ?? {};
  return (
    <View style={{ padding: 24, alignItems: 'center', gap: 12, backgroundColor: colors.muted }}>
      <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
        {data.title as string ?? 'Ready to Get Started?'}
      </Text>
      {data.description && (
        <Text style={{ color: colors.mutedForeground, fontSize: 14, textAlign: 'center', maxWidth: 300 }}>
          {data.description as string}
        </Text>
      )}
      <Button title={(data.cta as { label: string })?.label ?? 'Get Started'} onPress={() => {}} size="lg" />
    </View>
  );
}

export function registerMarketingTemplates() {
  registry.registerComponent('hero-banner', HeroBanner);
  registry.registerComponent('feature-grid', FeatureGrid);
  registry.registerComponent('cta-section', CTASection);
  registry.registerTemplate('marketing', 'Marketing Page', ['header', 'hero', 'features', 'cta', 'footer']);
}
