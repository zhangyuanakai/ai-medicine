// controllers/userController.js - 用户业务逻辑

const { getUsers, getUserById, addUser, updateUser, deleteUser } = require('../data/users');
const { filterUsers, paginate } = require('../utils/helpers');

// 获取所有用户（带筛选、排序、分页）
const getAllUsers = (req, res) => {
  const { keyword, minAge, maxAge, sortBy, sortOrder, page = 1, pageSize = 5 } = req.query;

  // 1. 获取数据
  let users = getUsers();

  // 2. 筛选
  users = filterUsers(users, { keyword, minAge, maxAge, sortBy, sortOrder });

  // 3. 分页
  const { data, pagination } = paginate(users, parseInt(page), parseInt(pageSize));

  res.json({
    success: true,
    data,
    pagination,
    filters: { keyword: keyword || null, minAge: minAge || null, maxAge: maxAge || null, sortBy: sortBy || null, sortOrder: sortOrder || null }
  });
};

// 获取单个用户
const getUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({ success: false, message: '用户不存在' });
  }

  res.json({ success: true, data: user });
};

// 创建用户
const createUser = (req, res) => {
  const { name, age, email, phone } = req.body;

  const newUser = addUser({ name, age: parseInt(age), email, phone });
  console.log('✅ 添加用户:', newUser);

  res.json({ success: true, message: '添加成功', data: newUser });
};

// 更新用户
const updateUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, email, phone } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (age !== undefined) updates.age = parseInt(age);
  if (email !== undefined) updates.email = email;
  if (phone !== undefined) updates.phone = phone;

  const updatedUser = updateUser(id, updates);

  if (!updatedUser) {
    return res.status(404).json({ success: false, message: '用户不存在' });
  }

  console.log('✏️ 修改用户:', updatedUser);
  res.json({ success: true, message: '修改成功', data: updatedUser });
};

// 删除用户
const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const deletedUser = deleteUser(id);

  if (!deletedUser) {
    return res.status(404).json({ success: false, message: '用户不存在' });
  }

  console.log('🗑️ 删除用户:', deletedUser);
  res.json({ success: true, message: '删除成功', data: deletedUser });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserById,
  deleteUserById
};