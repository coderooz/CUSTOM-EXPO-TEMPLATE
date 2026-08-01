import React, { useState } from 'react';
import { Text } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { ScrollableScreen } from '@/components/layout/ScrollableScreen';
import { Card } from '@/components/layout/Card';
import { Section } from '@/components/layout/Section';
import { VStack, HStack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Chip } from '@/components/ui/Chip';
import { Switch } from '@/components/ui/Switch';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { useTheme } from '@/hooks/useTheme';

export default function ComponentsDemoScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [pressed, setPressed] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [chip, setChip] = useState('All');

  return (
    <ScrollableScreen>
      <VStack gap={4}>
        <Section title="Buttons" subtitle="Variants and sizes">
          <VStack gap={2}>
            <HStack gap={2}>
              <Button title="Primary" onPress={() => setPressed((n) => n + 1)} />
              <Button title="Secondary" variant="secondary" onPress={() => setPressed((n) => n + 1)} />
            </HStack>
            <HStack gap={2}>
              <Button title="Outline" variant="outline" onPress={() => setPressed((n) => n + 1)} />
              <Button title="Ghost" variant="ghost" onPress={() => setPressed((n) => n + 1)} />
              <Button title="Danger" variant="danger" onPress={() => setPressed((n) => n + 1)} />
            </HStack>
            <HStack gap={2}>
              <Button title="Small" size="sm" onPress={() => setPressed((n) => n + 1)} />
              <Button title="Medium" size="md" onPress={() => setPressed((n) => n + 1)} />
              <Button title="Large" size="lg" onPress={() => setPressed((n) => n + 1)} />
            </HStack>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
              Pressed {pressed} time(s)
            </Text>
          </VStack>
        </Section>

        <Section title="Inputs" subtitle="Form controls">
          <VStack gap={2}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              helperText="We will never share your email."
            />
            <Input
              label="Password"
              placeholder="••••••••"
              error={email.length > 0 && email.length < 5 ? 'Too short' : undefined}
            />
          </VStack>
        </Section>

        <Section title="Chips" subtitle="Filter chips">
          <HStack gap={2}>
            {['All', 'Design', 'Engine', 'Data'].map((c) => (
              <Chip key={c} label={c} selected={chip === c} onPress={() => setChip(c)} />
            ))}
          </HStack>
        </Section>

        <Section title="Switch" subtitle="Toggles">
          <HStack gap={2} align="center">
            <Switch value={enabled} onToggle={() => setEnabled((v) => !v)} />
            <Text style={{ color: colors.foreground, fontSize: 14 }}>{enabled ? 'On' : 'Off'}</Text>
          </HStack>
        </Section>

        <Section title="States" subtitle="Empty & error states">
          <Card p={4}>
            <EmptyState title="No notifications" description="You are all caught up." />
          </Card>
          <Card p={4}>
            <ErrorState message="Something went wrong while loading." />
          </Card>
        </Section>
      </VStack>
    </ScrollableScreen>
  );
}
