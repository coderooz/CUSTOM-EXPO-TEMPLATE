import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PageConfig } from './types';

const PREFIX_SCHEMA = '@coderooz/page-engine/schema-version/';
const PREFIX_PAGE = '@coderooz/page-engine/page-version/';

export interface StalePageInfo {
  slug: string;
  title: string;
  oldVersion: number;
  newVersion: number;
}

function storageKey(url: string): string {
  return url.replace(/[^a-zA-Z0-9]/g, '_');
}

export class VersionTracker {
  private schemaUrl: string;
  private acknowledgedSchemaVersion = 0;
  private acknowledgedPageVersions = new Map<string, number>();
  private stalePages: StalePageInfo[] = [];
  private initialized = false;

  constructor(configUrl: string) {
    this.schemaUrl = configUrl;
  }

  async initialize(): Promise<void> {
    try {
      const key = PREFIX_SCHEMA + storageKey(this.schemaUrl);
      const stored = await AsyncStorage.getItem(key);
      if (stored) this.acknowledgedSchemaVersion = Number(stored);
    } catch {}
    this.initialized = true;
  }

  checkPages(pages: PageConfig[]): StalePageInfo[] {
    if (!this.initialized) return [];
    this.stalePages = [];

    for (const page of pages) {
      const key = PREFIX_PAGE + page.slug;
      const acknowledged = this.acknowledgedPageVersions.get(page.slug) ?? 0;

      if (page.configVersion > acknowledged) {
        this.stalePages.push({
          slug: page.slug,
          title: page.title,
          oldVersion: acknowledged,
          newVersion: page.configVersion,
        });
      }
    }

    return this.stalePages;
  }

  getStalePages(): StalePageInfo[] {
    return this.stalePages;
  }

  hasStalePages(): boolean {
    return this.stalePages.length > 0;
  }

  async acknowledgeSchemaVersion(version: number): Promise<void> {
    this.acknowledgedSchemaVersion = version;
    try {
      const key = PREFIX_SCHEMA + storageKey(this.schemaUrl);
      await AsyncStorage.setItem(key, String(version));
    } catch {}
  }

  async acknowledgePage(slug: string, version: number): Promise<void> {
    this.acknowledgedPageVersions.set(slug, version);
    this.stalePages = this.stalePages.filter((p) => p.slug !== slug);
    try {
      const key = PREFIX_PAGE + slug;
      await AsyncStorage.setItem(key, String(version));
    } catch {}
  }

  async acknowledgeAll(pages: PageConfig[]): Promise<void> {
    for (const page of pages) {
      await this.acknowledgePage(page.slug, page.configVersion);
    }
  }

  async acknowledgeStale(): Promise<void> {
    for (const stale of this.stalePages) {
      await this.acknowledgePage(stale.slug, stale.newVersion);
    }
  }

  getLastAcknowledgedSchemaVersion(): number {
    return this.acknowledgedSchemaVersion;
  }
}
