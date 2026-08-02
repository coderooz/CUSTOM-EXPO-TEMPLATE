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
      expect(merged.expo.name).toBe('MyApp');
      expect(merged.expo.version).toBe('1.0.0');
    });

    it('preserves package.json identity and merges dependencies additively', () => {
      writeFileSync(join(projectDir, 'package.json'), JSON.stringify({
        name: 'my-app',
        version: '1.0.0',
        private: true,
        scripts: { start: 'expo start' },
        workspaces: [],
        dependencies: { expo: '~54.0.36', 'expo-image-picker': '~16.1.0' },
        devDependencies: { typescript: '~5.9.2' },
      }));
      writeFileSync(join(templateDir, 'package.json'), JSON.stringify({
        name: 'expo-template-coderooz',
        version: '1.0.4',
        scripts: { start: 'expo start', 'test:mono': 'npm test' },
        workspaces: ['packages/*'],
        dependencies: { expo: '~54.0.40', 'expo-sqlite': '~16.0.10' },
        devDependencies: { typescript: '~5.9.2', vitest: '^4.0.0' },
      }));
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'update',
        templateFiles: ['package.json'],
      });
      expect(result.merged).toBe(1);
      const merged = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf-8'));
      expect(merged.name).toBe('my-app');
      expect(merged.version).toBe('1.0.0');
      expect(merged.private).toBe(true);
      expect(merged.scripts).toEqual({ start: 'expo start' });
      expect(merged.workspaces).toEqual([]);
      expect(merged.dependencies.expo).toBe('~54.0.36');
      expect(merged.dependencies['expo-image-picker']).toBe('~16.1.0');
      expect(merged.dependencies['expo-sqlite']).toBe('~16.0.10');
      expect(merged.devDependencies.typescript).toBe('~5.9.2');
      expect(merged.devDependencies.vitest).toBe('^4.0.0');
    });

    it('preserves app identity and unions plugins', () => {
      writeFileSync(join(projectDir, 'app.json'), JSON.stringify({
        expo: {
          name: 'MyApp',
          version: '1.0.0',
          slug: 'my-app',
          plugins: ['expo-router', 'expo-image-picker'],
        },
      }));
      writeFileSync(join(templateDir, 'app.json'), JSON.stringify({
        expo: {
          name: 'App',
          version: '1.0.4',
          slug: 'custom-expo-coderooz',
          plugins: ['expo-sqlite', 'expo-image-picker'],
        },
      }));
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'update',
        templateFiles: ['app.json'],
      });
      expect(result.merged).toBe(1);
      const merged = JSON.parse(readFileSync(join(projectDir, 'app.json'), 'utf-8'));
      expect(merged.expo.name).toBe('MyApp');
      expect(merged.expo.version).toBe('1.0.0');
      expect(merged.expo.slug).toBe('my-app');
      expect(merged.expo.plugins).toEqual(['expo-router', 'expo-image-picker', 'expo-sqlite']);
    });

    it('unions tsconfig include/exclude arrays', () => {
      writeFileSync(join(projectDir, 'tsconfig.json'), JSON.stringify({
        compilerOptions: { strict: true, paths: { '@/*': ['./src/*'] } },
        include: ['src', 'App.tsx'],
      }));
      writeFileSync(join(templateDir, 'tsconfig.json'), JSON.stringify({
        compilerOptions: { strict: true, jsx: 'react-jsx' },
        include: ['App.tsx', 'index.ts'],
      }));
      const result = reconcileTemplate({
        templateDir,
        projectDir,
        mode: 'update',
        templateFiles: ['tsconfig.json'],
      });
      expect(result.merged).toBe(1);
      const merged = JSON.parse(readFileSync(join(projectDir, 'tsconfig.json'), 'utf-8'));
      expect(merged.compilerOptions.strict).toBe(true);
      expect(merged.compilerOptions.jsx).toBe('react-jsx');
      expect(merged.compilerOptions.paths).toEqual({ '@/*': ['./src/*'] });
      expect(merged.include).toEqual(['src', 'App.tsx', 'index.ts']);
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
