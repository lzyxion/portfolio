<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  src: string
  alt: string
  imageClass?: string | string[]
  fillContainer?: boolean
}>()

const open = ref(false)

function show() {
  open.value = true
  document.body.style.overflow = 'hidden'
}
function hide() {
  open.value = false
  document.body.style.overflow = ''
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') hide()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <button
    type="button"
    class="zoomable-trigger block w-full cursor-zoom-in border-0 bg-transparent p-0"
    :class="fillContainer ? 'h-full' : ''"
    :aria-label="`${alt} 확대 보기`"
    @click="show"
  >
    <img :src="src" :alt="alt" :class="imageClass" loading="lazy" />
  </button>

  <Teleport to="body">
    <Transition name="zoom-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 sm:p-8 cursor-zoom-out"
        role="dialog"
        aria-modal="true"
        @click="hide"
      >
        <img
          :src="src"
          :alt="alt"
          class="block max-h-full max-w-full object-contain shadow-2xl"
          @click.stop
        />
        <button
          type="button"
          class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          aria-label="닫기"
          @click.stop="hide"
        >
          <i class="pi pi-times text-lg" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 150ms ease;
}
.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
}
</style>
