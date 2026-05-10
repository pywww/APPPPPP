import { useNavigate } from 'react-router-dom'
import { Button, Empty, SpinLoading } from 'antd-mobile'
import { useRequest } from 'ahooks'
import { AppHeader } from '@/components/layout/AppHeader'
import { listLooks } from '@/api/looks'
import './Looks.css'

export default function Looks() {
  const nav = useNavigate()
  const { data: looks, loading, error, refresh } = useRequest(() => listLooks())

  return (
    <div className="looks page">
      <AppHeader title="我的穿搭" onBack={() => nav(-1)} />
      <main className="looks__main">
        {loading ? (
          <div className="looks__loading">
            <SpinLoading />
          </div>
        ) : error ? (
          <div className="looks__error">
            <p className="looks__error-text">{error.message}</p>
            <Button color="primary" shape="rounded" onClick={() => refresh()}>
              重试
            </Button>
          </div>
        ) : looks && looks.length > 0 ? (
          <ul className="looks__grid">
            {looks.map((item) => (
              <li key={item.id}>
                <button type="button" className="looks__cell card" onClick={() => nav(`/looks/${item.id}`)}>
                  <div className="looks__cell-media">
                    <img src={item.imageUrl} alt={item.name} className="looks__cell-img" />
                  </div>
                  <p className="looks__cell-title">{item.name}</p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Empty description="暂无保存的搭配，去穿搭工坊创建一个吧" />
        )}
        <div className="looks__cta">
          <Button color="primary" shape="rounded" onClick={() => nav('/workshop')}>
            去搭配
          </Button>
        </div>
      </main>
    </div>
  )
}
