"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const hooks_1 = require("../hooks");
const manifest_1 = require("../manifest");
let featuresDir;
let projectDir;
(0, vitest_1.beforeEach)(() => {
    featuresDir = (0, path_1.join)((0, os_1.tmpdir)(), `coderooz-test-features-${Date.now()}`);
    projectDir = (0, path_1.join)((0, os_1.tmpdir)(), `coderooz-test-project-${Date.now()}`);
    (0, fs_1.mkdirSync)(featuresDir, { recursive: true });
    (0, fs_1.mkdirSync)(projectDir, { recursive: true });
    (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'package.json'), JSON.stringify({ name: 'test-app', version: '1.0.0' }));
});
(0, vitest_1.afterEach)(() => {
    (0, fs_1.rmSync)(featuresDir, { recursive: true, force: true });
    (0, fs_1.rmSync)(projectDir, { recursive: true, force: true });
});
function makeFeature(dirName, manifest, templateFiles) {
    const featureDir = (0, path_1.join)(featuresDir, dirName);
    (0, fs_1.mkdirSync)(featureDir, { recursive: true });
    (0, fs_1.writeFileSync)((0, path_1.join)(featureDir, 'coderooz.json'), JSON.stringify(manifest));
    const templateDir = (0, path_1.join)(featureDir, 'template');
    for (const [relPath, content] of Object.entries(templateFiles)) {
        const filePath = (0, path_1.join)(templateDir, relPath);
        (0, fs_1.mkdirSync)((0, path_1.join)(templateDir, relPath.split(/[\\/]/).slice(0, -1).join('\\')), { recursive: true });
        (0, fs_1.writeFileSync)(filePath, content);
    }
}
(0, vitest_1.describe)('weaveFeature', () => {
    (0, vitest_1.it)('copies template files from a feature-* prefixed directory', () => {
        makeFeature('feature-sqlite', { name: 'sqlite', version: '1.0.0', description: '' }, { 'src/services/db/index.ts': 'export const db = {};\n' });
        const manifest = (0, manifest_1.loadManifest)((0, path_1.join)(featuresDir, 'feature-sqlite'));
        const result = (0, hooks_1.weaveFeature)(manifest, { projectDir, featuresDir });
        (0, vitest_1.expect)(result.filesCopied).toBe(1);
        (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(projectDir, 'src/services/db/index.ts'))).toBe(true);
        (0, vitest_1.expect)((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'src/services/db/index.ts'), 'utf-8')).toBe('export const db = {};\n');
    });
    (0, vitest_1.it)('copies template files from a bare (non-prefixed) directory', () => {
        makeFeature('sqlite', { name: 'sqlite', version: '1.0.0', description: '' }, { 'src/services/db/index.ts': 'export const db = {};\n' });
        const manifest = (0, manifest_1.loadManifest)((0, path_1.join)(featuresDir, 'sqlite'));
        const result = (0, hooks_1.weaveFeature)(manifest, { projectDir, featuresDir });
        (0, vitest_1.expect)(result.filesCopied).toBe(1);
        (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(projectDir, 'src/services/db/index.ts'))).toBe(true);
    });
    (0, vitest_1.it)('copies all nested template files', () => {
        makeFeature('feature-dynamic-pages', { name: 'dynamic-pages', version: '1.0.0', description: '' }, {
            'src/services/page-engine/loader.ts': 'export {};\n',
            'src/services/page-engine/types.ts': 'export {};\n',
            'src/context/PageEngineProvider.tsx': 'export {};\n',
        });
        const manifest = (0, manifest_1.loadManifest)((0, path_1.join)(featuresDir, 'feature-dynamic-pages'));
        const result = (0, hooks_1.weaveFeature)(manifest, { projectDir, featuresDir });
        (0, vitest_1.expect)(result.filesCopied).toBe(3);
        (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(projectDir, 'src/context/PageEngineProvider.tsx'))).toBe(true);
    });
    (0, vitest_1.it)('runs env and app-json hooks', () => {
        (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'app.json'), JSON.stringify({ expo: { plugins: [] } }));
        (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, '.env.example'), '# Existing\n');
        makeFeature('feature-sqlite', {
            name: 'sqlite',
            version: '1.0.0',
            description: '',
            hooks: {
                env: { EXPO_PUBLIC_DB_NAME: 'app.db' },
                'app-json': ['expo-sqlite'],
            },
        }, {});
        const manifest = (0, manifest_1.loadManifest)((0, path_1.join)(featuresDir, 'feature-sqlite'));
        const result = (0, hooks_1.weaveFeature)(manifest, { projectDir, featuresDir });
        (0, vitest_1.expect)(result.hooksExecuted).toContain('env');
        (0, vitest_1.expect)(result.hooksExecuted).toContain('app-json');
        const envContent = (0, fs_1.readFileSync)((0, path_1.join)(projectDir, '.env.example'), 'utf-8');
        (0, vitest_1.expect)(envContent).toContain('EXPO_PUBLIC_DB_NAME=app.db');
        const appJson = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'app.json'), 'utf-8'));
        (0, vitest_1.expect)(appJson.expo.plugins).toContain('expo-sqlite');
    });
});
//# sourceMappingURL=hooks.test.js.map