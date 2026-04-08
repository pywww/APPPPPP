import { create } from 'zustand'

type TryOnState = {
  garmentPreviewUrl: string
  resultUrl: string
  setGarmentPreview: (url: string) => void
  setResult: (url: string) => void
  clear: () => void
}

export const useTryOnStore = create<TryOnState>((set) => ({
  garmentPreviewUrl: '',
  resultUrl: '',
  setGarmentPreview: (url) => set({ garmentPreviewUrl: url }),
  setResult: (url) => set({ resultUrl: url }),
  clear: () => set({ garmentPreviewUrl: '', resultUrl: '' }),
}))
