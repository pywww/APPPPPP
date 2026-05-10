import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { AppHeader } from '@/components/layout/AppHeader'
import { AlbumPermissionDialog } from '@/components/dialogs/AlbumPermissionDialog'
import { CameraPlusIcon } from '@/components/icons/AppIcons'
import { useTryOnStore } from '@/stores/tryOnStore'
import { fileToDataUrl } from '@/utils/image'
import './TryOnPick.css'

const ALBUM_PERMISSION_KEY = 'tryon_album_permission_granted'

/**
 * 试穿选衣：空态对应 Figma EmptyA（1:491），已选图态对应 SelectedA（1:1204）。
 * 同一路由 /tryon/pick，通过 tryOnStore.garmentPreviewUrl 切换展示。
 */
export default function TryOnPick() {
  const nav = useNavigate()
  const albumInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const [showAlbumPermission, setShowAlbumPermission] = useState(false)
  const garmentPreviewUrl = useTryOnStore((s) => s.garmentPreviewUrl)
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
    } catch {
      Toast.show({ content: '读取图片失败' })
    }
  }

  const openAlbumWithPermission = () => {
    const granted = window.localStorage.getItem(ALBUM_PERMISSION_KEY) === '1'
    if (granted) {
      albumInputRef.current?.click()
      return
    }
    setShowAlbumPermission(true)
  }

  const onConfirmAlbumPermission = () => {
    window.localStorage.setItem(ALBUM_PERMISSION_KEY, '1')
    setShowAlbumPermission(false)
    albumInputRef.current?.click()
  }

  const goTryOn = () => {
    if (!garmentPreviewUrl) return
    nav('/tryon/loading')
  }

  const onHeaderBack = () => {
    if (garmentPreviewUrl) {
      setGarmentPreview('')
      return
    }
    nav(-1)
  }

  return (
    <div className="tpick page">
      <AppHeader title="试穿新衣" onBack={onHeaderBack} />

      <main className="tpick__main">
        <section className="tpick__card card card--large">
          <div
            className={
              garmentPreviewUrl
                ? 'tpick__image-stage tpick__image-stage--has-preview'
                : 'tpick__image-stage'
            }
          >
            {garmentPreviewUrl ? (
              <>
                <img
                  src={garmentPreviewUrl}
                  alt="已选择的衣物照片"
                  className="tpick__preview-img"
                  loading="lazy"
                />
                <span className="badge badge--success tpick__preview-badge">衣物已识别</span>
              </>
            ) : (
              <div className="tpick__empty-chip">
                <button
                  type="button"
                  className="tpick__empty-icon-btn"
                  aria-label="上传照片"
                  onClick={openAlbumWithPermission}
                >
                  <span className="tpick__empty-icon" aria-hidden>
                    <CameraPlusIcon className="tpick__empty-icon-svg" />
                  </span>
                </button>
                <span className="tpick__empty-title">上传您的新衣服照片开始试穿</span>
              </div>
            )}
          </div>

          <div className="tpick__tips">
            {garmentPreviewUrl ? (
              <div className="tpick__tips-detail">
                <p className="tpick__tips-detail-line">已载入照片。点击「开始试穿」后，</p>
                <p className="tpick__tips-detail-line">AI 将在 15-30 秒内为您生成逼真的上身效果图。</p>
              </div>
            ) : (
              <div className="tpick__tips-detail tpick__tips-detail--empty">
                <p className="tpick__tips-detail-line">为了获得最佳的试穿效果，请确保衣服照片光线</p>
                <p className="tpick__tips-detail-line">充足且背景简洁，建议使用全身或半身正面照。</p>
              </div>
            )}
          </div>
        </section>

        <div className="tpick__actions">
          {garmentPreviewUrl ? (
            <>
              <button type="button" className="btn btn--primary btn--md" onClick={goTryOn}>
                开始试穿
              </button>
              <button type="button" className="btn btn--secondary btn--md" onClick={openAlbumWithPermission}>
                重新选择
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn--primary btn--md" onClick={openAlbumWithPermission}>
                从相册上传
              </button>
              <button type="button" className="btn btn--secondary btn--md" onClick={() => cameraInputRef.current?.click()}>
                拍摄新照片
              </button>
            </>
          )}
        </div>
      </main>

      <input
        ref={albumInputRef}
        type="file"
        accept="image/*"
        className="tpick__file-input"
        onChange={onFile}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="tpick__file-input"
        onChange={onFile}
      />

      <AlbumPermissionDialog
        open={showAlbumPermission}
        onCancel={() => setShowAlbumPermission(false)}
        onConfirm={onConfirmAlbumPermission}
      />
    </div>
  )
}
