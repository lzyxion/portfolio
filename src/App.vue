<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import FloatingControls from '@/components/FloatingControls.vue'
import AppFooter from '@/components/AppFooter.vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved
    ? saved === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches
})

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
  localStorage.setItem('theme', val ? 'dark' : 'light')
}, { immediate: true })
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <FloatingControls />
    <main class="flex-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.matched[0]?.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
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
