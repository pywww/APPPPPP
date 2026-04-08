import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Empty, Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { useTryOnStore } from '@/stores/tryOnStore'
import { fileToDataUrl } from '@/utils/image'

export default function TryOnPick() {
  const nav = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const setGarmentPreview = useTryOnStore((s) => s.setGarmentPreview)

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      Toast.show({ content: '请选择图片文件' })
      return
    }
    try {
      const url = await fileToDataUrl(file)
      setGarmentPreview(url)
      nav('/tryon/loading')
    } catch {
      Toast.show({ content: '读取图片失败' })
    }
  }

  return (
    <div style={{ minHeight: '100%', background: 'var(--color-bg)' }}>
      <AppHeader title="试穿新衣" onBack={() => nav(-1)} />
      <div style={{ padding: '24px var(--space-page)' }}>
        <Empty description="上传您的新衣照片开始试穿" />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button color="primary" shape="rounded" onClick={() => inputRef.current?.click()}>
            选择图片
          </Button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 24, lineHeight: 1.5 }}>
          Demo：浏览器将弹出文件选择；正式版再对齐相册权限弹窗。
        </p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
    </div>
  )
}
