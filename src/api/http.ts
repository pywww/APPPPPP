function getDefaultApiBase() {
  if (typeof window === 'undefined') return 'http://localhost:3001/api/v1'
  const protocol = window.location.protocol || 'http:'
  const hostname = window.location.hostname || 'localhost'
  return `${protocol}//${hostname}:3001/api/v1`
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? getDefaultApiBase()

type ApiEnvelope<T> = {
  code: number
  message: string
  data: T
  requestId?: string | null
}

let cachedToken = ''

async function ensureToken() {
  if (cachedToken) return cachedToken
  const local = window.localStorage.getItem('tryon_demo_token')
  if (local) {
    cachedToken = local
    return cachedToken
  }
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '13800000000', password: '123456' }),
  })
  const payload = (await res.json()) as ApiEnvelope<{ accessToken: string }>
  if (!res.ok || payload.code !== 0) throw new Error(payload.message || '登录失败')
  cachedToken = payload.data.accessToken
  window.localStorage.setItem('tryon_demo_token', cachedToken)
  return cachedToken
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await ensureToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  })
  const payload = (await res.json()) as ApiEnvelope<T>
  if (!res.ok || payload.code !== 0) {
    throw new Error(payload.message || `请求失败: ${path}`)
  }
  return payload.data
}
