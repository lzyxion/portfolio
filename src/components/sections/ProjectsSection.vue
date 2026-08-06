<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'
import { projects } from '@/data/projects'
import { highlight } from '@/utils/highlight'

// 최신 프로젝트 우선 (데이터는 오래된 순으로 정의됨)
const list = [...projects].reverse()
</script>

<template>
  <section id="projects" class="mx-auto max-w-5xl scroll-mt-24">
    <h2 class="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-0">Projects</h2>

    <div class="flex flex-col gap-6">
      <div v-for="p in list" :key="p.slug">
        <Card class="h-full">
          <template #content>
            <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 class="text-lg font-bold text-surface-900 dark:text-surface-0">
                {{ p.title }}
              </h3>
              <span class="text-xs uppercase tracking-wider text-surface-500 dark:text-surface-400">
                {{ p.period }}
              </span>
            </div>

            <div
              class="mt-4 rounded-md border-l-4 border-primary bg-primary-50 px-4 py-3 dark:bg-primary-950/30"
            >
              <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                성과
              </div>
              <div
                class="text-sm leading-relaxed text-surface-800 dark:text-surface-100"
                v-html="highlight(p.outcome)"
              />
            </div>

            <div v-if="p.roles?.length" class="mt-4">
              <div
                class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
              >
                역할
              </div>
              <ul class="space-y-2 pl-1">
                <li
                  v-for="role in p.roles"
                  :key="role"
                  class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                >
                  <i class="pi pi-check mt-1 text-xs text-primary" aria-hidden="true" />
                  <span v-html="highlight(role)" />
                </li>
              </ul>
            </div>

            <div class="mt-4">
              <div
                class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
              >
                기술스택
              </div>
              <div class="flex flex-wrap gap-2">
                <SkillBadge v-for="tag in p.tags" :key="tag" :name="tag" size="sm" />
              </div>
            </div>

            <RouterLink
              :to="{ name: 'project-detail', params: { slug: p.slug } }"
              class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              자세히 보기
              <i
                class="pi pi-arrow-right text-xs transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </RouterLink>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>
