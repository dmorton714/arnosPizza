const baseURL = process.env.NUXT_APP_BASE_URL || '/'

// Static site: `npm run build` runs `nuxt generate` -> .output/public
// Deployed to GitHub Pages by .github/workflows/deploy.yml, which sets
// NUXT_SITE_URL (the live domain) and NUXT_APP_BASE_URL (sub-path, if any) at build time.
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],
  // robots.txt only works at the root of a domain, so skip it when served from a sub-path (username.github.io/repo)
  robots: { robotsTxt: baseURL === '/' },
  // Pages listed explicitly: auto-discovery double-counts pages when served from a sub-path.
  // Add a line here when you add a new page.
  sitemap: { excludeAppSources: true, urls: ['/', '/menu', '/about', '/contact'] },
  // views/ components are auto-imported without a path prefix (HomeView, not ViewsHomeView)
  components: [
    { path: '~/views', pathPrefix: false },
    { path: '~/components', pathPrefix: false },
  ],
  css: ['~/assets/css/main.css'],
  // Used for the sitemap, robots.txt, canonical links and share previews.
  // The deploy workflow overrides url via NUXT_SITE_URL; change the fallback once there's a real domain.
  site: {
    url: 'https://www.arnopizza.com',
    name: 'Arno Pizza',
    description: 'Neighborhood pizza shop on Bardstown Road in Louisville, KY. Pizza, specialty pies, subs, flatbread sandwiches, wings and salads.',
    defaultLocale: 'en',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#15100d' },
        { name: 'format-detection', content: 'telephone=yes' },
      ],
    },
  },
  // autoSubfolderIndex:false writes menu.html (not menu/index.html) so GitHub Pages serves /menu with no redirect
  nitro: { prerender: { crawlLinks: true, routes: ['/'], autoSubfolderIndex: false } },
})
