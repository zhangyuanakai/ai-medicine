// server-mongo.js - MongoDB 版本服务器

const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/mongoUsers');
const corsMiddleware = require('./middleware/cors');
const { initSampleData } = require('./data/mongoUsers');

const app = express();

// 中间件
app.use(corsMiddleware);
app.use(express.json());

// 连接 MongoDB
mongoose
  .connect('mongodb://localhost:27017/user_management')
  .then(async () => {
    console.log('✅ MongoDB 连接成功');
    await initSampleData();
  })
  .catch((err) => {
    console.error('❌ MongoDB 连接失败:', err);
    process.exit(1);
  });

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
const port = 3001;
app.listen(port, () => {
  console.log(`\n🚀 MongoDB 版本服务器已启动！`);
  console.log(`📡 地址: http://localhost:${port}`);
  console.log(`📦 数据库: MongoDB (user_management)`);
  console.log(`\n✅ 测试: curl http://localhost:${port}/api/users\n`);
});
