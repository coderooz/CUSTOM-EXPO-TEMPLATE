import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { tmpdir } from 'os';
import { weaveFeature } from '../hooks';
import { loadManifest } from '../manifest';
import type { FeatureManifest } from '../types';

let featuresDir: string;
let projectDir: string;

beforeEach(() => {
  featuresDir = join(tmpdir(), `coderooz-test-features-${Date.now()}`);
  projectDir = join(tmpdir(), `coderooz-test-project-${Date.now()}`);
  mkdirSync(featuresDir, { recursive: true });
  mkdirSync(projectDir, { recursive: true });
  writeFileSync(join(projectDir, 'package.json'), JSON.stringify({ name: 'test-app', version: '1.0.0' }));
});

afterEach(() => {
  rmSync(featuresDir, { recursive: true, force: true });
  rmSync(projectDir, { recursive: true, force: true });
});

function makeFeature(dirName: string, manifest: FeatureManifest, templateFiles: Record<string, string>): void {
  const featureDir = join(featuresDir, dirName);
  mkdirSync(featureDir, { recursive: true });
  writeFileSync(join(featureDir, 'coderooz.json'), JSON.stringify(manifest));
  const templateDir = join(featureDir, 'template');
  for (const [relPath, content] of Object.entries(templateFiles)) {
    const filePath = join(templateDir, relPath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
  }
}

describe('weaveFeature', () => {
  it('copies template files from a feature-* prefixed directory', () => {
    makeFeature(
      'feature-sqlite',
      { name: 'sqlite', version: '1.0.0', description: '' },
      { 'src/services/db/index.ts': 'export const db = {};\n' },
    );

    const manifest = loadManifest(join(featuresDir, 'feature-sqlite'));
    const result = weaveFeature(manifest, { projectDir, featuresDir });

    expect(result.filesCopied).toBe(1);
    expect(existsSync(join(projectDir, 'src/services/db/index.ts'))).toBe(true);
    expect(readFileSync(join(projectDir, 'src/services/db/index.ts'), 'utf-8')).toBe('export const db = {};\n');
  });

  it('copies template files from a bare (non-prefixed) directory', () => {
    makeFeature(
      'sqlite',
      { name: 'sqlite', version: '1.0.0', description: '' },
      { 'src/services/db/index.ts': 'export const db = {};\n' },
    );

    const manifest = loadManifest(join(featuresDir, 'sqlite'));
    const result = weaveFeature(manifest, { projectDir, featuresDir });

    expect(result.filesCopied).toBe(1);
    expect(existsSync(join(projectDir, 'src/services/db/index.ts'))).toBe(true);
  });

  it('copies all nested template files', () => {
    makeFeature(
      'feature-dynamic-pages',
      { name: 'dynamic-pages', version: '1.0.0', description: '' },
      {
        'src/services/page-engine/loader.ts': 'export {};\n',
        'src/services/page-engine/types.ts': 'export {};\n',
        'src/context/PageEngineProvider.tsx': 'export {};\n',
      },
    );

    const manifest = loadManifest(join(featuresDir, 'feature-dynamic-pages'));
    const result = weaveFeature(manifest, { projectDir, featuresDir });

    expect(result.filesCopied).toBe(3);
    expect(existsSync(join(projectDir, 'src/context/PageEngineProvider.tsx'))).toBe(true);
  });

  it('runs env and app-json hooks', () => {
    writeFileSync(join(projectDir, 'app.json'), JSON.stringify({ expo: { plugins: [] } }));
    writeFileSync(join(projectDir, '.env.example'), '# Existing\n');

    makeFeature(
      'feature-sqlite',
      {
        name: 'sqlite',
        version: '1.0.0',
        description: '',
        hooks: {
          env: { EXPO_PUBLIC_DB_NAME: 'app.db' },
          'app-json': ['expo-sqlite'],
        },
      },
      {},
    );

    const manifest = loadManifest(join(featuresDir, 'feature-sqlite'));
    const result = weaveFeature(manifest, { projectDir, featuresDir });

    expect(result.hooksExecuted).toContain('env');
    expect(result.hooksExecuted).toContain('app-json');

    const envContent = readFileSync(join(projectDir, '.env.example'), 'utf-8');
    expect(envContent).toContain('EXPO_PUBLIC_DB_NAME=app.db');

    const appJson = JSON.parse(readFileSync(join(projectDir, 'app.json'), 'utf-8'));
    expect(appJson.expo.plugins).toContain('expo-sqlite');
  });
});
