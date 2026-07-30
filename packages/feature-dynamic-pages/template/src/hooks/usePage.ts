import { useMemo } from 'react';
import { usePageEngine } from '@/context/PageEngineProvider';

export function usePage(slug: string) {
  const { resolver, pages, loading, error } = usePageEngine();

  const resolved = useMemo(() => resolver.resolve(slug), [slug, resolver, pages]);

  return {
    page: resolved?.config ?? null,
    template: resolved?.template ?? null,
    sections: resolved?.sections ?? [],
    unknownSections: resolved?.unknownSections ?? [],
    notFound: !resolved && !loading,
    loading,
    error,
  };
}

export function usePages() {
  const { pages, loading, error } = usePageEngine();
  return { pages, loading, error };
}

export function usePageActions() {
  const { registerAction, dispatchAction } = usePageEngine();
  return { registerAction, dispatchAction };
}
