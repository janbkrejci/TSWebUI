import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'ts-table-bundle': resolve(__dirname, 'packages/ts-table/src/ts-table.js'),
        'ts-form-bundle': resolve(__dirname, 'packages/ts-form/src/ts-form.js')
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
