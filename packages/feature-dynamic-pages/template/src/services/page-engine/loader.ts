import { PagesManifestSchema, type ValidatedPagesManifest } from './schemas';
import type { PageConfig, CacheEntry } from './types';

interface LoaderOptions {
  configUrl: string;
  fetchFn?: (url: string) => Promise<Response>;
  cacheGet?: (key: string) => Promise<CacheEntry | null>;
  cacheSet?: (key: string, entry: CacheEntry) => Promise<void>;
  onError?: (error: Error) => void;
}

export class ConfigLoader {
  private options: LoaderOptions;
  private cachedManifest: ValidatedPagesManifest | null = null;
  private manifestVersion = 0;

  constructor(options: LoaderOptions) {
    this.options = options;
  }

  async load(): Promise<ValidatedPagesManifest> {
    const { configUrl, fetchFn, cacheGet, cacheSet, onError } = this.options;
    const cacheKey = `page-engine:manifest:${configUrl}`;

    try {
      const fetch = fetchFn ?? globalThis.fetch.bind(globalThis);
      const response = await fetch(configUrl);

      if (!response.ok) {
        throw new Error(`Config fetch failed: ${response.status} ${response.statusText}`);
      }

      const raw: unknown = await response.json();
      const manifest = PagesManifestSchema.parse(raw);

      this.cachedManifest = manifest;
      this.manifestVersion = manifest.schemaVersion;

      if (cacheSet) {
        await cacheSet(cacheKey, {
          key: cacheKey,
          data: JSON.stringify(manifest),
          version: manifest.schemaVersion,
          updatedAt: Date.now(),
        });
      }

      return manifest;
    } catch (error) {
      if (cacheGet) {
        const cached = await cacheGet(cacheKey);
        if (cached) {
          try {
            const parsed = PagesManifestSchema.parse(JSON.parse(cached.data));
            this.cachedManifest = parsed;
            this.manifestVersion = parsed.schemaVersion;
            return parsed;
          } catch {
            throw error;
          }
        }
      }

      if (onError && error instanceof Error) onError(error);
      throw error;
    }
  }

  getPage(slug: string): PageConfig | undefined {
    return this.cachedManifest?.pages.find((p) => p.slug === slug);
  }

  getAllPages(): PageConfig[] {
    return this.cachedManifest?.pages ?? [];
  }

  getVersion(): number {
    return this.manifestVersion;
  }

  invalidateCache(): void {
    this.cachedManifest = null;
    this.manifestVersion = 0;
  }
}
