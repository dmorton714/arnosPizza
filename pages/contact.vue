<script setup lang="ts">
import { site, fullAddress, hours } from '~/data/site'
const title = `Contact Us | ${site.name} ${site.city}`
const description = `Call ${site.name} at ${site.phone} or visit us at ${fullAddress}. Hours: ${hours.map((h) => `${h.days} ${h.time}`).join(', ')}.`
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: absoluteUrl('/outsideRestraunt.jpg'), twitterTitle: title, twitterDescription: description })
</script>

<template>
  <VisitSection heading="h1" title="Contact Us" />
</template>
