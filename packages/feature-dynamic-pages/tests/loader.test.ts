import { describe, it, expect, vi } from 'vitest';
import { ConfigLoader } from '../template/src/services/page-engine/loader';
import type { CacheEntry } from '../template/src/services/page-engine/types';

const manifest = {
  pages: [
    {
      slug: 'home',
      title: 'Home',
      template: 'marketing',
      sections: [{ id: 'hero', type: 'hero' }],
      configVersion: 1,
    },
    {
      slug: 'about',
      title: 'About',
      template: 'marketing',
      sections: [],
      configVersion: 2,
    },
  ],
  schemaVersion: 1,
};

function makeFetch(data: unknown, ok = true, status = 200) {
  return vi.fn(async () =>
    Promise.resolve({
      ok,
      status,
      statusText: ok ? 'OK' : 'Not Found',
      json: async () => data,
    } as Response),
  );
}

function makeMemoryStore() {
  const store = new Map<string, CacheEntry>();
  return {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    set: vi.fn(async (key: string, entry: CacheEntry) => {
      store.set(key, entry);
    }),
  };
}

describe('ConfigLoader', () => {
  it('loads a valid manifest from the network', async () => {
    const fetchFn = makeFetch(manifest);
    const loader = new ConfigLoader({ configUrl: 'https://example.com/pages.json', fetchFn });
    const result = await loader.load();
    expect(result.pages).toHaveLength(2);
    expect(fetchFn).toHaveBeenCalledWith('https://example.com/pages.json');
  });

  it('returns pages via getPage and getAllPages', async () => {
    const fetchFn = makeFetch(manifest);
    const loader = new ConfigLoader({ configUrl: 'https://example.com/pages.json', fetchFn });
    await loader.load();
    expect(loader.getPage('home')?.title).toBe('Home');
    expect(loader.getPage('missing')).toBeUndefined();
    expect(loader.getAllPages()).toHaveLength(2);
    expect(loader.getVersion()).toBe(1);
  });

  it('writes to the cache after a successful load', async () => {
    const fetchFn = makeFetch(manifest);
    const cache = makeMemoryStore();
    const loader = new ConfigLoader({
      configUrl: 'https://example.com/pages.json',
      fetchFn,
      cacheGet: cache.get,
      cacheSet: cache.set,
    });
    await loader.load();
    expect(cache.set).toHaveBeenCalled();
  });

  it('falls back to the cache when the network fails', async () => {
    const fetchFn = makeFetch(undefined, false, 500);
    const cache = makeMemoryStore();
    await cache.set('page-engine:manifest:https://example.com/pages.json', {
      key: 'page-engine:manifest:https://example.com/pages.json',
      data: JSON.stringify(manifest),
      version: 1,
      updatedAt: Date.now(),
    });

    const loader = new ConfigLoader({
      configUrl: 'https://example.com/pages.json',
      fetchFn,
      cacheGet: cache.get,
      cacheSet: cache.set,
    });
    const result = await loader.load();
    expect(result.pages).toHaveLength(2);
    expect(fetchFn).toHaveBeenCalled();
  });

  it('throws when the network fails and no cache exists', async () => {
    const fetchFn = makeFetch(undefined, false, 500);
    const loader = new ConfigLoader({ configUrl: 'https://example.com/pages.json', fetchFn });
    await expect(loader.load()).rejects.toThrow('Config fetch failed: 500');
  });

  it('throws when the response is invalid JSON', async () => {
    const fetchFn = vi.fn(async () =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({ pages: 'not-an-array' }),
      } as Response),
    );
    const loader = new ConfigLoader({ configUrl: 'https://example.com/pages.json', fetchFn });
    await expect(loader.load()).rejects.toThrow();
  });

  it('invokes onError on failure', async () => {
    const fetchFn = makeFetch(undefined, false, 500);
    const onError = vi.fn();
    const loader = new ConfigLoader({
      configUrl: 'https://example.com/pages.json',
      fetchFn,
      onError,
    });
    await expect(loader.load()).rejects.toThrow();
    expect(onError).toHaveBeenCalled();
  });

  it('invalidates the in-memory cache', async () => {
    const fetchFn = makeFetch(manifest);
    const loader = new ConfigLoader({ configUrl: 'https://example.com/pages.json', fetchFn });
    await loader.load();
    expect(loader.getVersion()).toBe(1);
    loader.invalidateCache();
    expect(loader.getVersion()).toBe(0);
    expect(loader.getAllPages()).toHaveLength(0);
  });
});
