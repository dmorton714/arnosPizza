// The menu lives in data/menu.json.
// Easiest way to change prices: run `npm run dev` and open http://localhost:3000/admin/prices
// You can also edit menu.json by hand: `prices` lines up with the section's `sizes`, left to right.
import data from './menu.json'

export interface MenuItem {
  name: string
  desc?: string
  prices: number[]
}

export interface MenuSection {
  id: string // used in links, e.g. /menu#pizza
  title: string
  blurb?: string
  image?: { src: string; alt: string } // photo in /public shown at the top of the section
  sizes: string[]
  items: MenuItem[]
  notes?: string[]
}

export const menu: MenuSection[] = data

export const money = (n: number) => `$${n.toFixed(2)}`
