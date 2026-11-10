<script setup lang="ts">
import { menu } from '~/data/menu'
import { site } from '~/data/site'
</script>

<template>
  <section class="section" aria-labelledby="menu-title">
    <div class="container narrow">
      <p class="eyebrow">Arno Pizza</p>
      <h1 id="menu-title">Menu</h1>
      <p>Call <a :href="site.phoneHref">{{ site.phone }}</a> to order for pick-up, or come dine in.</p>
      <nav class="jump" aria-label="Menu sections">
        <a v-for="s in menu" :key="s.id" :href="`#${s.id}`">{{ s.title }}</a>
      </nav>
      <MenuSection v-for="s in menu" :key="s.id" :section="s" />
      <p class="fine">Prices subject to change.</p>
    </div>
  </section>
</template>

<style scoped>
.jump { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: var(--space-3) 0 var(--space-2); }
.jump a {
  padding: 0.4rem 0.9rem; border-radius: 999px; border: 1px solid var(--border);
  color: var(--white); text-decoration: none; font-size: 0.95rem;
}
.jump a:hover { background: var(--gold); color: var(--black); border-color: var(--gold); }
.fine { font-size: 0.85rem; margin-top: var(--space-3); }
</style>
