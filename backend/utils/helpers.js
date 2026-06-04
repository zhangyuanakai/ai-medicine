// utils/helpers.js - 工具函数

// 验证邮箱格式
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证手机号格式
const isValidPhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// 分页函数
const paginate = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: paginatedData,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages
    }
  };
};

// 筛选函数
const filterUsers = (users, filters) => {
  let result = [...users];

  // 关键词搜索
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    result = result.filter(user =>
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.phone.includes(keyword)
    );
  }

  // 年龄筛选
  if (filters.minAge) {
    result = result.filter(user => user.age >= parseInt(filters.minAge));
  }
  if (filters.maxAge) {
    result = result.filter(user => user.age <= parseInt(filters.maxAge));
  }

  // 排序
  if (filters.sortBy) {
    const order = filters.sortOrder === 'desc' ? -1 : 1;
    if (filters.sortBy === 'name') {
      result.sort((a, b) => order * a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'age') {
      result.sort((a, b) => order * (a.age - b.age));
    } else if (filters.sortBy === 'id') {
      result.sort((a, b) => order * (a.id - b.id));
    }
  }

  return result;
};

module.exports = {
  isValidEmail,
  isValidPhone,
  paginate,
  filterUsers
};