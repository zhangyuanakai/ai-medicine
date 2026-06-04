// models/User.js - MongoDB 用户模型

const mongoose = require('mongoose');

// 定义用户数据结构
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '姓名是必填项'],
    minlength: [2, '姓名至少需要2个字符'],
  },
  age: {
    type: Number,
    required: [true, '年龄是必填项'],
    min: [0, '年龄不能小于0'],
    max: [120, '年龄不能大于120'],
  },
  email: {
    type: String,
    required: [true, '邮箱是必填项'],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '邮箱格式不正确'],
  },
  phone: {
    type: String,
    required: [true, '手机号是必填项'],
    unique: true,
    match: [/^1[3-9]\d{9}$/, '手机号格式不正确'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
