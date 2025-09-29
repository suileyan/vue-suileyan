import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, _from, next) => {
  NProgress.start()
  const baseName = 'SuiKit Base'
  const pageTitle = (to.meta as any)?.title || to.name || ''
  document.title = pageTitle ? `${pageTitle} - ${baseName}` : baseName
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
