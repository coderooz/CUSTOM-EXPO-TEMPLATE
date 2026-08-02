import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { deepMerge, mergeDependencies } from './merge';

export type ReconcileMode = 'add-missing' | 'replace' | 'update';

export const VALID_MODES: ReconcileMode[] = ['add-missing', 'replace', 'update'];

export interface ReconcileOptions {
  templateDir: string;
  projectDir: string;
  mode: ReconcileMode;
  templateFiles: string[];
  skipPaths?: string[];
  backupDir?: string;
}

export interface FileAction {
  file: string;
  action: 'added' | 'replaced' | 'merged' | 'skipped' | 'unchanged' | 'failed';
  error?: string;
}

export interface ReconcileResult {
  actions: FileAction[];
  added: number;
  replaced: number;
  merged: number;
  skipped: number;
  unchanged: number;
  failed: number;
}

const MERGEABLE_CONFIGS = new Set(['package.json', 'app.json', 'tsconfig.json']);

const SAFE_OBJECT_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

function hasUnsafeKey(obj: Record<string, unknown>): boolean {
  for (const key of Object.keys(obj)) {
    if (SAFE_OBJECT_KEYS.has(key)) return true;
  }
  return false;
}

function readJsonSafe(path: string): Record<string, unknown> | null {
  try {
    const raw = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(raw);
    if (hasUnsafeKey(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function shouldSkip(file: string, skipPaths: string[]): boolean {
  return skipPaths.some((p) => file === p || file.startsWith(p + '/') || file.startsWith(p + '\\'));
}

export function readTemplateFilesList(packageJsonPath: string): string[] {
  const pkg = readJsonSafe(packageJsonPath);
  if (!pkg || !Array.isArray(pkg.files)) return [];
  return pkg.files as string[];
}

const APP_JSON_IDENTITY_KEYS = new Set(['name', 'version', 'slug', 'owner']);

function toRecord(value: unknown): Record<string, string> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, string>)
    : {};
}

function mergeConfigUpdates(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  file: string,
): Record<string, unknown> {
  switch (file) {
    case 'package.json': {
      const result: Record<string, unknown> = { ...target };
      result.dependencies = mergeDependencies(
        toRecord(target.dependencies),
        toRecord(source.dependencies),
      );
      result.devDependencies = mergeDependencies(
        toRecord(target.devDependencies),
        toRecord(source.devDependencies),
      );
      return result;
    }
    case 'app.json': {
      const targetExpo = toRecord(target.expo) as Record<string, unknown>;
      const sourceExpo = toRecord(source.expo) as Record<string, unknown>;
      const expo = deepMerge(targetExpo, sourceExpo) as Record<string, unknown>;
      for (const key of APP_JSON_IDENTITY_KEYS) {
        if (key in targetExpo) expo[key] = targetExpo[key];
      }
      if (Array.isArray(sourceExpo.plugins)) {
        const basePlugins = Array.isArray(targetExpo.plugins) ? targetExpo.plugins : [];
        expo.plugins = deepMerge(basePlugins, sourceExpo.plugins, 'unique');
      }
      return { ...target, expo };
    }
    case 'tsconfig.json':
      return deepMerge(target, source, 'unique') as Record<string, unknown>;
    default:
      return deepMerge(target, source) as Record<string, unknown>;
  }
}

export function reconcileTemplate(options: ReconcileOptions): ReconcileResult {
  const { templateDir, projectDir, mode, templateFiles, skipPaths = [] } = options;
  const actions: FileAction[] = [];
  const counts = { added: 0, replaced: 0, merged: 0, skipped: 0, unchanged: 0, failed: 0 };

  if (options.backupDir && mode === 'replace') {
    console.warn(`  Warning: replace mode is destructive. No backup is created automatically.`);
  }

  function processFile(templatePath: string, relativePath: string): void {
    try {
      if (shouldSkip(relativePath, skipPaths)) {
        counts.skipped++;
        actions.push({ file: relativePath, action: 'skipped' });
        return;
      }

      const targetPath = join(projectDir, relativePath);
      const existed = existsSync(targetPath);

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
          mkdirSync(dirname(targetPath), { recursive: true });
          writeFileSync(targetPath, JSON.stringify(merged, null, 2) + '\n');
          counts.merged++;
          actions.push({ file: relativePath, action: 'merged' });
          return;
        }
      }

      mkdirSync(dirname(targetPath), { recursive: true });
      copyFileSync(templatePath, targetPath);
      if (existed) {
        counts.replaced++;
        actions.push({ file: relativePath, action: 'replaced' });
      } else {
        counts.added++;
        actions.push({ file: relativePath, action: 'added' });
      }
    } catch (err) {
      counts.failed++;
      actions.push({ file: relativePath, action: 'failed', error: (err as Error).message });
    }
  }

  for (const file of templateFiles) {
    const templatePath = join(templateDir, file);
    if (!existsSync(templatePath)) continue;

    const stat = statSync(templatePath);
    if (stat.isDirectory()) {
      const entries = readdirSync(templatePath, { recursive: true });
      for (const entry of entries) {
        const fullEntryPath = join(templatePath, entry as string);
        if (statSync(fullEntryPath).isFile()) {
          const relativeEntry = join(file, entry as string);
          processFile(fullEntryPath, relativeEntry);
        }
      }
    } else if (stat.isFile()) {
      processFile(templatePath, file);
    }
  }

  return { actions, ...counts };
}
