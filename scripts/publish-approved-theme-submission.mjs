import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { fetchRepositoryStats } from './repository-stats.mjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const themesDir = path.join(root, 'src/content/themes')

const changedThemeFiles = new Set(execFileSync('git', [
  'diff',
  '--name-only',
  'origin/main...HEAD',
  '--',
  'src/content/themes'
], {
  cwd: root,
  encoding: 'utf8'
})
  .split('\n')
  .map((file) => file.trim())
  .filter((file) => file.endsWith('.json')))

for (const file of execFileSync('git', [
  'status',
  '--porcelain',
  '--',
  'src/content/themes'
], {
  cwd: root,
  encoding: 'utf8'
}).split('\n')) {
  const changedFile = file.slice(3).trim()

  if (changedFile.endsWith('.json')) {
    changedThemeFiles.add(changedFile)
  }
}

const candidateFiles = [...changedThemeFiles].filter((file) => {
  const theme = readTheme(path.join(root, file))
  return theme.status === 'candidate'
})

if (candidateFiles.length === 0) {
  console.log('No candidate theme entry found in this submission PR.')
  process.exit(0)
}

if (candidateFiles.length > 1) {
  throw new Error(`Expected one candidate theme entry, found ${candidateFiles.length}: ${candidateFiles.join(', ')}`)
}

const candidatePath = path.join(root, candidateFiles[0])
const candidate = readTheme(candidatePath)
candidate.status = 'published'
candidate.catalogIndex = nextCatalogIndex(candidatePath)
candidate.stats = await fetchRepositoryStats(candidate.repository, candidate.stats)

fs.writeFileSync(candidatePath, `${JSON.stringify(candidate, null, 2)}\n`)
console.log(`Published ${candidate.slug} with catalogIndex ${candidate.catalogIndex}.`)

function nextCatalogIndex(candidatePath) {
  const indexes = fs.readdirSync(themesDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(themesDir, file))
    .filter((filePath) => filePath !== candidatePath)
    .map((filePath) => readTheme(filePath).catalogIndex)
    .filter((index) => Number.isInteger(index) && index < 100000)

  return Math.max(-1, ...indexes) + 1
}

function readTheme(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}
