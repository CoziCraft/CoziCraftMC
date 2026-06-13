import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const basePageSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().optional(),
  section: z.string().optional(),
  tags: z.array(z.string()).default([]),
  navigation: z.boolean().default(true),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.md',
        prefix: '',
      },
      schema: basePageSchema,
    }),
    wiki: defineCollection({
      type: 'page',
      source: 'wiki/**/*.md',
      schema: basePageSchema.extend({
        category: z.string(),
      }),
    }),
    faq: defineCollection({
      type: 'page',
      source: 'faq/**/*.md',
      schema: basePageSchema,
    }),
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
      schema: basePageSchema.extend({
        date: z.string(),
      }),
    }),
  },
})
