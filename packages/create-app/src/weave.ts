import { loadManifest, checkConflicts, weaveFeature, FeatureManifest } from '@coderooz/core';
import { join } from 'path';
import { existsSync, readdirSync, statSync } from 'fs';

export interface WeaveOptions {
  projectDir: string;
  features: string[];
  featuresDir: string;
}

export function weaveFeatures(options: WeaveOptions): void {
  const { projectDir, features, featuresDir } = options;

  if (!existsSync(featuresDir)) {
    throw new Error(`Features directory not found: ${featuresDir}`);
  }

  const allPackages = readdirSync(featuresDir).filter((entry) => {
    const entryPath = join(featuresDir, entry);
    return statSync(entryPath).isDirectory() && existsSync(join(entryPath, 'coderooz.json'));
  });

  function resolveFeature(name: string): string {
    const exact = join(featuresDir, name);
    if (existsSync(exact) && statSync(exact).isDirectory()) return name;

    const prefixed = `feature-${name}`;
    if (allPackages.includes(prefixed)) return prefixed;

    const match = allPackages.find((p) => p.includes(name));
    if (match) return match;

    throw new Error(`Feature "${name}" not found in ${featuresDir}`);
  }

  const manifests = new Map<string, FeatureManifest>();
  const resolvedNames: string[] = [];

  for (const featureName of features) {
    const resolved = resolveFeature(featureName);
    const featurePath = join(featuresDir, resolved);
    const manifest = loadManifest(featurePath);
    manifests.set(resolved, manifest);
    resolvedNames.push(resolved);
  }

  const expanded = expandRequires(resolvedNames, manifests, allPackages, featuresDir);
  const conflictError = checkConflicts(expanded, manifests);
  if (conflictError) {
    throw new Error(`Feature conflict: ${conflictError}`);
  }

  const context = { projectDir, featuresDir };

  for (const resolved of expanded) {
    const manifest = manifests.get(resolved)!;
    const result = weaveFeature(manifest, context);

    console.log(`\n  ✓ ${result.feature}: ${result.filesCopied} files copied, ${result.depsAdded} deps added`);

    if (result.hooksExecuted.length > 0) {
      console.log(`    hooks: ${result.hooksExecuted.join(', ')}`);
    }
  }
}

function expandRequires(
  selected: string[],
  manifests: Map<string, FeatureManifest>,
  allPackages: string[],
  featuresDir: string,
): string[] {
  const ordered: string[] = [];
  const seen = new Set<string>();
  const visiting = new Set<string>();

  function loadIfMissing(pkg: string): FeatureManifest {
    if (manifests.has(pkg)) return manifests.get(pkg)!;
    const manifest = loadManifest(join(featuresDir, pkg));
    manifests.set(pkg, manifest);
    return manifest;
  }

  function resolveByName(name: string): string | null {
    if (allPackages.includes(name)) return name;
    if (allPackages.includes(`feature-${name}`)) return `feature-${name}`;
    for (const pkg of allPackages) {
      const manifest = manifests.get(pkg);
      if (manifest?.name === name) return pkg;
    }
    return null;
  }

  function visit(pkg: string): void {
    if (seen.has(pkg)) return;
    if (visiting.has(pkg)) {
      throw new Error(`Circular feature dependency detected at "${pkg}"`);
    }
    visiting.add(pkg);

    const manifest = loadIfMissing(pkg);
    for (const requirement of manifest.requires ?? []) {
      const resolved = resolveByName(requirement);
      if (!resolved) {
        throw new Error(
          `Feature "${pkg}" requires "${requirement}" but no matching feature package was found`,
        );
      }
      visit(resolved);
    }

    visiting.delete(pkg);
    seen.add(pkg);
    ordered.push(pkg);
  }

  for (const pkg of selected) visit(pkg);
  return ordered;
}

export function listAvailableFeatures(featuresDir: string): string[] {
  if (!existsSync(featuresDir)) return [];

  return readdirSync(featuresDir).filter((entry) => {
    const entryPath = join(featuresDir, entry);
    return statSync(entryPath).isDirectory() && existsSync(join(entryPath, 'coderooz.json'));
  });
}
