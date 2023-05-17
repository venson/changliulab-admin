import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import externalGlobals from "rollup-plugin-external-globals";
import {Plugin as importToCDN} from "vite-plugin-cdn-import";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importToCDN({
      modules: [
        {
          name: '@bytemd/plugin-math',
          var: 'math',
          path: 'https://esm.run/@bytemd/plugin-math',
        },
      ],
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  build: {
    rollupOptions: {
      // external:['@bytemd/plugin-math'],
      plugins: [
        externalGlobals({
          "@bytemd/plugin-math": "math",
          // 'math':'@bytemd/plugin-math'
          // '@bytemd/plugin-math':'math'
        }),
      ],
    },
  },
});
