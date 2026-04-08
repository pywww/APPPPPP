import { useNavigate } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import './Workshop.css'

export default function Workshop() {
  const nav = useNavigate()
  return (
    <div className="workshop">
      <AppHeader title="穿搭工坊" showBack={false} />
      <div className="workshop__body">
        <div className="workshop__split">
          <div className="workshop__card">
            <p>模特区</p>
            <span className="hint">对齐 Figma 左侧</span>
          </div>
          <div className="workshop__card workshop__card--r">
            <p>衣橱列表</p>
            <span className="hint">Demo 占位</span>
          </div>
        </div>
        <Button
          block
          color="primary"
          shape="rounded"
          onClick={() => {
            Toast.show({ content: '请先选择衣物（下一迭代）' })
          }}
        >
          保存搭配
        </Button>
        <Button block fill="outline" shape="rounded" style={{ marginTop: 12 }} onClick={() => nav('/workshop/result')}>
          跳转保存成功页（演示）
        </Button>
      </div>
    </div>
  )
}
