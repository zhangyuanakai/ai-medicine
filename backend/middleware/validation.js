// middleware/validation.js - 验证中间件

const { isValidEmail, isValidPhone } = require('../utils/helpers');
const { emailExists, phoneExists } = require('../data/users');

// 验证用户数据（增删改查通用）
const validateUser = (req, res, next) => {
  const { name, age, email, phone } = req.body;
  const userId = req.params.id ? parseInt(req.params.id) : null;

  // 姓名验证
  if (name !== undefined && name.length < 2) {
    return res.status(400).json({
      success: false,
      message: '姓名至少需要2个字符'
    });
  }

  // 年龄验证
  if (age !== undefined) {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      return res.status(400).json({
        success: false,
        message: '年龄必须在 0-120 之间'
      });
    }
  }

  // 邮箱验证
  if (email !== undefined) {
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: '邮箱格式不正确'
      });
    }
    if (emailExists(email, userId)) {
      return res.status(400).json({
        success: false,
        message: '该邮箱已被注册'
      });
    }
  }

  // 手机号验证
  if (phone !== undefined) {
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: '手机号格式不正确'
      });
    }
    if (phoneExists(phone, userId)) {
      return res.status(400).json({
        success: false,
        message: '该手机号已被注册'
      });
    }
  }

  next();
};

// 验证必填字段
const validateRequired = (req, res, next) => {
  const { name, age, email, phone } = req.body;

  if (!name || !age || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: '请填写所有字段（姓名、年龄、邮箱、手机号）'
    });
  }

  next();
};

module.exports = {
  validateUser,
  validateRequired
};