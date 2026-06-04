# AI 医疗平台

一个完整的前后端分离的 AI 医疗平台项目，包含后端 API 服务和前端用户界面。
理想很丰满，现实很骨感——最后只搞了个基础后台 + 简单 Node。见谅见谅～

## 项目架构

```
ai-medicine/
├── backend/          # 后端服务（Node.js + Express + MongoDB）
└── yunl-fe/          # 前端应用（React + TypeScript + Ant Design）
```

## 技术栈

### 后端 (backend)
- **框架**: Node.js + Express 5.2.1
- **数据库**: MongoDB + Mongoose 9.6.3
- **功能**: RESTful API、用户管理、数据验证、CORS 支持
- **端口**: 3000（内存版本）/ 3001（MongoDB 版本）

### 前端 (yunl-fe)
- **框架**: React 18.3.1 + TypeScript
- **UI 组件库**: Ant Design 5.25.0
- **路由**: React Router DOM 7.5.3
- **HTTP 客户端**: Axios 1.9.0
- **构建工具**: Create React App + CRACO 7.1.0
- **端口**: 3000（开发）

## 前后端关系

### API 通信

前端通过 Axios 与后端 RESTful API 进行通信：

```
前端 (yunl-fe)                    后端 (backend)
     │                                │
     │  HTTP/HTTPS 请求               │
     ├──────────────────────────────>│
     │                                │
     │  JSON 响应数据                  │
     │<──────────────────────────────┤
     │                                │
```

### 环境配置

**开发环境**:
- 前端: `http://localhost:3000`
- 后端: `http://localhost:4000` (前端配置的 API 地址)
- 实际后端端口: `http://localhost:3000` 或 `http://localhost:3001`

**生产环境**:
- 前端: 部署后访问
- 后端 API: `https://ark.ubuntu.io`

### API 接口

后端提供的主要 API 接口：

#### 用户管理
- `GET /api/users` - 获取所有用户（支持分页、搜索、筛选）
- `GET /api/users/:id` - 获取单个用户
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

#### 查询参数
- `keyword`: 关键词搜索（姓名、邮箱、手机号）
- `minAge`: 最小年龄
- `maxAge`: 最大年龄
- `sortBy`: 排序字段
- `sortOrder`: 排序方向 (asc, desc)
- `page`: 页码
- `pageSize`: 每页数量

### 数据流向

```
用户操作 → 前端组件 → Axios 请求 → 后端 API → 数据库
                                              │
用户响应 ← 前端渲染 ← JSON 数据 ← 后端处理 ← 数据库
```

## 快速开始

### 1. 启动后端服务

```bash
cd backend
npm install
npm start
```

后端将在 `http://localhost:3000` 启动

### 2. 启动前端应用

```bash
cd yunl-fe
npm install
npm start
```

前端将在 `http://localhost:3000` 启动

### 3. 配置前端 API 地址

在 `yunl-fe/.env.development` 中配置后端 API 地址：

```env
REACT_APP_BASE_URL=http://localhost:3000
```

## 项目功能

### 后端功能
- ✅ 用户管理（增删改查）
- ✅ 数据验证（邮箱、手机号、年龄等）
- ✅ 搜索和筛选
- ✅ 分页查询
- ✅ CORS 跨域支持
- ✅ MongoDB 数据持久化

### 前端功能
- ✅ 用户认证（登录、注册）
- ✅ AI 医疗功能
- ✅ 仪表盘界面
- ✅ 库存管理系统
- ✅ 响应式设计
- ✅ 类型安全（TypeScript）

## 开发说明

### 添加新功能

1. **后端**:
   - 在 `backend/controllers/` 添加业务逻辑
   - 在 `backend/routes/` 添加路由定义
   - 在 `backend/middleware/` 添加验证逻辑

2. **前端**:
   - 在 `yunl-fe/src/pages/` 添加页面组件
   - 在 `yunl-fe/src/services/` 添加 API 调用服务
   - 在 `yunl-fe/src/router/` 配置路由

### 数据模型

**用户模型 (User)**:
- `name`: 姓名（String，必填）
- `age`: 年龄（Number，必填，0-120）
- `email`: 邮箱（String，必填，唯一）
- `phone`: 手机号（String，必填，唯一）
- `createdAt`: 创建时间（Date，自动生成）

## 部署说明

### 后端部署
1. 安装 MongoDB
2. 配置环境变量
3. 启动 MongoDB 服务
4. 运行 `node server-mongo.js`

### 前端部署
1. 运行 `npm run build` 构建生产版本
2. 将 `build/` 目录部署到静态服务器
3. 配置生产环境 API 地址

## 注意事项

- 前端开发环境默认 API 地址为 `http://localhost:4000`，需要根据实际后端端口调整
- 后端提供内存版本和 MongoDB 版本两种实现
- 生产环境使用 HTTPS 协议
- 前后端需要配置 CORS 以允许跨域请求

## 许可证

私有项目
