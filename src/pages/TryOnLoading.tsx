import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { HangerIcon, SparkleIcon } from '@/components/icons/AppIcons'
import { createTryOnTask, getTryOnTask } from '@/api/tryon'
import { useAppStore } from '@/stores/appStore'
import { useTryOnStore } from '@/stores/tryOnStore'
import './TryOnLoading.css'

/** 轮询任务状态：略缩短间隔以便完成后尽快跳转 */
const POLL_INTERVAL_MS = 2000
/** 连续轮询异常阈值：超过后切换本地演示链路，避免用户被卡在失败页 */
const MAX_POLL_ERROR_RETRY = 6
/** 进度条匀速跑满时长（毫秒）：0%→100% 线性，与接口实际耗时无关；任务先完成则直接跳到 100% */
const PROGRESS_DURATION_MS = 10_000
const PROGRESS_TICK_MS = 150

/**
 * Figma Screen/TryOn/LoadingA（1:1277）— 试穿生成中（含居中进度弹窗）
 */
export default function TryOnLoading() {
  const nav = useNavigate()
  const garmentPreviewUrl = useTryOnStore((s) => s.garmentPreviewUrl)
  const modelPhoto = useAppStore((s) => s.modelPhoto)
  const setResult = useTryOnStore((s) => s.setResult)
  const setTaskId = useTryOnStore((s) => s.setTaskId)
  const setFailReason = useTryOnStore((s) => s.setFailReason)
  const [progressPct, setProgressPct] = useState(0)

  useEffect(() => {
    if (!garmentPreviewUrl) {
      nav('/tryon/pick', { replace: true })
      return
    }
    if (!modelPhoto?.trim()) {
      Toast.show({ content: '请先上传模特全身照' })
      nav('/model/setup1', { replace: true })
      return
    }
    let stopped = false
    let timer = 0
    let progressTimer = 0
    let pollErrorCount = 0

    const clearProgressTimer = () => {
      if (progressTimer) {
        window.clearInterval(progressTimer)
        progressTimer = 0
      }
    }

    /** 匀速进度：10 秒内从 0% 线性增至 100%；到达 100% 后停止计时器直至任务结束或跳转 */
    const startProgressFrom = (startedAt: number) => {
      clearProgressTimer()
      progressTimer = window.setInterval(() => {
        if (stopped) return
        const elapsed = Date.now() - startedAt
        const p = Math.min(100, (elapsed / PROGRESS_DURATION_MS) * 100)
        setProgressPct(p)
        if (p >= 100) {
          clearProgressTimer()
        }
      }, PROGRESS_TICK_MS)
    }

    /**
     * 当后端未启动/网络异常时，降级到本地演示结果，保证试穿主链路可走通。
     */
    const resolveWithLocalResult = () => {
      if (stopped) return
      clearProgressTimer()
      setProgressPct(100)
      setResult(garmentPreviewUrl)
      Toast.show({ content: '已切换为本地演示模式' })
      nav('/tryon/result', { replace: true })
    }

    const start = async () => {
      try {
        const task = await createTryOnTask(garmentPreviewUrl, modelPhoto)
        if (stopped) return
        setTaskId(task.id)
        // 任务已创建、后端开始处理的时刻起算进度，避免与固定秒数动画错位
        startProgressFrom(Date.now())

        const poll = async () => {
          try {
            const latest = await getTryOnTask(task.id)
            if (stopped) return
            if (latest.status === 'success' && latest.resultImageUrl) {
              clearProgressTimer()
              setProgressPct(100)
              setResult(latest.resultImageUrl)
              nav('/tryon/result', { replace: true })
              return
            }
            if (latest.status === 'failed') {
              clearProgressTimer()
              const reason = latest.failReason?.trim() || '试穿失败，请重试'
              setFailReason(reason)
              Toast.show({ content: reason.length > 60 ? `${reason.slice(0, 60)}…` : reason })
              nav('/tryon/error', { replace: true })
              return
            }
            timer = window.setTimeout(poll, POLL_INTERVAL_MS)
          } catch {
            if (stopped) return
            pollErrorCount += 1
            if (pollErrorCount > MAX_POLL_ERROR_RETRY) {
              resolveWithLocalResult()
              return
            }
            timer = window.setTimeout(poll, POLL_INTERVAL_MS)
          }
        }

        await poll()
      } catch {
        if (stopped) return
        resolveWithLocalResult()
      }
    }

    void start()
    return () => {
      stopped = true
      window.clearTimeout(timer)
      clearProgressTimer()
    }
  }, [garmentPreviewUrl, modelPhoto, nav, setResult, setFailReason, setTaskId])

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
            <div className="tload__progress-fill" style={{ width: `${progressPct}%` }} />
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
