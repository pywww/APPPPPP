import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import '@/styles/app-shell.css'

export default function App() {
  return (
    <div className="app-shell">
      <ConfigProvider locale={zhCN}>
        <div className="app-shell__fill">
          <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </div>
  )
}
