// 我的第一个 Node.js 程序

// 1. 最简单的输出
console.log('Hello, Node.js!');
console.log('我成功运行了第一个 Node 程序！');

// 2. 查看当前文件路径
console.log('当前文件路径：', __filename);
console.log('当前目录路径：', __dirname);

// 3. 做一个计算
const a = 10;
const b = 20;
console.log(`${a} + ${b} = ${a + b}`);

// 4. 查看 Node.js 版本
console.log('Node.js 版本：', process.version);

// 5. 创建一个函数
function sayHello(name) {
  return `你好，${name}！`;
}

console.log(sayHello('Node.js 新手'));

console.log('🎉 恭喜！运行成功！');


// 导入 math.js 模块
const math = require('./math.js');

// 测试数学函数
console.log('=== 测试 math 模块 ===');
console.log('10 + 5 =', math.add(10, 5));
console.log('10 - 5 =', math.subtract(10, 5));
console.log('10 × 5 =', math.multiply(10, 5));
console.log('10 ÷ 5 =', math.divide(10, 5));
console.log('5 + 5 + 5=',math.add(5+5,5));