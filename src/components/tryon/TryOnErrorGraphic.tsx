/**
 * Figma Screen/TryOn/Error（1:1311）— 中部插画区域
 * 与 Loading 页的浅紫圆 + 衣架形成对照：此处为浅珊瑚圆底 + 警示三角，保持线框图标风格一致。
 */
export function TryOnErrorGraphic() {
  return (
    <div className="terr__graphic" aria-hidden>
      <div className="terr__graphic-bg">
        {/* 线框警示三角 + 叹号，与 AppIcons 中 stroke 风格统一 */}
        <svg className="terr__graphic-svg" viewBox="0 0 64 64" width={32} height={32}>
          <path
            d="M32 12L52 46H12L32 12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M32 26V34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="32" cy="40" r="1.8" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
