const glob = require('glob');
const fs = require('fs-extra');

const files = glob.sync('src/**/*.{ts,html}');

let score = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  if (content.includes('ChatGPT') || content.includes('AI')) {
    score += 10;
  }
});

console.log(`AI detection score: ${score}`);

if (score > 30) {
  console.error('AI usage threshold exceeded');
  process.exit(1);
}

process.exit(0);
