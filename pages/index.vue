<script setup lang="ts">
import { site } from '~/data/site'
const title = `${site.name} | Pizza, Subs & Wings on Bardstown Road, ${site.city}`
const description = `${site.name} at ${site.street} in ${site.city}, ${site.region}. Pizza, specialty pies, subs, flatbread sandwiches, wings and salads. Dine in or carry out. Call ${site.phone}.`
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: absoluteUrl('/pizza1.jpg'), twitterTitle: title, twitterDescription: description })
</script>

<template>
  <HomeView />
</template>
