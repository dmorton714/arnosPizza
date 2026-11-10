<script setup lang="ts">
import type { Slide } from '~/data/media'
import { site } from '~/data/site'
defineProps<{ slides: Slide[]; title: string; label: string; tagline?: string }>()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <MediaCarousel :slides="slides" :label="label" ratio="auto" />
    <div class="overlay">
      <h1 id="hero-title">{{ title }}</h1>
      <p v-if="tagline" class="tagline">{{ tagline }}</p>
      <div class="ctas">
        <BaseButton to="/menu">See the menu</BaseButton>
        <a :href="site.phoneHref" class="btn-call">Call {{ site.phone }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; }
/* full viewport minus the sticky header; svh avoids the mobile URL-bar jump */
.hero :deep(.carousel) { height: calc(100vh - var(--header-h)); height: calc(100svh - var(--header-h)); min-height: 26rem; }
.hero :deep(.carousel)::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(0deg, rgb(21 16 13 / 0.85) 0%, rgb(21 16 13 / 0.2) 55%, transparent 100%);
}
.overlay {
  position: absolute; inset: auto 0 3.5rem 0; z-index: 1;
  padding-inline: clamp(1rem, 4vw, 3rem);
  pointer-events: none; /* keep arrows and dots clickable */
}
h1 { max-width: 40rem; text-shadow: 0 2px 12px rgb(0 0 0 / 0.7); }
.tagline { max-width: 34rem; color: var(--cream); font-size: 1.15rem; text-shadow: 0 1px 8px rgb(0 0 0 / 0.8); }
.ctas { display: flex; flex-wrap: wrap; gap: var(--space-1); pointer-events: auto; }
.btn-call {
  display: inline-block; padding: 0.8rem 1.6rem; border-radius: 999px;
  color: var(--white); font-weight: 600; text-decoration: none;
  box-shadow: inset 0 0 0 2px var(--white); background: rgb(0 0 0 / 0.3);
}
.btn-call:hover { background: var(--gold); color: var(--black); box-shadow: none; }
</style>
