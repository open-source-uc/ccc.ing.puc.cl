import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

const isInCloudflare = !!process.env.CLOUDFLARE;

// https://astro.build/config
export default defineConfig({
	experimental: {
		assets: true,
	},
	integrations: [tailwind(), svelte()],
	output: isInCloudflare ? "hybrid" : "static",
	adapter: isInCloudflare ? cloudflare() : undefined,
});
