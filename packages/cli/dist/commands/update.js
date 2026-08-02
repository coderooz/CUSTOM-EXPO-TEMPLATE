"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommand = updateCommand;
const create_app_1 = require("@coderooz/create-app");
const core_1 = require("@coderooz/core");
const VALID_MODES_SET = new Set(core_1.VALID_MODES);
async function updateCommand(options) {
    const projectDir = options.projectDir ?? process.cwd();
    if (!VALID_MODES_SET.has(options.mode)) {
        console.error(`\n  Error: Invalid mode "${options.mode}". Must be one of: ${core_1.VALID_MODES.join(', ')}\n`);
        process.exit(1);
    }
    console.log(`\n  Updating project at: ${projectDir}`);
    console.log(`  Mode: ${options.mode}\n`);
    (0, create_app_1.updateTemplate)({
        projectDir,
        mode: options.mode,
    });
}
//# sourceMappingURL=update.js.map