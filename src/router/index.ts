import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    redirect: { path: '/', hash: '#career' },
  },
  {
    path: '/projects',
    redirect: { path: '/', hash: '#projects' },
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/views/projects/ProjectDetailView.vue'),
    props: true,
    meta: { title: 'Project' },
  },
  {
    path: '/contact',
    redirect: { path: '/', hash: '#contact' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Not Found' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'smooth' }
    }
    return savedPosition ?? { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title as string | undefined
  document.title = title ? `${title} · Portfolio` : 'Portfolio'
})

export default router
