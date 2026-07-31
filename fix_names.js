const fs = require('fs');
const path = 'C:\\Users\\lizho\\.qclaw\\workspace\\nebula-next\\lib\\notion.ts';
let c = fs.readFileSync(path, 'utf8');
const lines = c.split('\n');

// 删掉花卉微距的注释+m001+m002（行65-67，0-indexed为64-66）
// 先找到花卉微距注释所在行
const delKeys = ["// 花卉微距", "id: 'm001'", "id: 'm002'"];
const newLines = lines.filter((line, i) => {
  const keep = !delKeys.some(k => line.includes(k));
  if (!keep) console.log(`删除行${i+1}: ${line.trim().slice(0,60)}`);
  return keep;
});

fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('\n删后行数:', newLines.length, '(原' + lines.length + ')');
