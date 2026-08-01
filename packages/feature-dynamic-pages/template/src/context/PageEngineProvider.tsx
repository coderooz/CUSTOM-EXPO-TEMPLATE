import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ConfigLoader } from '@/services/page-engine/loader';
import { PageResolver } from '@/services/page-engine/resolver';
import { registry } from '@/services/page-engine/registry';
import { createMemoryCache, type CacheAdapter } from '@/services/page-engine/cache';
import { VersionTracker } from '@/services/page-engine/version-tracker';
import type { PageConfig, PageEngineConfig, StalePageInfo } from '@/services/page-engine/types';

interface PageEngineContextValue {
  loader: ConfigLoader;
  resolver: PageResolver;
  pages: PageConfig[];
  loaded: boolean;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  getPage: (slug: string) => PageConfig | undefined;
  registerComponent: (type: string, component: React.ComponentType<any>) => void;
  registerAction: (key: string, handler: (...args: unknown[]) => unknown) => void;
  dispatchAction: (key: string, ...args: unknown[]) => unknown;
  stalePages: StalePageInfo[];
  hasStalePages: boolean;
  acknowledgeStale: () => Promise<void>;
  acknowledgePage: (slug: string, version: number) => Promise<void>;
}

const PageEngineContext = createContext<PageEngineContextValue | null>(null);

export function PageEngineProvider({
  children,
  configUrl,
  pollIntervalMs = 0,
  cacheAdapter,
  fetchFn,
  onError,
}: React.PropsWithChildren<PageEngineConfig & { cacheAdapter?: CacheAdapter }>) {
  const [pages, setPages] = useState<PageConfig[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stalePages, setStalePages] = useState<StalePageInfo[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const versionTrackerRef = useRef<VersionTracker | null>(null);

  const cache = useMemo(() => cacheAdapter ?? createMemoryCache(), [cacheAdapter]);

  const versionTracker = useMemo(() => {
    const vt = new VersionTracker(configUrl);
    versionTrackerRef.current = vt;
    return vt;
  }, [configUrl]);

  const loader = useMemo(() => new ConfigLoader({
    configUrl,
    fetchFn,
    cacheGet: cache.get.bind(cache),
    cacheSet: cache.set.bind(cache),
    onError: (err) => { setError(err); onError?.(err); },
  }), [configUrl, fetchFn, cache, onError]);

  const resolver = useMemo(() => new PageResolver(loader), [loader]);

  const loadPages = useCallback(async () => {
    try {
      setLoading(true);
      const manifest = await loader.load();
      setPages(manifest.pages);

      if (versionTrackerRef.current) {
        const stale = versionTrackerRef.current.checkPages(manifest.pages);
        setStalePages(stale);
      }

      setLoaded(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    versionTracker.initialize().then(loadPages);
    if (pollIntervalMs > 0) {
      intervalRef.current = setInterval(loadPages, pollIntervalMs);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loadPages, pollIntervalMs, versionTracker]);

  const registerComponent = useCallback((type: string, component: React.ComponentType<any>) => {
    registry.registerComponent(type, component);
  }, []);

  const registerAction = useCallback((key: string, handler: (...args: unknown[]) => unknown) => {
    registry.registerAction(key, handler);
  }, []);

  const dispatchAction = useCallback((key: string, ...args: unknown[]) => {
    const handler = registry.getAction(key);
    if (handler) return handler(...args);
    console.warn(`Action "${key}" not found in registry`);
    return undefined;
  }, []);

  const getPage = useCallback((slug: string): PageConfig | undefined => {
    return loader.getPage(slug);
  }, [loader]);

  const acknowledgeStale = useCallback(async () => {
    if (versionTrackerRef.current) {
      await versionTrackerRef.current.acknowledgeStale();
      setStalePages([]);
    }
  }, []);

  const acknowledgePage = useCallback(async (slug: string, version: number) => {
    if (versionTrackerRef.current) {
      await versionTrackerRef.current.acknowledgePage(slug, version);
      setStalePages((prev) => prev.filter((p) => p.slug !== slug));
    }
  }, []);

  const value = useMemo(() => ({
    loader, resolver, pages, loaded, loading, error,
    refresh: loadPages, getPage,
    registerComponent, registerAction, dispatchAction,
    stalePages,
    hasStalePages: stalePages.length > 0,
    acknowledgeStale, acknowledgePage,
  }), [loader, resolver, pages, loaded, loading, error, loadPages, getPage,
      registerComponent, registerAction, dispatchAction,
      stalePages, acknowledgeStale, acknowledgePage]);

  return (
    <PageEngineContext.Provider value={value}>
      {children}
    </PageEngineContext.Provider>
  );
}

export function usePageEngine(): PageEngineContextValue {
  const ctx = useContext(PageEngineContext);
  if (!ctx) throw new Error('usePageEngine must be used within PageEngineProvider');
  return ctx;
}
