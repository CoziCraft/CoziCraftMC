<script setup lang="ts">
const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-cozi-line/70 bg-cozi-soft/95 backdrop-blur-xl">
    <div class="container-cozi flex min-h-16 items-center justify-between gap-4 sm:min-h-[72px]">
      <NuxtLink class="flex items-center gap-3 no-underline" to="/" aria-label="CoziCraft home" @click="closeMenu">
        <span class="grid size-10 place-items-center rounded-md border-2 border-cozi-ink bg-cozi-leaf font-black text-white sm:size-11">C</span>
        <span>
          <strong class="block text-lg leading-tight sm:text-xl">{{ siteConfig.name }}</strong>
          <small class="block text-xs font-bold leading-tight text-cozi-muted">{{ siteConfig.minecraftVersion }}</small>
        </span>
      </NuxtLink>

      <button
        class="grid size-11 place-items-center rounded-md border border-cozi-line bg-cozi-paper text-xl text-cozi-ink shadow-sm md:hidden"
        type="button"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? 'Close navigation' : 'Open navigation'"
        aria-controls="site-navigation"
        @click="isOpen = !isOpen"
      >
        <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" aria-hidden="true" />
      </button>

      <nav
        id="site-navigation"
        class="absolute inset-x-4 top-16 max-h-[calc(100svh-5rem)] flex-col items-stretch gap-1 overflow-auto rounded-lg border border-cozi-line bg-cozi-paper p-3 shadow-cozi sm:top-[72px] md:static md:max-h-none md:flex-row md:items-center md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        :class="isOpen ? 'flex' : 'hidden md:flex'"
        aria-label="Primary navigation"
      >
        <NuxtLink
          v-for="item in primaryNav"
          :key="item.to"
          class="rounded-md px-3 py-3 font-extrabold text-cozi-muted no-underline hover:bg-cozi-leaf/10 hover:text-cozi-ink md:py-2 [&.router-link-active]:bg-cozi-leaf/10 [&.router-link-active]:text-cozi-ink"
          :to="item.to"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          class="rounded-md bg-cozi-leaf-dark px-3 py-3 text-center font-extrabold text-white no-underline hover:bg-cozi-leaf md:py-2"
          to="/play"
          @click="closeMenu"
        >
          Join
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
