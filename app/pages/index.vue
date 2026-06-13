<script setup lang="ts">
import { motion } from 'motion-v'

const { data: latestNews } = await useAsyncData('home-latest-news', () => {
  return queryCollection('news').order('date', 'DESC').limit(1).all()
})

const latestPost = computed(() => latestNews.value?.[0])

const quickLinks = [
  {
    title: 'Join the server',
    description: 'Use the Java address and version without digging through chat.',
    to: '/play',
    icon: 'lucide:door-open',
  },
  {
    title: 'Read the wiki',
    description: 'Commands, claims, economy notes, ranks, events, and fixes.',
    to: '/wiki',
    icon: 'lucide:book-open',
  },
  {
    title: 'Check the rules',
    description: 'A clear baseline for kind play, builds, trading, and chat.',
    to: '/rules',
    icon: 'lucide:scroll-text',
  },
]

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
          <p class="m-0 inline-flex w-fit items-center gap-2 rounded-md border border-cozi-line bg-cozi-paper/80 px-3 py-1 text-sm font-black text-cozi-muted">
            <Icon name="lucide:pickaxe" aria-hidden="true" />
            Minecraft Java {{ siteConfig.minecraftVersion.replace('Java ', '') }}
          </p>
          <div class="grid gap-4">
            <h1 class="m-0 text-5xl font-black leading-none text-cozi-leaf-dark sm:text-6xl lg:text-7xl">CoziCraft</h1>
            <p class="m-0 max-w-2xl text-lg font-semibold leading-8 text-cozi-muted sm:text-xl">{{ siteConfig.tagline }}</p>
          </div>
          <CopyServerAddress />
          <div class="flex flex-wrap gap-3">
            <NuxtLink class="inline-flex min-h-11 items-center gap-2 rounded-md bg-cozi-leaf-dark px-4 py-2.5 font-black text-white no-underline hover:bg-cozi-leaf" to="/play">
              <Icon name="lucide:play" aria-hidden="true" />
              Join Guide
            </NuxtLink>
            <NuxtLink class="inline-flex min-h-11 items-center gap-2 rounded-md border border-cozi-line bg-cozi-paper px-4 py-2.5 font-black text-cozi-ink no-underline hover:border-cozi-leaf" to="/wiki">
              <Icon name="lucide:book-open" aria-hidden="true" />
              Wiki
            </NuxtLink>
          </div>
        </motion.div>

        <ServerScene />
      </div>
    </section>

    <section class="bg-cozi-paper/55 py-10 sm:py-14">
      <div class="container-cozi grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          class="rounded-lg border border-cozi-line bg-cozi-paper p-5 no-underline shadow-cozi transition hover:-translate-y-0.5 hover:border-cozi-leaf"
          :to="link.to"
        >
          <Icon class="mb-4 text-2xl text-cozi-leaf" :name="link.icon" aria-hidden="true" />
          <h2 class="m-0 text-xl font-black text-cozi-leaf-dark">{{ link.title }}</h2>
          <p class="mb-0 mt-2 text-sm font-semibold leading-6 text-cozi-muted">{{ link.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="py-10 sm:py-14">
      <div class="container-cozi grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)]">
        <ContentSearch />

        <aside class="rounded-lg border border-cozi-line bg-cozi-paper/90 p-5 shadow-cozi">
          <p class="m-0 text-sm font-black uppercase tracking-wide text-cozi-gold">Latest Update</p>
          <template v-if="latestPost">
            <h2 class="mb-2 mt-2 text-2xl font-black leading-tight text-cozi-leaf-dark">{{ latestPost.title }}</h2>
            <p class="m-0 text-cozi-muted">{{ latestPost.description }}</p>
            <NuxtLink class="mt-4 inline-flex items-center gap-2 font-black text-cozi-leaf no-underline hover:text-cozi-leaf-dark" :to="latestPost.path">
              Read update
              <Icon name="lucide:arrow-right" aria-hidden="true" />
            </NuxtLink>
          </template>
        </aside>
      </div>
    </section>
  </div>
</template>
