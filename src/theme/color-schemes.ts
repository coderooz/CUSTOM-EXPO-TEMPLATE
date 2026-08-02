import type { ColorScheme, ColorScale, ThemeColors, SemanticColors } from './colors';

function buildScale(cssVar: (shade: number) => string): ColorScale {
  return {
    50: cssVar(50), 100: cssVar(100), 200: cssVar(200), 300: cssVar(300),
    400: cssVar(400), 500: cssVar(500), 600: cssVar(600), 700: cssVar(700),
    800: cssVar(800), 900: cssVar(900), 950: cssVar(950),
  };
}

function semantic(scheme: 'light' | 'dark' | 'high-contrast', bg: string, fg: string, primary: ColorScale, neutral: ColorScale): SemanticColors {
  const isHC = scheme === 'high-contrast';
  const isDark = scheme === 'dark';

  return {
    background: bg,
    foreground: fg,
    card: isDark ? neutral[900] : neutral[50],
    cardForeground: isDark ? neutral[100] : neutral[900],
    primary: primary[500],
    primaryForeground: '#fff',
    secondary: isDark ? neutral[800] : neutral[100],
    secondaryForeground: isDark ? neutral[100] : neutral[900],
    muted: isDark ? neutral[800] : neutral[100],
    mutedForeground: isDark ? neutral[400] : neutral[500],
    accent: isDark ? neutral[700] : neutral[100],
    accentForeground: isDark ? neutral[100] : neutral[900],
    destructive: '#ef4444',
    destructiveForeground: '#fff',
    border: isDark ? (isHC ? neutral[500] : neutral[700]) : neutral[200],
    input: isDark ? (isHC ? neutral[500] : neutral[700]) : neutral[200],
    ring: primary[500],
  } satisfies SemanticColors;
}

function buildTheme(name: string, primary: ColorScale, neutral: ColorScale): ThemeColors {
  return {
    light: semantic('light', '#ffffff', neutral[900], primary, neutral),
    dark: semantic('dark', neutral[950], neutral[100], primary, neutral),
    highContrast: semantic('high-contrast', '#000000', '#ffffff', primary, {
      ...neutral,
      200: '#666', 300: '#888',
    }),
  };
}

const neutral: ColorScale = buildScale((s) => `hsl(0 0% ${Math.max(100 - s * 0.9, 3)}%)`);
const slate: ColorScale = buildScale((s) => `hsl(${222.2} ${Math.max(s * 0.5, 5)}% ${Math.max(100 - s * 0.85, 3)}%)`);
const gray: ColorScale = buildScale((s) => `hsl(${220} ${Math.max(s * 0.4, 5)}% ${Math.max(100 - s * 0.85, 3)}%)`);
const zinc: ColorScale = buildScale((s) => `hsl(${240} ${Math.max(s * 0.3, 5)}% ${Math.max(100 - s * 0.85, 3)}%)`);
const stone: ColorScale = buildScale((s) => `hsl(${30} ${Math.max(s * 0.4, 5)}% ${Math.max(100 - s * 0.85, 3)}%)`);

const blue: ColorScale = buildScale((s) => `hsl(${217.2} ${91.2}% ${Math.max(100 - s * 0.8, 4)}%)`);
const green: ColorScale = buildScale((s) => `hsl(${142.1} ${76.2}% ${Math.max(100 - s * 0.8, 4)}%)`);
const rose: ColorScale = buildScale((s) => `hsl(${346.8} ${77.2}% ${Math.max(100 - s * 0.8, 4)}%)`);
const amber: ColorScale = buildScale((s) => `hsl(${32.1} ${94.6}% ${Math.max(100 - s * 0.8, 4)}%)`);
const violet: ColorScale = buildScale((s) => `hsl(${262.1} ${83.3}% ${Math.max(100 - s * 0.8, 4)}%)`);

export const colorSchemes: ColorScheme[] = [
  {
    id: 'neutral', label: 'Neutral',
    colors: buildTheme('neutral', neutral, neutral),
  },
  {
    id: 'slate', label: 'Slate',
    colors: buildTheme('slate', slate, slate),
  },
  {
    id: 'gray', label: 'Gray',
    colors: buildTheme('gray', gray, gray),
  },
  {
    id: 'zinc', label: 'Zinc',
    colors: buildTheme('zinc', zinc, zinc),
  },
  {
    id: 'stone', label: 'Stone',
    colors: buildTheme('stone', stone, stone),
  },
  {
    id: 'default', label: 'Default',
    colors: buildTheme('default', blue, neutral),
  },
  {
    id: 'rose', label: 'Rose',
    colors: buildTheme('rose', rose, neutral),
  },
  {
    id: 'green', label: 'Green',
    colors: buildTheme('green', green, neutral),
  },
  {
    id: 'amber', label: 'Amber',
    colors: buildTheme('amber', amber, neutral),
  },
  {
    id: 'violet', label: 'Violet',
    colors: buildTheme('violet', violet, neutral),
  },
];

export function getColorScheme(id: string): ColorScheme {
  return colorSchemes.find((s) => s.id === id) ?? colorSchemes[0];
}
