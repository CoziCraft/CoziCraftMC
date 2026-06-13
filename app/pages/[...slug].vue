<script setup lang="ts">
const route = useRoute()

async function findPage(path: string) {
  const page = await queryCollection('pages').path(path).first()
  if (page) {
    return { collection: 'pages', page }
  }

  const wikiPage = await queryCollection('wiki').path(path).first()
  if (wikiPage) {
    return { collection: 'wiki', page: wikiPage }
  }

  const faqPage = await queryCollection('faq').path(path).first()
  if (faqPage) {
    return { collection: 'faq', page: faqPage }
  }

  const newsPage = await queryCollection('news').path(path).first()
  if (newsPage) {
    return { collection: 'news', page: newsPage }
  }

  return null
}

const { data } = await useAsyncData(`content-page-${route.path}`, () => {
  return findPage(route.path)
})

if (!data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => data.value?.page)

useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} - CoziCraft` : 'CoziCraft',
  description: () => page.value?.description ?? siteConfig.description,
})
</script>

<template>
  <article v-if="page" class="py-10 sm:py-14">
    <div class="container-cozi grid gap-8 lg:grid-cols-[minmax(0,220px)_minmax(0,820px)]">
      <aside class="hidden lg:block">
        <div class="sticky top-28 rounded-lg border border-cozi-line bg-cozi-paper/80 p-4 text-sm shadow-cozi">
          <p class="m-0 font-black text-cozi-leaf-dark">{{ page.section || data?.collection || 'Content' }}</p>
          <p class="mt-2 text-cozi-muted">{{ page.description }}</p>
        </div>
      </aside>

      <div class="min-w-0 rounded-lg border border-cozi-line bg-cozi-paper/90 p-5 shadow-cozi sm:p-8">
        <NuxtLink class="mb-6 inline-flex items-center gap-2 text-sm font-black text-cozi-muted no-underline hover:text-cozi-ink" to="/">
          <Icon name="lucide:arrow-left" aria-hidden="true" />
          Home
        </NuxtLink>
        <ContentRenderer class="content-prose" :value="page" />
      </div>
    </div>
  </article>
</template>
