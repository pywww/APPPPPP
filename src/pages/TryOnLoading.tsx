import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DotLoading } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { useTryOnStore } from '@/stores/tryOnStore'

export default function TryOnLoading() {
  const nav = useNavigate()
  const garmentPreviewUrl = useTryOnStore((s) => s.garmentPreviewUrl)
  const setResult = useTryOnStore((s) => s.setResult)

  useEffect(() => {
    if (!garmentPreviewUrl) {
      nav('/tryon/pick', { replace: true })
      return
    }
    const t = window.setTimeout(() => {
      setResult(garmentPreviewUrl)
      nav('/tryon/result', { replace: true })
    }, 2000)
    return () => window.clearTimeout(t)
  }, [garmentPreviewUrl, nav, setResult])

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-card)', paddingTop: 80, textAlign: 'center' }}>
      <AppHeader title="试穿中" onBack={() => nav(-1)} />
      <p style={{ marginTop: 40 }}>正在生成 Demo 效果…</p>
      <div style={{ marginTop: 16 }}>
        <DotLoading color="primary" />
      </div>
    </div>
  )
}
