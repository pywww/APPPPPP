# Figma MCP 前端实施手册（95%相似度）

## 1. 基础准备

1. 在 Cursor 中确认 Figma MCP 可用（已验证 `whoami` 正常返回）。
2. 页面节点清单使用 `figma-mcp/figma-nodes.json`，以此作为唯一事实源。
3. 全局设计令牌使用 `src/styles/variables.css`，先对齐色板/圆角/阴影再做页面细节。

## 2. 单页实施闭环（必须按顺序）

1. 选一个页面节点（如 `/home` 对应 `1:56`）。
2. 在 Cursor 提示词中要求执行：
   - `get_design_context(fileKey, nodeId)`
   - `get_screenshot(fileKey, nodeId)`
3. 若内容过大，再补：
   - `get_metadata(fileKey, nodeId)` 获取结构树
   - 对关键子节点再次 `get_design_context`
4. 代码实现时遵循：
   - 优先复用现有组件与路由
   - 样式优先走 token，不写魔法值
   - 资源优先使用 Figma 返回的素材
5. 同屏对比后修正，达到页面 >=95 分才进入下一页。

## 3. Cursor 提示词模板

### 3.1 页面实现模板

```text
请实现这个 Figma 页面：<Figma URL>
要求：
1) 先调用 get_design_context 和 get_screenshot；
2) 若返回过大，先 get_metadata 再拆子节点调用；
3) 基于当前项目技术栈（React + antd-mobile）实现；
4) 优先复用现有组件与 src/styles/variables.css token；
5) 实现完成后输出“与 Figma 的差异清单”和“下一轮修复项（按优先级）”。
```

### 3.2 差异修复模板

```text
请按以下差异修复页面，目标相似度 >=95：
<差异清单>

要求：
1) 优先修复布局、字号、颜色三项；
2) 每修复一项都说明改了哪个文件；
3) 最后给出本页验收评分（按 6 个维度）。
```

## 4. 相似度验收

1. 填写 `figma-mcp/fidelity-checklist.json` 中各页面分数（0-100）。
2. 运行命令：

```bash
npm run fidelity:score
```

3. 判定标准：
   - 单页分数 >=95 通过
   - 主链路页面必须全部通过：`/tryon/pick`、`/tryon/loading`、`/tryon/result`

## 5. 交付建议节奏

1. 每完成 1 页：做一次局部验收并记录差异。
2. 每完成 3-5 页：做一次全局回归（导航、状态切换、响应式）。
3. 每次回归后更新 `figma-mcp/DELIVERY_REPORT.md`。
