<script setup lang="ts">
import Card from 'primevue/card'

interface ContactItem {
  icon: string
  label: string
  value: string
  href: string
}

const contacts: ContactItem[] = [
  {
    icon: 'pi pi-envelope',
    label: 'Email',
    value: 'wlsduf17@gmail.com',
    href: 'mailto:wlsduf17@gmail.com',
  },
  {
    icon: 'pi pi-phone',
    label: 'Phone',
    value: '010-3126-7530',
    href: 'tel:+821031267530',
  },
  {
    icon: 'pi pi-github',
    label: 'GitHub',
    value: 'github.com/leejinyeol170',
    href: 'https://github.com/leejinyeol170',
  },
]
</script>

<template>
  <section id="contact" class="mx-auto max-w-2xl scroll-mt-24">
    <h2 class="mb-2 text-2xl font-bold text-surface-900 dark:text-surface-0">Contact</h2>
    <p class="mb-6 text-surface-600 dark:text-surface-300">
      궁금한 점이나 협업 제안이 있다면 편하게 연락 주세요.
    </p>

    <Card>
      <template #content>
        <ul class="flex flex-col divide-y divide-surface-200 dark:divide-surface-800">
          <li v-for="item in contacts" :key="item.label">
            <a
              :href="item.href"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-4 py-4 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50"
            >
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary dark:bg-primary-950/40"
              >
                <i :class="item.icon" aria-hidden="true" />
              </span>
              <span class="flex flex-col">
                <span class="text-xs uppercase tracking-wider text-surface-500 dark:text-surface-400">
                  {{ item.label }}
                </span>
                <span class="text-surface-900 dark:text-surface-0">{{ item.value }}</span>
              </span>
            </a>
          </li>
        </ul>
      </template>
    </Card>
  </section>
</template>
