export const spacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const lineHeight = {
  none: 1,
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const fontWeight = {
  thin: '100' as const,
  extralight: '200' as const,
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const typography = {
  h1: { fontSize: fontSize['4xl'], lineHeight: lineHeight.tight, fontWeight: fontWeight.bold },
  h2: { fontSize: fontSize['3xl'], lineHeight: lineHeight.tight, fontWeight: fontWeight.bold },
  h3: { fontSize: fontSize['2xl'], lineHeight: lineHeight.tight, fontWeight: fontWeight.semibold },
  h4: { fontSize: fontSize.xl, lineHeight: lineHeight.normal, fontWeight: fontWeight.semibold },
  body: { fontSize: fontSize.base, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal },
  bodySmall: { fontSize: fontSize.sm, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal },
  caption: { fontSize: fontSize.xs, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal },
  label: { fontSize: fontSize.sm, lineHeight: lineHeight.normal, fontWeight: fontWeight.medium },
  button: { fontSize: fontSize.base, lineHeight: lineHeight.none, fontWeight: fontWeight.semibold },
} as const;

export const shadow = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  xl: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 8 },
} as const;

export const animation = {
  duration: { fast: 150, normal: 250, slow: 400 },
  easing: { easeInOut: { duration: 250, easing: 'ease-in-out' } },
} as const;

export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type FontSize = keyof typeof fontSize;
export type TypographyVariant = keyof typeof typography;
export type ShadowSize = keyof typeof shadow;
