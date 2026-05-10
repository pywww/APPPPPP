import { apiRequest } from './http'

export type LookDto = {
  id: number
  name: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export function listLooks() {
  return apiRequest<LookDto[]>('/looks')
}

export function createLook(payload: { name: string; imageUrl: string }) {
  return apiRequest<LookDto>('/looks', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getLook(id: number) {
  return apiRequest<LookDto>(`/looks/${id}`)
}

export function deleteLook(id: number) {
  return apiRequest<{ success: boolean }>(`/looks/${id}`, { method: 'DELETE' })
}
