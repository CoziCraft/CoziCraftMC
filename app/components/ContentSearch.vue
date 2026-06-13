<script setup lang="ts">
type SearchResultItem = {
  collection: string
  id: string
  title: string
  content: string
}

const query = ref('')
const results = ref<SearchResultItem[]>([])
const isSearching = ref(false)
const errorMessage = ref('')

const { search, status, init } = useSearchCollection(['pages', 'wiki', 'faq', 'news'], {
  ignoredTags: ['script', 'style'],
})

function resultPath(result: SearchResultItem) {
  return result.id.startsWith('/') ? result.id : `/${result.id.replace(/\.md$/, '')}`
}

function resultLabel(collection: string) {
  const labels: Record<string, string> = {
    pages: 'Page',
    wiki: 'Wiki',
    faq: 'FAQ',
    news: 'News',
  }

  return labels[collection] ?? collection
}

async function runSearch() {
  const term = query.value.trim()
  errorMessage.value = ''

  if (term.length < 2) {
    results.value = []
    return
  }

  isSearching.value = true

  try {
    results.value = await search(term, { limit: 8, minTermLength: 2 })
  }
  catch {
    errorMessage.value = 'Search is warming up. Try again in a moment.'
  }
  finally {
    isSearching.value = false
  }
}

onMounted(() => {
  init().catch(() => {
    errorMessage.value = 'Search is warming up. Try again in a moment.'
  })
})

watch(query, () => {
  runSearch()
})
</script>

<template>
  <section class="rounded-lg border border-cozi-line bg-cozi-paper/90 p-4 shadow-cozi sm:p-5" aria-labelledby="content-search-title">
    <div class="mb-3 flex items-center justify-between gap-3">
      <h2 id="content-search-title" class="m-0 text-lg font-black text-cozi-leaf-dark">Search The Server Guide</h2>
      <span class="text-xs font-extrabold uppercase tracking-wide text-cozi-muted">{{ status }}</span>
    </div>

    <label class="sr-only" for="content-search-input">Search wiki, rules, FAQ, and news</label>
    <div class="relative">
      <Icon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cozi-muted" name="lucide:search" aria-hidden="true" />
      <input
        id="content-search-input"
        v-model="query"
        class="min-h-12 w-full rounded-md border border-cozi-line bg-white/80 py-2 pl-10 pr-3 font-semibold text-cozi-ink outline-none ring-cozi-leaf/20 placeholder:text-cozi-muted/70 focus:border-cozi-leaf focus:ring-4"
        placeholder="Search wiki, rules, FAQ, and news"
        type="search"
      >
    </div>

    <p v-if="errorMessage" class="mb-0 mt-3 text-sm font-semibold text-amber-800">{{ errorMessage }}</p>
    <p v-else-if="isSearching" class="mb-0 mt-3 text-sm font-semibold text-cozi-muted">Searching...</p>

    <div v-if="results.length" class="mt-4 grid gap-2">
      <NuxtLink
        v-for="result in results"
        :key="`${result.collection}-${result.id}`"
        class="rounded-md border border-cozi-line/80 bg-white/70 p-3 no-underline hover:border-cozi-leaf hover:bg-white"
        :to="resultPath(result)"
      >
        <span class="text-xs font-black uppercase tracking-wide text-cozi-gold">{{ resultLabel(result.collection) }}</span>
        <strong class="mt-1 block text-cozi-leaf-dark">{{ result.title }}</strong>
        <span class="mt-1 line-clamp-2 block text-sm text-cozi-muted">{{ result.content }}</span>
      </NuxtLink>
    </div>
  </section>
</template>
