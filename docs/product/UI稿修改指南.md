## 先做：全文件通用步骤（每个 Screen 都过一遍）

对每一个名为 `Screen/...` 的 Frame：

1. 画板
    
    - 宽 390，高 844（若当前是 884、988、1110、1154 等，一律先改外壳）。
2. 三层骨架（顶层子节点建议只保留这三块语义，顺序从上到下）：
    
    - `Header/TopAppBar`：`y=0`，`h=56`
    - `Main/Scroll`：`y=56`，`h=708`
    - `Bottom/Nav`：`y=764`，`h=80`
3. 把现有内容塞进 `Main/Scroll`
    
    - 原稿里常常是 `Main Content Area`、`Main`、`Main Canvas` 等：`y` 从 0 或 64 起算 → 改为相对 主区内 的布局（或整体编组后再进 Auto Layout）。
    - 超长列表：只允许 Main 纵向滚动，不要拉长整个 `Screen` Frame。
4. 底栏统一
    
    - 高度一律 80（不要 57、64、76、92 混用）。
    - 实例名称 `Component 8`、`我的 tab` → 建议统一成 一个 `Comp/Nav/BottomTabBar` 组件 + Variant（当前 Tab）。
5. 像素取整
    
    - 对所有 布局节点 的 `x/y/w/h` 四舍五入为整数（你稿里大量 `.33`、`.5`、`.829` 等）。
6. 命名
    
    - 把 `AB6AXu...` 这类哈希图层改成 `Img/商品封面` 等可读名。
    - 减少无意义 `Container`，至少模块级要有 `Hero/`、`Card/`、`List/` 等前缀。

---

## 非全屏：弹层（单独一类）

- `Overlay/Wardrobe/FilterSheet`（约 390×640）
    - 这是 底部弹层，不必改成 844。
    - 建议：在描述里写 `类型=BottomSheet`，圆角、把手、`y=552` 附近按钮区与 安全区 的关系写清；内部列表同样做 整数像素 + Auto Layout。

---

## 逐屏：你需要改什么（按画板名）

### 1. `Screen/Home`

|问题（当前结构）|你要做的具体操作|
|---|---|
|画板 390×884|改为 390×844|
|`Main Content Area` y=64、h=740|放入标准 `Main/Scroll`：y=56、h=708；内部用 Auto Layout 重排，避免硬编码 740|
|`BottomNavBar (JSON)` y=804|改为 y=764；层名建议 `Bottom/Nav`|
|`Header - TopAppBar (JSON)` 在栈底|拖到最上或与视觉一致的最前（开发一般期望 header 与结构顺序一致）|
|装饰层 `Dynamic Visual Accents` y=-96、`Overlay+Blur` x 负值|要么移入 `Main/Scroll` 并 Clip，要么单独标注「纯装饰、不参与点击区域」|
|Hero、卡片多处 0.36、447.5、585.5 等|整数化；`Hero/Main Entry Area` 等改名为 `Hero/MainEntry`|

---

### 2. `Screen/Profile/MyModel`

|问题|操作|
|---|---|
|画板 884|→ 844|
|`Main Content Canvas` 高 895 > 画板 884（结构溢出）|压缩进 `Main/Scroll` 708 或改为可滚动；禁止子 Frame 比外壳还高|
|`Bottom Action Area` y=792、h=92|对齐规范：要么并入 `Bottom/Nav`（h=80, y=764），要么改为 `Main` 内最后的 sticky 区，但不要 92 与 80 混用|
|与全局 Tab 底栏关系|若该页也属 Tab 内：底栏应与 `Screen/Home` 同一组件；若本页是「全屏任务」再单独约定|

---

### 3. `Screen/Model/Setup1`

|问题|操作|
|---|---|
|884|→ 844|
|全屏 `Background+Shadow` 884|背景可裁为 844，或与 `Screen` 同高|
|`Main Content Area` y=68.5|顶栏若占 56，则主区应从 y=56 起算；去掉 68.5，改为 Auto Layout 顶部间距 12（或其它固定值）|
|`Header` 实例 y=-2|顶栏贴齐 y=0|
|底部双按钮区 `Operational Area` w=365 略超 358 内容宽|改为 358 宽或左右各 16 margin，避免超出|

---

### 4. `Screen/Model/Setup2`

|问题|操作|
|---|---|
|884|→ 844|
|`Main` h=826（56+826=882≠884，已不一致）|明确为 `Main/Scroll` h=708（若有底栏）或任务模板下 h=788（844−56，无底栏时）|
|注释写 BottomNavBar suppressed|与你「Tab 全程有底栏」可能冲突：二选一——要么补 `Bottom/Nav` 80 并上移表单；要么在规范里增加 「Task/全屏模板（无底栏）」，和 Tab 页分开|
|`Footer` y=808、h=76|若保留底部双按钮：改为 y=764、h=80 或与 Safe Area 合并为统一 80 槽位|

---

### 5. `Screen/Wardrobe`（问题最多）

| 问题                                             | 操作                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| 画板 390×1154.25                                 | → 390×844；网格进 `Main/Scroll` 可滚动                                    |
| `Main Content Canvas` h=898.25                 | → 放入 708 高滚动区，不要让单屏画板承担近 900 高内容                                   |
| `Nav - QuickCategoryBar` 内按钮 x=430、510（超出 390） | 横向滚动容器宽度 358/390，或删减 Tab 数量，保证无子元素 x>390                           |
| `Floating Action Button` y=1018                | 相对 844 已出屏 → 改为贴在 `Main/Scroll` 右下角 或 `y≈660~680`（在 708 主区内），并避让底栏 |
| `Footer - BottomNavBar` h=57、y=1097            | → h=80、y=764；与全局 Tab 组件统一                                          |
| 卡片下图层名 `AB6AXu...`                             | 全部改为 `Img/...`                                                     |

---

### 6. `Screen/TryOn/Result`

| 问题                           | 操作                                                       |
| ---------------------------- | -------------------------------------------------------- |
| 884                          | → 844                                                    |
| `Main Canvas Area` 整屏 884 铺满 | 背景图可 844 高；图层命名区分 `Bg/FullBleed`                         |
| `Floating Action Bar` y=706  | 按 844 重算：一般在 底栏之上，约 y≈638~664（随浮层高度调整），保证 不压住 Bottom/Nav |
| 顶栏为 Symbol                   | 统一成 `Header/TopAppBar` 实例                                |

---

### 7. `Screen/TryOn/Result_SavedToast`

|问题|操作|
|---|---|
|与 Result 类似 884|→ 844；Toast 图层在 Overlay 组并标明 `z-index / 出现后 3s` 等|

（若结构同 Result，同样检查 浮层 y 与 底栏 80。）

---

### 8. `Screen/TryOn/ImagePicker/Empty`（文件里有两个同名画板）

|问题|操作|
|---|---|
|两个 Frame 同名|分别改名为例如 `Screen/TryOn/ImagePicker/Empty/A`、`.../B` 或 `.../Copy` / `.../AltCopy`，避免开发搜错|
|884|→ 844|
|`Main Content Area` y=1.5、h=882|→ y=0（在 Main 内）、总高适配 708；1.5 去掉|
|主按钮 h=56|若规范主按钮 44，统一成 44 或单独定义「大号按钮 56」但全文件一致|
|第二屏文案与第一屏细微不同（「的衣」）|统一文案或标注 哪版为线上文案|

---

### 9. `Screen/Wardrobe/Empty`

|问题|操作|
|---|---|
|884|→ 844|
|`Footer` y=827、h=57|→ y=764、h=80|

---

### 10. `Screen/Wardrobe/Detail`

|问题|操作|
|---|---|
|画板 390×1030.83|→ 844；长图+信息区全部进 `Main/Scroll` 708 滚动|
|`Main` 与画板同高 1030|改为 内容可滚动，外壳固定 844|
|`Bottom Operations` y=954|→ 固定 `Bottom/Nav` y=764、h=80 或作为 Sticky 底部操作条 在 Main 内说明，不要与 844 外壳打架|
|主图区 477.33 等|整数化|

---

### 11. `Screen/Workshop`

|问题|操作|
|---|---|
|884|→ 844|
|`Main Workspace Container` y=56、h=828|→ h=708；左右分栏（234+156=390）保留，高度改为 ≤708|
|分栏内 56+828=884 逻辑|全部改到 844 体系|

---

### 12. `Screen/TryOn/ResultEdit`

|问题|操作|
|---|---|
|画板 988.5|→ 844（表单项过长 → Main 内滚动）|
|`Main` 988.5|→ 708 滚动容器|
|`Comp/Buttons/Primary44` y=913|→ 作为 Sticky 放在底部 80 槽位上方，或并进 `Bottom/Nav` 之上的工具条|
|颜色选择里 -1.6、35.2 等|整数化|

---

### 13. `Screen/Looks`

|问题|操作|
|---|---|
|884|→ 844|
|`Main Content Canvas` h + `BottomNavBar Section` h=56 ≠ 标准 80|`BottomNavBar Section` → `h=80,y=764`；实例 y=-0.5 → 0|
|`Main` h=801|在 708 规则下重算；或 `801` 改为「内容区」，但总高仍受 708 限制|
|`FAB` y=732|在 844 下重排到 主区内，避免与 80 底栏重叠|
|双列表 `292.5` 等|整数化|

---

### 14. `Screen/Looks/Detail`

|问题|操作|
|---|---|
|1110|→ 844|
|`Main` 1007.83|→ `Main/Scroll` 708 + 滚动|
|长列表区块|同上，禁止外壳跟着变长|

---

### 15. `Screen/Profile`

|问题|操作|
|---|---|
|884|→ 844|
|`Main` 746.38 + `BottomNavBar` y=820、h=64|对齐：Bottom `y=764、h=80`；`Main` 固定 708，内部滚动若不够|
|多处 .38 尺寸|整数化|

---

### 16. `Screen/TryOn/ImagePicker/Selected`（两个同名）

|问题|操作|
|---|---|
|两个同名|改名区分（`.../Selected/A`、`.../B`）|
|`Header` y=-1.5|→ 0|
|884|→ 844|
|底部 Floating Footer 等|y 按 764−浮层高度 重算，不压底栏|

---

### 17. `Screen/TryOn/Loading`（两个同名）

|问题|操作|
|---|---|
|884×2|→ 844；两屏若仅背景差异，用 Variant 合并为一个组件|
|大量 小数坐标|整数化|

---

### 18. `Screen/TryOn/Error`

|问题|操作|
|---|---|
|884|→ 844|
|注释 exclude main navigation shell|若实际仍要 Tab：补 `Bottom/Nav`；若错误页全屏：在规范中单列「无 Tab」模板（与你的产品决策一致即可）|
|错误卡 405.5、227.25 等|整数化|

---

## 建议改完后的自检表（整文件勾一遍）

- 所有`Screen/*`仅`390×844`（弹层、Toast 除外另表）
- 任意`Screen`内无子 Frame 高度 > 844
- Tab 页`Bottom/Nav` 恒为 y=764、h=80
- `Main/Scroll` 恒为 y=56、h=708
- 无元素 x<0 或 x+w>390（装饰层若必须有，注明Clip/ 不响应）
- 无重名 `Screen/...`（Empty、Selected、Loading 已区分）
- Model Setup与「全程 Tab」策略已写进页面描述（统一一种）