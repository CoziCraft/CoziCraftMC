<script setup lang="ts">
const { data: posts } = await useAsyncData('news-index-posts', () => {
  return queryCollection('news').order('date', 'DESC').all()
})

const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
function formatDate(date: string) {
  return formatter.format(new Date(`${date}T00:00:00`))
}

useSeoMeta({ title: 'News - CoziCraft', description: 'CoziCraft server updates and community news.' })
</script>

<template>
  <div class="container-cozi py-12 sm:py-20">
    <section class="max-w-4xl">
      <p class="eyebrow">Notes from the lantern square</p>
      <h1 class="display-title mt-4 mb-0 text-6xl sm:text-8xl">News</h1>
      <p class="mt-5 mb-0 text-lg leading-8 text-cozi-muted">Short updates for server news, community events, and new things worth finding.</p>
    </section>

    <section class="mt-12 grid gap-4 md:grid-cols-2" aria-label="News posts">
      <NuxtLink v-for="post in posts" :key="post.path" class="group rounded-3xl border border-cozi-line bg-white/[0.045] p-6 no-underline shadow-cozi transition hover:-translate-y-1 hover:border-cozi-amber sm:p-8" :to="post.path">
        <span class="mb-8 grid size-12 place-items-center rounded-xl bg-cozi-jade-soft text-2xl text-cozi-night"><Icon name="lucide:newspaper" aria-hidden="true" /></span>
        <time class="text-xs font-bold uppercase tracking-[0.12em] text-cozi-pink" :datetime="post.date">{{ formatDate(post.date) }}</time>
        <h2 class="mt-2 mb-0 font-display text-3xl font-bold text-cozi-cream">{{ post.title }}</h2>
        <p class="mt-3 mb-0 text-cozi-muted">{{ post.description }}</p>
        <span class="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cozi-amber">Read update <Icon name="lucide:arrow-right" aria-hidden="true" /></span>
      </NuxtLink>
    </section>
  </div>
</template>
