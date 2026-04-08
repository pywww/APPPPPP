import { useNavigate } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import './ModelSetup.css'

export default function ModelSetup1() {
  const nav = useNavigate()
  return (
    <div className="msetup">
      <AppHeader title="设置模特" onBack={() => nav(-1)} />
      <div className="msetup__body">
        <h1>设置您的模特</h1>
        <p className="msetup__sub">开启您的私人数字试衣间体验（Demo 可跳过实拍）</p>
        <div className="msetup__placeholder">上传照片区域 · 对齐 Figma Screen/Model/Setup1</div>
        <Button block color="primary" shape="rounded" onClick={() => nav('/model/setup2')}>
          下一步
        </Button>
      </div>
    </div>
  )
}
