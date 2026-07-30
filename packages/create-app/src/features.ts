import { existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

export function resolveFeaturesDir(): string {
  const bundledDir = join(__dirname, '..', 'public', 'features');
  if (existsSync(bundledDir)) return bundledDir;

  const devDir = resolveMonorepoFeaturesDir();
  if (devDir) return devDir;

  throw new Error(
    'Could not locate feature packages. ' +
    'Ensure @coderooz/create-app is properly installed.',
  );
}

function resolveMonorepoFeaturesDir(): string | null {
  let current = resolve(join(__dirname, '..', '..', '..', '..'));
  for (let i = 0; i < 10; i++) {
    const packagesDir = join(current, 'packages');
    if (existsSync(packagesDir)) {
      const entries = readdirSync(packagesDir);
      if (entries.some(e => e.startsWith('feature-'))) {
        return packagesDir;
      }
    }
    const parent = resolve(join(current, '..'));
    if (parent === current) return null;
    current = parent;
  }
  return null;
}
