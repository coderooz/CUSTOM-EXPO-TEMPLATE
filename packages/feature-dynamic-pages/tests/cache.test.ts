import { describe, it, expect } from 'vitest';
import { createMemoryCache } from '../template/src/services/page-engine/cache';
import type { CacheEntry } from '../template/src/services/page-engine/types';

const entry: CacheEntry = {
  key: 'page-engine:manifest:https://example.com/pages.json',
  data: JSON.stringify({ pages: [], schemaVersion: 1 }),
  version: 1,
  updatedAt: 123456789,
};

describe('createMemoryCache', () => {
  it('stores and retrieves an entry', async () => {
    const cache = createMemoryCache();
    await cache.set(entry.key, entry);
    const result = await cache.get(entry.key);
    expect(result).toEqual(entry);
  });

  it('returns null for a missing key', async () => {
    const cache = createMemoryCache();
    expect(await cache.get('missing')).toBeNull();
  });

  it('returns null after delete', async () => {
    const cache = createMemoryCache();
    await cache.set(entry.key, entry);
    await cache.delete(entry.key);
    expect(await cache.get(entry.key)).toBeNull();
  });

  it('returns null after clear', async () => {
    const cache = createMemoryCache();
    await cache.set(entry.key, entry);
    await cache.set('second', { ...entry, key: 'second' });
    await cache.clear();
    expect(await cache.get(entry.key)).toBeNull();
    expect(await cache.get('second')).toBeNull();
  });

  it('overwrites an existing key on set', async () => {
    const cache = createMemoryCache();
    await cache.set(entry.key, entry);
    const updated = { ...entry, version: 2, data: 'updated' };
    await cache.set(entry.key, updated);
    expect(await cache.get(entry.key)).toEqual(updated);
  });
});
