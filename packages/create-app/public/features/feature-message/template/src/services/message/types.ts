export interface SmsOptions {
  attachments?: {
    uri: string;
    mimeType: string;
    filename: string;
  }[];
}

export interface SmsResult {
  result: 'sent' | 'cancelled' | 'unknown';
}

export interface PhoneValidationResult {
  isValid: boolean;
  formatted?: string;
  countryCode?: string;
  nationalNumber?: string;
  error?: string;
}
