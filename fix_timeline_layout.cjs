const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (['AboutPage.jsx', 'CoverPage.jsx', 'InsideCover.jsx'].includes(file)) return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Pattern 3: Container fix (remove flex flex-col items-center md:items-start text-center md:text-left)
  const regex = /className="max-w-([3456]xl) mx-auto px-4 md:pl-16 relative flex flex-col items-center md:items-start text-center md:text-left"/g;
  if (regex.test(content)) {
    content = content.replace(regex, 'className="max-w-$1 mx-auto px-4 md:pl-16 relative"');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed container in ' + file);
  }
});
