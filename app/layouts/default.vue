<template>
  <div class="flex min-h-screen flex-col">
    <a class="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-cozi-amber px-4 py-2 font-black text-cozi-night no-underline focus:translate-y-0" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
