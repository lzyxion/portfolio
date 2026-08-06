<script setup lang="ts">
import TocPill from '@/components/TocPill.vue'
import IntroSection from '@/components/sections/IntroSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import CareerSection from '@/components/sections/CareerSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const tocItems = [
  { id: 'intro', label: '소개' },
  { id: 'skills', label: '스킬' },
  { id: 'career', label: '커리어' },
  { id: 'projects', label: '프로젝트' },
  { id: 'contact', label: 'Contact' },
]
</script>

<template>
  <div>
    <TocPill :items="tocItems" />
    <div class="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div class="flex flex-col gap-24">
        <IntroSection />
        <SkillsSection />
        <CareerSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  </div>
</template>
