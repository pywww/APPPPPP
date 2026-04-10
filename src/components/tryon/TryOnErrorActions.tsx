import type { ReactNode } from 'react'

type TryOnErrorActionsProps = {
  /** 主操作（如重新上传） */
  primary: ReactNode
  /** 次要操作（如返回首页） */
  secondary: ReactNode
}

/**
 * Figma 1:1311 — 底部双操作区：移动端优先纵向堆叠，宽屏可并排，保证 48px 最小点击高度。
 */
export function TryOnErrorActions({ primary, secondary }: TryOnErrorActionsProps) {
  return (
    <div className="terr__actions" role="group" aria-label="试穿失败操作">
      <div className="terr__actions-inner">{primary}</div>
      <div className="terr__actions-inner">{secondary}</div>
    </div>
  )
}
