<script setup lang="ts">
const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-30">
    <div class="container-cozi flex min-h-20 items-center justify-between gap-5 rounded-b-2xl border border-t-0 border-cozi-line bg-cozi-night/80 px-4 py-3 shadow-[0_15px_45px_rgba(1,3,13,0.22)] backdrop-blur-xl sm:min-h-22">
      <NuxtLink class="flex shrink-0 items-center gap-3 no-underline" to="/" aria-label="CoziCraft home" @click="closeMenu">
        <span class="grid size-11 place-items-center rounded-[14px_14px_14px_5px] bg-[linear-gradient(145deg,#ffc76f,#ee9fc8)] text-xl text-cozi-night shadow-[0_5px_18px_rgba(255,199,111,0.25)]">
          <Icon name="lucide:blocks" aria-hidden="true" />
        </span>
        <span class="grid leading-none">
          <strong class="text-sm font-bold uppercase tracking-[0.12em] text-cozi-cream sm:text-base">{{ siteConfig.name }}</strong>
        </span>
      </NuxtLink>

      <button
        class="grid size-11 place-items-center rounded-xl border border-cozi-line bg-white/[0.055] text-xl text-cozi-cream md:hidden"
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
        class="absolute inset-x-3 top-[4.7rem] max-h-[calc(100svh-6rem)] flex-col gap-1 overflow-auto rounded-2xl border border-cozi-line bg-cozi-night-soft p-3 shadow-cozi md:static md:max-h-none md:flex-row md:items-center md:gap-1 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        :class="isOpen ? 'flex' : 'hidden md:flex'"
        aria-label="Primary navigation"
      >
        <NuxtLink
          v-for="item in primaryNav"
          :key="item.to"
          class="rounded-lg px-3 py-3 text-xs font-bold uppercase tracking-[0.09em] text-cozi-muted no-underline transition hover:bg-white/[0.05] hover:text-cozi-amber md:py-2 [&.router-link-active]:text-cozi-cream"
          :to="item.to"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink class="btn-nav-primary mt-1 md:mt-0 md:ml-2" to="/play" @click="closeMenu">
          <Icon name="lucide:gamepad-2" aria-hidden="true" />
          Join
        </NuxtLink>
      </nav>

      <span class="hidden shrink-0 text-[0.67rem] font-bold uppercase tracking-[0.12em] text-cozi-jade-soft xl:block">Minecraft {{ siteConfig.minecraftVersion }}</span>
    </div>
  </header>
</template>
