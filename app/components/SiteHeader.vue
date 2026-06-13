<script setup lang="ts">
const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-cozi-line/70 bg-cozi-soft/90 backdrop-blur-xl">
    <div class="container-cozi flex min-h-[72px] items-center justify-between gap-5">
      <NuxtLink class="flex items-center gap-3 no-underline" to="/" aria-label="CoziCraft home" @click="closeMenu">
        <span class="grid size-10 place-items-center rounded-md border-2 border-cozi-ink bg-cozi-leaf font-black text-white">C</span>
        <span>
          <strong class="block leading-tight">{{ siteConfig.name }}</strong>
          <small class="block text-xs font-bold leading-tight text-cozi-muted">{{ siteConfig.minecraftVersion }}</small>
        </span>
      </NuxtLink>

      <button
        class="grid place-items-center rounded-md border border-cozi-line bg-cozi-paper p-2.5 text-cozi-ink md:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="site-navigation"
        @click="isOpen = !isOpen"
      >
        <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" aria-hidden="true" />
        <span class="sr-only">Toggle navigation</span>
      </button>

      <nav
        id="site-navigation"
        class="absolute inset-x-4 top-[72px] hidden flex-col items-stretch gap-1 rounded-lg border border-cozi-line bg-cozi-paper p-3 shadow-cozi md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        :class="{ flex: isOpen }"
        aria-label="Primary navigation"
      >
        <NuxtLink
          v-for="item in primaryNav"
          :key="item.to"
          class="rounded-md px-3 py-2 font-extrabold text-cozi-muted no-underline hover:bg-cozi-leaf/10 hover:text-cozi-ink [&.router-link-active]:bg-cozi-leaf/10 [&.router-link-active]:text-cozi-ink"
          :to="item.to"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          class="rounded-md bg-cozi-leaf-dark px-3 py-2 font-extrabold text-white no-underline hover:bg-cozi-leaf"
          to="/play"
          @click="closeMenu"
        >
          Join
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
