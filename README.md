# Arno Pizza

Static site for Arno Pizza, 3912 Bardstown Road, Louisville, KY. Built with Nuxt.

## Updating prices and menu items

Everything on the menu lives in **`data/menu.ts`**. Change a number, save, rebuild.

```ts
{ name: 'Deluxe Pizza', desc: '...', prices: [9.99, 13.99, 18.99] },
//                                              Sm 10"  Md 12"  Lg 16"
```

Hours, phone and address are in **`data/site.ts`**. Photos are in `public/` and listed in `data/media.ts`.

The original menu photos used to build the menu are in `menu-photos/` (not published).

## Commands

```bash
npm run dev     # local preview at http://localhost:3000
npm run build   # static site -> .output/public
```

## Deploying (GitHub Pages)

Every push to `main` builds and publishes the site automatically (`.github/workflows/deploy.yml`).

One-time setup in the GitHub repo: **Settings → Pages → Source: GitHub Actions**.

For a custom domain (recommended for search): add it under **Settings → Pages → Custom domain**, point the
domain's DNS at GitHub Pages, and change the `site.url` fallback in `nuxt.config.ts`. robots.txt is only
generated when the site is at the root of a domain, not at `username.github.io/repo`.

## SEO

- `sitemap.xml` and `robots.txt` are generated at build time.
- Each page has its own title, description and share image (`pages/*.vue`).
- `app.vue` publishes the restaurant's address, phone, hours and full menu with prices as Google structured
  data, built from `data/site.ts` and `data/menu.ts`, so it updates when you change prices.
