import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { useTryOnStore } from '@/stores/tryOnStore'
import { db } from '@/db'
import './TryOnResult.css'

export default function TryOnResult() {
  const nav = useNavigate()
  const garmentPreviewUrl = useTryOnStore((s) => s.garmentPreviewUrl)
  const resultUrl = useTryOnStore((s) => s.resultUrl)
  const clear = useTryOnStore((s) => s.clear)

  useEffect(() => {
    if (!resultUrl) nav('/tryon/pick', { replace: true })
  }, [nav, resultUrl])

  if (!resultUrl) return null

  const save = async () => {
    await db.garments.add({
      name: '新衣物',
      category: '其他',
      color: '',
      createdAt: Date.now(),
      originalDataUrl: garmentPreviewUrl,
      resultDataUrl: resultUrl,
    })
    Toast.show({ content: '已保存到衣橱' })
  }

  return (
    <div className="tresult">
      <AppHeader title="试穿结果" onBack={() => nav(-1)} />
      <div className="tresult__img">
        <img src={resultUrl} alt="试穿效果" />
      </div>
      <div className="tresult__bar">
        <Button block color="primary" shape="rounded" onClick={save}>
          保存到衣橱
        </Button>
        <Button
          block
          fill="outline"
          shape="rounded"
          style={{ marginTop: 8 }}
          onClick={() => {
            Toast.show({ content: '下一迭代：默认选中当前衣' })
          }}
        >
          搭配衣橱其他衣服
        </Button>
        <Button
          block
          fill="outline"
          shape="rounded"
          style={{ marginTop: 8 }}
          onClick={() => {
            clear()
            nav('/tryon/pick', { replace: true })
          }}
        >
          再试一件
        </Button>
      </div>
    </div>
  )
}
