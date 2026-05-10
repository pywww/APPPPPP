import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Empty, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { listGarments, type GarmentDto } from '@/api/garments'
import { createLook } from '@/api/looks'
import { useAppStore } from '@/stores/appStore'
import { useRequest } from 'ahooks'
import './Workshop.css'

const categories = ['全部', '上衣', '下装', '连衣裙', '外套', '鞋子', '配饰', '其他']
const MAX_SELECT = 3

export default function Workshop() {
  const nav = useNavigate()
  const modelPhoto = useAppStore((s) => s.modelPhoto)
  const [category, setCategory] = useState('全部')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const { data: garments = [] } = useRequest(() => listGarments(), {
    refreshDeps: [category],
  })

  const filteredGarments = useMemo(() => {
    if (category === '全部') return garments
    return garments.filter((item) => item.category === category)
  }, [category, garments])

  const selectedGarments = useMemo(() => {
    const lookup = new Map(garments.map((g) => [g.id, g]))
    return selectedIds.map((id) => lookup.get(id)).filter(Boolean) as GarmentDto[]
  }, [garments, selectedIds])

  const toggleSelect = (garment: GarmentDto) => {
    setSelectedIds((prev) => {
      if (prev.includes(garment.id)) return prev.filter((id) => id !== garment.id)
      if (prev.length >= MAX_SELECT) {
        Toast.show({ content: '搭配衣物较多，建议不超过3件以保持效果清晰' })
        return prev
      }
      return [...prev, garment.id]
    })
  }

  const saveLook = async () => {
    if (!selectedGarments.length) {
      Toast.show({ content: '请先选择衣物进行搭配' })
      return
    }
    const first = selectedGarments[0]
    const imageUrl = first.resultDataUrl || first.originalDataUrl
    try {
      await createLook({
        name: `搭配 ${new Date().toLocaleString('zh-CN')}`,
        imageUrl,
      })
      Toast.show({ content: '搭配已保存' })
      nav('/workshop/result', {
        state: {
          lookCount: selectedGarments.length,
        },
      })
    } catch (e) {
      Toast.show({ content: e instanceof Error ? e.message : '保存失败' })
    }
  }

  return (
    <div className="workshop page">
      <AppHeader title="穿搭工坊" showBack={false} />
      <div className="workshop__body">
        <div className="workshop__split">
          <div className="workshop__canvas card">
            {modelPhoto ? (
              <img src={modelPhoto} alt="当前模特" className="workshop__model-photo" />
            ) : (
              <button type="button" className="workshop__model-empty" onClick={() => nav('/profile/model')}>
                <span className="workshop__model-empty-title">点击设置模特</span>
                <span className="workshop__model-empty-sub">先设置模特再进行搭配预览</span>
              </button>
            )}
            <div className="workshop__selected-overlay">
              {selectedGarments.length ? (
                <ul className="workshop__selected-list" aria-label="已选衣物">
                  {selectedGarments.map((item) => (
                    <li key={item.id} className="workshop__selected-item">
                      {item.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="workshop__selected-empty">选择衣物后会在这里显示搭配预览</span>
              )}
            </div>
          </div>

          <div className="workshop__garments card">
            <div className="workshop__category-row" role="tablist" aria-label="衣物分类">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={item === category ? 'tag tag--active' : 'tag tag--default'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {filteredGarments.length ? (
              <div className="workshop__garment-grid">
                {filteredGarments.map((item) => {
                  const isSelected = selectedIds.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={isSelected ? 'workshop__garment-item workshop__garment-item--active' : 'workshop__garment-item'}
                      onClick={() => toggleSelect(item)}
                    >
                      <img src={item.resultDataUrl || item.originalDataUrl} alt={item.name} className="workshop__garment-thumb" />
                      <span className="workshop__garment-name">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="workshop__empty-wrap">
                <Empty description="衣橱空空如也" />
                <button type="button" className="btn btn--primary btn--md workshop__empty-btn" onClick={() => nav('/tryon/pick')}>
                  去试穿
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="workshop__footer">
          <button type="button" className="btn btn--primary btn--md workshop__save-btn" onClick={saveLook}>
            保存搭配
          </button>
        </div>
      </div>
    </div>
  )
}
