import { useNavigate } from 'react-router-dom'
import { List } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'

export default function Profile() {
  const nav = useNavigate()
  return (
    <div>
      <AppHeader title="我的" showBack={false} />
      <List style={{ marginTop: 8 }}>
        <List.Item clickable onClick={() => nav('/profile/model')}>
          我的模特
        </List.Item>
        <List.Item clickable onClick={() => nav('/looks')}>
          我的穿搭
        </List.Item>
        <List.Item clickable onClick={() => nav('/onboarding')}>
          查看新手教程
        </List.Item>
      </List>
    </div>
  )
}
