<script setup lang="ts">
defineProps<{ to?: string }>()
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="btn"><slot /></NuxtLink>
  <button v-else class="btn"><slot /></button>
</template>

<style scoped>
.btn {
  display: inline-block; padding: 0.8rem 1.6rem; border: 0; border-radius: 999px;
  background: var(--red); color: var(--white);
  font: 600 1rem var(--font-body); text-decoration: none; cursor: pointer;
  transition: background 0.2s;
}
.btn:hover { background: var(--gold); color: var(--black); }
.btn--ghost { background: transparent; box-shadow: inset 0 0 0 2px var(--white); }
</style>
