"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_MODES = void 0;
exports.readTemplateFilesList = readTemplateFilesList;
exports.reconcileTemplate = reconcileTemplate;
const fs_1 = require("fs");
const path_1 = require("path");
const merge_1 = require("./merge");
exports.VALID_MODES = ['add-missing', 'replace', 'update'];
const MERGEABLE_CONFIGS = new Set(['package.json', 'app.json', 'tsconfig.json']);
const SAFE_OBJECT_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
function hasUnsafeKey(obj) {
    for (const key of Object.keys(obj)) {
        if (SAFE_OBJECT_KEYS.has(key))
            return true;
    }
    return false;
}
function readJsonSafe(path) {
    try {
        const raw = (0, fs_1.readFileSync)(path, 'utf-8');
        const parsed = JSON.parse(raw);
        if (hasUnsafeKey(parsed))
            return null;
        return parsed;
    }
    catch {
        return null;
    }
}
function shouldSkip(file, skipPaths) {
    return skipPaths.some((p) => file === p || file.startsWith(p + '/') || file.startsWith(p + '\\'));
}
function readTemplateFilesList(packageJsonPath) {
    const pkg = readJsonSafe(packageJsonPath);
    if (!pkg || !Array.isArray(pkg.files))
        return [];
    return pkg.files;
}
const APP_JSON_IDENTITY_KEYS = new Set(['name', 'version', 'slug', 'owner']);
function toRecord(value) {
    return value && typeof value === 'object' && !Array.isArray(value)
        ? value
        : {};
}
function mergeConfigUpdates(target, source, file) {
    switch (file) {
        case 'package.json': {
            const result = { ...target };
            result.dependencies = (0, merge_1.mergeDependencies)(toRecord(target.dependencies), toRecord(source.dependencies));
            result.devDependencies = (0, merge_1.mergeDependencies)(toRecord(target.devDependencies), toRecord(source.devDependencies));
            return result;
        }
        case 'app.json': {
            const targetExpo = toRecord(target.expo);
            const sourceExpo = toRecord(source.expo);
            const expo = (0, merge_1.deepMerge)(targetExpo, sourceExpo);
            for (const key of APP_JSON_IDENTITY_KEYS) {
                if (key in targetExpo)
                    expo[key] = targetExpo[key];
            }
            if (Array.isArray(sourceExpo.plugins)) {
                const basePlugins = Array.isArray(targetExpo.plugins) ? targetExpo.plugins : [];
                expo.plugins = (0, merge_1.deepMerge)(basePlugins, sourceExpo.plugins, 'unique');
            }
            return { ...target, expo };
        }
        case 'tsconfig.json':
            return (0, merge_1.deepMerge)(target, source, 'unique');
        default:
            return (0, merge_1.deepMerge)(target, source);
    }
}
function reconcileTemplate(options) {
    const { templateDir, projectDir, mode, templateFiles, skipPaths = [] } = options;
    const actions = [];
    const counts = { added: 0, replaced: 0, merged: 0, skipped: 0, unchanged: 0, failed: 0 };
    if (options.backupDir && mode === 'replace') {
        console.warn(`  Warning: replace mode is destructive. No backup is created automatically.`);
    }
    function processFile(templatePath, relativePath) {
        try {
            if (shouldSkip(relativePath, skipPaths)) {
                counts.skipped++;
                actions.push({ file: relativePath, action: 'skipped' });
                return;
            }
            const targetPath = (0, path_1.join)(projectDir, relativePath);
            const existed = (0, fs_1.existsSync)(targetPath);
            if (mode === 'add-missing' && existed) {
                counts.unchanged++;
                actions.push({ file: relativePath, action: 'unchanged' });
                return;
            }
            if (mode === 'update' && existed && MERGEABLE_CONFIGS.has(relativePath)) {
                const templateContent = readJsonSafe(templatePath);
                const targetContent = readJsonSafe(targetPath);
                if (templateContent && targetContent) {
                    const merged = mergeConfigUpdates(targetContent, templateContent, relativePath);
                    (0, fs_1.mkdirSync)((0, path_1.dirname)(targetPath), { recursive: true });
                    (0, fs_1.writeFileSync)(targetPath, JSON.stringify(merged, null, 2) + '\n');
                    counts.merged++;
                    actions.push({ file: relativePath, action: 'merged' });
                    return;
                }
            }
            (0, fs_1.mkdirSync)((0, path_1.dirname)(targetPath), { recursive: true });
            (0, fs_1.copyFileSync)(templatePath, targetPath);
            if (existed) {
                counts.replaced++;
                actions.push({ file: relativePath, action: 'replaced' });
            }
            else {
                counts.added++;
                actions.push({ file: relativePath, action: 'added' });
            }
        }
        catch (err) {
            counts.failed++;
            actions.push({ file: relativePath, action: 'failed', error: err.message });
        }
    }
    for (const file of templateFiles) {
        const templatePath = (0, path_1.join)(templateDir, file);
        if (!(0, fs_1.existsSync)(templatePath))
            continue;
        const stat = (0, fs_1.statSync)(templatePath);
        if (stat.isDirectory()) {
            const entries = (0, fs_1.readdirSync)(templatePath, { recursive: true });
            for (const entry of entries) {
                const fullEntryPath = (0, path_1.join)(templatePath, entry);
                if ((0, fs_1.statSync)(fullEntryPath).isFile()) {
                    const relativeEntry = (0, path_1.join)(file, entry);
                    processFile(fullEntryPath, relativeEntry);
                }
            }
        }
        else if (stat.isFile()) {
            processFile(templatePath, file);
        }
    }
    return { actions, ...counts };
}
//# sourceMappingURL=reconcile.js.map