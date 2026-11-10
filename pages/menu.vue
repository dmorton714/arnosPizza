<script setup lang="ts">
import { site } from '~/data/site'
const title = `Menu & Prices | ${site.name} ${site.city}`
const description = `${site.name} menu with prices: cheese and specialty pizza, subs and flatbread sandwiches, wings, sides and salads. ${site.street}, ${site.city}, ${site.region}.`
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: absoluteUrl('/cheese.jpg'), twitterTitle: title, twitterDescription: description })
</script>

<template>
  <MenuView />
</template>
