import { Swiper } from 'antd-mobile'

type Props = {
  /** 原图地址 */
  originalDataUrl: string
  /** 试穿效果图，无则第二屏展示占位文案 */
  resultDataUrl?: string | null
}

/**
 * 衣物详情顶部图集：固定尺寸画幅 + 轮播，图片以 cover 填充，不撑开容器。
 * 左下角为图注胶囊；指示点叠在图底部居中。
 */
export function WardrobeDetailImageCarousel({ originalDataUrl, resultDataUrl }: Props) {
  return (
    <div className="card card--large wardrobe-detail__media">
      <div className="wardrobe-detail__media-inner">
        <Swiper
          className="wardrobe-detail__swiper"
          loop={false}
          indicatorProps={{ className: 'wardrobe-detail__page-indicator' }}
        >
          <Swiper.Item>
            <div className="wardrobe-detail__slide">
              <img src={originalDataUrl} alt="衣物原图" className="wardrobe-detail__img" />
              <span className="wardrobe-detail__slide-label">衣物原图</span>
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="wardrobe-detail__slide">
              {resultDataUrl ? (
                <>
                  <img src={resultDataUrl} alt="试穿效果" className="wardrobe-detail__img" />
                  <span className="wardrobe-detail__slide-label">试穿效果</span>
                </>
              ) : (
                <p className="wardrobe-detail__slide-placeholder">暂无上身效果图</p>
              )}
            </div>
          </Swiper.Item>
        </Swiper>
      </div>
    </div>
  )
}
