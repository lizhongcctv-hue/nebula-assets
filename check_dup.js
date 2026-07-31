const fs = require('fs');

const coversDir = 'C:\\Users\\lizho\\.qclaw\\workspace\\nebula-next\\public\\covers';
const notionFile = 'C:\\Users\\lizho\\.qclaw\\workspace\\nebula-next\\lib\\notion.ts';

const available = new Set(
  fs.readdirSync(coversDir)
);
console.log('=== 已有封面文件 ===');
available.forEach(f => console.log(' ', f));
console.log();

// 提取FALLBACK_ASSETS中每条的id、name、category、cover
const content = fs.readFileSync(notionFile, 'utf8');
const assetMatch = content.match(/FALLBACK_ASSETS[\s\S]*?\];/);
if (!assetMatch) { console.log('未找到FALLBACK_ASSETS'); process.exit(1); }

const block = assetMatch[0];
// 提取每个Asset对象
const assetRe = /\{ id: '([^']+)', name: '([^']+)', category: '([^']+)', .*? cover: '([^']+)'/g;
const assets = [];
let m;
while ((m = assetRe.exec(block)) !== null) {
  assets.push({ id: m[1], name: m[2], category: m[3], cover: m[4] });
}

console.log('=== FALLBACK_ASSETS 封面检查 ===');
const coverCount = {};
const usedCovers = [];

assets.forEach(a => {
  usedCovers.push(a.cover);
  coverCount[a.cover] = (coverCount[a.cover] || []);
  coverCount[a.cover].push(`${a.id} ${a.category}/${a.name}`);
});

let hasDuplicate = false;
let hasMissing = false;

Object.entries(coverCount).forEach(([cover, items]) => {
  if (items.length > 1) {
    hasDuplicate = true;
    console.log(`[重复] ${cover}:`);
    items.forEach(i => console.log(`       ${i}`));
  }
});

console.log();
usedCovers.forEach(cover => {
  if (!available.has(cover)) {
    hasMissing = true;
    console.log(`[缺失] ${cover} - 无对应文件`);
  }
});

if (!hasDuplicate && !hasMissing) console.log('✅ 无重复，无缺失');
console.log();
console.log(`共 ${assets.length} 条，${usedCovers.length} 个封面`);
