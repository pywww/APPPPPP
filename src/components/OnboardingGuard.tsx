import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/appStore'

/** 未完成引导时强制进入 /onboarding */
export function OnboardingGuard() {
  const loc = useLocation()
  const nav = useNavigate()
  const onboardingDone = useAppStore((s) => s.onboardingDone)

  useEffect(() => {
    if (onboardingDone) return
    if (loc.pathname === '/onboarding') return
    const redirect = encodeURIComponent(loc.pathname + loc.search)
    nav(`/onboarding?redirect=${redirect}`, { replace: true })
  }, [onboardingDone, loc.pathname, loc.search, nav])

  if (!onboardingDone && loc.pathname !== '/onboarding') {
    return null
  }

  return (
    <div className="route-outlet-fill">
      <Outlet />
    </div>
  )
}
