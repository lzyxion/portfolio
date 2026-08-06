<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

interface TocItem {
  id: string
  label: string
}

const props = defineProps<{ items: TocItem[] }>()

const activeId = ref<string | null>(null)
const shown = ref(false)
const itemEls = ref<(HTMLElement | null)[]>([])
const indicator = ref({ left: 0, width: 0, visible: false })
let observer: IntersectionObserver | null = null

function updateIndicator() {
  const idx = props.items.findIndex((i) => i.id === activeId.value)
  const el = idx >= 0 ? itemEls.value[idx] : null
  if (el) {
    indicator.value = { left: el.offsetLeft, width: el.offsetWidth, visible: true }
  } else {
    indicator.value = { ...indicator.value, visible: false }
  }
}

function setupSpy() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          return
        }
      }
    },
    { rootMargin: '-120px 0px -70% 0px', threshold: 0 },
  )
  for (const it of props.items) {
    const el = document.getElementById(it.id)
    if (el) observer.observe(el)
  }
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: 'smooth' })
  activeId.value = id
}

function onScroll() {
  shown.value = window.scrollY > 160
}

watch(activeId, () => nextTick(updateIndicator))
watch(
  () => props.items.map((i) => i.id).join(','),
  () => window.setTimeout(() => {
    setupSpy()
    updateIndicator()
  }, 80),
)

onMounted(() => {
  window.setTimeout(() => {
    setupSpy()
    updateIndicator()
  }, 80)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', updateIndicator)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', updateIndicator)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
    <nav
      class="relative flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto rounded-full border border-surface-200 bg-white/85 px-1.5 py-1.5 shadow-lg backdrop-blur transition-all duration-300 dark:border-surface-700 dark:bg-surface-900/85"
      :class="
        shown
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-3 opacity-0'
      "
      aria-label="목차"
    >
      <!-- 슬라이딩 활성 인디케이터 -->
      <span
        class="absolute bottom-1.5 top-1.5 rounded-full bg-primary transition-all duration-300 ease-out"
        :class="indicator.visible ? 'opacity-100' : 'opacity-0'"
        :style="{ left: `${indicator.left}px`, width: `${indicator.width}px` }"
        aria-hidden="true"
      />
      <button
        v-for="(it, i) in items"
        :key="it.id"
        :ref="(el) => { itemEls[i] = el as HTMLElement | null }"
        type="button"
        class="relative z-10 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
        :class="
          activeId === it.id
            ? 'text-white'
            : 'text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-white'
        "
        @click="scrollTo(it.id)"
      >
        {{ it.label }}
      </button>
    </nav>
  </div>
</template>
