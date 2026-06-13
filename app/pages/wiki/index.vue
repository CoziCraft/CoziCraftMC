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
  <div class="py-10 sm:py-14">
    <div class="container-cozi grid gap-8">
      <section class="grid gap-4">
        <p class="m-0 inline-flex w-fit items-center gap-2 rounded-md border border-cozi-line bg-cozi-paper/80 px-3 py-1 text-sm font-black text-cozi-muted">
          <Icon name="lucide:book-open" aria-hidden="true" />
          Editable GitHub content
        </p>
        <div class="grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.55fr)] md:items-end">
          <div>
            <h1 class="m-0 text-4xl font-black leading-tight text-cozi-leaf-dark sm:text-6xl">CoziCraft Wiki</h1>
            <p class="mb-0 mt-3 max-w-3xl text-lg font-semibold leading-8 text-cozi-muted">
              Guides for joining, commands, claims, economy, ranks, events, troubleshooting, and the server rules.
            </p>
          </div>
          <ContentSearch />
        </div>
      </section>

      <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Wiki categories">
        <NuxtLink
          v-for="category in wikiCategories"
          :key="category.path"
          class="rounded-lg border border-cozi-line bg-cozi-paper p-5 no-underline shadow-cozi transition hover:-translate-y-0.5 hover:border-cozi-leaf"
          :to="category.path"
        >
          <Icon class="mb-4 text-2xl text-cozi-leaf" :name="category.icon" aria-hidden="true" />
          <h2 class="m-0 text-lg font-black leading-tight text-cozi-leaf-dark">{{ pageForCategory(category.path)?.title || category.title }}</h2>
          <p class="mb-0 mt-2 text-sm font-semibold leading-6 text-cozi-muted">{{ category.description }}</p>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
