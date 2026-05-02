import type { CollectionEntry } from 'astro:content'

export type Theme = CollectionEntry<'themes'>

export function isPublishedTheme(theme: Theme) {
  return theme.data.status === 'published'
}

export function isArchivedTheme(theme: Theme) {
  return theme.data.status === 'archived'
}

export function isVisibleTheme(theme: Theme) {
  return theme.data.status === 'published' || theme.data.status === 'archived'
}

export function byLatestCatalogEntry(a: Theme, b: Theme) {
  return b.data.catalogIndex - a.data.catalogIndex
}

export function formatDate(value: string | null) {
  if (!value) return 'Unknown'

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value))
}

export function repositoryLabel(repository: string) {
  const url = new URL(repository)
  const path = url.pathname.replace(/^\/|\/$/g, '')
  return `${url.hostname.replace(/^www\./, '')}/${path}`
}

export function withBasePath(path: string) {
  if (/^https?:\/\//.test(path)) return path

  const base = import.meta.env.BASE_URL
  if (base === '/') return path

  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export function publicTheme(theme: Theme) {
  const { data } = theme

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    repository: data.repository,
    homepage: data.homepage ?? null,
    screenshots: data.screenshots.map((screenshot) => ({
      ...screenshot,
      src: withBasePath(screenshot.src)
    })),
    tags: data.tags,
    submitterRole: data.submitterRole,
    status: data.status,
    stats: data.stats
  }
}
