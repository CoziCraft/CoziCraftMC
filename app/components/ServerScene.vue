<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <div class="relative min-h-[280px] overflow-hidden rounded-lg border border-cozi-line bg-gradient-to-b from-sky-200 via-lime-50 to-lime-200 shadow-cozi sm:min-h-[420px]" aria-label="Stylized CoziCraft server scene">
    <div class="absolute right-10 top-9 size-20 rounded-full bg-yellow-300 shadow-[0_0_0_18px_rgba(241,207,101,0.2)]" />
    <div class="absolute bottom-[26%] right-[24%] h-[42%] w-[72%] rounded-t-full bg-lime-300" />
    <div class="absolute bottom-0 right-[-8%] h-[42%] w-[72%] rounded-t-full bg-cozi-leaf" />

    <motion.div
      class="absolute bottom-[18%] left-[14%] w-[150px]"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.34 }"
    >
      <div class="mx-auto h-0 w-0 border-x-[82px] border-b-[60px] border-x-transparent border-b-[#8f6a45]" />
      <div class="mx-auto grid min-h-[88px] w-[130px] grid-cols-2 gap-3 border-4 border-[#6b4d32] bg-[#dcb879] p-4">
        <span class="border-[3px] border-[#6b4d32] bg-cozi-soft" />
        <span class="border-[3px] border-[#6b4d32] bg-cozi-soft" />
      </div>
    </motion.div>

    <div class="absolute bottom-[-18%] left-[36%] h-[52%] w-[26%] rotate-12 rounded-t-full bg-cozi-gold/40" />
    <div class="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md border border-cozi-ink/15 bg-cozi-paper/85 px-3 py-2 text-sm font-extrabold text-cozi-muted">
      <Icon name="lucide:image-plus" aria-hidden="true" />
      Future screenshot slot
    </div>
  </div>
</template>
