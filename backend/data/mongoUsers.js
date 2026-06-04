// data/mongoUsers.js - MongoDB 数据操作

const User = require('../models/User');

// 获取所有用户
const getUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

// 获取单个用户
const getUserById = async (id) => {
  return User.findById(id);
};

// 添加用户
const addUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// 更新用户
const updateUser = async (id, updates) => {
  return await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};

// 删除用户
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// 检查邮箱是否存在
const emailExists = async (email, excludeId = null) => {
  const query = { email };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const user = await User.findOne(query);
  return !!user;
};

// 检查手机号是否存在
const phoneExists = async (phone, excludeId = null) => {
  const query = { phone };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const user = await User.findOne(query);
  return !!user;
};

// 初始化示例数据
const initSampleData = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    console.log('📝 数据库为空，添加示例数据...');
    const sampleUsers = [
      // {
      //   name: '张三',
      //   age: 20,
      //   email: 'zhang@example.com',
      //   phone: '13800138001',
      // },
      // { name: '李四', age: 25, email: 'li@example.com', phone: '13800138002' },
      // {
      //   name: '王五',
      //   age: 22,
      //   email: 'wang@example.com',
      //   phone: '13800138003',
      // },
      {
        name: '赵六',
        age: 28,
        email: 'zhao@example.com',
        phone: '13800138004',
      },
      {
        name: '小明11',
        age: 18,
        email: 'xiaoming@example.com',
        phone: '13800138005',
      },
    ];
    await User.insertMany(sampleUsers);
    console.log(`✅ 添加了 ${sampleUsers.length} 条示例数据`);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  emailExists,
  phoneExists,
  initSampleData,
};
