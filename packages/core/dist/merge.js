"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = deepMerge;
exports.applyConfigUpdates = applyConfigUpdates;
exports.mergeDependencies = mergeDependencies;
const fs_1 = require("fs");
const PROTO_POISON_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
function isSafeKey(key) {
    return !PROTO_POISON_KEYS.has(key);
}
function deepMerge(target, source, arrayStrategy = 'replace', visited) {
    if (visited) {
        if (typeof source === 'object' && source !== null && visited.has(source)) {
            return target;
        }
    }
    if (source === null || source === undefined)
        return target;
    if (target === null || target === undefined)
        return source;
    const seen = visited ?? new WeakSet();
    if (typeof source === 'object' && source !== null)
        seen.add(source);
    if (typeof target === 'object' && target !== null)
        seen.add(target);
    if (Array.isArray(target) && Array.isArray(source)) {
        if (arrayStrategy === 'replace')
            return [...source];
        if (arrayStrategy === 'concat')
            return [...target, ...source];
        const merged = [...target];
        for (const item of source) {
            const exists = merged.some((t) => typeof t === 'object' && t !== null
                ? JSON.stringify(t, safeReplacer) === JSON.stringify(item, safeReplacer)
                : t === item);
            if (!exists)
                merged.push(item);
        }
        return merged;
    }
    if (typeof target === 'object' && typeof source === 'object' && !Array.isArray(target) && !Array.isArray(source)) {
        const result = {};
        for (const key of Object.keys(target)) {
            if (isSafeKey(key)) {
                result[key] = target[key];
            }
        }
        for (const key of Object.keys(source)) {
            if (isSafeKey(key)) {
                result[key] = deepMerge(target[key], source[key], arrayStrategy, seen);
            }
        }
        return result;
    }
    return source;
}
function safeReplacer(_key, value) {
    if (typeof value === 'object' && value !== null) {
        if (PROTO_POISON_KEYS.has(_key))
            return undefined;
    }
    if (_key === '__proto__' || _key === 'prototype' || _key === 'constructor') {
        return undefined;
    }
    return value;
}
function setNested(obj, path, value, arrayStrategy = 'replace') {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!isSafeKey(keys[i]))
            return;
        if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    const lastKey = keys[keys.length - 1];
    if (isSafeKey(lastKey)) {
        if (arrayStrategy !== 'replace' && Array.isArray(current[lastKey]) && Array.isArray(value)) {
            current[lastKey] = deepMerge(current[lastKey], value, arrayStrategy);
        }
        else {
            current[lastKey] = value;
        }
    }
}
function applyConfigUpdates(projectDir, updates, arrayStrategy = 'replace') {
    for (const update of updates) {
        const filePath = `${projectDir}/${update.file}`;
        if (!(0, fs_1.existsSync)(filePath)) {
            console.warn(`Config file not found: ${filePath}`);
            continue;
        }
        const content = (0, fs_1.readFileSync)(filePath, 'utf-8');
        const config = JSON.parse(content);
        if (hasUnsafeKey(config)) {
            console.warn(`Unsafe keys detected in config, skipping: ${filePath}`);
            continue;
        }
        switch (update.type) {
            case 'merge': {
                const existing = getNested(config, update.path);
                setNested(config, update.path, deepMerge(existing, update.value, arrayStrategy), arrayStrategy);
                break;
            }
            case 'set':
                setNested(config, update.path, update.value);
                break;
            case 'plugin': {
                const plugins = config.expo?.plugins ?? [];
                if (typeof update.value === 'string' && !plugins.includes(update.value)) {
                    plugins.push(update.value);
                }
                if (!config.expo)
                    config.expo = {};
                config.expo.plugins = plugins;
                break;
            }
        }
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(config, null, 2) + '\n');
    }
}
function getNested(obj, path) {
    return path.split('.').reduce((acc, key) => {
        if (acc && typeof acc === 'object') {
            return acc[key];
        }
        return undefined;
    }, obj);
}
function mergeDependencies(existing, incoming) {
    const merged = { ...existing };
    for (const [dep, version] of Object.entries(incoming)) {
        if (merged[dep] && merged[dep] !== version) {
            console.warn(`Version conflict for ${dep}: existing ${merged[dep]}, requested ${version}. Keeping existing.`);
        }
        else {
            merged[dep] = version;
        }
    }
    return merged;
}
function hasUnsafeKey(obj) {
    for (const key of Object.keys(obj)) {
        if (!isSafeKey(key))
            return true;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            return hasUnsafeKey(obj[key]);
        }
    }
    return false;
}
//# sourceMappingURL=merge.js.map