"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBase = scaffoldBase;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
function scaffoldBase(options) {
    const targetDir = options.directory ?? process.cwd();
    const appDir = (0, path_1.join)(targetDir, options.appName);
    if ((0, fs_1.existsSync)(appDir) && (0, fs_1.readdirSync)(appDir).length > 0) {
        throw new Error(`Directory ${appDir} already exists and is not empty.`);
    }
    const template = options.template ?? 'expo-template-coderooz';
    console.log(`\n  Scaffolding ${options.appName} from ${template}...\n`);
    (0, child_process_1.execSync)(`npx create-expo-app "${options.appName}" --template "${template}"`, {
        cwd: targetDir,
        stdio: 'inherit',
    });
    console.log(`\n  Base template scaffolded at ${appDir}\n`);
    return appDir;
}
//# sourceMappingURL=scaffold.js.map