"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = listCommand;
const create_app_1 = require("@coderooz/create-app");
const core_1 = require("@coderooz/core");
const path_1 = require("path");
async function listCommand() {
    const featuresDir = (0, create_app_1.resolveFeaturesDir)();
    const features = (0, create_app_1.listAvailableFeatures)(featuresDir);
    console.log('\n  Available features:\n');
    if (features.length === 0) {
        console.log('    (no feature packages found)\n');
        return;
    }
    for (const feature of features) {
        try {
            const manifest = (0, core_1.loadManifest)((0, path_1.join)(featuresDir, feature));
            const name = feature.replace(/^feature-/, '');
            console.log(`  ${name}`);
            if (manifest.description)
                console.log(`    ${manifest.description}`);
            const details = [];
            if (manifest.provides?.length)
                details.push(`provides: ${manifest.provides.join(', ')}`);
            if (manifest.requires?.length)
                details.push(`requires: ${manifest.requires.join(', ')}`);
            if (details.length)
                console.log(`    ${details.join('  |  ')}`);
            console.log();
        }
        catch {
            console.log(`  ${feature}\n`);
        }
    }
    console.log('  Usage: coderooz create my-app --with sqlite,camera');
    console.log('         coderooz add notifs\n');
}
//# sourceMappingURL=list.js.map