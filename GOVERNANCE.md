# Governance — Coderooz Expo Template (AI Agents)

This document is the **enforceable rulebook** for any AI agent (or human contributor)
working in this repository, in a project scaffolded from this template, or in the
Coderooz CLI ecosystem. It applies together with the global governance rules in
`~/.config/opencode/GOVERNANCE.md` (maintainer machines) and the repository
`AGENTS.md`. Read all three before starting work.

---

## 1. Purpose & Scope

This rulebook ensures every change is:

- **Safe** — validated before editing, verified after editing
- **Traceable** — reports and logs follow a fixed naming convention
- **Clean** — no clutter in the repository root, no committed secrets or temp files
- **Consistent** — matches existing conventions in the codebase

It applies to:

- The monorepo itself (`packages/`, `scripts/`, `docs/`, `examples/`)
- The generated template bundle (`packages/create-app/public/template/`)
- Any project scaffolded from `expo-template-coderooz`
- The Coderooz CLI ecosystem (`@coderooz/core`, `@coderooz/create-app`, `@coderooz/cli`)

---

## 2. Mandatory Pre-Task Checklist

Before doing any work, load context in this order:

1. **`LLM.txt`** (repository root) — single-context entry point for building with the template
2. **`AGENTS.md`** (repository root) — project identity, structure, conventions, workflows
3. **`GOVERNANCE.md`** (repository root) — this rulebook
4. **`GOVERNANCE.md`** (global, `~/.config/opencode/`) — machine-level rules (maintainer only)
5. **`README.md`** — human-facing overview
6. **`coderooz.json`** of any feature package you touch — manifest contract

If any context file is missing or stale, update it or flag it before proceeding.

**AI context maintenance rule:** update `LLM.txt`, `AGENTS.md`, and `GOVERNANCE.md` in the
**same PR** as any template or feature change that affects documented behavior. Then run
`npm run build` (they are bundled into the template and republished to npm).

---

## 3. Agent Rules

### 3.1 Read Before You Write

- Never edit a file you have not read first. Understand its role, imports, and conventions.
- When unsure how a change fits, trace related files (`coderooz.json` manifests, hooks,
  `template/` sources) before editing.

### 3.2 Respect the Weave Pipeline

- `packages/create-app/public/` and `examples/showcase/` are **generated**.
  Never edit files under them directly.
- Edit the root/template source (e.g. `src/`, `App.tsx`, `packages/feature-*/template/`),
  then regenerate:
  ```bash
  npm run build                 # re-bundle template + features into create-app/public
  node scripts/build-example.js # regenerate examples/showcase/ (if showcase changed)
  ```
- If a feature package `template/` or `coderooz.json` changed, `npm run build` will
  propagate it to `packages/create-app/public/features/`.

### 3.3 No Silent Dependency Changes

- Do not add, remove, or upgrade dependencies without a stated reason.
- Dependency changes must respect the manifest `dependencies` field in each feature
  package's `coderooz.json` and the root `package.json` workspaces.
- Re-run `npm install` and the full validation suite after any dependency change.

### 3.4 Match Existing Conventions

- TypeScript strict mode; `interface` over `type` for shapes; `type` for unions/utilities
- `const` over `let`, never `var`
- `async/await` over raw promises
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Avoid `any` — use `unknown` and narrow with type guards
- Conventional commits: `type(scope): message` (feat, fix, refactor, chore, docs, test, style, perf)
- No code comments unless explicitly asked
- React Native: `StyleSheet.create()`, never hardcoded dimensions

### 3.5 Validate After Every Change

Before finishing any task, run (from repository root):

| Command | Purpose |
|---------|---------|
| `npm run lint` | ESLint via expo |
| `npm run typecheck` | TypeScript `--noEmit` |
| `npm test` | Vitest suite (core, design-system, dynamic-pages) |
| `npm run build` | Build core/create-app/cli + bundle template |
| `npm run build:all` | Also build all 12 feature packages |

If you changed the showcase, additionally run in `examples/showcase/`:

```bash
npx tsc --noEmit   # should be clean
```

Fix every error you introduce. If a pre-existing error blocks you, flag it rather than
silently working around it.

---

## 4. Reporting & File Hygiene

### 4.1 No Root-Level Reports

- **Never** create reports, audits, or analysis files in the repository root.
- All reports go in `Reports/{Category}/` subdirectories.
- Exception (approved root files): `AGENTS.md`, `GOVERNANCE.md`, `README.md`,
  `CHANGELOG.md`, `LICENSE`, `.gitignore`, `package.json`, `opencode.jsonc`,
  `.env.example`, and other files that are part of the shipped template.

### 4.2 Use `.workspace/` for Temporary Files

- Scratch files, drafts, and temp output go in `.workspace/` (`{scratch,drafts,tmp}`).
- `.workspace/` is gitignored — never commit it.
- Clean up `.workspace/` after the task is complete.

### 4.3 Report Naming Convention

Every report file is named:

```
{CATEGORY}_{DESCRIPTOR}_{YYYYMMDD}.md
```

Examples:

- `AUDIT_GOVERNANCE_LAYER_20260731.md`
- `TEST_SUITE_SUMMARY_20260731.md`
- `REPORT_SHOWCASE_IMPLEMENTATION_20260731.md`

### 4.4 Index Reports

- Add every new report to `REPORT_INDEX.md` (if present) under the matching category.
- Keep the index in sync with the files on disk.

---

## 5. Secrets & Security

- **Never** log, expose, or commit secrets, API keys, tokens, passwords, or `.env` files.
- `.env.example` ships template placeholders only; real `.env` files are gitignored.
- Auth features persist tokens via `expo-secure-store` — never fall back to plaintext storage.
- Validate and sanitize all user inputs (Zod schemas in `@coderooz/core` for manifests).
- If a secret is found committed, rotate it and remove it from history immediately.

---

## 6. Destructive Operations

- Never run destructive commands (`rm -rf`, `git reset --hard`, `git clean -f`, format
  operations, destructive SQL) without explicit confirmation from the user.
- Prefer non-destructive equivalents (`git checkout -- <file>` after confirming intent).
- In a scaffolded project, treat user-generated `src/` files as their own; never
  overwrite them via `add`/`update` in `replace` mode without warning.

---

## 7. Local Documentation

- Offline documentation sets live on the maintainer's machine at `C:\Code_Works\Docs\`.
- `C:\Code_Works\Docs\DOCS_CATALOG.md` is the master index.
- Consult these sets when working with Expo SDK, React Navigation, NativeWind, Clerk,
  Next.js, or npm tooling. Keep `DOCS_CATALOG.md`/`DOCS_INDEX.md` in sync with disk.

---

## 8. When In Doubt

- **Ask before acting.** If a decision is material (destructive op, public API change,
  dependency bump, template/shipping change), ask the user first.
- Surface conflicts explicitly — never smooth over a merge or a schema disagreement.
- If a file changed under you since you read it, treat that as meaningful and re-read it.

---

## 9. Branching Rules

See `docs/branching-strategy.md` for the full design. Summary for AI agents:

- **`main`** is the only permanent *source* branch — feature source lives only in
  `packages/feature-*/` on `main`. Never create long-lived `feature/<name>` branches.
- **Short-lived `feat/*`, `fix/*`, `chore/*`, `docs/*`** branches for active work;
  merge back to `main` via PR and delete.
- **`v1.x`, `v2.x`, …** release maintenance lines — patch fixes and security hotfixes only.
- **`examples/<name>`** branches hold *generated* Expo apps (artifacts). They are
  written only by the CI sync workflow — never hand-edit or merge them.
- **`gh-pages`** (if used) is a generated docs artifact branch — CI-written only.
- **Never** push to an artifact branch manually.

---

## 10. Enforcement Checklist (use for every task)

Before completing any session, verify:

- [ ] No new files in repository root (except approved template files)
- [ ] All reports in correct `Reports/` subdirectory
- [ ] All reports follow the `{CATEGORY}_{DESCRIPTOR}_{YYYYMMDD}.md` naming convention
- [ ] `REPORT_INDEX.md` updated (if present)
- [ ] `.workspace/` cleaned up
- [ ] Documentation sets (`LLM.txt`, `AGENTS.md`, `GOVERNANCE.md`, `docs/`) kept in sync
- [ ] Branch rules respected (no long-lived feature branches, no manual pushes to artifact branches)
- [ ] Validation suite green: lint, typecheck, test, build
- [ ] No secrets, API keys, or `.env` files committed

**FAILURE TO COMPLY IS NOT AN OPTION. These rules are mandatory.**
