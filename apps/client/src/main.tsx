import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import './styles.css'
import './motion.css'

document.documentElement.dataset.motion =
  localStorage.getItem('setlr-reduced-motion') === 'true' ? 'reduced' : 'full'
document.documentElement.dataset.viewTransitions =
  typeof document.startViewTransition === 'function' ? 'supported' : 'fallback'

const router = getRouter()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
