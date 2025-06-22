import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Support both date and pubDate fields
    pubDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    // Support various image field names
    heroImage: z.string().optional(),
    coverImage: z.string().optional(),
    // Support tags array
    tags: z.array(z.string()).optional(),
    // Additional fields found in some posts
    published: z.boolean().optional(),
    series: z.union([z.boolean(), z.string()]).optional(),
  })
  .refine(data => data.date || data.pubDate, {
    message: "Either date or pubDate must be provided",
    path: ["date", "pubDate"]
  }),
});

export const collections = { blog };
