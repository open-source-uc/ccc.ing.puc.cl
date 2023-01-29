import { z, defineCollection } from "astro:content";

export const collections = {
	guides: defineCollection({
		schema: {
			title: z.string(),
			author: z.string(),
			type: z.enum(["academic"]),
			slug: z.string().optional(),
		},
		slug: ({ data, defaultSlug }) => data.slug || defaultSlug,
	}),
};
