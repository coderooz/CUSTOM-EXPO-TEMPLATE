import { scaffoldBase, weaveFeatures, runPostInstall, printNextSteps, resolveFeaturesDir } from '@coderooz/create-app';

export interface CreateOptions {
  appName: string;
  with?: string;
  template?: string;
}

export async function createCommand(options: CreateOptions): Promise<void> {
  const { appName, template } = options;

  const features: string[] = options.with
    ? options.with.split(',').map((f) => f.trim()).filter(Boolean)
    : [];

  const projectDir = scaffoldBase({
    appName,
    template,
  });

  if (features.length > 0) {
    const featuresDir = resolveFeaturesDir();

    console.log(`\n  Applying features: ${features.join(', ')}\n`);

    weaveFeatures({
      projectDir,
      features,
      featuresDir,
    });
  }

  runPostInstall(projectDir);
  printNextSteps(projectDir);
}
