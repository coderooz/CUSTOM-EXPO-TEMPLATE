import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack, HStack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import {
  registerForPushNotifications,
  scheduleLocalNotification,
  sendLocalNotification,
} from '@/services/notifications';

export default function NotificationsDemoScreen() {
  const { colors } = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const [lastId, setLastId] = useState<string | null>(null);
  const [status, setStatus] = useState('Not registered');

  useEffect(() => {
    (async () => {
      try {
        const pushToken = await registerForPushNotifications();
        setToken(pushToken);
        setStatus(pushToken ? 'Push token obtained' : 'Simulator — push token unavailable, local notifications still work');
      } catch (err: unknown) {
        setStatus(err instanceof Error ? err.message : 'Permission denied');
      }
    })();
  }, []);

  return (
    <Screen>
      <VStack gap={4}>
        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Notifications
            </Text>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>{status}</Text>
            {token && (
              <Text numberOfLines={1} ellipsizeMode="middle" style={{ color: colors.mutedForeground, fontSize: 12 }}>
                {token}
              </Text>
            )}
          </VStack>
        </Card>

        <HStack gap={2}>
          <Button
            title="Send now"
            onPress={async () => {
              await sendLocalNotification({
                title: 'Coderooz Showcase',
                body: 'Local notification sent from the demo screen.',
              });
            }}
          />
          <Button
            title="Schedule +5s"
            variant="secondary"
            onPress={async () => {
              const id = await scheduleLocalNotification(
                { title: 'Scheduled', body: 'This notification was scheduled 5 seconds ago.' },
                { type: SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5 },
              );
              setLastId(id);
            }}
          />
        </HStack>

        {lastId && (
          <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
            Last notification id: {lastId}
          </Text>
        )}
      </VStack>
    </Screen>
  );
}
