<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { projects } from '@/data/projects'

const visible = ref(false)
const route = useRoute()
const router = useRouter()

const isProjectDetail = computed(() => route.name === 'project-detail')
const currentProjectIndex = computed(() =>
  projects.findIndex((project) => project.slug === route.params.slug),
)
const previousProject = computed(() =>
  currentProjectIndex.value > 0 ? projects[currentProjectIndex.value - 1] : undefined,
)
const nextProject = computed(() =>
  currentProjectIndex.value >= 0 ? projects[currentProjectIndex.value + 1] : undefined,
)

function onScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToProjects() {
  router.push({ path: '/', hash: '#projects' })
}

function goToNextProject() {
  if (!nextProject.value) return
  router.push({ name: 'project-detail', params: { slug: nextProject.value.slug } })
}

function goToPreviousProject() {
  if (!previousProject.value) return
  router.push({ name: 'project-detail', params: { slug: previousProject.value.slug } })
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
      v-show="visible || isProjectDetail"
      class="fixed bottom-5 right-5 z-50 flex items-center gap-0.5 rounded-full border border-surface-200 bg-white/85 p-1.5 shadow-lg backdrop-blur dark:border-surface-700 dark:bg-surface-900/85"
    >
      <Button
        v-if="isProjectDetail"
        icon="pi pi-home"
        variant="text"
        rounded
        severity="secondary"
        aria-label="홈의 프로젝트 목록으로 이동"
        v-tooltip.top="'홈 · 프로젝트 목록'"
        @click="goToProjects"
      />
      <Button
        v-if="isProjectDetail && previousProject"
        icon="pi pi-arrow-left"
        variant="text"
        rounded
        severity="secondary"
        :aria-label="`이전 프로젝트: ${previousProject.title}`"
        v-tooltip.top="`이전 프로젝트: ${previousProject.title}`"
        @click="goToPreviousProject"
      />
      <Button
        v-if="isProjectDetail && nextProject"
        icon="pi pi-arrow-right"
        variant="text"
        rounded
        severity="secondary"
        :aria-label="`다음 프로젝트: ${nextProject.title}`"
        v-tooltip.top="`다음 프로젝트: ${nextProject.title}`"
        @click="goToNextProject"
      />
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
