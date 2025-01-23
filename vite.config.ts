import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/bot.ts',
    },
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [],
});
