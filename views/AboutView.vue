<script setup lang="ts">
import { about } from '~/data/about'
import { placeSlides } from '~/data/media'
</script>

<template>
  <section class="section" aria-labelledby="about-title">
    <div class="container split">
      <div class="copy">
        <p class="eyebrow">About Arno Pizza</p>
        <h1 id="about-title">{{ about.title }}</h1>
        <p v-for="p in about.story" :key="p">{{ p }}</p>
        <div class="ctas">
          <BaseButton to="/menu">See the menu</BaseButton>
          <NuxtLink to="/contact" class="ghost">Contact us</NuxtLink>
        </div>
      </div>
      <MediaCarousel :slides="[...placeSlides].reverse()" label="Inside and outside Arno Pizza" ratio="4 / 3" class="media" />
    </div>
  </section>
</template>

<style scoped>
.split { display: grid; gap: var(--space-4); align-items: center; }
@media (min-width: 48rem) { .split { grid-template-columns: 1fr 1fr; } }
.media { border-radius: var(--radius); }
.copy { max-width: 36rem; }
.ctas { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-3); }
.ghost {
  display: inline-block; padding: 0.8rem 1.6rem; border-radius: 999px;
  color: var(--white); font-weight: 600; text-decoration: none;
  box-shadow: inset 0 0 0 2px var(--white);
}
.ghost:hover { background: var(--gold); color: var(--black); box-shadow: none; }
</style>
