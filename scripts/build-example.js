const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CREATE_APP = path.join(ROOT, 'packages', 'create-app');
const TEMPLATE_SRC = path.join(CREATE_APP, 'public', 'template');
const FEATURES_DIR = path.join(CREATE_APP, 'public', 'features');
const EXAMPLES_DIR = path.join(ROOT, 'examples');

const DEFAULT_CONFIG = path.join(EXAMPLES_DIR, 'showcase.json');

const argIndex = process.argv.indexOf('--config');
const configPath = argIndex >= 0 ? path.resolve(ROOT, process.argv[argIndex + 1]) : DEFAULT_CONFIG;

if (!fs.existsSync(configPath)) {
  console.error(`\n  Example config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const { name, appName, appTitle, slug, features, overlay, dependencies } = config;
const TARGET = path.join(EXAMPLES_DIR, name);
const OVERLAY_SRC = overlay ? path.join(ROOT, overlay) : null;

if (!name || !appName || !appTitle || !slug || !Array.isArray(features) || !features.length) {
  console.error(`\n  Invalid example config: ${configPath}`);
  process.exit(1);
}

let failed = false;

function fail(msg) {
  failed = true;
  console.error(`  ✗ ${msg}`);
}

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src).sort();
  for (const entry of entries) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (stat.isFile()) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const { loadManifest, weaveFeature } = require(path.join(ROOT, 'packages', 'core', 'dist', 'index.js'));

  console.log(`\n  Building example "${name}" → ${path.relative(ROOT, TARGET)}/`);

  if (!fs.existsSync(TEMPLATE_SRC)) {
    fail(`base template not bundled at ${TEMPLATE_SRC}`);
    return;
  }
  if (!fs.existsSync(FEATURES_DIR)) {
    fail(`features not bundled at ${FEATURES_DIR}`);
    return;
  }

  cleanDir(TARGET);
  copyRecursive(TEMPLATE_SRC, TARGET);
  ok(`base template copied (${TARGET})`);

  const pkgPath = path.join(TARGET, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = appName;
  pkg.version = '1.0.0';
  pkg.private = true;
  pkg.description = `${appTitle} — generated example for expo-template-coderooz`;
  delete pkg.workspaces;
  delete pkg.postinstall;
  delete pkg.publishConfig;
  pkg.scripts = {
    start: 'expo start',
    android: 'expo run:android',
    ios: 'expo run:ios',
    web: 'expo start --web',
    lint: 'expo lint',
    typecheck: 'tsc --noEmit',
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  ok('package.json customized (name, private, scripts, no workspaces)');

  const appJsonPath = path.join(TARGET, 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'));
  appJson.expo.name = appTitle;
  appJson.expo.slug = slug;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
  ok('app.json customized (name, slug)');

  console.log('\n  Weaving features...');

  const results = [];
  for (const featureName of features) {
    const featurePath = path.join(FEATURES_DIR, `feature-${featureName}`);
    if (!fs.existsSync(featurePath)) {
      fail(`feature package missing: feature-${featureName}`);
      continue;
    }
    const manifest = loadManifest(featurePath);
    const result = weaveFeature(manifest, { projectDir: TARGET, featuresDir: FEATURES_DIR });
    results.push(result);
    console.log(`    ${result.feature}: ${result.filesCopied} files, ${result.depsAdded} deps`);
  }

  if (results.some((r) => r.filesCopied === 0)) {
    fail('one or more features copied 0 files (dir-resolution regression?)');
  } else {
    ok(`all ${results.length} features copied > 0 files`);
  }

  if (OVERLAY_SRC) {
    if (!fs.existsSync(OVERLAY_SRC)) {
      fail(`overlay source missing at ${OVERLAY_SRC}`);
      return;
    }
    copyRecursive(OVERLAY_SRC, TARGET);
    ok('overlay copied');
  }

  const finalPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const deps = finalPkg.dependencies ?? {};
  for (const featureDep of dependencies ?? []) {
    if (!deps[featureDep]) {
      fail(`expected feature dep merged: ${featureDep}`);
    }
  }
  if (dependencies?.length) {
    ok(`feature deps merged (${dependencies.join(', ')})`);
  }

  console.log(`\n  Feature weave summary:`);
  for (const r of results) {
    console.log(`    ${r.feature.padEnd(16)} ${String(r.filesCopied).padStart(3)} files, ${String(r.depsAdded).padStart(2)} deps, hooks: [${r.hooksExecuted.join(', ') || 'none'}]`);
  }

  console.log(`\n  Example generated at ${TARGET}`);
  console.log(`  Run it with: cd ${path.relative(ROOT, TARGET)} && npm install && npx expo start`);

  if (failed) {
    console.error('\n  Example build FAILED');
    process.exit(1);
  }
  console.log('\n  Example build OK');
}

main();
