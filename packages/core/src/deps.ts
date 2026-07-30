import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { mergeDependencies } from './merge';

export function installFeatureDependencies(
  projectDir: string,
  packages: Record<string, string>,
  devPackages: Record<string, string>,
): { depsAdded: number; devDepsAdded: number } {
  const pkgPath = join(projectDir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  const currentDeps = pkg.dependencies ?? {};
  const currentDevDeps = pkg.devDependencies ?? {};

  const mergedDeps = mergeDependencies(currentDeps, packages);
  const mergedDevDeps = mergeDependencies(currentDevDeps, devPackages);

  const depsAdded = Object.keys(packages).length;
  const devDepsAdded = Object.keys(devPackages).length;

  pkg.dependencies = mergedDeps;
  pkg.devDependencies = mergedDevDeps;

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  return { depsAdded, devDepsAdded };
}
