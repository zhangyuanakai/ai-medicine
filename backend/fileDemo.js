// fileDemo.js - 文件系统操作

const fs = require('fs');
const path = require('path');

console.log('=== Node.js 文件系统操作 ===\n');

// 1. 创建文件夹
const newFolder = './test-folder';
if (!fs.existsSync(newFolder)) {  // existsSync是否存在
  fs.mkdirSync(newFolder);    // 同步创建文件夹
  console.log('✅ 创建文件夹:', newFolder);
} else {
  console.log('📁 文件夹已存在:', newFolder);
}

// 2. 写入文件
const filePath = './test-folder/hello.txt';
const content = 'Hello, Node.js! 这是我写入的文件内容。\n第二行内容。';

fs.writeFileSync(filePath, content); // writeFileSync（文件、内容） 写入
console.log('✅ 写入文件:', filePath);

// 3. 读取文件
const readContent = fs.readFileSync(filePath, 'utf8');  //readFileSync (文件路径, 编码格式);读取内容
console.log('📖 读取文件内容:\n', readContent);

// 4. 追加内容
const moreContent = '\n这是追加的内容！';
fs.appendFileSync(filePath, moreContent); // appendFileSync（文件路径，内容）
console.log('➕ 追加内容到文件');

// 5. 再次读取，看追加效果
const newReadContent = fs.readFileSync(filePath, 'utf8');//readFileSync再次读取
console.log('📖 追加后的文件内容:\n', newReadContent);

// 6. 读取目录
console.log('\n📂 当前目录的文件列表:');
const files = fs.readdirSync('./'); //readdirSync  读取当前目录
files.forEach(file => {
  console.log('  -', file);
});

console.log('\n🎉 文件系统操作完成！');