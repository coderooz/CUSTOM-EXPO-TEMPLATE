"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPostInstall = runPostInstall;
exports.printNextSteps = printNextSteps;
const child_process_1 = require("child_process");
function runPostInstall(projectDir) {
    console.log('\n  Installing dependencies...\n');
    (0, child_process_1.execSync)('npm install', {
        cwd: projectDir,
        stdio: 'inherit',
    });
    (0, child_process_1.execSync)('npx expo install --fix', {
        cwd: projectDir,
        stdio: 'inherit',
    });
    console.log('\n  ✓ Dependencies installed\n');
}
function printNextSteps(projectDir) {
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
//# sourceMappingURL=install.js.map