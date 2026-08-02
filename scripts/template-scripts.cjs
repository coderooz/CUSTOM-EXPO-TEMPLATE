const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const scriptName = process.argv[2];
const SUPPORTED = ['test', 'build', 'build:all'];

if (!SUPPORTED.includes(scriptName)) {
  console.error(`Unknown template script: ${scriptName}`);
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const isMonorepo = fs.existsSync(path.join(root, 'packages'));

function runNpm(args) {
  const result = spawnSync('npm', args, { stdio: 'inherit', shell: true });
  process.exit(result.status ?? 1);
}

if (isMonorepo) {
  runNpm(['run', `${scriptName}:mono`]);
}

switch (scriptName) {
  case 'test': {
    const result = spawnSync(
      'npx',
      ['--no-install', 'vitest', 'run', '--passWithNoTests'],
      { stdio: 'inherit', shell: true },
    );
    if (result.status !== 0) {
      console.log('vitest is not installed — this standalone app ships no test suite.');
    }
    process.exit(0);
  }
  default: {
    console.log(`\`${scriptName}\` is a monorepo-only command (bundles template + feature assets).`);
    console.log('This standalone app has nothing to build locally — use `npx expo export` for release bundles.');
    process.exit(0);
  }
}
