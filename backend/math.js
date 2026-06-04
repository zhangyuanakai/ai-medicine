// math.js - 数学计算模块

// 加法
function add(a, b) {
  return a + b;
}

// 减法
function subtract(a, b) {
  return a - b;
}

// 乘法
function multiply(a, b) {
  return a * b;
}

// 除法
function divide(a, b) {
  if (b === 0) {
    return '除数不能为0';
  }
  return a / b;
}

// 导出这些函数，让其他文件可以使用
module.exports = {
  add,
  subtract,
  multiply,
  divide
};