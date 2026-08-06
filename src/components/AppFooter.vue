<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="border-t border-surface-200 py-6 text-center text-sm text-surface-500 dark:border-surface-800 dark:text-surface-400"
  >
    © {{ year }} Lee Jinyeol. Built with Vue, PrimeVue & Tailwind.
  </footer>
</template>
