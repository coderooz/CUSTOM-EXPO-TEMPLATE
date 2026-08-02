#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("./commands/create");
const add_1 = require("./commands/add");
const list_1 = require("./commands/list");
const update_1 = require("./commands/update");
const program = new commander_1.Command();
program
    .name('coderooz')
    .description('CLI for creating and managing Coderooz Expo projects')
    .version('1.0.4');
program
    .command('create <app-name>')
    .description('Create a new Expo app from the Coderooz template')
    .option('-w, --with <features>', 'Comma-separated list of features to include (e.g. sqlite,camera)')
    .option('-t, --template <name>', 'Base template to use (default: expo-template-coderooz)')
    .action(async (appName, opts) => {
    try {
        await (0, create_1.createCommand)({ appName, ...opts });
    }
    catch (err) {
        console.error('\n  Error:', err.message, '\n');
        process.exit(1);
    }
});
program
    .command('add <features>')
    .description('Add one or more features to an existing project (comma-separated)')
    .option('-p, --project-dir <path>', 'Project directory to update (default: current directory)')
    .action(async (features, opts) => {
    try {
        await (0, add_1.addCommand)({ features, projectDir: opts.projectDir });
    }
    catch (err) {
        console.error('\n  Error:', err.message, '\n');
        process.exit(1);
    }
});
program
    .command('list')
    .description('List available features')
    .action(async () => {
    await (0, list_1.listCommand)();
});
program
    .command('update')
    .description('Sync an existing project with the latest Coderooz template')
    .option('-m, --mode <mode>', 'Reconciliation mode: add-missing (default), replace, or update', 'add-missing')
    .option('-p, --project-dir <path>', 'Project directory to update (default: current directory)')
    .action(async (opts) => {
    try {
        await (0, update_1.updateCommand)(opts);
    }
    catch (err) {
        console.error('\n  Error:', err.message, '\n');
        process.exit(1);
    }
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map