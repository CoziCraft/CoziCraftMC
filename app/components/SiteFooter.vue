<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const contactUrl = computed(() => {
  return cleanOptionalUrl(runtimeConfig.public.contactUrl) || siteConfig.fallbackContactUrl
})
</script>

<template>
  <footer class="border-t border-cozi-line bg-cozi-paper/80 py-8">
    <div class="container-cozi flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div>
        <strong>{{ siteConfig.name }}</strong>
        <p class="mt-1 max-w-2xl text-sm text-cozi-muted">{{ siteConfig.disclaimer }}</p>
      </div>
      <nav class="flex flex-wrap gap-3 md:justify-end" aria-label="Footer navigation">
        <NuxtLink
          v-for="item in footerNav"
          :key="item.to"
          class="font-extrabold text-cozi-muted no-underline hover:text-cozi-ink"
          :to="item.to"
        >
          {{ item.label }}
        </NuxtLink>
        <a class="font-extrabold text-cozi-muted no-underline hover:text-cozi-ink" :href="contactUrl">Email</a>
      </nav>
    </div>
  </footer>
</template>
