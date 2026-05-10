# Figma 页面生成指令模板

适用范围：`衣橱H5交付/h5-demo-react` 项目  
目标：确保后续页面统一使用已确定的 `AppHeader`、`TabLayout`、`AppIcons`、`ICON_SIZES` 规范。

---

## 模板A：TryOn 流程页面（通常有返回，不带底部 Tab）

```text
请基于这个 Figma 页面实现前端：<figma-url>
目标页面：<例如 /tryon/pick 或 /tryon/loading>

执行要求（必须遵守）：
1) 先调用 get_design_context + get_screenshot；必要时 get_metadata 拆子节点。
2) 页面头部必须使用统一组件 AppHeader：
   - <AppHeader title="..." onBack={() => nav(-1)} />
3) 本页面不新增 TabBar；底部导航由路由层 TabLayout 统一管理。
4) 所有图标必须复用 src/components/icons/AppIcons.tsx。
5) 图标尺寸必须使用 ICON_SIZES 常量，禁止写死宽高。
6) 保持 React + 现有 CSS 方案，不使用 Tailwind，不新增无必要依赖。
7) 优先复用现有样式变量和组件，最小改动实现高保真。
8) 完成后执行 npm run build，并输出：
   - 改动文件清单
   - 与 Figma 差异清单（按优先级）
```

---

## 模板B：Tab 主页面（home/wardrobe/workshop/profile，无返回，复用底部 Tab）

```text
请基于这个 Figma 页面实现前端：<figma-url>
目标页面：<例如 /wardrobe 或 /workshop>

执行要求（必须遵守）：
1) 先调用 get_design_context + get_screenshot；必要时 get_metadata 拆子节点。
2) 头部必须使用统一组件 AppHeader，且无返回：
   - <AppHeader title="..." showBack={false} />
3) 底部栏必须复用现有 TabLayout，不得创建新的 TabBar。
4) 所有图标必须来自 src/components/icons/AppIcons.tsx。
5) 图标尺寸统一使用 ICON_SIZES 常量，禁止写死 icon 宽高。
6) 保持 React + 现有 CSS，不使用 Tailwind，不新增无必要依赖。
7) 完成后执行 npm run build，并输出：
   - 改动文件清单
   - 与 Figma 差异清单（布局/字体/颜色/圆角阴影/图标）
```

---

## 兜底约束（建议每次都附上）

```text
如果你的实现出现自定义头部、临时SVG、写死icon尺寸、或新建TabBar，请自动回退并改为：AppHeader + AppIcons + ICON_SIZES + TabLayout。
```
