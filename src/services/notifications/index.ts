import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: string;
  channelId?: string;
}

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    throw new Error('Push notification permission not granted');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

export async function scheduleLocalNotification(
  payload: NotificationPayload,
  trigger: Notifications.NotificationTriggerInput | null = null,
): Promise<string> {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: payload.title,
      body: payload.body,
      data: payload.data as Record<string, string>,
      sound: payload.sound ?? 'default',
    },
    trigger,
  });
}

export async function sendLocalNotification(payload: NotificationPayload): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: payload.title,
      body: payload.body,
      data: payload.data as Record<string, string>,
      sound: payload.sound ?? 'default',
    },
    trigger: null,
  });
}

export function addNotificationResponseListener(
  handler: (response: Notifications.NotificationResponse) => void,
): Notifications.EventSubscription {
  return Notifications.addNotificationResponseReceivedListener(handler);
}

export function getLastNotificationResponse(): Promise<Notifications.NotificationResponse | null> {
  return Notifications.getLastNotificationResponseAsync();
}
