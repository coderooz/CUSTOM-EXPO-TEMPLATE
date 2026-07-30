import * as SMS from 'expo-sms';
import * as Clipboard from 'expo-clipboard';

import type { SmsOptions, SmsResult, PhoneValidationResult } from './types';

const OTP_REGEX = /\b(\d{4,8})\b/;

export async function sendSms(
  recipients: string[],
  message: string,
  options?: SmsOptions,
): Promise<SmsResult> {
  const isAvailable = await SMS.isAvailableAsync();
  if (!isAvailable) {
    throw new Error('SMS is not available on this device');
  }

  const result = await SMS.sendSMSAsync(recipients, message, options);
  return { result };
}

export async function isSmsAvailable(): Promise<boolean> {
  return SMS.isAvailableAsync();
}

export async function readFromClipboard(): Promise<string> {
  const text = await Clipboard.getStringAsync();
  return text ?? '';
}

export async function readOtpFromClipboard(): Promise<string | null> {
  const text = await Clipboard.getStringAsync();
  if (!text) return null;

  const match = text.match(OTP_REGEX);
  return match?.[1] ?? null;
}

export async function clearClipboard(): Promise<void> {
  await Clipboard.setStringAsync('');
}

export function validatePhoneNumber(phone: string): PhoneValidationResult {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');

  const patterns: { regex: RegExp; country: string }[] = [
    { regex: /^\+1\d{10}$/, country: 'US' },
    { regex: /^\+44\d{10}$/, country: 'UK' },
    { regex: /^\+91\d{10}$/, country: 'IN' },
    { regex: /^\+86\d{11}$/, country: 'CN' },
    { regex: /^\+61\d{9}$/, country: 'AU' },
    { regex: /^\+49\d{10,11}$/, country: 'DE' },
    { regex: /^\+33\d{9}$/, country: 'FR' },
    { regex: /^\+81\d{10}$/, country: 'JP' },
    { regex: /^\+\d{7,15}$/, country: 'unknown' },
  ];

  for (const { regex, country } of patterns) {
    if (regex.test(cleaned)) {
      const countryCode = cleaned.slice(0, cleaned.length - 10);
      const nationalNumber = cleaned.slice(countryCode.length);

      return {
        isValid: true,
        formatted: cleaned,
        countryCode,
        nationalNumber,
      };
    }
  }

  if (cleaned.startsWith('+')) {
    return {
      isValid: true,
      formatted: cleaned,
    };
  }

  return { isValid: false, error: 'Invalid phone number format' };
}

export async function sendOtpSms(
  phoneNumber: string,
  otp: string,
): Promise<SmsResult> {
  return sendSms([phoneNumber], `Your verification code is: ${otp}`);
}

export type { SmsOptions, SmsResult, PhoneValidationResult } from './types';
