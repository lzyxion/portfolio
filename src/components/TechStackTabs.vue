<script setup lang="ts">
import SkillBadge from '@/components/SkillBadge.vue'
import type { TechRationale } from '@/data/projects'

defineProps<{
  items: TechRationale[]
}>()
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-surface-200 dark:border-surface-800">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr class="bg-primary/10 dark:bg-primary/15">
            <th class="w-[150px] border-r border-primary/20 px-4 py-3 text-left font-semibold text-primary">기술</th>
            <th class="w-[38%] border-r border-primary/20 px-4 py-3 text-left font-semibold text-primary">선택 배경</th>
            <th class="px-4 py-3 text-left font-semibold text-primary">프로젝트 적용</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            v-show="!item.hidden"
            :key="index"
            class="align-top border-t border-surface-200 first:border-t-0 dark:border-surface-800"
          >
            <td class="border-r border-surface-200 px-4 py-3.5 dark:border-surface-800">
              <SkillBadge v-if="item.tech" :name="item.tech" size="md" />
              <span v-else class="font-medium text-surface-800 dark:text-surface-100">{{ item.question }}</span>
            </td>
            <td class="border-r border-surface-200 px-4 py-3.5 leading-relaxed text-surface-700 dark:border-surface-800 dark:text-surface-300">
              {{ item.preface }}
            </td>
            <td class="px-4 py-3.5">
              <ul v-if="item.reasons?.length" class="space-y-1.5">
                <li
                  v-for="(reason, reasonIndex) in item.reasons"
                  :key="reasonIndex"
                  class="flex gap-2 leading-relaxed text-surface-700 dark:text-surface-300"
                >
                  <span class="text-primary" aria-hidden="true">•</span>
                  <span>{{ reason }}</span>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
