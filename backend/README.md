# Try-On Backend

基于 NestJS + Prisma + PostgreSQL 的试穿后端。

## 快速开始

1. 复制环境变量：

```bash
cp .env.example .env
```

2. 使用阿里云 AI 试穿（默认 `TRYON_PROVIDER=aliyun`）时，在 `.env` 配置百炼 Key：

```bash
DASHSCOPE_API_KEY=sk-xxxx
```

3. 启动 PostgreSQL（可选 docker）：

```bash
docker compose up -d postgres
```

4. 安装与初始化：

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run seed
```

5. 启动开发服务：

```bash
npm run start:dev
```

6. 打开文档：

`http://localhost:3001/docs`

## 默认测试账号

- phone: `13800000000`
- password: `123456`

## 当前接口

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/uploads/presign`
- `POST /api/v1/tryon/tasks`
- `GET /api/v1/tryon/tasks/:id`
- `POST /api/v1/garments`
- `GET /api/v1/garments`
- `GET /api/v1/garments/:id`
- `DELETE /api/v1/garments/:id`
