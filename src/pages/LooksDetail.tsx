import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Empty, SpinLoading, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { getLook, type LookDto } from '@/api/looks'
import './LooksDetail.css'

export default function LooksDetail() {
  const nav = useNavigate()
  const { id } = useParams()
  const [row, setRow] = useState<LookDto | null | undefined>(undefined)

  useEffect(() => {
    const n = Number(id)
    if (!Number.isFinite(n)) {
      setRow(null)
      return
    }
    getLook(n)
      .then(setRow)
      .catch(() => {
        Toast.show({ content: '记录不存在' })
        setRow(null)
      })
  }, [id])

  if (row === undefined) {
    return (
      <div className="looks-detail page">
        <AppHeader title="穿搭详情" onBack={() => nav(-1)} />
        <div className="looks-detail__loading">
          <SpinLoading />
        </div>
      </div>
    )
  }

  if (!row) {
    return (
      <div className="looks-detail page">
        <AppHeader title="穿搭详情" onBack={() => nav(-1)} />
        <Empty description="未找到该穿搭记录" />
      </div>
    )
  }

  return (
    <div className="looks-detail page">
      <AppHeader title="穿搭详情" onBack={() => nav(-1)} />
      <main className="looks-detail__main">
        <div className="looks-detail__hero card">
          <img src={row.imageUrl} alt={row.name} className="looks-detail__img" />
        </div>
        <h2 className="looks-detail__name">{row.name}</h2>
        <p className="looks-detail__time">
          保存于 {new Date(row.createdAt).toLocaleString('zh-CN')}
        </p>
      </main>
    </div>
  )
}
