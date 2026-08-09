export type SiteLink = {
  label: string
  to: string
  description?: string
  external?: boolean
}

export type WikiCategory = {
  title: string
  path: string
  description: string
  icon: string
}

export const siteConfig = {
  name: 'CoziCraft',
  serverAddress: 'play.cozicraftmc.com',
  minecraftVersion: 'Java 26.2',
  tagline: 'Build under the cherry trees, keep too many pets, and make a corner of CoziCraft feel like yours.',
  description: 'Find the CoziCraft server address, joining guide, wiki, rules, FAQs, news, and store links.',
  fallbackContactUrl: 'mailto:hello@cozicraftmc.com',
  disclaimer: 'NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.',
} as const

export const primaryNav: SiteLink[] = [
  { label: 'Play', to: '/play', description: 'Join the Java server' },
  { label: 'Wiki', to: '/wiki', description: 'Guides and server knowledge' },
  { label: 'News', to: '/news', description: 'Latest updates' },
  { label: 'Discord', to: '/#discord', description: 'Community chat and event notices' },
  { label: 'Store', to: '/store', description: 'Support and purchases' },
]

export const footerNav: SiteLink[] = [
  { label: 'Wiki', to: '/wiki' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Rules', to: '/rules' },
  { label: 'Contact', to: '/contact' },
]

export const wikiCategories: WikiCategory[] = [
  {
    title: 'Getting Started',
    path: '/wiki/getting-started',
    description: 'First steps, where to go, and how to settle in.',
    icon: 'lucide:sprout',
  },
  {
    title: 'Rules',
    path: '/wiki/rules',
    description: 'Community expectations and fair play standards.',
    icon: 'lucide:scroll-text',
  },
  {
    title: 'Commands',
    path: '/wiki/commands',
    description: 'Useful commands for everyday server life.',
    icon: 'lucide:terminal',
  },
  {
    title: 'Claims',
    path: '/wiki/claims',
    description: 'Use Towny to protect builds, manage plots, and share land.',
    icon: 'lucide:shield-check',
  },
  {
    title: 'Economy',
    path: '/wiki/economy',
    description: 'Shops, money, trading, and player markets.',
    icon: 'lucide:coins',
  },
  {
    title: 'Ranks',
    path: '/wiki/ranks',
    description: 'Rank information and how progression is handled.',
    icon: 'lucide:badge',
  },
  {
    title: 'Events',
    path: '/wiki/events',
    description: 'Community events and recurring activities.',
    icon: 'lucide:calendar-days',
  },
  {
    title: 'Troubleshooting',
    path: '/wiki/troubleshooting',
    description: 'Connection help and common fixes.',
    icon: 'lucide:wrench',
  },
]

export function isConfiguredUrl(value: string): boolean {
  return value.startsWith('https://') || value.startsWith('mailto:')
}

export function cleanOptionalUrl(value?: string | null): string {
  const trimmed = value?.trim() ?? ''

  return isConfiguredUrl(trimmed) ? trimmed : ''
}
