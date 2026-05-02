import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const themesDir = path.join(root, 'src/content/themes')
const reportPath = path.join(root, process.env.RETIREMENT_REPORT || 'theme-repository-audit.md')
const githubToken = process.env.GITHUB_TOKEN
const gitlabToken = process.env.GITLAB_TOKEN
const codebergToken = process.env.CODEBERG_TOKEN
const genericGiteaToken = process.env.GITEA_TOKEN

function authHeaders(token, scheme = 'Bearer') {
  return token ? { Authorization: `${scheme} ${token}` } : {}
}

async function requestRepository(url, headers = {}) {
  const response = await fetch(url, { headers })

  if (response.status === 404 || response.status === 410) {
    return { exists: false, status: response.status }
  }

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return { exists: true, data: await response.json() }
}

function parseRepo(repository) {
  const url = new URL(repository)
  const [owner, name] = url.pathname.replace(/^\/|\/$/g, '').split('/')

  if (!owner || !name) {
    throw new Error(`Unsupported repository path: ${repository}`)
  }

  return { host: url.hostname.replace(/^www\./, ''), owner, name }
}

function normalizeAvatar(host, avatar) {
  if (!avatar) return null
  if (avatar.startsWith('http://') || avatar.startsWith('https://')) return avatar
  if (avatar.startsWith('/')) return `https://${host}${avatar}`
  return null
}

async function readGithub(repo) {
  const result = await requestRepository(
    `https://api.github.com/repos/${repo.owner}/${repo.name}`,
    authHeaders(githubToken)
  )

  if (!result.exists) return result

  return {
    exists: true,
    archived: Boolean(result.data.archived),
    stats: {
      stars: result.data.stargazers_count ?? 0,
      updatedAt: result.data.pushed_at ?? result.data.updated_at ?? null,
      ownerAvatar: result.data.owner?.avatar_url ?? null,
      accessible: true
    }
  }
}

async function readGitlab(repo) {
  const encoded = encodeURIComponent(`${repo.owner}/${repo.name}`)
  const result = await requestRepository(
    `https://gitlab.com/api/v4/projects/${encoded}`,
    authHeaders(gitlabToken)
  )

  if (!result.exists) return result

  return {
    exists: true,
    archived: Boolean(result.data.archived),
    stats: {
      stars: result.data.star_count ?? 0,
      updatedAt: result.data.last_activity_at ?? null,
      ownerAvatar: normalizeAvatar('gitlab.com', result.data.namespace?.avatar_url ?? null),
      accessible: true
    }
  }
}

async function readGitea(repo) {
  const token = repo.host === 'codeberg.org' ? codebergToken : genericGiteaToken
  const result = await requestRepository(
    `https://${repo.host}/api/v1/repos/${repo.owner}/${repo.name}`,
    authHeaders(token, 'token')
  )

  if (!result.exists) return result

  return {
    exists: true,
    archived: Boolean(result.data.archived),
    stats: {
      stars: result.data.stars_count ?? result.data.stargazers_count ?? 0,
      updatedAt: result.data.updated_at ?? null,
      ownerAvatar: normalizeAvatar(repo.host, result.data.owner?.avatar_url ?? null),
      accessible: true
    }
  }
}

async function inspectRepository(repository) {
  const repo = parseRepo(repository)

  if (repo.host === 'github.com') return readGithub(repo)
  if (repo.host === 'gitlab.com') return readGitlab(repo)
  return readGitea(repo)
}

function retirementFor(result) {
  if (!result.exists) {
    return {
      reason: 'repository-unavailable',
      details: `Repository returned ${result.status}; it may have been deleted, moved, or made private.`
    }
  }

  if (result.archived) {
    return {
      reason: 'repository-archived',
      details: 'Repository is archived by its owner.'
    }
  }

  return null
}

function renderReport(archiveMoves, removals, skipped, checkedAt) {
  const lines = [
    '# Monthly Theme Repository Audit',
    '',
    `Checked at: ${checkedAt}`,
    '',
    'This PR was generated automatically for maintainer review.',
    '',
    '- Published repositories that still exist but are archived are moved to the public archive as unsupported themes.',
    '- Published or archived repositories that no longer exist or are inaccessible are removed from the catalog.',
    ''
  ]

  if (archiveMoves.length === 0 && removals.length === 0) {
    lines.push('No published or archived themes need archive or removal changes.')
  } else {
    if (archiveMoves.length > 0) {
      lines.push('## Proposed Archive Moves', '')
      for (const item of archiveMoves) {
        lines.push(`- **${item.title}** (${item.slug})`)
        lines.push(`  - Repository: ${item.repository}`)
        lines.push(`  - Details: ${item.details}`)
      }
    }

    if (removals.length > 0) {
      lines.push('', '## Proposed Removals', '')
      for (const item of removals) {
        lines.push(`- **${item.title}** (${item.slug})`)
        lines.push(`  - Repository: ${item.repository}`)
        lines.push(`  - Current status: ${item.status}`)
        lines.push(`  - Details: ${item.details}`)
      }
    }
  }

  if (skipped.length > 0) {
    lines.push('', '## Skipped For Manual Follow-Up', '')
    for (const item of skipped) {
      lines.push(`- **${item.title}** (${item.slug})`)
      lines.push(`  - Repository: ${item.repository}`)
      lines.push(`  - Error: ${item.error}`)
    }
  }

  lines.push('', 'Merging this PR will update the published hub and archive according to the reviewed changes.')

  return `${lines.join('\n')}\n`
}

const checkedAt = new Date().toISOString()
const files = (await fs.readdir(themesDir)).filter((file) => file.endsWith('.json')).sort()
const archiveMoves = []
const removals = []
const skipped = []
const auditableStatuses = new Set(['published', 'archived'])

for (const file of files) {
  const filePath = path.join(themesDir, file)
  const theme = JSON.parse(await fs.readFile(filePath, 'utf8'))

  if (!auditableStatuses.has(theme.status)) continue

  try {
    const result = await inspectRepository(theme.repository)
    const retirement = retirementFor(result)

    if (!retirement) {
      console.log(`OK ${theme.slug}`)
      continue
    }

    if (retirement.reason === 'repository-unavailable') {
      await fs.unlink(filePath)
      removals.push({
        title: theme.title,
        slug: theme.slug,
        repository: theme.repository,
        status: theme.status,
        details: retirement.details
      })
      console.log(`REMOVE ${theme.slug}: ${retirement.reason}`)
      continue
    }

    if (theme.status === 'archived') {
      console.log(`OK ${theme.slug}: already archived`)
      continue
    }

    theme.status = 'archived'
    theme.stats = { ...theme.stats, ...result.stats, accessible: true }
    theme.retirement = {
      reason: 'repository-archived',
      checkedAt,
      details: retirement.details
    }

    archiveMoves.push({
      title: theme.title,
      slug: theme.slug,
      repository: theme.repository,
      ...theme.retirement
    })

    await fs.writeFile(filePath, `${JSON.stringify(theme, null, 2)}\n`)
    console.log(`ARCHIVE ${theme.slug}: ${retirement.reason}`)
  } catch (error) {
    skipped.push({
      title: theme.title,
      slug: theme.slug,
      repository: theme.repository,
      error: error.message
    })

    console.warn(`SKIP ${theme.slug}: ${error.message}`)
  }
}

await fs.writeFile(reportPath, renderReport(archiveMoves, removals, skipped, checkedAt))

console.log(`Proposed ${archiveMoves.length} archive move(s).`)
console.log(`Proposed ${removals.length} removal(s).`)
console.log(`Skipped ${skipped.length} theme(s).`)
console.log(`Report written to ${path.relative(root, reportPath)}.`)
