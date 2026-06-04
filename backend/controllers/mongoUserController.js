// controllers/mongoUserController.js - MongoDB 业务逻辑

const mongoUsers = require('../data/mongoUsers');
const { filterUsers, paginate } = require('../utils/helpers');

// 获取所有用户
const getAllUsers = async (req, res) => {
  try {
    let users = await mongoUsers.getUsers();

    const { keyword, minAge, maxAge, sortBy, sortOrder } = req.query;
    users = filterUsers(users, { keyword, minAge, maxAge, sortBy, sortOrder });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const { data, pagination } = paginate(users, page, pageSize);

    res.json({
      success: true,
      data,
      pagination,
      filters: {
        keyword: keyword || null,
        minAge: minAge || null,
        maxAge: maxAge || null,
      },
    });
  } catch (error) {
    console.error('获取用户失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 获取单个用户
const getUser = async (req, res) => {
  try {
    const user = await mongoUsers.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('获取用户失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 创建用户
const createUser = async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;

    if (await mongoUsers.emailExists(email)) {
      return res
        .status(400)
        .json({ success: false, message: '该邮箱已被注册' });
    }

    if (await mongoUsers.phoneExists(phone)) {
      return res
        .status(400)
        .json({ success: false, message: '该手机号已被注册' });
    }

    const newUser = await mongoUsers.addUser({ name, age, email, phone });
    console.log('✅ 添加用户:', newUser);

    res.json({ success: true, message: '添加成功', data: newUser });
  } catch (error) {
    console.error('添加失败:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 更新用户
const updateUserById = async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;
    const id = req.params.id;

    if (email && (await mongoUsers.emailExists(email, id))) {
      return res
        .status(400)
        .json({ success: false, message: '该邮箱已被其他用户使用' });
    }

    if (phone && (await mongoUsers.phoneExists(phone, id))) {
      return res
        .status(400)
        .json({ success: false, message: '该手机号已被其他用户使用' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (age) updates.age = age;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;

    const updatedUser = await mongoUsers.updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    console.log('✏️ 修改用户:', updatedUser);
    res.json({ success: true, message: '修改成功', data: updatedUser });
  } catch (error) {
    console.error('修改失败:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 删除用户
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await mongoUsers.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    console.log('🗑️ 删除用户:', deletedUser);
    res.json({ success: true, message: '删除成功', data: deletedUser });
  } catch (error) {
    console.error('删除失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserById,
  deleteUserById,
};
