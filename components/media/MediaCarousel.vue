<script setup lang="ts">
import type { Slide } from '~/data/media'

const props = defineProps<{ slides: Slide[]; label: string; ratio?: string }>()

const track = ref<HTMLElement>()
const index = ref(0)

function goTo(i: number) {
  const el = track.value
  if (!el) return
  const n = props.slides.length
  const target = (i + n) % n
  el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' })
}

function onScroll() {
  const el = track.value
  if (el) index.value = Math.round(el.scrollLeft / el.clientWidth)
}
</script>

<template>
  <div class="carousel" role="region" aria-roledescription="carousel" :aria-label="label" :style="{ aspectRatio: ratio }">
    <ul ref="track" class="track" @scroll.passive="onScroll">
      <li v-for="(s, i) in slides" :key="s.src" class="slide">
        <MediaSlide :slide="s" :eager="i === 0" />
      </li>
    </ul>
    <template v-if="slides.length > 1">
      <button class="arrow prev" aria-label="Previous slide" @click="goTo(index - 1)">&#8249;</button>
      <button class="arrow next" aria-label="Next slide" @click="goTo(index + 1)">&#8250;</button>
      <div class="dots">
        <button
          v-for="(s, i) in slides"
          :key="s.src"
          :class="{ active: i === index }"
          :aria-label="`Go to slide ${i + 1}`"
          :aria-current="i === index"
          @click="goTo(i)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.carousel { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background: var(--surface); }
.track {
  display: flex; height: 100%; margin: 0; padding: 0; list-style: none;
  overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
}
.track::-webkit-scrollbar { display: none; }
.slide { flex: 0 0 100%; height: 100%; scroll-snap-align: start; }

.arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 2.75rem; height: 2.75rem; border-radius: 50%;
  border: 0; cursor: pointer; font-size: 1.8rem; line-height: 1;
  color: var(--white); background: rgb(14 15 18 / 0.6);
}
.arrow:hover { background: var(--gold); color: var(--black); }
.prev { left: var(--space-2); }
.next { right: var(--space-2); }

.dots {
  position: absolute; bottom: var(--space-2); left: 50%; transform: translateX(-50%);
  display: flex; gap: 0.6rem;
}
.dots button {
  width: 0.7rem; height: 0.7rem; padding: 0; border-radius: 50%;
  border: 0; cursor: pointer; background: rgb(243 239 232 / 0.5);
}
.dots button.active { background: var(--red); box-shadow: 0 0 0 2px var(--white); }
</style>
