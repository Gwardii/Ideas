import { useState } from 'react';

export const useAsyncHandler = <T extends (...args: unknown[]) => Promise<unknown>>(fn: T) => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    async execute(...args: Parameters<T>) {
      setIsLoading(true);
      try {
        return await fn(...args);
      } finally {
        setIsLoading(false);
      }
    },
  };
};
