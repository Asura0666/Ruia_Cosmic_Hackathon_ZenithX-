import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/cesium/Build/Cesium/Workers',
          dest: 'cesium'
        },
        {
          src: 'node_modules/cesium/Build/Cesium/ThirdParty',
          dest: 'cesium'
        },
        {
          src: 'node_modules/cesium/Build/Cesium/Assets',
          dest: 'cesium'
        },
        {
          src: 'node_modules/cesium/Build/Cesium/Widgets',
          dest: 'cesium'
        }
      ]
    })
  ],
  build: {
    target: 'es2015',
    polyfillModulePreload: true,
    commonjsOptions: {
      include: [/core-js/, /node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'core-js': ['core-js'],
          'polyfills': ['core-js/stable'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium/')
  },
  optimizeDeps: {
    exclude: ['lucide-react', 'web3', 'ethers', '@metamask/sdk'],
    include: ['core-js/stable', 'core-js/features/array/flat-map'],
  },
  server: {
    port: 4000,
    host: '0.0.0.0',
    strictPort: true,
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; object-src 'none'; worker-src 'self' blob:;",
    },
  },
});