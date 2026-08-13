<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import SkillBadge from '@/components/SkillBadge.vue'
import TechStackTabs from '@/components/TechStackTabs.vue'
import ZoomableImage from '@/components/ZoomableImage.vue'
import { type MediaItem, type Project, type TechRationale } from '@/data/projects'
import { highlight } from '@/utils/highlight'

// highlight.js와 echarts는 이 페이지 전체 번들의 대부분을 차지하지만 코드 블록과
// 지표 차트에서만 쓰인다. 별도 청크로 떼어내 초기 로딩을 막지 않도록 지연 로딩.
const CodeBlock = defineAsyncComponent(() => import('@/components/CodeBlock.vue'))
const MetricBar = defineAsyncComponent(() => import('@/components/MetricBar.vue'))

defineProps<{ project: Project }>()

function repoName(repo: string): string {
  // 'owner/name' 에서 저장소 이름만 — 헤더 메타 줄이 길어지지 않도록 (전체 경로는 title 속성)
  return repo.slice(repo.indexOf('/') + 1)
}

function asRationaleList(
  r: TechRationale | TechRationale[] | undefined,
): TechRationale[] {
  if (!r) return []
  return Array.isArray(r) ? r : [r]
}

interface MediaGroup {
  label: string
  items: MediaItem[]
}

function groupMedia(media: MediaItem[]): MediaGroup[] {
  const groups: MediaGroup[] = []
  for (const item of media) {
    const last = groups[groups.length - 1]
    if (last && last.label === item.label) last.items.push(item)
    else groups.push({ label: item.label, items: [item] })
  }
  return groups
}
</script>

<template>
  <article
    :id="`project-${project.slug}`"
    class="flex flex-col divide-y divide-surface-200 scroll-mt-24 dark:divide-surface-800"
  >
    <!-- 헤더 -->
    <header class="flex flex-col gap-3 pb-8">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 sm:text-3xl">
        {{ project.title }}
      </h1>
      <!--
        기간·기여도·저장소를 하나의 메타 박스로 묶는다. 세로로 나열하되 테두리가
        본문과 끊어 줘서, 제목 아래 메타가 길게 흘러내리는 것처럼 보이지 않는다.
        박스 스타일은 아래 '문제' 섹션 카드와 동일.
      -->
      <div
        class="flex flex-col gap-2.5 rounded-md border border-surface-200 bg-surface-50/50 px-4 py-3.5 dark:border-surface-800 dark:bg-surface-900/30"
      >
        <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span
            class="inline-flex items-center gap-1.5 text-sm text-surface-500 dark:text-surface-400"
          >
            <i class="pi pi-calendar text-xs" aria-hidden="true" />
            {{ project.period }}
          </span>
          <!-- 공개 저장소 — 메타 박스 우측 상단 고정 -->
          <div
            v-if="project.repos?.length"
            class="flex flex-wrap gap-2"
          >
            <a
              v-for="repo in project.repos"
              :key="repo"
              :href="`https://github.com/${repo}`"
              target="_blank"
              rel="noopener"
              :title="`github.com/${repo}`"
              class="inline-flex items-center gap-1.5 rounded-md bg-surface-900 px-2.5 py-1 text-xs font-semibold text-surface-0 transition-colors hover:bg-surface-700 dark:bg-surface-0 dark:text-surface-900 dark:hover:bg-surface-200"
            >
              <i class="pi pi-github text-sm" aria-hidden="true" />
              {{ repoName(repo) }}
              <i class="pi pi-external-link text-[10px] opacity-60" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div
          v-if="project.contribution != null"
          class="flex flex-col gap-1.5"
        >
          <span class="inline-flex items-center gap-1.5 text-sm text-surface-500 dark:text-surface-400">
            <i class="pi pi-user text-xs" aria-hidden="true" />
            기여도
            <strong class="font-semibold text-surface-900 dark:text-surface-0">
              {{ project.contribution }}%
            </strong>
          </span>
          <!-- 기여도를 수치만이 아니라 길이로도 읽히게 하는 얇은 게이지 -->
          <div
            class="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-surface-200 dark:bg-surface-800"
            role="progressbar"
            :aria-valuenow="project.contribution"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`기여도 ${project.contribution}%`"
          >
            <div
              class="h-full rounded-full bg-primary"
              :style="{ width: `${project.contribution}%` }"
            />
          </div>
          <span
            v-if="project.contributionScope"
            class="text-sm text-surface-500 dark:text-surface-400"
          >
            {{ project.contributionScope }}
          </span>
        </div>
      </div>
      <!-- mt-3: 메타 박스와 요약 사이에 여백을 둬 메타 정보와 본문을 끊어 읽게 한다 -->
      <p
        v-if="project.summary"
        class="mt-3 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
        v-html="highlight(project.summary)"
      />
      <div class="mt-3 flex flex-wrap gap-2">
        <SkillBadge v-for="tag in project.tags" :key="tag" :name="tag" size="sm" />
      </div>
    </header>

    <!-- 문제 -->
    <section
      :id="`problem-${project.slug}`"
      class="scroll-mt-24 py-8"
    >
      <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
        <i class="pi pi-exclamation-circle text-base text-primary" aria-hidden="true" />
        문제
      </h2>
      <div
        v-if="project.problem.situation?.length"
        class="mb-5 flex flex-col gap-4"
      >
        <p
          v-for="(para, i) in project.problem.situation"
          :key="i"
          class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
          v-html="highlight(para)"
        />
      </div>
      <div class="flex flex-col gap-4">
        <section
          v-for="(issue, iIdx) in project.problem.issues"
          :key="iIdx"
          class="rounded-md border border-surface-200 bg-surface-50/50 px-4 py-4 dark:border-surface-800 dark:bg-surface-900/30"
        >
          <div class="mb-2 flex items-start gap-2.5">
            <span
              class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
            >
              {{ iIdx + 1 }}
            </span>
            <h3 class="text-sm font-semibold leading-relaxed text-surface-900 dark:text-surface-0">
              {{ issue.title }}
            </h3>
          </div>
          <p
            class="pl-[1.875rem] text-sm leading-relaxed text-surface-700 dark:text-surface-300"
            v-html="highlight(issue.description)"
          />
        </section>
      </div>
    </section>

    <!-- 목표 -->
    <section
      v-if="project.goals?.length"
      :id="`goal-${project.slug}`"
      class="scroll-mt-24 py-8"
    >
      <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
        <i class="pi pi-flag text-base text-primary" aria-hidden="true" />
        목표
      </h2>
      <ul class="space-y-2.5 pl-1">
        <li
          v-for="(goal, i) in project.goals"
          :key="i"
          class="flex gap-2.5 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
        >
          <i class="pi pi-flag-fill mt-1 text-[10px] text-primary" aria-hidden="true" />
          <span v-html="highlight(goal)" />
        </li>
      </ul>
    </section>

    <!-- 해결 -->
    <section
      :id="`solution-${project.slug}`"
      class="scroll-mt-24 py-8"
    >
      <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
        <i class="pi pi-wrench text-base text-primary" aria-hidden="true" />
        해결
      </h2>
      <div class="flex flex-col gap-5">
        <section
          v-for="(step, sIdx) in project.solutions"
          :key="sIdx"
          class="rounded-md border border-surface-200 bg-surface-50/50 px-4 py-4 dark:border-surface-800 dark:bg-surface-900/30"
        >
          <div class="mb-3 flex items-start gap-2.5">
            <span
              class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
            >
              {{ sIdx + 1 }}
            </span>
            <h3 class="text-sm font-semibold leading-relaxed text-surface-900 dark:text-surface-0">
              {{ step.title }}
            </h3>
          </div>
          <div class="flex flex-col gap-3 pl-[1.875rem]">
            <p
              class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
              v-html="highlight(step.approach)"
            />
            <div
              v-if="step.result"
              class="inline-flex items-center gap-1.5 self-start rounded-md border-l-4 border-primary bg-primary-50 px-3 py-1.5 dark:bg-primary-950/30"
            >
              <i class="pi pi-chart-line text-xs text-primary" aria-hidden="true" />
              <span
                class="text-sm font-semibold leading-relaxed text-surface-800 dark:text-surface-100"
                v-html="highlight(step.result)"
              />
            </div>
          </div>
        </section>
      </div>

      <!-- 해결 하위: 아키텍처 -->
      <div
        v-if="project.media?.length"
        :id="`arch-${project.slug}`"
        class="mt-10 scroll-mt-24 border-t border-surface-200/60 pt-10 dark:border-surface-800/60"
      >
        <h3 class="mb-4 flex items-center gap-2 text-lg font-bold text-surface-900 dark:text-surface-0">
          <i class="pi pi-sitemap text-sm text-primary" aria-hidden="true" />
          아키텍처
        </h3>
        <div class="space-y-8">
          <section v-for="(group, gIdx) in groupMedia(project.media)" :key="gIdx">
            <div
              v-if="groupMedia(project.media).length > 1"
              class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
            >
              {{ group.label }}
              <span
                v-if="group.items.length > 1"
                class="ml-1 normal-case text-surface-400"
              >
                ({{ group.items.length }})
              </span>
            </div>
            <div
              v-if="group.items[0]?.description?.length"
              class="mb-4 space-y-2"
            >
              <p
                v-for="(para, pIdx) in group.items[0].description"
                :key="pIdx"
                class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
              >
                {{ para }}
              </p>
            </div>

            <div :class="group.items.length > 1 ? 'grid gap-3 sm:grid-cols-2' : ''">
              <figure v-for="(item, idx) in group.items" :key="idx">
                <div
                  class="overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900"
                  :class="group.items.length > 1 ? 'aspect-video' : ''"
                >
                  <ZoomableImage
                    :src="item.src"
                    :alt="item.alt"
                    :fill-container="group.items.length > 1"
                    :image-class="
                      group.items.length > 1
                        ? (item.fit === 'contain'
                            ? 'block h-full w-full object-contain'
                            : 'block h-full w-full object-cover object-top')
                        : 'block w-full'
                    "
                  />
                </div>
                <figcaption
                  v-if="item.caption"
                  class="mt-2 text-center text-xs text-surface-500 dark:text-surface-400"
                >
                  {{ item.caption }}
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
      </div>

      <!-- 해결 하위: 기술 선택 -->
      <div
        v-if="asRationaleList(project.techRationale).length"
        :id="`stack-${project.slug}`"
        class="mt-10 scroll-mt-24 border-t border-surface-200/60 pt-10 dark:border-surface-800/60"
      >
        <h3 class="mb-4 flex items-center gap-2 text-lg font-bold text-surface-900 dark:text-surface-0">
          <i class="pi pi-sliders-h text-sm text-primary" aria-hidden="true" />
          기술 선택
        </h3>
        <TechStackTabs :items="asRationaleList(project.techRationale)" />
      </div>

      <!-- 해결 하위: 핵심 구현 -->
      <div
        v-for="section in project.codeSections"
        :key="section.slug"
        :id="`code-${project.slug}-${section.slug}`"
        v-show="!section.hidden && section.slug !== 'dbt'"
        class="mt-10 scroll-mt-24 border-t border-surface-200/60 pt-10 dark:border-surface-800/60"
      >
        <h3 class="mb-4 flex items-center gap-2 text-lg font-bold text-surface-900 dark:text-surface-0">
          <i :class="[section.icon ?? 'pi pi-code', 'text-sm text-primary']" aria-hidden="true" />
          {{ section.title }}
        </h3>
        <div v-if="section.headline || section.table || section.note?.length || section.implementationCard" class="mb-4">
          <p
            v-if="section.headline"
            class="text-sm leading-relaxed text-surface-600 dark:text-surface-300"
            v-html="highlight(section.headline)"
          />
          <div
            v-if="section.implementationCard"
            class="mt-4 grid overflow-hidden rounded-lg border border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900 sm:grid-cols-[1fr_0.7fr]"
          >
            <div class="p-4">
              <p class="mb-2 text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                어떻게
              </p>
              <ul class="space-y-1.5 text-sm leading-relaxed text-surface-700 dark:text-surface-300">
                <li v-for="item in section.implementationCard.approach" :key="item" class="flex gap-2">
                  <span class="text-primary">·</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div class="border-t border-surface-200 bg-primary-50 p-4 dark:border-surface-800 dark:bg-primary-950/30 sm:border-l sm:border-t-0">
              <p class="mb-2 text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                결과
              </p>
              <p class="text-sm font-medium leading-relaxed text-surface-800 dark:text-surface-100">
                {{ section.implementationCard.result }}
              </p>
            </div>
          </div>
          <div
            v-if="section.table"
            class="overflow-hidden rounded-lg border border-surface-200 dark:border-surface-800"
            :class="section.headline || section.implementationCard ? 'mt-3' : ''"
          >
            <div class="overflow-x-auto">
              <table class="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th
                      v-for="h in section.table.headers"
                      :key="h"
                      class="bg-surface-50 px-3.5 py-2.5 text-left font-semibold text-surface-700 dark:bg-surface-800 dark:text-surface-200"
                    >
                      {{ h }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rIdx) in section.table.rows" :key="rIdx">
                    <td
                      v-for="(cell, cIdx) in row"
                      :key="cIdx"
                      class="border-t border-surface-200 px-3.5 py-3 align-top leading-relaxed dark:border-surface-800"
                      :class="
                        cIdx === 0
                          ? 'whitespace-nowrap font-semibold text-surface-900 dark:text-surface-0'
                          : 'text-surface-600 dark:text-surface-300'
                      "
                    >
                      <template v-if="Array.isArray(cell)">
                        <div
                          v-for="(line, lIdx) in cell"
                          :key="lIdx"
                          :class="lIdx > 0 ? 'mt-1' : ''"
                        >
                          {{ line }}
                        </div>
                      </template>
                      <template v-else>{{ cell }}</template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <ol
            v-if="section.note?.length && !section.implementationCard"
            class="space-y-2 pl-0"
            :class="section.headline || section.table ? 'mt-3' : ''"
          >
            <li
              v-for="(item, idx) in section.note"
              :key="idx"
              class="flex gap-2.5 text-sm leading-relaxed text-surface-600 dark:text-surface-300"
            >
              <span
                class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
              >
                {{ idx + 1 }}
              </span>
              <span>{{ item }}</span>
            </li>
          </ol>
        </div>
        <div
          v-if="section.media?.length && section.mediaAbove"
          class="mb-6 space-y-8"
        >
          <section v-for="(group, gIdx) in groupMedia(section.media)" :key="gIdx">
            <div
              class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
            >
              {{ group.label }}
              <span
                v-if="group.items.length > 1"
                class="ml-1 normal-case text-surface-400"
              >
                ({{ group.items.length }})
              </span>
            </div>
            <div :class="group.items.length > 1 ? 'grid gap-3 sm:grid-cols-2' : ''">
              <figure v-for="(item, idx) in group.items" :key="idx">
                <div
                  class="overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900"
                  :class="group.items.length > 1 ? 'aspect-video' : ''"
                >
                  <ZoomableImage
                    :src="item.src"
                    :alt="item.alt"
                    :fill-container="group.items.length > 1"
                    :image-class="
                      group.items.length > 1
                        ? (item.fit === 'contain'
                            ? 'block h-full w-full object-contain'
                            : 'block h-full w-full object-cover object-top')
                        : 'block w-full'
                    "
                  />
                </div>
                <figcaption
                  v-if="item.caption"
                  class="mt-2 text-center text-xs text-surface-500 dark:text-surface-400"
                >
                  {{ item.caption }}
                </figcaption>
              </figure>
            </div>
          </section>
        </div>

        <div class="flex flex-col gap-4">
          <CodeBlock
            v-for="snippet in section.snippets"
            :key="snippet.title"
            :title="snippet.title"
            :description="snippet.description"
            :collapsed="snippet.collapsed"
            :highlight-phrases="snippet.highlightPhrases"
            :language="snippet.language"
            :code="snippet.code"
          />
        </div>

        <div
          v-if="section.media?.length && !section.mediaAbove"
          class="mt-6 space-y-8"
        >
          <section v-for="(group, gIdx) in groupMedia(section.media)" :key="gIdx">
            <div
              class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
            >
              {{ group.label }}
              <span
                v-if="group.items.length > 1"
                class="ml-1 normal-case text-surface-400"
              >
                ({{ group.items.length }})
              </span>
            </div>
            <div :class="group.items.length > 1 ? 'grid gap-3 sm:grid-cols-2' : ''">
              <figure v-for="(item, idx) in group.items" :key="idx">
                <div
                  class="overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900"
                  :class="group.items.length > 1 ? 'aspect-video' : ''"
                >
                  <ZoomableImage
                    :src="item.src"
                    :alt="item.alt"
                    :fill-container="group.items.length > 1"
                    :image-class="
                      group.items.length > 1
                        ? (item.fit === 'contain'
                            ? 'block h-full w-full object-contain'
                            : 'block h-full w-full object-cover object-top')
                        : 'block w-full'
                    "
                  />
                </div>
                <figcaption
                  v-if="item.caption"
                  class="mt-2 text-center text-xs text-surface-500 dark:text-surface-400"
                >
                  {{ item.caption }}
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- Showcase — 만든 결과물의 실제 화면. 해결(무엇을 만들었나) 과 성과(그래서 어떤 수치가 나왔나) 사이 -->
    <slot name="showcase" />

    <!-- 성과 -->
    <section
      :id="`result-${project.slug}`"
      class="scroll-mt-24 py-8"
    >
      <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
        <i class="pi pi-chart-line text-base text-primary" aria-hidden="true" />
        성과
      </h2>
      <div
        class="rounded-md border-l-4 border-primary bg-primary-50 px-4 py-3 dark:bg-primary-950/30"
      >
        <p
          class="text-sm leading-relaxed text-surface-800 dark:text-surface-100"
          v-html="highlight(project.outcome)"
        />
      </div>

      <div v-if="project.metrics?.length" class="mt-6">
        <div class="mb-4 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
          Before / After — 정량 성과
        </div>
        <div
          class="grid gap-6"
          :class="
            project.metrics.length >= 3
              ? 'sm:grid-cols-2 lg:grid-cols-3'
              : project.metrics.length === 2
                ? 'sm:grid-cols-2'
                : ''
          "
        >
          <MetricBar v-for="(m, i) in project.metrics" :key="i" v-bind="m" />
        </div>
      </div>

      <div v-if="project.roles?.length" class="mt-6">
        <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
          핵심 기여
        </div>
        <ul class="space-y-2 pl-1">
          <li
            v-for="role in project.roles"
            :key="role"
            class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
          >
            <i class="pi pi-check mt-1 text-xs text-primary" aria-hidden="true" />
            <span v-html="highlight(role)" />
          </li>
        </ul>
      </div>
    </section>

    <!-- 리뷰 -->
    <section
      v-if="project.review?.length"
      :id="`review-${project.slug}`"
      class="scroll-mt-24 py-8"
    >
      <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
        <i class="pi pi-lightbulb text-base text-primary" aria-hidden="true" />
        리뷰
      </h2>
      <div class="flex flex-col gap-5">
        <div v-for="(item, i) in project.review" :key="i" class="flex flex-col gap-1.5">
          <span
            class="self-start rounded-full bg-surface-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-surface-600 dark:bg-surface-800 dark:text-surface-300"
          >
            {{ item.label }}
          </span>
          <p
            class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
            v-html="highlight(item.text)"
          />
        </div>
      </div>
    </section>
  </article>
</template>
