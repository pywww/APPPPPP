import type { CSSProperties } from 'react'

export const ICON_SIZES = {
  tab: 22,
  card: 24,
  topMenu: 14,
  topMoreWidth: 3,
  topMoreHeight: 16,
} as const

type IconProps = {
  className?: string
  style?: CSSProperties
}

export function SparkleIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path
        d="M8 4.8L9.3 8.2L12.7 9.5L9.3 10.8L8 14.2L6.7 10.8L3.3 9.5L6.7 8.2L8 4.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M16.6 3.1L17.25 4.85L19 5.5L17.25 6.15L16.6 7.9L15.95 6.15L14.2 5.5L15.95 4.85L16.6 3.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17.9 14L18.6 15.9L20.5 16.6L18.6 17.3L17.9 19.2L17.2 17.3L15.3 16.6L17.2 15.9L17.9 14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HangerIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path
        d="M10.5 5.9C10.5 4.7 11.5 3.7 12.7 3.7C13.9 3.7 14.9 4.7 14.9 5.9C14.9 7 14.1 7.95 13.05 8.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.2V10.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.8 17L12 10.8L20.2 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.2 17H18.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AccessibilityPersonIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <circle cx="12" cy="5.2" r="2.1" fill="currentColor" />
      <path
        d="M5.2 9.6C7.4 10.35 9.7 10.7 12 10.7C14.3 10.7 16.6 10.35 18.8 9.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M9.95 11.1H14.05V16.2H9.95V11.1Z" fill="currentColor" />
      <path d="M9.95 16.2H11.75V20.2H9.95V16.2Z" fill="currentColor" />
      <path d="M12.25 16.2H14.05V20.2H12.25V16.2Z" fill="currentColor" />
    </svg>
  )
}

export function HomeFilledIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path
        d="M4.8 10.1L12 4.8L19.2 10.1V18.6C19.2 19.3 18.65 19.85 17.95 19.85H14.25V14.2H9.75V19.85H6.05C5.35 19.85 4.8 19.3 4.8 18.6V10.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function UserOutlineIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path
        d="M12 4.3C13.9 4.3 15.45 5.85 15.45 7.75C15.45 9.65 13.9 11.2 12 11.2C10.1 11.2 8.55 9.65 8.55 7.75C8.55 5.85 10.1 4.3 12 4.3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M5.15 18.95C5.15 15.95 8.15 13.9 12 13.9C15.85 13.9 18.85 15.95 18.85 18.95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MenuLinesIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path d="M3 6.5H21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3 17.5H21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function MoreDotsVerticalIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <circle cx="12" cy="5" r="2.1" fill="currentColor" />
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <circle cx="12" cy="19" r="2.1" fill="currentColor" />
    </svg>
  )
}
