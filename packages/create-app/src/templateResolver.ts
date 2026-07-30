import { existsSync, readFileSync } from 'fs';
import { join, dirname, resolve } from 'path';

const MONOREPO_PKG_NAME = 'expo-template-coderooz';

function findPackageRootByWalking(startDir: string): string | null {
  let current = resolve(startDir);
  for (let i = 0; i < 20; i++) {
    const pkgPath = join(current, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        if (pkg.name === MONOREPO_PKG_NAME) return current;
      } catch {
      }
    }
    const parent = dirname(current);
    if (parent === current) return null;
    current = parent;
  }
  return null;
}

function findPackageRootViaRequire(): string | null {
  try {
    const { createRequire } = require('module');
    const localRequire = createRequire(__filename);
    const pkgPath = localRequire.resolve(`${MONOREPO_PKG_NAME}/package.json`);
    return dirname(pkgPath);
  } catch {
    return null;
  }
}

export function resolveTemplateDir(override?: string): string {
  if (override) {
    if (!existsSync(override)) {
      throw new Error(`Template directory not found: ${override}`);
    }
    return override;
  }

  const bundledDir = join(__dirname, '..', 'public', 'template');
  if (existsSync(bundledDir)) return bundledDir;

  const viaRequire = findPackageRootViaRequire();
  if (viaRequire) return viaRequire;

  const viaWalk = findPackageRootByWalking(__dirname);
  if (viaWalk) return viaWalk;

  throw new Error(
    `Could not locate ${MONOREPO_PKG_NAME} template. ` +
    'Ensure @coderooz/create-app has expo-template-coderooz installed, ' +
    'or provide an explicit templateDir option.',
  );
}
