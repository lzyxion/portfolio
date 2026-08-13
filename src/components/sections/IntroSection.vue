<script setup lang="ts">
</script>

<template>
  <section id="intro" class="relative scroll-mt-24 overflow-hidden">
    <!-- 배경 그라데이션 모티프 -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-3xl bg-gradient-to-b from-primary-100/40 to-transparent blur-3xl dark:from-primary-900/30"
    />

    <div class="text-left">
      <div class="max-w-4xl">
        <h1
        class="text-2xl font-bold leading-[1.25] tracking-tight text-surface-900 sm:text-3xl md:text-4xl dark:text-surface-0"
        >
          <span class="block">
            데이터 파이프라인과 백엔드 서비스를 만드는 엔지니어
          </span>
        </h1>

        <p class="mt-6 text-lg font-medium text-surface-600 dark:text-surface-300">
          <strong class="font-bold text-surface-900 dark:text-surface-0">Lee Jinyeol</strong> · 이진열
        </p>

        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-surface-600 dark:text-surface-300">
          <a href="mailto:wlsduf17@gmail.com" class="inline-flex items-center gap-1.5 hover:text-primary hover:underline">
            <i class="pi pi-envelope text-xs" aria-hidden="true" />
            wlsduf17@gmail.com
          </a>
          <a href="https://github.com/lzyxion" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 hover:text-primary hover:underline">
            <i class="pi pi-github text-xs" aria-hidden="true" />
            github.com/lzyxion
          </a>
        </div>

        <p class="mt-8 text-base leading-relaxed text-surface-600 dark:text-surface-300">
          약 50개 고객사, 2,000개 센서에서 하루 약 288만 행이 쌓이는 시계열 데이터 환경에서
          데이터 모델링·변환 파이프라인·API·인프라를 연결해 왔습니다. 그 과정에서
          <strong class="text-primary">Airflow·dbt 기반 데이터 표준화</strong>와
          <strong class="text-primary">FastAPI 기반 서비스 개발</strong>,
          <strong class="text-primary">관측성과 장애 예방</strong>으로 운영 효율과 안정성을 개선했습니다.
        </p>
        <div class="mt-8 overflow-hidden rounded-lg border border-surface-200 bg-white/70 dark:border-surface-800 dark:bg-surface-900/70">
          <div class="grid divide-y divide-surface-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-surface-800">
            <div class="p-4">
              <p class="text-sm font-semibold text-surface-900 dark:text-surface-0">Data Engineering</p>
              <p class="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-300">시계열 데이터의 모델링·변환·집계 파이프라인을 개선했습니다.</p>
            </div>
            <div class="p-4">
              <p class="text-sm font-semibold text-surface-900 dark:text-surface-0">Backend Engineering</p>
              <p class="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-300">멀티테넌시 API와 관리 서비스의 기반을 구현했습니다.</p>
            </div>
            <div class="p-4">
              <p class="text-sm font-semibold text-surface-900 dark:text-surface-0">Reliable Operations</p>
              <p class="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-300">메트릭을 바탕으로 성능 문제와 장애 대응 체계를 개선했습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
