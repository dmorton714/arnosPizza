<script setup lang="ts">
import { money, type MenuSection } from '~/data/menu'
defineProps<{ section: MenuSection }>()
</script>

<template>
  <section :id="section.id" class="block" :aria-labelledby="`${section.id}-title`">
    <img v-if="section.image" :src="asset(section.image.src)" :alt="section.image.alt" class="photo" loading="lazy" decoding="async">
    <h2 :id="`${section.id}-title`">{{ section.title }}</h2>
    <p v-if="section.blurb" class="blurb">{{ section.blurb }}</p>
    <div class="scroll">
      <table>
        <thead>
          <tr>
            <th scope="col"><span class="sr-only">Item</span></th>
            <th v-for="s in section.sizes" :key="s" scope="col" class="price">{{ s }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in section.items" :key="item.name">
            <th scope="row">
              <span class="name">{{ item.name }}</span>
              <span v-if="item.desc" class="desc">{{ item.desc }}</span>
            </th>
            <td v-for="(p, i) in item.prices" :key="i" class="price">{{ money(p) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-for="n in section.notes" :key="n" class="note">{{ n }}</p>
  </section>
</template>

<style scoped>
.block { padding-block: var(--space-4); border-top: 1px solid var(--border); }
.block:first-of-type { border-top: 0; }
.photo {
  width: 100%; aspect-ratio: 16 / 9; object-fit: cover;
  border-radius: var(--radius); margin-bottom: var(--space-3);
}
@media (min-width: 48rem) { .photo { aspect-ratio: 21 / 8; } }
h2 { color: var(--gold); margin-bottom: var(--space-1); }
.blurb { margin-bottom: var(--space-2); }
.scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead th { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); font-weight: 600; padding-bottom: 0.4rem; }
tbody th, td { padding: 0.75rem 0; border-bottom: 1px dashed var(--border); vertical-align: top; }
tbody th { text-align: left; font-weight: normal; padding-right: var(--space-2); }
.name { display: block; font-weight: 700; font-size: 1.05rem; }
.desc { display: block; color: var(--muted); font-size: 0.92rem; }
.price { text-align: right; white-space: nowrap; width: 5.5rem; padding-left: 0.5rem; }
td.price { font-weight: 700; font-variant-numeric: tabular-nums; }
.note { margin: var(--space-2) 0 0; font-size: 0.95rem; }
@media (max-width: 30rem) {
  .price { width: 3.9rem; padding-left: 0.25rem; font-size: 0.92rem; }
  tbody th { padding-right: 0.5rem; }
}
</style>
