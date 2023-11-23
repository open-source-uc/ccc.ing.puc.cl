import { z, defineCollection } from "astro:content";

export const collections = {
	guides: defineCollection({
		schema: z.object({
			title: z.string(),
			author: z.string(),
			type: z.enum(["academic", "staff"]),
		}),
	}),
};
