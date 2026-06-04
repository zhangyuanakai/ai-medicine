// data/users.js - 用户数据

let users = [
  {
    id: 1,
    name: '张三',
    age: 20,
    email: 'zhang@example.com',
    phone: '13800138001',
  },
  {
    id: 2,
    name: '李四',
    age: 25,
    email: 'li@example.com',
    phone: '13800138002',
  },
  {
    id: 3,
    name: '王五',
    age: 22,
    email: 'wang@example.com',
    phone: '13800138003',
  },
  {
    id: 4,
    name: '赵六',
    age: 28,
    email: 'zhao@example.com',
    phone: '13800138004',
  },
  {
    id: 5,
    name: '小明',
    age: 18,
    email: 'xiaoming@example.com',
    phone: '13800138005',
  },
  {
    id: 6,
    name: '小红',
    age: 19,
    email: 'xiaohong@example.com',
    phone: '13800138006',
  },
  {
    id: 7,
    name: '小刚',
    age: 21,
    email: 'xiaogang@example.com',
    phone: '13800138007',
  },
  {
    id: 8,
    name: '小丽',
    age: 23,
    email: 'xiaoli@example.com',
    phone: '13800138008',
  },
  {
    id: 9,
    name: '张三丰',
    age: 30,
    email: 'zhangsf@example.com',
    phone: '13800138009',
  },
  {
    id: 10,
    name: '李寻欢',
    age: 35,
    email: 'lixh@example.com',
    phone: '13800138010',
  },
];

// 获取所有用户
const getUsers = () => users;

// 获取单个用户
const getUserById = (id) => users.find((u) => u.id === id);

// 添加用户
const addUser = (user) => {
  const newUser = { id: users.length + 1, ...user };
  users.push(newUser);
  return newUser;
};

// 更新用户
const updateUser = (id, updates) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  return users[index];
};

// 删除用户
const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const deleted = users[index];
  users.splice(index, 1);
  return deleted;
};

// 检查邮箱是否存在
const emailExists = (email, excludeId = null) => {
  return users.some((u) => u.email === email && u.id !== excludeId);
};

// 检查手机号是否存在
const phoneExists = (phone, excludeId = null) => {
  return users.some((u) => u.phone === phone && u.id !== excludeId);
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  emailExists,
  phoneExists,
};
