<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectDetail from '@/components/ProjectDetail.vue'
import TocPill from '@/components/TocPill.vue'
import ZoomableImage from '@/components/ZoomableImage.vue'
import { projects, years } from '@/data/projects'

const props = defineProps<{ slug: string }>()

const project = computed(() => projects.find((p) => p.slug === props.slug))
const showcase = computed(() =>
  project.value ? years[project.value.year].showcase : undefined,
)

watchEffect(() => {
  if (project.value) {
    document.title = `${project.value.title} · Portfolio`
  }
})

const tocItems = computed(() => {
  const p = project.value
  if (!p) return []
  // 문제 해결 스토리텔링 순서: 문제 → 목표 → 해결 → 성과 → 리뷰
  const list: { id: string; label: string; level: number }[] = []
  list.push({ id: `problem-${p.slug}`, label: '문제', level: 0 })
  if (p.goals?.length) {
    list.push({ id: `goal-${p.slug}`, label: '목표', level: 0 })
  }
  list.push({ id: `solution-${p.slug}`, label: '해결', level: 0 })
  list.push({ id: `result-${p.slug}`, label: '성과', level: 0 })
  if (p.review?.length) {
    list.push({ id: `review-${p.slug}`, label: '리뷰', level: 0 })
  }
  return list
})
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-12">
    <RouterLink
      :to="{ path: '/', hash: '#projects' }"
      class="mb-6 inline-flex items-center gap-1 text-sm font-medium text-surface-500 transition-colors hover:text-primary dark:text-surface-400"
    >
      <i class="pi pi-arrow-left text-xs" aria-hidden="true" />
      프로젝트 목록
    </RouterLink>

    <div v-if="!project" class="py-16 text-center text-surface-500">
      해당 프로젝트를 찾을 수 없습니다.
    </div>

    <template v-else>
      <ProjectDetail :project="project">
        <!-- 해결과 성과 사이 — 만든 결과물의 실제 화면 -->
        <template #showcase>
          <section
            v-if="showcase"
            :id="`showcase-${project.slug}`"
            class="scroll-mt-24 py-8"
          >
            <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
              <i class="pi pi-images text-base text-primary" aria-hidden="true" />
              {{ showcase.title }}
            </h2>
            <p
              v-if="showcase.description"
              class="mb-5 text-sm leading-relaxed text-surface-600 dark:text-surface-300"
            >
              {{ showcase.description }}
            </p>
            <div
              class="grid grid-cols-2 gap-3"
              :class="showcase.items.length >= 3 ? 'sm:grid-cols-3' : ''"
            >
              <figure
                v-for="(item, idx) in showcase.items"
                :key="idx"
              >
                <div
                  class="aspect-video overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900"
                >
                  <ZoomableImage
                    :src="item.src"
                    :alt="item.alt"
                    fill-container
                    :image-class="
                      item.fit === 'contain'
                        ? 'block h-full w-full object-contain'
                        : 'block h-full w-full object-cover object-top'
                    "
                  />
                </div>
                <figcaption
                  v-if="item.caption"
                  class="mt-2 text-center text-xs text-surface-500 dark:text-surface-400"
                >
                  {{ item.caption }}
                </figcaption>
              </figure>
            </div>
          </section>
        </template>
      </ProjectDetail>
    </template>

    <TocPill v-if="tocItems.length > 0" :items="tocItems" />
  </section>
</template>
