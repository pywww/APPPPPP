import { useCallback, useState, type RefObject } from 'react'
import { Input, Popup, Toast } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import type { GarmentDto } from '@/api/garments'
import { GARMENT_CATEGORY_OPTIONS } from '@/constants/garmentCategories'

type Props = {
  garment: GarmentDto
  /** 用户选择新分类后由页面调用接口并回写列表 */
  onSelectCategory: (category: string) => Promise<void>
  /** 弹层挂载节点（衣物详情根内 div），使遮罩与面板限制在详情画幅并从底部滑入 */
  categorySheetMountRef: RefObject<HTMLDivElement | null>
  /** 试穿入库草稿：可编辑颜色 */
  isDraft?: boolean
  onColorChange?: (color: string) => void
}

/**
 * 衣物信息区：大标题 + 分类（可点选弹出与图二一致的 7 项）+ 颜色行 + 录入时间。
 * 分类选项为底部弹层内横向可滚动标签。
 */
export function WardrobeDetailMetaCard({
  garment,
  onSelectCategory,
  categorySheetMountRef,
  isDraft,
  onColorChange,
}: Props) {
  const { name, category, color, createdAt } = garment
  const [categorySheetOpen, setCategorySheetOpen] = useState(false)

  const pickCategory = useCallback(
    async (next: string) => {
      if (next === category) {
        Toast.show({ content: '已是当前分类' })
        setCategorySheetOpen(false)
        return
      }
      try {
        await onSelectCategory(next)
        if (!isDraft) {
          Toast.show({ content: '分类已更新' })
        }
        setCategorySheetOpen(false)
      } catch (e) {
        Toast.show({ content: e instanceof Error ? e.message : '更新失败' })
      }
    },
    [category, isDraft, onSelectCategory],
  )

  return (
    <section className="wardrobe-detail__meta">
      <h2 className="wardrobe-detail__hero-title">{name || '未命名'}</h2>

      <button
        type="button"
        className="wardrobe-detail__prop-card wardrobe-detail__prop-card--category"
        onClick={() => setCategorySheetOpen(true)}
        aria-label={`选择分类，当前为 ${category || '未分类'}`}
      >
        <span className="wardrobe-detail__prop-label">分类</span>
        <span className="wardrobe-detail__prop-value wardrobe-detail__prop-value--with-chevron">
          <span>{category || '未分类'}</span>
          <RightOutline className="wardrobe-detail__prop-chevron" aria-hidden />
        </span>
      </button>

      {isDraft && onColorChange ? (
        <div className="wardrobe-detail__prop-card wardrobe-detail__prop-card--color-edit">
          <span className="wardrobe-detail__prop-label">颜色</span>
          <Input
            className="wardrobe-detail__color-input"
            value={color}
            onChange={onColorChange}
            placeholder="如：米色、黑色"
            clearable
          />
        </div>
      ) : (
        <div className="wardrobe-detail__prop-card">
          <span className="wardrobe-detail__prop-label">颜色</span>
          <span className="wardrobe-detail__prop-value wardrobe-detail__prop-value--color">
            <span className="wardrobe-detail__swatch" aria-hidden />
            <span>{color || '未设置'}</span>
          </span>
        </div>
      )}

      <p className="wardrobe-detail__time">
        {isDraft
          ? '填好分类与颜色后，点击下方「确认」保存并进入我的衣橱'
          : `录入时间 · ${new Date(createdAt).toLocaleString()}`}
      </p>

      <Popup
        visible={categorySheetOpen}
        onClose={() => setCategorySheetOpen(false)}
        position="bottom"
        closeOnMaskClick
        getContainer={() => categorySheetMountRef.current ?? document.body}
        bodyClassName="wardrobe-detail__category-popup-body"
        bodyStyle={{ padding: 0 }}
        destroyOnClose
      >
        <div className="wardrobe-detail__category-panel">
          <div
            className="wardrobe-detail__category-scroll"
            role="listbox"
            aria-label="选择衣物分类"
          >
            {GARMENT_CATEGORY_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                role="option"
                aria-selected={c === category}
                className={
                  c === category
                    ? 'tag tag--active wardrobe-detail__category-pill'
                    : 'tag tag--default wardrobe-detail__category-pill'
                }
                onClick={() => void pickCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="wardrobe-detail__category-cancel"
            onClick={() => setCategorySheetOpen(false)}
          >
            取消
          </button>
        </div>
      </Popup>
    </section>
  )
}
