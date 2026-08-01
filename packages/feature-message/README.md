# @coderooz/feature-message

SMS, OTP, and messaging service for Coderooz Expo projects. Provides SMS sending, OTP auto-read from clipboard, and phone number verification.

## What's Included

- SMS sending via `expo-sms`
- OTP auto-detection from clipboard (for apps that receive OTP via SMS)
- Phone number formatting and validation
- SMS permission handling

## Usage

```ts
import { sendSms, readOtpFromClipboard } from '@/services/message';

// Send an SMS
await sendSms(['+1234567890'], 'Your OTP is 123456');

// Read OTP from clipboard (after SMS arrives)
const otp = await readOtpFromClipboard();
console.log(otp); // '123456'
```

## Install

```sh
npx @coderooz/cli add message
```
