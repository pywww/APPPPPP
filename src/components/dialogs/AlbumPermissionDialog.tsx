import './AlbumPermissionDialog.css'

type AlbumPermissionDialogProps = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function AlbumPermissionDialog({ open, onCancel, onConfirm }: AlbumPermissionDialogProps) {
  if (!open) return null

  return (
    <div className="album-permission" role="dialog" aria-modal="true" aria-labelledby="album-permission-title">
      <div className="album-permission__mask" onClick={onCancel} />
      <section className="album-permission__panel card">
        <div className="album-permission__icon-wrap" aria-hidden>
          <span className="album-permission__icon-circle">
            <span className="album-permission__icon-glyph">
              <span className="album-permission__icon-phone" />
              <span className="album-permission__icon-photo" />
            </span>
          </span>
        </div>
        <h2 id="album-permission-title" className="album-permission__title">
          访问权限请求
        </h2>
        <p className="album-permission__desc">需要访问相册以选择服装图片，为您提供更加精准的搭配建议和数字化衣橱管理。</p>
        <div className="album-permission__actions">
          <button type="button" className="btn btn--primary btn--md" onClick={onConfirm}>
            允许访问
          </button>
          <button type="button" className="album-permission__text-btn" onClick={onCancel}>
            以后再说
          </button>
        </div>
      </section>
    </div>
  )
}
