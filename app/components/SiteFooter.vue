<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const contactUrl = computed(() => cleanOptionalUrl(runtimeConfig.public.contactUrl) || siteConfig.fallbackContactUrl)
</script>

<template>
  <footer class="container-cozi mt-16 grid gap-6 border-t border-cozi-line py-8 text-xs text-cozi-muted md:grid-cols-[1fr_auto] md:items-start">
    <div>
      <div class="mb-3 flex items-center gap-2 font-bold text-cozi-cream">
        <Icon name="lucide:blocks" aria-hidden="true" />
        {{ siteConfig.name }}
      </div>
      <p class="m-0 max-w-2xl text-[0.68rem] font-bold uppercase leading-5 tracking-[0.04em]">{{ siteConfig.disclaimer }}</p>
    </div>
    <nav class="flex flex-wrap gap-x-5 gap-y-3 md:justify-end" aria-label="Footer navigation">
      <NuxtLink v-for="item in footerNav" :key="item.to" class="font-bold text-cozi-muted no-underline hover:text-cozi-amber" :to="item.to">{{ item.label }}</NuxtLink>
      <a class="font-bold text-cozi-muted no-underline hover:text-cozi-amber" :href="contactUrl">Email</a>
    </nav>
  </footer>
</template>
