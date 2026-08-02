import { useCallback } from 'react';
import { usePageEngine } from '@/context/PageEngineProvider';

export function useAction() {
  const { dispatchAction } = usePageEngine();

  const dispatch = useCallback((key: string, ...args: unknown[]) => {
    return dispatchAction(key, ...args);
  }, [dispatchAction]);

  return { dispatch };
}

export function useRegisterActions(actions: Record<string, (...args: unknown[]) => unknown>) {
  const { registerAction } = usePageEngine();

  Object.entries(actions).forEach(([key, handler]) => {
    registerAction(key, handler);
  });
}
