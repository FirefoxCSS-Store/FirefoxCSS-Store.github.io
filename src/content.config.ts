import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const themeStatus = z.enum(['published', 'candidate', 'archived'])
const submitterRole = z.enum(['author', 'user', 'maintainer', 'legacy'])
const tag = z
  .string()
  .min(1)
  .max(48)
  .regex(/^[a-z0-9][a-z0-9 .:+/_-]*[a-z0-9]$|^[a-z0-9]$/)

const themes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/themes' }),
  schema: z.object({
    title: z.string().min(2).max(80),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string().min(12).max(420),
    repository: z.url(),
    homepage: z.url().optional(),
    screenshots: z
      .array(z.object({
        src: z.string().startsWith('/assets/img/themes/').refine((value) => !value.includes('//')),
        alt: z.string().min(2).max(120)
      }))
      .min(1),
    tags: z.array(tag).min(1).max(24),
    submitterRole,
    status: themeStatus.default('candidate'),
    catalogIndex: z.number().int().nonnegative().default(100000),
    submittedBy: z.string().min(2).max(80).optional(),
    stats: z.object({
      stars: z.number().int().nonnegative().default(0),
      updatedAt: z.iso.datetime({ offset: true }).nullable().default(null),
      ownerAvatar: z.url().nullable().default(null),
      accessible: z.boolean().default(true)
    }).default({
      stars: 0,
      updatedAt: null,
      ownerAvatar: null,
      accessible: true
    }),
    retirement: z.object({
      reason: z.enum(['repository-archived', 'repository-unavailable']),
      checkedAt: z.iso.datetime({ offset: true }),
      details: z.string().min(2).max(240)
    }).optional()
  }).superRefine((theme, context) => {
    if (theme.status !== 'archived' && theme.retirement) {
      context.addIssue({
        code: 'custom',
        path: ['retirement'],
        message: 'Only archived themes may include retirement metadata'
      })
    }

    if (theme.status === 'archived' && !theme.retirement) {
      context.addIssue({
        code: 'custom',
        path: ['retirement'],
        message: 'Archived themes must include retirement metadata'
      })
    }
  })
})

export const collections = { themes }
