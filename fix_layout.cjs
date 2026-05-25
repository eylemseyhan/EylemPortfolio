const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (['AboutPage.jsx', 'CoverPage.jsx', 'InsideCover.jsx'].includes(file)) return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Pattern 1: Red line
  if (content.includes('className="absolute left-16 top-0 bottom-0 w-px"')) {
    content = content.replace('className="absolute left-16 top-0 bottom-0 w-px"', 'className="absolute left-16 top-0 bottom-0 w-px hidden md:block"');
    changed = true;
  }
  
  // Pattern 2: Ring holes
  if (content.includes('className="absolute left-4 top-0 bottom-0 flex flex-col items-center justify-around py-8"')) {
    content = content.replace('className="absolute left-4 top-0 bottom-0 flex flex-col items-center justify-around py-8"', 'className="absolute left-4 top-0 bottom-0 hidden md:flex flex-col items-center justify-around py-8"');
    changed = true;
  }

  // Pattern 3: Container (some might have max-w-3xl, 4xl, 5xl, 6xl)
  const regex = /className="max-w-([3456]xl) mx-auto pl-10 sm:pl-16 relative"/g;
  if (regex.test(content)) {
    content = content.replace(regex, 'className="max-w-$1 mx-auto px-4 md:pl-16 relative flex flex-col items-center md:items-start text-center md:text-left"');
    changed = true;
  }
  
  // Quick fix for ContactPage Envelope
  if (file === 'ContactPage.jsx' && content.includes('className="max-w-3xl mx-auto pl-10 sm:pl-16 relative"')) {
    content = content.replace('className="max-w-3xl mx-auto pl-10 sm:pl-16 relative"', 'className="max-w-3xl mx-auto px-4 md:pl-16 relative flex flex-col items-center md:items-start text-center md:text-left"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed ' + file);
  }
});
