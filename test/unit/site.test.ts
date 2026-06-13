import { describe, expect, it } from 'vitest'

import { isConfiguredUrl, primaryNav, siteConfig } from '../../app/utils/site'

describe('site config', () => {
  it('keeps the public CoziCraft server details in one shared place', () => {
    expect(siteConfig.name).toBe('CoziCraft')
    expect(siteConfig.serverAddress).toBe('play.cozicraftmc.com')
    expect(siteConfig.minecraftVersion).toBe('Java 1.21.11')
  })

  it('defines the primary public sections for the v1 portal', () => {
    expect(primaryNav.map(link => link.label)).toEqual([
      'Play',
      'Wiki',
      'News',
      'FAQ',
      'Store',
    ])
  })

  it('only treats safe public destinations as configured urls', () => {
    expect(isConfiguredUrl('https://store.example.com')).toBe(true)
    expect(isConfiguredUrl('mailto:hello@cozicraftmc.com')).toBe(true)
    expect(isConfiguredUrl('')).toBe(false)
    expect(isConfiguredUrl('http://not-secure.example.com')).toBe(false)
    expect(isConfiguredUrl('javascript:alert(1)')).toBe(false)
  })
})
