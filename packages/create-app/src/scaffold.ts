import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

export interface ScaffoldOptions {
  appName: string;
  template?: string;
  directory?: string;
}

export function scaffoldBase(options: ScaffoldOptions): string {
  const targetDir = options.directory ?? process.cwd();
  const appDir = join(targetDir, options.appName);

  if (existsSync(appDir) && readdirSync(appDir).length > 0) {
    throw new Error(
      `Directory ${appDir} already exists and is not empty.`,
    );
  }

  const template = options.template ?? 'expo-template-coderooz';

  console.log(`\n  Scaffolding ${options.appName} from ${template}...\n`);

  execSync(
    `npx create-expo-app "${options.appName}" --template "${template}"`,
    {
      cwd: targetDir,
      stdio: 'inherit',
    },
  );

  console.log(`\n  Base template scaffolded at ${appDir}\n`);

  return appDir;
}
