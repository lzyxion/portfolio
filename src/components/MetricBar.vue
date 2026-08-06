<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
])

const props = defineProps<{
  label: string
  beforeValue: number
  beforeDisplay: string
  afterValue: number
  afterDisplay: string
  improvement?: string
  unit?: string
}>()

function fmt(v: number): string {
  // 명시 단위가 있으면 그대로 붙여줌 (GB, %, MB 등)
  if (props.unit) return v + props.unit
  // 기본은 시간 — ms / s 자동 변환
  if (v >= 1000) {
    const s = v / 1000
    return (Number.isInteger(s) ? s.toFixed(0) : s.toFixed(1)) + 's'
  }
  return v + 'ms'
}

const option = computed(() => ({
  grid: { left: 56, right: 16, top: 28, bottom: 32 },
  xAxis: {
    type: 'category',
    data: ['Before', 'After'],
    axisLine: { lineStyle: { color: '#94a3b8' } },
    axisTick: { show: false },
    axisLabel: {
      color: '#64748b',
      fontSize: 11,
      fontWeight: 600,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 10,
      formatter: (v: number) => fmt(v),
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0]
      const display = p.name === 'Before' ? props.beforeDisplay : props.afterDisplay
      return `<b>${p.name}</b><br/>${display}`
    },
  },
  series: [
    {
      type: 'bar',
      barWidth: '52%',
      data: [
        {
          value: props.beforeValue,
          itemStyle: { color: '#94a3b8', borderRadius: [4, 4, 0, 0] },
          label: {
            show: true,
            position: 'top',
            formatter: () => props.beforeDisplay,
            color: '#475569',
            fontSize: 11,
            fontWeight: 600,
          },
        },
        {
          value: props.afterValue,
          itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] },
          label: {
            show: true,
            position: 'top',
            formatter: () => props.afterDisplay,
            color: '#10b981',
            fontSize: 11,
            fontWeight: 700,
          },
        },
      ],
    },
  ],
}))
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-baseline justify-between gap-3">
      <div class="text-sm font-semibold text-surface-800 dark:text-surface-100">
        {{ label }}
      </div>
      <div v-if="improvement" class="shrink-0 text-sm font-bold text-primary">
        {{ improvement }}
      </div>
    </div>
    <div class="relative h-44 w-full">
      <VChart :option="option" autoresize class="absolute inset-0" />
    </div>
  </div>
</template>
