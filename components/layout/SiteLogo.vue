<template>
  <NuxtLink to="/" class="logo" aria-label="Arno Pizza home">
    <span class="arno">ARNO</span>
    <span class="pizza">PIZZA</span>
  </NuxtLink>
</template>

<style scoped>
/* text logo: red ARNO over green PIZZA */
.logo {
  display: inline-flex; flex-direction: column; align-items: stretch;
  font-family: var(--font-head); line-height: 0.95; text-decoration: none;
}
.arno {
  font-size: 1.35rem; letter-spacing: 0.12em;
  color: var(--red);
}
.pizza { font-size: 1rem; letter-spacing: 0.32em; color: var(--green); }
</style>
