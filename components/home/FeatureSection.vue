<script setup lang="ts">
import type { Slide } from '~/data/media'
defineProps<{ id: string; title: string; text: string; to: string; slides: Slide[]; tone?: 'alt' | 'red'; flip?: boolean }>()
</script>

<template>
  <section :id="id" class="split" :class="[tone && `section--${tone}`, { flip }]" :aria-labelledby="`${id}-title`">
    <MediaCarousel :slides="slides" :label="`${title} photos`" ratio="16 / 9" class="media" />
    <div class="copy">
      <h2 :id="`${id}-title`">{{ title }}</h2>
      <p>{{ text }}</p>
      <slot />
      <BaseButton :to="to">See prices<span class="sr-only"> for {{ title }}</span></BaseButton>
    </div>
  </section>
</template>

<style scoped>
/* photo runs edge to edge: full width on phones, full section height on desktop */
.split { display: grid; }
.copy { padding: var(--space-3) clamp(1rem, 4vw, 3rem); max-width: 40rem; }
@media (min-width: 48rem) {
  .split { grid-template-columns: 1fr 1fr; min-height: 600px; }
  /* contain:size stops the tall photos from setting the row height; they fill whatever the text needs */
  .media { aspect-ratio: auto !important; contain: size; }
  .copy { align-self: center; padding-block: var(--space-3); }
  .flip .media { order: 2; }
}
</style>
