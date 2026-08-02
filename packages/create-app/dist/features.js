"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFeaturesDir = resolveFeaturesDir;
const fs_1 = require("fs");
const path_1 = require("path");
function resolveFeaturesDir() {
    const bundledDir = (0, path_1.join)(__dirname, '..', 'public', 'features');
    if ((0, fs_1.existsSync)(bundledDir))
        return bundledDir;
    const devDir = resolveMonorepoFeaturesDir();
    if (devDir)
        return devDir;
    throw new Error('Could not locate feature packages. ' +
        'Ensure @coderooz/create-app is properly installed.');
}
function resolveMonorepoFeaturesDir() {
    let current = (0, path_1.resolve)((0, path_1.join)(__dirname, '..', '..', '..', '..'));
    for (let i = 0; i < 10; i++) {
        const packagesDir = (0, path_1.join)(current, 'packages');
        if ((0, fs_1.existsSync)(packagesDir)) {
            const entries = (0, fs_1.readdirSync)(packagesDir);
            if (entries.some(e => e.startsWith('feature-'))) {
                return packagesDir;
            }
        }
        const parent = (0, path_1.resolve)((0, path_1.join)(current, '..'));
        if (parent === current)
            return null;
        current = parent;
    }
    return null;
}
//# sourceMappingURL=features.js.map