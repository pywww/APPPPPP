import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import { HangerIcon, SparkleIcon } from '@/components/icons/AppIcons'
import { useTryOnStore } from '@/stores/tryOnStore'
import './TryOnLoading.css'

/** 与进度条动画时长一致（约 15s 从 0% 走到 100%） */
const LOADING_DURATION_MS = 15_000

/**
 * Figma Screen/TryOn/LoadingA（1:1277）— 试穿生成中（含居中进度弹窗）
 */
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
    }, LOADING_DURATION_MS)
    return () => window.clearTimeout(t)
  }, [garmentPreviewUrl, nav, setResult])

  if (!garmentPreviewUrl) return null

  return (
    <div className="tload page">
      <AppHeader title="试穿中" onBack={() => nav(-1)} />

      <main className="tload__main">
        <div className="tload__modal card card--large" role="status" aria-live="polite" aria-busy="true">
          <div className="tload__graphic">
            <div className="tload__lavender-circle">
              <div className="tload__orbit" aria-hidden>
                <span className="tload__orbit-dot tload__orbit-dot--1" />
                <span className="tload__orbit-dot tload__orbit-dot--2" />
              </div>
              <HangerIcon className="tload__hanger" />
            </div>
          </div>

          <div className="tload__title-block">
            <p className="tload__title-line">正在努力</p>
            <p className="tload__title-line">生成中</p>
          </div>

          <div className="tload__desc-block">
            <p className="tload__desc-line">由于细节较为精细，</p>
            <p className="tload__desc-line">请稍候片刻…</p>
          </div>

          <div className="tload__progress" aria-hidden>
            <div className="tload__progress-fill" />
          </div>

          <div className="tload__footer">
            <SparkleIcon className="tload__footer-icon" aria-hidden />
            <span className="tload__footer-label">AI RENDERING ENGINE</span>
          </div>
        </div>
      </main>
    </div>
  )
}
