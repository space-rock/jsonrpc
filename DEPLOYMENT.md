# Deployment Guide

This guide covers the deployment process for @space-rock/jsonrpc packages, including publishing to npm, release management, and CI/CD workflows.

## Table of Contents

- [Overview](#overview)
- [Release Process](#release-process)
- [Manual Publishing](#manual-publishing)
- [Automated Releases](#automated-releases)
- [Version Management](#version-management)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security](#security)
- [Rollback Procedures](#rollback-procedures)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## Overview

The project uses:

- **release-please** for automated release management
- **GitHub Actions** for CI/CD
- **npm** as the package registry
- **Conventional Commits** for version determination
- **pnpm** for package management

### Package Structure

```
@space-rock/
├── jsonrpc-client    # Main client package
└── jsonrpc-types     # Types and schemas package
```

## Release Process

### Automated Release Flow

1. **Development**: Merge PRs with conventional commits to `main`
2. **Release PR**: release-please creates/updates a release PR
3. **Review**: Team reviews changelog and version bumps
4. **Publish**: Merge release PR to trigger publishing

### Release Types

Based on conventional commits:

- `fix:` → Patch release (0.0.X)
- `feat:` → Minor release (0.X.0)
- `feat!:` or `BREAKING CHANGE:` → Major release (X.0.0)

## Manual Publishing

### Prerequisites

1. **npm Account**: Must have publish access to @space-rock scope
2. **Authentication**:
   ```bash
   npm login
   # Or use token
   npm config set //registry.npmjs.org/:_authToken=YOUR_TOKEN
   ```

### Publishing Steps

```bash
# 1. Ensure clean working directory
git status

# 2. Update to latest main
git checkout main
git pull origin main

# 3. Install dependencies
pnpm install

# 4. Run all checks
pnpm format:check
pnpm typecheck
pnpm test
pnpm build

# 5. Dry run (recommended)
pnpm publish --dry-run

# 6. Publish packages
pnpm publish -r
```

### Publishing Individual Packages

```bash
# Publish specific package
cd packages/client
pnpm publish

# With specific tag
pnpm publish --tag beta
pnpm publish --tag next
```

## Automated Releases

### GitHub Actions Workflow

The `.github/workflows/publish.yml` handles automated releases:

```yaml
name: Publish

on:
  push:
    branches:
      - main

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v3
        with:
          release-type: node
          monorepo-tags: true
          package-directories: |
            packages/client
            packages/types
```

### Configuration

Release configuration in `release-please-config.json`:

```json
{
  "packages": {
    "packages/client": {
      "changelog-path": "CHANGELOG.md",
      "release-type": "node",
      "bump-minor-pre-major": false,
      "bump-patch-for-minor-pre-major": false,
      "draft": false,
      "prerelease": false
    },
    "packages/types": {
      "changelog-path": "CHANGELOG.md",
      "release-type": "node"
    }
  }
}
```

## Version Management

### Version Strategy

- **Synchronized Versions**: Types and client versions are kept in sync
- **Semantic Versioning**: Strict adherence to semver
- **Pre-releases**: Use for testing before stable releases

### Pre-release Workflow

```bash
# 1. Create pre-release branch
git checkout -b release/v2.0.0-beta

# 2. Update package versions
cd packages/client
npm version 2.0.0-beta.1
cd ../types
npm version 2.0.0-beta.1

# 3. Publish with beta tag
pnpm publish -r --tag beta

# 4. Test beta version
npm install @space-rock/jsonrpc-client@beta
```

### Version Pinning

In `package.json`:

```json
{
  "dependencies": {
    "@space-rock/jsonrpc-types": "workspace:^"
  }
}
```

## CI/CD Pipeline

### Release Pipeline Stages

1. **PR Checks** (`ci-cd.yml`)
   - Format checking
   - Type checking
   - Unit tests
   - Coverage reporting
   - Build verification

2. **Release Creation** (`publish.yml`)
   - Version bumping
   - Changelog generation
   - GitHub release creation
   - npm publishing

3. **Post-Release**
   - Documentation updates
   - Announcement (if major release)

### Environment Variables

Required GitHub Secrets:

```yaml
NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Repository Variables:

```yaml
INPUT_JSON_URL: https://example.com/openapi.json
```

## Security

### Access Control

1. **npm Access**
   - Use npm access tokens, not passwords
   - Rotate tokens regularly
   - Use least-privilege principle

2. **GitHub Access**
   - Protected branches for `main`
   - Required reviews for releases
   - Signed commits recommended

### Token Management

```bash
# Create npm token
npm token create --read-only=false

# Store in GitHub Secrets
# Settings → Secrets → Actions → New repository secret
# Name: NPM_TOKEN
# Value: npm_xxxxxxxxxxxx
```

### Security Checklist

- [ ] npm 2FA enabled
- [ ] GitHub branch protection enabled
- [ ] Secrets rotated quarterly
- [ ] Dependencies audited
- [ ] No sensitive data in code

## Rollback Procedures

### npm Rollback

```bash
# 1. Deprecate broken version
npm deprecate @space-rock/jsonrpc-client@1.2.3 "Critical bug - use 1.2.2"

# 2. Unpublish if within 72 hours (last resort)
npm unpublish @space-rock/jsonrpc-client@1.2.3

# 3. Publish patch
# Fix issue and publish 1.2.4
```

### Git Rollback

```bash
# 1. Revert merge commit
git revert -m 1 <merge-commit-hash>

# 2. Create fix
git checkout -b fix/rollback-1.2.3
# Make fixes
git push origin fix/rollback-1.2.3

# 3. Fast-track PR
# Get emergency approval and merge
```

### Communication

1. **Immediate**: Post in project discussions
2. **Users**: npm deprecation message
3. **Documentation**: Update known issues
4. **Fix**: Publish patch ASAP

## Monitoring

### Package Metrics

Monitor on npm:

- Download counts
- Version adoption
- Dependent packages

```bash
# Check package info
npm view @space-rock/jsonrpc-client

# Check download stats
npm-stat @space-rock/jsonrpc-client
```

### Error Tracking

1. **GitHub Issues**: Monitor for deployment issues
2. **npm Advisory**: Check for security advisories
3. **Dependabot**: Automated dependency updates

### Health Checks

```bash
# Verify published package
npm install @space-rock/jsonrpc-client@latest
node -e "console.log(require('@space-rock/jsonrpc-client'))"

# Check package contents
npm pack @space-rock/jsonrpc-client
tar -tf space-rock-jsonrpc-client-*.tgz
```

## Troubleshooting

### Common Issues

#### Publishing Fails

```bash
# Error: 402 Payment Required
# Solution: Check npm account/organization settings

# Error: 403 Forbidden
# Solution: Check authentication
npm whoami
npm team ls @space-rock:developers

# Error: Version already exists
# Solution: Bump version
npm version patch
```

#### GitHub Actions Fails

```bash
# Check workflow logs
gh run list --workflow=publish.yml
gh run view <run-id>

# Re-run failed jobs
gh run rerun <run-id>
```

#### Package Not Available

```bash
# Wait for npm replication (up to 5 minutes)
# Force refresh
npm cache clean --force
npm view @space-rock/jsonrpc-client@latest

# Check specific registry
npm view @space-rock/jsonrpc-client --registry https://registry.npmjs.org/
```

### Emergency Procedures

1. **Broken Release**

   ```bash
   # Immediate deprecation
   npm deprecate @space-rock/jsonrpc-client@X.Y.Z "Critical issue - do not use"

   # Notify users
   # Create GitHub issue
   # Post to discussions
   ```

2. **Security Issue**

   ```bash
   # Report to npm
   npm audit report

   # Immediate patch
   # Fix vulnerability
   # Publish patch version
   # Create security advisory
   ```

3. **CI/CD Failure**
   ```bash
   # Manual publish (emergency only)
   git checkout main
   git pull
   pnpm test
   pnpm build
   pnpm publish -r
   ```

### Debug Commands

```bash
# Verbose npm logging
npm publish --verbose

# Check package contents before publish
npm pack --dry-run

# Verify package.json
npm pkg get name version

# Test installation
npm install . --no-save
```

## Best Practices

### Pre-Release Checklist

- [ ] All tests passing
- [ ] Coverage maintained >80%
- [ ] No console.log statements
- [ ] Dependencies updated
- [ ] Security audit passed
- [ ] Documentation updated
- [ ] Migration guide (if breaking)

### Release Notes Template

```markdown
## What's Changed

### Features

- feat(client): add retry configuration (#123)

### Bug Fixes

- fix(types): correct BigInt handling (#124)

### Breaking Changes

- feat(client)!: change default timeout

### Dependencies

- chore(deps): update valibot to 1.0.10

**Full Changelog**: https://github.com/...
```

### Post-Release Tasks

1. **Verify Publication**
   - Check npm page
   - Test installation
   - Verify types/autocomplete

2. **Update Documentation**
   - Update version references
   - Add migration notes
   - Update examples

3. **Announce** (for major releases)
   - GitHub discussions
   - Twitter/social media
   - Blog post (if applicable)

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [release-please Documentation](https://github.com/googleapis/release-please)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
