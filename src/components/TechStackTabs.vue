<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SkillBadge from '@/components/SkillBadge.vue'
import type { TechRationale } from '@/data/projects'

const props = defineProps<{
  items: TechRationale[]
}>()

const selectedIdx = ref(0)

// items 갱신 시 첫 번째로 reset
watch(
  () => props.items.length,
  () => {
    selectedIdx.value = 0
  },
)

const selected = computed(() => props.items[selectedIdx.value])
</script>

<template>
  <div>
    <!-- 클릭 가능한 기술 뱃지 탭 -->
    <div class="mb-5 flex flex-wrap gap-2">
      <button
        v-for="(item, i) in items"
        :key="i"
        type="button"
        class="rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900"
        :class="[
          i === selectedIdx
            ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-surface-900'
            : 'opacity-50 hover:opacity-100',
        ]"
        :aria-pressed="i === selectedIdx"
        @click="selectedIdx = i"
      >
        <SkillBadge
          v-if="item.tech"
          :name="item.tech"
          size="md"
        />
        <span
          v-else
          class="inline-flex items-center rounded-md border border-surface-300 px-2.5 py-1 text-sm font-medium text-surface-800 dark:border-surface-700 dark:text-surface-100"
        >
          {{ item.question }}
        </span>
      </button>
    </div>

    <!-- 선택된 기술의 결정 기록 -->
    <div v-if="selected" class="space-y-5">
      <p
        v-if="selected.preface"
        class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
      >
        {{ selected.preface }}
      </p>

      <!-- 결정을 둘러싼 제약 -->
      <div v-if="selected.constraints?.length">
        <h4
          class="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wide text-surface-500 uppercase dark:text-surface-400"
        >
          <i class="pi pi-lock text-[10px]" aria-hidden="true" />
          결정을 둘러싼 제약
        </h4>
        <ul class="flex flex-wrap gap-1.5">
          <li
            v-for="(c, cIdx) in selected.constraints"
            :key="cIdx"
            class="rounded-md bg-surface-100 px-2.5 py-1 text-xs leading-relaxed text-surface-700 dark:bg-surface-800 dark:text-surface-300"
          >
            {{ c }}
          </li>
        </ul>
      </div>

      <!-- 얻은 것 -->
      <div v-if="selected.reasons?.length">
        <h4
          class="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wide text-surface-500 uppercase dark:text-surface-400"
        >
          <i class="pi pi-check-circle text-[10px] text-primary" aria-hidden="true" />
          얻은 것
        </h4>
        <ol class="space-y-2 pl-0">
          <li
            v-for="(reason, rIdx) in selected.reasons"
            :key="rIdx"
            class="flex gap-2.5 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
          >
            <span
              class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
            >
              {{ rIdx + 1 }}
            </span>
            <span>{{ reason }}</span>
          </li>
        </ol>
      </div>

      <!-- 결정 & 감수한 것 — 무엇을 택하며 무엇을 포기했는지는 한 세트로 읽힌다 -->
      <div
        v-if="selected.decision || selected.tradeoffs?.length"
        class="rounded-lg border-l-[3px] px-4 py-3.5"
        :class="
          selected.decision
            ? 'border-primary bg-primary/5 dark:bg-primary/10'
            : 'border-amber-400 bg-amber-50/60 dark:border-amber-500/60 dark:bg-amber-950/20'
        "
      >
        <p
          v-if="selected.decision"
          class="text-sm leading-relaxed text-surface-800 dark:text-surface-100"
        >
          <span class="mr-1.5 text-xs font-bold tracking-wide text-primary uppercase"
            >결정</span
          >
          {{ selected.decision }}
        </p>
        <div
          v-if="selected.tradeoffs?.length"
          :class="
            selected.decision ? 'mt-3.5 border-t border-primary/20 pt-3.5' : ''
          "
        >
          <h4
            class="mb-2 text-xs font-bold tracking-wide text-amber-600 uppercase dark:text-amber-400"
          >
            감수한 것
          </h4>
          <ol class="space-y-1.5 pl-0">
            <li
              v-for="(t, tIdx) in selected.tradeoffs"
              :key="tIdx"
              class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
            >
              <span
                class="shrink-0 font-bold text-amber-600 dark:text-amber-400"
                aria-hidden="true"
                >{{ tIdx + 1 }}.</span
              >
              <span>{{ t }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
