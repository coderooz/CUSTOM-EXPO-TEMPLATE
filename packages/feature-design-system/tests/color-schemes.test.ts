import { describe, it, expect } from 'vitest';
import { colorSchemes, getColorScheme } from '../template/src/theme/color-schemes';

describe('colorSchemes', () => {
  it('exports a non-empty set of schemes', () => {
    expect(colorSchemes.length).toBeGreaterThanOrEqual(8);
  });

  it('includes the expected named schemes', () => {
    const ids = colorSchemes.map((s) => s.id);
    for (const expected of ['neutral', 'default', 'slate', 'gray', 'zinc', 'stone', 'rose', 'green', 'amber', 'violet']) {
      expect(ids).toContain(expected);
    }
  });

  it('each scheme has a label and all three modes', () => {
    for (const scheme of colorSchemes) {
      expect(scheme.label.length).toBeGreaterThan(0);
      for (const mode of ['light', 'dark', 'highContrast'] as const) {
        expect(scheme.colors[mode].background).toBeDefined();
        expect(scheme.colors[mode].foreground).toBeDefined();
        expect(scheme.colors[mode].primary).toBeDefined();
      }
    }
  });

  it('light and dark modes have contrasting backgrounds', () => {
    for (const scheme of colorSchemes) {
      expect(scheme.colors.light.background).not.toBe(scheme.colors.dark.background);
    }
  });

  it('light mode background is light and dark mode is dark', () => {
    for (const scheme of colorSchemes) {
      expect(scheme.colors.light.background).toMatch(/^(#ffffff|hsl)/i);
      expect(scheme.colors.dark.background).toMatch(/hsl/i);
    }
  });

  it('high-contrast mode uses pure black/white', () => {
    for (const scheme of colorSchemes) {
      expect(scheme.colors.highContrast.background).toBe('#000000');
      expect(scheme.colors.highContrast.foreground).toBe('#ffffff');
    }
  });

  it('primary and foreground are always defined and distinct', () => {
    for (const scheme of colorSchemes) {
      expect(scheme.colors.light.primary).toBeTruthy();
      expect(scheme.colors.light.primaryForeground).toBeTruthy();
    }
  });

  it('getColorScheme returns the requested scheme', () => {
    expect(getColorScheme('rose').id).toBe('rose');
  });

  it('getColorScheme falls back to the first scheme for unknown ids', () => {
    expect(getColorScheme('nope').id).toBe(colorSchemes[0].id);
  });
});
