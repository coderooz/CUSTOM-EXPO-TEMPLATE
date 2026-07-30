import { reconcileTemplate, readTemplateFilesList, ReconcileMode, ReconcileResult } from '@coderooz/core';
import { join } from 'path';
import { existsSync } from 'fs';
import { resolveTemplateDir } from './templateResolver';

export interface UpdateOptions {
  projectDir: string;
  mode: ReconcileMode;
  templateDir?: string;
  skipPaths?: string[];
}

const DEFAULT_SKIP_PATHS = [
  'node_modules',
  '.git',
  'package-lock.json',
  'packages',
  '.expo',
];

export function updateTemplate(options: UpdateOptions): ReconcileResult {
  const { projectDir, mode, skipPaths = DEFAULT_SKIP_PATHS } = options;

  const templateDir = resolveTemplateDir(options.templateDir);
  const pkgPath = join(templateDir, 'package.json');

  if (!existsSync(templateDir)) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  const templateFiles = readTemplateFilesList(pkgPath);
  if (templateFiles.length === 0) {
    throw new Error(`No template files listed in ${pkgPath}. Check the "files" field.`);
  }

  const result = reconcileTemplate({
    templateDir,
    projectDir,
    mode,
    templateFiles,
    skipPaths,
  });

  const summary = [
    `\n  Template ${mode}:`,
    `    added: ${result.added}`,
    `    replaced: ${result.replaced}`,
    `    merged: ${result.merged}`,
    `    skipped: ${result.skipped}`,
    `    unchanged: ${result.unchanged}`,
    ...(result.failed > 0 ? [`    failed: ${result.failed}`] : []),
    '',
  ].join('\n');

  console.log(summary);

  return result;
}
