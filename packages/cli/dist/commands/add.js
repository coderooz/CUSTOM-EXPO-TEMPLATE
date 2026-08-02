"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = addCommand;
const create_app_1 = require("@coderooz/create-app");
async function addCommand(options) {
    const projectDir = options.projectDir ?? process.cwd();
    const featuresDir = (0, create_app_1.resolveFeaturesDir)();
    const features = options.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);
    if (features.length === 0) {
        throw new Error('No features specified. Example: coderooz add sqlite,camera');
    }
    const available = (0, create_app_1.listAvailableFeatures)(featuresDir);
    const missing = features.filter((f) => {
        const prefixed = `feature-${f}`;
        return !available.includes(f) && !available.includes(prefixed);
    });
    if (missing.length > 0) {
        throw new Error(`Unknown feature(s): ${missing.join(', ')}\n` +
            `  Available: ${available.map((f) => f.replace(/^feature-/, '')).join(', ')}`);
    }
    console.log(`\n  Adding features: ${features.join(', ')}\n`);
    (0, create_app_1.weaveFeatures)({
        projectDir,
        features,
        featuresDir,
    });
    console.log(`\n  Run 'npm install' in ${projectDir} to complete.\n`);
}
//# sourceMappingURL=add.js.map