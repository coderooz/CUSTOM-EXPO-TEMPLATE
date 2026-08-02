export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeColors {
  light: SemanticColors;
  dark: SemanticColors;
  highContrast: SemanticColors;
}

export interface ColorScheme {
  id: string;
  label: string;
  colors: ThemeColors;
}

export type ThemeMode = 'light' | 'dark' | 'high-contrast';
export type ContrastLevel = 'normal' | 'high';
