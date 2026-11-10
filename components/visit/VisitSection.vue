<script setup lang="ts">
import { placeSlides } from '~/data/media'
import { site, fullAddress, hours, mapUrl } from '~/data/site'
defineProps<{ heading?: 'h1' | 'h2'; title?: string }>()
</script>

<template>
  <section id="visit" class="split section--alt" aria-labelledby="visit-title">
      <div class="copy">
        <p class="eyebrow">Dine in · Carry out</p>
        <component :is="heading ?? 'h2'" id="visit-title">{{ title ?? 'Hours & Location' }}</component>
        <address>
          <a :href="mapUrl" target="_blank" rel="noopener">{{ fullAddress }}</a>
        </address>
        <p class="phone"><a :href="site.phoneHref">{{ site.phone }}</a></p>
        <dl>
          <template v-for="h in hours" :key="h.days">
            <dt>{{ h.days }}</dt>
            <dd>{{ h.time }}</dd>
          </template>
        </dl>
        <div class="ctas">
          <a :href="site.phoneHref" class="pill solid">Call to order</a>
          <a :href="mapUrl" target="_blank" rel="noopener" class="pill ghost">Get directions</a>
        </div>
      </div>
      <MediaCarousel :slides="placeSlides" label="Arno Pizza restaurant photos" ratio="16 / 9" class="media" />
  </section>
</template>

<style scoped>
/* photo runs edge to edge: full width on phones, full section height on desktop */
.split { display: grid; }
.copy { padding: var(--space-3) clamp(1rem, 4vw, 3rem); }
@media (min-width: 48rem) {
  .split { grid-template-columns: 1fr 1fr; min-height: 600px; }
  /* contain:size stops the tall photos from setting the row height; they fill whatever the text needs */
  .media { aspect-ratio: auto !important; contain: size; }
  .copy { align-self: center; padding-block: var(--space-3); }
}
address { font-style: normal; font-size: 1.15rem; }
address a { color: var(--white); }
.phone { margin: var(--space-1) 0 var(--space-3); font-size: 1.5rem; font-weight: 700; }
.phone a { color: var(--gold); text-decoration: none; }
dl { display: grid; grid-template-columns: auto 1fr; gap: 0.4rem var(--space-3); margin: 0 0 var(--space-3); }
dt { font-weight: 600; }
dd { margin: 0; color: var(--muted); }
.ctas { display: flex; flex-wrap: wrap; gap: var(--space-1); }
.pill {
  display: inline-block; padding: 0.8rem 1.6rem; border-radius: 999px;
  color: var(--white); font-weight: 600; text-decoration: none;
}
.solid { background: var(--red); }
.ghost { box-shadow: inset 0 0 0 2px var(--white); }
.pill:hover { background: var(--gold); color: var(--black); box-shadow: none; }
</style>
