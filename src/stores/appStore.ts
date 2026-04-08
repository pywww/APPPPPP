import { create } from 'zustand'

const KEY = 'wardrobe_h5_onboarding_done'

type AppState = {
  onboardingDone: boolean
  modelSetupDone: boolean
  finishOnboarding: () => void
  setModelSetupDone: (v: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  onboardingDone: localStorage.getItem(KEY) === '1',
  modelSetupDone: false,
  finishOnboarding: () => {
    localStorage.setItem(KEY, '1')
    set({ onboardingDone: true })
  },
  setModelSetupDone: (v) => set({ modelSetupDone: v }),
}))
