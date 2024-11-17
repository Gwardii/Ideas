import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ZodError } from 'zod';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount) => {
        return failureCount < 2;
      },
    },
  },
  queryCache: new QueryCache({
    onError: async (error) => {
      if (error instanceof ZodError) {
        console.error(error, error.format());
      } else {
        console.error(error);
      }
    },
  }),
});

export function Query({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
