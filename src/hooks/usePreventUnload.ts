import { useEffect } from 'react';

type UsePreventUnloadOptions = {
  shouldPrevent?: boolean;
};
export const usePreventUnload = (options?: UsePreventUnloadOptions) => {
  const { shouldPrevent = true } = options ?? {};
  useEffect(() => {
    if (!shouldPrevent) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.returnValue = `You have unsaved data. Are you sure you want to leave?`;
    };
    window.addEventListener('beforeunload', handler, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', handler, { capture: true });
    };
  }, [shouldPrevent]);
};
