import { useNavigate } from 'react-router-dom'
import { Button, Input, List, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { useAppStore } from '@/stores/appStore'

export default function ModelSetup2() {
  const nav = useNavigate()
  const setModelSetupDone = useAppStore((s) => s.setModelSetupDone)

  const done = () => {
    setModelSetupDone(true)
    Toast.show({ content: '模特已保存（Demo）' })
    nav('/home', { replace: true })
  }

  return (
    <div>
      <AppHeader title="模特信息" onBack={() => nav(-1)} />
      <List header="身体数据（示例）" style={{ marginTop: 12 }}>
        <List.Item extra={<Input placeholder="cm" />}>身高</List.Item>
        <List.Item extra={<Input placeholder="kg" />}>体重</List.Item>
      </List>
      <div style={{ padding: 'var(--space-page)', marginTop: 24 }}>
        <Button block color="primary" shape="rounded" onClick={done}>
          确认使用
        </Button>
      </div>
    </div>
  )
}
