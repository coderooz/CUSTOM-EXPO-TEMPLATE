# @coderooz/feature-notifs

Push and local notifications feature for Coderooz Expo projects. Includes push token registration, local notification scheduling, response listeners, and Android channel management.

## What's Included

- Push notification registration with Expo push token
- Local notification scheduling and sending
- Notification response listener
- Android channel management (default, alerts, updates)
- Permission handling
- Custom notification handler with banner and list display

## Usage

```ts
import { registerForPushNotifications, sendLocalNotification } from '@/services/notifications';

// Register for push notifications
const token = await registerForPushNotifications();

// Send a local notification
await sendLocalNotification({
  title: 'Hello',
  body: 'This is a notification',
});

// Listen for responses
const subscription = addNotificationResponseListener((response) => {
  console.log('User tapped notification:', response.notification.request.content.data);
});
```
