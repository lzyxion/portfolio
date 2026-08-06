<script setup lang="ts">
import { highlight } from '@/utils/highlight'

type Category = '프로젝트' | '학력' | '자격증' | '교육'

interface TimelineEntry {
  /** 정렬용 시작 시점 (YYYYMM) — 내림차순 */
  sort: number
  period: string
  category: Category
  title: string
  org?: string
  detail?: string
}

const entries: TimelineEntry[] = [
  {
    sort: 202607,
    period: '2026.07 ~ 진행중',
    category: '프로젝트',
    title: '사내 문서 RAG 챗봇 구축',
    org: '(주) 이노비 · 선임 연구원',
    detail:
      'LangChain 과 사내 자체 호스팅 vLLM(생성·임베딩·리랭커)·pgvector 로 사내 문서 RAG 챗봇을 전담 설계·구현하며, 2단 검색(리랭크)·함수콜링 에이전트·인라인 출처 인용으로 환각을 억제한 사내 지식 어시스턴트 기반을 마련하고 있습니다.',
  },
  {
    sort: 202507,
    period: '2025.07',
    category: '자격증',
    title: '빅데이터분석기사',
    org: '한국데이터산업진흥원',
  },
  {
    sort: 202511,
    period: '2025.11 ~ 2026.06',
    category: '프로젝트',
    title: '파이프라인 구축 및 비즈니스 확장',
    org: '(주) 이노비 · 선임 연구원',
    detail:
      'Airflow·dbt 표준화 파이프라인을 구축하고, 멀티테넌시 기반 사내 자체 관리 대시보드를 아키텍처 설계부터 배포까지 전담 개발하며 후속 서비스의 확장 기반을 마련했습니다.',
  },
  {
    sort: 202410,
    period: '2024.10 ~ 2025.05',
    category: '프로젝트',
    title: '인프라 고도화 및 장애 예방',
    org: '(주) 이노비 · 주임 연구원',
    detail:
      'Prometheus 메트릭으로 DB 부하를 진단해 복제(Replica) 격리를 도입하고, Grafana Alloy 알림 체계를 구축해 인프라 안정성과 장애 대응력을 높였습니다.',
  },
  {
    sort: 202311,
    period: '2023.11',
    category: '자격증',
    title: '정보처리기사',
    org: '한국산업인력공단',
  },
  {
    sort: 202311,
    period: '2023.11 ~ 2024.04',
    category: '프로젝트',
    title: '데이터 아키텍처 및 쿼리 최적화',
    org: '(주) 이노비 · 연구원',
    detail:
      'TimescaleDB 기반으로 IIoT 시계열 데이터의 조회·집계·저장 구조를 최적화하고, 제조 현장 맞춤형 통합 관제 대시보드를 구축했습니다.',
  },
  {
    sort: 202110,
    period: '2021.10 ~ 2022.04',
    category: '교육',
    title: '국비지원 교육 과정 수료 — 자바/코틀린 웹&앱 개발',
  },
  {
    sort: 201403,
    period: '2014.03 ~ 2020.08',
    category: '학력',
    title: '광운대학교 화학공학과 학사',
  },
]
entries.sort((a, b) => b.sort - a.sort)

function categoryClasses(cat: Category): { dot: string; badge: string } {
  switch (cat) {
    case '프로젝트':
      return {
        dot: 'bg-primary',
        badge: 'bg-primary-50 text-primary dark:bg-primary-950/40',
      }
    case '학력':
      return {
        dot: 'bg-sky-500',
        badge: 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400',
      }
    case '자격증':
      return {
        dot: 'bg-purple-500',
        badge:
          'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400',
      }
    case '교육':
      return {
        dot: 'bg-amber-500',
        badge:
          'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
      }
  }
}
</script>

<template>
  <section id="career" class="mx-auto max-w-4xl scroll-mt-24">
    <h2 class="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-0">Career</h2>

    <ol class="relative">
      <!-- 중앙 세로선 (md+) -->
      <span
        class="absolute bottom-2 top-2 hidden w-px -translate-x-1/2 bg-surface-200 md:left-1/2 md:block dark:bg-surface-700"
        aria-hidden="true"
      />
      <!-- 좌측 세로선 (모바일) -->
      <span
        class="absolute bottom-2 left-[7px] top-2 w-px bg-surface-200 md:hidden dark:bg-surface-700"
        aria-hidden="true"
      />

      <li
        v-for="(entry, i) in entries"
        :key="i"
        class="relative mb-4 last:mb-0 md:mb-5 md:grid md:grid-cols-2 md:items-start md:gap-x-10"
      >
        <!-- 노드 -->
        <span
          class="absolute top-3 left-[7px] h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-white md:left-1/2 dark:ring-surface-900"
          :class="categoryClasses(entry.category).dot"
          aria-hidden="true"
        />

        <!-- 카드 (좌/우 교차) -->
        <div
          class="ml-8 rounded-lg border border-surface-200 bg-white px-4 py-3 shadow-sm md:ml-0 dark:border-surface-800 dark:bg-surface-900"
          :class="
            i % 2 === 0
              ? 'md:col-start-1 md:text-right'
              : 'md:col-start-2'
          "
        >
          <div
            class="flex flex-wrap items-center gap-x-2 gap-y-1"
            :class="i % 2 === 0 ? 'md:justify-end' : ''"
          >
            <span
              class="rounded-full px-2 py-0.5 text-xs font-semibold"
              :class="categoryClasses(entry.category).badge"
            >
              {{ entry.category }}
            </span>
            <span class="text-xs text-surface-500 dark:text-surface-400">
              {{ entry.period }}
            </span>
          </div>
          <h3 class="mt-1 font-semibold text-surface-900 dark:text-surface-0">
            {{ entry.title }}
          </h3>
          <div
            v-if="entry.org"
            class="mt-0.5 text-sm text-surface-500 dark:text-surface-400"
          >
            {{ entry.org }}
          </div>
          <p
            v-if="entry.detail"
            class="mt-1 text-sm leading-snug text-surface-700 dark:text-surface-300"
            v-html="highlight(entry.detail)"
          />
        </div>
      </li>
    </ol>
  </section>
</template>
