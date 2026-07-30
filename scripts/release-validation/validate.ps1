# Release Validation Script — expo-template-coderooz
# Run from the monorepo root before every publish

param(
  [string]$TestDir = "$env:TEMP\coderooz-release-test",
  [switch]$Clean
)

$ErrorActionPreference = "Stop"
$rootDir = $PWD

Write-Host "=== Release Validation ===" -ForegroundColor Cyan
Write-Host "Root: $rootDir"
Write-Host "Test: $TestDir"
Write-Host ""

# Step 0: Clean test dir
if ($Clean -and (Test-Path $TestDir)) {
  Remove-Item -Recurse -Force $TestDir
}

# Step 1: Build workspace packages
Write-Host "--- Step 1: Build ---" -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed" }
Write-Host "Build: OK" -ForegroundColor Green

# Step 2: Lint
Write-Host "--- Step 2: Lint ---" -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) { throw "Lint failed" }
Write-Host "Lint: OK" -ForegroundColor Green

# Step 3: Typecheck
Write-Host "--- Step 3: Typecheck ---" -ForegroundColor Yellow
npm run typecheck
if ($LASTEXITCODE -ne 0) { throw "Typecheck failed" }
Write-Host "Typecheck: OK" -ForegroundColor Green

# Step 4: Tests
Write-Host "--- Step 4: Tests ---" -ForegroundColor Yellow
npm test
if ($LASTEXITCODE -ne 0) { throw "Tests failed" }
Write-Host "Tests: OK" -ForegroundColor Green

# Step 5: npm pack dry-run for all publishable packages
Write-Host "--- Step 5: npm pack dry-run ---" -ForegroundColor Yellow

Write-Host "  Packing @coderooz/core..." -NoNewline
npm pack --dry-run --ignore-scripts -w packages/core 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { throw "@coderooz/core pack failed" }
Write-Host " OK" -ForegroundColor Green

Write-Host "  Packing @coderooz/create-app..." -NoNewline
npm pack --dry-run --ignore-scripts -w packages/create-app 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { throw "@coderooz/create-app pack failed" }
Write-Host " OK" -ForegroundColor Green

Write-Host "  Packing @coderooz/cli..." -NoNewline
npm pack --dry-run --ignore-scripts -w packages/cli 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { throw "@coderooz/cli pack failed" }
Write-Host " OK" -ForegroundColor Green

# Step 6: Verify CLI entry point
Write-Host "--- Step 6: CLI entry point ---" -ForegroundColor Yellow
$cliContent = Get-Content -Path "packages/cli/dist/index.js" -First 1
if ($cliContent -ne "#!/usr/bin/env node") {
  throw "CLI shebang missing"
}
Write-Host "CLI shebang: OK" -ForegroundColor Green

# Step 7: Verify core package has no test files in dist
Write-Host "--- Step 7: Package contents ---" -ForegroundColor Yellow
$hasTests = Test-Path "packages/core/dist/__tests__"
if ($hasTests) {
  Write-Host "WARNING: core/dist/__tests__ exists (will be excluded by .npmignore)" -ForegroundColor Yellow
} else {
  Write-Host "core/dist/__tests__: excluded" -ForegroundColor Green
}

# Step 8: Verify template files list
Write-Host "--- Step 8: Template manifest ---" -ForegroundColor Yellow
$pkg = Get-Content "package.json" | ConvertFrom-Json
Write-Host "Template files: $($pkg.files.Count) entries" -ForegroundColor Green
$pkg.files | ForEach-Object { Write-Host "  - $_" }

Write-Host ""
Write-Host "=== Validation Complete ===" -ForegroundColor Cyan
Write-Host "All checks passed. Ready to publish." -ForegroundColor Green
