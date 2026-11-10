<script setup lang="ts">
import { reviews } from '~/data/reviews'

const track = ref<HTMLElement>()

// Scroll by one card width in either direction, wrapping at the ends.
function step(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('li')
  const by = card ? card.getBoundingClientRect().width + 16 : el.clientWidth
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
  const atStart = el.scrollLeft <= 4
  if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
  else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
  else el.scrollBy({ left: dir * by, behavior: 'smooth' })
}
</script>

<template>
  <section id="reviews" class="section section--red" aria-labelledby="reviews-title">
    <div class="container">
      <div class="head">
        <div>
          <p class="eyebrow">Reviews</p>
          <h2 id="reviews-title">What our customers say</h2>
        </div>
        <div class="arrows">
          <button aria-label="Previous reviews" @click="step(-1)">&#8249;</button>
          <button aria-label="Next reviews" @click="step(1)">&#8250;</button>
        </div>
      </div>
      <ul ref="track" class="track" role="region" aria-roledescription="carousel" aria-label="Customer reviews" tabindex="0">
        <li v-for="r in reviews" :key="r.text" class="card">
          <p v-if="r.stars" class="stars" :aria-label="`${r.stars} out of 5 stars`">{{ '★'.repeat(r.stars) }}</p>
          <blockquote>
            <p v-for="(para, i) in r.text.split(/\n\s*\n/)" :key="i">{{ para }}</p>
          </blockquote>
          <p class="who">{{ r.name ? `${r.name} · ` : '' }}{{ r.source }} review</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.head { display: flex; align-items: end; justify-content: space-between; gap: var(--space-2); margin-bottom: var(--space-3); }
.head h2 { margin: 0; }
.arrows { display: flex; gap: 0.5rem; }
.arrows button {
  width: 2.75rem; height: 2.75rem; border-radius: 50%; border: 0; cursor: pointer;
  font-size: 1.8rem; line-height: 1; color: var(--white); background: rgb(0 0 0 / 0.3);
}
.arrows button:hover { background: var(--gold); color: var(--black); }

.track {
  display: flex; gap: 1rem; margin: 0; padding: 0 0 0.5rem; list-style: none;
  overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
}
.track::-webkit-scrollbar { display: none; }
/* 1 card on phones, 2 on tablets, 3 on desktop */
.card {
  flex: 0 0 100%; scroll-snap-align: start;
  display: flex; flex-direction: column;
  background: var(--black); border-radius: var(--radius); padding: var(--space-3);
}
@media (min-width: 40rem) { .card { flex-basis: calc((100% - 1rem) / 2); } }
@media (min-width: 64rem) { .card { flex-basis: calc((100% - 2rem) / 3); } }
.stars { margin: 0 0 var(--space-1); color: var(--gold); letter-spacing: 0.15em; }
blockquote { margin: 0 0 var(--space-2); flex: 1; }
blockquote p { margin: 0 0 0.75rem; font-size: 1.05rem; line-height: 1.5; color: var(--white); }
blockquote p:last-child { margin-bottom: 0; }
/* long reviews scroll inside the card so every card stays the same height */
.card { max-height: 26rem; }
blockquote { overflow-y: auto; }
.who { margin: 0; font-size: 0.85rem; color: var(--muted); }
</style>
