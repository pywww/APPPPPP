import { DeleteOutline, EditSOutline } from 'antd-mobile-icons'

type Props = {
  onEdit: () => void
  onDelete: () => void
}

/**
 * 底部固定操作区：主色「编辑」+ 描边「删除」，与设计稿一致并带图标。
 */
export function WardrobeDetailActions({ onEdit, onDelete }: Props) {
  return (
    <footer className="wardrobe-detail__footer">
      <div className="form__actions wardrobe-detail__actions">
        <button type="button" className="btn btn--primary btn--md wardrobe-detail__btn-edit" onClick={onEdit}>
          <EditSOutline className="wardrobe-detail__btn-icon" />
          编辑
        </button>
        <button type="button" className="btn btn--secondary btn--md wardrobe-detail__btn-outline-del" onClick={onDelete}>
          <DeleteOutline className="wardrobe-detail__btn-icon" />
          删除
        </button>
      </div>
    </footer>
  )
}
