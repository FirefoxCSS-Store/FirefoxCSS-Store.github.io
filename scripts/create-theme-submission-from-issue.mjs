import fs from 'node:fs'
import path from 'node:path'
import { Buffer } from 'node:buffer'
import { fileURLToPath } from 'node:url'
import { fetchRepositoryStats } from './repository-stats.mjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const themesDir = path.join(root, 'src/content/themes')
const imagesDir = path.join(root, 'public/assets/img/themes')
const issueBodyFile = process.env.ISSUE_BODY_FILE
const issueBody = issueBodyFile
  ? fs.readFileSync(path.resolve(root, issueBodyFile), 'utf8')
  : process.env.ISSUE_BODY ?? ''
const issueNumber = process.env.ISSUE_NUMBER
const issueAuthor = process.env.ISSUE_AUTHOR

if (!issueNumber || !/^\d+$/.test(issueNumber)) {
  throw new Error('ISSUE_NUMBER must be set to a numeric GitHub issue number.')
}

if (!issueAuthor) {
  throw new Error('ISSUE_AUTHOR must be set.')
}

const fields = parseIssueForm(issueBody)
const title = requiredField(fields, 'Theme title')
const repository = requiredUrl(requiredField(fields, 'Original repository'), 'Original repository')
const homepage = optionalUrl(optionalField(fields, 'Homepage'), 'Homepage')
const description = requiredField(fields, 'Short description')
const screenshotUrls = extractScreenshotUrls(requiredField(fields, 'Screenshot URLs'))
const tags = normalizeTags(requiredField(fields, 'Tags'))
const submitterRole = normalizeSubmitterRole(requiredField(fields, 'Your relationship to the theme'))
const notes = optionalField(fields, 'Notes for reviewers')
const slug = uniqueSlug(slugify(title))
const submittedBy = issueAuthor.length >= 2 ? issueAuthor : null
const repositoryStats = await fetchRepositoryStats(repository)

if (title.length < 2 || title.length > 80) {
  throw new Error('Theme title must be between 2 and 80 characters.')
}

if (description.length < 12 || description.length > 420) {
  throw new Error('Short description must be between 12 and 420 characters.')
}

fs.mkdirSync(imagesDir, { recursive: true })

const screenshots = []
for (const [index, url] of screenshotUrls.entries()) {
  const image = await downloadImage(url)
  const filename = `${slug}-${index + 1}.${image.extension}`
  const destination = path.join(imagesDir, filename)

  fs.writeFileSync(destination, image.buffer)
  screenshots.push({
    src: `/assets/img/themes/${filename}`,
    alt: `${title} screenshot ${index + 1}`
  })
}

const theme = {
  title,
  slug,
  description,
  repository,
  ...(homepage ? { homepage } : {}),
  screenshots,
  tags,
  submitterRole,
  status: 'candidate',
  catalogIndex: candidateCatalogIndex(),
  ...(submittedBy ? { submittedBy } : {}),
  stats: repositoryStats
}

const themePath = path.join(themesDir, `${slug}.json`)
fs.writeFileSync(themePath, `${JSON.stringify(theme, null, 2)}\n`)
fs.writeFileSync(path.join(root, 'theme-submission-pr.md'), prBody({ theme, notes, issueNumber, issueAuthor, screenshotUrls }))

function parseIssueForm(body) {
  const headings = [...body.matchAll(/^###\s+(.+?)\s*$/gm)]
  const parsed = new Map()

  for (const [index, heading] of headings.entries()) {
    const label = heading[1].trim()
    const start = heading.index + heading[0].length
    const end = headings[index + 1]?.index ?? body.length
    const value = body.slice(start, end).trim()

    parsed.set(label, value === '_No response_' ? '' : value)
  }

  return parsed
}

function requiredField(fields, label) {
  const value = optionalField(fields, label)

  if (!value) {
    throw new Error(`Missing required issue field: ${label}`)
  }

  return value
}

function optionalField(fields, label) {
  return (fields.get(label) ?? '').trim()
}

function requiredUrl(value, label) {
  const url = parseUrl(value, label)

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${label} must be an HTTP or HTTPS URL.`)
  }

  return url.toString()
}

function optionalUrl(value, label) {
  if (!value) return null

  return requiredUrl(value, label)
}

function parseUrl(value, label) {
  try {
    return new URL(value.trim())
  } catch {
    throw new Error(`${label} must be a valid URL.`)
  }
}

function extractScreenshotUrls(value) {
  const urls = new Set()
  const markdownUrl = /!?\[[^\]]*\]\((https?:\/\/[^)\s]+)(?:\s+"[^"]*")?\)/g
  const rawUrl = /https?:\/\/[^\s<>)"'\]]+/g

  for (const match of value.matchAll(markdownUrl)) {
    urls.add(cleanUrl(match[1]))
  }

  for (const match of value.matchAll(rawUrl)) {
    urls.add(cleanUrl(match[0]))
  }

  const screenshotUrls = [...urls].filter(Boolean)

  if (screenshotUrls.length === 0) {
    throw new Error('At least one screenshot URL or attachment is required.')
  }

  if (screenshotUrls.length > 6) {
    throw new Error('Use 6 screenshots or fewer for a single submission.')
  }

  return screenshotUrls
}

function cleanUrl(value) {
  return value
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .replace(/[.,;:]+$/, '')
    .replace(/["'\]]+$/, '')
}

function normalizeTags(value) {
  const tags = [...new Set(value
    .split(/[,\n]/)
    .map((tag) => tag.trim().toLowerCase().replace(/^#/, '').replace(/\s+/g, ' '))
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b))

  if (tags.length === 0) {
    throw new Error('At least one tag is required.')
  }

  if (tags.length > 24) {
    throw new Error('Use 24 tags or fewer.')
  }

  for (const tag of tags) {
    if (!/^[a-z0-9][a-z0-9 .:+/_-]*[a-z0-9]$|^[a-z0-9]$/.test(tag)) {
      throw new Error(`Invalid tag "${tag}". Tags must be lowercase and use letters, numbers, spaces, dots, colons, plus signs, slashes, underscores, or hyphens.`)
    }
  }

  return tags
}

function normalizeSubmitterRole(value) {
  const normalized = value.trim().toLowerCase()
  const roles = new Map([
    ['author', 'author'],
    ['maintainer', 'maintainer'],
    ['user or recommender', 'user'],
    ['user', 'user'],
    ['recommender', 'user']
  ])
  const role = roles.get(normalized)

  if (!role) {
    throw new Error(`Unsupported submitter role: ${value}`)
  }

  return role
}

function slugify(value) {
  const slug = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!slug) {
    throw new Error('Theme title could not be converted into a valid slug.')
  }

  return slug
}

function uniqueSlug(baseSlug) {
  const directPath = path.join(themesDir, `${baseSlug}.json`)

  if (!fs.existsSync(directPath)) {
    return baseSlug
  }

  const issueSlug = `${baseSlug}-${issueNumber}`
  const issuePath = path.join(themesDir, `${issueSlug}.json`)

  if (!fs.existsSync(issuePath)) {
    return issueSlug
  }

  throw new Error(`A theme entry already exists for slug "${baseSlug}" and issue slug "${issueSlug}".`)
}

function candidateCatalogIndex() {
  return 100000 + Number(issueNumber)
}

async function downloadImage(value) {
  const url = parseUrl(value, 'Screenshot URL')

  if (url.protocol !== 'https:') {
    throw new Error(`Screenshot URLs must use HTTPS: ${value}`)
  }

  if (isBlockedHost(url.hostname)) {
    throw new Error(`Screenshot URL uses a blocked host: ${url.hostname}`)
  }

  const response = await fetch(url, {
    headers: {
      'user-agent': 'FirefoxCSS-Store-theme-submission'
    },
    redirect: 'follow'
  })

  if (!response.ok) {
    throw new Error(`Could not download screenshot ${value}: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  const extension = extensionFor(contentType, url.pathname)

  if (!extension) {
    throw new Error(`Screenshot must be a PNG, JPG, WEBP, or GIF image: ${value}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const maxBytes = 8 * 1024 * 1024

  if (buffer.length > maxBytes) {
    throw new Error(`Screenshot is larger than 8 MB: ${value}`)
  }

  return { buffer, extension }
}

function isBlockedHost(hostname) {
  const host = hostname.toLowerCase()

  return host === 'localhost'
    || host === '0.0.0.0'
    || host === '::1'
    || /^127\./.test(host)
    || /^10\./.test(host)
    || /^192\.168\./.test(host)
    || /^169\.254\./.test(host)
    || /^172\.(1[6-9]|2\d|3[01])\./.test(host)
}

function extensionFor(contentType, pathname) {
  const byType = new Map([
    ['image/gif', 'gif'],
    ['image/jpeg', 'jpg'],
    ['image/png', 'png'],
    ['image/webp', 'webp']
  ])

  if (byType.has(contentType)) {
    return byType.get(contentType)
  }

  const extension = pathname.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1]

  if (['gif', 'jpeg', 'jpg', 'png', 'webp'].includes(extension)) {
    return extension === 'jpeg' ? 'jpg' : extension
  }

  return null
}

function prBody({ theme, notes, issueNumber, issueAuthor, screenshotUrls }) {
  return `## Candidate theme submission

Generated from #${issueNumber}.

Closes #${issueNumber}.

- Title: ${theme.title}
- Slug: \`${theme.slug}\`
- Repository: ${theme.repository}
- Submitted by: @${issueAuthor}
- Submitter role: ${theme.submitterRole}
- Status: \`${theme.status}\`
- Tags: ${theme.tags.map((tag) => `\`${tag}\``).join(', ')}
- Screenshots: ${screenshotUrls.length}

Reviewer checklist:

- Confirm the repository is the original project or an appropriate maintained fork.
- Confirm screenshots are safe to redistribute in this catalog.
- Edit title, description, tags, and screenshot alt text if needed.
- Keep \`status: "candidate"\` until the theme is ready to appear publicly.

${notes ? `Notes from submitter:\n\n${notes}\n` : ''}
`
}
