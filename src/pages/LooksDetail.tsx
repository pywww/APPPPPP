import { useNavigate } from 'react-router-dom'
import { Empty } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'

export default function LooksDetail() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-card)' }}>
      <AppHeader title="穿搭详情" onBack={() => nav(-1)} />
      <Empty description="Demo：暂无穿搭详情数据" />
    </div>
  )
}
