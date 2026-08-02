"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTemplateDir = resolveTemplateDir;
const fs_1 = require("fs");
const path_1 = require("path");
const MONOREPO_PKG_NAME = 'expo-template-coderooz';
function findPackageRootByWalking(startDir) {
    let current = (0, path_1.resolve)(startDir);
    for (let i = 0; i < 20; i++) {
        const pkgPath = (0, path_1.join)(current, 'package.json');
        if ((0, fs_1.existsSync)(pkgPath)) {
            try {
                const pkg = JSON.parse((0, fs_1.readFileSync)(pkgPath, 'utf-8'));
                if (pkg.name === MONOREPO_PKG_NAME)
                    return current;
            }
            catch {
            }
        }
        const parent = (0, path_1.dirname)(current);
        if (parent === current)
            return null;
        current = parent;
    }
    return null;
}
function findPackageRootViaRequire() {
    try {
        const { createRequire } = require('module');
        const localRequire = createRequire(__filename);
        const pkgPath = localRequire.resolve(`${MONOREPO_PKG_NAME}/package.json`);
        return (0, path_1.dirname)(pkgPath);
    }
    catch {
        return null;
    }
}
function resolveTemplateDir(override) {
    if (override) {
        if (!(0, fs_1.existsSync)(override)) {
            throw new Error(`Template directory not found: ${override}`);
        }
        return override;
    }
    const bundledDir = (0, path_1.join)(__dirname, '..', 'public', 'template');
    if ((0, fs_1.existsSync)(bundledDir))
        return bundledDir;
    const viaRequire = findPackageRootViaRequire();
    if (viaRequire)
        return viaRequire;
    const viaWalk = findPackageRootByWalking(__dirname);
    if (viaWalk)
        return viaWalk;
    throw new Error(`Could not locate ${MONOREPO_PKG_NAME} template. ` +
        'Ensure @coderooz/create-app has expo-template-coderooz installed, ' +
        'or provide an explicit templateDir option.');
}
//# sourceMappingURL=templateResolver.js.map