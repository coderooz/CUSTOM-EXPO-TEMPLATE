import { execSync } from 'child_process';
import { join } from 'path';

export function runPostInstall(projectDir: string): void {
  console.log('\n  Installing dependencies...\n');

  execSync('npm install', {
    cwd: projectDir,
    stdio: 'inherit',
  });

  execSync('npx expo install --fix', {
    cwd: projectDir,
    stdio: 'inherit',
  });

  console.log('\n  ✓ Dependencies installed\n');
}

export function printNextSteps(projectDir: string): void {
  const appName = projectDir.split(/[\\/]/).pop();

  console.log('\n  ──────────────────────────────────────');
  console.log('   Coderooz app ready!');
  console.log('  ──────────────────────────────────────\n');
  console.log(`  cd ${appName}`);
  console.log('  npx expo start\n');
  console.log('  Add more features later:');
  console.log('  coderooz add sqlite');
  console.log('  coderooz add camera\n');
}
