# Arno Pizza

Static site for Arno Pizza, 3912 Bardstown Road, Louisville, KY. Built with Nuxt.

## Updating prices and menu items

1. `npm run dev`
2. Open **http://localhost:3000/admin/prices**
3. Change prices, then **Save** (updates the site on your computer) or **Save & publish**
   (commits `data/menu.json`, pushes to GitHub, and the live site updates in ~2 minutes).

The editor only exists while running locally. It is not part of the published site.

The menu data is in `data/menu.json` if you'd rather edit it by hand: `prices` lines up with the
section's `sizes`, left to right. Hours, phone and address are in `data/site.ts`. Photos are in
`public/` and listed in `data/media.ts`. Reviews are in `data/reviews.ts`.

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
