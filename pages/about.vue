<script setup lang="ts">
import { site } from '~/data/site'
const title = `About | ${site.name} ${site.city}`
const description = `${site.name} is a neighborhood pizza shop at ${site.street} in ${site.city}, ${site.region}, serving pizza, subs, wings and salads.`
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: absoluteUrl('/insideBar.jpg'), twitterTitle: title, twitterDescription: description })
</script>

<template>
  <AboutView />
</template>
