"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateManifest = validateManifest;
exports.loadManifest = loadManifest;
exports.checkConflicts = checkConflicts;
const zod_1 = require("zod");
const fs_1 = require("fs");
const path_1 = require("path");
const ProviderHookSchema = zod_1.z.object({
    import: zod_1.z.string(),
    path: zod_1.z.string(),
    props: zod_1.z.record(zod_1.z.string()).optional(),
});
const NavigationScreenSchema = zod_1.z.object({
    name: zod_1.z.string(),
    path: zod_1.z.string(),
    icon: zod_1.z.string().optional(),
    options: zod_1.z.record(zod_1.z.unknown()).optional(),
});
const NavigationHookSchema = zod_1.z.object({
    type: zod_1.z.enum(['add-screens', 'create-group']),
    group: zod_1.z.string(),
    screens: zod_1.z.array(NavigationScreenSchema),
});
const ServiceHookSchema = zod_1.z.object({
    import: zod_1.z.string(),
    path: zod_1.z.string(),
    initCall: zod_1.z.string().optional(),
});
const ConfigMergeSchema = zod_1.z.object({
    file: zod_1.z.string(),
    path: zod_1.z.string(),
    value: zod_1.z.unknown(),
    type: zod_1.z.enum(['merge', 'set', 'plugin']),
});
const AssetCopySchema = zod_1.z.object({
    source: zod_1.z.string(),
    target: zod_1.z.string(),
});
const PostInstallHookSchema = zod_1.z.object({
    command: zod_1.z.string(),
    cwd: zod_1.z.string().optional(),
});
const FeatureHooksSchema = zod_1.z.object({
    providers: zod_1.z.array(ProviderHookSchema).optional(),
    navigation: zod_1.z.array(NavigationHookSchema).optional(),
    services: zod_1.z.array(ServiceHookSchema).optional(),
    env: zod_1.z.record(zod_1.z.string()).optional(),
    config: zod_1.z.array(ConfigMergeSchema).optional(),
    assets: zod_1.z.array(AssetCopySchema).optional(),
    'app-json': zod_1.z.array(zod_1.z.string()).optional(),
    'post-install': zod_1.z.array(PostInstallHookSchema).optional(),
});
const FeatureManifestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    version: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    hooks: FeatureHooksSchema.optional(),
    dependencies: zod_1.z.record(zod_1.z.string()).optional(),
    devDependencies: zod_1.z.record(zod_1.z.string()).optional(),
    peerDependencies: zod_1.z.record(zod_1.z.string()).optional(),
    conflicts: zod_1.z.array(zod_1.z.string()).optional(),
    requires: zod_1.z.array(zod_1.z.string()).optional(),
    provides: zod_1.z.array(zod_1.z.string()).optional(),
});
function validateManifest(data) {
    return FeatureManifestSchema.parse(data);
}
function loadManifest(packagePath) {
    const manifestPath = (0, path_1.join)(packagePath, 'coderooz.json');
    if (!(0, fs_1.existsSync)(manifestPath)) {
        throw new Error(`No coderooz.json found in ${packagePath}`);
    }
    const raw = JSON.parse((0, fs_1.readFileSync)(manifestPath, 'utf-8'));
    return validateManifest(raw);
}
function checkConflicts(selected, allManifests) {
    for (const name of selected) {
        const manifest = allManifests.get(name);
        if (!manifest?.conflicts)
            continue;
        for (const conflict of manifest.conflicts) {
            if (selected.includes(conflict)) {
                return `${name} conflicts with ${conflict}`;
            }
        }
    }
    return null;
}
//# sourceMappingURL=manifest.js.map