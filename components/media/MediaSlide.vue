<script setup lang="ts">
import type { Slide } from '~/data/media'
defineProps<{ slide: Slide; eager?: boolean }>()
</script>

<template>
  <video
    v-if="slide.type === 'video'"
    :src="asset(slide.src)"
    :poster="slide.poster && asset(slide.poster)"
    :aria-label="slide.alt"
    autoplay muted loop playsinline preload="metadata"
  />
  <img v-else :src="asset(slide.src)" :alt="slide.alt" :loading="eager ? 'eager' : 'lazy'" decoding="async" />
</template>

<style scoped>
img, video { width: 100%; height: 100%; object-fit: cover; }
</style>
