"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installFeatureDependencies = installFeatureDependencies;
const fs_1 = require("fs");
const path_1 = require("path");
const merge_1 = require("./merge");
function installFeatureDependencies(projectDir, packages, devPackages) {
    const pkgPath = (0, path_1.join)(projectDir, 'package.json');
    const pkg = JSON.parse((0, fs_1.readFileSync)(pkgPath, 'utf-8'));
    const currentDeps = pkg.dependencies ?? {};
    const currentDevDeps = pkg.devDependencies ?? {};
    const mergedDeps = (0, merge_1.mergeDependencies)(currentDeps, packages);
    const mergedDevDeps = (0, merge_1.mergeDependencies)(currentDevDeps, devPackages);
    const depsAdded = Object.keys(packages).length;
    const devDepsAdded = Object.keys(devPackages).length;
    pkg.dependencies = mergedDeps;
    pkg.devDependencies = mergedDevDeps;
    (0, fs_1.writeFileSync)(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    return { depsAdded, devDepsAdded };
}
//# sourceMappingURL=deps.js.map