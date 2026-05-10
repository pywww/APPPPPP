# 衣橱 App 设计 Token（按节点批量提取）

提取方式：基于 `figma-mcp/figma-nodes.json` 的页面节点，批量调用 `get_design_context` 后归并。  
说明：本清单来自页面实值（而非 Figma Variables 面板），可直接用于前端语义化映射。

## 1) Color（语义色板）

### Brand / Primary
- `color.brand.primary`: `#015EDF`
- `color.brand.primary.hover`: `#0057CF`
- `color.brand.primary.deep`: `#00429C`
- `color.brand.primary.soft`: `rgba(1, 94, 223, 0.05)`
- `color.brand.primary.soft-2`: `rgba(0, 87, 207, 0.18)`

### Accent / Secondary
- `color.accent.pink`: `#FCB1C6`
- `color.accent.pink.soft`: `rgba(252, 177, 201, 0.2)`
- `color.accent.pink.soft-2`: `rgba(253, 177, 202, 0.22)`
- `color.accent.mauve`: `#884C61`
- `color.accent.blue-light`: `#B1C5FF`
- `color.accent.blue-verylight`: `#DAE2FF`

### Neutrals
- `color.neutral.0`: `#FFFFFF`
- `color.neutral.25`: `#FBF9F9`
- `color.neutral.50`: `#F8FAFC`
- `color.neutral.75`: `#F6F9FF`
- `color.neutral.100`: `#F5F7FB`
- `color.neutral.150`: `#EFF4FB`
- `color.neutral.200`: `#E9EEF5`
- `color.neutral.250`: `#E3E9F0`
- `color.neutral.300`: `#DAE3F2`
- `color.neutral.400`: `#C6C6C6`

### Text
- `color.text.primary`: `#171C21`
- `color.text.secondary`: `#3E4753`
- `color.text.tertiary`: `#474747`
- `color.text.quaternary`: `#565F6C`
- `color.text.placeholder`: `#6B7280`
- `color.text.inverse`: `#FFFFFF`
- `color.text.brand`: `#015EDF`
- `color.text.muted-on-dark`: `rgba(255, 255, 255, 0.7)`

### Status
- `color.status.success.bg`: `rgba(1, 94, 223, 0.1)`
- `color.status.error.bg`: `#FFDAD6`

### Overlay / Backdrop / Gradient
- `color.overlay.header`: `rgba(239, 244, 251, 0.8)`
- `color.overlay.header-strong`: `rgba(239, 244, 251, 0.9)`
- `color.overlay.white-20`: `rgba(255, 255, 255, 0.2)`
- `color.overlay.white-30`: `rgba(255, 255, 255, 0.3)`
- `color.overlay.white-60`: `rgba(255, 255, 255, 0.6)`
- `color.overlay.dark-30`: `rgba(0, 0, 0, 0.3)`
- `color.gradient.hero-mask.from`: `rgba(27, 28, 28, 0.8)`
- `color.gradient.hero-mask.to`: `rgba(27, 28, 28, 0)`

## 2) Typography（字体系统）

## Font Family
- `font.family.base`: `Manrope, Noto Sans SC, Noto Sans JP, sans-serif`
- `font.family.cn-alt`: `WenQuanYi Zen Hei, sans-serif`

## Font Size
- `font.size.caption`: `10px`
- `font.size.overline`: `11px`
- `font.size.body-sm`: `12px`
- `font.size.body`: `14px`
- `font.size.body-lg`: `16px`
- `font.size.title-sm`: `18px`
- `font.size.title`: `20px`
- `font.size.display-sm`: `24px`

## Font Weight
- `font.weight.regular`: `400`
- `font.weight.medium`: `500`
- `font.weight.semibold`: `600`
- `font.weight.bold`: `700`

## Line Height（常用）
- `line-height.15`: `15px`
- `line-height.16`: `16px`
- `line-height.20`: `20px`
- `line-height.24`: `24px`
- `line-height.28`: `28px`
- `line-height.32`: `32px`

## Letter Spacing（常用）
- `letter-spacing.tight-title`: `-0.45px`
- `letter-spacing.tight-display`: `-0.6px`
- `letter-spacing.tab-caption`: `0.5px`
- `letter-spacing.overline`: `1px`
- `letter-spacing.overline-wide`: `1.2px`

## 3) Spacing（间距尺度）

建议统一 4 的倍数为主，兼容设计中少量特殊值。

- `space.0`: `0`
- `space.1`: `4px`
- `space.2`: `8px`
- `space.3`: `12px`
- `space.4`: `16px`
- `space.5`: `20px`
- `space.6`: `24px`
- `space.7`: `28px`
- `space.8`: `32px`
- `space.10`: `40px`
- `space.12`: `48px`
- `space.14`: `56px`
- `space.16`: `64px`
- `space.20`: `80px`

常见布局高：
- `size.header`: `56px`
- `size.bottom-nav`: `80px`
- `size.button-md`: `44px`
- `size.button-lg`: `48px`
- `size.button-xl`: `52px`

## 4) Radius（圆角）

- `radius.xs`: `4px`
- `radius.sm`: `8px`
- `radius.md`: `12px`
- `radius.lg`: `16px`
- `radius.xl`: `24px`
- `radius.full`: `9999px`

## 5) Shadow（阴影）

## Elevation / Surface
- `shadow.sm`: `0px 1px 2px 0px rgba(0, 0, 0, 0.05)`
- `shadow.md`: `0px 8px 30px 0px rgba(0, 0, 0, 0.04)`
- `shadow.lg`: `0px 20px 40px 0px rgba(23, 28, 33, 0.06)`
- `shadow.xl`: `0px 20px 50px 0px rgba(0, 87, 207, 0.08)`

## Brand Action
- `shadow.brand.button`: `0px 10px 15px -3px rgba(0, 87, 207, 0.2), 0px 4px 6px -4px rgba(0, 87, 207, 0.2)`
- `shadow.brand.fab`: `0px 25px 50px -12px rgba(0, 87, 207, 0.4)`
- `shadow.brand.top`: `0px -20px 40px 0px rgba(1, 94, 223, 0.06)`

## Neutral Overlay
- `shadow.overlay.card`: `0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)`
- `shadow.overlay.panel`: `0px -10px 30px 0px rgba(0, 0, 0, 0.03)`

## 6) Border / Stroke（补充）

- `border.color.default`: `rgba(1, 94, 223, 0.1)`
- `border.color.soft`: `rgba(255, 255, 255, 0.2)`
- `border.color.soft-strong`: `rgba(255, 255, 255, 0.4)`
- `border.color.pink-soft`: `rgba(252, 177, 198, 0.3)`
- `border.width.default`: `1px`

## 7) 组件级语义映射建议

- `component.header.bg` -> `color.overlay.header`
- `component.page.bg` -> `color.neutral.75`
- `component.card.bg` -> `color.neutral.0`
- `component.card.subtle-bg` -> `color.neutral.150`
- `component.button.primary.bg` -> `color.brand.primary`
- `component.button.secondary.bg` -> `color.neutral.0`
- `component.button.secondary.border` -> `color.brand.primary`
- `component.tab.active` -> `color.brand.primary`
- `component.tab.inactive` -> `#94A3B8`

## 8) 与现有前端变量对齐建议

你当前 `src/styles/variables.css` 已有主色体系，建议把上面 Token 映射到现有变量命名，优先保持以下键稳定：
- `--color-primary` -> `#015EDF`
- `--color-primary-soft` -> `rgba(1, 94, 223, 0.05)`
- `--color-bg` -> `#F6F9FF`
- `--color-text` -> `#171C21`
- `--radius-md` -> `12px`
- `--shadow-brand` -> `shadow.brand.button`
