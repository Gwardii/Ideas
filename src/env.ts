const parseEnv = (env: string) => {
  if (!env) throw new Error('Environment variable is not defined');
  return env;
};

export const env = {
  VITE_BASE_API_URL: parseEnv(import.meta.env.VITE_BASE_API_URL),
} satisfies Partial<ImportMetaEnv>;

