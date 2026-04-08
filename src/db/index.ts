import Dexie, { type Table } from 'dexie'

/** 与 Vue 版共用库名时，两版数据互通 */
export type GarmentRow = {
  id?: number
  name: string
  category: string
  color: string
  createdAt: number
  originalDataUrl: string
  resultDataUrl?: string
}

class WardrobeDb extends Dexie {
  garments!: Table<GarmentRow>

  constructor() {
    super('wardrobe_h5_demo')
    this.version(1).stores({
      garments: '++id, createdAt, category',
    })
  }
}

export const db = new WardrobeDb()
