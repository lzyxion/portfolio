<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
</script>

<template>
  <section class="mx-auto max-w-xl px-4 py-24 text-center">
    <h1 class="mb-4 text-6xl font-bold text-primary">404</h1>
    <p class="mb-8 text-surface-600 dark:text-surface-300">
      요청하신 페이지를 찾을 수 없습니다.
    </p>
    <RouterLink v-slot="{ navigate }" to="/" custom>
      <Button label="홈으로" icon="pi pi-home" @click="navigate" />
    </RouterLink>
  </section>
</template>
