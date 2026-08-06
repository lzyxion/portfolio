<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getSkillIcon } from '@/data/skills'

const props = withDefaults(
  defineProps<{
    name: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' },
)

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        wrap: 'px-2 py-0.5 text-xs gap-1',
        icon: 'text-sm',
      }
    case 'lg':
      return {
        wrap: 'px-3 py-1.5 text-base gap-2',
        icon: 'text-xl',
      }
    default:
      return {
        wrap: 'px-2.5 py-1 text-sm gap-1.5',
        icon: 'text-base',
      }
  }
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border border-surface-200 bg-white text-surface-700 transition-colors hover:border-primary-300 hover:bg-primary-50/40 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:border-primary-700 dark:hover:bg-primary-950/30"
    :class="sizeClasses.wrap"
  >
    <Icon
      :icon="getSkillIcon(name)"
      :class="sizeClasses.icon"
      aria-hidden="true"
    />
    <span class="font-medium">{{ name }}</span>
  </span>
</template>
