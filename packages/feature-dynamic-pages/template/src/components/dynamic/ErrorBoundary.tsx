import React, { Component, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionId?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <SectionFallback sectionId={this.props.sectionId} error={this.state.error} />;
    }
    return this.props.children;
  }
}

function SectionFallback({ sectionId, error }: { sectionId?: string; error: Error | null }) {
  return (
    <View style={{ padding: 16, margin: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ef4444', backgroundColor: '#fef2f2' }}>
      <Text style={{ color: '#dc2626', fontSize: 12, fontWeight: '600' }}>
        Section Error{sectionId ? `: ${sectionId}` : ''}
      </Text>
      {error && <Text style={{ color: '#991b1b', fontSize: 11, marginTop: 4 }}>{error.message}</Text>}
    </View>
  );
}
