import { usePageEngine } from '@/context/PageEngineProvider';

export function useVersionCheck() {
  const {
    stalePages,
    hasStalePages,
    acknowledgeStale,
    acknowledgePage,
    refresh,
  } = usePageEngine();

  const refreshAndCheck = async () => {
    await refresh();
  };

  return {
    stalePages,
    hasStalePages,
    acknowledgeStale,
    acknowledgePage,
    refresh: refreshAndCheck,
    count: stalePages.length,
    pages: stalePages.map((p) => ({
      slug: p.slug,
      title: p.title,
      from: p.oldVersion,
      to: p.newVersion,
    })),
  };
}
