const githubToken = process.env.GITHUB_TOKEN
const gitlabToken = process.env.GITLAB_TOKEN
const codebergToken = process.env.CODEBERG_TOKEN

export async function fetchRepositoryStats(repository, currentStats = {}) {
  const repo = parseRepo(repository)

  try {
    if (repo.host === 'github.com') {
      return await readGithub(repo)
    }

    if (repo.host === 'gitlab.com') {
      return await readGitlab(repo)
    }

    if (repo.host === 'codeberg.org') {
      return await readCodeberg(repo)
    }

    return { ...currentStats, accessible: true }
  } catch {
    return {
      stars: currentStats.stars ?? 0,
      updatedAt: currentStats.updatedAt ?? null,
      ownerAvatar: currentStats.ownerAvatar ?? null,
      accessible: false
    }
  }
}

async function requestJson(url, headers = {}) {
  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return response.json()
}

function parseRepo(repository) {
  const url = new URL(repository)
  const [owner, name] = url.pathname.replace(/^\/|\/$/g, '').split('/')

  if (!owner || !name) {
    throw new Error(`Unsupported repository path: ${repository}`)
  }

  return { host: url.hostname.replace(/^www\./, ''), owner, name }
}

async function readGithub({ owner, name }) {
  const headers = githubToken ? { Authorization: `Bearer ${githubToken}` } : {}
  const data = await requestJson(`https://api.github.com/repos/${owner}/${name}`, headers)

  return {
    stars: data.stargazers_count ?? 0,
    updatedAt: data.pushed_at ?? data.updated_at ?? null,
    ownerAvatar: data.owner?.avatar_url ?? null,
    accessible: true
  }
}

async function readGitlab({ owner, name }) {
  const headers = gitlabToken ? { Authorization: `Bearer ${gitlabToken}` } : {}
  const encoded = encodeURIComponent(`${owner}/${name}`)
  const data = await requestJson(`https://gitlab.com/api/v4/projects/${encoded}`, headers)
  const avatar = data.namespace?.avatar_url ?? null

  return {
    stars: data.star_count ?? 0,
    updatedAt: data.last_activity_at ?? null,
    ownerAvatar: avatar?.startsWith('/') ? `https://gitlab.com${avatar}` : avatar,
    accessible: true
  }
}

async function readCodeberg({ owner, name }) {
  const headers = codebergToken ? { Authorization: `token ${codebergToken}` } : {}
  const data = await requestJson(`https://codeberg.org/api/v1/repos/${owner}/${name}`, headers)

  return {
    stars: data.stars_count ?? 0,
    updatedAt: data.updated_at ?? null,
    ownerAvatar: data.owner?.avatar_url ?? null,
    accessible: true
  }
}
