const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CREATE_APP_PUBLIC = path.join(ROOT, 'packages', 'create-app', 'public');

const IGNORE_DIRS = new Set([
  'node_modules', 'dist', '.git', 'coverage', '.expo', 'web-build',
  '.kotlin', '.vscode', '.github',
]);

const IGNORE_FILES = new Set([
  '.DS_Store', 'npm-debug.log', 'yarn-debug.log', 'yarn-error.log',
  '.gitignore', '.npmignore',
]);

function shouldIgnore(name, parentPath) {
  if (IGNORE_FILES.has(name)) return true;
  if (IGNORE_DIRS.has(name)) return true;
  if (name.startsWith('.')) return true;
  if (name.endsWith('.log')) return true;
  if (name.startsWith('package-lock')) return true;
  return false;
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyRecursive(src, dest, filter) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src).sort();
  for (const entry of entries) {
    if (filter && !filter(entry, src)) continue;
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath, filter);
    } else if (stat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const rootPkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
const templateFiles = rootPkg.files || [];
const templateDest = path.join(CREATE_APP_PUBLIC, 'template');

cleanDir(templateDest);
fs.mkdirSync(templateDest, { recursive: true });

fs.copyFileSync(
  path.join(ROOT, 'package.json'),
  path.join(templateDest, 'package.json'),
);
let copiedTpl = 1;

for (const file of templateFiles) {
  const srcPath = path.join(ROOT, file);
  if (!fs.existsSync(srcPath)) continue;
  const destPath = path.join(templateDest, file);
  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    copyRecursive(srcPath, destPath, (entry, parent) => !shouldIgnore(entry, parent));
  } else if (stat.isFile()) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  }
  copiedTpl++;
}

const featuresSrc = path.join(ROOT, 'packages');
const featuresDest = path.join(CREATE_APP_PUBLIC, 'features');

cleanDir(featuresDest);
fs.mkdirSync(featuresDest, { recursive: true });

const featurePackages = fs.readdirSync(featuresSrc)
  .filter(entry =>
    entry.startsWith('feature-') &&
    fs.statSync(path.join(featuresSrc, entry)).isDirectory()
  )
  .sort();

for (const feature of featurePackages) {
  const srcPath = path.join(featuresSrc, feature);
  const destPath = path.join(featuresDest, feature);
  copyRecursive(srcPath, destPath, (entry, parent) => !shouldIgnore(entry, parent));
}

console.log(`\n  Assets bundled:`);
console.log(`    template/  → ${copiedTpl} items`);
console.log(`    features/  → ${featurePackages.length} packages (${featurePackages.join(', ')})`);
