<script setup lang="ts">
import { heroSlides, pizzaSlides, subSlides, sideSlides } from '~/data/media'
</script>

<template>
  <HeroSection
    :slides="heroSlides" label="Arno Pizza photos"
    title="Pizza, subs &amp; more on Bardstown Road"
    tagline="Hand-made pizza, subs, flatbread sandwiches, wings and salads in Louisville. Dine in or carry out."
  />
  <FeatureSection
    id="pizza" title="Pizza" :slides="pizzaSlides" to="/menu#pizza"
    text="Small, medium or large with 20 toppings to choose from, plus specialty pies like the Ultimate, BBQ Chicken, White and Buffalo Chicken."
  />
  <FeatureSection
    id="subs" title="Subs &amp; Flatbreads" :slides="subSlides" to="/menu#subs" tone="alt" flip
    text="Ultimate Club, Cuban, Italian, Philly Steak and more, on a sub roll or fresh flatbread."
  />
  <FeatureSection
    id="sides" title="Wings, Sides &amp; Salads" :slides="sideSlides" to="/menu#sides"
    text="Hot, BBQ or mild wings, cheesy bread, bread sticks, calzones and fresh salads."
  />
  <ReviewsSection />
  <VisitSection />
</template>
