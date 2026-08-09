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
  immediate: false,
})
let indexPromise: Promise<unknown> | undefined

function ensureSearchIndex() {
  if (!indexPromise || status.value === 'error') {
    indexPromise = init().catch((error) => {
      indexPromise = undefined
      throw error
    })
  }
  return indexPromise
}

function resultPath(result: SearchResultItem) {
  const id = result.id.split('#')[0] ?? result.id
  const path = id.replace(/\.md$/, '')
  return path.startsWith('/') ? path : `/${path}`
}

function dedupeResults(items: SearchResultItem[]) {
  const seen = new Set<string>()
  return items.filter((result) => {
    const key = `${result.collection}:${resultPath(result)}:${result.title}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function resultLabel(collection: string) {
  return ({ pages: 'Page', wiki: 'Wiki', faq: 'FAQ', news: 'News' } as Record<string, string>)[collection] ?? collection
}

function resultSummary(content: string) {
  return content.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\s+/g, ' ').trim()
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
    await ensureSearchIndex()
    const matches = dedupeResults(await search(term, { limit: 12, minTermLength: 2 })).slice(0, 8)
    if (query.value.trim() === term) results.value = matches
  }
  catch {
    if (query.value.trim() === term) errorMessage.value = 'Search is warming up. Try again in a moment.'
  }
  finally {
    if (query.value.trim() === term) isSearching.value = false
  }
}

onMounted(() => {
  ensureSearchIndex().catch(() => {
    errorMessage.value = 'Search is warming up. Try again in a moment.'
  })
})

watch(query, runSearch)
</script>

<template>
  <section class="rounded-2xl border border-cozi-line bg-white/[0.045] p-4 shadow-cozi sm:p-5" aria-labelledby="content-search-title">
    <div class="mb-3 flex items-center justify-between gap-3">
      <h2 id="content-search-title" class="m-0 font-display text-xl font-bold text-cozi-cream sm:text-2xl">Search the server guide</h2>
      <span class="text-[0.65rem] font-bold uppercase tracking-wider text-cozi-jade-soft">{{ status }}</span>
    </div>
    <label class="sr-only" for="content-search-input">Search wiki, rules, FAQ, and news</label>
    <div class="relative">
      <Icon class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-cozi-jade" name="lucide:search" aria-hidden="true" />
      <input id="content-search-input" v-model="query" class="min-h-12 w-full rounded-xl border border-cozi-line bg-cozi-night/55 py-2 pr-3 pl-10 font-semibold text-cozi-cream outline-none placeholder:text-cozi-muted/70 focus:border-cozi-jade focus:ring-4 focus:ring-cozi-jade/15" placeholder="Search wiki, rules, FAQ, and news" type="search">
    </div>
    <p v-if="errorMessage" class="mb-0 mt-3 text-sm font-semibold text-cozi-amber-soft">{{ errorMessage }}</p>
    <p v-else-if="isSearching" class="mb-0 mt-3 text-sm font-semibold text-cozi-muted">Searching...</p>
    <div v-if="results.length" class="mt-4 grid gap-2">
      <NuxtLink v-for="result in results" :key="`${result.collection}-${result.id}`" class="rounded-xl border border-cozi-line bg-cozi-night/45 p-3 no-underline transition hover:border-cozi-jade hover:bg-cozi-night/70" :to="resultPath(result)">
        <span class="text-[0.65rem] font-bold uppercase tracking-wider text-cozi-pink">{{ resultLabel(result.collection) }}</span>
        <strong class="mt-1 block text-cozi-cream">{{ result.title }}</strong>
        <span class="mt-1 line-clamp-2 block text-sm text-cozi-muted">{{ resultSummary(result.content) }}</span>
      </NuxtLink>
    </div>
  </section>
</template>
