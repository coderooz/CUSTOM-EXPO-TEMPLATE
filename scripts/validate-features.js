const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');

const REQUIRED_FILES = ['coderooz.json', 'package.json', 'README.md', 'tsconfig.json'];
const REQUIRED_MANIFEST_FIELDS = ['name', 'version', 'description'];

let failed = false;

function fail(msg) {
  failed = true;
  console.error(`  ✗ ${msg}`);
}

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

function validateFeature(featureDir, knownPackages) {
  const name = path.basename(featureDir);
  const manifestPath = path.join(featureDir, 'coderooz.json');
  const packagePath = path.join(featureDir, 'package.json');

  console.log(`\n${name}`);

  for (const file of REQUIRED_FILES) {
    if (!fs.existsSync(path.join(featureDir, file))) {
      fail(`missing ${file}`);
    }
  }

  if (!fs.existsSync(manifestPath)) return;

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    for (const field of REQUIRED_MANIFEST_FIELDS) {
      if (!manifest[field]) fail(`coderooz.json missing required field "${field}"`);
    }
    ok('coderooz.json valid');
  } catch (err) {
    fail(`coderooz.json invalid: ${err.message}`);
    return;
  }

  if (!fs.existsSync(packagePath)) return;

  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  } catch (err) {
    fail(`package.json invalid: ${err.message}`);
    return;
  }

  const expectedPackageName = `@coderooz/${name}`;
  if (pkg.name !== expectedPackageName) {
    fail(`package.json name "${pkg.name}" should be "${expectedPackageName}"`);
  } else {
    ok('package.json name matches');
  }

  if (pkg.version !== manifest.version) {
    fail(`version mismatch: package.json "${pkg.version}" vs coderooz.json "${manifest.version}"`);
  } else {
    ok('versions match');
  }

  const filesField = pkg.files || [];
  if (!filesField.includes('coderooz.json') || !filesField.includes('template')) {
    fail('package.json "files" must include "coderooz.json" and "template"');
  } else {
    ok('files field includes coderooz.json + template');
  }

  const templateDir = path.join(featureDir, 'template');
  if (!fs.existsSync(templateDir)) {
    fail('template/ directory missing');
  }

  for (const requirement of manifest.requires ?? []) {
    const match = knownPackages.find((p) => {
      const otherManifest = JSON.parse(
        fs.readFileSync(path.join(p, 'coderooz.json'), 'utf-8'),
      );
      return otherManifest.name === requirement || path.basename(p) === `feature-${requirement}`;
    });
    if (!match) fail(`requires "${requirement}" but no matching feature package exists`);
    else ok(`requires "${requirement}" → ${path.basename(match)}`);
  }

  const manifestDeps = manifest.dependencies ?? {};
  for (const dep of Object.keys(manifestDeps)) {
    if (dep.startsWith('@coderooz/feature-')) {
      fail(`coderooz.json dependencies must not reference @coderooz/feature-* packages (use requires instead)`);
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  const only = args.filter((a) => a !== '--json');

  const featureDirs = fs
    .readdirSync(PACKAGES_DIR)
    .filter((entry) => entry.startsWith('feature-'))
    .map((entry) => path.join(PACKAGES_DIR, entry))
    .filter((dir) => fs.statSync(dir).isDirectory());

  const allFeatureDirs = featureDirs;
  const targets = featureDirs.filter((dir) => {
    if (only.length === 0) return true;
    const dirName = path.basename(dir);
    return only.some(
      (name) => dirName === name || dirName === `feature-${name}` || name === `feature-${dirName}`,
    );
  });

  if (targets.length === 0) {
    console.error('No feature packages found to validate.');
    process.exit(1);
  }

  console.log(`Validating ${targets.length} feature package(s)...`);

  for (const dir of targets) {
    validateFeature(dir, allFeatureDirs);
  }

  if (failed) {
    console.error('\n  Feature validation FAILED');
    process.exit(1);
  }

  console.log('\n  All feature packages valid.');
}

main();
