// server.js - 主入口


/*
第1周：完善 + Express
Day 1-2: 给现有项目加验证、搜索、分页
Day 3-5: 学习 Express，重构你的后端
Day 6-7: 用 Express 重写增删改查
第2周：数据库
Day 1-2: 学习文件存储（JSON 文件）
Day 3-5: 学习 SQLite 或 MongoDB
Day 6-7: 把项目改成真正的数据库存储
第3周：实战项目
做一个完整的项目，比如：
- 待办事项应用（带用户登录）
- 博客系统（文章 + 评论）
- 记账本（收支记录）

 */


const express = require('express');
const usersRouter = require('./routes/users');
const corsMiddleware = require('./middleware/cors');

const app = express();

// 中间件
app.use(corsMiddleware);      // CORS 处理
app.use(express.json());       // JSON 解析

// 路由
app.use('/api/users', usersRouter);

// 404 处理
app.use((req, res) => {
  res.status(404).json({ success: false, message: '接口不存在' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`\n🚀 服务器已启动！`);
  console.log(`📡 地址: http://localhost:${port}`);
  console.log(`\n✅ 模块化结构加载完成！`);
  console.log(`📂 目录结构:`);
  console.log(`   ├── server.js (主入口)`);
  console.log(`   ├── routes/ (路由)`);
  console.log(`   ├── controllers/ (业务逻辑)`);
  console.log(`   ├── middleware/ (中间件)`);
  console.log(`   ├── data/ (数据层)`);
  console.log(`   └── utils/ (工具函数)`);
  console.log(`\n📝 测试: curl http://localhost:${port}/api/users\n`);
});