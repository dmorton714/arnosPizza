<script setup lang="ts">
// Local-only price editor at /admin/prices. Only exists while running `npm run dev`.
import type { MenuSection } from '~/data/menu'

useSeoMeta({ title: 'Price Editor | Arno Pizza', robots: 'noindex, nofollow' })

const menu = ref<MenuSection[]>([])
const saved = ref('')
const status = ref<{ kind: 'ok' | 'error' | 'busy'; text: string } | null>(null)
const busy = computed(() => status.value?.kind === 'busy')
const dirty = computed(() => JSON.stringify(menu.value) !== saved.value)

async function load() {
  menu.value = await $fetch<MenuSection[]>('/api/_editor/menu')
  saved.value = JSON.stringify(menu.value)
}
onMounted(load)

function addItem(s: MenuSection) {
  s.items.push({ name: '', desc: '', prices: s.sizes.map(() => 0) })
}
function removeItem(s: MenuSection, i: number) {
  if (removing.value === `${s.id}-${i}`) {
    s.items.splice(i, 1)
    removing.value = ''
  } else {
    removing.value = `${s.id}-${i}` // first click arms, second click deletes
  }
}
const removing = ref('')

function message(e: unknown) {
  const err = e as { data?: { statusMessage?: string }; statusMessage?: string; message?: string }
  return err.data?.statusMessage || err.statusMessage || err.message || 'Something went wrong.'
}

async function save() {
  status.value = { kind: 'busy', text: 'Saving…' }
  try {
    await $fetch('/api/_editor/menu', { method: 'POST', body: { menu: menu.value } })
    saved.value = JSON.stringify(menu.value)
    status.value = { kind: 'ok', text: 'Saved. The local site at /menu now shows these prices.' }
    return true
  } catch (e) {
    status.value = { kind: 'error', text: message(e) }
    return false
  }
}

async function publish() {
  if (dirty.value && !(await save())) return
  status.value = { kind: 'busy', text: 'Publishing to GitHub…' }
  try {
    const res = await $fetch<{ message: string }>('/api/_editor/publish', { method: 'POST' })
    status.value = { kind: 'ok', text: res.message }
  } catch (e) {
    status.value = { kind: 'error', text: message(e) }
  }
}

// warn before leaving with unsaved changes
const onLeave = (e: BeforeUnloadEvent) => { if (dirty.value) e.preventDefault() }
onMounted(() => window.addEventListener('beforeunload', onLeave))
onBeforeUnmount(() => window.removeEventListener('beforeunload', onLeave))
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <p class="eyebrow">Local only · not on the live site</p>
      <h1>Price Editor</h1>
      <p>
        Change prices, then <strong>Save</strong> to update the site on this computer
        (check it at <NuxtLink to="/menu" target="_blank">/menu</NuxtLink>).
        <strong>Publish</strong> saves and sends the changes to GitHub, which updates the live site in a couple of minutes.
      </p>

      <div class="bar">
        <span class="state" :class="{ dirty }">{{ dirty ? 'Unsaved changes' : 'All changes saved' }}</span>
        <button class="btn ghost" :disabled="busy || !dirty" @click="save">Save</button>
        <button class="btn" :disabled="busy" @click="publish">Save &amp; publish</button>
      </div>
      <p v-if="status" class="status" :class="status.kind" role="status">{{ status.text }}</p>

      <section v-for="s in menu" :key="s.id" class="block">
        <h2>{{ s.title }}</h2>
        <div class="scroll">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th v-for="size in s.sizes" :key="size" class="num">{{ size }}</th>
                <th><span class="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in s.items" :key="i">
                <td><input v-model="item.name" :aria-label="`Item name ${i + 1}`" placeholder="Item name"></td>
                <td><input v-model="item.desc" :aria-label="`${item.name} description`" placeholder="(optional)"></td>
                <td v-for="(_, p) in s.sizes" :key="p" class="num">
                  <span class="dollar">$</span>
                  <input
                    v-model.number="item.prices[p]" type="number" min="0" step="0.01" inputmode="decimal"
                    :aria-label="`${item.name} ${s.sizes[p]} price`"
                  >
                </td>
                <td>
                  <button class="x" :class="{ armed: removing === `${s.id}-${i}` }" @click="removeItem(s, i)">
                    {{ removing === `${s.id}-${i}` ? 'Confirm' : 'Remove' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="add" @click="addItem(s)">+ Add item to {{ s.title }}</button>
      </section>
    </div>
  </section>
</template>

<style scoped>
.bar {
  position: sticky; top: var(--header-h); z-index: 5;
  display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1);
  padding: var(--space-1) 0; background: var(--bg); border-bottom: 1px solid var(--border);
}
.state { margin-right: auto; color: var(--muted); font-size: 0.9rem; }
.state.dirty { color: var(--gold); font-weight: 600; }
.btn {
  padding: 0.6rem 1.2rem; border: 0; border-radius: 999px; cursor: pointer;
  background: var(--red); color: var(--white); font: 600 0.95rem var(--font-body);
}
.btn.ghost { background: transparent; box-shadow: inset 0 0 0 2px var(--white); }
.btn:disabled { opacity: 0.45; cursor: default; }
.status { margin: var(--space-1) 0 0; padding: 0.6rem 0.9rem; border-radius: 0.5rem; }
.status.ok { background: rgb(79 174 74 / 0.18); color: var(--white); }
.status.error { background: rgb(196 42 35 / 0.3); color: var(--white); }
.status.busy { background: var(--surface-2); color: var(--muted); }

.block { padding-block: var(--space-3); border-bottom: 1px solid var(--border); }
h2 { color: var(--gold); font-size: 1.4rem; }
.scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 40rem; }
th { text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); padding: 0.25rem; }
td { padding: 0.25rem; vertical-align: middle; }
.num { white-space: nowrap; width: 6.5rem; }
input {
  width: 100%; padding: 0.45rem 0.6rem; border-radius: 0.4rem;
  border: 1px solid var(--border); background: var(--surface-2); color: var(--white); font: inherit;
}
input:focus { border-color: var(--gold); outline: none; }
.num input { width: 5rem; text-align: right; }
.dollar { color: var(--muted); margin-right: 0.2rem; }
.x, .add {
  background: none; border: 1px solid var(--border); color: var(--muted);
  border-radius: 0.4rem; padding: 0.35rem 0.6rem; cursor: pointer; font: inherit; font-size: 0.85rem;
}
.x.armed { background: var(--red); color: var(--white); border-color: var(--red); }
.add { margin-top: var(--space-1); color: var(--white); }
.add:hover, .x:hover { border-color: var(--gold); }
</style>
