import { describe, it, expect } from 'vitest';
import {
  spacing,
  borderRadius,
  fontSize,
  lineHeight,
  fontWeight,
  typography,
  shadow,
  animation,
} from '../template/src/theme/tokens';

describe('design tokens', () => {
  it('spacing follows the 4px base grid', () => {
    expect(spacing[0]).toBe(0);
    expect(spacing[1]).toBe(4);
    expect(spacing[2]).toBe(8);
    expect(spacing[4]).toBe(16);
    expect(spacing[8]).toBe(32);
    expect(spacing.px).toBe(1);
    expect(spacing['0.5']).toBe(2);
    expect(spacing[24]).toBe(96);
  });

  it('borderRadius covers small to fully-rounded', () => {
    expect(borderRadius.none).toBe(0);
    expect(borderRadius.sm).toBe(4);
    expect(borderRadius.md).toBe(8);
    expect(borderRadius.lg).toBe(12);
    expect(borderRadius['2xl']).toBe(24);
    expect(borderRadius.full).toBe(9999);
  });

  it('fontSize scales from xs to 5xl', () => {
    expect(fontSize.xs).toBe(12);
    expect(fontSize.base).toBe(16);
    expect(fontSize['5xl']).toBe(48);
    expect(fontSize['5xl'] > fontSize['2xl']).toBe(true);
  });

  it('lineHeight uses unitless multipliers', () => {
    expect(lineHeight.none).toBe(1);
    expect(lineHeight.loose).toBe(2);
  });

  it('fontWeight maps to numeric strings', () => {
    expect(fontWeight.normal).toBe('400');
    expect(fontWeight.bold).toBe('700');
    expect(fontWeight.black).toBe('900');
  });

  it('typography variants reference tokens consistently', () => {
    expect(typography.h1).toMatchObject({ fontSize: fontSize['4xl'], fontWeight: fontWeight.bold });
    expect(typography.body).toMatchObject({ fontSize: fontSize.base, fontWeight: fontWeight.normal });
    expect(typography.button).toMatchObject({ fontSize: fontSize.base, lineHeight: lineHeight.none });
  });

  it('shadows escalate elevation with size', () => {
    expect(shadow.sm.elevation).toBe(1);
    expect(shadow.md.elevation).toBe(3);
    expect(shadow.lg.elevation).toBe(5);
    expect(shadow.xl.elevation).toBe(8);
  });

  it('animation durations are ordered fast < normal < slow', () => {
    expect(animation.duration.fast).toBeLessThan(animation.duration.normal);
    expect(animation.duration.normal).toBeLessThan(animation.duration.slow);
  });
});
