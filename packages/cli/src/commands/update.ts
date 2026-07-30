import { updateTemplate } from '@coderooz/create-app';
import { VALID_MODES, ReconcileMode } from '@coderooz/core';

export interface UpdateOptions {
  projectDir?: string;
  mode: string;
}

const VALID_MODES_SET = new Set<string>(VALID_MODES);

export async function updateCommand(options: UpdateOptions): Promise<void> {
  const projectDir = options.projectDir ?? process.cwd();

  if (!VALID_MODES_SET.has(options.mode)) {
    console.error(`\n  Error: Invalid mode "${options.mode}". Must be one of: ${VALID_MODES.join(', ')}\n`);
    process.exit(1);
  }

  console.log(`\n  Updating project at: ${projectDir}`);
  console.log(`  Mode: ${options.mode}\n`);

  updateTemplate({
    projectDir,
    mode: options.mode as ReconcileMode,
  });
}
