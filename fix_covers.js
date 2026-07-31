const fs = require('fs');
const path = 'C:\\Users\\lizho\\.qclaw\\workspace\\nebula-next\\lib\\notion.ts';
let c = fs.readFileSync(path, 'utf8');

// 唯一替换：逐条定位，避免误替换其他条目
const fixes = [
  // 1. AI人物：face-closeup.jpg → bokeh.jpg（古风意境保留face-closeup）
  ['id: \'a001\'', 'cover: \'face-closeup.jpg\'', 'cover: \'bokeh.jpg\''],
  // 2. 花卉微距 m001 粉紫光影：pink_purple.jpg → fireworks.jpg
  ['id: \'m001\'', 'cover: \'pink_purple.jpg\'', 'cover: \'fireworks.jpg\''],
  // 3. 花卉微距 m002 天台日落：rooftop.jpg → sunset_sea.jpg（城市建筑的天台日落保留rooftop）
  ['id: \'m002\'', 'cover: \'rooftop.jpg\'', 'cover: \'sunset_sea.jpg\''],
];

fixes.forEach(([where, old, newStr]) => {
  // 在包含where的行附近做替换
  const lines = c.split('\n');
  let done = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(where) && !done) {
      if (lines[i].includes(old)) {
        lines[i] = lines[i].replace(old, newStr);
        console.log('FIXED at line', i + 1, ':', old, '→', newStr);
        done = true;
      }
    }
  }
  if (!done) console.log('NOT FOUND:', where, old);
});

fs.writeFileSync(path, c, 'utf8');
console.log('done');
