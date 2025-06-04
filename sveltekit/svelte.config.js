import path from "node:path";
import { fileURLToPath } from "node:url";
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      config: path.join(__dirname, "wrangler.jsonc"),
      platformProxy: {
        configPath: path.join(__dirname, "wrangler.jsonc"),
      },
    }),
  },
};

export default config;
