import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ActionSheet, Button, Empty, PullToRefresh, Toast } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons'
import { AppHeader } from '@/components/layout/AppHeader'
import { listGarments, type GarmentDto } from '@/api/garments'
import './Wardrobe.css'

const categories = ['全部', '上衣', '下装', '连衣裙', '外套', '鞋子', '配饰', '其他']

type WardrobeLocationState = { savedGarmentId?: number }

const FAB_DRAG_THRESHOLD_PX = 6

export default function Wardrobe() {
  const nav = useNavigate()
  const location = useLocation()
  const wardrobeRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)
  /** 拖拽后使用 left/top 定位；未拖拽时沿用 CSS 默认 right/bottom */
  const [fabPos, setFabPos] = useState<{ left: number; top: number } | null>(null)
  const fabDragRef = useRef<{
    offsetX: number
    offsetY: number
    startClientX: number
    startClientY: number
  } | null>(null)
  const fabMovedRef = useRef(false)
  const fabSuppressClickRef = useRef(false)
  const [list, setList] = useState<GarmentDto[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [category, setCategory] = useState('全部')
  /** 刚从试穿结果保存进入时高亮对应试穿图 */
  const [emphasizeId, setEmphasizeId] = useState<number | undefined>()

  const load = useCallback(async () => {
    setLoading(true)
    setErrorMsg('')
    try {
      const rows = await listGarments()
      setList(rows)
    } catch {
      setErrorMsg('加载衣橱失败，请下拉重试')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  /** 接收试穿页传入的保存项 id，清掉 state 避免返回时再触发 */
  useEffect(() => {
    const id = (location.state as WardrobeLocationState | null)?.savedGarmentId
    if (typeof id !== 'number') return
    setEmphasizeId(id)
    nav('/wardrobe', { replace: true, state: {} })
  }, [location.state, nav])

  /** 列表就绪后滚动到刚保存的试穿图 */
  useEffect(() => {
    if (emphasizeId == null) return
    if (!list.some((g) => g.id === emphasizeId)) return
    const raf = requestAnimationFrame(() => {
      document.querySelector(`[data-garment-id="${emphasizeId}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    })
    const t = window.setTimeout(() => setEmphasizeId(undefined), 2800)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
    }
  }, [emphasizeId, list])

  const filtered = useMemo(() => {
    if (category === '全部') return list
    return list.filter((g) => g.category === category)
  }, [list, category])

  const changeCategory = (next: string, showToast = false) => {
    setCategory(next)
    if (showToast) {
      Toast.show({ content: next === '全部' ? '显示全部' : `已筛选：${next}` })
    }
  }

  const openFilter = () => {
    ActionSheet.show({
      actions: categories.map((c) => ({
        text: c,
        key: c,
        onClick: () => changeCategory(c, true),
      })),
      cancelText: '取消',
    })
  }

  const clampFab = useCallback((left: number, top: number) => {
    const root = wardrobeRef.current
    const fab = fabRef.current
    if (!root || !fab) return { left, top }
    const rw = root.getBoundingClientRect()
    const fw = fab.offsetWidth
    const fh = fab.offsetHeight
    const maxLeft = Math.max(0, rw.width - fw)
    const maxTop = Math.max(0, rw.height - fh)
    return {
      left: Math.min(Math.max(0, left), maxLeft),
      top: Math.min(Math.max(0, top), maxTop),
    }
  }, [])

  /** 视口尺寸变化时把 FAB 限制在衣橱区域内 */
  useEffect(() => {
    if (fabPos == null) return
    const onResize = () => {
      setFabPos((prev) => (prev ? clampFab(prev.left, prev.top) : null))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [fabPos, clampFab])

  const handleFabPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    const root = wardrobeRef.current
    const fab = fabRef.current
    if (!root || !fab) return
    const fr = fab.getBoundingClientRect()
    fabDragRef.current = {
      offsetX: e.clientX - fr.left,
      offsetY: e.clientY - fr.top,
      startClientX: e.clientX,
      startClientY: e.clientY,
    }
    fabMovedRef.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleFabPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const drag = fabDragRef.current
    const root = wardrobeRef.current
    if (!drag || !root) return
    const dx = Math.abs(e.clientX - drag.startClientX)
    const dy = Math.abs(e.clientY - drag.startClientY)
    if (!fabMovedRef.current && dx < FAB_DRAG_THRESHOLD_PX && dy < FAB_DRAG_THRESHOLD_PX) return

    fabMovedRef.current = true
    const rw = root.getBoundingClientRect()
    const rawLeft = e.clientX - rw.left - drag.offsetX
    const rawTop = e.clientY - rw.top - drag.offsetY
    setFabPos(clampFab(rawLeft, rawTop))
  }

  const handleFabPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    fabDragRef.current = null
    if (fabMovedRef.current) {
      fabSuppressClickRef.current = true
      fabMovedRef.current = false
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* 已释放时忽略 */
    }
  }

  const handleFabClick = () => {
    if (fabSuppressClickRef.current) {
      fabSuppressClickRef.current = false
      return
    }
    nav('/tryon/pick')
  }

  return (
    <div ref={wardrobeRef} className="page wardrobe">
      <AppHeader
        title="我的衣橱"
        showBack={false}
        rightSlot={
          <button
            type="button"
            className="app-header__icon-btn wardrobe__filter-btn"
            aria-label="筛选"
            onClick={openFilter}
          >
            <FilterOutline />
          </button>
        }
      />

      {/* Figma「Nav - QuickCategoryBar」：横向滚动 + 设计系统 tag */}
      <section className="wardrobe__category-bar" aria-label="服饰分类">
        <div className="wardrobe__category-scroll">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? 'tag tag--active wardrobe__category-pill' : 'tag tag--default wardrobe__category-pill'}
              onClick={() => changeCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <PullToRefresh onRefresh={load}>
        {errorMsg ? (
          <div className="wardrobe__empty">
            <Empty description={errorMsg} />
            <Button color="primary" shape="rounded" onClick={load}>
              重新加载
            </Button>
          </div>
        ) : filtered.length === 0 && !loading ? (
          <div className="wardrobe__empty">
            <Empty description="衣橱空空如也" />
            <Button color="primary" shape="rounded" onClick={() => nav('/tryon/pick')}>
              去试穿
            </Button>
          </div>
        ) : (
          <div className="wardrobe__grid">
            {filtered.map((g) => (
              <button
                key={g.id}
                type="button"
                data-garment-id={g.id}
                className={
                  emphasizeId != null && g.id === emphasizeId
                    ? 'wardrobe__cell card wardrobe__cell--emphasize'
                    : 'wardrobe__cell card'
                }
                onClick={() => nav(`/wardrobe/item/${g.id}`)}
              >
                <div className="wardrobe__cell-media">
                  <img src={g.resultDataUrl || g.originalDataUrl} alt={g.name} />
                  <span className="badge badge--success wardrobe__cell-badge">{g.category || '未分类'}</span>
                </div>
                <div className="wardrobe__meta">
                  <p className="wardrobe__name">{g.name}</p>
                  <p className="wardrobe__sub">{g.color || 'Wardrobe'}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </PullToRefresh>

      <button
        ref={fabRef}
        type="button"
        className={fabPos != null ? 'wardrobe__fab wardrobe__fab--placed' : 'wardrobe__fab'}
        style={
          fabPos != null
            ? { left: fabPos.left, top: fabPos.top, right: 'auto', bottom: 'auto' }
            : undefined
        }
        aria-label="新增衣物"
        onPointerDown={handleFabPointerDown}
        onPointerMove={handleFabPointerMove}
        onPointerUp={handleFabPointerUp}
        onPointerCancel={handleFabPointerUp}
        onClick={handleFabClick}
      >
        +
      </button>
    </div>
  )
}
