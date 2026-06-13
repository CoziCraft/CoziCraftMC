<script setup lang="ts">
const copied = ref(false)
const copyFailed = ref(false)

async function copyAddress() {
  copied.value = false
  copyFailed.value = false

  try {
    await navigator.clipboard.writeText(siteConfig.serverAddress)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    copyFailed.value = true
  }
}
</script>

<template>
  <div class="grid items-center gap-3 rounded-lg border border-cozi-line bg-cozi-paper/90 p-3 shadow-cozi sm:grid-cols-[minmax(0,1fr)_auto] sm:p-4" aria-live="polite">
    <div class="min-w-0">
      <span class="block text-xs font-extrabold text-cozi-muted">Server IP</span>
      <code class="block break-words text-xl font-black leading-tight tracking-tight text-cozi-ink sm:text-2xl">{{ siteConfig.serverAddress }}</code>
      <small class="block text-xs font-extrabold text-cozi-muted">{{ siteConfig.minecraftVersion }}</small>
    </div>
    <button class="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-cozi-leaf-dark px-4 py-2.5 font-black text-white hover:bg-cozi-leaf sm:w-auto" type="button" @click="copyAddress">
      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" aria-hidden="true" />
      {{ copied ? 'Copied' : 'Copy IP' }}
    </button>
    <p v-if="copyFailed" class="m-0 text-sm text-amber-800 sm:col-span-2">
      Copy failed. Select the address above and copy it manually.
    </p>
  </div>
</template>
