import { joinURL } from 'ufo'

// Paths to files in /public. GitHub Pages may serve the site from a sub-path
// (e.g. /arnosPizzaplease/), so every image link goes through these helpers.

/** '/pizza1.jpg' -> '/<base>/pizza1.jpg' for use in <img src>. */
export const asset = (path: string) => joinURL(useRuntimeConfig().app.baseURL, path)

/** '/pizza1.jpg' -> 'https://site.com/<base>/pizza1.jpg' for share images and Google data. */
export const absoluteUrl = (path: string) => joinURL(useSiteConfig().url, useRuntimeConfig().app.baseURL, path)
