<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <div class="relative aspect-[4/3] min-h-[260px] w-full min-w-0 overflow-hidden rounded-lg border border-cozi-line bg-[linear-gradient(180deg,#fefced_0%,#fefae0_58%,#e9edc9_100%)] shadow-cozi sm:aspect-[16/10] sm:min-h-[360px] lg:min-h-[500px]" role="img" aria-label="Stylized CoziCraft server scene">
    <div class="absolute right-[10%] top-[10%] size-16 rounded-full bg-cornsilk-300 shadow-[0_0_0_18px_rgba(248,220,39,0.20)] sm:size-24 sm:shadow-[0_0_0_28px_rgba(248,220,39,0.16)]" />
    <div class="absolute left-[12%] top-[16%] h-5 w-24 rounded-full bg-cornsilk-900/80 shadow-[42px_16px_0_rgba(255,254,249,0.58)] sm:w-32" />
    <div class="absolute bottom-[28%] left-[-12%] h-[34%] w-[78%] rounded-t-full bg-tea-green-500" />
    <div class="absolute bottom-[15%] right-[-18%] h-[34%] w-[86%] rounded-t-full bg-tea-green-200" />

    <motion.div
      class="absolute bottom-[23%] left-[12%]"
      :initial="{ y: 12 }"
      :animate="{ y: 0 }"
      :transition="{ duration: 0.34 }"
    >
      <div class="mx-auto h-0 w-0 border-x-[58px] border-b-[42px] border-x-transparent border-b-light-bronze-300 sm:border-x-[82px] sm:border-b-[60px]" />
      <div class="mx-auto grid min-h-[72px] w-[96px] grid-cols-2 gap-2 border-4 border-light-bronze-200 bg-light-bronze-500 p-3 sm:min-h-[92px] sm:w-[136px] sm:gap-3 sm:p-4">
        <span class="border-[3px] border-light-bronze-200 bg-cozi-paper" />
        <span class="border-[3px] border-light-bronze-200 bg-cozi-paper" />
      </div>
    </motion.div>

    <div class="absolute bottom-[17%] left-[52%] h-[30%] w-[14%] rotate-12 rounded-t-full bg-cozi-gold/45" />

    <div class="absolute bottom-[18%] right-[14%] hidden sm:block">
      <div class="mx-auto h-14 w-6 bg-light-bronze-200" />
      <div class="-mt-24 grid grid-cols-3 gap-1">
        <span class="size-9 bg-tea-green-200" />
        <span class="size-9 bg-tea-green-300" />
        <span class="size-9 bg-tea-green-200" />
        <span class="size-9 bg-tea-green-300" />
        <span class="size-9 bg-tea-green-200" />
        <span class="size-9 bg-tea-green-300" />
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 grid grid-cols-8 border-t-4 border-tea-green-200">
      <span class="h-12 bg-tea-green-400 sm:h-16" />
      <span class="h-12 bg-tea-green-300 sm:h-16" />
      <span class="h-12 bg-beige-400 sm:h-16" />
      <span class="h-12 bg-tea-green-200 sm:h-16" />
      <span class="h-12 bg-tea-green-400 sm:h-16" />
      <span class="h-12 bg-beige-300 sm:h-16" />
      <span class="h-12 bg-tea-green-200 sm:h-16" />
      <span class="h-12 bg-tea-green-400 sm:h-16" />
    </div>
  </div>
</template>
