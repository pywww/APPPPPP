import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Dialog, Empty, Swiper, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { db, type GarmentRow } from '@/db'
import './WardrobeDetail.css'

export default function WardrobeDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const [g, setG] = useState<GarmentRow | null | undefined>(undefined)

  useEffect(() => {
    const n = Number(id)
    if (!Number.isFinite(n)) {
      setG(null)
      return
    }
    db.garments.get(n).then(setG)
  }, [id])

  if (g === undefined) return null
  if (!g) return <Empty description="未找到该衣物" />

  const remove = async () => {
    const ok = await Dialog.confirm({ content: '确定要删除这件衣物吗？' })
    if (!ok) return
    await db.garments.delete(Number(id))
    Toast.show({ content: '已删除' })
    nav('/wardrobe', { replace: true })
  }

  return (
    <div className="wdetail">
      <AppHeader title="衣物详情" onBack={() => nav(-1)} />
      <div className="wdetail__body">
        <Swiper>
          <Swiper.Item>
            <div className="wdetail__slide">
              <img src={g.originalDataUrl} alt="原图" />
              <p className="wdetail__cap">原图</p>
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="wdetail__slide">
              {g.resultDataUrl ? (
                <>
                  <img src={g.resultDataUrl} alt="上身" />
                  <p className="wdetail__cap">上身效果</p>
                </>
              ) : (
                <p className="wdetail__cap muted">暂无上身效果图</p>
              )}
            </div>
          </Swiper.Item>
        </Swiper>
        <div className="wdetail__info">
          <h2>{g.name || '未命名'}</h2>
          <p>品类：{g.category}</p>
          <p>颜色：{g.color || '未设置'}</p>
          <p className="muted">录入时间：{new Date(g.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="wdetail__footer">
        <Button block fill="outline" onClick={() => nav(`/tryon/edit?id=${id}`)}>
          编辑
        </Button>
        <Button block color="danger" fill="outline" style={{ marginTop: 8 }} onClick={remove}>
          删除
        </Button>
      </div>
    </div>
  )
}
