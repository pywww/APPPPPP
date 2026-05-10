import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Dialog, Empty, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { WardrobeDetailActions } from '@/components/wardrobe-detail/WardrobeDetailActions'
import { WardrobeDetailImageCarousel } from '@/components/wardrobe-detail/WardrobeDetailImageCarousel'
import { WardrobeDetailMetaCard } from '@/components/wardrobe-detail/WardrobeDetailMetaCard'
import { createGarment, deleteGarment, getGarment, updateGarment, type GarmentDto } from '@/api/garments'
import './WardrobeDetail.css'

/** 试穿结果页「保存到衣橱」传入的草稿数据 */
type WardrobeNewFromTryOnState = {
  fromTryOn: true
  originalDataUrl: string
  resultDataUrl: string
}

function isFromTryOnState(s: unknown): s is WardrobeNewFromTryOnState {
  if (!s || typeof s !== 'object') return false
  const o = s as Record<string, unknown>
  return (
    o.fromTryOn === true &&
    typeof o.originalDataUrl === 'string' &&
    typeof o.resultDataUrl === 'string'
  )
}

/**
 * 衣服详情页 — 对应 Figma「衣橱 app」中节点 1:676（Screen/Wardrobe/Detail）。
 * 路由 `/wardrobe/item/new` + location.state：从试穿入库草稿，填分类与颜色后 POST 创建。
 */
export default function WardrobeDetail() {
  const { id } = useParams()
  const location = useLocation()
  const nav = useNavigate()
  const isDraftNew = id === 'new'
  const draftFromTryOn = isDraftNew && isFromTryOnState(location.state) ? location.state : null

  const [draftCategory, setDraftCategory] = useState('其他')
  const [draftColor, setDraftColor] = useState('')

  const [g, setG] = useState<GarmentDto | null | undefined>(undefined)
  const categorySheetMountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isDraftNew) return
    const n = Number(id)
    if (!Number.isFinite(n)) {
      setG(null)
      return
    }
    getGarment(n).then(setG).catch(() => setG(null))
  }, [id, isDraftNew])

  const remove = useCallback(async () => {
    const ok = await Dialog.confirm({ content: '确定要删除这件衣物吗？' })
    if (!ok) return
    await deleteGarment(Number(id))
    Toast.show({ content: '已删除' })
    nav('/wardrobe', { replace: true })
  }, [id, nav])

  const goEdit = useCallback(() => {
    nav(`/tryon/edit?id=${id}`)
  }, [id, nav])

  const handleSelectCategory = useCallback(
    async (category: string) => {
      const n = Number(id)
      if (!Number.isFinite(n)) return
      const next = await updateGarment(n, { category })
      setG(next)
    },
    [id],
  )

  /** —— 试穿入库草稿：仅本地更新分类，保存时一次性 POST —— */
  if (isDraftNew) {
    if (!draftFromTryOn) {
      return (
      <div className="page wardrobe-detail wardrobe-detail--draft-new">
        <AppHeader title="衣物详情" onBack={() => nav(-1)} />
          <div className="wardrobe-detail__empty-wrap">
            <Empty description="请从试穿结果页点击「保存到衣橱」进入" />
          </div>
        </div>
      )
    }

    const draftGarment: GarmentDto = {
      id: 0,
      name: '新衣物',
      category: draftCategory,
      color: draftColor,
      createdAt: new Date().toISOString(),
      originalDataUrl: draftFromTryOn.originalDataUrl,
      resultDataUrl: draftFromTryOn.resultDataUrl,
    }

    const handleDraftCategory = async (category: string) => {
      setDraftCategory(category)
    }

    const saveDraftToWardrobe = async () => {
      try {
        const row = await createGarment({
          name: '新衣物',
          category: draftCategory,
          color: draftColor.trim(),
          originalDataUrl: draftFromTryOn.originalDataUrl,
          resultDataUrl: draftFromTryOn.resultDataUrl,
        })
        Toast.show({ content: '已保存到衣橱' })
        // 进入「我的衣橱」列表并高亮新项；不再停留在单件详情，避免与「从衣橱点进详情」混淆
        nav('/wardrobe', { replace: true, state: { savedGarmentId: row.id } })
      } catch (e) {
        Toast.show({ content: e instanceof Error ? e.message : '保存失败，请稍后重试' })
      }
    }

    return (
      <div className="page wardrobe-detail wardrobe-detail--draft-new">
        <AppHeader title="衣物详情" onBack={() => nav(-1)} />
        <div className="wardrobe-detail__dash-rule" aria-hidden />

        <main className="wardrobe-detail__main">
          <WardrobeDetailImageCarousel
            originalDataUrl={draftFromTryOn.originalDataUrl}
            resultDataUrl={draftFromTryOn.resultDataUrl}
          />
          <WardrobeDetailMetaCard
            garment={draftGarment}
            onSelectCategory={handleDraftCategory}
            categorySheetMountRef={categorySheetMountRef}
            isDraft
            onColorChange={setDraftColor}
          />
        </main>

        <footer className="wardrobe-detail__footer wardrobe-detail__footer--draft">
          <div className="form__actions wardrobe-detail__actions wardrobe-detail__actions--draft">
            <button
              type="button"
              className="btn btn--primary btn--md wardrobe-detail__btn-save-draft"
              onClick={() => void saveDraftToWardrobe()}
            >
              确认
            </button>
            <button type="button" className="btn btn--secondary btn--md" onClick={() => nav(-1)}>
              返回
            </button>
          </div>
        </footer>
        <div ref={categorySheetMountRef} className="wardrobe-detail__sheet-portal" aria-hidden />
      </div>
    )
  }

  if (g === undefined) {
    return (
      <div className="page wardrobe-detail">
        <AppHeader title="衣物详情" onBack={() => nav(-1)} />
        <p className="wardrobe-detail__loading">加载中…</p>
      </div>
    )
  }

  if (!g) {
    return (
      <div className="page wardrobe-detail">
        <AppHeader title="衣物详情" onBack={() => nav(-1)} />
        <div className="wardrobe-detail__empty-wrap">
          <Empty description="未找到该衣物" />
        </div>
      </div>
    )
  }

  return (
    <div className="page wardrobe-detail">
      <AppHeader title="衣物详情" onBack={() => nav(-1)} />
      <div className="wardrobe-detail__dash-rule" aria-hidden />

      <main className="wardrobe-detail__main">
        <WardrobeDetailImageCarousel originalDataUrl={g.originalDataUrl} resultDataUrl={g.resultDataUrl} />
        <WardrobeDetailMetaCard
          garment={g}
          onSelectCategory={handleSelectCategory}
          categorySheetMountRef={categorySheetMountRef}
        />
      </main>

      <WardrobeDetailActions onEdit={goEdit} onDelete={remove} />
      <div ref={categorySheetMountRef} className="wardrobe-detail__sheet-portal" aria-hidden />
    </div>
  )
}
