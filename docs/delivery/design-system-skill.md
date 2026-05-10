# Design System Skill

## 文件说明
本 Skill 用于 `衣橱 App` 前端界面开发与对稿，品牌定位为「冷调、轻玻璃拟态、极简编辑感」：以蓝色主品牌色、浅雾化背景、高可读中文信息层级为核心。  
使用范围：`H5` 页面（当前主设计宽度 `390px`），覆盖基础变量、基础组件、复合模块、布局响应式与代码书写规范。  
约束：仅使用设计稿中已出现的真实数值，不新增视觉数值。

## 1. 基础变量（Colors / Fonts / Spacing / Radius / Shadow）

### 1.1 Colors
- `color.brand.primary`: `#015EDF`
- `color.brand.primary.hover`: `#0057CF`
- `color.brand.primary.deep`: `#00429C`
- `color.brand.primary.soft`: `rgba(1, 94, 223, 0.05)`
- `color.brand.primary.soft-2`: `rgba(0, 87, 207, 0.18)`
- `color.accent.pink`: `#FCB1C6`
- `color.accent.pink.soft`: `rgba(252, 177, 201, 0.2)`
- `color.accent.pink.soft-2`: `rgba(253, 177, 202, 0.22)`
- `color.accent.mauve`: `#884C61`
- `color.accent.blue-light`: `#B1C5FF`
- `color.accent.blue-verylight`: `#DAE2FF`
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
- `color.text.primary`: `#171C21`
- `color.text.secondary`: `#3E4753`
- `color.text.tertiary`: `#474747`
- `color.text.quaternary`: `#565F6C`
- `color.text.placeholder`: `#6B7280`
- `color.text.inverse`: `#FFFFFF`
- `color.text.brand`: `#015EDF`
- `color.text.muted-on-dark`: `rgba(255, 255, 255, 0.7)`
- `color.status.success.bg`: `rgba(1, 94, 223, 0.1)`
- `color.status.error.bg`: `#FFDAD6`
- `color.overlay.header`: `rgba(239, 244, 251, 0.8)`
- `color.overlay.header-strong`: `rgba(239, 244, 251, 0.9)`
- `color.overlay.white-20`: `rgba(255, 255, 255, 0.2)`
- `color.overlay.white-30`: `rgba(255, 255, 255, 0.3)`
- `color.overlay.white-60`: `rgba(255, 255, 255, 0.6)`
- `color.overlay.dark-30`: `rgba(0, 0, 0, 0.3)`
- `color.gradient.hero-mask.from`: `rgba(27, 28, 28, 0.8)`
- `color.gradient.hero-mask.to`: `rgba(27, 28, 28, 0)`

### 1.2 Fonts
- `font.family.base`: `Manrope, Noto Sans SC, Noto Sans JP, sans-serif`
- `font.family.cn-alt`: `WenQuanYi Zen Hei, sans-serif`
- `font.size.caption`: `10px`
- `font.size.overline`: `11px`
- `font.size.body-sm`: `12px`
- `font.size.body`: `14px`
- `font.size.body-lg`: `16px`
- `font.size.title-sm`: `18px`
- `font.size.title`: `20px`
- `font.size.display-sm`: `24px`
- `font.weight.regular`: `400`
- `font.weight.medium`: `500`
- `font.weight.semibold`: `600`
- `font.weight.bold`: `700`
- `line-height.15`: `15px`
- `line-height.16`: `16px`
- `line-height.20`: `20px`
- `line-height.24`: `24px`
- `line-height.28`: `28px`
- `line-height.32`: `32px`
- `letter-spacing.tight-title`: `-0.45px`
- `letter-spacing.tight-display`: `-0.6px`
- `letter-spacing.tab-caption`: `0.5px`
- `letter-spacing.overline`: `1px`
- `letter-spacing.overline-wide`: `1.2px`

### 1.3 Spacing
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
- `size.header`: `56px`
- `size.bottom-nav`: `80px`
- `size.button-md`: `44px`
- `size.button-lg`: `48px`
- `size.button-xl`: `52px`

### 1.4 Radius
- `radius.xs`: `4px`
- `radius.sm`: `8px`
- `radius.md`: `12px`
- `radius.lg`: `16px`
- `radius.xl`: `24px`
- `radius.full`: `9999px`

### 1.5 Shadow
- `shadow.sm`: `0px 1px 2px 0px rgba(0, 0, 0, 0.05)`
- `shadow.md`: `0px 8px 30px 0px rgba(0, 0, 0, 0.04)`
- `shadow.lg`: `0px 20px 40px 0px rgba(23, 28, 33, 0.06)`
- `shadow.xl`: `0px 20px 50px 0px rgba(0, 87, 207, 0.08)`
- `shadow.brand.button`: `0px 10px 15px -3px rgba(0, 87, 207, 0.2), 0px 4px 6px -4px rgba(0, 87, 207, 0.2)`
- `shadow.brand.fab`: `0px 25px 50px -12px rgba(0, 87, 207, 0.4)`
- `shadow.brand.top`: `0px -20px 40px 0px rgba(1, 94, 223, 0.06)`
- `shadow.overlay.card`: `0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)`
- `shadow.overlay.panel`: `0px -10px 30px 0px rgba(0, 0, 0, 0.03)`
- `border.color.default`: `rgba(1, 94, 223, 0.1)`
- `border.color.soft`: `rgba(255, 255, 255, 0.2)`
- `border.color.soft-strong`: `rgba(255, 255, 255, 0.4)`
- `border.color.pink-soft`: `rgba(252, 177, 198, 0.3)`
- `border.width.default`: `1px`

## 2. 基础组件（Button / Input / Tag / Badge）

### 2.1 Button
**HTML结构**
```html
<button class="btn btn--primary btn--md" type="button">
  <span class="btn__icon" aria-hidden="true"></span>
  <span class="btn__text">开始试穿</span>
</button>
```

**CSS class规范**
- `.btn`: `display:flex; align-items:center; justify-content:center; gap:8px; border-radius:12px;`
- `.btn--md`: `height:44px;`
- `.btn--lg`: `height:48px;`
- `.btn--xl`: `height:52px;`
- `.btn--primary`: `background:#015EDF; color:#FFFFFF; box-shadow:shadow.brand.button; border:1px solid #015EDF;`
- `.btn--secondary`: `background:#FFFFFF; color:#015EDF; border:1px solid #015EDF;`
- `.btn__text`: `font-family:WenQuanYi Zen Hei, sans-serif; font-size:16px; line-height:24px;`

**状态写法**
- 默认：`.btn--primary`
- 悬停：`.btn--primary:hover { background:#0057CF; }`
- 按下：`.btn--primary:active { background:#00429C; }`
- 禁用：`.btn[disabled] { background:#E9EEF5; color:#6B7280; box-shadow:none; border-color:#E9EEF5; }`

### 2.2 Input
**HTML结构**
```html
<label class="input-field">
  <span class="input-field__label">身高 (Height)</span>
  <span class="input-field__wrap">
    <input class="input-field__control" type="text" value="175" />
    <span class="input-field__unit">cm</span>
  </span>
</label>
```

**CSS class规范**
- `.input-field`: `display:flex; flex-direction:column; gap:8px;`
- `.input-field__label`: `font-size:10px; line-height:15px; letter-spacing:0.5px; color:#565F6C; font-weight:700;`
- `.input-field__wrap`: `height:48px; background:#E9EEF5; border-radius:12px; padding:0 16px; display:flex; align-items:center; justify-content:space-between;`
- `.input-field__control`: `font-size:16px; line-height:24px; color:#171C21; background:transparent; border:none;`
- `.input-field__unit`: `font-size:14px; line-height:20px; color:#474747;`

**状态写法**
- 默认：`.input-field__wrap`
- 聚焦：`.input-field__wrap:focus-within { box-shadow:0 0 0 1px rgba(1, 94, 223, 0.1); }`
- 占位：`.input-field__control::placeholder { color:#6B7280; }`
- 禁用：`.input-field--disabled .input-field__control { color:#6B7280; }`

### 2.3 Tag（分类胶囊）
**HTML结构**
```html
<button class="tag tag--active" type="button">外套</button>
<button class="tag tag--default" type="button">衬衫</button>
```

**CSS class规范**
- `.tag`: `height:40px; padding:10px 20px; border-radius:9999px; font-size:14px; line-height:20px; font-family:WenQuanYi Zen Hei, sans-serif;`
- `.tag--active`: `background:#015EDF; color:#FFFFFF; box-shadow:shadow.brand.button;`
- `.tag--default`: `background:#E9EEF5; color:#474747;`

**状态写法**
- 默认：`.tag--default`
- 选中：`.tag--active`
- 禁用：`.tag[disabled] { background:#E9EEF5; color:#6B7280; }`

### 2.4 Badge（状态徽标）
**HTML结构**
```html
<span class="badge badge--success">上传成功</span>
<span class="badge badge--error">生成失败</span>
```

**CSS class规范**
- `.badge`: `display:inline-flex; align-items:center; height:22px; padding:3.5px 12px 3.5px 13px; border-radius:9999px; font-size:10px; line-height:15px; letter-spacing:1px; font-weight:600;`
- `.badge--success`: `background:rgba(1, 94, 223, 0.1); color:#015EDF;`
- `.badge--error`: `background:#FFDAD6; color:#171C21;`

**状态写法**
- 信息：`.badge--success`
- 错误：`.badge--error`

## 3. 复合模块（Header / Card / Form / Table）

### 3.1 Header（TopAppBar）
**布局结构与嵌套**
```html
<header class="app-header">
  <button class="app-header__left"></button>
  <h1 class="app-header__title">AI 穿搭助手</h1>
  <button class="app-header__right"></button>
</header>
```
- 容器高 `56px`
- 左中右三段式，左右操作区可点击
- 背景 `rgba(239, 244, 251, 0.8)`，可叠加 `shadow.brand.top`

**间距规则**
- 横向内边距 `16px`
- 标题使用 `18px/28px`，字距 `-0.45px`

### 3.2 Card（内容卡片）
**布局结构与嵌套**
```html
<section class="card">
  <div class="card__media"></div>
  <div class="card__body">
    <h3 class="card__title">试穿新衣</h3>
    <p class="card__desc">AI试穿</p>
  </div>
</section>
```
- `.card`：`background:#FFFFFF; border-radius:12px/16px;`
- `.card__body`：常用 `padding:16px` 或 `20px`
- `.card--overlay`：允许叠加 `rgba(255,255,255,0.2|0.3|0.6)` 玻璃层

**间距规则**
- 卡片内部垂直间距优先：`8px / 12px / 16px`
- 卡片组间距优先：`16px / 24px`

### 3.3 Form（表单区）
**布局结构与嵌套**
```html
<form class="form">
  <div class="form__group">
    <label class="form__label">体重 (Weight)</label>
    <div class="form__control-wrap"></div>
  </div>
</form>
```
- `.form`：分组垂直流布局
- `.form__group`：`gap:8px`
- 多组之间：`gap:16px`
- 操作区按钮通常固定底部，高 `80px`

### 3.4 Table（数据表格）
当前设计稿未出现标准数据表格。为遵守“只使用真实数值，不新增”，仅定义结构骨架，不定义新增视觉参数。
```html
<div class="table">
  <div class="table__head"></div>
  <div class="table__body"></div>
</div>
```
- 若后续页面出现表格，再从 Figma 节点补充真实 Token 后扩展。

## 4. 布局与响应式规则

### 4.1 断点定义（仅使用已出现尺寸）
- `viewport.mobile`: `390px`（主设计宽度）
- `container.max`: `448px`（部分容器 max 宽）

### 4.2 栅格规则
- 双列内容区：`2` 列，列间距 `16px`
- 常见页面内边距：`16px`
- 模块垂直节奏：`12px / 16px / 24px`

### 4.3 折叠逻辑
- 小于 `390px`：保持单列主流布局，优先压缩左右留白，不改变字号档位。
- 大于 `390px` 到 `448px`：内容容器可居中，宽度不超过 `448px`。

## 5. 代码书写规范

### 5.1 class 命名规则
- 使用 BEM：`block__element--modifier`
- 推荐前缀：`app-`、`card-`、`form-`、`btn-`、`tag-`
- 状态类统一：`is-active` / `is-disabled` / `is-loading`

### 5.2 样式约束
- 禁止内联样式（`style=""`）
- 禁止写死 magic number（除已在 Token 列表中的真实值）
- 颜色、字号、圆角、阴影必须来自本 Skill Token

### 5.3 语义化 HTML 要求
- 顶部导航使用 `<header>`
- 主内容使用 `<main>`
- 操作按钮使用 `<button>`
- 列表使用 `<ul>/<li>`
- 表单使用 `<form>/<label>/<input>`

## 6. 使用示例

下面示例组合了 Header + Card + Form + Button，全部使用本 Skill 已列真实值。

```html
<main class="page page--profile">
  <header class="app-header">
    <button class="app-header__left" type="button" aria-label="返回"></button>
    <h1 class="app-header__title">设置您的模特</h1>
    <button class="app-header__right" type="button" aria-label="更多"></button>
  </header>

  <section class="card card--model">
    <div class="card__media"></div>
    <div class="card__body">
      <span class="badge badge--success">上传成功</span>
      <h2 class="card__title">默认模特 A-01</h2>
    </div>
  </section>

  <form class="form">
    <label class="input-field">
      <span class="input-field__label">身高 (Height)</span>
      <span class="input-field__wrap">
        <input class="input-field__control" placeholder="请输入" />
        <span class="input-field__unit">cm</span>
      </span>
    </label>

    <div class="form__actions">
      <button class="btn btn--secondary btn--md" type="button">重新选择</button>
      <button class="btn btn--primary btn--md" type="submit">确认使用</button>
    </div>
  </form>
</main>
```

