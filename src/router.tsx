import { createBrowserRouter, Navigate } from 'react-router-dom'
import { OnboardingGuard } from '@/components/OnboardingGuard'
import { TabLayout } from '@/layouts/TabLayout'
import Home from '@/pages/Home'
import Looks from '@/pages/Looks'
import LooksDetail from '@/pages/LooksDetail'
import ModelSetup1 from '@/pages/ModelSetup1'
import ModelSetup2 from '@/pages/ModelSetup2'
import MyModel from '@/pages/MyModel'
import Onboarding from '@/pages/Onboarding'
import Profile from '@/pages/Profile'
import ResultEdit from '@/pages/ResultEdit'
import TryOnError from '@/pages/TryOnError'
import TryOnLoading from '@/pages/TryOnLoading'
import TryOnPick from '@/pages/TryOnPick'
import TryOnResult from '@/pages/TryOnResult'
import Wardrobe from '@/pages/Wardrobe'
import WardrobeDetail from '@/pages/WardrobeDetail'
import Workshop from '@/pages/Workshop'
import WorkshopResult from '@/pages/WorkshopResult'

export const router = createBrowserRouter(
  [
    { path: '/onboarding', element: <Onboarding /> },
    {
      element: <OnboardingGuard />,
      children: [
        {
          path: '/',
          element: <TabLayout />,
          children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: 'home', element: <Home /> },
            { path: 'wardrobe', element: <Wardrobe /> },
            { path: 'workshop', element: <Workshop /> },
            { path: 'profile', element: <Profile /> },
          ],
        },
        { path: '/model/setup1', element: <ModelSetup1 /> },
        { path: '/model/setup2', element: <ModelSetup2 /> },
        { path: '/tryon/pick', element: <TryOnPick /> },
        { path: '/tryon/loading', element: <TryOnLoading /> },
        { path: '/tryon/result', element: <TryOnResult /> },
        { path: '/tryon/error', element: <TryOnError /> },
        { path: '/tryon/edit', element: <ResultEdit /> },
        { path: '/wardrobe/item/:id', element: <WardrobeDetail /> },
        { path: '/looks', element: <Looks /> },
        { path: '/looks/:id', element: <LooksDetail /> },
        { path: '/profile/model', element: <MyModel /> },
        { path: '/workshop/result', element: <WorkshopResult /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
