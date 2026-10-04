import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { DemoProvider } from '#/components/fintech/shared'
import { TooltipProvider } from '#/components/ui/tooltip'

import { getLocale } from '#/paraglide/runtime'

export const Route = createRootRoute({
  beforeLoad: () => {
    document.documentElement.setAttribute('lang', getLocale())
  },

  head: () => ({
    meta: [{ title: 'Setlr — Your money, moving with you' }],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <TooltipProvider>
        <DemoProvider>
          <Outlet />
        </DemoProvider>
      </TooltipProvider>
    </>
  )
}
