import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { HangerIcon, HomeFilledIcon, ICON_SIZES, SparkleIcon, UserOutlineIcon } from '@/components/icons/AppIcons'
import './TabLayout.css'

const tabs = [
  { key: '/home', title: '试穿', icon: <HomeFilledIcon style={{ width: ICON_SIZES.tab, height: ICON_SIZES.tab }} /> },
  { key: '/wardrobe', title: '衣橱', icon: <HangerIcon style={{ width: ICON_SIZES.tab, height: ICON_SIZES.tab }} /> },
  { key: '/workshop', title: '穿搭', icon: <SparkleIcon style={{ width: ICON_SIZES.tab, height: ICON_SIZES.tab }} /> },
  { key: '/profile', title: '我的', icon: <UserOutlineIcon style={{ width: ICON_SIZES.tab, height: ICON_SIZES.tab }} /> },
]

export function TabLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const active = tabs.some((t) => t.key === location.pathname) ? location.pathname : '/home'

  return (
    <div className="tab-layout">
      <div className="tab-layout__main">
        <Outlet />
      </div>
      <TabBar className="app-tabbar" activeKey={active} safeArea onChange={(key) => navigate(key, { replace: true })}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}
