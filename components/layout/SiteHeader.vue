<script setup lang="ts">
import { site } from '~/data/site'
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header class="header">
    <div class="container bar">
      <SiteLogo />
      <div class="actions">
        <a :href="site.phoneHref" class="call">
          <span class="sr-only">Call to order: </span>{{ site.phone }}
        </a>
        <button
          class="burger"
          :aria-expanded="open"
          aria-controls="nav-menu"
          aria-label="Menu"
          @click="open = !open"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
    <NavMenu id="nav-menu" :open="open" />
  </header>
</template>

<style scoped>
.header {
  position: sticky; top: 0; z-index: 50;
  background: rgb(21 16 13 / 0.94);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.bar { height: var(--header-h); display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.actions { display: flex; align-items: center; gap: var(--space-1); }
.call {
  padding: 0.45rem 0.9rem; border-radius: 999px;
  background: var(--red); color: var(--white);
  font-weight: 700; text-decoration: none; white-space: nowrap;
}
.call:hover { background: var(--gold); color: var(--black); }
.burger {
  display: grid; gap: 5px; padding: 0.6rem;
  background: none; border: 0; cursor: pointer;
}
.burger span { width: 1.6rem; height: 2px; background: var(--white); }
</style>
