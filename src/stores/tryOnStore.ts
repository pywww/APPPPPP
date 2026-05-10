import { create } from 'zustand'

type TryOnState = {
  garmentPreviewUrl: string
  resultUrl: string
  taskId: string
  /** 最近一次失败原因（供错误页展示） */
  failReason: string
  setGarmentPreview: (url: string) => void
  setResult: (url: string) => void
  setTaskId: (taskId: string) => void
  setFailReason: (reason: string) => void
  clear: () => void
}

export const useTryOnStore = create<TryOnState>((set) => ({
  garmentPreviewUrl: '',
  resultUrl: '',
  taskId: '',
  failReason: '',
  setGarmentPreview: (url) => set({ garmentPreviewUrl: url }),
  setResult: (url) => set({ resultUrl: url }),
  setTaskId: (taskId) => set({ taskId }),
  setFailReason: (reason) => set({ failReason: reason }),
  clear: () => set({ garmentPreviewUrl: '', resultUrl: '', taskId: '', failReason: '' }),
}))
