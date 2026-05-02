import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchRepositoryStats } from './repository-stats.mjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const themesDir = path.join(root, 'src/content/themes')

async function refreshTheme(file) {
  const filePath = path.join(themesDir, file)
  const theme = JSON.parse(await fs.readFile(filePath, 'utf8'))
  theme.stats = { ...theme.stats, ...await fetchRepositoryStats(theme.repository, theme.stats) }
  await fs.writeFile(filePath, `${JSON.stringify(theme, null, 2)}\n`)
  console.log(`Refreshed ${theme.slug}`)
}

const files = (await fs.readdir(themesDir)).filter((file) => file.endsWith('.json')).sort()

for (const file of files) {
  try {
    await refreshTheme(file)
  } catch (error) {
    const filePath = path.join(themesDir, file)
    const theme = JSON.parse(await fs.readFile(filePath, 'utf8'))
    theme.stats = { ...theme.stats, accessible: false }
    await fs.writeFile(filePath, `${JSON.stringify(theme, null, 2)}\n`)
    console.warn(`Could not refresh ${file}: ${error.message}`)
  }
}
