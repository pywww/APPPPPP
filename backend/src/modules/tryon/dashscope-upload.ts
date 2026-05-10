import { Buffer } from 'buffer'

/** 解析 data URL，失败返回 null */
export function parseDataUrl(dataUrl: string): { mime: string; buffer: Buffer; fileName: string } | null {
  const m = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl.trim())
  if (!m) return null
  const mime = m[1]
  const buffer = Buffer.from(m[2], 'base64')
  const ext =
    mime === 'image/png'
      ? 'png'
      : mime === 'image/webp'
        ? 'webp'
        : mime === 'image/bmp' || mime === 'image/x-ms-bmp'
          ? 'bmp'
          : mime === 'image/heic' || mime === 'image/heif'
            ? 'heic'
            : 'jpg'
  return { mime, buffer, fileName: `garment.${ext}` }
}

/** 是否为公网 http(s) 图链（DashScope 可直接消费） */
export function isPublicHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim())
}
