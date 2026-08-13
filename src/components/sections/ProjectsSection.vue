<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SkillBadge from '@/components/SkillBadge.vue'
import { projects } from '@/data/projects'
import { highlight } from '@/utils/highlight'

const list = [...projects].reverse()
</script>

<template>
  <section id="projects" class="scroll-mt-24">
    <h2 class="mb-2 text-2xl font-bold text-surface-900 dark:text-surface-0">Projects</h2>
    <p class="mb-6 text-surface-600 dark:text-surface-300">
      제조는 적용 도메인이었고, 아래는 데이터 플랫폼·백엔드·운영 문제를 해결한 엔지니어링 사례입니다.
    </p>

    <div class="flex flex-col gap-6">
      <div v-for="p in list" :key="p.slug">
        <div class="overflow-hidden rounded-lg border border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
          <dl class="divide-y divide-surface-200 dark:divide-surface-800">
            <div class="grid sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt class="bg-surface-100 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-700 dark:bg-surface-800 dark:text-surface-200">프로젝트명</dt>
              <dd class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-4 py-3">
                <h3 class="text-sm font-bold leading-relaxed text-surface-900 dark:text-surface-0">{{ p.title }}</h3>
                <RouterLink
                  :to="{ name: 'project-detail', params: { slug: p.slug } }"
                  class="group shrink-0 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  자세히 보기
                  <i class="pi pi-arrow-right text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </RouterLink>
              </dd>
            </div>

            <div class="grid sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt class="bg-surface-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-600 dark:bg-surface-800/60 dark:text-surface-300">기간</dt>
              <dd class="px-4 py-3 text-sm text-surface-700 dark:text-surface-300">{{ p.period }}</dd>
            </div>

            <div class="grid sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt class="bg-primary-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-primary dark:bg-primary-950/30">성과</dt>
              <dd class="px-4 py-3 text-sm leading-relaxed text-surface-800 dark:text-surface-100" v-html="highlight(p.outcome)" />
            </div>

            <div v-if="p.roles?.length" class="grid sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt class="bg-surface-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-600 dark:bg-surface-800/60 dark:text-surface-300">역할</dt>
              <dd class="px-4 py-3">
                <ul class="space-y-1.5">
                  <li
                    v-for="role in p.roles"
                    :key="role"
                    class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                  >
                    <span class="text-surface-400 dark:text-surface-500" aria-hidden="true">•</span>
                    <span v-html="highlight(role)" />
                  </li>
                </ul>
              </dd>
            </div>

            <div class="grid sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt class="bg-surface-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-600 dark:bg-surface-800/60 dark:text-surface-300">기술스택</dt>
              <dd class="px-4 py-3">
                <div class="flex flex-wrap gap-2">
                  <SkillBadge v-for="tag in p.tags" :key="tag" :name="tag" size="sm" />
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
