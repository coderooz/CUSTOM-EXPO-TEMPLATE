import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export interface NotificationChannel {
  id: string;
  name: string;
  importance?: Notifications.AndroidImportance;
  sound?: string;
}

const DEFAULT_CHANNELS: NotificationChannel[] = [
  {
    id: 'default',
    name: 'Default',
    importance: Notifications.AndroidImportance.MAX,
  },
  {
    id: 'alerts',
    name: 'Alerts',
    importance: Notifications.AndroidImportance.HIGH,
  },
  {
    id: 'updates',
    name: 'Updates',
    importance: Notifications.AndroidImportance.DEFAULT,
  },
];

export async function initializeChannels(
  channels: NotificationChannel[] = DEFAULT_CHANNELS,
): Promise<void> {
  if (Platform.OS !== 'android') return;

  for (const channel of channels) {
    await Notifications.setNotificationChannelAsync(channel.id, {
      name: channel.name,
      importance: channel.importance ?? Notifications.AndroidImportance.DEFAULT,
      sound: channel.sound ?? 'default',
    });
  }
}

export async function deleteChannel(channelId: string): Promise<void> {
  if (Platform.OS === 'android') {
    await Notifications.deleteNotificationChannelAsync(channelId);
  }
}
