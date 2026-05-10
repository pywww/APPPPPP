# AI 试穿 H5 交付清单（仓库总览）

本文档用于快速了解本仓库包含什么、如何运行、产品/交付文档在哪里。源码根目录即本文件上一级（`h5-demo-react/`）。

---

## 1. 仓库里有什么

| 区域 | 说明 |
|------|------|
| `src/` | Vite + React 19 + TypeScript 前端：四 Tab（试穿/衣橱/工坊/个人）、模特设置、试穿选图—加载—结果、衣橱列表与详情、工坊与结果、穿搭列表与详情等 |
| `backend/` | NestJS + Prisma + PostgreSQL 试穿后端：鉴权、上传预签名、试穿任务、衣物 CRUD 等（详见 `backend/README.md`） |
| `figma-mcp/` | 与 Figma 对齐的交付物（节点、还原度清单、实现说明等） |
| `scripts/` | 辅助脚本（如 `fidelity-score`） |
| `docs/product/` | 自 **AI试穿APP** 同步的产品/需求/流程/作品集相关 Markdown |
| `docs/delivery/` | 自 **衣橱H5交付** 根目录同步的 Figma 交付、复盘、链接表等 Markdown |

**未纳入 Git**：`node_modules/`、`dist/`、`.obsidian/`、各目录下的 `.env`（请保留并本地维护 `.env.example` 的副本为 `.env`）。

---

## 2. 前端主要路由（`src/router.tsx`）

| 路径 | 页面职责（简述） |
|------|------------------|
| `/onboarding` | 首次引导 |
| `/home` | 试穿首页（Tab） |
| `/wardrobe` | 衣橱（Tab） |
| `/workshop` | 工坊（Tab） |
| `/profile` | 个人（Tab） |
| `/model/setup1`、`/model/setup2` | 数字模特设置 |
| `/tryon/pick`、`/tryon/loading`、`/tryon/result`、`/tryon/error`、`/tryon/edit` | 试穿选图—生成—结果—异常—编辑 |
| `/wardrobe/item/:id` | 衣物详情 |
| `/looks`、`/looks/:id` | 我的穿搭列表与详情 |
| `/profile/model` | 我的模特 |
| `/workshop/result` | 工坊保存结果 |

---

## 3. 本地运行

### 前端

```bash
cd h5-demo-react   # 若已在仓库根目录可省略
npm install
npm run dev
```

默认开发服务器：**http://localhost:5174**（见 `vite.config.ts`）。

API 基址：环境变量 **`VITE_API_BASE_URL`**；未设置时浏览器端会请求 **同源主机 `:3001`** 下的 `/api/v1`（见 `src/api/http.ts`）。

### 后端

```bash
cd backend
cp .env.example .env   # Windows 可用 copy
# 按需填写 DASHSCOPE_API_KEY 等
docker compose up -d postgres   # 可选
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run seed
npm run start:dev
```

- 服务与 Swagger：`http://localhost:3001/docs`（以 `backend/README.md` 为准）
- 默认测试账号：`13800000000` / `123456`

---

## 4. 文档索引（`docs/`）

### 4.1 `docs/product/`（产品与设计输入）

| 文件 | 用途简述 |
|------|----------|
| `需求定义_MVP整理.md` | MVP 需求与 F-xx 映射等 |
| `模块级用户流程总览_MVP定稿.md` | 模块级用户流程定稿 |
| `衣橱EARS需求文档.md` | EARS 需求原文档 |
| `AI试穿APP_业务流程与架构图_MVP.md` | 业务流程与架构（Mermaid 等） |
| `设计稿交付操作指南.md` | 设计稿交付说明 |
| `UI稿修改指南.md` | UI 稿修改说明 |
| `AI穿搭助手_手机端界面设计指令.md` | 手机端界面设计指令 |
| `作品集大纲草稿.md` 等 | 多模型作品集大纲草稿（可按需删减） |

### 4.2 `docs/delivery/`（Figma 与交付过程）

| 文件 | 用途简述 |
|------|----------|
| `Figma页面生成指令模板.md` | 页面生成指令模板 |
| `Figma到前端开发复盘摘要.md` / `Figma设计稿到前端开发复盘摘要.md` | 复盘摘要 |
| `Figma链接交付表.md` | Figma 链接交付表 |
| `模块级用户流程总览_MVP定稿.md` | 与产品侧同步的流程定稿副本 |
| `衣橱EARS需求文档 copy.md` | EARS 副本（若与 product 重复可后续只保留一份） |
| `design-system-skill.md` | 设计系统相关技能/说明 |

---

## 5. 同步说明

- `docs/product` 与 `docs/delivery` 由工作区 **AI试穿APP**、**衣橱H5交付** 中的 Markdown 复制而来；后续以 Git 仓库内版本为准继续迭代即可。
- 若需更新文档，可改源文件夹后再次复制覆盖，或直接在 `docs/` 内编辑并提交。

---

## 6. 远程仓库

目标远程：**https://github.com/pywww/APPPPPP**

推送前请在仓库根执行 `git status` 确认变更；若与远程 `main` 历史不相关，可能需要与维护者确认是否使用 `git push --force` 覆盖远程分支。
