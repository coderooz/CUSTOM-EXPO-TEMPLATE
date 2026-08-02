"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const merge_1 = require("../merge");
(0, vitest_1.describe)('mergeDependencies', () => {
    (0, vitest_1.it)('adds new dependencies', () => {
        const result = (0, merge_1.mergeDependencies)({}, { 'expo-test': '^1.0.0' });
        (0, vitest_1.expect)(result).toEqual({ 'expo-test': '^1.0.0' });
    });
    (0, vitest_1.it)('merges with existing dependencies', () => {
        const result = (0, merge_1.mergeDependencies)({ 'expo-existing': '^0.5.0' }, { 'expo-test': '^1.0.0' });
        (0, vitest_1.expect)(result).toEqual({
            'expo-existing': '^0.5.0',
            'expo-test': '^1.0.0',
        });
    });
    (0, vitest_1.it)('keeps existing version when conflict exists', () => {
        const result = (0, merge_1.mergeDependencies)({ 'expo-test': '^0.5.0' }, { 'expo-test': '^1.0.0' });
        (0, vitest_1.expect)(result['expo-test']).toBe('^0.5.0');
    });
    (0, vitest_1.it)('preserves existing version when same', () => {
        const result = (0, merge_1.mergeDependencies)({ 'expo-test': '^1.0.0' }, { 'expo-test': '^1.0.0' });
        (0, vitest_1.expect)(result['expo-test']).toBe('^1.0.0');
    });
    (0, vitest_1.it)('handles empty incoming deps', () => {
        const existing = { 'expo-existing': '^1.0.0' };
        const result = (0, merge_1.mergeDependencies)(existing, {});
        (0, vitest_1.expect)(result).toEqual(existing);
    });
});
(0, vitest_1.describe)('deepMerge', () => {
    (0, vitest_1.it)('merges nested objects', () => {
        const target = { a: { b: 1, c: 2 } };
        const source = { a: { b: 10, d: 3 } };
        const result = (0, merge_1.deepMerge)(target, source);
        (0, vitest_1.expect)(result.a.b).toBe(10);
        (0, vitest_1.expect)(result.a.c).toBe(2);
        (0, vitest_1.expect)(result.a.d).toBe(3);
    });
    (0, vitest_1.it)('replaces arrays by default (replace strategy)', () => {
        const target = { items: [1, 2, 3] };
        const source = { items: [4, 5] };
        const result = (0, merge_1.deepMerge)(target, source);
        (0, vitest_1.expect)(result.items).toEqual([4, 5]);
    });
    (0, vitest_1.it)('concats arrays with concat strategy', () => {
        const target = { items: [1, 2, 3] };
        const source = { items: [4, 5] };
        const result = (0, merge_1.deepMerge)(target, source, 'concat');
        (0, vitest_1.expect)(result.items).toEqual([1, 2, 3, 4, 5]);
    });
    (0, vitest_1.it)('deduplicates arrays with unique strategy', () => {
        const target = { items: [1, 2, 3] };
        const source = { items: [3, 4, 5] };
        const result = (0, merge_1.deepMerge)(target, source, 'unique');
        (0, vitest_1.expect)(result.items).toEqual([1, 2, 3, 4, 5]);
    });
    (0, vitest_1.it)('handles null values', () => {
        (0, vitest_1.expect)((0, merge_1.deepMerge)(null, { a: 1 })).toEqual({ a: 1 });
        (0, vitest_1.expect)((0, merge_1.deepMerge)({ a: 1 }, null)).toEqual({ a: 1 });
    });
    (0, vitest_1.it)('handles undefined values', () => {
        (0, vitest_1.expect)((0, merge_1.deepMerge)(undefined, { a: 1 })).toEqual({ a: 1 });
        (0, vitest_1.expect)((0, merge_1.deepMerge)({ a: 1 }, undefined)).toEqual({ a: 1 });
    });
    (0, vitest_1.it)('replaces primitives with source', () => {
        const result = (0, merge_1.deepMerge)({ a: 1 }, { a: 2 });
        (0, vitest_1.expect)(result).toEqual({ a: 2 });
    });
    (0, vitest_1.it)('handles deeply nested objects (4+ levels)', () => {
        const target = { a: { b: { c: { d: 1, e: 2 } } } };
        const source = { a: { b: { c: { d: 10, f: 3 } } } };
        const result = (0, merge_1.deepMerge)(target, source);
        const c = result.a.b;
        (0, vitest_1.expect)(c.c.d).toBe(10);
        (0, vitest_1.expect)(c.c.e).toBe(2);
        (0, vitest_1.expect)(c.c.f).toBe(3);
    });
    (0, vitest_1.it)('protects against prototype pollution', () => {
        const target = { a: 1 };
        const source = JSON.parse('{"__proto__": {"polluted": true}}');
        const result = (0, merge_1.deepMerge)(target, source);
        (0, vitest_1.expect)({}.polluted).toBeUndefined();
        (0, vitest_1.expect)(Object.keys(result)).not.toContain('__proto__');
        (0, vitest_1.expect)(Object.keys(result)).toContain('a');
    });
    (0, vitest_1.it)('protects against constructor pollution', () => {
        const target = { a: 1 };
        const source = JSON.parse('{"constructor": {"prototype": {"polluted": true}}}');
        const result = (0, merge_1.deepMerge)(target, source);
        (0, vitest_1.expect)({}.polluted).toBeUndefined();
    });
    (0, vitest_1.it)('handles circular references via WeakSet', () => {
        const target = { a: 1 };
        target.self = target;
        const source = { b: 2 };
        const result = (0, merge_1.deepMerge)(target, source);
        (0, vitest_1.expect)(result.a).toBe(1);
        (0, vitest_1.expect)(result.b).toBe(2);
    });
    (0, vitest_1.it)('merges arrays of objects with unique strategy', () => {
        const target = { items: [{ id: 1 }, { id: 2 }] };
        const source = { items: [{ id: 2 }, { id: 3 }] };
        const result = (0, merge_1.deepMerge)(target, source, 'unique');
        (0, vitest_1.expect)(result.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
    (0, vitest_1.it)('handles empty objects and arrays', () => {
        (0, vitest_1.expect)((0, merge_1.deepMerge)({}, { a: 1 })).toEqual({ a: 1 });
        (0, vitest_1.expect)((0, merge_1.deepMerge)({ a: 1 }, {})).toEqual({ a: 1 });
        (0, vitest_1.expect)((0, merge_1.deepMerge)({ items: [] }, { items: [1] })).toEqual({ items: [1] });
    });
});
//# sourceMappingURL=merge.test.js.map