import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useRNColorScheme } from 'react-native';

import type { ThemeMode, ColorScheme, SemanticColors, ContrastLevel } from '@/theme/colors';
import { getColorScheme } from '@/theme/color-schemes';

const STORAGE_KEY_THEME = '@coderooz/theme-mode';
const STORAGE_KEY_SCHEME = '@coderooz/color-scheme';
const STORAGE_KEY_CONTRAST = '@coderooz/contrast-level';

interface ThemeContextValue {
  mode: ThemeMode;
  scheme: ColorScheme;
  colors: SemanticColors;
  contrast: ContrastLevel;
  setMode: (mode: ThemeMode) => void;
  setScheme: (schemeId: string) => void;
  setContrast: (level: ContrastLevel) => void;
  toggleMode: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

async function loadStored<T>(key: string, fallback: T): Promise<T> {
  try {
    const val = await AsyncStorage.getItem(key);
    return val !== null ? (JSON.parse(val) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ThemeProvider({
  children,
  defaultMode,
  defaultScheme = 'default',
}: {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultScheme?: string;
}) {
  const systemScheme = useRNColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(defaultMode ?? 'light');
  const [schemeId, setSchemeId] = useState(defaultScheme);
  const [contrast, setContrastState] = useState<ContrastLevel>('normal');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      loadStored<ThemeMode | null>(STORAGE_KEY_THEME, null),
      loadStored<string>(STORAGE_KEY_SCHEME, defaultScheme),
      loadStored<ContrastLevel>(STORAGE_KEY_CONTRAST, 'normal'),
    ]).then(([storedMode, storedScheme, storedContrast]) => {
      if (storedMode) setModeState(storedMode);
      else if (systemScheme) setModeState(systemScheme === 'dark' ? 'dark' : 'light');
      setSchemeId(storedScheme);
      setContrastState(storedContrast);
      setLoaded(true);
    });
  }, [systemScheme, defaultScheme]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(newMode)).catch(() => {});
  }, []);

  const setScheme = useCallback((id: string) => {
    setSchemeId(id);
    AsyncStorage.setItem(STORAGE_KEY_SCHEME, JSON.stringify(id)).catch(() => {});
  }, []);

  const setContrast = useCallback((level: ContrastLevel) => {
    setContrastState(level);
    AsyncStorage.setItem(STORAGE_KEY_CONTRAST, JSON.stringify(level)).catch(() => {});
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const scheme = getColorScheme(schemeId);
  const resolvedMode: ThemeMode = contrast === 'high' ? 'high-contrast' : mode;
  const colors = scheme.colors[resolvedMode === 'high-contrast' ? 'highContrast' : resolvedMode];
  const isDark = resolvedMode === 'dark' || resolvedMode === 'high-contrast';

  const value = useMemo(() => ({
    mode, scheme, colors, contrast,
    setMode, setScheme, setContrast, toggleMode, isDark,
  }), [mode, scheme, colors, contrast, setMode, setScheme, setContrast, toggleMode, isDark]);

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
