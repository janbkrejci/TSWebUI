import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/ts-table/src/ts-table.js'),
      name: 'TSTable',
      fileName: 'ts-table-bundle',
      formats: ['es']
    },
    outDir: resolve(__dirname, 'packages/ts-table/dist'),
    emptyOutDir: true,
    rollupOptions: {
      // Ensure all dependencies are bundled
      external: [],
      output: {
        // Inline all dynamic imports
        inlineDynamicImports: true
      }
    }
  },
  publicDir: false
});
