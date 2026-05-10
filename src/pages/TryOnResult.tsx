import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { Grid2x2Icon, HangerIcon, RefreshIcon } from '@/components/icons/AppIcons'
import { useTryOnStore } from '@/stores/tryOnStore'
import './TryOnResult.css'

/**
 * Figma Screen/TryOn/Result（1:451）— 试穿结果（底部悬浮操作条）
 */
export default function TryOnResult() {
  const nav = useNavigate()
  const garmentPreviewUrl = useTryOnStore((s) => s.garmentPreviewUrl)
  const resultUrl = useTryOnStore((s) => s.resultUrl)
  const clear = useTryOnStore((s) => s.clear)

  useEffect(() => {
    if (!resultUrl) nav('/tryon/pick', { replace: true })
  }, [nav, resultUrl])

  if (!resultUrl) return null

  /** 先进入衣物详情草稿页，填写分类与颜色后再入库 */
  const goFillDetailThenSave = () => {
    nav('/wardrobe/item/new', {
      replace: false,
      state: {
        fromTryOn: true as const,
        originalDataUrl: garmentPreviewUrl,
        resultDataUrl: resultUrl,
      },
    })
  }

  return (
    <div className="tresult page">
      <AppHeader title="试穿结果" onBack={() => nav(-1)} />

      <main className="tresult__main">
        <section className="tresult__card card card--large">
          <div className="tresult__stage">
            <img src={resultUrl} alt="试穿效果" className="tresult__photo" />
          </div>
        </section>
      </main>

      <div className="tresult__fab-wrap" role="toolbar" aria-label="试穿结果操作">
        <div className="tresult__fab">
          <button type="button" className="tresult__fab-primary btn btn--primary btn--md" onClick={goFillDetailThenSave}>
            <HangerIcon className="tresult__fab-icon" aria-hidden />
            <span>保存到衣橱</span>
          </button>
          <div className="tresult__fab-row">
            <button
              type="button"
              className="tresult__fab-muted"
              onClick={() => {
                Toast.show({ content: '下一迭代：默认选中当前衣' })
              }}
            >
              <Grid2x2Icon className="tresult__fab-icon" aria-hidden />
              <span>搭配衣橱其他衣服</span>
            </button>
            <button
              type="button"
              className="tresult__fab-muted"
              onClick={() => {
                clear()
                nav('/tryon/pick', { replace: true })
              }}
            >
              <RefreshIcon className="tresult__fab-icon" aria-hidden />
              <span>再试一件</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
