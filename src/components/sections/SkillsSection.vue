<script setup lang="ts">
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'

interface SkillGroup {
  category: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  { category: 'Language', items: ['Java', 'Python'] },
  { category: 'Backend', items: ['Spring Boot', 'FastAPI'] },
  { category: 'Frontend', items: ['Vue'] },
  { category: 'Database', items: ['PostgreSQL', 'TimescaleDB', 'pgvector', 'SQL'] },
  { category: 'Data Engineering', items: ['Airflow', 'dbt'] },
  { category: 'Monitoring', items: ['Grafana', 'Prometheus', 'Grafana Alloy'] },
  { category: 'DevOps', items: ['Docker', 'Nginx', 'Linux', 'GitLab'] },
  { category: 'AI · LLM', items: ['LangChain', 'RAG', 'vLLM', 'Claude Code'] },
]
</script>

<template>
  <section id="skills" class="mx-auto max-w-4xl scroll-mt-24">
    <h2 class="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-0">Skills</h2>
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
