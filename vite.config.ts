import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginRadar } from "vite-plugin-radar";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    alias: {
      '~components': './src/components'
    },
    plugins: [
      react(),
      VitePluginRadar({
        // Google Analytics tag injection
        analytics: {
          id: env.GA_TRACKING_ID,
        },
      }),
    ],
  };
});
