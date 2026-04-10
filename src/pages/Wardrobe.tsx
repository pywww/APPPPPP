import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ActionSheet, Button, Empty, PullToRefresh, Toast } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons'
import { AppHeader } from '@/components/layout/AppHeader'
import { db, type GarmentRow } from '@/db'
import './Wardrobe.css'

const categories = ['全部', '上衣', '下装', '连衣裙', '外套', '鞋子', '配饰', '其他']

type WardrobeLocationState = { savedGarmentId?: number }

export default function Wardrobe() {
  const nav = useNavigate()
  const location = useLocation()
  const [list, setList] = useState<GarmentRow[]>([])
  const [category, setCategory] = useState('全部')
  /** 刚从试穿结果保存进入时高亮对应格子 */
  const [emphasizeId, setEmphasizeId] = useState<number | undefined>()

  const load = useCallback(async () => {
    const rows = await db.garments.orderBy('createdAt').reverse().toArray()
    setList(rows)
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

  const openFilter = () => {
    ActionSheet.show({
      actions: categories.map((c) => ({
        text: c,
        key: c,
        onClick: () => {
          setCategory(c)
          Toast.show({ content: c === '全部' ? '显示全部' : `已筛选：${c}` })
        },
      })),
      cancelText: '取消',
    })
  }

  return (
    <div className="wardrobe">
      <AppHeader
        title="我的衣橱"
        showBack={false}
        rightSlot={
          <button type="button" className="app-header__icon-btn" aria-label="筛选" onClick={openFilter}>
            <FilterOutline fontSize={20} />
          </button>
        }
      />
      <PullToRefresh onRefresh={load}>
        {filtered.length === 0 ? (
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
                  emphasizeId != null && g.id === emphasizeId ? 'wardrobe__cell wardrobe__cell--emphasize' : 'wardrobe__cell'
                }
                onClick={() => nav(`/wardrobe/item/${g.id}`)}
              >
                <img src={g.resultDataUrl || g.originalDataUrl} alt={g.name} />
              </button>
            ))}
          </div>
        )}
      </PullToRefresh>
    </div>
  )
}
