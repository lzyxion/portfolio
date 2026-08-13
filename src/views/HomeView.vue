<script setup lang="ts">
import TocPill from '@/components/TocPill.vue'
import IntroSection from '@/components/sections/IntroSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import CareerSection from '@/components/sections/CareerSection.vue'
import CredentialsSection from '@/components/sections/CredentialsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ClosingSection from '@/components/sections/ClosingSection.vue'

const tocItems = [
  { id: 'intro', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Projects' },
  { id: 'credentials', label: 'Education' },
]
</script>

<template>
  <div>
    <TocPill :items="tocItems" />
    <div class="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div class="mx-auto flex w-full max-w-5xl flex-col gap-24">
        <IntroSection />
        <SkillsSection />
        <CareerSection />
        <ProjectsSection />
        <CredentialsSection />
        <ClosingSection />
      </div>
    </div>
  </div>
</template>
