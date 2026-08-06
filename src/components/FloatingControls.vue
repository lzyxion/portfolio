<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Button from 'primevue/button'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-show="visible"
      class="fixed bottom-5 right-5 z-50 flex items-center rounded-full border border-surface-200 bg-white/85 p-1.5 shadow-lg backdrop-blur dark:border-surface-700 dark:bg-surface-900/85"
    >
      <Button
        icon="pi pi-arrow-up"
        variant="text"
        rounded
        severity="secondary"
        aria-label="맨 위로 이동"
        @click="scrollToTop"
      />
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
