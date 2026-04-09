import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { AccessibilityPersonIcon } from '@/components/icons/AppIcons'
import { useAppStore } from '@/stores/appStore'
import './ModelSetup2.css'

export default function ModelSetup2() {
  const nav = useNavigate()
  const setModelSetupDone = useAppStore((s) => s.setModelSetupDone)
  const modelPhoto = useAppStore((s) => s.modelPhoto)

  const done = () => {
    setModelSetupDone(true)
    Toast.show({ content: '模特已保存（Demo）' })
    nav('/home', { replace: true })
  }

  return (
    <div className="msetup2 page">
      <AppHeader title="设置您的模特" onBack={() => nav(-1)} />

      <main className="msetup2__main">
        <section className="msetup2__preview card card--large">
          {modelPhoto ? (
            <img src={modelPhoto} alt="模特预览" className="msetup2__photo-image" />
          ) : (
            <div className="msetup2__photo-layer" />
          )}
          <div className="msetup2__glass">
            <div className="msetup2__glass-texts">
              <p className="msetup2__glass-title">预览模式</p>
              <p className="msetup2__glass-sub">模特 A</p>
            </div>
            <button type="button" className="msetup2__glass-icon-btn" aria-label="预览状态">
              <AccessibilityPersonIcon className="msetup2__glass-icon" />
            </button>
          </div>
        </section>

        <section className="form msetup2__form">
          <label className="input-field">
            <span className="input-field__label">身高 (Height)</span>
            <span className="input-field__wrap">
              <input className="input-field__control" defaultValue="175" />
              <span className="input-field__unit">cm</span>
            </span>
          </label>

          <label className="input-field">
            <span className="input-field__label">体重 (Weight)</span>
            <span className="input-field__wrap">
              <input className="input-field__control" defaultValue="55" />
              <span className="input-field__unit">kg</span>
            </span>
          </label>
        </section>
      </main>

      <footer className="msetup2__footer">
        <div className="form__actions">
          <button type="button" className="btn btn--secondary btn--md" onClick={() => nav('/model/setup1')}>
            重新选择
          </button>
          <button type="button" className="btn btn--primary btn--md" onClick={done}>
            确认使用
          </button>
        </div>
      </footer>
    </div>
  )
}
