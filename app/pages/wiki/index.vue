<script setup lang="ts">
const { data: pages } = await useAsyncData('wiki-index-pages', () => {
  return queryCollection('wiki').order('order', 'ASC').all()
})

function pageForCategory(path: string) {
  return pages.value?.find(page => page.path === path)
}

useSeoMeta({
  title: 'CoziCraft Wiki - CoziCraft',
  description: 'Browse CoziCraft wiki categories and search public server content.',
})
</script>

<template>
  <div class="container-cozi py-12 sm:py-20">
    <section class="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)] lg:items-end">
      <div>
        <p class="eyebrow">Your moonlit field guide</p>
        <h1 class="display-title mt-4 mb-0 text-6xl sm:text-8xl">CoziCraft Wiki</h1>
        <p class="mt-5 mb-0 max-w-3xl text-lg leading-8 text-cozi-muted">Guides for joining, commands, claims, economy, ranks, events, troubleshooting, and server rules.</p>
      </div>
      <ContentSearch />
    </section>

    <section class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Wiki categories">
      <NuxtLink
        v-for="category in wikiCategories"
        :key="category.path"
        class="group min-h-56 rounded-2xl border border-cozi-line bg-white/[0.045] p-5 no-underline transition hover:-translate-y-1 hover:border-cozi-amber"
        :to="category.path"
      >
        <span class="mb-8 grid size-12 place-items-center rounded-xl bg-cozi-amber text-2xl text-cozi-night transition group-hover:bg-cozi-amber-soft">
          <Icon :name="category.icon" aria-hidden="true" />
        </span>
        <h2 class="m-0 font-display text-2xl font-black leading-tight text-cozi-cream">{{ pageForCategory(category.path)?.title || category.title }}</h2>
        <p class="mt-2 mb-0 text-sm leading-6 text-cozi-muted">{{ category.description }}</p>
      </NuxtLink>
    </section>
  </div>
</template>
