# AI Governance

This template ships with an **AI-agent governance layer** — files that give any AI
coding agent the full context it needs to work safely in the monorepo, in the
published template, or in a generated project.

## Files That Ship

| File | Purpose |
|------|---------|
| `LLM.txt` | Single-context entry point for AI agents building with the template (features, structure, usage) |
| `AGENTS.md` | Project identity, structure, feature packages, conventions, workflows |
| `GOVERNANCE.md` | Enforceable rules: reports, naming, validation, hygiene, security |
| `opencode.jsonc` | OpenCode project config; loads the AI context files as instructions |

These files are part of the published npm package (`package.json` `files` array), so
every project scaffolded from this template gets the same governance layer.

## Branching Strategy

`main` is the only permanent source branch; feature source lives only in
`packages/feature-*` on `main`. Generated outputs (example apps, docs site) live on
artifact branches or are produced by CI. Release maintenance uses `v1.x`-style lines.
See [Branching Strategy](/branching-strategy) for the full design.

## Key Rules for AI Agents

1. **No root-level reports** — reports/audits go in `Reports/{Category}/`, never repo root
2. **Use `.workspace/`** for temporary files (never committed)
3. **Report naming** — `{CATEGORY}_{DESCRIPTOR}_{YYYYMMDD}.md`
4. **Validate before finishing** — lint, typecheck, test, build
5. **Never commit secrets, API keys, or `.env` files**
6. **No destructive commands without confirmation**
7. **Read before editing** — validate context first

## The Weave Pipeline

`packages/create-app/public/` and `examples/showcase/` are **generated**. AI agents and
contributors must never edit them directly. Edit the root/template source, then:

```bash
npm run build                 # re-bundle template + features into create-app/public
node scripts/build-example.js # regenerate examples/showcase/ (if showcase changed)
```

## Monorepo Workflows

| Command | Purpose |
|---------|---------|
| `npm run build` | Build core, create-app, cli + bundle template assets |
| `npm run build:all` | Build all 12 feature packages too |
| `npm test` | Vitest (core, design-system, dynamic-pages) |
| `npm run lint` | ESLint via expo |
| `npm run typecheck` | TypeScript `--noEmit` |

## Showcase Example

`examples/showcase/` is a runnable app demonstrating every feature package. It is
regenerated from the template + overlay sources — see [Showcase](/showcase).

See `GOVERNANCE.md` in the repository root for the complete rulebook.
