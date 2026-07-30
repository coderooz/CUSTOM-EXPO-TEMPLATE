import { describe, it, expect } from 'vitest';
import { mergeDependencies, deepMerge } from '../merge';

describe('mergeDependencies', () => {
  it('adds new dependencies', () => {
    const result = mergeDependencies({}, { 'expo-test': '^1.0.0' });
    expect(result).toEqual({ 'expo-test': '^1.0.0' });
  });

  it('merges with existing dependencies', () => {
    const result = mergeDependencies(
      { 'expo-existing': '^0.5.0' },
      { 'expo-test': '^1.0.0' },
    );
    expect(result).toEqual({
      'expo-existing': '^0.5.0',
      'expo-test': '^1.0.0',
    });
  });

  it('keeps existing version when conflict exists', () => {
    const result = mergeDependencies(
      { 'expo-test': '^0.5.0' },
      { 'expo-test': '^1.0.0' },
    );
    expect(result['expo-test']).toBe('^0.5.0');
  });

  it('preserves existing version when same', () => {
    const result = mergeDependencies(
      { 'expo-test': '^1.0.0' },
      { 'expo-test': '^1.0.0' },
    );
    expect(result['expo-test']).toBe('^1.0.0');
  });

  it('handles empty incoming deps', () => {
    const existing = { 'expo-existing': '^1.0.0' };
    const result = mergeDependencies(existing, {});
    expect(result).toEqual(existing);
  });
});

describe('deepMerge', () => {
  it('merges nested objects', () => {
    const target = { a: { b: 1, c: 2 } };
    const source = { a: { b: 10, d: 3 } };
    const result = deepMerge(target, source) as Record<string, unknown>;
    expect((result.a as Record<string, unknown>).b).toBe(10);
    expect((result.a as Record<string, unknown>).c).toBe(2);
    expect((result.a as Record<string, unknown>).d).toBe(3);
  });

  it('replaces arrays by default (replace strategy)', () => {
    const target = { items: [1, 2, 3] };
    const source = { items: [4, 5] };
    const result = deepMerge(target, source) as Record<string, unknown>;
    expect(result.items).toEqual([4, 5]);
  });

  it('concats arrays with concat strategy', () => {
    const target = { items: [1, 2, 3] };
    const source = { items: [4, 5] };
    const result = deepMerge(target, source, 'concat') as Record<string, unknown>;
    expect(result.items).toEqual([1, 2, 3, 4, 5]);
  });

  it('deduplicates arrays with unique strategy', () => {
    const target = { items: [1, 2, 3] };
    const source = { items: [3, 4, 5] };
    const result = deepMerge(target, source, 'unique') as Record<string, unknown>;
    expect(result.items).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles null values', () => {
    expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 });
  });

  it('handles undefined values', () => {
    expect(deepMerge(undefined, { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 });
  });

  it('replaces primitives with source', () => {
    const result = deepMerge({ a: 1 }, { a: 2 });
    expect(result).toEqual({ a: 2 });
  });

  it('handles deeply nested objects (4+ levels)', () => {
    const target = { a: { b: { c: { d: 1, e: 2 } } } };
    const source = { a: { b: { c: { d: 10, f: 3 } } } };
    const result = deepMerge(target, source) as Record<string, unknown>;
    const c = (result.a as Record<string, unknown>).b as Record<string, unknown>;
    expect((c.c as Record<string, unknown>).d).toBe(10);
    expect((c.c as Record<string, unknown>).e).toBe(2);
    expect((c.c as Record<string, unknown>).f).toBe(3);
  });

  it('protects against prototype pollution', () => {
    const target = { a: 1 };
    const source = JSON.parse('{"__proto__": {"polluted": true}}');
    const result = deepMerge(target, source) as Record<string, unknown>;
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(Object.keys(result)).not.toContain('__proto__');
    expect(Object.keys(result)).toContain('a');
  });

  it('protects against constructor pollution', () => {
    const target = { a: 1 };
    const source = JSON.parse('{"constructor": {"prototype": {"polluted": true}}}');
    const result = deepMerge(target, source) as Record<string, unknown>;
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('handles circular references via WeakSet', () => {
    const target: Record<string, unknown> = { a: 1 };
    target.self = target;
    const source = { b: 2 };
    const result = deepMerge(target, source) as Record<string, unknown>;
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });

  it('merges arrays of objects with unique strategy', () => {
    const target = { items: [{ id: 1 }, { id: 2 }] };
    const source = { items: [{ id: 2 }, { id: 3 }] };
    const result = deepMerge(target, source, 'unique') as Record<string, unknown>;
    expect(result.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('handles empty objects and arrays', () => {
    expect(deepMerge({}, { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, {})).toEqual({ a: 1 });
    expect(deepMerge({ items: [] }, { items: [1] })).toEqual({ items: [1] });
  });
});
