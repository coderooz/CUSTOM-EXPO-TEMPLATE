import type { CacheEntry } from './types';

export interface CacheAdapter {
  get(key: string): Promise<CacheEntry | null>;
  set(key: string, entry: CacheEntry): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

export function createSqliteCache(db: unknown): CacheAdapter {
  return {
    async get(key: string): Promise<CacheEntry | null> {
      try {
        const { getDatabase, executeQuery } = await import('@/services/db');
        const rows = await executeQuery<CacheEntry>(
          'SELECT key, data, version, updatedAt FROM page_engine_cache WHERE key = ?',
          key,
        );
        return rows.length > 0 ? rows[0] : null;
      } catch {
        return null;
      }
    },

    async set(key: string, entry: CacheEntry): Promise<void> {
      try {
        const { executeRun } = await import('@/services/db');
        await executeRun(
          `INSERT OR REPLACE INTO page_engine_cache (key, data, version, updatedAt)
           VALUES (?, ?, ?, ?)`,
          entry.key, entry.data, entry.version, entry.updatedAt,
        );
      } catch {
        return;
      }
    },

    async delete(key: string): Promise<void> {
      try {
        const { executeRun } = await import('@/services/db');
        await executeRun('DELETE FROM page_engine_cache WHERE key = ?', key);
      } catch {
        return;
      }
    },

    async clear(): Promise<void> {
      try {
        const { executeRun } = await import('@/services/db');
        await executeRun('DELETE FROM page_engine_cache');
      } catch {
        return;
      }
    },
  };
}

export function createMemoryCache(): CacheAdapter {
  const store = new Map<string, CacheEntry>();

  return {
    async get(key: string): Promise<CacheEntry | null> {
      return store.get(key) ?? null;
    },
    async set(key: string, entry: CacheEntry): Promise<void> {
      store.set(key, entry);
    },
    async delete(key: string): Promise<void> {
      store.delete(key);
    },
    async clear(): Promise<void> {
      store.clear();
    },
  };
}
