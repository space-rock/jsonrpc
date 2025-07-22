# GitHub Actions Workflow Documentation

## Release Please & Publish Workflow

The `.github/workflows/publish.yml` workflow handles automated releases and npm publishing for the monorepo packages.

### Recent Fixes Applied

#### ✅ **Release Please Configuration Issues**

- **Fixed Pull Request Title Patterns**: Removed problematic `${component}` and `${scope}` variables that were causing errors
- **Bootstrapped Release Tags**: Created initial `jsonrpc-types-v0.2.0` and `jsonrpc-client-v0.2.0` tags to establish release history
- **Simplified Configuration**: Used unified pull request titles to avoid component/scope parsing issues
- **Unified PR Strategy**: Set `separate-pull-requests: false` for simpler release management

#### ✅ **Fixed Common Release-Please Errors**

- **"Bad pull request title" errors**: Fixed by simplifying title pattern to `"chore: release ${version}"`
- **"Missing ${scope}/${component}" warnings**: Removed problematic placeholders from configuration
- **"Untagged merged release PRs" blocking**: Resolved by creating proper initial release tags
- **Missing release history**: Bootstrapped with v0.2.0 tags matching current package versions

### Workflow Overview

The workflow consists of three main jobs:

1. **`release-please`** - Creates releases and updates versions
2. **`debug-outputs`** - Provides debugging information for troubleshooting
3. **`build-and-publish`** - Builds packages and publishes them to npm

### Key Features

#### ✅ Modern GitHub Actions

- Uses latest action versions (`@v4`)
- Includes `id-token: write` permission for npm provenance
- Uses PNPM v10.13.1 with proper caching

#### ✅ Robust Error Handling

- Validates package.json existence and naming
- Checks for dist directory before publishing
- Provides detailed error messages and logging
- Fails fast on any validation errors

#### ✅ Conditional Publishing

- Only runs when releases are actually created
- Publishes packages individually based on release-please outputs
- Skips packages that weren't released

#### ✅ Comprehensive Debugging

- Debug job shows all release-please outputs
- Detailed logging in build verification steps
- GitHub Actions summary with publishing status

### Release Please Configuration

The workflow uses:

- **Config file**: `release-please-config.json` - Defines package structure and release behavior
- **Manifest file**: `.release-please-manifest.json` - Tracks current package versions

### Package Structure

The workflow handles two packages:

- `@space-rock/jsonrpc-types` (packages/types)
- `@space-rock/jsonrpc-client` (packages/client)

Each package is:

- Built with tsup (ESM + CJS, code splitting, tree shaking)
- Validated before publishing
- Published with public access to npm

### Workflow Outputs

The release-please job provides these outputs:

- `releases_created` - Whether any releases were created
- `types_release_created` - Whether the types package was released
- `client_release_created` - Whether the client package was released
- `types_version` - New version of types package (if released)
- `client_version` - New version of client package (if released)
- `paths_released` - JSON array of released package paths

### Required Secrets

The workflow requires:

- `NPM_TOKEN` - npm authentication token with publish permissions

### Triggering Releases

The workflow is triggered on pushes to the main branch. Release Please will:

1. Analyze commits since the last release
2. Determine if a release is needed based on conventional commits
3. Create a release PR or tag/release if PR was merged
4. The workflow then builds and publishes any released packages

### Troubleshooting

If the workflow fails:

1. Check the debug-outputs job for release-please output values
2. Verify that package.json files have correct names and versions
3. Ensure build succeeds and creates dist directories
4. Check npm token permissions and expiration
5. Review build logs for specific error messages

### Common Release-Please Issues & Solutions

#### 🚨 "Bad pull request title" Error

**Problem**: Release-please can't parse the PR title pattern
**Solution**:

- Ensure title patterns don't use undefined variables like `${component}` or `${scope}`
- Use simple patterns like `"chore: release ${version}"`
- Check that all referenced variables are properly defined

#### 🚨 "Untagged merged release PRs outstanding"

**Problem**: Previous release PRs were merged but releases weren't tagged
**Solution**:

```bash
# Create the missing tags manually
git tag jsonrpc-types-v0.2.0 HEAD
git tag jsonrpc-client-v0.2.0 HEAD
git push origin --tags
```

#### 🚨 "Expected X releases, only found 0"

**Problem**: Release-please can't find existing releases to build upon
**Solution**: Bootstrap with initial tags that match your manifest versions

#### 🚨 "Missing ${scope}" or "Missing ${component}" Warnings

**Problem**: Title patterns reference undefined placeholder variables
**Solution**: Remove or properly define these variables in your release-please config

#### 🚨 "Could not find releases"

**Problem**: No release history exists but manifest has versions > 0.1.0
**Solution**: Create initial release tags or reset manifest to start from 0.1.0

### Testing Release-Please Locally

Use the included test script:

```bash
./scripts/test-release-please.sh
```

Or test manually:

```bash
# Install release-please globally
npm install -g release-please

# Test PR creation (dry run)
release-please release-pr \
  --config-file=release-please-config.json \
  --manifest-file=.release-please-manifest.json \
  --dry-run

# Test release creation (dry run)
release-please github-release \
  --config-file=release-please-config.json \
  --manifest-file=.release-please-manifest.json \
  --dry-run
```
