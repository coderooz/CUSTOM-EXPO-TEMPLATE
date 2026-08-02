"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = createCommand;
const create_app_1 = require("@coderooz/create-app");
const APP_NAME_REGEX = /^[a-z0-9][a-z0-9._-]*$/i;
function validateAppName(appName) {
    if (!appName || !appName.trim()) {
        throw new Error('App name is required. Example: coderooz create my-app');
    }
    if (appName.length > 214) {
        throw new Error(`App name "${appName}" is too long (max 214 characters).`);
    }
    if (!APP_NAME_REGEX.test(appName)) {
        throw new Error(`App name "${appName}" is invalid. Use only letters, numbers, dots, underscores, and hyphens.`);
    }
    return appName.trim();
}
async function createCommand(options) {
    const appName = validateAppName(options.appName);
    const { template } = options;
    const features = options.with
        ? options.with.split(',').map((f) => f.trim()).filter(Boolean)
        : [];
    if (features.length > 0) {
        const featuresDir = (0, create_app_1.resolveFeaturesDir)();
        const available = (0, create_app_1.listAvailableFeatures)(featuresDir);
        const missing = features.filter((f) => {
            const prefixed = `feature-${f}`;
            return !available.includes(f) && !available.includes(prefixed);
        });
        if (missing.length > 0) {
            throw new Error(`Unknown feature(s): ${missing.join(', ')}\n` +
                `  Available: ${available.map((f) => f.replace(/^feature-/, '')).join(', ')}`);
        }
    }
    const projectDir = (0, create_app_1.scaffoldBase)({
        appName,
        template,
    });
    if (features.length > 0) {
        const featuresDir = (0, create_app_1.resolveFeaturesDir)();
        console.log(`\n  Applying features: ${features.join(', ')}\n`);
        (0, create_app_1.weaveFeatures)({
            projectDir,
            features,
            featuresDir,
        });
    }
    (0, create_app_1.runPostInstall)(projectDir);
    (0, create_app_1.printNextSteps)(projectDir);
}
//# sourceMappingURL=create.js.map