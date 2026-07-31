const fs = require('fs');
const path = 'C:\\Users\\lizho\\.qclaw\\workspace\\nebula-next\\components\\VideoCard.tsx';
let c = fs.readFileSync(path, 'utf8');
const old = '20\u7ec4\u7cbe\u9009 4K/2K \u89c6\u9891';
const found = c.includes(old);
console.log('found:', found);
c = c.replace(old, '16\u7ec4\u7cbe\u9009 4K \u89c6\u9891');
fs.writeFileSync(path, c, 'utf8');
console.log('done');
