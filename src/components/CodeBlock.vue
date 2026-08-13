<script setup lang="ts">
import { computed, ref } from 'vue'
import hljs from 'highlight.js/lib/core'
import sql from 'highlight.js/lib/languages/sql'
import python from 'highlight.js/lib/languages/python'
import yaml from 'highlight.js/lib/languages/yaml'
import typescript from 'highlight.js/lib/languages/typescript'
import java from 'highlight.js/lib/languages/java'
import kotlin from 'highlight.js/lib/languages/kotlin'
import ini from 'highlight.js/lib/languages/ini'
import nginx from 'highlight.js/lib/languages/nginx'
import bash from 'highlight.js/lib/languages/bash'

hljs.registerLanguage('sql', sql)
hljs.registerLanguage('python', python)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('java', java)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('ini', ini)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('bash', bash)
// 'river' (Grafana Alloy) → nginx 문법이 시각적으로 가장 가까워 alias 로 등록
hljs.registerAliases(['river'], { languageName: 'nginx' })

const props = defineProps<{
  title?: string
  description?: string
  collapsed?: boolean
  highlightPhrases?: string[]
  language: string
  code: string
}>()

const trimmed = computed(() => props.code.replace(/^\n+|\n+$/g, ''))

const highlighted = computed(() => {
  try {
    return hljs.highlight(trimmed.value, { language: props.language, ignoreIllegals: true }).value
  } catch {
    return trimmed.value
  }
})

const highlightedLines = computed(() =>
  trimmed.value.split('\n').map((line) => {
    let html = line
    try {
      html = hljs.highlight(line || ' ', { language: props.language, ignoreIllegals: true }).value
    } catch {
      // keep the original line when a language rule cannot parse it
    }
    return {
      html: line ? html : '&nbsp;',
      active: props.highlightPhrases?.some((phrase) => line.includes(phrase)) ?? false,
    }
  }),
)

const copied = ref(false)
const showCode = ref(!props.collapsed)
async function copy() {
  try {
    await navigator.clipboard.writeText(trimmed.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // ignore
  }
}
</script>

<template>
  <figure
    class="overflow-hidden rounded-lg border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-0"
  >
    <header
      v-if="title || description"
      class="flex items-start justify-between gap-3 border-b border-surface-200 bg-surface-50 px-4 py-3 dark:border-surface-200 dark:bg-surface-100"
    >
      <div class="min-w-0">
        <div v-if="title" class="text-sm font-semibold text-surface-900">
          {{ title }}
        </div>
        <div v-if="description" class="mt-0.5 text-xs leading-relaxed text-surface-600">
          {{ description }}
        </div>
      </div>
      <button
        v-if="collapsed"
        type="button"
        class="shrink-0 rounded-md border border-primary-200 px-2 py-1 text-[11px] font-medium text-primary-700 transition-colors hover:bg-primary-50"
        @click="showCode = !showCode"
      >
        <i :class="showCode ? 'pi pi-chevron-up' : 'pi pi-code'" class="mr-1 text-[10px]" />
        {{ showCode ? '코드 닫기' : '코드 보기' }}
      </button>
    </header>
    <div v-if="showCode" class="relative">
      <button
        type="button"
        class="absolute right-3 top-3 rounded-md border border-surface-300 bg-white px-2 py-1 text-[11px] text-surface-600 transition-colors hover:bg-surface-100"
        @click="copy"
      >
        <i :class="copied ? 'pi pi-check' : 'pi pi-copy'" class="mr-1 text-[10px]" />
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
      <pre class="overflow-x-auto px-4 pb-4 pt-12 text-xs leading-relaxed"><code v-if="!highlightPhrases?.length" :class="`hljs language-${language}`" v-html="highlighted" /><code v-else :class="`hljs language-${language}`"><span v-for="(line, index) in highlightedLines" :key="index" class="code-line" :class="{ 'code-line--active': line.active }" v-html="line.html" /></code></pre>
    </div>
  </figure>
</template>

<style>
@import 'highlight.js/styles/github.css';

/* hljs 기본 배경 제거 — 부모 컨테이너 톤(흰색)이 보이도록 */
.hljs {
  background: transparent !important;
}

.code-line {
  display: block;
  min-height: 1.5em;
}

.code-line--active {
  margin: 0 -0.5rem;
  border-left: 3px solid var(--p-primary-500);
  background: var(--p-primary-50);
  padding: 0 0.5rem;
}
</style>
