import { describe, it, expect } from 'vitest';
import { validateManifest, checkConflicts, loadManifest } from '../manifest';
import { FeatureManifest } from '../types';
import { join } from 'path';

describe('validateManifest', () => {
  it('validates a correct manifest', () => {
    const data = {
      name: 'test-feature',
      version: '1.0.0',
      description: 'A test feature',
    };
    expect(() => validateManifest(data)).not.toThrow();
  });

  it('validates a manifest with hooks and dependencies', () => {
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
    expect(() => validateManifest(data)).not.toThrow();
  });

  it('rejects a manifest without name', () => {
    const data = { version: '1.0.0', description: '' };
    expect(() => validateManifest(data)).toThrow();
  });

  it('rejects a manifest with empty name', () => {
    const data = { name: '', version: '1.0.0', description: '' };
    expect(() => validateManifest(data)).toThrow();
  });

  it('rejects a manifest without version', () => {
    const data = { name: 'test', description: '' };
    expect(() => validateManifest(data)).toThrow();
  });

  it('returns a typed manifest', () => {
    const data = {
      name: 'typed-test',
      version: '0.1.0',
      description: 'Type check',
    };
    const result: FeatureManifest = validateManifest(data);
    expect(result.name).toBe('typed-test');
    expect(result.version).toBe('0.1.0');
  });
});

describe('checkConflicts', () => {
  it('returns null when no conflicts exist', () => {
    const selected = ['sqlite', 'camera'];
    const manifests = new Map<string, FeatureManifest>([
      ['feature-sqlite', { name: 'sqlite', version: '1.0.0', description: '' }],
      ['feature-camera', { name: 'camera', version: '1.0.0', description: '' }],
    ]);
    expect(checkConflicts(selected, manifests)).toBeNull();
  });

  it('returns a conflict message when features conflict', () => {
    const selected = ['feature-sqlite', 'legacy-db'];
    const manifests = new Map<string, FeatureManifest>([
      ['feature-sqlite', { name: 'sqlite', version: '1.0.0', description: '', conflicts: ['legacy-db'] }],
      ['legacy-db', { name: 'legacy', version: '1.0.0', description: '' }],
    ]);
    const result = checkConflicts(selected, manifests);
    expect(result).toContain('conflicts');
  });

  it('ignores features not in the selected list', () => {
    const selected = ['sqlite'];
    const manifests = new Map<string, FeatureManifest>([
      ['feature-sqlite', { name: 'sqlite', version: '1.0.0', description: '', conflicts: ['unrelated'] }],
    ]);
    expect(checkConflicts(selected, manifests)).toBeNull();
  });

  it('handles empty features list', () => {
    expect(checkConflicts([], new Map())).toBeNull();
  });
});

describe('loadManifest', () => {
  it('throws when manifest file does not exist', () => {
    expect(() => loadManifest('/nonexistent/path')).toThrow('No coderooz.json found');
  });
});
