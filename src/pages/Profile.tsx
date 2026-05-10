import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { LinkOutline, RightOutline, TagOutline, UnlockOutline } from 'antd-mobile-icons'
import { AppHeader } from '@/components/layout/AppHeader'
import { HangerIcon, MenuLinesIcon, MoreDotsVerticalIcon, UserOutlineIcon } from '@/components/icons/AppIcons'
import { useAppStore } from '@/stores/appStore'
import './Profile.css'

/**
 * 个人中心 — 对齐设计稿：顶栏标题「个人中心」、用户卡、我的模特（编辑+大图）、
 * 我的穿搭 / 新手教程独立卡片、隐私政策与退出登录。
 */
export default function Profile() {
  const nav = useNavigate()
  const modelPhoto = useAppStore((s) => s.modelPhoto)

  return (
    <div className="profile page">
      <AppHeader
        title="个人中心"
        showBack
        onBack={() => nav(-1)}
        rightSlot={
          <button type="button" className="app-header__icon-btn" aria-label="更多">
            <MoreDotsVerticalIcon className="app-header__more-icon" />
          </button>
        }
      />

      <main className="profile__main">
        {/* 用户摘要卡 */}
        <section className="profile__hero card" aria-label="用户信息">
          <div className="profile__avatar">
            <UserOutlineIcon className="profile__avatar-svg" />
          </div>
          <div className="profile__hello">
            <p className="profile__name">皮皮</p>
            <p className="profile__sub">ID: 8849201</p>
          </div>
        </section>

        {/* 我的模特：标题行 + 大图卡 */}
        <section className="profile__section" aria-labelledby="profile-models-heading">
          <div className="profile__section-head">
            <h2 id="profile-models-heading" className="profile__section-title">
              我的模特
            </h2>
            <button type="button" className="profile__edit-btn" onClick={() => nav('/profile/model')}>
              编辑
            </button>
          </div>
          <div className="profile__model-card card">
            {modelPhoto ? (
              <img src={modelPhoto} alt="当前模特" className="profile__model-photo" />
            ) : (
              <div className="profile__model-placeholder">
                <span className="profile__model-placeholder-text">暂未设置模特</span>
              </div>
            )}
            <div className="profile__model-tag">
              <TagOutline className="profile__model-tag-icon" aria-hidden />
              <span>A-01</span>
            </div>
          </div>
        </section>

        {/* 我的穿搭 — 独立卡片 */}
        <button type="button" className="profile__tile card" onClick={() => nav('/looks')}>
          <span className="profile__tile-icon profile__tile-icon--pink" aria-hidden>
            <HangerIcon className="profile__tile-icon-svg" />
          </span>
          <span className="profile__tile-label">我的穿搭</span>
          <span className="profile__tile-meta">12 套方案</span>
          <RightOutline className="profile__tile-chevron" aria-hidden />
        </button>

        {/* 新手教程 — 独立卡片 */}
        <button type="button" className="profile__tile card" onClick={() => nav('/onboarding')}>
          <span className="profile__tile-icon profile__tile-icon--blue" aria-hidden>
            <MenuLinesIcon className="profile__tile-icon-svg" />
          </span>
          <span className="profile__tile-label">查看新手教程</span>
          <RightOutline className="profile__tile-chevron" aria-hidden />
        </button>

        {/* 底部分割与文字链 */}
        <div className="profile__footer-links" role="navigation" aria-label="协议与账号">
          <div className="profile__rule" aria-hidden />
          <button
            type="button"
            className="profile__text-link"
            onClick={() => Toast.show({ content: '敬请期待' })}
          >
            <span>隐私政策</span>
            <LinkOutline className="profile__text-link-icon" aria-hidden />
          </button>
          <button
            type="button"
            className="profile__text-link"
            onClick={() => Toast.show({ content: '已退出登录' })}
          >
            <span>退出登录</span>
            <UnlockOutline className="profile__text-link-icon" aria-hidden />
          </button>
        </div>
      </main>
    </div>
  )
}
