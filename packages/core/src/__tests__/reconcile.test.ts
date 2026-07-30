import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { reconcileTemplate, readTemplateFilesList } from '../reconcile';

let root: string;
let templateDir: string;
let projectDir: string;
let pkgDir: string;

beforeEach(() => {
  root = join(tmpdir(), `coderooz-reconcile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  templateDir = join(root, 'template');
  projectDir = join(root, 'project');
  pkgDir = join(root, 'pkg');
  mkdirSync(templateDir, { recursive: true });
  mkdirSync(projectDir, { recursive: true });
  mkdirSync(pkgDir, { recursive: true });
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function writeTemplateFiles(): void {
  writeFileSync(join(templateDir, 'App.tsx'), '// App.tsx template');
  writeFileSync(join(templateDir, 'app.json'), '{"expo":{"name":"App"}}');
  writeFileSync(join(templateDir, 'global.css'), '/* styles */');
  mkdirSync(join(templateDir, 'src', 'lib'), { recursive: true });
  writeFileSync(join(templateDir, 'src', 'lib', 'utils.ts'), '// utils');
  mkdirSync(join(templateDir, 'src', 'lib', 'nested'), { recursive: true });
  writeFileSync(join(templateDir, 'src', 'lib', 'nested', 'deep.ts'), '// deep');
  mkdirSync(join(templateDir, 'assets'), { recursive: true });
  writeFileSync(join(templateDir, 'assets', 'icon.png'), 'fake-png');
}

function writePackageJson(): void {
  writeFileSync(
    join(pkgDir, 'package.json'),
    JSON.stringify({
      files: ['App.tsx', 'app.json', 'global.css', 'src', 'assets'],
    }),
  );
}

describe('readTemplateFilesList', () => {
  it('reads files list from package.json', () => {
    writePackageJson();
    const files = readTemplateFilesList(join(pkgDir, 'package.json'));
    expect(files).toEqual(['App.tsx', 'app.json', 'global.css', 'src', 'assets']);
  });

  it('returns empty array when package.json has no files field', () => {
    writeFileSync(join(pkgDir, 'package.json'), '{"name":"test"}');
    const files = readTemplateFilesList(join(pkgDir, 'package.json'));
    expect(files).toEqual([]);
  });
});

describe('reconcileTemplate', () => {
  beforeEach(() => {
    writeTemplateFiles();
    writePackageJson();
  });

  describe('add-missing mode', () => {
    it('adds files that do not exist in project', () => {
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'add-missing',
        templateFiles: ['App.tsx', 'global.css'],
      });
      expect(result.added).toBe(2);
      expect(result.unchanged).toBe(0);
      expect(existsSync(join(projectDir, 'App.tsx'))).toBe(true);
      expect(existsSync(join(projectDir, 'global.css'))).toBe(true);
    });

    it('skips files that already exist in project', () => {
      writeFileSync(join(projectDir, 'App.tsx'), '// user version');
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'add-missing',
        templateFiles: ['App.tsx', 'global.css'],
      });
      expect(result.added).toBe(1);
      expect(result.unchanged).toBe(1);
      expect(readFileSync(join(projectDir, 'App.tsx'), 'utf-8')).toBe('// user version');
    });

    it('copies nested directory structures', () => {
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'add-missing',
        templateFiles: ['src'],
      });
      expect(result.added).toBe(2);
      expect(existsSync(join(projectDir, 'src', 'lib', 'utils.ts'))).toBe(true);
      expect(existsSync(join(projectDir, 'src', 'lib', 'nested', 'deep.ts'))).toBe(true);
    });
  });

  describe('replace mode', () => {
    it('overwrites existing files', () => {
      writeFileSync(join(projectDir, 'App.tsx'), '// user version');
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'replace',
        templateFiles: ['App.tsx'],
      });
      expect(result.replaced).toBe(1);
      expect(readFileSync(join(projectDir, 'App.tsx'), 'utf-8')).toBe('// App.tsx template');
    });

    it('adds missing files', () => {
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'replace',
        templateFiles: ['global.css'],
      });
      expect(result.added).toBe(1);
    });
  });

  describe('update mode', () => {
    it('merges JSON config files', () => {
      writeFileSync(join(projectDir, 'app.json'), '{"expo":{"name":"MyApp","version":"1.0.0"}}');
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'update',
        templateFiles: ['app.json'],
      });
      expect(result.merged).toBe(1);
      const merged = JSON.parse(readFileSync(join(projectDir, 'app.json'), 'utf-8'));
      expect(merged.expo.name).toBe('App');
      expect(merged.expo.version).toBe('1.0.0');
    });

    it('merges dependencies within JSON configs', () => {
      writeFileSync(join(projectDir, 'package.json'), JSON.stringify({
        name: 'my-app',
        dependencies: { 'expo': '~50.0.0', 'react': '18.2.0' },
      }));
      writeFileSync(join(templateDir, 'package.json'), JSON.stringify({
        dependencies: { 'expo': '~50.0.0', 'expo-sqlite': '~14.0.0' },
      }));
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'update',
        templateFiles: ['package.json'],
      });
      expect(result.merged).toBe(1);
      const merged = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf-8'));
      expect(merged.dependencies.expo).toBe('~50.0.0');
      expect(merged.dependencies['expo-sqlite']).toBe('~14.0.0');
      expect(merged.dependencies.react).toBe('18.2.0');
    });

    it('replaces non-JSON files that exist', () => {
      writeFileSync(join(projectDir, 'global.css'), '/* old styles */');
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'update',
        templateFiles: ['global.css'],
      });
      expect(result.replaced).toBe(1);
      expect(readFileSync(join(projectDir, 'global.css'), 'utf-8')).toBe('/* styles */');
    });

    it('adds missing files', () => {
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'update',
        templateFiles: ['App.tsx'],
      });
      expect(result.added).toBe(1);
    });
  });

  it('respects skip paths', () => {
    const result = reconcileTemplate({
      templateDir,
      projectDir,
      mode: 'replace',
      templateFiles: ['App.tsx', 'assets'],
      skipPaths: ['assets'],
    });
    expect(result.skipped).toBe(1);
    expect(result.added).toBe(1);
  });

  it('continues on per-file failure and reports failed count', () => {
    const result = reconcileTemplate({
      templateDir,
      projectDir,
      mode: 'replace',
      templateFiles: ['App.tsx', 'global.css'],
    });
    expect(result.added).toBe(2);
    expect(result.failed).toBe(0);
  });

  it('handles missing template files gracefully', () => {
    const result = reconcileTemplate({
      templateDir,
      projectDir,
      mode: 'add-missing',
      templateFiles: ['nonexistent.tsx'],
    });
    expect(result.added).toBe(0);
    expect(result.failed).toBe(0);
  });

  it('handles empty template file list', () => {
    const result = reconcileTemplate({
      templateDir,
      projectDir,
      mode: 'add-missing',
      templateFiles: [],
    });
    expect(result.added).toBe(0);
    expect(result.unchanged).toBe(0);
    expect(result.actions).toEqual([]);
  });

  it('detects prototype pollution in JSON configs', () => {
    writeFileSync(join(projectDir, 'app.json'), '{"__proto__": {"polluted": true}}');
    const result = reconcileTemplate({
      templateDir,
      projectDir,
      mode: 'update',
      templateFiles: ['app.json'],
    });
    expect(result.replaced).toBe(1);
  });
});
