import { flushSync } from 'react-dom'
import type { AnyRoute, RouterOptions } from '@tanstack/react-router'

export function prefersReducedMotion() {
  return (
    document.documentElement.dataset.motion === 'reduced' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export const routeViewTransition: Exclude<
  RouterOptions<AnyRoute, 'never'>['defaultViewTransition'],
  boolean | undefined
> = {
  types: ({ fromLocation, toLocation, pathChanged }) => {
    if (!fromLocation || !pathChanged || prefersReducedMotion()) return false
    return [
      toLocation.state.__TSR_index < fromLocation.state.__TSR_index
        ? 'backward'
        : 'forward',
    ]
  },
}

// Local steps share the router's snapshot mechanism, without delaying input.
export function transitionStep(update: () => void, backward = false) {
  if (
    typeof document.startViewTransition !== 'function' ||
    prefersReducedMotion()
  ) {
    update()
    return
  }
  const options = {
    update: () => flushSync(update),
    types: [backward ? 'step-backward' : 'step-forward'],
  }
  const transition = document.startViewTransition(
    CSS.supports('selector(:active-view-transition-type(step-forward))')
      ? options
      : options.update,
  )
  // Rapid interactions can skip a snapshot while the state update still commits.
  void transition.ready.catch(() => {})
}
