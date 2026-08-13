<script setup lang="ts">
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'

interface SkillGroup {
  category: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  { category: 'Backend', items: ['Python', 'FastAPI', 'Java', 'Spring Boot'] },
  { category: 'Data Platform', items: ['Airflow', 'dbt', 'SQL', 'PostgreSQL', 'TimescaleDB'] },
  { category: 'Infrastructure · Observability', items: ['Docker', 'Nginx', 'Linux', 'GitLab CI/CD', 'Prometheus', 'Grafana', 'Grafana Alloy'] },
  { category: 'Frontend', items: ['Vue'] },
]
</script>

<template>
  <section id="skills" class="scroll-mt-24">
    <h2 class="mb-2 text-2xl font-bold text-surface-900 dark:text-surface-0">Skills</h2>
    <p class="mb-6 text-surface-600 dark:text-surface-300">데이터 처리와 서비스 운영에 활용한 기술입니다.</p>
    <Card>
      <template #content>
        <div class="flex flex-col divide-y divide-surface-200 dark:divide-surface-800">
          <div
            v-for="group in skillGroups"
            :key="group.category"
            class="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4"
          >
            <div
              class="w-36 shrink-0 text-sm font-semibold text-surface-500 dark:text-surface-400"
            >
              {{ group.category }}
            </div>
            <div class="flex flex-wrap gap-1.5">
              <SkillBadge v-for="item in group.items" :key="item" :name="item" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </section>
</template>
