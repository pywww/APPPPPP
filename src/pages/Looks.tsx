import { useNavigate } from 'react-router-dom'
import { Button, Empty } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'

export default function Looks() {
  const nav = useNavigate()
  return (
    <div>
      <AppHeader title="我的穿搭" onBack={() => nav(-1)} />
      <Empty description="暂无保存的搭配，去穿搭工坊创建一个吧" />
      <div style={{ padding: '0 24px', textAlign: 'center' }}>
        <Button color="primary" shape="rounded" onClick={() => nav('/workshop')}>
          去搭配
        </Button>
      </div>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-secondary)', padding: '0 16px' }}>
        下一迭代：本地表存搭配方案
      </p>
    </div>
  )
}
