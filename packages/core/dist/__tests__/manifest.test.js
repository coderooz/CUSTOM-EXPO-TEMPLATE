"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const manifest_1 = require("../manifest");
(0, vitest_1.describe)('validateManifest', () => {
    (0, vitest_1.it)('validates a correct manifest', () => {
        const data = {
            name: 'test-feature',
            version: '1.0.0',
            description: 'A test feature',
        };
        (0, vitest_1.expect)(() => (0, manifest_1.validateManifest)(data)).not.toThrow();
    });
    (0, vitest_1.it)('validates a manifest with hooks and dependencies', () => {
        const data = {
            name: 'test-feature',
            version: '1.0.0',
            description: 'A test feature',
            hooks: {
                providers: [{ import: 'TestProvider', path: './TestProvider' }],
                env: { TEST_KEY: 'test-value' },
            },
            dependencies: { 'expo-test': '^1.0.0' },
            conflicts: ['other-feature'],
        };
        (0, vitest_1.expect)(() => (0, manifest_1.validateManifest)(data)).not.toThrow();
    });
    (0, vitest_1.it)('rejects a manifest without name', () => {
        const data = { version: '1.0.0', description: '' };
        (0, vitest_1.expect)(() => (0, manifest_1.validateManifest)(data)).toThrow();
    });
    (0, vitest_1.it)('rejects a manifest with empty name', () => {
        const data = { name: '', version: '1.0.0', description: '' };
        (0, vitest_1.expect)(() => (0, manifest_1.validateManifest)(data)).toThrow();
    });
    (0, vitest_1.it)('rejects a manifest without version', () => {
        const data = { name: 'test', description: '' };
        (0, vitest_1.expect)(() => (0, manifest_1.validateManifest)(data)).toThrow();
    });
    (0, vitest_1.it)('returns a typed manifest', () => {
        const data = {
            name: 'typed-test',
            version: '0.1.0',
            description: 'Type check',
        };
        const result = (0, manifest_1.validateManifest)(data);
        (0, vitest_1.expect)(result.name).toBe('typed-test');
        (0, vitest_1.expect)(result.version).toBe('0.1.0');
    });
});
(0, vitest_1.describe)('checkConflicts', () => {
    (0, vitest_1.it)('returns null when no conflicts exist', () => {
        const selected = ['sqlite', 'camera'];
        const manifests = new Map([
            ['feature-sqlite', { name: 'sqlite', version: '1.0.0', description: '' }],
            ['feature-camera', { name: 'camera', version: '1.0.0', description: '' }],
        ]);
        (0, vitest_1.expect)((0, manifest_1.checkConflicts)(selected, manifests)).toBeNull();
    });
    (0, vitest_1.it)('returns a conflict message when features conflict', () => {
        const selected = ['feature-sqlite', 'legacy-db'];
        const manifests = new Map([
            ['feature-sqlite', { name: 'sqlite', version: '1.0.0', description: '', conflicts: ['legacy-db'] }],
            ['legacy-db', { name: 'legacy', version: '1.0.0', description: '' }],
        ]);
        const result = (0, manifest_1.checkConflicts)(selected, manifests);
        (0, vitest_1.expect)(result).toContain('conflicts');
    });
    (0, vitest_1.it)('ignores features not in the selected list', () => {
        const selected = ['sqlite'];
        const manifests = new Map([
            ['feature-sqlite', { name: 'sqlite', version: '1.0.0', description: '', conflicts: ['unrelated'] }],
        ]);
        (0, vitest_1.expect)((0, manifest_1.checkConflicts)(selected, manifests)).toBeNull();
    });
    (0, vitest_1.it)('handles empty features list', () => {
        (0, vitest_1.expect)((0, manifest_1.checkConflicts)([], new Map())).toBeNull();
    });
});
(0, vitest_1.describe)('loadManifest', () => {
    (0, vitest_1.it)('throws when manifest file does not exist', () => {
        (0, vitest_1.expect)(() => (0, manifest_1.loadManifest)('/nonexistent/path')).toThrow('No coderooz.json found');
    });
});
//# sourceMappingURL=manifest.test.js.map