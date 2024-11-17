import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
    checker({
      overlay: false,
      enableBuild: false,
      typescript: true,
    }),
  ],
  base: '/',
  build: {
    sourcemap: 'hidden',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
});
