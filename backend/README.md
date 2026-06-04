# 用户管理系统 - Node.js 后端

一个基于 Express.js 的用户管理系统，提供内存存储和 MongoDB 两种实现方式。

## 项目结构

```
backend/
├── controllers/
│   ├── userController.js      # 内存版本业务逻辑
│   └── mongoUserController.js # MongoDB 版本业务逻辑
├── data/
│   ├── users.js               # 内存数据存储
│   ├── users.json             # JSON 数据文件
│   └── mongoUsers.js          # MongoDB 数据操作
├── middleware/
│   ├── cors.js                # CORS 中间件
│   └── validation.js          # 数据验证中间件
├── models/
│   └── User.js                # MongoDB 用户模型
├── routes/
│   ├── users.js               # 内存版本路由
│   └── mongoUsers.js          # MongoDB 版本路由
├── server.js                  # 内存版本服务器
├── server-mongo.js            # MongoDB 版本服务器
└── package.json
```

## 功能特性

### 用户管理
- ✅ 获取所有用户（支持分页、筛选、排序）
- ✅ 获取单个用户
- ✅ 创建用户
- ✅ 更新用户
- ✅ 删除用户

### 数据验证
- ✅ 必填字段验证
- ✅ 邮箱格式验证
- ✅ 手机号格式验证
- ✅ 年龄范围验证
- ✅ 唯一性验证（邮箱、手机号）

### 查询功能
- ✅ 关键词搜索（姓名、邮箱、手机号）
- ✅ 年龄范围筛选
- ✅ 多种排序方式
- ✅ 分页查询

## 快速开始

### 安装依赖

```bash
cd backend
npm install
```

### 运行内存版本

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动

### 运行 MongoDB 版本

首先确保 MongoDB 已安装并运行：

```bash
# macOS (使用 Homebrew)
brew services start mongodb-community

# 或手动启动
mongod
```

然后启动 MongoDB 版本服务器：

```bash
node server-mongo.js
```

服务器将在 `http://localhost:3001` 启动

## API 接口

### 内存版本 (端口 3000)

#### 获取所有用户
```bash
GET http://localhost:3000/api/users
```

查询参数：
- `keyword`: 关键词搜索
- `minAge`: 最小年龄
- `maxAge`: 最大年龄
- `sortBy`: 排序字段 (name, age, email, phone)
- `sortOrder`: 排序方向 (asc, desc)
- `page`: 页码（默认 1）
- `pageSize`: 每页数量（默认 5）

示例：
```bash
curl "http://localhost:3000/api/users?keyword=张&minAge=20&page=1&pageSize=5"
```

#### 获取单个用户
```bash
GET http://localhost:3000/api/users/:id
```

#### 创建用户
```bash
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "张三",
  "age": 25,
  "email": "zhangsan@example.com",
  "phone": "13800138000"
}
```

#### 更新用户
```bash
PUT http://localhost:3000/api/users/:id
Content-Type: application/json

{
  "name": "张三丰",
  "age": 30
}
```

#### 删除用户
```bash
DELETE http://localhost:3000/api/users/:id
```

### MongoDB 版本 (端口 3001)

MongoDB 版本使用相同的 API 接口，只需将端口改为 3001：

```bash
# 示例
GET http://localhost:3001/api/users
POST http://localhost:3001/api/users
```

## 数据模型

### User 模型

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | ✅ | 姓名（至少 2 个字符） |
| age | Number | ✅ | 年龄（0-120） |
| email | String | ✅ | 邮箱（唯一） |
| phone | String | ✅ | 手机号（唯一，中国手机号格式） |
| createdAt | Date | ❌ | 创建时间（自动生成） |

## 技术栈

- **Node.js** - 运行时环境
- **Express.js** - Web 框架
- **MongoDB** - 数据库（MongoDB 版本）
- **Mongoose** - MongoDB ODM（MongoDB 版本）

## 开发说明

### 添加新功能

1. 在 `controllers/` 中添加业务逻辑
2. 在 `routes/` 中添加路由定义
3. 在 `middleware/` 中添加验证逻辑（如需要）

### 数据验证

验证规则在 `middleware/validation.js` 中定义：

```javascript
{
  name: (value) => value && value.length >= 2,
  age: (value) => value >= 0 && value <= 120,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^1[3-9]\d{9}$/.test(value)
}
```

## 注意事项

- 内存版本的数据在服务器重启后会丢失
- MongoDB 版本需要先安装并启动 MongoDB 服务
- 两个版本使用不同的端口，可以同时运行
- MongoDB 版本会自动初始化示例数据

## 许可证

ISC
