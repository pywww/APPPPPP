import { useNavigate } from 'react-router-dom'
import { Button, Empty } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'

export default function WorkshopResult() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-card)' }}>
      <AppHeader title="搭配已保存" onBack={() => nav(-1)} />
      <Empty description="搭配已保存（Demo）" />
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <Button color="primary" shape="rounded" onClick={() => nav('/looks')}>
          查看我的穿搭
        </Button>
        <Button fill="outline" shape="rounded" onClick={() => nav('/workshop')}>
          返回工坊
        </Button>
      </div>
    </div>
  )
}
