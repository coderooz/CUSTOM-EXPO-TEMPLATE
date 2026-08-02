"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaveFeatures = weaveFeatures;
exports.listAvailableFeatures = listAvailableFeatures;
const core_1 = require("@coderooz/core");
const path_1 = require("path");
const fs_1 = require("fs");
function weaveFeatures(options) {
    const { projectDir, features, featuresDir } = options;
    if (!(0, fs_1.existsSync)(featuresDir)) {
        throw new Error(`Features directory not found: ${featuresDir}`);
    }
    const allPackages = (0, fs_1.readdirSync)(featuresDir).filter((entry) => {
        const entryPath = (0, path_1.join)(featuresDir, entry);
        return (0, fs_1.statSync)(entryPath).isDirectory() && (0, fs_1.existsSync)((0, path_1.join)(entryPath, 'coderooz.json'));
    });
    function resolveFeature(name) {
        const exact = (0, path_1.join)(featuresDir, name);
        if ((0, fs_1.existsSync)(exact) && (0, fs_1.statSync)(exact).isDirectory())
            return name;
        const prefixed = `feature-${name}`;
        if (allPackages.includes(prefixed))
            return prefixed;
        const match = allPackages.find((p) => p.includes(name));
        if (match)
            return match;
        throw new Error(`Feature "${name}" not found in ${featuresDir}`);
    }
    const manifests = new Map();
    const resolvedNames = [];
    for (const featureName of features) {
        const resolved = resolveFeature(featureName);
        const featurePath = (0, path_1.join)(featuresDir, resolved);
        const manifest = (0, core_1.loadManifest)(featurePath);
        manifests.set(resolved, manifest);
        resolvedNames.push(resolved);
    }
    const expanded = expandRequires(resolvedNames, manifests, allPackages, featuresDir);
    const conflictError = (0, core_1.checkConflicts)(expanded, manifests);
    if (conflictError) {
        throw new Error(`Feature conflict: ${conflictError}`);
    }
    const context = { projectDir, featuresDir };
    for (const resolved of expanded) {
        const manifest = manifests.get(resolved);
        const result = (0, core_1.weaveFeature)(manifest, context);
        console.log(`\n  ✓ ${result.feature}: ${result.filesCopied} files copied, ${result.depsAdded} deps added`);
        if (result.hooksExecuted.length > 0) {
            console.log(`    hooks: ${result.hooksExecuted.join(', ')}`);
        }
    }
}
function expandRequires(selected, manifests, allPackages, featuresDir) {
    const ordered = [];
    const seen = new Set();
    const visiting = new Set();
    function loadIfMissing(pkg) {
        if (manifests.has(pkg))
            return manifests.get(pkg);
        const manifest = (0, core_1.loadManifest)((0, path_1.join)(featuresDir, pkg));
        manifests.set(pkg, manifest);
        return manifest;
    }
    function resolveByName(name) {
        if (allPackages.includes(name))
            return name;
        if (allPackages.includes(`feature-${name}`))
            return `feature-${name}`;
        for (const pkg of allPackages) {
            const manifest = manifests.get(pkg);
            if (manifest?.name === name)
                return pkg;
        }
        return null;
    }
    function visit(pkg) {
        if (seen.has(pkg))
            return;
        if (visiting.has(pkg)) {
            throw new Error(`Circular feature dependency detected at "${pkg}"`);
        }
        visiting.add(pkg);
        const manifest = loadIfMissing(pkg);
        for (const requirement of manifest.requires ?? []) {
            const resolved = resolveByName(requirement);
            if (!resolved) {
                throw new Error(`Feature "${pkg}" requires "${requirement}" but no matching feature package was found`);
            }
            visit(resolved);
        }
        visiting.delete(pkg);
        seen.add(pkg);
        ordered.push(pkg);
    }
    for (const pkg of selected)
        visit(pkg);
    return ordered;
}
function listAvailableFeatures(featuresDir) {
    if (!(0, fs_1.existsSync)(featuresDir))
        return [];
    return (0, fs_1.readdirSync)(featuresDir).filter((entry) => {
        const entryPath = (0, path_1.join)(featuresDir, entry);
        return (0, fs_1.statSync)(entryPath).isDirectory() && (0, fs_1.existsSync)((0, path_1.join)(entryPath, 'coderooz.json'));
    });
}
//# sourceMappingURL=weave.js.map