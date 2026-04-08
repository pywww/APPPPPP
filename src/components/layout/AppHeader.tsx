import type { ReactNode } from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import { MenuLinesIcon, MoreDotsVerticalIcon } from '@/components/icons/AppIcons'
import './AppHeader.css'

type AppHeaderProps = {
  title: string
  showBack?: boolean
  onBack?: () => void
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

export function AppHeader({ title, showBack = true, onBack, leftSlot, rightSlot }: AppHeaderProps) {
  const leftContent = showBack ? (
    <button type="button" className="app-header__icon-btn" onClick={onBack} aria-label="返回">
      <LeftOutline />
    </button>
  ) : (
    (leftSlot ?? (
      <button type="button" className="app-header__icon-btn" aria-label="菜单">
        <MenuLinesIcon className="app-header__menu-icon" />
      </button>
    ))
  )

  const rightContent =
    rightSlot ??
    (showBack ? (
      <span className="app-header__placeholder" aria-hidden />
    ) : (
      <button type="button" className="app-header__icon-btn" aria-label="更多">
        <MoreDotsVerticalIcon className="app-header__more-icon" />
      </button>
    ))

  return (
    <header className="app-header">
      <div className="app-header__side">{leftContent}</div>
      <h1 className="app-header__title">{title}</h1>
      <div className="app-header__side app-header__side--right">{rightContent}</div>
    </header>
  )
}
