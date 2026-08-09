<script setup lang="ts">
import { motion } from 'motion-v'

const runtimeConfig = useRuntimeConfig()
const discordUrl = computed(() => cleanOptionalUrl(runtimeConfig.public.discordUrl))

const { data: latestNews } = await useAsyncData('home-latest-news', () => {
  return queryCollection('news').order('date', 'DESC').limit(1).all()
})

const latestPost = computed(() => latestNews.value?.[0])

const adventures = [
  { title: 'Build homes', description: 'Cottages, workshops, bridges, and one very ambitious roof.', to: '/wiki/getting-started', icon: 'lucide:house' },
  { title: 'Grow farms', description: 'Plant crops, keep bees, and make every path a little prettier.', to: '/wiki/economy', icon: 'lucide:wheat' },
  { title: 'Fish RPG', description: 'Level up your fishing with PyroFishing, rare catches, and new rewards.', to: '/wiki/economy', icon: 'lucide:fish' },
  { title: 'Go mining', description: 'Pack snacks, light the caves, and bring something shiny home.', to: '/wiki/commands', icon: 'lucide:pickaxe' },
]

const helpfulLinks = [
  { title: 'Quick answers', description: 'Joining, versions, editing, and store questions.', to: '/faq', label: 'Open the FAQ', icon: 'lucide:circle-help' },
  { title: 'Play fair', description: 'A short guide to kind play, builds, trading, and chat.', to: '/rules', label: 'Read the rules', icon: 'lucide:scroll-text' },
  { title: 'Visit the store', description: 'See the current store status and future Tebex details.', to: '/store', label: 'Store details', icon: 'lucide:shopping-bag' },
]

useSeoMeta({
  title: 'CoziCraft - Cute Minecraft Java Survival',
  description: siteConfig.description,
  ogImage: '/images/lantern-village.webp',
})
</script>

<template>
  <div>
    <section class="container-cozi grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(390px,0.82fr)] lg:gap-[clamp(2.5rem,6vw,5.4rem)] lg:py-20">
      <motion.figure
        class="relative order-1 m-0 min-w-0 lg:-rotate-[0.35deg]"
        :initial="{ y: 18, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.4 }"
      >
        <div class="relative min-h-[315px] overflow-hidden rounded-[28px_28px_28px_9px] border-2 border-cozi-cream/80 bg-cozi-navy shadow-cozi sm:min-h-[520px] lg:min-h-[570px]">
          <img class="absolute inset-0 size-full object-cover" src="/images/lantern-village.webp" width="1586" height="992" alt="A lantern-lit Minecraft village with cherry trees, flower-covered block houses, cats, foxes, bees, and a moonlit lake.">
          <span class="absolute top-3 left-3 rounded-full border border-white/20 bg-cozi-plum/85 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.1em] text-cozi-pink backdrop-blur sm:top-5 sm:left-5">Cherry village · map tile 004</span>
          <span class="absolute top-5 right-5 hidden rounded-full border border-white/20 bg-cozi-night/75 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.1em] text-cozi-jade-soft backdrop-blur sm:block">Spawn → lantern square</span>
          <figcaption class="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-4 rounded-2xl border border-white/15 bg-cozi-night/85 px-4 py-3 backdrop-blur sm:right-5 sm:bottom-5 sm:left-5 sm:px-5 sm:py-4">
            <span>
              <strong class="block font-display text-lg font-black leading-tight text-cozi-cream sm:text-2xl">Follow the lights home.</strong>
              <span class="hidden text-xs text-cozi-muted sm:block">Cherry roofs, cozy shops, pets, and paths worth wandering.</span>
            </span>
            <b class="hidden shrink-0 text-[0.62rem] font-black uppercase tracking-[0.12em] text-cozi-amber md:block">Build · farm · roam</b>
          </figcaption>
        </div>
      </motion.figure>

      <motion.div
        class="order-2 min-w-0"
        :initial="{ y: 18, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.4, delay: 0.08 }"
      >
        <p class="eyebrow mb-4">CoziCraft · cute Java survival</p>
        <h1 class="display-title m-0 max-w-[9ch] text-[clamp(3.7rem,16vw,5rem)] sm:text-7xl lg:text-[clamp(4.4rem,6.5vw,7.5rem)]">Your next <em class="not-italic text-cozi-pink [text-shadow:0_10px_35px_rgba(238,159,200,0.22)]">little world.</em></h1>
        <p class="mt-6 mb-0 max-w-xl text-base font-medium leading-7 text-cozi-muted sm:text-lg">{{ siteConfig.tagline }}</p>
        <div class="my-6 flex flex-wrap gap-3">
          <NuxtLink class="btn-primary" to="/play"><Icon name="lucide:gamepad-2" aria-hidden="true" />Start your adventure</NuxtLink>
          <NuxtLink class="btn-secondary" to="/wiki"><Icon name="lucide:book-open" aria-hidden="true" />Browse the wiki</NuxtLink>
        </div>
        <CopyServerAddress />
      </motion.div>
    </section>

    <section class="container-cozi py-16 sm:py-24" aria-labelledby="adventures-title">
      <div class="mb-8 grid items-end gap-4 md:grid-cols-[1fr_minmax(280px,0.55fr)] md:gap-9">
        <div>
          <p class="m-0 text-[0.68rem] font-black uppercase tracking-[0.14em] text-cozi-pink">Choose your next little project</p>
          <h2 id="adventures-title" class="display-title mt-2 mb-0 max-w-[12ch] text-5xl sm:text-7xl">Make the night yours.</h2>
        </div>
        <p class="m-0 text-cozi-muted">Start small or build a whole district. The useful pages stay close when you need a rule, command, or new route.</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <NuxtLink
          v-for="(adventure, index) in adventures"
          :key="adventure.title"
          class="group min-h-48 rounded-2xl border border-cozi-line p-5 no-underline transition hover:-translate-y-1 hover:border-cozi-amber"
          :class="['bg-[#2c214d]', 'bg-[#173c4b]', 'bg-[#4a2947]', 'bg-[#22385a]', 'bg-[#3d294d]'][index]"
          :to="adventure.to"
        >
          <span class="mb-8 grid size-11 place-items-center rounded-xl bg-cozi-amber text-xl text-cozi-night transition group-hover:bg-cozi-amber-soft">
            <Icon :name="adventure.icon" aria-hidden="true" />
          </span>
          <h3 class="m-0 font-display text-2xl font-black leading-tight text-cozi-cream">{{ adventure.title }}</h3>
          <p class="mt-2 mb-0 text-sm leading-6 text-cozi-muted">{{ adventure.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="container-cozi grid items-center gap-9 rounded-[30px] border border-cozi-amber-soft/20 bg-[linear-gradient(135deg,#21142f,#151d3e_60%,#17353d)] p-5 shadow-cozi sm:p-10 lg:grid-cols-[minmax(280px,0.6fr)_minmax(0,1.4fr)] lg:p-14" aria-labelledby="atlas-title">
      <div>
        <p class="m-0 text-[0.68rem] font-black uppercase tracking-[0.14em] text-cozi-pink">A little atlas corner</p>
        <h2 id="atlas-title" class="display-title mt-2 mb-0 max-w-[9ch] text-5xl sm:text-7xl">Keep the route. Lose the rush.</h2>
        <p class="mt-5 text-cozi-muted">Use the wiki for a clear first path, the FAQ for a quick answer, and the rules when you want to be a good neighbor.</p>
        <div class="mt-5 flex flex-wrap gap-2">
          <NuxtLink class="rounded-full bg-cozi-cream px-3 py-1.5 text-xs font-black uppercase text-cozi-night no-underline" to="/wiki">Wiki</NuxtLink>
          <NuxtLink class="rounded-full bg-cozi-cream px-3 py-1.5 text-xs font-black uppercase text-cozi-night no-underline" to="/faq">FAQ</NuxtLink>
          <NuxtLink class="rounded-full bg-cozi-cream px-3 py-1.5 text-xs font-black uppercase text-cozi-night no-underline" to="/rules">Rules</NuxtLink>
        </div>
      </div>
      <figure class="relative m-0 min-h-64 overflow-hidden rounded-[22px_22px_22px_7px] border-2 border-cozi-cream/75 bg-cozi-night shadow-2xl sm:min-h-80 lg:rotate-[0.7deg]">
        <img class="absolute inset-0 size-full object-cover" src="/images/moonlit-route-map.webp" width="1586" height="992" alt="A moonlit Minecraft map with a lantern path from a cozy spawn village to a cherry village beside a lake.">
        <figcaption class="absolute top-4 right-4 rounded-lg border border-cozi-pink bg-cozi-night/75 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.1em] text-cozi-pink backdrop-blur">Moonlit route</figcaption>
      </figure>
    </section>

    <section id="discord" class="container-cozi mt-16 grid scroll-mt-28 items-center gap-6 overflow-hidden rounded-[30px] border border-cozi-pink/40 bg-[radial-gradient(circle_at_5%_20%,rgba(185,154,233,0.32),transparent_19rem),linear-gradient(135deg,#32204a,#1a2148_58%,#123642)] p-6 shadow-cozi sm:mt-24 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-12 lg:p-14" aria-labelledby="discord-title">
      <span class="grid size-24 place-items-center rounded-[28px_28px_28px_9px] border-2 border-white/50 bg-[#5865f2] text-5xl text-white shadow-[0_18px_45px_rgba(88,101,242,0.3)] sm:size-32 sm:text-6xl" aria-hidden="true">
        <Icon name="simple-icons:discord" />
      </span>
      <div>
        <p class="m-0 text-[0.68rem] font-black uppercase tracking-[0.14em] text-cozi-jade-soft">The CoziCraft community</p>
        <h2 id="discord-title" class="display-title mt-2 mb-0 text-5xl sm:text-7xl">Join us on Discord.</h2>
        <p class="mt-4 mb-0 max-w-3xl text-cozi-muted">Share your builds, find event times, ask a quick question, or say hello before you join the server.</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="perk in ['Build screenshots', 'Event notices', 'Player help', 'Community chat']" :key="perk" class="rounded-full border border-white/15 bg-cozi-night/30 px-3 py-1 text-xs font-bold text-cozi-cream">{{ perk }}</span>
        </div>
      </div>
      <div class="grid gap-2 lg:min-w-52 lg:justify-items-end">
        <a v-if="discordUrl" class="btn-primary w-full bg-cozi-pink hover:bg-cozi-amber" :href="discordUrl" rel="noopener noreferrer" target="_blank"><Icon name="simple-icons:discord" aria-hidden="true" />Join Discord</a>
        <NuxtLink v-else class="btn-primary w-full bg-cozi-pink hover:bg-cozi-amber" to="/contact"><Icon name="simple-icons:discord" aria-hidden="true" />Invite coming soon</NuxtLink>
        <span class="text-xs text-cozi-muted lg:text-right">Community news will appear here when the public invite is ready.</span>
      </div>
    </section>

    <section class="container-cozi py-16 sm:py-24" aria-labelledby="helpful-title">
      <div class="mb-8">
        <p class="m-0 text-[0.68rem] font-black uppercase tracking-[0.14em] text-cozi-jade">Useful, close by</p>
        <h2 id="helpful-title" class="display-title mt-2 mb-0 text-5xl sm:text-7xl">One more lantern.</h2>
      </div>
      <div class="grid gap-3 md:grid-cols-3">
        <article v-if="latestPost" class="rounded-2xl border border-cozi-line bg-white/[0.045] p-6">
          <Icon class="text-2xl text-cozi-jade" name="lucide:newspaper" aria-hidden="true" />
          <p class="mt-6 mb-0 text-[0.65rem] font-black uppercase tracking-[0.12em] text-cozi-jade">Latest update</p>
          <h3 class="mt-2 mb-0 font-display text-2xl font-black text-cozi-cream">{{ latestPost.title }}</h3>
          <p class="mt-2 text-sm text-cozi-muted">{{ latestPost.description }}</p>
          <NuxtLink class="text-xs font-black uppercase tracking-wider text-cozi-amber" :to="latestPost.path">Read update</NuxtLink>
        </article>
        <NuxtLink v-for="link in helpfulLinks.slice(0, latestPost ? 2 : 3)" :key="link.to" class="rounded-2xl border border-cozi-line bg-white/[0.045] p-6 no-underline transition hover:-translate-y-1 hover:border-cozi-amber" :to="link.to">
          <Icon class="text-2xl text-cozi-jade" :name="link.icon" aria-hidden="true" />
          <h3 class="mt-6 mb-0 font-display text-2xl font-black text-cozi-cream">{{ link.title }}</h3>
          <p class="mt-2 text-sm text-cozi-muted">{{ link.description }}</p>
          <span class="text-xs font-black uppercase tracking-wider text-cozi-amber">{{ link.label }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
