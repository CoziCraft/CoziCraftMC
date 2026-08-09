<script setup lang="ts">
const route = useRoute()

async function findPage(path: string) {
  const page = await queryCollection('pages').path(path).first()
  if (page) return { collection: 'pages', page }
  const wikiPage = await queryCollection('wiki').path(path).first()
  if (wikiPage) return { collection: 'wiki', page: wikiPage }
  const faqPage = await queryCollection('faq').path(path).first()
  if (faqPage) return { collection: 'faq', page: faqPage }
  const newsPage = await queryCollection('news').path(path).first()
  if (newsPage) return { collection: 'news', page: newsPage }
  return null
}

const { data } = await useAsyncData(`content-page-${route.path}`, () => findPage(route.path))

if (!data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => data.value?.page)
const sectionIcon = computed(() => {
  const icons: Record<string, string> = {
    Play: 'lucide:gamepad-2', Wiki: 'lucide:book-open', FAQ: 'lucide:circle-help', News: 'lucide:newspaper',
    Rules: 'lucide:scroll-text', Store: 'lucide:shopping-bag', Contact: 'lucide:messages-square',
  }
  return icons[page.value?.section ?? ''] ?? 'lucide:map'
})

useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} - CoziCraft` : 'CoziCraft',
  description: () => page.value?.description ?? siteConfig.description,
})
</script>

<template>
  <article v-if="page" class="container-cozi py-12 sm:py-20">
    <div class="grid gap-7 lg:grid-cols-[minmax(0,240px)_minmax(0,840px)] lg:justify-center">
      <aside>
        <div class="rounded-2xl border border-cozi-line bg-white/[0.045] p-5 shadow-cozi lg:sticky lg:top-28">
          <span class="mb-5 grid size-12 place-items-center rounded-xl bg-cozi-amber text-2xl text-cozi-night"><Icon :name="sectionIcon" aria-hidden="true" /></span>
          <p class="m-0 text-xs font-black uppercase tracking-[0.12em] text-cozi-pink">{{ page.section || data?.collection || 'Guide' }}</p>
          <p class="mt-2 mb-0 text-sm leading-6 text-cozi-muted">{{ page.description }}</p>
          <NuxtLink class="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cozi-amber no-underline" to="/">
            <Icon name="lucide:arrow-left" aria-hidden="true" />Home
          </NuxtLink>
        </div>
      </aside>

      <div class="min-w-0 rounded-3xl border border-cozi-line bg-cozi-night-soft/75 p-5 shadow-cozi sm:p-8 lg:p-10">
        <ContentRenderer class="content-prose" :value="page" />
      </div>
    </div>
  </article>
</template>
