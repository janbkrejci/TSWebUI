import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'index': resolve(__dirname, 'packages/index.js'),
        'ts-table-bundle': resolve(__dirname, 'packages/ts-table/src/ts-table.js'),
        'ts-form-bundle': resolve(__dirname, 'packages/ts-form/src/ts-form.js'),
        'ts-window-bundle': resolve(__dirname, 'packages/ts-window/src/ts-window.js'),
        'ts-form-wrapper-bundle': resolve(__dirname, 'packages/ts-form-wrapper/src/ts-form-wrapper.js')
      },
      output: {
        dir: resolve(__dirname, 'dist'),
        format: 'es',
        entryFileNames: '[name].js'
      }
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  publicDir: false
});
