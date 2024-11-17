import { z } from 'zod';
import { env } from '../env';

export class ResponseError extends Error {
  constructor(
    public status: number,
    public data: Record<string, unknown> | string,
  ) {
    super(`Response error: ${status}`);
  }
}

const getContentTypeHeader = (type: 'json' | 'multipart') => {
  if (type === 'json') {
    return {
      'Content-type': 'application/json',
    };
  }
  return undefined;
};

export const request = async <R extends z.ZodTypeAny>(
  endpoint: string,
  options: RequestInit & {
    contentType?: 'json' | 'multipart';
    responseSchema?: R;
  },
): Promise<z.infer<R>> => {
  const response = await fetch(`${env.VITE_BASE_API_URL ?? ''}${endpoint}`, {
    ...options,
    headers: {
      ...getContentTypeHeader(options.contentType ?? 'json'),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ResponseError(response.status, data);
  }
  const responseData =
    response.headers.get('Content-Length') === '0' ? null : await response.json();
  if (options?.responseSchema) {
    return validate(options.responseSchema)(responseData);
  }
  return responseData;
};

export const validate =
  <V extends z.ZodTypeAny>(validator: V): z.infer<V> =>
    (data: unknown): z.infer<V> =>
      validator.parse(data);

