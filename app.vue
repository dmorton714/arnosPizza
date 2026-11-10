<script setup lang="ts">
import { site, hours, fullAddress } from '~/data/site'
import { menu } from '~/data/menu'
import { joinURL } from 'ufo'

const route = useRoute()
const siteConfig = useSiteConfig()
const siteRoot = absoluteUrl('/') // resolve once during setup; composables can't run inside the computed below
const pageUrl = computed(() => joinURL(siteRoot, route.path))

// Restaurant details for Google: name, address, phone, hours and the full menu with prices.
// Built from data/site.ts and data/menu.ts, so it stays in sync when prices change.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${absoluteUrl('/')}#restaurant`,
  name: site.name,
  description: siteConfig.description,
  url: absoluteUrl('/'),
  telephone: site.phone,
  image: [absoluteUrl('/outsideRestraunt.jpg'), absoluteUrl('/pizza1.jpg'), absoluteUrl('/cheese.jpg')],
  servesCuisine: ['Pizza', 'Italian', 'Sandwiches', 'Subs', 'Wings', 'Salads'],
  priceRange: '$',
  acceptsReservations: false,
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.zip,
    addressCountry: 'US',
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`,
  openingHoursSpecification: hours
    .filter((h) => h.opens)
    .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.schemaDays, opens: h.opens, closes: h.closes })),
  hasMenu: {
    '@type': 'Menu',
    url: absoluteUrl('/menu'),
    hasMenuSection: menu.map((s) => ({
      '@type': 'MenuSection',
      name: s.title,
      hasMenuItem: s.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.desc && { description: item.desc }),
        offers: item.prices.map((price, i) => ({
          '@type': 'Offer',
          price: price.toFixed(2),
          priceCurrency: 'USD',
          ...(s.sizes.length > 1 && { name: s.sizes[i] }),
        })),
      })),
    })),
  },
}

useHead({
  link: [
    { rel: 'canonical', href: pageUrl },
    { rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') },
  ],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
})

// Defaults for link previews (Facebook, iMessage, X, etc.). Pages override title/description/image.
useSeoMeta({
  ogSiteName: site.name,
  ogLocale: 'en_US',
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage: absoluteUrl('/pizza1.jpg'),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
