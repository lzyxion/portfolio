<script setup lang="ts">
const certifications = [
  { title: '빅데이터분석기사', org: '한국데이터산업진흥원', date: '2025.07' },
  { title: '정보처리기사', org: '한국산업인력공단', date: '2023.11' },
]
</script>

<template>
  <section id="credentials" class="scroll-mt-24">
    <h2 class="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-0">Education & Certifications</h2>

    <div class="grid gap-6 sm:grid-cols-2">
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Education</p>
        <div class="border-l-2 border-surface-200 pl-3 text-sm dark:border-surface-700">
          <p class="font-medium text-surface-900 dark:text-surface-0">광운대학교 화학공학과 학사</p>
          <p class="mt-1 text-surface-500 dark:text-surface-400">2014.03 ~ 2020.08</p>
        </div>
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Certifications</p>
        <ul class="space-y-3">
          <li v-for="certification in certifications" :key="certification.title" class="border-l-2 border-surface-200 pl-3 text-sm dark:border-surface-700">
            <p class="font-medium text-surface-900 dark:text-surface-0">{{ certification.title }}</p>
            <p class="mt-1 text-surface-500 dark:text-surface-400">{{ certification.org }} · {{ certification.date }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
