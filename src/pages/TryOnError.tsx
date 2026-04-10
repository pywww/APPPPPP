import { useNavigate } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import { TryOnErrorActions } from '@/components/tryon/TryOnErrorActions'
import { TryOnErrorGraphic } from '@/components/tryon/TryOnErrorGraphic'
import { useTryOnStore } from '@/stores/tryOnStore'
import './TryOnError.css'

/**
 * Figma Screen/TryOn/Error（node 1:1311）
 * 试穿生成失败态：顶栏返回 + 居中结果卡片 + 双操作入口。
 * @see https://www.figma.com/design/fpf9PL9NrunB3fONWpUfYV/衣橱app?node-id=1-1311
 */
export default function TryOnError() {
  const nav = useNavigate()
  const clear = useTryOnStore((s) => s.clear)

  const goReupload = () => {
    clear()
    nav('/tryon/pick', { replace: true })
  }

  const goHome = () => {
    clear()
    nav('/home', { replace: true })
  }

  return (
    <div className="terr page">
      <AppHeader title="试穿失败" onBack={() => nav(-1)} />

      <main className="terr__main">
        <section
          className="terr__card card card--large"
          aria-labelledby="terr-error-title"
        >
          <TryOnErrorGraphic />

          <div className="terr__text">
            <h2 id="terr-error-title" className="terr__title">
              生成未成功
            </h2>
            <div className="terr__desc">
              <p className="terr__desc-line">我们的 AI 裁缝暂时遇到了一些技术障碍，</p>
              <p className="terr__desc-line">请尝试重新上传您的照片。</p>
            </div>
          </div>

          <TryOnErrorActions
            primary={
              <button type="button" className="btn btn--primary btn--lg" onClick={goReupload}>
                重新上传
              </button>
            }
            secondary={
              <button type="button" className="btn btn--secondary btn--lg" onClick={goHome}>
                返回首页
              </button>
            }
          />
        </section>
      </main>
    </div>
  )
}
