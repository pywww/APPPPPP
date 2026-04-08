import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionSheet, Button, Empty, PullToRefresh, Toast } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons'
import { AppHeader } from '@/components/layout/AppHeader'
import { db, type GarmentRow } from '@/db'
import './Wardrobe.css'

const categories = ['全部', '上衣', '下装', '连衣裙', '外套', '鞋子', '配饰', '其他']

export default function Wardrobe() {
  const nav = useNavigate()
  const [list, setList] = useState<GarmentRow[]>([])
  const [category, setCategory] = useState('全部')

  const load = useCallback(async () => {
    const rows = await db.garments.orderBy('createdAt').reverse().toArray()
    setList(rows)
  }, [])

  useEffect(() => {
    load()
  }, [load])

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
                className="wardrobe__cell"
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
