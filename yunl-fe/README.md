# Yunl-FE

一个现代化的 React + TypeScript 前端应用程序，用于 AI 医疗平台。

## 技术栈

- **框架**: React 18.3.1 + TypeScript
- **UI 组件库**: Ant Design 5.25.0
- **路由**: React Router DOM 7.5.3
- **HTTP 客户端**: Axios 1.9.0
- **样式**: Sass 1.100.0
- **构建工具**: Create React App + CRACO 7.1.0
- **开发工具**: 
  - @react-buddy/ide-toolbox
  - @react-buddy/palette-antd
  - Prettier 3.5.3

## 项目结构

```
yunl-fe/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口层
│   ├── dev/            # 开发工具和组件预览
│   ├── layouts/        # 布局组件
│   │   ├── AppLayout.tsx
│   │   └── AuthLayout.tsx
│   ├── pages/          # 页面组件
│   │   ├── auth/       # 认证页面
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   └── business/   # 业务页面
│   │       ├── AiMedicine.tsx
│   │       ├── Dashboard.tsx
│   │       └── InventoryManagement.tsx
│   ├── router/         # 路由配置
│   ├── services/       # 业务逻辑服务
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   ├── App.tsx         # 根组件
│   └── index.tsx       # 应用入口
├── .env.development    # 开发环境变量
├── .env.production     # 生产环境变量
├── craco.config.js     # CRACO 配置
├── package.json        # 项目依赖
└── tsconfig.json       # TypeScript 配置
```

## 功能特性

- **用户认证**: 登录和注册页面
- **AI 医疗**: AI 驱动的医疗功能
- **仪表盘**: 主仪表盘界面
- **库存管理**: 库存管理系统
- **响应式设计**: 基于 Ant Design 组件的移动端友好界面
- **类型安全**: 完整的 TypeScript 支持
- **路径别名**: 使用 `@/` 导入 src 目录

## 环境变量

### 开发环境
```env
NODE_ENV=development
REACT_APP_BASE_URL=http://localhost:4000
```

### 生产环境
```env
NODE_ENV=production
REACT_APP_BASE_URL=https://ark.ubuntu.io
```

## 快速开始

### 前置要求

- Node.js (v16 或更高版本)
- npm 或 yarn

### 安装依赖

```bash
# 安装依赖
npm install
# 或者
yarn install
```

### 开发模式

```bash
# 启动开发服务器
npm start
# 或者
yarn start
```

应用将在 `http://localhost:3000` 运行

### 生产构建

```bash
# 构建生产版本
npm run build
# 或者
yarn build
```

优化后的构建文件将在 `build/` 目录中。

### 测试

```bash
# 运行测试
npm test
# 或者
yarn test
```

## 配置说明

### CRACO 配置

项目使用 CRACO 来自定义 Create React App 配置：

- **路径别名**: `@/` 被配置为 `src/` 目录的别名
- **控制台移除**: 生产构建中使用 `transform-remove-console` 移除控制台语句

### TypeScript 配置

- 目标版本: ES5
- 模块系统: ESNext
- 启用严格模式
- 路径别名配置: `@/*` → `src/*`

## 可用脚本

- `npm start` - 启动开发服务器
- `npm run build` - 创建生产构建
- `npm test` - 运行测试套件
- `npm run eject` - 从 Create React App 弹出配置（不可逆操作）

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

私有项目