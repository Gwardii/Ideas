/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly VITE_DEPLOY_ENV: 'local' | 'dev' | 'uat' | 'prod' | (string & {});
  readonly VITE_API_KEY: string;
  readonly VITE_SUB_KEY: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_BASE_MSAL_CLIENT_ID: string;
  readonly VITE_BASE_MSAL_AUTHORITY: string;
  readonly VITE_BASE_MAINTENANCE_DATES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
