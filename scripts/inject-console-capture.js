const fs = require('fs');
const path = require('path');

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      injectScript(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');

      if (!content.includes('dashboard-console-capture.js')) {
        // Inject before closing </head> tag
        if (content.includes('</head>')) {
          content = content.replace('</head>', SCRIPT_TAG + '\n</head>');
          fs.writeFileSync(filePath, content, 'utf8');
          console.log('Injected console capture script into:', filePath);
        }
      }
    }
  }
}

// For Next.js, inject into the .next/server output
const outDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(outDir)) {
  injectScript(outDir);
}

// Also check for static export
const staticDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(staticDir)) {
  injectScript(staticDir);
}

console.log('Console capture script injection complete.');