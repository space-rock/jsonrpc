# Setup Guide

This guide will help you set up your development environment for contributing to @space-rock/jsonrpc.

## Table of Contents

- [System Requirements](#system-requirements)
- [Environment Setup](#environment-setup)
- [Project Setup](#project-setup)
- [Development Commands](#development-commands)
- [Testing Setup](#testing-setup)
- [CI/CD Local Setup](#cicd-local-setup)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Required Software

- **Node.js**: v20.0.0 or higher

  ```bash
  # Check version
  node --version

  # Install via nvm (recommended)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install 20
  nvm use 20
  ```

- **pnpm**: v10.0.0 or higher

  ```bash
  # Check version
  pnpm --version

  # Install via corepack (recommended)
  corepack enable
  corepack prepare pnpm@10.13.1 --activate

  # Or install globally
  npm install -g pnpm@10.13.1
  ```

- **Git**: Latest version
  ```bash
  # Check version
  git --version
  ```

### Recommended Software

- **Visual Studio Code**: Latest version
- **GitHub CLI**: For easier PR management

  ```bash
  # macOS
  brew install gh

  # Linux
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  sudo apt update
  sudo apt install gh
  ```

## Environment Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub first
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/jsonrpc-client.git
cd jsonrpc-client

# Add upstream remote
git remote add upstream https://github.com/@near-js/jsonrpc-client.git

# Verify remotes
git remote -v
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# This will:
# - Install root dependencies
# - Install dependencies for all packages
# - Set up git hooks
# - Link local packages
```

### 3. Initial Build

```bash
# Build all packages
pnpm build

# This builds:
# - @space-rock/jsonrpc-types
# - @space-rock/jsonrpc-client
```

### 4. Verify Setup

```bash
# Run tests to verify setup
pnpm test

# Check that all tests pass
# Expected: All tests should pass with >98% coverage
```

## Project Setup

### Directory Structure

```
@space-rock/
├── .github/workflows/    # CI/CD workflows
├── codegen/             # Code generation
│   ├── openapi.json     # OpenAPI specification
│   ├── src/
│   │   ├── types.ts     # Type generator
│   │   ├── schemas.ts   # Schema generator
│   │   └── tests.ts     # Test generator
│   └── package.json
├── packages/
│   ├── client/          # JSON-RPC client
│   │   ├── src/
│   │   ├── tsup.config.ts
│   │   └── package.json
│   └── types/           # Types and schemas
│       ├── src/
│       ├── tsup.config.ts
│       └── package.json
├── tests/               # Generated tests
├── scripts/             # Utility scripts
├── package.json         # Root package.json
├── pnpm-workspace.yaml  # pnpm workspace config
└── tsconfig.json        # Root TypeScript config
```

### Workspace Configuration

The project uses pnpm workspaces. Configuration in `pnpm-workspace.yaml`:

```yaml
packages:
  - 'packages/*'
  - 'codegen'
```

### TypeScript Configuration

Root `tsconfig.json` provides base configuration:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "lib": ["ES2022"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "NodeNext"
  }
}
```

## Development Commands

### Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test              # Run once
pnpm test:watch       # Watch mode
pnpm test:coverage    # With coverage

# Type checking
pnpm typecheck

# Format code
pnpm format           # Format all files
pnpm format:check     # Check formatting

# Clean build artifacts
pnpm clean

# Generate types, schemas, and tests
pnpm codegen
```

### Package-Specific Commands

```bash
# Work with specific package
pnpm --filter @space-rock/jsonrpc-client build
pnpm --filter @space-rock/jsonrpc-types test

# Run script in all packages
pnpm -r build
pnpm -r test
```

## Code Generation Setup

### Understanding the Flow

1. **Input**: `codegen/openapi.json` (OpenAPI specification)
2. **Type Generation**: Creates TypeScript types
3. **Schema Generation**: Creates Zod schemas from types
4. **Test Generation**: Creates test suites
5. **Output**: Files in `packages/types/src/` and `tests/`

### Running Code Generation

```bash
# Full generation pipeline
pnpm codegen

# Individual steps (from codegen directory)
cd codegen
pnpm generate:types    # Generate TypeScript types
pnpm generate:schemas  # Generate Zod schemas
pnpm generate:tests    # Generate tests
```

### Updating OpenAPI Specification

```bash
# Download latest spec (replace URL with actual endpoint)
curl -L -o codegen/openapi.json https://example.com/openapi.json

# Regenerate everything
pnpm codegen

# Check for changes
git diff
```

### Custom Generation

To modify generation behavior, edit files in `codegen/src/`:

- `types.ts`: Customize type generation
- `schemas.ts`: Customize schema generation
- `tests.ts`: Customize test generation

## Testing Setup

### Test Framework

The project uses Vitest for testing:

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific file
pnpm test client.test.ts

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Open coverage report
open coverage/index.html
```

## CI/CD Local Setup

### Running CI Checks Locally

```bash
# Run all CI checks
pnpm format:check && pnpm typecheck && pnpm test && pnpm build

# Create a local CI script
cat > check-ci.sh << 'EOF'
#!/bin/bash
set -e

echo "🔍 Checking format..."
pnpm format:check

echo "📝 Type checking..."
pnpm typecheck

echo "🧪 Running tests..."
pnpm test

echo "📦 Building packages..."
pnpm build

echo "✅ All checks passed!"
EOF

chmod +x check-ci.sh
./check-ci.sh
```

## Troubleshooting

### Common Issues

#### 1. pnpm Installation Issues

```bash
# Error: pnpm: command not found
# Solution: Install pnpm globally
npm install -g pnpm

# Or use corepack
corepack enable
corepack prepare pnpm@latest --activate
```

#### 2. Node Version Issues

```bash
# Error: Node version X is not supported
# Solution: Use nvm to switch versions
nvm install 20
nvm use 20

# Make it default
nvm alias default 20
```

#### 3. Build Failures

```bash
# Clean everything and rebuild
pnpm clean
rm -rf node_modules
rm -rf packages/*/node_modules
pnpm install
pnpm build
```

#### 4. Test Failures

```bash
# Update snapshots if needed
pnpm test -- -u

# Run specific test file
pnpm test path/to/test.ts

# Debug test
pnpm test -- --reporter=verbose
```

#### 5. Type Errors

```bash
# Ensure types are built
pnpm --filter @space-rock/jsonrpc-types build

# Check TypeScript version
pnpm tsc --version

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Ask in GitHub Discussions
4. Create a detailed issue with:
   - Error messages
   - Steps to reproduce
   - System information
   - Node/pnpm versions

### Useful Resources

- [pnpm Documentation](https://pnpm.io/)
- [Vitest Documentation](https://vitest.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
