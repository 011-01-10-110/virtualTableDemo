import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    viteCompression(),
  ],
  server: {
    port: 8080,
    proxy: {
      '/v1': {
        target: 'http://129.211.124.109:11403',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
