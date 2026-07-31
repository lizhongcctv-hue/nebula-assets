const { execSync } = require('child_process');
const path = require('path');

// Use xb evaluate to get category button cover images
const result = execSync(
  `node "${process.env.xbPath || 'D:\\HONOR Share\\QClaw\\v0.2.35.624\\resources\\openclaw\\config\\skills\\xbrowser\\scripts\\xb.cjs'}" run --browser chrome eval --expr "(() => { const btns = document.querySelectorAll('.category-scroll button'); return Array.from(btns).map(b => ({ text: b.textContent.trim(), img: b.style.backgroundImage || window.getComputedStyle(b).backgroundImage || '' })); })()"`,
  { encoding: 'utf8', timeout: 15000 }
);
console.log(result);
