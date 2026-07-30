import { useTheme } from '@/context/ThemeProvider';

export function useThemeColors() {
  const { colors, isDark, mode } = useTheme();
  return { colors, isDark, mode };
}

export function useColorScheme() {
  const { scheme, setScheme } = useTheme();
  return { scheme, setScheme };
}
