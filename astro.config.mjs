import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	experimental: {
		assets: true,
	},
	image: {
		service: sharpImageService(),
	},
	integrations: [tailwind(), svelte()],
	output: "static",
});
