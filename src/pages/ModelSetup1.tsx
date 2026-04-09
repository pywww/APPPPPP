import { useNavigate } from 'react-router-dom'
import { LeftOutline } from 'antd-mobile-icons'
import './ModelSetup.css'

export default function ModelSetup1() {
  const nav = useNavigate()

  return (
    <div className="msetup page">
      <header className="msetup__topbar">
        <button type="button" className="msetup__topbar-back" onClick={() => nav(-1)} aria-label="返回">
          <LeftOutline />
        </button>
        <h1 className="msetup__topbar-title">设置您的模特</h1>
      </header>

      <main className="msetup__main">
        <section className="msetup__hero">
          <h1 className="msetup__title">设置您的模特</h1>
          <p className="msetup__sub">开启您的私人数字试衣间体验</p>
        </section>

        <section className="msetup__preview card card--large">
          {/* 预览底图层：使用 Figma 节点导出的占位图，保证画面质感接近设计稿 */}
          <div className="msetup__photo-layer" />
          <div className="msetup__blob msetup__blob--blue" />
          <div className="msetup__blob msetup__blob--pink" />
          <button type="button" className="msetup__upload-chip" aria-label="上传照片">
            <span className="msetup__upload-icon" aria-hidden />
            <span className="msetup__upload-text">上传照片</span>
          </button>
        </section>

        <section className="msetup__tips">
          <p>请在在光线充足的环境</p>
          <p>拍摄一张全身照片</p>
        </section>

        <div className="msetup__actions form__actions">
          <button type="button" className="btn btn--secondary btn--md" onClick={() => nav('/tryon/pick')}>
            从相册选择
          </button>
          <button type="button" className="btn btn--primary btn--md" onClick={() => nav('/model/setup2')}>
            立即拍照
          </button>
        </div>
      </main>
    </div>
  )
}
