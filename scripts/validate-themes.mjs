import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const themesDir = path.join(root, 'src/content/themes')
const publicDir = path.join(root, 'public')

const tagSchema = z
  .string()
  .min(1)
  .max(48)
  .regex(/^[a-z0-9][a-z0-9 .:+/_-]*[a-z0-9]$|^[a-z0-9]$/)

const themeSchema = z.object({
  title: z.string().min(2).max(80),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(12).max(420),
  repository: z.url(),
  homepage: z.url().optional(),
  screenshots: z.array(z.object({
    src: z.string().startsWith('/assets/img/themes/').refine((value) => !value.includes('//'), 'Path must not contain duplicate slashes'),
    alt: z.string().min(2).max(120)
  })).min(1),
  tags: z.array(tagSchema).min(1).max(24),
  submitterRole: z.enum(['author', 'user', 'maintainer', 'legacy']),
  status: z.enum(['published', 'candidate', 'archived']).default('candidate'),
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

const files = fs.readdirSync(themesDir).filter((file) => file.endsWith('.json')).sort()
const slugs = new Set()
const catalogIndexes = new Set()
const errors = []

for (const file of files) {
  const filePath = path.join(themesDir, file)
  let data

  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    errors.push(`${file}: invalid JSON: ${error.message}`)
    continue
  }

  const parsed = themeSchema.safeParse(data)
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors.push(`${file}: ${issue.path.join('.') || 'entry'}: ${issue.message}`)
    }
    continue
  }

  const theme = parsed.data
  const expectedFile = `${theme.slug}.json`

  if (file !== expectedFile) {
    errors.push(`${file}: filename must be ${expectedFile}`)
  }

  if (slugs.has(theme.slug)) {
    errors.push(`${file}: duplicate slug ${theme.slug}`)
  }
  slugs.add(theme.slug)

  if (catalogIndexes.has(theme.catalogIndex)) {
    errors.push(`${file}: duplicate catalogIndex ${theme.catalogIndex}`)
  }
  catalogIndexes.add(theme.catalogIndex)

  const sortedTags = [...theme.tags].sort((a, b) => a.localeCompare(b))
  if (theme.tags.join('\n') !== sortedTags.join('\n')) {
    errors.push(`${file}: tags must be normalized and sorted alphabetically`)
  }

  if (new Set(theme.tags).size !== theme.tags.length) {
    errors.push(`${file}: tags must be unique`)
  }

  for (const screenshot of theme.screenshots) {
    const imagePath = path.join(publicDir, screenshot.src)
    if (!fs.existsSync(imagePath)) {
      errors.push(`${file}: missing screenshot ${screenshot.src}`)
    }
  }

  if (theme.status === 'candidate' && theme.catalogIndex < 100000) {
    errors.push(`${file}: candidate themes must use catalogIndex 100000 or greater`)
  }
}

if (errors.length > 0) {
  throw new Error(errors.join('\n'))
}

console.log(`Validated ${files.length} theme entries.`)
