import { useNavigate } from 'react-router-dom'
import { RightOutline, UserOutline } from 'antd-mobile-icons'
import { AppHeader } from '@/components/layout/AppHeader'
import { AccessibilityPersonIcon, HangerIcon, ICON_SIZES, SparkleIcon } from '@/components/icons/AppIcons'
import './Home.css'

const HERO_IMAGE_URL = 'https://www.figma.com/api/mcp/asset/ba09fec6-9842-4c1b-8de1-572bd24ee1e9'

export default function Home() {
  const nav = useNavigate()

  return (
    <div className="home">
      <AppHeader title="AI 穿搭助手" showBack={false} />

      {/* 关键引导卡：保持与设计稿一致的“先设置模特”入口 */}
      <button type="button" className="home__setup-card" onClick={() => nav('/model/setup1')}>
        <span className="home__setup-icon" aria-hidden>
          <UserOutline />
        </span>
        <span className="home__setup-text">点击设置你的模特</span>
        <RightOutline className="home__setup-arrow" />
      </button>

      <button type="button" className="home__hero" onClick={() => nav('/tryon/pick')}>
        <div className="home__hero-image-wrap">
          <img className="home__hero-image" src={HERO_IMAGE_URL} alt="试穿主视觉模特图" />
        </div>
        <div className="home__hero-mask" />
        <div className="home__hero-copy">
          <p className="home__eyebrow">AI试穿</p>
          <h2 className="home__hero-title">试穿新衣</h2>
          <span className="home__hero-cta" aria-hidden>
            <AccessibilityPersonIcon />
          </span>
        </div>
      </button>

      <section className="home__grid">
        <button type="button" className="home__grid-card home__grid-card--workshop" onClick={() => nav('/workshop')}>
          <span className="home__grid-icon" aria-hidden>
            <SparkleIcon style={{ width: ICON_SIZES.card, height: ICON_SIZES.card }} />
          </span>
          <p className="home__grid-title">穿搭</p>
        </button>
        <button type="button" className="home__grid-card home__grid-card--wardrobe" onClick={() => nav('/wardrobe')}>
          <span className="home__grid-icon" aria-hidden>
            <HangerIcon style={{ width: ICON_SIZES.card, height: ICON_SIZES.card }} />
          </span>
          <p className="home__grid-title">衣橱</p>
        </button>
      </section>
    </div>
  )
}
