import { useNavigate } from 'react-router-dom'
import { Button, Empty } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { useTryOnStore } from '@/stores/tryOnStore'

export default function TryOnError() {
  const nav = useNavigate()
  const clear = useTryOnStore((s) => s.clear)

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-card)' }}>
      <AppHeader title="试穿失败" onBack={() => nav(-1)} />
      <Empty description="生成失败，请稍后重试" />
      <div style={{ padding: '0 24px', display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        <Button
          color="primary"
          shape="rounded"
          onClick={() => {
            clear()
            nav('/tryon/pick', { replace: true })
          }}
        >
          重新上传
        </Button>
        <Button
          fill="outline"
          shape="rounded"
          onClick={() => {
            clear()
            nav('/home', { replace: true })
          }}
        >
          返回首页
        </Button>
      </div>
    </div>
  )
}
