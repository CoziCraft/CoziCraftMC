<script setup lang="ts">
const copied = ref(false)
const copyFailed = ref(false)

function copyWithSelectionFallback() {
  const input = document.createElement('textarea')
  input.value = siteConfig.serverAddress
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.opacity = '0'
  document.body.appendChild(input)
  input.select()

  const didCopy = document.execCommand('copy')
  input.remove()
  return didCopy
}

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
    try {
      copied.value = copyWithSelectionFallback()
      copyFailed.value = !copied.value
    }
    catch {
      copyFailed.value = true
    }
  }
}
</script>

<template>
  <div class="rounded-2xl border border-cozi-line bg-[linear-gradient(135deg,rgba(43,28,61,0.92),rgba(21,29,62,0.92))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:p-[1.125rem]" aria-live="polite">
    <div class="mb-2.5 flex items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-cozi-jade-soft">
      <span class="inline-flex items-center gap-2"><Icon name="lucide:radio-tower" aria-hidden="true" />Ready to join?</span>
      <span class="rounded-full bg-cozi-jade-soft px-2.5 py-1 text-cozi-night">{{ siteConfig.minecraftVersion }}</span>
    </div>
    <div class="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto]">
      <code class="flex min-h-12 min-w-0 items-center overflow-hidden rounded-xl border border-cozi-jade-soft/25 bg-cozi-night/45 px-3.5 text-sm font-bold text-cozi-cream sm:text-base">{{ siteConfig.serverAddress }}</code>
      <button class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-0 bg-cozi-pink px-4 text-xs font-bold uppercase tracking-[0.07em] text-cozi-night transition hover:bg-cozi-amber" type="button" @click="copyAddress">
        <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" aria-hidden="true" />
        {{ copied ? 'Copied' : 'Copy address' }}
      </button>
    </div>
    <p v-if="copyFailed" class="mb-0 mt-2 text-xs font-bold text-cozi-amber-soft">Copy failed. Select the address and copy it manually.</p>
    <p v-else-if="copied" class="mb-0 mt-2 text-xs font-bold text-cozi-jade-soft">The server address is ready to paste.</p>
  </div>
</template>
