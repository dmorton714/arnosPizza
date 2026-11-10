// Local-only API for the price editor. Registered in nuxt.config.ts under $development,
// so it exists while running `npm run dev` and is never part of the published static site.
//
//   GET  /api/_editor/menu      -> current data/menu.json
//   POST /api/_editor/menu      -> { menu } validates and writes data/menu.json
//   POST /api/_editor/publish   -> commits data/menu.json and pushes (GitHub then redeploys)
import { readFile, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { join } from 'node:path'
import { createError, defineEventHandler, getMethod, getRequestURL, readBody } from 'h3'
import type { H3Event } from 'h3'

const run = promisify(execFile)
const root = process.cwd()
const MENU_FILE = 'data/menu.json'
const menuPath = join(root, MENU_FILE)

// Only answer requests made from this computer, even if the dev server is exposed with --host.
function assertLocal(event: H3Event) {
  const ip = event.node.req.socket.remoteAddress ?? ''
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip)) {
    throw createError({ statusCode: 403, statusMessage: 'The price editor only works on this computer.' })
  }
}

interface Item { name: string; desc?: string; prices: number[] }
interface Section { id: string; title: string; sizes: string[]; items: Item[]; [k: string]: unknown }

function validate(menu: unknown): Section[] {
  if (!Array.isArray(menu) || menu.length === 0) throw new Error('Menu must be a list of sections.')
  for (const s of menu as Section[]) {
    if (!s || typeof s.id !== 'string' || typeof s.title !== 'string' || !Array.isArray(s.sizes) || !Array.isArray(s.items)) {
      throw new Error('A section is missing its id, title, sizes or items.')
    }
    for (const item of s.items) {
      if (!item || typeof item.name !== 'string' || !item.name.trim()) throw new Error(`An item in "${s.title}" has no name.`)
      if (!Array.isArray(item.prices) || item.prices.length !== s.sizes.length) {
        throw new Error(`"${item.name}" needs ${s.sizes.length} price(s), one for each size.`)
      }
      for (const p of item.prices) {
        if (typeof p !== 'number' || !Number.isFinite(p) || p < 0 || p > 1000) {
          throw new Error(`"${item.name}" has an invalid price. Use numbers like 9.99`)
        }
      }
      if (item.desc !== undefined && typeof item.desc !== 'string') throw new Error(`"${item.name}" has an invalid description.`)
    }
  }
  return menu as Section[]
}

// Round to cents and drop empty descriptions so the file stays tidy.
function clean(menu: Section[]): Section[] {
  return menu.map((s) => ({
    ...s,
    items: s.items.map(({ name, desc, prices }) => ({
      name: name.trim(),
      ...(desc?.trim() ? { desc: desc.trim() } : {}),
      prices: prices.map((p) => Math.round(p * 100) / 100),
    })),
  }))
}

const git = (...args: string[]) => run('git', args, { cwd: root })

export const menuHandler = defineEventHandler(async (event) => {
  assertLocal(event)
  if (getMethod(event) === 'GET') return JSON.parse(await readFile(menuPath, 'utf8'))

  const body = await readBody<{ menu?: unknown }>(event)
  let menu: Section[]
  try {
    menu = clean(validate(body?.menu))
  } catch (e) {
    throw createError({ statusCode: 400, statusMessage: (e as Error).message })
  }
  await writeFile(menuPath, JSON.stringify(menu, null, 2) + '\n')
  return { ok: true }
})

export const publishHandler = defineEventHandler(async (event) => {
  assertLocal(event)
  if (getMethod(event) !== 'POST') throw createError({ statusCode: 405 })

  const { stdout: changed } = await git('status', '--porcelain', '--', MENU_FILE)
  if (!changed.trim()) return { ok: true, message: 'No price changes to publish. Save first if you edited something.' }

  try {
    await git('add', '--', MENU_FILE)
    await git('commit', '-m', `Update menu prices (${new Date().toLocaleDateString('en-US')})`, '--', MENU_FILE)
    await git('pull', '--rebase', '--autostash') // pick up any updates made on GitHub first
    await git('push')
  } catch (e) {
    const err = e as { stderr?: string; message: string }
    throw createError({ statusCode: 500, statusMessage: `Git failed: ${(err.stderr || err.message).trim().split('\n').slice(-3).join(' ')}` })
  }
  const url = getRequestURL(event)
  return { ok: true, message: 'Published! GitHub is rebuilding the site; changes go live in about 2 minutes.', from: url.host }
})
