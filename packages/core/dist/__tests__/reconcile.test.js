"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const reconcile_1 = require("../reconcile");
let root;
let templateDir;
let projectDir;
let pkgDir;
(0, vitest_1.beforeEach)(() => {
    root = (0, path_1.join)((0, os_1.tmpdir)(), `coderooz-reconcile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    templateDir = (0, path_1.join)(root, 'template');
    projectDir = (0, path_1.join)(root, 'project');
    pkgDir = (0, path_1.join)(root, 'pkg');
    (0, fs_1.mkdirSync)(templateDir, { recursive: true });
    (0, fs_1.mkdirSync)(projectDir, { recursive: true });
    (0, fs_1.mkdirSync)(pkgDir, { recursive: true });
});
(0, vitest_1.afterEach)(() => {
    (0, fs_1.rmSync)(root, { recursive: true, force: true });
});
function writeTemplateFiles() {
    (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'App.tsx'), '// App.tsx template');
    (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'app.json'), '{"expo":{"name":"App"}}');
    (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'global.css'), '/* styles */');
    (0, fs_1.mkdirSync)((0, path_1.join)(templateDir, 'src', 'lib'), { recursive: true });
    (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'src', 'lib', 'utils.ts'), '// utils');
    (0, fs_1.mkdirSync)((0, path_1.join)(templateDir, 'src', 'lib', 'nested'), { recursive: true });
    (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'src', 'lib', 'nested', 'deep.ts'), '// deep');
    (0, fs_1.mkdirSync)((0, path_1.join)(templateDir, 'assets'), { recursive: true });
    (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'assets', 'icon.png'), 'fake-png');
}
function writePackageJson() {
    (0, fs_1.writeFileSync)((0, path_1.join)(pkgDir, 'package.json'), JSON.stringify({
        files: ['App.tsx', 'app.json', 'global.css', 'src', 'assets'],
    }));
}
(0, vitest_1.describe)('readTemplateFilesList', () => {
    (0, vitest_1.it)('reads files list from package.json', () => {
        writePackageJson();
        const files = (0, reconcile_1.readTemplateFilesList)((0, path_1.join)(pkgDir, 'package.json'));
        (0, vitest_1.expect)(files).toEqual(['App.tsx', 'app.json', 'global.css', 'src', 'assets']);
    });
    (0, vitest_1.it)('returns empty array when package.json has no files field', () => {
        (0, fs_1.writeFileSync)((0, path_1.join)(pkgDir, 'package.json'), '{"name":"test"}');
        const files = (0, reconcile_1.readTemplateFilesList)((0, path_1.join)(pkgDir, 'package.json'));
        (0, vitest_1.expect)(files).toEqual([]);
    });
});
(0, vitest_1.describe)('reconcileTemplate', () => {
    (0, vitest_1.beforeEach)(() => {
        writeTemplateFiles();
        writePackageJson();
    });
    (0, vitest_1.describe)('add-missing mode', () => {
        (0, vitest_1.it)('adds files that do not exist in project', () => {
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'add-missing',
                templateFiles: ['App.tsx', 'global.css'],
            });
            (0, vitest_1.expect)(result.added).toBe(2);
            (0, vitest_1.expect)(result.unchanged).toBe(0);
            (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(projectDir, 'App.tsx'))).toBe(true);
            (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(projectDir, 'global.css'))).toBe(true);
        });
        (0, vitest_1.it)('skips files that already exist in project', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'App.tsx'), '// user version');
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'add-missing',
                templateFiles: ['App.tsx', 'global.css'],
            });
            (0, vitest_1.expect)(result.added).toBe(1);
            (0, vitest_1.expect)(result.unchanged).toBe(1);
            (0, vitest_1.expect)((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'App.tsx'), 'utf-8')).toBe('// user version');
        });
        (0, vitest_1.it)('copies nested directory structures', () => {
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'add-missing',
                templateFiles: ['src'],
            });
            (0, vitest_1.expect)(result.added).toBe(2);
            (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(projectDir, 'src', 'lib', 'utils.ts'))).toBe(true);
            (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(projectDir, 'src', 'lib', 'nested', 'deep.ts'))).toBe(true);
        });
    });
    (0, vitest_1.describe)('replace mode', () => {
        (0, vitest_1.it)('overwrites existing files', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'App.tsx'), '// user version');
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'replace',
                templateFiles: ['App.tsx'],
            });
            (0, vitest_1.expect)(result.replaced).toBe(1);
            (0, vitest_1.expect)((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'App.tsx'), 'utf-8')).toBe('// App.tsx template');
        });
        (0, vitest_1.it)('adds missing files', () => {
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'replace',
                templateFiles: ['global.css'],
            });
            (0, vitest_1.expect)(result.added).toBe(1);
        });
    });
    (0, vitest_1.describe)('update mode', () => {
        (0, vitest_1.it)('merges JSON config files', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'app.json'), '{"expo":{"name":"MyApp","version":"1.0.0"}}');
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'update',
                templateFiles: ['app.json'],
            });
            (0, vitest_1.expect)(result.merged).toBe(1);
            const merged = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'app.json'), 'utf-8'));
            (0, vitest_1.expect)(merged.expo.name).toBe('MyApp');
            (0, vitest_1.expect)(merged.expo.version).toBe('1.0.0');
        });
        (0, vitest_1.it)('preserves package.json identity and merges dependencies additively', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'package.json'), JSON.stringify({
                name: 'my-app',
                version: '1.0.0',
                private: true,
                scripts: { start: 'expo start' },
                workspaces: [],
                dependencies: { expo: '~54.0.36', 'expo-image-picker': '~16.1.0' },
                devDependencies: { typescript: '~5.9.2' },
            }));
            (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'package.json'), JSON.stringify({
                name: 'expo-template-coderooz',
                version: '1.0.4',
                scripts: { start: 'expo start', 'test:mono': 'npm test' },
                workspaces: ['packages/*'],
                dependencies: { expo: '~54.0.40', 'expo-sqlite': '~16.0.10' },
                devDependencies: { typescript: '~5.9.2', vitest: '^4.0.0' },
            }));
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'update',
                templateFiles: ['package.json'],
            });
            (0, vitest_1.expect)(result.merged).toBe(1);
            const merged = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'package.json'), 'utf-8'));
            (0, vitest_1.expect)(merged.name).toBe('my-app');
            (0, vitest_1.expect)(merged.version).toBe('1.0.0');
            (0, vitest_1.expect)(merged.private).toBe(true);
            (0, vitest_1.expect)(merged.scripts).toEqual({ start: 'expo start' });
            (0, vitest_1.expect)(merged.workspaces).toEqual([]);
            (0, vitest_1.expect)(merged.dependencies.expo).toBe('~54.0.36');
            (0, vitest_1.expect)(merged.dependencies['expo-image-picker']).toBe('~16.1.0');
            (0, vitest_1.expect)(merged.dependencies['expo-sqlite']).toBe('~16.0.10');
            (0, vitest_1.expect)(merged.devDependencies.typescript).toBe('~5.9.2');
            (0, vitest_1.expect)(merged.devDependencies.vitest).toBe('^4.0.0');
        });
        (0, vitest_1.it)('preserves app identity and unions plugins', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'app.json'), JSON.stringify({
                expo: {
                    name: 'MyApp',
                    version: '1.0.0',
                    slug: 'my-app',
                    plugins: ['expo-router', 'expo-image-picker'],
                },
            }));
            (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'app.json'), JSON.stringify({
                expo: {
                    name: 'App',
                    version: '1.0.4',
                    slug: 'custom-expo-coderooz',
                    plugins: ['expo-sqlite', 'expo-image-picker'],
                },
            }));
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'update',
                templateFiles: ['app.json'],
            });
            (0, vitest_1.expect)(result.merged).toBe(1);
            const merged = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'app.json'), 'utf-8'));
            (0, vitest_1.expect)(merged.expo.name).toBe('MyApp');
            (0, vitest_1.expect)(merged.expo.version).toBe('1.0.0');
            (0, vitest_1.expect)(merged.expo.slug).toBe('my-app');
            (0, vitest_1.expect)(merged.expo.plugins).toEqual(['expo-router', 'expo-image-picker', 'expo-sqlite']);
        });
        (0, vitest_1.it)('unions tsconfig include/exclude arrays', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'tsconfig.json'), JSON.stringify({
                compilerOptions: { strict: true, paths: { '@/*': ['./src/*'] } },
                include: ['src', 'App.tsx'],
            }));
            (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'tsconfig.json'), JSON.stringify({
                compilerOptions: { strict: true, jsx: 'react-jsx' },
                include: ['App.tsx', 'index.ts'],
            }));
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'update',
                templateFiles: ['tsconfig.json'],
            });
            (0, vitest_1.expect)(result.merged).toBe(1);
            const merged = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'tsconfig.json'), 'utf-8'));
            (0, vitest_1.expect)(merged.compilerOptions.strict).toBe(true);
            (0, vitest_1.expect)(merged.compilerOptions.jsx).toBe('react-jsx');
            (0, vitest_1.expect)(merged.compilerOptions.paths).toEqual({ '@/*': ['./src/*'] });
            (0, vitest_1.expect)(merged.include).toEqual(['src', 'App.tsx', 'index.ts']);
        });
        (0, vitest_1.it)('merges dependencies within JSON configs', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'package.json'), JSON.stringify({
                name: 'my-app',
                dependencies: { 'expo': '~50.0.0', 'react': '18.2.0' },
            }));
            (0, fs_1.writeFileSync)((0, path_1.join)(templateDir, 'package.json'), JSON.stringify({
                dependencies: { 'expo': '~50.0.0', 'expo-sqlite': '~14.0.0' },
            }));
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'update',
                templateFiles: ['package.json'],
            });
            (0, vitest_1.expect)(result.merged).toBe(1);
            const merged = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'package.json'), 'utf-8'));
            (0, vitest_1.expect)(merged.dependencies.expo).toBe('~50.0.0');
            (0, vitest_1.expect)(merged.dependencies['expo-sqlite']).toBe('~14.0.0');
            (0, vitest_1.expect)(merged.dependencies.react).toBe('18.2.0');
        });
        (0, vitest_1.it)('replaces non-JSON files that exist', () => {
            (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'global.css'), '/* old styles */');
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'update',
                templateFiles: ['global.css'],
            });
            (0, vitest_1.expect)(result.replaced).toBe(1);
            (0, vitest_1.expect)((0, fs_1.readFileSync)((0, path_1.join)(projectDir, 'global.css'), 'utf-8')).toBe('/* styles */');
        });
        (0, vitest_1.it)('adds missing files', () => {
            const result = (0, reconcile_1.reconcileTemplate)({
                templateDir,
                projectDir,
                mode: 'update',
                templateFiles: ['App.tsx'],
            });
            (0, vitest_1.expect)(result.added).toBe(1);
        });
    });
    (0, vitest_1.it)('respects skip paths', () => {
        const result = (0, reconcile_1.reconcileTemplate)({
            templateDir,
            projectDir,
            mode: 'replace',
            templateFiles: ['App.tsx', 'assets'],
            skipPaths: ['assets'],
        });
        (0, vitest_1.expect)(result.skipped).toBe(1);
        (0, vitest_1.expect)(result.added).toBe(1);
    });
    (0, vitest_1.it)('continues on per-file failure and reports failed count', () => {
        const result = (0, reconcile_1.reconcileTemplate)({
            templateDir,
            projectDir,
            mode: 'replace',
            templateFiles: ['App.tsx', 'global.css'],
        });
        (0, vitest_1.expect)(result.added).toBe(2);
        (0, vitest_1.expect)(result.failed).toBe(0);
    });
    (0, vitest_1.it)('handles missing template files gracefully', () => {
        const result = (0, reconcile_1.reconcileTemplate)({
            templateDir,
            projectDir,
            mode: 'add-missing',
            templateFiles: ['nonexistent.tsx'],
        });
        (0, vitest_1.expect)(result.added).toBe(0);
        (0, vitest_1.expect)(result.failed).toBe(0);
    });
    (0, vitest_1.it)('handles empty template file list', () => {
        const result = (0, reconcile_1.reconcileTemplate)({
            templateDir,
            projectDir,
            mode: 'add-missing',
            templateFiles: [],
        });
        (0, vitest_1.expect)(result.added).toBe(0);
        (0, vitest_1.expect)(result.unchanged).toBe(0);
        (0, vitest_1.expect)(result.actions).toEqual([]);
    });
    (0, vitest_1.it)('detects prototype pollution in JSON configs', () => {
        (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, 'app.json'), '{"__proto__": {"polluted": true}}');
        const result = (0, reconcile_1.reconcileTemplate)({
            templateDir,
            projectDir,
            mode: 'update',
            templateFiles: ['app.json'],
        });
        (0, vitest_1.expect)(result.replaced).toBe(1);
    });
});
//# sourceMappingURL=reconcile.test.js.map