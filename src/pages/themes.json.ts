import { getCollection } from 'astro:content'
import { byLatestCatalogEntry, isPublishedTheme, publicTheme } from '../lib/themes'

export async function GET() {
  const themes = (await getCollection('themes'))
    .filter(isPublishedTheme)
    .sort(byLatestCatalogEntry)
    .map(publicTheme)

  return new Response(JSON.stringify(themes, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300'
    }
  })
}
