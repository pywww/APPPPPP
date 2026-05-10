import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import './WorkshopResult.css'

type WorkshopResultLocationState = {
  lookCount?: number
}

export default function WorkshopResult() {
  const nav = useNavigate()
  const location = useLocation()
  const lookCount = (location.state as WorkshopResultLocationState | null)?.lookCount ?? 0

  return (
    <div className="wresult page">
      <AppHeader title="搭配已保存" onBack={() => nav(-1)} />
      <main className="wresult__main">
        <section className="wresult__card card card--large">
          <div className="wresult__badge">保存成功</div>
          <h2 className="wresult__title">当前搭配已加入我的穿搭</h2>
          <p className="wresult__desc">
            {lookCount > 0 ? `已记录 ${lookCount} 件衣物的组合，可随时继续编辑。` : '可继续返回工坊微调，或前往我的穿搭查看。'}
          </p>
        </section>

        <div className="wresult__actions">
          <button type="button" className="btn btn--primary btn--md wresult__action" onClick={() => nav('/looks')}>
            查看我的穿搭
          </button>
          <button type="button" className="btn btn--secondary btn--md wresult__action" onClick={() => nav('/workshop')}>
            返回工坊
          </button>
        </div>
      </main>
    </div>
  )
}
