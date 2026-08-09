# CoziCraft Static Content Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the v1 static CoziCraft Minecraft server portal with GitHub-edited content, generated navigation, all-content search, Tailwind-first styling, public repo guardrails, and minimal CI.

**Architecture:** Keep the app static-first: Nuxt 4 can generate the site for static hosts, Nuxt Content owns markdown collections, and Vue components provide the shell, navigation, search, and small interactions. Tailwind CSS should carry nearly all layout, spacing, color, typography, and responsive styling. Railway is allowed as a simple deployment target using Nuxt's Node start script, but that must not be used to justify auth, databases, server endpoints, live status calls, or Tebex API work in v1.

**Tech Stack:** Nuxt 4, Vue 3, Nuxt Content 3, Tailwind CSS 4 via `@tailwindcss/vite`, Motion Vue via `motion-v`, Nuxt Icon, Nuxt Image, Nuxt A11y, ESLint, GitHub Actions.

---

## Source Spec

Implement from `docs/superpowers/specs/2026-06-12-cozicraft-static-content-portal-design.md`.

## Scope Check

This plan is one coherent foundation slice. It includes Tailwind setup, site config, content collections, starter content, the public UI shell, search/navigation, handoff docs, CI, Railway-compatible start script, and verification. Future work for real screenshots, live server status, Tebex API, Nuxt Studio, license selection, and expanded tests stays outside this plan.

## Styling Rule

Use Tailwind utilities for as much as possible. Keep `app/assets/css/main.css` limited to:

- `@import "tailwindcss";`
- Tailwind v4 theme tokens.
- Small base element defaults.
- A tiny reusable `.container-cozi` utility.

Avoid scoped CSS in Vue components unless the styling is a custom illustration or cannot be expressed clearly with Tailwind utilities. Prefer Tailwind arbitrary values before adding component CSS.

## File Structure

- `app/utils/site.ts`: Public site constants, nav links, wiki categories, and helpers for optional URLs.
- `content.config.ts`: Nuxt Content collections and schema definitions.
- `content/pages/*.md`: Public standalone content pages.
- `content/wiki/*.md`: Wiki landing page and wiki category pages.
- `content/faq/index.md`: FAQ page.
- `content/news/*.md`: News posts.
- `app/assets/css/main.css`: Tailwind import, theme tokens, base defaults, and a container utility.
- `app/app.vue`: Nuxt app root with route announcer and layout wrapper.
- `app/layouts/default.vue`: Shared header, main landmark, and footer.
- `app/components/SiteHeader.vue`: Responsive site navigation.
- `app/components/SiteFooter.vue`: Footer links and Minecraft disclaimer.
- `app/components/CopyServerAddress.vue`: Clipboard-first server address control with visible fallback.
- `app/components/ServerScene.vue`: Tailwind-built visual slot for future server screenshots.
- `app/components/ContentSearch.vue`: Client-side Nuxt Content search across public collections.
- `app/pages/index.vue`: Custom homepage.
- `app/pages/[...slug].vue`: Shared markdown page renderer for page/wiki/faq/news entries.
- `app/pages/wiki/index.vue`: Wiki index with category links.
- `app/pages/news/index.vue`: News listing.
- `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `.env.example`, `.github/**`: Handoff, repo hygiene, and CI.

---

### Task 1: Tailwind Setup, Project Scripts, And Public Config

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `nuxt.config.ts`
- Modify: `.gitignore`
- Create: `.env.example`
- Create: `app/assets/css/main.css`
- Create: `app/utils/site.ts`

- [ ] **Step 1: Install Tailwind v4 for Nuxt/Vite**

Run:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Expected: `package.json` and `package-lock.json` add `tailwindcss` and `@tailwindcss/vite` under dev dependencies.

- [ ] **Step 2: Add quality scripts**

Run:

```bash
npm pkg set scripts.lint="eslint ."
npm pkg set scripts.prepare="nuxt prepare"
npm pkg set scripts.start="node .output/server/index.mjs"
npm pkg set scripts.typecheck="nuxt typecheck"
```

Expected: `package.json` includes `lint`, `prepare`, `start`, and `typecheck`.

- [ ] **Step 3: Configure Nuxt for Tailwind and static metadata**

Replace `nuxt.config.ts` with:

```ts
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/sitemap',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@nuxt/a11y',
    'motion-v/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: title => title ? `${title} - CoziCraft` : 'CoziCraft',
      meta: [
        {
          name: 'description',
          content: 'CoziCraft is a Minecraft Java community server with guides, updates, rules, and wiki resources.',
        },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
  compatibilityDate: '2024-04-03',
})
```

- [ ] **Step 4: Add Tailwind theme and base CSS**

Create `app/assets/css/main.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --color-cozi-ink: #263024;
  --color-cozi-muted: #5d694f;
  --color-cozi-soft: #f8f3e7;
  --color-cozi-paper: #fffdf7;
  --color-cozi-leaf: #537f43;
  --color-cozi-leaf-dark: #263f26;
  --color-cozi-gold: #c69738;
  --color-cozi-blue: #718bb6;
  --color-cozi-line: #d8cba7;
  --shadow-cozi: 0 18px 46px rgba(46, 60, 40, 0.14);
}

@utility container-cozi {
  width: min(100% - 2rem, 1180px);
  margin-inline: auto;
}

@layer base {
  html {
    @apply min-w-80 scroll-smooth bg-cozi-soft text-cozi-ink;
  }

  body {
    @apply m-0 font-sans text-base leading-7;
    background:
      linear-gradient(180deg, rgba(248, 243, 231, 0.92), rgba(255, 253, 247, 0.98)),
      radial-gradient(circle at 10% 10%, rgba(83, 127, 67, 0.16), transparent 32%),
      radial-gradient(circle at 80% 0%, rgba(198, 151, 56, 0.14), transparent 26%);
  }

  a {
    @apply underline-offset-4 decoration-cozi-leaf/40 hover:decoration-current;
  }

  button,
  input {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
    }
  }
}
```

- [ ] **Step 5: Ignore local planning files**

Append this block to `.gitignore` if it is not present:

```gitignore
# Local planning and mockup scratch space
.superpowers/
```

- [ ] **Step 6: Add public environment example**

Create `.env.example`:

```dotenv
# CoziCraft public site configuration
# Keep secrets out of this static site. Empty optional URLs hide external CTAs.
NUXT_PUBLIC_SITE_URL=https://cozicraftmc.com
NUXT_PUBLIC_DISCORD_URL=
NUXT_PUBLIC_TEBEX_STORE_URL=
NUXT_PUBLIC_CONTACT_URL=mailto:hello@cozicraftmc.com
```

- [ ] **Step 7: Add shared site config**

Create `app/utils/site.ts`:

```ts
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
  tagline: 'A bright Minecraft Java survival community with polished guides and a cozy pace.',
  description: 'Find the CoziCraft server address, joining guide, wiki, rules, FAQs, news, and store links.',
  contactUrl: import.meta.env.NUXT_PUBLIC_CONTACT_URL || 'mailto:hello@cozicraftmc.com',
  discordUrl: import.meta.env.NUXT_PUBLIC_DISCORD_URL || '',
  storeUrl: import.meta.env.NUXT_PUBLIC_TEBEX_STORE_URL || '',
  disclaimer: 'NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.',
} as const

export const primaryNav: SiteLink[] = [
  { label: 'Play', to: '/play', description: 'Join the Java server' },
  { label: 'Wiki', to: '/wiki', description: 'Guides and server knowledge' },
  { label: 'News', to: '/news', description: 'Latest updates' },
  { label: 'FAQ', to: '/faq', description: 'Common questions' },
  { label: 'Store', to: '/store', description: 'Support and purchases' },
]

export const footerNav: SiteLink[] = [
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
    description: 'Protect builds and understand land ownership.',
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
```

- [ ] **Step 8: Verify config compiles**

Run:

```bash
npm run prepare
npm run lint
npm run typecheck
```

Expected: all commands exit 0. If `nuxt typecheck` reports a missing typecheck dependency, install the package Nuxt requests and commit the updated lockfile in this task.

- [ ] **Step 9: Commit task 1**

```bash
git add package.json package-lock.json nuxt.config.ts .gitignore .env.example app/assets/css/main.css app/utils/site.ts
git commit -m "chore: add CoziCraft Tailwind config"
```

---

### Task 2: Content Collections And Seed Content

**Files:**
- Modify: `content.config.ts`
- Delete: `content/index.md`
- Delete: `content/about.md`
- Create: `content/pages/play.md`
- Create: `content/pages/rules.md`
- Create: `content/pages/store.md`
- Create: `content/pages/contact.md`
- Create: `content/wiki/getting-started.md`
- Create: `content/wiki/rules.md`
- Create: `content/wiki/commands.md`
- Create: `content/wiki/claims.md`
- Create: `content/wiki/economy.md`
- Create: `content/wiki/ranks.md`
- Create: `content/wiki/events.md`
- Create: `content/wiki/troubleshooting.md`
- Create: `content/faq/index.md`
- Create: `content/news/2026-06-12-welcome-to-cozicraft.md`

- [ ] **Step 1: Define Nuxt Content collections**

Replace `content.config.ts` with:

```ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const basePageSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().optional(),
  section: z.string().optional(),
  tags: z.array(z.string()).default([]),
  navigation: z.boolean().default(true),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.md',
        prefix: '',
      },
      schema: basePageSchema,
    }),
    wiki: defineCollection({
      type: 'page',
      source: 'wiki/**/*.md',
      schema: basePageSchema.extend({
        category: z.string(),
      }),
    }),
    faq: defineCollection({
      type: 'page',
      source: 'faq/**/*.md',
      schema: basePageSchema,
    }),
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
      schema: basePageSchema.extend({
        date: z.string(),
      }),
    }),
  },
})
```

- [ ] **Step 2: Remove starter markdown**

Run:

```bash
git rm -f content/index.md content/about.md
```

Expected: both starter files are staged for deletion.

- [ ] **Step 3: Create public page content**

Create `content/pages/play.md`:

```md
---
title: Play CoziCraft
description: Join CoziCraft on Minecraft Java 26.2.
section: Play
order: 1
tags:
  - join
  - server
  - java
---

# Play CoziCraft

Connect from Minecraft Java Edition with `play.cozicraftmc.com`.

CoziCraft currently supports Java `26.2`. Add the server to your multiplayer list, join when you are ready, and check the wiki if you want a calm first path through the server.

## First Steps

1. Open Minecraft Java Edition.
2. Choose Multiplayer.
3. Add `play.cozicraftmc.com` as the server address.
4. Join and read the rules before building or trading.

## Helpful Links

- Read the [Getting Started guide](/wiki/getting-started).
- Review the [Rules](/rules).
- Check [Troubleshooting](/wiki/troubleshooting) if you cannot connect.
```

Create `content/pages/rules.md`:

```md
---
title: Rules
description: The public rules page for CoziCraft players.
section: Rules
order: 2
tags:
  - rules
  - community
---

# Rules

CoziCraft should feel safe, fair, and welcoming. These rules are the public baseline for players and contributors.

## Community Basics

- Be kind to other players.
- Do not grief, steal, scam, or harass.
- Keep chat appropriate for a broad Minecraft community.
- Respect staff decisions and ask for help calmly.
- Do not use hacked clients, exploits, or automation that creates unfair play.

## Build And Land Respect

- Do not modify another player's build without permission.
- Leave space around claimed or clearly active builds.
- Ask before starting large projects near towns, public paths, or shared landmarks.

## More Detail

The wiki can expand these rules as the server grows. Start with the [Rules wiki page](/wiki/rules) for editor notes and future detail.
```

Create `content/pages/store.md`:

```md
---
title: Store
description: CoziCraft store information and future Tebex link.
section: Store
order: 3
tags:
  - store
  - tebex
---

# Store

The CoziCraft store is planned as an external Tebex-powered store link. Purchases are not handled by this static website.

When the store opens, this page should link to the official CoziCraft Tebex store and explain what players can buy in plain language. Store content must be reviewed against Minecraft's usage and monetization guidelines before publishing.

## Current Status

The store link is not configured yet. Check news updates or Discord/contact links for launch information.
```

Create `content/pages/contact.md`:

```md
---
title: Contact And Links
description: Official CoziCraft community links and contact paths.
section: Links
order: 4
tags:
  - contact
  - links
  - discord
---

# Contact And Links

This page collects official CoziCraft links.

## Links

- Server address: `play.cozicraftmc.com`
- Version: Java `26.2`
- Store: see the [Store page](/store)
- Wiki: start at the [Wiki home](/wiki)

## Contact

Use the configured contact link in the site footer for site questions, content corrections, and security reports. Do not post private security details in public issues.
```

- [ ] **Step 4: Create wiki content**

Create `content/wiki/getting-started.md`:

```md
---
title: Getting Started
description: First steps for new CoziCraft players.
category: Getting Started
section: Wiki
order: 1
tags:
  - new players
  - guide
---

# Getting Started

Welcome to CoziCraft. This page gives new players the first path through the server.

## Join

Use Minecraft Java Edition `26.2` and connect to `play.cozicraftmc.com`.

## Before You Build

- Read the [Rules](/rules).
- Find a spot that does not crowd another active build.
- Ask staff or experienced players before starting large shared projects.

## First Goals

- Build a small starter base.
- Learn how claims work.
- Read the commands page for common server commands.
- Watch the news page for events and updates.
```

Create `content/wiki/rules.md`:

```md
---
title: Rules
description: Wiki notes for CoziCraft rules and moderation expectations.
category: Rules
section: Wiki
order: 2
tags:
  - rules
  - moderation
---

# Rules

This wiki page expands the public [Rules page](/rules) with context for editors and future staff notes.

## Editing Guidance

Keep rules direct, enforceable, and easy for players to understand. Avoid vague threats. When a rule depends on a plugin or staff process, name the process clearly.

## Current Baseline

- Be kind.
- Do not grief or steal.
- Do not cheat.
- Keep chat appropriate.
- Respect builds, claims, towns, and shared spaces.
```

Create `content/wiki/commands.md`:

```md
---
title: Commands
description: Common command reference for CoziCraft players.
category: Commands
section: Wiki
order: 3
tags:
  - commands
  - help
---

# Commands

This page is the command reference for everyday server play.

## Editing Guidance

Only publish commands that are confirmed on the live server. Include the command, what it does, who can use it, and any cooldowns or costs.

## Starter Format

| Command | Use | Notes |
| --- | --- | --- |
| `/help` | Shows available help. | Confirm exact behavior in game. |
```

Create `content/wiki/claims.md`:

```md
---
title: Claims
description: Land claim and build protection guidance.
category: Claims
section: Wiki
order: 4
tags:
  - claims
  - builds
  - protection
---

# Claims

This page explains how players protect builds and respect claimed land.

## Editing Guidance

Confirm the active claims plugin before adding commands or screenshots. Include examples for creating, expanding, trusting, and leaving a claim.

## Player Expectations

- Do not build inside another player's claimed or clearly active space.
- Ask before connecting paths, roads, farms, or shops to another build.
- Report claim issues through the server's official contact path.
```

Create `content/wiki/economy.md`:

```md
---
title: Economy
description: Shops, trading, and economy notes for CoziCraft.
category: Economy
section: Wiki
order: 5
tags:
  - economy
  - shops
  - trading
---

# Economy

This page will document CoziCraft shops, trading, currency, and player markets.

## Editing Guidance

Do not describe prices, currencies, or shop systems until they are confirmed. If Tebex or coins are added later, keep purchase information separate from gameplay guidance and review monetization rules first.

## Fair Trading

- Do not scam players.
- Make shop signs and trade terms clear.
- Respect staff decisions on market abuse.
```

Create `content/wiki/ranks.md`:

```md
---
title: Ranks
description: Rank and progression information for CoziCraft.
category: Ranks
section: Wiki
order: 6
tags:
  - ranks
  - progression
---

# Ranks

This page will explain CoziCraft ranks and progression.

## Editing Guidance

Only list ranks that exist on the live server. For each rank, include how it is earned, what it changes, and whether it affects gameplay. Paid perks must be reviewed for Minecraft guideline compliance before publication.
```

Create `content/wiki/events.md`:

```md
---
title: Events
description: CoziCraft event information and schedule notes.
category: Events
section: Wiki
order: 7
tags:
  - events
  - community
---

# Events

This page will collect CoziCraft event information.

## Editing Guidance

Use this page for recurring event formats, not one-off announcements. Put dated announcements on the News page and link back here when an event format needs rules or instructions.

## Common Event Details

- Date and time.
- Where to meet.
- Who can join.
- Rules for the event.
- Rewards, if any.
```

Create `content/wiki/troubleshooting.md`:

```md
---
title: Troubleshooting
description: Help for common CoziCraft connection and gameplay problems.
category: Troubleshooting
section: Wiki
order: 8
tags:
  - help
  - connection
  - troubleshooting
---

# Troubleshooting

Use this page when players cannot connect or need basic help.

## Cannot Connect

- Confirm you are using Minecraft Java Edition.
- Confirm your version is `26.2`.
- Confirm the address is `play.cozicraftmc.com`.
- Restart the game and try again.

## Still Stuck

Use the official contact link from the site footer. Include your Minecraft username, the error message, and what you already tried.
```

- [ ] **Step 5: Create FAQ and news content**

Create `content/faq/index.md`:

```md
---
title: FAQ
description: Common CoziCraft questions and answers.
section: FAQ
order: 1
tags:
  - faq
  - help
---

# FAQ

## What edition does CoziCraft use?

CoziCraft is a Minecraft Java server.

## What server address should I use?

Use `play.cozicraftmc.com`.

## What version should I use?

Use Java `26.2`.

## Is the store open?

The store page exists, but purchases are not handled by this static site.

## How do I edit the wiki?

Edit markdown files in this repository through GitHub and open a pull request.
```

Create `content/news/2026-06-12-welcome-to-cozicraft.md`:

```md
---
title: Welcome To CoziCraft
description: The first CoziCraft site update.
section: News
date: 2026-06-12
order: 1
tags:
  - launch
  - website
---

# Welcome To CoziCraft

The CoziCraft website foundation is being set up as a static, GitHub-edited home for server information, wiki pages, FAQs, rules, and updates.

Players can use `play.cozicraftmc.com` on Minecraft Java `26.2`.
```

- [ ] **Step 6: Verify content compiles**

Run:

```bash
npm run prepare
npm run typecheck
```

Expected: both commands exit 0. If the content schema rejects a frontmatter field, fix the schema or frontmatter in this task.

- [ ] **Step 7: Commit task 2**

```bash
git add content.config.ts content
git add -u content
git commit -m "content: seed CoziCraft pages and wiki"
```

---

### Task 3: Tailwind App Shell And Layout

**Files:**
- Modify: `app/app.vue`
- Create: `app/layouts/default.vue`
- Create: `app/components/SiteHeader.vue`
- Create: `app/components/SiteFooter.vue`

- [ ] **Step 1: Add global app wrapper**

Replace `app/app.vue` with:

```vue
<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 2: Add the default layout**

Create `app/layouts/default.vue`:

```vue
<template>
  <div class="flex min-h-screen flex-col">
    <SiteHeader />
    <main id="main-content" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
```

- [ ] **Step 3: Add Tailwind site header**

Create `app/components/SiteHeader.vue`:

```vue
<script setup lang="ts">
const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-cozi-line/70 bg-cozi-soft/90 backdrop-blur-xl">
    <div class="container-cozi flex min-h-[72px] items-center justify-between gap-5">
      <NuxtLink class="flex items-center gap-3 no-underline" to="/" aria-label="CoziCraft home" @click="closeMenu">
        <span class="grid size-10 place-items-center rounded-md border-2 border-cozi-ink bg-cozi-leaf font-black text-white">C</span>
        <span>
          <strong class="block leading-tight">{{ siteConfig.name }}</strong>
          <small class="block text-xs font-bold leading-tight text-cozi-muted">{{ siteConfig.minecraftVersion }}</small>
        </span>
      </NuxtLink>

      <button
        class="grid place-items-center rounded-md border border-cozi-line bg-cozi-paper p-2.5 text-cozi-ink md:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="site-navigation"
        @click="isOpen = !isOpen"
      >
        <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" aria-hidden="true" />
        <span class="sr-only">Toggle navigation</span>
      </button>

      <nav
        id="site-navigation"
        class="absolute inset-x-4 top-[72px] hidden flex-col items-stretch gap-1 rounded-lg border border-cozi-line bg-cozi-paper p-3 shadow-cozi md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        :class="{ 'flex': isOpen }"
        aria-label="Primary navigation"
      >
        <NuxtLink
          v-for="item in primaryNav"
          :key="item.to"
          class="rounded-md px-3 py-2 font-extrabold text-cozi-muted no-underline hover:bg-cozi-leaf/10 hover:text-cozi-ink [&.router-link-active]:bg-cozi-leaf/10 [&.router-link-active]:text-cozi-ink"
          :to="item.to"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          class="rounded-md bg-cozi-leaf-dark px-3 py-2 font-extrabold text-white no-underline hover:bg-cozi-leaf"
          to="/play"
          @click="closeMenu"
        >
          Join
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
```

- [ ] **Step 4: Add Tailwind site footer**

Create `app/components/SiteFooter.vue`:

```vue
<template>
  <footer class="border-t border-cozi-line bg-cozi-paper/80 py-8">
    <div class="container-cozi flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div>
        <strong>{{ siteConfig.name }}</strong>
        <p class="mt-1 max-w-2xl text-sm text-cozi-muted">{{ siteConfig.disclaimer }}</p>
      </div>
      <nav class="flex flex-wrap gap-3 md:justify-end" aria-label="Footer navigation">
        <NuxtLink v-for="item in footerNav" :key="item.to" class="font-extrabold text-cozi-muted no-underline hover:text-cozi-ink" :to="item.to">
          {{ item.label }}
        </NuxtLink>
        <a v-if="isConfiguredUrl(siteConfig.contactUrl)" class="font-extrabold text-cozi-muted no-underline hover:text-cozi-ink" :href="siteConfig.contactUrl">Email</a>
      </nav>
    </div>
  </footer>
</template>
```

- [ ] **Step 5: Verify shell compiles**

Run:

```bash
npm run lint
npm run typecheck
```

Expected: both commands exit 0.

- [ ] **Step 6: Commit task 3**

```bash
git add app/app.vue app/layouts/default.vue app/components/SiteHeader.vue app/components/SiteFooter.vue
git commit -m "feat: add Tailwind site shell"
```

---

### Task 4: Tailwind Homepage And Server Join Interaction

**Files:**
- Create: `app/components/CopyServerAddress.vue`
- Create: `app/components/ServerScene.vue`
- Create: `app/pages/index.vue`
- Delete: `app/components/Alert.vue`
- Delete: `app/components/Counter.vue`

- [ ] **Step 1: Remove starter demo components**

Run:

```bash
git rm -f app/components/Alert.vue app/components/Counter.vue
```

Expected: both starter files are staged for deletion.

- [ ] **Step 2: Add copy server address component**

Create `app/components/CopyServerAddress.vue`:

```vue
<script setup lang="ts">
const copied = ref(false)
const copyFailed = ref(false)

async function copyAddress() {
  copied.value = false
  copyFailed.value = false

  try {
    await navigator.clipboard.writeText(siteConfig.serverAddress)
    copied.value = true
  }
  catch {
    copyFailed.value = true
  }
}
</script>

<template>
  <div class="grid items-center gap-3 rounded-lg border border-cozi-line bg-cozi-paper/90 p-4 shadow-cozi sm:grid-cols-[minmax(0,1fr)_auto]" aria-live="polite">
    <div>
      <span class="block text-xs font-extrabold text-cozi-muted">Server IP</span>
      <code class="block overflow-wrap-anywhere text-lg font-black text-cozi-ink sm:text-2xl">{{ siteConfig.serverAddress }}</code>
      <small class="block text-xs font-extrabold text-cozi-muted">{{ siteConfig.minecraftVersion }}</small>
    </div>
    <button class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cozi-leaf-dark px-4 py-2.5 font-black text-white hover:bg-cozi-leaf" type="button" @click="copyAddress">
      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" aria-hidden="true" />
      {{ copied ? 'Copied' : 'Copy IP' }}
    </button>
    <p v-if="copyFailed" class="m-0 text-sm text-amber-800 sm:col-span-2">
      Copy failed. Select the address above and copy it manually.
    </p>
  </div>
</template>
```

- [ ] **Step 3: Add Tailwind scene slot component**

Create `app/components/ServerScene.vue`:

```vue
<template>
  <div class="relative min-h-[280px] overflow-hidden rounded-lg border border-cozi-line bg-gradient-to-b from-sky-200 via-lime-50 to-lime-200 shadow-cozi sm:min-h-[420px]" aria-label="Stylized CoziCraft server scene">
    <div class="absolute right-10 top-9 size-20 rounded-full bg-yellow-300 shadow-[0_0_0_18px_rgba(241,207,101,0.2)]" />
    <div class="absolute bottom-[26%] right-[24%] h-[42%] w-[72%] rounded-t-full bg-lime-300" />
    <div class="absolute bottom-0 right-[-8%] h-[42%] w-[72%] rounded-t-full bg-cozi-leaf" />
    <div class="absolute bottom-[18%] left-[14%] w-[150px]">
      <div class="mx-auto h-0 w-0 border-x-[82px] border-b-[60px] border-x-transparent border-b-[#8f6a45]" />
      <div class="mx-auto grid min-h-[88px] w-[130px] grid-cols-2 gap-3 border-4 border-[#6b4d32] bg-[#dcb879] p-4">
        <span class="border-[3px] border-[#6b4d32] bg-cozi-soft" />
        <span class="border-[3px] border-[#6b4d32] bg-cozi-soft" />
      </div>
    </div>
    <div class="absolute bottom-[-18%] left-[36%] h-[52%] w-[26%] rotate-12 rounded-t-full bg-cozi-gold/40" />
    <div class="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md border border-cozi-ink/15 bg-cozi-paper/85 px-3 py-2 text-sm font-extrabold text-cozi-muted">
      <Icon name="lucide:image-plus" aria-hidden="true" />
      Future screenshot slot
    </div>
  </div>
</template>
```

- [ ] **Step 4: Add Tailwind homepage**

Create `app/pages/index.vue`:

```vue
<script setup lang="ts">
import { motion } from 'motion-v'

useSeoMeta({
  title: 'CoziCraft',
  description: siteConfig.description,
})
</script>

<template>
  <div>
    <section class="py-12 sm:py-16 lg:py-24">
      <div class="container-cozi grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:gap-14">
        <motion.div
          :initial="{ opacity: 0, y: 18 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.28 }"
          class="grid gap-5"
        >
          <p class="m-0 text-xs font-black uppercase tracking-[0.08em] text-cozi-leaf">{{ siteConfig.minecraftVersion }}</p>
          <h1 class="m-0 text-5xl font-black leading-[0.96] tracking-normal text-cozi-ink sm:text-7xl lg:text-8xl">{{ siteConfig.name }}</h1>
          <p class="m-0 max-w-2xl text-lg text-cozi-muted sm:text-xl">{{ siteConfig.tagline }}</p>
          <CopyServerAddress />
          <div class="flex flex-wrap items-center gap-3">
            <NuxtLink class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cozi-leaf-dark px-4 py-2.5 font-black text-white no-underline shadow-cozi hover:bg-cozi-leaf" to="/play">
              <Icon name="lucide:play" aria-hidden="true" />
              Join Server
            </NuxtLink>
            <NuxtLink class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-cozi-line bg-cozi-paper px-4 py-2.5 font-black text-cozi-ink no-underline shadow-cozi hover:bg-white" to="/wiki">
              <Icon name="lucide:book-open" aria-hidden="true" />
              Read Wiki
            </NuxtLink>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, scale: 0.98 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.32, delay: 0.08 }"
        >
          <ServerScene />
        </motion.div>
      </div>
    </section>

    <section class="py-12 sm:py-20">
      <div class="container-cozi">
        <p class="m-0 text-xs font-black uppercase tracking-[0.08em] text-cozi-leaf">Start Here</p>
        <h2 class="m-0 mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-5xl">Everything a player needs, without digging.</h2>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="item in primaryNav"
            :key="item.to"
            class="rounded-lg border border-cozi-line bg-cozi-paper/85 p-5 text-cozi-ink no-underline shadow-cozi hover:-translate-y-0.5 hover:bg-white"
            :to="item.to"
          >
            <h3 class="m-0 text-xl font-black">{{ item.label }}</h3>
            <p class="m-0 mt-2 text-cozi-muted">{{ item.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-cozi-paper/60 py-12 sm:py-20">
      <div class="container-cozi">
        <p class="m-0 text-xs font-black uppercase tracking-[0.08em] text-cozi-leaf">Search</p>
        <h2 class="m-0 mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-5xl">Find rules, guides, FAQs, and updates.</h2>
        <ContentSearch />
      </div>
    </section>
  </div>
</template>
```

- [ ] **Step 5: Verify homepage compiles**

Run:

```bash
npm run lint
npm run typecheck
```

Expected: both commands exit 0. If `ContentSearch` is missing, leave this task uncommitted and complete Task 5 before committing Task 4 and Task 5 together.

- [ ] **Step 6: Commit task 4**

If Task 5 is not needed to resolve a missing component, commit:

```bash
git add app/components/CopyServerAddress.vue app/components/ServerScene.vue app/pages/index.vue
git add -u app/components
git commit -m "feat: add Tailwind CoziCraft homepage"
```

---

### Task 5: Tailwind Content Rendering, Wiki Index, News Index, And Search

**Files:**
- Modify: `app/pages/[...slug].vue`
- Create: `app/components/ContentSearch.vue`
- Create: `app/pages/wiki/index.vue`
- Create: `app/pages/news/index.vue`

- [ ] **Step 1: Add all-content search**

Create `app/components/ContentSearch.vue`:

```vue
<script setup lang="ts">
const query = ref('')
const results = ref<Array<{ id: string, title: string, content: string, collection: string }>>([])
const hasSearched = ref(false)

const { status, search } = useSearchCollection(['pages', 'wiki', 'faq', 'news'])

const collectionLabels: Record<string, string> = {
  pages: 'Page',
  wiki: 'Wiki',
  faq: 'FAQ',
  news: 'News',
}

let requestId = 0

watch(query, async (value) => {
  const currentRequest = ++requestId
  const trimmed = value.trim()
  hasSearched.value = Boolean(trimmed)

  if (!trimmed) {
    results.value = []
    return
  }

  const found = await search(trimmed, { limit: 8 })

  if (currentRequest === requestId) {
    results.value = found.map(result => ({
      id: result.id,
      title: result.title,
      content: result.content,
      collection: result.collection,
    }))
  }
})
</script>

<template>
  <div class="mt-6 grid max-w-3xl gap-3">
    <label class="font-extrabold text-cozi-muted" for="site-search">Search CoziCraft content</label>
    <div class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-cozi-line bg-cozi-paper px-4 py-3 shadow-cozi">
      <Icon name="lucide:search" aria-hidden="true" />
      <input
        id="site-search"
        v-model="query"
        class="w-full border-0 bg-transparent text-cozi-ink outline-0"
        type="search"
        autocomplete="off"
        placeholder="Search wiki, rules, FAQ, and news"
      >
    </div>

    <p v-if="status === 'loading'" class="m-0 text-cozi-muted">Preparing search...</p>
    <p v-else-if="status === 'error'" class="m-0 text-cozi-muted">Search is unavailable. Use the navigation links above.</p>
    <p v-else-if="hasSearched && results.length === 0" class="m-0 text-cozi-muted">No results found.</p>

    <div v-if="results.length > 0" class="grid gap-3">
      <NuxtLink
        v-for="result in results"
        :key="result.id"
        class="grid gap-1 rounded-md border border-cozi-line bg-cozi-paper/85 p-4 text-cozi-ink no-underline hover:bg-white"
        :to="result.id"
      >
        <span class="text-xs font-black uppercase text-cozi-leaf">{{ collectionLabels[result.collection] || 'Content' }}</span>
        <strong>{{ result.title }}</strong>
        <p class="m-0 line-clamp-2 text-cozi-muted">{{ result.content }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Update catch-all content renderer**

Replace `app/pages/[...slug].vue` with:

```vue
<script setup lang="ts">
type ContentCollection = 'pages' | 'wiki' | 'faq' | 'news'

const route = useRoute()
const path = computed(() => {
  const normalized = route.path.replace(/\/$/, '')
  return normalized || '/'
})

const collections: ContentCollection[] = ['pages', 'wiki', 'faq', 'news']

const { data: page } = await useAsyncData(`content:${path.value}`, async () => {
  for (const collection of collections) {
    const item = await queryCollection(collection).path(path.value).first()

    if (item) {
      return {
        ...item,
        collection,
      }
    }
  }

  return null
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <article class="container-cozi grid gap-7 py-10 lg:py-16" :class="{ 'lg:grid-cols-[270px_minmax(0,1fr)]': page?.collection === 'wiki' }">
    <aside v-if="page?.collection === 'wiki'" class="grid gap-2 self-start rounded-lg border border-cozi-line bg-cozi-paper/85 p-5 shadow-cozi lg:sticky lg:top-[90px]">
      <h2 class="m-0 text-xl font-black">Wiki</h2>
      <NuxtLink
        v-for="category in wikiCategories"
        :key="category.path"
        class="flex items-center gap-2 rounded-md px-2 py-2 font-extrabold text-cozi-muted no-underline hover:bg-cozi-leaf/10 hover:text-cozi-ink [&.router-link-active]:bg-cozi-leaf/10 [&.router-link-active]:text-cozi-ink"
        :to="category.path"
      >
        <Icon :name="category.icon" aria-hidden="true" />
        {{ category.title }}
      </NuxtLink>
    </aside>

    <div class="prose max-w-none prose-headings:tracking-normal prose-headings:text-cozi-ink prose-a:text-cozi-leaf prose-code:text-cozi-ink">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </article>
</template>
```

- [ ] **Step 3: Add wiki index**

Create `app/pages/wiki/index.vue`:

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Wiki',
  description: 'Browse CoziCraft wiki categories.',
})
</script>

<template>
  <section class="py-12 sm:py-20">
    <div class="container-cozi">
      <p class="m-0 text-xs font-black uppercase tracking-[0.08em] text-cozi-leaf">Wiki</p>
      <h1 class="m-0 mt-2 text-5xl font-black leading-[0.96] tracking-normal text-cozi-ink sm:text-7xl">CoziCraft Wiki</h1>
      <p class="mt-5 max-w-3xl text-lg text-cozi-muted sm:text-xl">
        Browse guides for joining, rules, commands, claims, economy, ranks, events, and troubleshooting.
      </p>

      <div class="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="category in wikiCategories"
          :key="category.path"
          class="rounded-lg border border-cozi-line bg-cozi-paper/85 p-5 text-cozi-ink no-underline shadow-cozi hover:-translate-y-0.5 hover:bg-white"
          :to="category.path"
        >
          <Icon class="text-cozi-leaf" :name="category.icon" aria-hidden="true" />
          <h2 class="m-0 mt-3 text-xl font-black">{{ category.title }}</h2>
          <p class="m-0 mt-2 text-cozi-muted">{{ category.description }}</p>
        </NuxtLink>
      </div>

      <ContentSearch />
    </div>
  </section>
</template>
```

- [ ] **Step 4: Add news index**

Create `app/pages/news/index.vue`:

```vue
<script setup lang="ts">
const { data: posts } = await useAsyncData('news:index', () => {
  return queryCollection('news')
    .order('date', 'DESC')
    .all()
})

useSeoMeta({
  title: 'News',
  description: 'CoziCraft updates and announcements.',
})
</script>

<template>
  <section class="py-12 sm:py-20">
    <div class="container-cozi">
      <p class="m-0 text-xs font-black uppercase tracking-[0.08em] text-cozi-leaf">News</p>
      <h1 class="m-0 mt-2 text-5xl font-black leading-[0.96] tracking-normal text-cozi-ink sm:text-7xl">Updates</h1>
      <p class="mt-5 max-w-3xl text-lg text-cozi-muted sm:text-xl">Follow CoziCraft site, server, and community updates.</p>

      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          class="rounded-lg border border-cozi-line bg-cozi-paper/85 p-5 text-cozi-ink no-underline shadow-cozi hover:bg-white"
          :to="post.path"
        >
          <span class="text-xs font-black uppercase text-cozi-leaf">{{ post.date }}</span>
          <h2 class="m-0 mt-2 text-2xl font-black">{{ post.title }}</h2>
          <p class="m-0 mt-2 text-cozi-muted">{{ post.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 5: Verify content pages and search compile**

Run:

```bash
npm run lint
npm run typecheck
npm run generate
```

Expected: all commands exit 0 and generated output includes routes for `/`, `/play`, `/wiki`, `/wiki/getting-started`, `/faq`, `/rules`, `/store`, `/contact`, and `/news`.

- [ ] **Step 6: Commit task 5**

```bash
git add app/components/ContentSearch.vue app/pages
git commit -m "feat: add Tailwind content rendering and search"
```

If Task 4 was waiting on `ContentSearch`, include Task 4 files in this commit and use:

```bash
git add app/components app/pages
git add -u app/components
git commit -m "feat: add Tailwind homepage and content search"
```

---

### Task 6: Handoff Docs, Repo Templates, And CI

**Files:**
- Modify: `README.md`
- Create: `AGENTS.md`
- Create: `CONTRIBUTING.md`
- Create: `SECURITY.md`
- Create: `.github/pull_request_template.md`
- Create: `.github/ISSUE_TEMPLATE/content-change.md`
- Create: `.github/ISSUE_TEMPLATE/site-bug.md`
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Replace README**

Replace `README.md` with:

```md
# CoziCraft

CoziCraft is a static Nuxt + Nuxt Content site for the CoziCraft Minecraft Java community server.

Server address: `play.cozicraftmc.com`  
Current version: Java `26.2`

## What This Site Does

- Shows players how to join CoziCraft.
- Hosts public content pages, FAQs, rules, news, and wiki pages.
- Keeps content editable through GitHub markdown files.
- Uses Tailwind CSS for most styling.
- Stays static-first for simple hosting and a smaller security surface.

## Setup

```bash
npm install
npm run dev
```

Development server: `http://localhost:3000`

## Verification

Run these before pushing:

```bash
npm run lint
npm run typecheck
npm run generate
```

## Content Editing

Markdown lives in `content/`:

- `content/pages/` for standalone pages.
- `content/wiki/` for wiki pages.
- `content/faq/` for FAQs.
- `content/news/` for dated updates.

Use frontmatter that matches `content.config.ts`. Do not commit private server details, secrets, API keys, or unreviewed purchase logic.

## Static Hosting

The v1 production path is:

```bash
npm run generate
```

Deploy the generated static output from Nuxt to a static host. The site should not require a Node server in v1.

## Railway Option

Railway is acceptable for simplicity. Use:

- Build command: `npm run build`
- Start command: `npm run start`

The Railway path runs Nuxt through `node .output/server/index.mjs`, but v1 should still behave like a static content site. Do not add auth, database, server routes, live status polling, or Tebex API work just because Railway can run a Node process.

## Minecraft Notice

NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
```

- [ ] **Step 2: Add agent blueprint**

Create `AGENTS.md`:

```md
# AGENTS.md

## Project

CoziCraft is a static Nuxt 4 + Nuxt Content site for a Minecraft Java community server.

Use the design spec as the source of truth:

- `docs/superpowers/specs/2026-06-12-cozicraft-static-content-portal-design.md`

## Core Rules

- Keep v1 static-first.
- Use Tailwind utilities for most layout, spacing, color, typography, and responsive styling.
- Keep `app/assets/css/main.css` limited to Tailwind imports, theme tokens, base defaults, and tiny utilities.
- Railway deployment is allowed with `npm run build` and `npm run start`; keep the app static-first even when deployed on Railway.
- Do not add app auth, OAuth, sessions, protected routes, server endpoints, databases, or runtime payment flows without updating the design first.
- Do not expose secrets or API keys in client code.
- Do not add live Minecraft status calls without a cache and failure plan.
- Do not add Tebex API calls in the browser.
- Do not use official Minecraft logos, copied textures, or official artwork as site branding.
- Keep the Minecraft disclaimer visible in the footer.
- Keep the site readable, responsive, and accessible.

## Content

- Content is edited through GitHub markdown files.
- `content/pages/` is for standalone pages.
- `content/wiki/` is for wiki pages.
- `content/faq/` is for FAQs.
- `content/news/` is for dated updates.
- Do not invent plugin behavior. If a command, claim system, economy rule, rank, or event is not confirmed, write editor guidance instead of fake documentation.

## Design Direction

Use a bright community portal direction: friendly, readable, polished, and calm. The first viewport should make joining easy and show:

- CoziCraft
- `play.cozicraftmc.com`
- Java `26.2`
- Play, Wiki, News, Store, and Contact links

Use Motion Vue only for short, purposeful motion. Respect reduced-motion preferences.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run generate
npm run build
```

## Before Completion

- Run lint, typecheck, and generate.
- Run build when preparing for Railway.
- Verify the homepage, play page, wiki index, a wiki article, FAQ, rules, store, contact, and news pages.
- Confirm no secrets or private URLs were added.
```

- [ ] **Step 3: Add contributing and security docs**

Create `CONTRIBUTING.md`:

```md
# Contributing

Thanks for helping improve CoziCraft.

## Content Changes

Most edits should be markdown changes in `content/`.

1. Create a branch.
2. Edit the relevant markdown file.
3. Keep frontmatter valid.
4. Run verification.
5. Open a pull request.

## Content Standards

- Be clear and direct.
- Keep player-facing pages accurate.
- Do not describe unconfirmed plugins, commands, ranks, store items, or economy rules.
- Do not add secrets, staff-only details, private infrastructure information, or private player information.
- Do not use official Minecraft logos, copied textures, or official artwork.

## Styling Standards

- Use Tailwind utilities for most styling.
- Keep custom CSS rare and small.
- Check mobile layouts before merging visual changes.

## Verification

```bash
npm run lint
npm run typecheck
npm run generate
```

## Security

Report security issues using `SECURITY.md`. Do not post private security details in public issues.
```

Create `SECURITY.md`:

```md
# Security Policy

## Supported Versions

The current `main` branch is the supported version of this static site.

## Reporting A Vulnerability

Do not open a public issue for private security reports.

Use the contact path configured for CoziCraft maintainers and include:

- A short description of the issue.
- Steps to reproduce.
- Affected page or file.
- Whether secrets, player data, or purchase information could be exposed.

## Static Site Security Rules

- No secrets belong in this repository.
- No private API keys belong in browser code.
- Tebex API work must be server-side only.
- Auth or admin editing requires a new design update before implementation.
```

- [ ] **Step 4: Add GitHub templates and CI**

Create `.github/pull_request_template.md`:

```md
## Summary

## Verification

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run generate`
- [ ] For Railway-bound changes, `npm run build`

## Content Safety

- [ ] No secrets or private server details added
- [ ] No unconfirmed plugin behavior documented as fact
- [ ] No official Minecraft assets added
```

Create `.github/ISSUE_TEMPLATE/content-change.md`:

```md
---
name: Content change
about: Request a wiki, FAQ, rules, news, or page content update
title: "Content: "
labels: content
---

## Page

## Change Needed

## Source Or Confirmation
```

Create `.github/ISSUE_TEMPLATE/site-bug.md`:

```md
---
name: Site bug
about: Report a public site bug
title: "Bug: "
labels: bug
---

## What Happened

## Page URL

## Expected Behavior

## Browser Or Device
```

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches:
      - main
      - master
  pull_request:

jobs:
  static-site:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Typecheck
        run: npm run typecheck

      - name: Generate
        run: npm run generate
```

- [ ] **Step 5: Verify docs and CI syntax**

Run:

```bash
npm run lint
npm run typecheck
npm run generate
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit task 6**

```bash
git add README.md AGENTS.md CONTRIBUTING.md SECURITY.md .github
git commit -m "docs: add handoff and CI guardrails"
```

---

### Task 7: Final Static Verification And Browser Review

**Files:**
- Modify only files needed to fix issues found during verification.

- [ ] **Step 1: Run full local verification**

Run:

```bash
npm run lint
npm run typecheck
npm run generate
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 2: Start local dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Nuxt starts and prints a local URL, usually `http://127.0.0.1:3000`.

- [ ] **Step 3: Browser smoke review**

Use the Browser plugin for the local URL. Verify:

- `/` shows the CoziCraft homepage with server copy control.
- `/play` renders the join guide.
- `/wiki` shows the wiki category grid.
- `/wiki/getting-started` renders with the wiki sidebar.
- `/faq` renders FAQ content.
- `/rules` renders the public rules page.
- `/store` renders the store status page without a broken external CTA.
- `/contact` renders official links and contact copy.
- `/news` lists news posts.
- Search returns results for `rules`, `claims`, and `server`.
- Mobile viewport does not overlap header, menu, buttons, or search text.
- Tailwind utilities provide the main component styling; custom CSS remains limited to global theme/base setup.

- [ ] **Step 4: Static preview check**

Stop the dev server, then run:

```bash
npm run preview -- --host 127.0.0.1
```

Expected: Preview starts from generated output. Re-check `/`, `/wiki`, and `/news`.

- [ ] **Step 5: Inspect git state**

Run:

```bash
git status --short
```

Expected: only intentional changes are present. Do not add `.superpowers/` or generated output directories.

- [ ] **Step 6: Commit final fixes if needed**

If verification required fixes:

```bash
git add <fixed-files>
git commit -m "fix: polish CoziCraft static foundation"
```

If no fixes were needed, do not create an empty commit.

---

## Final Completion Criteria

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run generate` passes.
- The Browser smoke review passes on desktop and mobile widths.
- Tailwind is installed through `tailwindcss` and `@tailwindcss/vite`.
- Tailwind utilities carry the main component styling.
- `npm run start` exists for simple Railway deployment after `npm run build`.
- The footer includes the Minecraft disclaimer.
- No secrets, private API keys, Tebex API calls, auth routes, server endpoints, live status calls, or license file were added.
- The final response summarizes commits, verification results, and any remaining known limits.

## References

- [Tailwind CSS Nuxt installation](https://tailwindcss.com/docs/installation/framework-guides/nuxt)
- [Tailwind CSS Vite installation](https://tailwindcss.com/docs/installation/using-vite)
- [Nuxt Tailwind module note](https://nuxt.com/modules/tailwindcss)
- [Railway Nuxt deployment guide](https://docs.railway.com/guides/nuxt)
