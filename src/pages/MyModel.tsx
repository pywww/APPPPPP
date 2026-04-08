import { useNavigate } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'

export default function MyModel() {
  const nav = useNavigate()
  return (
    <div>
      <AppHeader title="我的模特" onBack={() => nav(-1)} />
      <div style={{ padding: 'var(--space-page)' }}>
        <div
          style={{
            minHeight: 320,
            borderRadius: 12,
            background: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-secondary)',
            marginBottom: 20,
          }}
        >
          模特大图占位
        </div>
        <Button
          block
          color="primary"
          shape="rounded"
          onClick={() => {
            Toast.show({ content: '更换模特' })
            nav('/model/setup1')
          }}
        >
          更换模特
        </Button>
      </div>
    </div>
  )
}
