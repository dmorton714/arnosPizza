<script setup lang="ts">
import { site, fullAddress, hours, mapUrl } from '~/data/site'
</script>

<template>
  <footer class="footer">
    <div class="container row">
      <div class="contact">
        <a :href="mapUrl" target="_blank" rel="noopener">{{ fullAddress }}</a>
        <a :href="site.phoneHref">{{ site.phone }}</a>
      </div>
      <span class="copy">&copy; {{ new Date().getFullYear() }} {{ site.name }}</span>
      <div class="hours">
        <span v-for="h in hours" :key="h.days">{{ h.days }}: {{ h.time }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { padding-block: var(--space-2); border-top: 1px solid var(--border); background: var(--surface); font-size: 0.85rem; color: var(--muted); }
.row { display: grid; gap: 0.75rem; justify-items: center; text-align: center; }
.contact, .hours { display: flex; flex-direction: column; }
a { color: var(--muted); }
a:hover { color: var(--gold); }

/* desktop: contact left, copyright center, hours right */
@media (min-width: 48rem) {
  .row { grid-template-columns: 1fr auto 1fr; align-items: center; }
  .contact { justify-self: start; text-align: left; }
  .hours { justify-self: end; text-align: right; }
}
</style>
