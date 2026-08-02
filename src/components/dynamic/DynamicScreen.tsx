import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { usePage } from '@/hooks/usePage';
import { SectionRenderer } from './SectionRenderer';
import { LoadingScreen } from '@/components/states/LoadingScreen';
import { ErrorState } from '@/components/states/ErrorState';
import { EmptyState } from '@/components/states/EmptyState';

interface DynamicScreenProps {
  slug: string;
  route?: { params?: { slug?: string } };
}

export function DynamicScreen({ slug: propSlug, route }: DynamicScreenProps) {
  const slug = propSlug ?? route?.params?.slug ?? '';
  const { page, sections, notFound, loading, error, template } = usePage(slug);
  const { colors } = useTheme();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorState message={error.message} />;
  if (notFound || !page) return <EmptyState title="Page Not Found" description={`No page found for "${slug}"`} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {page.title && (
        <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
          <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: '700' }}>
            {page.title}
          </Text>
          {page.description && (
            <Text style={{ color: colors.mutedForeground, fontSize: 14, marginTop: 4 }}>
              {page.description}
            </Text>
          )}
        </View>
      )}

      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </ScrollView>
  );
}
