import { weaveFeatures, resolveFeaturesDir } from '@coderooz/create-app';

export interface AddOptions {
  feature: string;
  projectDir?: string;
}

export async function addCommand(options: AddOptions): Promise<void> {
  const projectDir = options.projectDir ?? process.cwd();
  const featuresDir = resolveFeaturesDir();

  console.log(`\n  Adding feature: ${options.feature}\n`);

  weaveFeatures({
    projectDir,
    features: [options.feature],
    featuresDir,
  });

  console.log(`\n  Run 'npm install' in ${projectDir} to complete.\n`);
}
