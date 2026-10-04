import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { getRouteViewTransition } from './lib/motion'

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultViewTransition: getRouteViewTransition(),
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
