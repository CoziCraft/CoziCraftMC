import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const contentRoot = join(process.cwd(), 'content')

const requiredContentFiles = [
  'pages/play.md',
  'pages/rules.md',
  'pages/store.md',
  'pages/contact.md',
  'wiki/getting-started.md',
  'wiki/rules.md',
  'wiki/commands.md',
  'wiki/claims.md',
  'wiki/economy.md',
  'wiki/ranks.md',
  'wiki/events.md',
  'wiki/troubleshooting.md',
  'faq/index.md',
  'news/2026-06-12-welcome-to-cozicraft.md',
]

function collectMarkdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectMarkdownFiles(path)
    }

    return entry.isFile() && entry.name.endsWith('.md') ? [path] : []
  })
}

describe('content structure', () => {
  it.each(requiredContentFiles)('includes %s', (file) => {
    expect(existsSync(join(contentRoot, file))).toBe(true)
  })

  it('removes starter Nuxt Content pages', () => {
    expect(existsSync(join(contentRoot, 'index.md'))).toBe(false)
    expect(existsSync(join(contentRoot, 'about.md'))).toBe(false)
  })

  it('uses the corrected CoziCraft spelling in public content', () => {
    const misspellings = collectMarkdownFiles(contentRoot).filter((file) => {
      return readFileSync(file, 'utf8').includes('CozyCraft')
    })

    expect(misspellings).toEqual([])
  })
})
