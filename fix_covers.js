const fs = require('fs');
const path = 'C:\\Users\\lizho\\.qclaw\\workspace\\nebula-next\\lib\\notion.ts';

let c = fs.readFileSync(path, 'utf8');
const lines = c.split('\n');
let modified = false;

const changes = [
  { line: 69, old: "cover: 'face-closeup.jpg'",  new: "cover: 'bokeh.jpg'"     }, // a001 AI人物
  { line: 66, old: "cover: 'pink_purple.jpg'",    new: "cover: 'fireworks.jpg'"  }, // m001 花卉微距/粉紫光影
  { line: 67, old: "cover: 'rooftop.jpg'",        new: "cover: 'sunset_sea.jpg'" }, // m002 花卉微距/天台日落
];

changes.forEach(ch => {
  const line = lines[ch.line - 1];
  if (!line) { console.log('行', ch.line, '不存在'); return; }
  if (line.includes(ch.old)) {
    lines[ch.line - 1] = line.replace(ch.old, ch.new);
    console.log(`✅ 行${ch.line}: ${ch.old} → ${ch.new}`);
    modified = true;
  } else {
    console.log(`⚠️  行${ch.line}未匹配: ${line.trim()}`);
  }
});

if (modified) {
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log('\n文件已保存');
}
