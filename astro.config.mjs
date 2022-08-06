import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  // TODO: cambiar a que sea variable de entorno
  site: "https://benjavicente.github.io",
  base: "webccc",
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  }
});
