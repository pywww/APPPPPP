import { apiRequest } from './http'

export type TryOnTask = {
  id: string
  status: 'pending' | 'running' | 'success' | 'failed'
  resultImageUrl?: string | null
  failReason?: string | null
  garmentImageUrl: string
}

export function createTryOnTask(garmentImageUrl: string, modelImageUrl?: string, idempotencyKey?: string) {
  return apiRequest<TryOnTask>('/tryon/tasks', {
    method: 'POST',
    body: JSON.stringify({ garmentImageUrl, modelImageUrl, idempotencyKey }),
  })
}

export function getTryOnTask(taskId: string) {
  return apiRequest<TryOnTask>(`/tryon/tasks/${taskId}`)
}
