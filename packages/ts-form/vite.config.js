import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/ts-form.js'),
            name: 'TSForm',
            fileName: (format) => `ts-form.${format}.js`
        },
        rollupOptions: {
            // Make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [/^ts-table/], // Externalize ts-table as requested
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    // 'ts-table': 'TSTable' // If needed
                }
            }
        }
    }
});
