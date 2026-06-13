<script setup lang="ts">
const { data: posts } = await useAsyncData('news-index-posts', () => {
  return queryCollection('news').order('date', 'DESC').all()
})

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function formatDate(date: string) {
  return formatter.format(new Date(`${date}T00:00:00`))
}

useSeoMeta({
  title: 'News - CoziCraft',
  description: 'CoziCraft server updates and community news.',
})
</script>

<template>
  <div class="py-10 sm:py-14">
    <div class="container-cozi grid gap-8">
      <section class="max-w-3xl">
        <p class="m-0 inline-flex w-fit items-center gap-2 rounded-md border border-cozi-line bg-cozi-paper/80 px-3 py-1 text-sm font-black text-cozi-muted">
          <Icon name="lucide:newspaper" aria-hidden="true" />
          Server updates
        </p>
        <h1 class="mb-0 mt-4 text-4xl font-black leading-tight text-cozi-leaf-dark sm:text-6xl">News</h1>
        <p class="mb-0 mt-3 text-lg font-semibold leading-8 text-cozi-muted">
          Short updates for site changes, server news, community events, and future release notes.
        </p>
      </section>

      <section class="grid gap-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          class="rounded-lg border border-cozi-line bg-cozi-paper p-5 no-underline shadow-cozi hover:border-cozi-leaf"
          :to="post.path"
        >
          <time class="text-sm font-black uppercase tracking-wide text-cozi-gold" :datetime="post.date">{{ formatDate(post.date) }}</time>
          <h2 class="mb-2 mt-2 text-2xl font-black text-cozi-leaf-dark">{{ post.title }}</h2>
          <p class="m-0 text-cozi-muted">{{ post.description }}</p>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
