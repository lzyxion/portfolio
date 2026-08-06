<script setup lang="ts">
</script>

<template>
  <section id="intro" class="relative scroll-mt-24 overflow-hidden">
    <!-- 배경 그라데이션 모티프 -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-3xl bg-gradient-to-b from-primary-100/40 to-transparent blur-3xl dark:from-primary-900/30"
    />

    <!-- Hero 타이틀 블록 (키워드 강조: 시계열 데이터·데이터 엔지니어) -->
    <div class="mx-auto max-w-3xl text-left">
      <h1
        class="text-3xl font-bold leading-[1.15] tracking-tight text-surface-900 sm:text-4xl md:text-5xl dark:text-surface-0"
      >
        <span class="block">
          제조 현장의 <span class="text-primary">시계열 데이터</span>를 다루는
        </span>
        <span class="block">
          <span class="text-primary">데이터 엔지니어</span>
        </span>
      </h1>

      <p class="mt-6 text-lg font-medium text-surface-600 dark:text-surface-300">
        이진열 · Lee Jinyeol
      </p>

      <p class="mt-8 text-base leading-relaxed text-surface-600 dark:text-surface-300">
        스마트 팩토리·IIoT 도메인에서 약 50개 제조업체, 2,000여 개 센서가 연결된 시계열 데이터
        플랫폼의 데이터 처리·관제 영역을 담당해 왔습니다.
        <strong class="text-surface-800 dark:text-surface-100">시계열 데이터 최적화</strong> ·
        <strong class="text-surface-800 dark:text-surface-100">인프라 고도화</strong> ·
        <strong class="text-surface-800 dark:text-surface-100">표준화 파이프라인 구축</strong>
        으로 시스템 안정성과 운영 효율을 개선했고, 최근에는
        <strong class="text-surface-800 dark:text-surface-100">사내 문서 RAG 챗봇</strong>
        을 설계·구현했습니다.
      </p>
    </div>
  </section>
</template>
