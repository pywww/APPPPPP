/**
 * 衣物分类选项（与衣橱筛选、详情选择器一致；不含「全部」）
 * 对应设计稿图二列表：上衣 / 下装 / 连衣裙 / 外套 / 鞋子 / 配饰 / 其他
 */
export const GARMENT_CATEGORY_OPTIONS = ['上衣', '下装', '连衣裙', '外套', '鞋子', '配饰', '其他'] as const

export type GarmentCategoryOption = (typeof GARMENT_CATEGORY_OPTIONS)[number]
