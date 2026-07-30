#!/usr/bin/env node

import { Command } from 'commander';
import { createCommand } from './commands/create';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';
import { updateCommand } from './commands/update';

const program = new Command();

program
  .name('coderooz')
  .description('CLI for creating and managing Coderooz Expo projects')
  .version('1.0.3');

program
  .command('create <app-name>')
  .description('Create a new Expo app from the Coderooz template')
  .option(
    '-w, --with <features>',
    'Comma-separated list of features to include (e.g. sqlite,camera)',
  )
  .option(
    '-t, --template <name>',
    'Base template to use (default: expo-template-coderooz)',
  )
  .action(async (appName, opts) => {
    try {
      await createCommand({ appName, ...opts });
    } catch (err) {
      console.error('\n  Error:', (err as Error).message, '\n');
      process.exit(1);
    }
  });

program
  .command('add <feature>')
  .description('Add a feature to an existing project')
  .action(async (feature) => {
    try {
      await addCommand({ feature });
    } catch (err) {
      console.error('\n  Error:', (err as Error).message, '\n');
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available features')
  .action(async () => {
    await listCommand();
  });

program
  .command('update')
  .description('Sync an existing project with the latest Coderooz template')
  .option(
    '-m, --mode <mode>',
    'Reconciliation mode: add-missing (default), replace, or update',
    'add-missing',
  )
  .option(
    '-p, --project-dir <path>',
    'Project directory to update (default: current directory)',
  )
  .action(async (opts) => {
    try {
      await updateCommand(opts);
    } catch (err) {
      console.error('\n  Error:', (err as Error).message, '\n');
      process.exit(1);
    }
  });

program.parse(process.argv);
