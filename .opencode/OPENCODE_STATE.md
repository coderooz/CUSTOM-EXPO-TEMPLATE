# OpenCode State Report -- Complete Reference

**Generated:** 2026-06-07 12:49:00
**Project:** `expo-template-coderooz` (`application/`)
**Path:** `C:\Code_Works\HTML_CSS_JS\workProjects\application\expo-template-coderooz`

---

## 0. INTEGRATIONS SUMMARY

This is a consolidated view of every integration, plugin, and capability that OpenCode has access to in this environment.

### 0.1 Active Integrations (Currently Enabled)

| Category | Name | Type | Status | Notes |
|----------|------|------|--------|-------|
| **AI Provider** | `deepseek-v4-flash-free` | Remote HTTP | Active | Default model for all primary agents |
| **AI Provider** | `ollama` (6 local models) | Local (localhost:11434) | Active | `llama3.1:8b`, `qwen2.5-coder:7b/3b/1.5b`, `deepseek-coder:6.7b`, `nomic-embed-text` |
| **MCP Server** | `local-mcp-memory` | local (node) | Active | Persistent multi-agent memory (10+ tools) |
| **MCP Server** | `cloudinary` | SSE (HTTPS) | Active | Asset management, upload, transform, analyze |
| **MCP Server** | `expo` | local (npx) | Active | Expo project management, builds, dev workflows |
| **MCP Server** | `mongodb` | local (npx) | Active | Database management via @modelcontextprotocol/server-everything |
| **MCP Server** | `chrome-devtools` | local (npx) | Active (requires browser with remote debugging) | Attaches to `127.0.0.1:9222` (Ulaa/Chrome) |
| **CLI Tool** | `vercel` | v54.4.1 | Authenticated as `coderooz` (team: `coderooz-projects`) | Deploy, env, logs, link, list |
| **CLI Tool** | `gh` | GitHub CLI | Authenticated as `coderooz` | repo, admin:public_key, gist, read:org |
| **Custom Tool** | `deploy` | TypeScript plugin | Auto-discovered from `~/.config/opencode/tools/deploy.ts` | Vercel deployment |
| **Custom Tool** | `deploy_env` | TypeScript plugin | Auto-discovered | Vercel env var management |
| **Custom Tool** | `deploy_list` | TypeScript plugin | Auto-discovered | Vercel project/deployment list |
| **Custom Tool** | `deploy_logs` | TypeScript plugin | Auto-discovered | Vercel build logs |
| **Custom Tool** | `deploy_link` | TypeScript plugin | Auto-discovered | Link dir to Vercel project |
| **LSP Server** | `typescript-language-server` | stdio | Active | TypeScript/JS diagnostics |
| **Formatter** | `prettier` | Local | Active | 10 file extensions |
| **Documentation** | 29 doc sets at `C:\Code_Works\Docs\` | Local filesystem | Active | 108,500+ files (TypeScript, Next.js, React, Expo, MongoDB, Clerk, shadcn, Cloudinary, etc.) |

### 0.2 All MCPs Active (22 enabled, 0 dormant)

All 22 MCP servers in ``opencode.json`` are now enabled. Previously-dormant entries have been activated as of 2026-06-07 per user request. Servers are loaded by npx; first invocation per session downloads the package (one-time). If a server's underlying service is unavailable (e.g. Chrome not running with remote debugging), the MCP itself still loads but its tools will fail at invocation time.

| Category | Name | Command | Use Case |
|----------|------|---------|----------|
| **Identity** | `agenttrust` | `npx -y @agenttrust/mcp-server` | A2A agent identity & trust |
| **Productivity** | `calendarmcp` | `npx -y @ai.calendarmcp/server` | Calendar management |
| **Social** | `linkedin-mcp` | `npx -y @ai.com.mcp/linkedin` | LinkedIn integration |
| **Discovery** | `skills-search-mcp` | `npx -y @ai.com.mcp/skills-search` | Search AI skills |
| **Finance** | `constellation-finance-mcp` | `npx -y @ai.constellationfinance/constellation-finance-mcp` | Finance operations |
| **Integration** | `cueapi-mcp` | `npx -y @ai.cueapi/mcp` | Cue API |
| **Data** | `dataforb2b-mcp` | `npx -y @ai.dataforb2b/dataforb2b` | B2B data |
| **Data** | `explorium-mcp` | `npx -y @ai.explorium/mcp-explorium` | Explorium data |
| **Stock** | `stock-research-mcp` | `npx -y com.tapetide/stock-research-mcp` | Stock research |
| **Stock** | `stock-market-scan-mcp` | `npx -y com.stockmarketscan/mcp-server` | Stock scanning |
| **Stock** | `xinkuang-china-stock-mcp` | `npx -y ai.smithery/xinkuang-china-stock-mcp` | China stock data |
| **Stock** | `stocksense-mcp` | `npx -y io.github.mikejj-creation/stocksense` | Stock sentiment |
| **Stock** | `stock-scanner-mcp` | `npx -y io.github.yyordanov-tradu/stock-scanner-mcp` | Stock scanner |
| **Image** | `pictomancer-image-processing` | `npx -y ai.pictomancer/image-processing` | AI image processing |
| **Image** | `smithery-gemini-image-mcp` | `npx -y ai.smithery/Artin0123-gemini-image-mcp-server` | Gemini image gen |
| **Image** | `noon-ai-video-anonymization` | `npx -y com.dyndns-server.noon-ai/image-video-anonymization-mcp` | Video anonymization |
| **Image** | `br0ski777-image-generator` | `npx -y io.github.Br0ski777/image-generator` | Image generation |

### 0.3 Work Session Integrations (Established in This Setup)

| Category | Detail |
|----------|--------|
| **MCP Enabled** | All 22 servers activated (5 originally + 17 newly enabled on 2026-06-07): local-mcp-memory, cloudinary, expo, mongodb, chrome-devtools, agenttrust, calendarmcp, linkedin-mcp, skills-search-mcp, constellation-finance-mcp, cueapi-mcp, dataforb2b-mcp, explorium-mcp, stock-research-mcp, stock-market-scan-mcp, xinkuang-china-stock-mcp, stocksense-mcp, stock-scanner-mcp, pictomancer-image-processing, smithery-gemini-image-mcp, noon-ai-video-anonymization, br0ski777-image-generator |
| **Documentation Downloaded** | TypeScript handbook, Stripe, PhonePe, Razorpay, Dynadot (11 files), shadcn/ui (60 components), Chrome DevTools MCP blog |
| **Documentation Sets** | 29 sets registered in `C:\Code_Works\Docs\DOCS_CATALOG.md` (opencode, mcp, npm, github, vercel, clerk-docs, mongo-docs, next.js, react-pdf-site, react, expo, tailwindcss, python, cloudinary, dynadot, seo, mdn-web, flutter, php, deployment, bun, cursor, playwright, shadcn, chrome-devtools, typescript, stripe, phonepe, razorpay) |
| **Vercel** | CLI v54.4.1, 16 projects, deploys/env/logs working |
| **GitHub** | gh CLI, 19 projects at professional-grade standard (LICENSE, CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, CODEOWNERS, dependabot.yml, workflows, issue/PR templates) |
| **Sponsor** | `https://buymeacoffee.com/coderooz` added to all 19 `.github/FUNDING.yml` |
| **Project Agents** | 9 role-based agents (Boss + 8 specialists) in every project's `.opencode/agents/` (171 agent files total) |
| **MCP Memory** | local-mcp-memory used for context persistence across sessions |

---

## 1. Configuration Source

The ``.opencode/`` configuration at the project level is **merged with the global config** at:
```
C:\Users\ranit\.config\opencode\
```

The runtime configuration is loaded from (in order of precedence):
1. ``<project-root>/opencode.jsonc`` (project-specific OpenCode config, if present)
2. ``<project-root>/.opencode/agents/*.md`` (project-level agents)
3. ``C:\Users\ranit\.config\opencode\opencode.json`` (global)
4. ``C:\Users\ranit\.config\opencode\agents/*.md`` (global agents)
5. ``C:\Users\ranit\.config\opencode\commands/*.md`` (global commands)
6. ``C:\Users\ranit\.config\opencode/tools/`` (custom tools, auto-discovered)
7. ``C:\Users\ranit\.config\opencode\skills/*/SKILL.md`` (global skills)
8. ``C:\Users\ranit\.config\opencode\GLOBAL_RULES.md`` (global instructions)
9. ``C:\Users\ranit\.config\opencode\themes/`` (TUI themes)
10. ``C:\Users\ranit\.config\opencode\templates/`` (project templates)

## 2. Global Config (``opencode.json``)

| Setting | Value | Description |
|---------|-------|-------------|
| ``$schema`` | ``https://opencode.ai/config.json`` | JSON schema reference for IDE validation |
| ``username`` | ``Coderooz`` | Display name in TUI/git commits |
| ``shell`` | ``powershell`` | Default shell for bash tool |
| ``logLevel`` | ``INFO`` | Logging verbosity (DEBUG/INFO/WARN/ERROR) |
| ``snapshot`` | ``true`` | Enable conversation snapshots/compaction |
| ``model`` | ``deepseek-v4-flash-free`` | Default model for primary agents |
| ``small_model`` | ``ollama/qwen2.5-coder:3b`` | Default model for subagents and small tasks |
| ``permission`` | ``allow`` | Default permission (allow/deny/ask per tool) |
| ``instructions`` | ``[~/.config/opencode/GLOBAL_RULES.md]`` | Global rules loaded into all agents |

## 3. Providers

| Provider | Type | Configuration |
|----------|------|---------------|
| ``deepseek-v4-flash-free`` | Remote HTTP | (OpenCode default provider) |
| ``ollama`` | Local OpenAI-compatible | ``baseURL: http://localhost:11434/v1`` |

### 3.1 Ollama Provider Configuration

```json
{
  "ollama": {
    "npm": "@ai-sdk/openai-compatible",
    "name": "Ollama (local)",
    "options": { "baseURL": "http://localhost:11434/v1" }
  }
}
```

### 3.2 Ollama Local Models (Installed on This Machine)

| Model | Size | Context | Output | Default Use |
|-------|------|---------|--------|-------------|
| ``ollama/llama3.1:8b`` | 4.9 GB | 128,000 | 4,096 | ``docs-writer`` agent |
| ``ollama/qwen2.5-coder:7b`` | 4.7 GB | 32,000 | 8,192 | ``tester`` agent |
| ``ollama/qwen2.5-coder:3b`` | 1.9 GB | 32,000 | 4,096 | ``small_model`` + ``deployer`` agent |
| ``ollama/qwen2.5-coder:1.5b-base`` | 986 MB | 32,000 | 2,048 | (available, not bound to agent) |
| ``ollama/deepseek-coder:6.7b`` | 3.8 GB | 32,000 | 4,096 | ``reviewer`` agent |
| ``ollama/nomic-embed-text`` | 274 MB | (embedding) | (embedding) | (available, not in opencode.json) |

**Ollama service status:** Running (PID 13660 at report time)
**Ollama path:** ``C:\Users\ranit\AppData\Local\Programs\Ollama\ollama.exe``
**Models manifest path:** ``C:\Users\ranit\.ollama\models\manifests\``

**To register ``nomic-embed-text`` in opencode.json**, add:
```json
"nomic-embed-text": {
  "name": "Nomic Embed Text (embedding)",
  "limit": { "context": 8192, "output": 0 }
}
```

## 4. Global Agents (9 total)

### 4.1 File-Based Agents (``C:\Users\ranit\.config\opencode\agents\``)

| Agent | Mode | Model | Temp | Steps | Color | Description |
|-------|------|-------|------|-------|-------|-------------|
| ``builder`` | primary | (default) | 0.3 | 50 | -- | Default development agent -- all tools enabled |
| ``planner`` | primary | (default) | 0.7 | 30 | -- | Analysis & planning -- read-only (edit/write deny, bash ask) |
| ``reviewer`` | subagent | ``ollama/deepseek-coder:6.7b`` | 0.1 | 20 | ``#ef4444`` | Code reviewer (edit/write deny) |
| ``tester`` | subagent | ``ollama/qwen2.5-coder:7b`` | 0.1 | 40 | ``#f59e0b`` | Writes & runs tests |
| ``docs-writer`` | subagent | ``ollama/llama3.1:8b`` | 0.3 | 25 | ``#3b82f6`` | Writes README, CHANGELOG, JSDoc (bash ask) |

### 4.2 Inline Agents (defined in ``opencode.json``)

| Agent | Mode | Model | Temp | Steps | Color | Description |
|-------|------|-------|------|-------|-------|-------------|
| ``build`` | primary | ``deepseek-v4-flash-free`` | 0.3 | 50 | -- | Default dev agent with full access; can delegate to 7 sub-agents |
| ``plan`` | primary | ``deepseek-v4-flash-free`` | 0.7 | 30 | -- | Read-only analysis (edit deny, write deny, bash ask) |
| ``devops`` | subagent | ``deepseek-v4-flash-free`` | 0.1 | 50 | ``#000000`` | DevOps orchestrator (vercel/gh/git/npm run allow) |
| ``deployer`` | subagent | ``ollama/qwen2.5-coder:3b`` | 0.1 | 20 | ``#6366f1`` | Vercel deployer (vercel * allow, edit/write deny) |

### 4.3 Agent Configuration Schema

Each agent supports these YAML/JSON fields:
- ``description`` -- human-readable purpose
- ``mode`` -- ``primary`` (user-invocable) or ``subagent`` (Task-tool-only)
- ``model`` -- model name with provider prefix
- ``temperature`` -- 0.0 to 1.0 (lower = more deterministic)
- ``steps`` -- max tool invocations per turn (30-100 typical)
- ``color`` -- TUI accent color (hex)
- ``permission`` -- per-tool permission overrides
- ``prompt`` -- system prompt (alternative to .md file body)
- ``tools`` -- tool allowlist (subset of: read, glob, grep, edit, write, bash, webfetch, websearch, question, todowrite, skill, lsp, task)
- ``color`` -- TUI badge color

### 4.4 Permission Tools (13 types)

| Tool | Description | Typical Values |
|------|-------------|----------------|
| ``read`` | Read file contents | allow/deny/ask |
| ``glob`` | File pattern matching | allow/deny/ask |
| ``grep`` | Content search | allow/deny/ask |
| ``edit`` | Edit existing files | allow/deny/ask |
| ``write`` | Create new files | allow/deny/ask |
| ``bash`` | Run shell commands | allow/deny/ask, or ``{"*": "ask", "git *": "allow"}`` for granular |
| ``webfetch`` | HTTP GET | allow/deny/ask |
| ``websearch`` | Web search | allow/deny/ask |
| ``question`` | Ask user clarification | allow/deny/ask |
| ``todowrite`` | Update todo list | allow/deny/ask |
| ``skill`` | Load a skill | allow/deny/ask |
| ``lsp`` | Use language server | allow/deny/ask |
| ``task`` | Delegate to subagent | allow/deny/ask, or ``{"*": "deny", "coder": "allow"}`` for granular |
| ``external_directory`` | Access outside cwd | ``{"<path>": "allow"}`` allowlist |

## 5. Global MCP Servers (22 enabled, 0 dormant)

All 22 MCP servers in the global ``opencode.json`` are now ``enabled: true`` (updated 2026-06-07). Servers are grouped by category.

### 5.1 Originally Enabled (5)

#### 5.1.1 ``local-mcp-memory`` (local, node)
- **Command:** ``node C:\Code_Works\HTML_CSS_JS\workProjects\website\local-mcp-memory\mcp-server.js``
- **Timeout:** 30s
- **Environment:** ``MCP_AGENT=opencode``, ``MCP_SCOPE=global``
- **Resilience:**
  - ``enabled: true``
  - ``maxRetries: 5``
  - ``baseDelay: 200`` ms
  - ``maxDelay: 3200`` ms
  - ``fallbackPorts: [4000, 3000, 5000, 8080, 8888]``
  - ``healthCheckInterval: 30000`` ms
- ``autoReconnect: true``
- ``validateOnStartup: true``
- **Tools provided (10+):**
  - ``store_context`` / ``search_context`` / ``update_context`` / ``get_full_context`` / ``get_connected_context``
  - ``create_task`` / ``update_task`` / ``fetch_tasks`` / ``assign_task``
  - ``create_project_map`` / ``fetch_project_map``
  - ``record_activity`` / ``fetch_activity``
  - ``create_issue`` / ``fetch_issues`` / ``resolve_issue``
  - ``send_message`` / ``request_messages``
  - ``register_agent`` / ``list_agents`` / ``heartbeat_agent``
  - ``acquire_resource_lock`` / ``release_resource_lock`` / ``fetch_resource_locks``
  - ``log_action`` / ``optimize_memory`` / ``get_logs`` / ``fetch_metrics``
  - ``play_notification_sound``
  - ``open_browser`` / ``close_browser`` / ``navigate_to_url`` / etc. (browser automation subset)

#### 5.1.2 ``cloudinary`` (SSE)
- **URL:** ``https://asset-management.mcp.cloudinary.com/mcp``
- **Timeout:** 60s
- **Headers:** ``User-Agent: OpenCode``
- **Purpose:** Asset management, upload, transform, analyze, search

#### 5.1.3 ``expo`` (local, npx)
- **Command:** ``npx -y local-expo-mcp``
- **Timeout:** 30s
- **Purpose:** Expo project management, EAS builds, dev workflows
- **Tools:** ``expo_project_inspect``, ``expo_metro_start``, ``expo_metro_status``, ``expo_metro_logs_recent``, ``expo_metro_restart``, ``expo_android_run``, ``expo_device_list``, ``expo_device_screenshot``, etc.

#### 5.1.4 ``mongodb`` (local, npx)
- **Command:** ``npx -y @modelcontextprotocol/server-everything``
- **Timeout:** 30s
- **Purpose:** MongoDB database management (note: this is the "everything" demo server, not MongoDB-specific; it provides echo, add, sum, etc.)

#### 5.1.5 ``chrome-devtools`` (local, npx, needs running browser)
- **Command:** ``npx -y chrome-devtools-mcp@latest --browser-url=http://127.0.0.1:9222``
- **Timeout:** 60s
- **Status:** Enabled. Requires a browser (Chrome/Edge/Ulaa) launched with ``--remote-debugging-port=9222`` to provide a target. The MCP itself loads unconditionally; tools fail if no browser is listening.
- **Tools (when target available):** ``chrome-devtools_new_page``, ``chrome-devtools_navigate_page``, ``chrome-devtools_click``, ``chrome-devtools_take_snapshot``, ``chrome-devtools_evaluate_script``, ``chrome-devtools_list_console_messages``, ``chrome-devtools_performance_start_trace``, ``chrome-devtools_lighthouse_audit``, etc.

### 5.2 Newly Enabled (17, activated 2026-06-07)

See section 0.2 for the full table with commands and use cases. Categories:

| Category | Count | Servers |
|----------|-------|---------|
| Identity / Productivity / Social / Discovery | 4 | ``agenttrust``, ``calendarmcp``, ``linkedin-mcp``, ``skills-search-mcp`` |
| Finance / Integration / Data | 4 | ``constellation-finance-mcp``, ``cueapi-mcp``, ``dataforb2b-mcp``, ``explorium-mcp`` |
| Stock market | 5 | ``stock-research-mcp``, ``stock-market-scan-mcp``, ``xinkuang-china-stock-mcp``, ``stocksense-mcp``, ``stock-scanner-mcp`` |
| Image / video | 4 | ``pictomancer-image-processing``, ``smithery-gemini-image-mcp``, ``noon-ai-video-anonymization``, ``br0ski777-image-generator`` |

**Note:** The 17 newly-enabled servers are loaded via ``npx -y ...`` on first use. They download the package once (cached in ``%APPDATA%\npm-cache``) and then stay resident. If a particular server's external service is unavailable, the MCP still loads but tool invocations will return errors at call time.

## 6. Global Skills (8 skills)

Skills directory: ``C:\Users\ranit\.config\opencode\skills\``

| Skill | Path | Purpose |
|-------|------|---------|
| ``documentation`` | ``skills/documentation/SKILL.md`` | Create and maintain project documentation (README, CHANGELOG, guides) |
| ``function-documentation`` | ``skills/function-documentation/SKILL.md`` | Document functions, components, hooks, utilities with JSDoc/TSDoc |
| ``github-repository`` | ``skills/github-repository/SKILL.md`` | Manage GitHub repository details, tags, releases, metadata |
| ``milestones-issues`` | ``skills/milestones-issues/SKILL.md`` | Track project progress with milestones and issues |
| ``nextjs-deep-test-agent`` | ``skills/nextjs-deep-test-agent/SKILL.md`` | Full-spectrum behavioral, functional, adversarial testing for Next.js apps |
| ``project-architecture`` | ``skills/project-architecture/SKILL.md`` | Generate and enforce scalable project architecture |
| ``project-test-auditor`` | ``skills/project-test-auditor/SKILL.md`` | Auto-detect and test web/API/application projects |
| ``project-workflow`` | ``skills/project-workflow/SKILL.md`` | Standard project development workflow (start -> develop -> complete) |

## 7. Global Commands (7 inline + 1 file-based)

### 7.1 Inline Commands (in ``opencode.json``)

| Command | Description | Agent | Subtask |
|---------|-------------|-------|---------|
| ``fix`` | Analyze project, fix errors, ensure runs correctly | ``build`` | no |
| ``analyze`` | Analyze codebase structure, dependencies, issues | ``plan`` | no |
| ``review`` | Run git diff and analyze changes | ``reviewer`` | yes |
| ``test`` | Detect framework, run tests, fix failures | ``tester`` | yes |
| ``deploy`` | Deploy to Vercel (preview or production) | ``devops`` | no |
| ``env`` | Manage Vercel environment variables | ``devops`` | no |
| ``logs`` | Fetch Vercel deployment logs | ``deployer`` | yes |

### 7.2 File-Based Commands

| Command | Path | Description |
|---------|------|-------------|
| ``fix-project`` | ``C:\Users\ranit\.config\opencode\commands\fix-project.md`` | Analyze the entire project, identify errors, fix issues, ensure build passes, validate functionality |

### 7.3 Command Configuration Schema

Each command supports:
- ``template`` -- prompt template (supports ``{{input}}`` and ``$ARGUMENTS``)
- ``description`` -- shown in ``/`` command palette
- ``agent`` -- which agent executes the command
- ``subtask`` -- if true, runs as a subagent (no user interaction)

## 8. Custom Tools (``C:\Users\ranit\.config\opencode\tools\``)

Auto-discovered TypeScript modules in this directory export their tools.

### 8.1 ``deploy.ts`` -- Vercel Deployment Plugin (5 tools)

| Tool | Function |
|------|----------|
| ``deploy`` | Deploy project to Vercel (preview or production) |
| ``deploy_env`` | Manage Vercel env vars (list, add, remove) |
| ``deploy_list`` | List recent deployments or all Vercel projects |
| ``deploy_logs`` | Fetch build/deployment logs from latest deployment |
| ``deploy_link`` | Link current directory to existing Vercel project |

## 9. Formatter

| Formatter | Extensions |
|-----------|-----------|
| ``prettier`` | ``.ts``, ``.tsx``, ``.js``, ``.jsx``, ``.json``, ``.css``, ``.md``, ``.yaml``, ``.yml``, ``.html`` |

Formatter can be triggered via the ``format`` tool or on file save.

## 10. LSP (Language Server Protocol)

| LSP | Command | Extensions | Purpose |
|-----|---------|-----------|---------|
| ``typescript`` | ``typescript-language-server --stdio`` | ``.ts``, ``.tsx``, ``.js``, ``.jsx`` | Type diagnostics, autocomplete, go-to-definition, refactoring |

LSP servers provide: diagnostics, hover, completion, definition, references, rename, code actions.

## 11. Watcher

**Ignore patterns:**
- ``node_modules``
- ``.git``
- ``dist``
- ``build``
- ``.next``
- ``coverage``
- ``.expo``

The watcher triggers re-indexing and re-evaluating affected files when source changes occur.

## 12. Compaction

Compaction reduces conversation history to fit within context limits. (Settings in some projects, e.g. ``nextjs-template`` and ``LocalCart``.)

```jsonc
"compaction": {
  "auto": true,
  "prune": true,
  "reserved": 10000
}
```

- ``auto`` -- automatically compact when context is full
- ``prune`` -- remove old tool outputs
- ``reserved`` -- tokens reserved for system + history

## 13. Chrome DevTools MCP

- **Configured at:** ``C:\Users\ranit\.config\opencode\opencode.json`` line ~247
- **Command:** ``npx -y chrome-devtools-mcp@latest --browser-url=http://127.0.0.1:9222``
- **Status:** Enabled (``enabled: true``)
- **Runtime requirement:** A browser with remote debugging must be listening on ``127.0.0.1:9222`` for the MCP tools to work. The MCP itself loads unconditionally regardless of browser availability.
- **Browser compatibility note:** ``chrome-devtools-mcp`` officially supports Chrome/Edge stable/beta/canary/dev channels. Zoho Ulaa (user's primary browser) provides a Chromium-based remote debugging endpoint at ``ulaa://inspect#remote-debugging`` and is functional in practice but not officially listed.
- **To use:**
  1. Launch a Chromium-based browser with ``--remote-debugging-port=9222`` (Chrome, Edge, or Ulaa)
  2. The MCP will auto-attach to ``127.0.0.1:9222``
  3. Use ``chrome-devtools_*`` tools from any agent
- **Context saved to:** MCP memory (id ``6b6ce154-e972-4444-9a48-0bac09adb1a9``)
- **Capabilities when target available:** Page navigation, click, fill, screenshot, evaluate JavaScript, take snapshots, list network requests, list console messages, performance traces, Lighthouse audits, heap snapshots, mobile emulation, network throttling, CPU throttling

## 14. Local Documentation Access (``C:\Code_Works\Docs\``)

All agents have access to **29 documentation sets** at ``C:\Code_Works\Docs\``:

| # | Folder | Size | Contents |
|---|--------|------|----------|
| 1 | ``opencode/`` | 33 files | OpenCode CLI config, TUI, agents, MCP, permissions, SDK |
| 2 | ``mcp/`` | 70 pages | MCP protocol spec (2025-11-25), tools, resources, prompts |
| 3 | ``npm/`` | 185 pages | npm CLI v11, configuring, using, packages, orgs |
| 4 | ``github/`` | 78 pages | Actions, Repositories, REST API, Webhooks, Pages |
| 5 | ``vercel/`` | 540+ files | Vercel platform, CLI, REST API, KV, Postgres, Blob, AI |
| 6 | ``clerk-docs/`` | 1,607 files | Clerk auth documentation (MDX) |
| 7 | ``mongo-docs/`` | 104,045 files | MongoDB documentation (MDX) |
| 8 | ``next.js/`` | 663 files | Next.js App Router, pages, architecture, errors |
| 9 | ``react-pdf-site/`` | 234 files | react-pdf documentation site |
| 10 | ``react/`` | 77 files | React web + React Native v0.85 (hooks, components, APIs) |
| 11 | ``expo/`` | 114 files | Expo SDK, EAS, Router, Modules |
| 12 | ``tailwindcss/`` | 200 files | Tailwind CSS v4 -- complete |
| 13 | ``python/`` | 1,158 files | Python 3.14.5 full HTML + markdown |
| 14 | ``cloudinary/`` | 14 files | Cloudinary APIs, MCP server, DAM, MediaFlows |
| 15 | ``dynadot/`` | 11 files | Domain registrar: API, DNS, SSL, email |
| 16 | ``seo/`` | 11 files | Schema.org, Google Search Central, MDN SEO |
| 17 | ``mdn-web/`` | 31 files | HTML, CSS, JavaScript fundamentals |
| 18 | ``flutter/`` | 27 files | Flutter widgets, layout, state management |
| 19 | ``php/`` | 34 files | PHP language, PDO, security, web concepts |
| 20 | ``deployment/`` | 24 files | Docker, Netlify, GitHub Pages, Vercel |
| 21 | ``bun/`` | 315 files | Bun 1.3.14 runtime, bundler, pm, test |
| 22 | ``cursor/`` | 163 files | Cursor AI editor docs |
| 23 | ``playwright/`` | 198 files | Playwright E2E testing (raw HTML) |
| 24 | ``shadcn/`` | 60 files | shadcn/ui 60 Radix components |
| 25 | ``chrome-devtools/`` | 1 file | Chrome DevTools MCP blog |
| 26 | ``typescript/`` | 1 file | TypeScript handbook |
| 27 | ``stripe/`` | 1 file | Stripe documentation |
| 28 | ``phonepe/`` | 1 file | PhonePe documentation |
| 29 | ``razorpay/`` | 1 file | Razorpay documentation |

**Total:** ~108,500+ files

**Master indexes:**
- ``C:\Code_Works\Docs\DOCS_CATALOG.md`` -- complete catalog
- ``C:\Code_Works\Docs\DOCS_INDEX.md`` -- quick-reference index

## 15. Global Rules

Path: ``C:\Users\ranit\.config\opencode\GLOBAL_RULES.md``

Topics covered:
- **Execution safety** (no destructive commands without confirmation)
- **Code Standards** (TS/JS/React/Next.js/React Native)
- **Debugging** (logs and LSP first, identify root cause)
- **Commit conventions** (conventional commits, one logical change per commit)
- **Testing** (always validate outputs, write new tests for bug fixes)
- **MCP & Tooling** (use MCP for cross-session context)
- **Documentation** (update AGENTS.md, write JSDoc/TSDoc)
- **Security** (no secrets in code, parameterized queries, rate limits)
- **Project Navigation** (read AGENTS.md first, use project map)

## 16. CLI Tools Available (pre-authenticated)

| CLI | Version | User/Team | Auth Status | Capabilities |
|-----|---------|-----------|-------------|--------------|
| ``vercel`` | v54.4.1 | ``coderooz`` / ``coderooz-projects`` (16 projects) | Authenticated | deploy, env, logs, list, link, whoami, inspect |
| ``gh`` | Latest | ``coderooz`` | Authenticated | Scopes: ``repo``, ``admin:public_key``, ``gist``, ``read:org``. Missing: ``workflow`` |
| ``git`` | Standard | -- | Configured | Standard git operations |
| ``npm`` / ``npx`` | Latest | -- | -- | Package management, script execution |

## 17. MCP Memory System

``local-mcp-memory`` MCP server is enabled and provides cross-session persistence.

### 17.1 Context Management
- ``store_context`` -- save context with type, importance, tags, related contexts
- ``search_context`` -- query by text and lifecycle
- ``update_context`` -- modify with optimistic-concurrency (expectedUpdatedAt/expectedVersion)
- ``get_full_context`` -- retrieve context + related memory + tasks + issues + actions + versions
- ``get_connected_context`` -- get context + related items

### 17.2 Task Management
- ``create_task`` -- title, description, assigned_to, priority (1-5), dependencies, status, required_capabilities
- ``update_task`` -- status (pending/in_progress/blocked/completed), result, blocker
- ``fetch_tasks`` -- filter by assigned_to, status, created_by
- ``assign_task`` -- claim/assign

### 17.3 Project Mapping
- ``create_project_map`` -- structured entry for a file/folder/module/service
- ``fetch_project_map`` -- by file_path, type, query, limit

### 17.4 Activity Stream
- ``record_activity`` -- append live activity
- ``fetch_activity`` -- by agent, type, related_task, limit

### 17.5 Issue Tracking
- ``create_issue`` -- title, description, type, related contexts/tasks
- ``fetch_issues`` -- by status, type, related_task
- ``resolve_issue`` -- mark resolved with resolution

### 17.6 Inter-Agent Messaging
- ``send_message`` -- to_agent, content, type (info/warning/handoff/status), related_task
- ``request_messages`` -- fetch for current agent

### 17.7 Agent Registry
- ``register_agent`` -- name, role, capabilities, agent_id
- ``list_agents`` -- all registered
- ``heartbeat_agent`` -- keep registry status fresh

### 17.8 Resource Locking
- ``acquire_resource_lock`` -- soft lock for shared resources
- ``release_resource_lock``
- ``fetch_resource_locks``

### 17.9 Observability
- ``log_action`` -- actionType, target, summary, contextRefs
- ``optimize_memory`` -- run memory optimization
- ``get_logs`` -- by type (error/info), limit
- ``fetch_metrics`` -- by metric_type, name, limit

### 17.10 Browser Automation (subset)
- ``open_browser`` / ``close_browser``
- ``navigate_to_url`` / ``reload_page`` / ``go_back`` / ``go_forward``
- ``click_element`` / ``fill_input`` / ``fill_form`` / ``wait_for_selector``
- ``get_page_content`` / ``get_page_title`` / ``get_element_text`` / ``get_elements``
- ``take_screenshot`` (page or element, fullPage option)
- ``evaluate_javascript``
- ``set_cookies`` / ``get_cookies`` / ``clear_cookies``
- ``set_viewport``
- ``play_notification_sound``

## 18. TUI / UI Features

OpenCode provides a Terminal User Interface with:

### 18.1 Themes
- ``C:\Users\ranit\.config\opencode\themes\`` -- custom TUI themes
- Default + custom theme support

### 18.2 TUI Capabilities
- Multi-pane chat interface
- File tree sidebar
- Diff viewer
- Command palette (``/`` prefix)
- Agent switcher
- Tool call inspector
- Conversation history navigation
- Permission prompts (allow/deny/ask)
- Notification sound
- Real-time streaming output

## 19. Available OpenCode Capabilities (Reference)

OpenCode supports the following capabilities. Some are configured and active; others are available but not yet wired up.

### 19.1 Tool Capabilities (Built-in)
- ``bash`` -- shell command execution with permission gating
- ``read`` -- file reading with line offsets
- ``write`` -- file creation/overwrite
- ``edit`` -- exact string replacement in files
- ``glob`` -- file pattern matching
- ``grep`` -- regex content search (ripgrep)
- ``webfetch`` -- HTTP/HTTPS GET with markdown conversion
- ``websearch`` -- search engine query
- ``question`` -- ask user clarifying questions (multiple-choice)
- ``todowrite`` -- manage todo list with status
- ``skill`` -- load SKILL.md content
- ``lsp`` -- query language server (hover, definition, references, etc.)
- ``task`` -- delegate to subagent (with permission gating)

### 19.2 Custom Tool Capabilities
- Auto-discover TypeScript modules in ``~/.config/opencode/tools/``
- Each module exports 1+ tool functions with parameter schemas
- Tools are first-class: agents can invoke them like built-in tools
- Current: ``deploy.ts`` with 5 Vercel tools

### 19.3 GitHub Integration (via ``gh`` CLI)
- Issue create/read/update/close/comment
- PR create/read/review/checkout/merge
- Release management
- Label management
- Repo search
- API access (``gh api``)
- Authenticated as ``coderooz``

### 19.4 Vercel Integration (via ``vercel`` CLI + ``deploy.ts``)
- Deploy (preview/production)
- Environment variable management
- Build logs
- Project listing
- Project linking

### 19.5 Local Ollama Integration
- 6 installed models
- OpenAI-compatible API
- 128K context (llama3.1) to 32K (qwen2.5-coder)
- Embedding support (nomic-embed-text)
- Cost-free local inference

### 19.6 Memory/Context System
- Cross-session memory via local-mcp-memory
- Project maps
- Task tracking
- Issue tracking
- Activity stream
- Agent registry
- Resource locks
- Action logging

### 19.7 Snapshot/Compaction
- Conversation snapshots
- Auto-compaction at context limit
- Manual compaction
- Reserved token budget

### 19.8 Permission System (13 tools)
- Per-tool allow/deny/ask
- Granular bash patterns (``{"*": "ask", "git *": "allow"}``)
- Granular task delegation (``{"*": "deny", "coder": "allow"}``)
- External directory allowlist

### 19.9 Skills System
- 8 global skills
- Project-level skills via ``.opencode/skills/``
- SKILL.md format with frontmatter
- Auto-injected when relevant

### 19.10 Commands System
- 7 global inline + 1 file-based
- Project-level commands in ``.opencode/commands/``
- ``{{input}}`` and ``$ARGUMENTS`` template substitution
- Subagent execution mode

### 19.11 Agent System
- 9 global agents
- 9 project agents (per project, identical)
- Primary + subagent modes
- Per-agent model/temperature/steps/permissions/tools
- Markdown file format with YAML frontmatter

### 19.12 MCP (Model Context Protocol) System
- 22 enabled, 0 dormant (all activated 2026-06-07)
- Multiple types: ``local`` (stdio), ``sse`` (HTTPS), ``stdio``
- Resilience: retries, delays, fallback ports, health checks, auto-reconnect
- Environment variable injection
- Timeout configuration
- New servers download on first use via ``npx -y``; cached afterwards

### 19.13 LSP (Language Server Protocol) System
- 1 configured: typescript-language-server
- Extensible: add more LSPs for other languages
- Diagnostics, hover, completion, definition, references, rename, code actions

### 19.14 Formatter System
- 1 configured: prettier
- Auto-format on save (optional)
- Per-extension file matching

### 19.15 Watcher System
- File system monitoring
- Ignore patterns (node_modules, .git, dist, etc.)
- Triggers re-indexing and re-evaluation

### 19.16 Documentation Access
- 29 local doc sets (~108,500 files)
- Read-only file system access
- Cross-reference for code generation
- Validation against authoritative sources

### 19.17 Browser Automation
- 4 sources of browser tools:
  1. chrome-devtools MCP (active, requires browser with --remote-debugging-port=9222)
  2. local-mcp-memory browser subset
  3. Playwright (in some projects via npx; protfolio-next has dedicated Playwright MCP)
  4. Chrome DevTools Protocol (manual via remote debugging)

### 19.18 Theming
- Custom TUI themes
- Per-agent color coding
- Status indicator colors

### 19.19 Webhooks / Sharing / GitHub App
- OpenCode GitHub App installed at ``github.com/apps/opencode-agent``
- Triggers ``/opencode`` in issues/PRs via GitHub Actions
- Share session feature (opencode.ai/share)

### 19.20 Server Mode
- OpenCode can run as HTTP server (opencode server)
- SDK for programmatic access (TypeScript, Python)
- ACP (Agent Communication Protocol)
- Enterprise SSO support

## 20. Project-Specific Section

See below for this project's specifics.

---

# (Project-Specific Content Follows in Next Section)


---

## 20. Project: expo-template-coderooz

| Field | Value |
|-------|-------|
| **Path** | `C:\Code_Works\HTML_CSS_JS\workProjects\application\expo-template-coderooz` |
| **Group** | `application/` |
| **Type** | Expo Template / TypeScript |
| **Description** | A production-ready Expo starter template with TypeScript, NativeWind, Drawer navigation |

### 20.1 Project-Level Config Files

| File | Present | Purpose |
|------|---------|---------|
| `.opencode/agents/*.md` | Yes (9 files) | Role-based OpenCode agent team |
| `.opencode/OPENCODE_STATE.md` | Yes (this file) | Full OpenCode state report |
| `opencode.jsonc` | No | Not present |
| `mcp.json` | No | Not present |
| `.mcp.json` | No | Not present |
| `package.json` | Yes | Tech stack defined (see 20.3) |

### 20.2 `opencode.jsonc`

Not present. This project uses **only the global OpenCode configuration** plus its standard agents in `.opencode/agents/`.

### 20.3 Tech Stack (from `package.json`)

**Package name:** `expo-template-coderooz`

**Runtime dependencies (35):**
- `@expo/metro-runtime`
- `@expo/vector-icons`
- `@react-native-async-storage/async-storage`
- `@react-native-masked-view/masked-view`
- `@react-navigation/bottom-tabs`
- `@react-navigation/drawer`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/stack`
- `babel-preset-expo`
- `expo`
- `expo-application`
- `expo-auth-session`
- `expo-crypto`
- `expo-dev-client`
- `expo-device`
- `expo-linking`
- `expo-navigation-bar`
- `expo-notifications`
- `expo-splash-screen`
- `expo-sqlite`
- `expo-status-bar`
- `expo-symbols`
- `expo-updates`
- `nativewind`
- `prettier-plugin-tailwindcss`
- `react`
- `react-native`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-safe-area-context`
- `react-native-screens`
- `react-native-worklets`
- `tailwindcss`
- `tailwindcss-animate`

**Dev dependencies (4):**
- `@types/react`
- `eslint`
- `eslint-config-expo`
- `typescript`

### 20.4 Project-Level Agents (`.opencode/agents/`)

Every project I set up has this standard 9-agent roster (in addition to the 9 global agents and any project-level agents in `opencode.jsonc`):

| # | Agent | Mode | Role |
|---|-------|------|------|
| 1 | `project-lead.md` | primary | **Boss Agent** -- orchestrates the team, delegates, reviews, reports |
| 2 | `coder.md` | subagent | Implements code, refactors |
| 3 | `reviewer.md` | subagent | Reviews code for quality, security, standards |
| 4 | `tester.md` | subagent | Writes and runs unit/integration/e2e tests |
| 5 | `documentor.md` | subagent | Writes README, CHANGELOG, JSDoc/TSDoc |
| 6 | `devops.md` | subagent | CI/CD, deployment, GitHub Actions |
| 7 | `bug-fixer.md` | subagent | Diagnoses and fixes bugs |
| 8 | `architect.md` | subagent | Designs architecture, makes tech decisions |
| 9 | `researcher.md` | subagent | Searches local + web documentation |

All agents have references to the local documentation at `C:\Code_Works\Docs\` (29 tech-stack doc sets).

**Agent file count in this project:** 9 files

### 20.5 Local Documentation Access

All agents in this project can read from: `C:\Code_Works\Docs\`

**Relevant doc sets for this project:**
- `opencode/`
- `expo/`
- `react/`
- `tailwindcss/`
- `npm/`
- `github/`
- `vercel/`

### 20.6 Project-Specific Notes

- **MCP servers available** (from global): `local-mcp-memory` (always), `cloudinary` (always), `expo` (always, particularly useful for Expo projects), `mongodb` (always, useful for DB projects)
- **Default agents available**: `build`, `plan` (primary), `devops`, `deployer` (subagent) + the 5 global agents in `~/.config/opencode/agents/`
- **Project GitHub URL**: (configured in `.github/` files; push to remote to activate)

---

# END OF REPORT
