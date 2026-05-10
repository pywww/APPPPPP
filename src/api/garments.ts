import { apiRequest } from './http'

export type GarmentDto = {
  id: number
  name: string
  category: string
  color: string
  createdAt: string
  originalDataUrl: string
  resultDataUrl?: string | null
}

type CreateGarmentPayload = {
  name: string
  category: string
  color: string
  originalDataUrl: string
  resultDataUrl?: string
}

export function createGarment(payload: CreateGarmentPayload) {
  return apiRequest<GarmentDto>('/garments', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function listGarments(category?: string) {
  const query = category && category !== '全部' ? `?category=${encodeURIComponent(category)}` : ''
  return apiRequest<GarmentDto[]>(`/garments${query}`)
}

export function getGarment(id: number) {
  return apiRequest<GarmentDto>(`/garments/${id}`)
}

export function deleteGarment(id: number) {
  return apiRequest<{ success: boolean }>(`/garments/${id}`, { method: 'DELETE' })
}

export function updateGarment(id: number, payload: { category?: string; name?: string; color?: string }) {
  return apiRequest<GarmentDto>(`/garments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
