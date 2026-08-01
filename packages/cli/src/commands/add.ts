import { weaveFeatures, resolveFeaturesDir, listAvailableFeatures } from '@coderooz/create-app';

export interface AddOptions {
  features: string;
  projectDir?: string;
}

export async function addCommand(options: AddOptions): Promise<void> {
  const projectDir = options.projectDir ?? process.cwd();
  const featuresDir = resolveFeaturesDir();

  const features = options.features
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean);

  if (features.length === 0) {
    throw new Error('No features specified. Example: coderooz add sqlite,camera');
  }

  const available = listAvailableFeatures(featuresDir);
  const missing = features.filter((f) => {
    const prefixed = `feature-${f}`;
    return !available.includes(f) && !available.includes(prefixed);
  });

  if (missing.length > 0) {
    throw new Error(
      `Unknown feature(s): ${missing.join(', ')}\n` +
        `  Available: ${available.map((f) => f.replace(/^feature-/, '')).join(', ')}`,
    );
  }

  console.log(`\n  Adding features: ${features.join(', ')}\n`);

  weaveFeatures({
    projectDir,
    features,
    featuresDir,
  });

  console.log(`\n  Run 'npm install' in ${projectDir} to complete.\n`);
}
