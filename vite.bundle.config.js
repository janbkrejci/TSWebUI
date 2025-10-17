import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/stories/ts-table.js'),
      name: 'TSTable',
      fileName: 'ts-table-bundle',
      formats: ['es']
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      // Ensure all dependencies are bundled
      external: [],
      output: {
        // Inline all dynamic imports
        inlineDynamicImports: true
      }
    }
  }
});
