<script setup lang="ts">
import { navLinks } from '~/data/nav'
defineProps<{ open: boolean }>()
</script>

<template>
  <nav class="menu" :class="{ open }" aria-label="Main">
    <ul>
      <li v-for="l in navLinks" :key="l.to">
        <NuxtLink :to="l.to" :tabindex="open ? 0 : -1">{{ l.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu {
  position: absolute; top: 100%; right: 0;
  width: min(20rem, 100%);
  background: var(--surface);
  border: 1px solid var(--border); border-top: 0;
  visibility: hidden; opacity: 0; transform: translateY(-0.5rem);
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
}
.menu.open { visibility: visible; opacity: 1; transform: none; }
ul { list-style: none; margin: 0; padding: var(--space-1) 0; }
a {
  display: block; padding: 0.85rem var(--space-3);
  color: var(--white); text-decoration: none; font-size: 1.1rem;
}
a:hover, a.router-link-active { color: var(--gold); background: var(--surface-2); }
</style>
