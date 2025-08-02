# Contributing to @space-rock/jsonrpc

Thank you for your interest in contributing to @space-rock/jsonrpc! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Release Process](#release-process)
- [Community](#community)

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- Git
- A GitHub account

### Setting Up Your Development Environment

1. **Fork the Repository**

   ```bash
   # Visit https://github.com/@near-js/jsonrpc-client
   # Click the "Fork" button
   ```

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/jsonrpc-client.git
   cd jsonrpc-client
   ```

3. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/@near-js/jsonrpc-client.git
   ```

4. **Install Dependencies**

   ```bash
   pnpm install
   ```

5. **Build the Project**

   ```bash
   pnpm build
   ```

6. **Run Tests**
   ```bash
   pnpm test
   ```

### Project Structure

```
@space-rock/
├── packages/
│   ├── client/          # JSON-RPC client implementation
│   └── types/           # TypeScript types and Valibot schemas
├── codegen/             # Code generation scripts
│   ├── openapi.json     # OpenAPI specification
│   └── src/
│       ├── types.ts     # TypeScript type generator
│       ├── schemas.ts   # Valibot schema generator
│       └── tests.ts     # Test generator
├── tests/               # Generated test suites
├── scripts/             # Build and utility scripts
└── .github/
    └── workflows/       # GitHub Actions CI/CD
```

## Development Workflow

### 1. Start with an Issue

- Check existing issues or create a new one
- Discuss your proposed changes
- Wait for maintainer approval before starting major work

### 2. Create a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes

Follow these guidelines:

- Write clean, readable code
- Follow existing code style
- Add/update tests as needed
- Update documentation
- Keep commits focused and atomic

### 4. Run Quality Checks

Before committing:

```bash
# Format code
pnpm format

# Type check
pnpm typecheck

# Run tests
pnpm test

# Check test coverage
pnpm test:coverage

# Build packages
pnpm build
```

### 5. Commit Your Changes

Follow [Conventional Commits](#commit-conventions) format.

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and automated release management.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes that don't modify src or test files

### Scopes

- `client`: Changes to the client package
- `types`: Changes to the types package
- `codegen`: Changes to code generation
- `deps`: Dependency updates
- `release`: Release-related changes

### Examples

```bash
# Feature
feat(client): add retry configuration options

# Bug fix
fix(types): correct BigInt serialization in AccountView

# Documentation
docs(client): add migration guide from near-api-js

# Breaking change (note the !)
feat(client)!: change default timeout to 30 seconds

BREAKING CHANGE: Default timeout changed from 60s to 30s
```

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**

   ```bash
   pnpm test
   ```

2. **Check code coverage**

   ```bash
   pnpm test:coverage
   ```

   - Maintain >80% coverage
   - Add tests for new code

3. **Format code**

   ```bash
   pnpm format
   ```

4. **Update documentation**
   - Update relevant READMEs
   - Add JSDoc comments for public APIs
   - Update type definitions if needed

### PR Title Format

Use the same format as commit messages:

- `feat(client): add retry configuration`
- `fix(types): correct validation schema`
- `docs: improve contribution guidelines`

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] All tests pass
- [ ] Added new tests
- [ ] Coverage maintained/improved

## Checklist

- [ ] Follows code style
- [ ] Self-reviewed code
- [ ] Updated documentation
- [ ] No console.logs or debug code
```

### Review Process

1. Automated checks must pass
2. At least one maintainer review required
3. Address review feedback
4. Maintainer merges when approved

## Testing Requirements

### Test Coverage

- Minimum 80% code coverage required
- All new code must include tests
- Tests should cover:
  - Happy path
  - Error cases
  - Edge cases
  - Type safety

### Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('JsonRpcClient', () => {
  describe('request', () => {
    it('should make successful request', async () => {
      // Arrange
      const client = new JsonRpcClient('http://localhost');

      // Act
      const result = await client.request('block', { finality: 'final' });

      // Assert
      expect(result).toBeDefined();
      expect(result.header).toBeDefined();
    });

    it('should handle errors gracefully', async () => {
      // Test error scenarios
    });
  });
});
```

### Mocking

```typescript
// Use vitest mocks
vi.mock('./utils', () => ({
  formatError: vi.fn(),
}));

// Mock fetch for integration tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({ result: mockData }),
  }),
);
```

## Release Process

We use [release-please](https://github.com/googleapis/release-please) for automated releases.

### How It Works

1. **Merge to main**: When PRs with conventional commits are merged
2. **Release PR Created**: release-please creates/updates a release PR
3. **Changelog Generated**: Based on commit messages
4. **Version Bumped**: Following semver based on commit types
5. **Publish**: When release PR is merged, packages are published

### Version Bumping

- `fix:` commits = patch release (0.0.X)
- `feat:` commits = minor release (0.X.0)
- `feat!:` or `BREAKING CHANGE:` = major release (X.0.0)

### Pre-release Checklist

Before merging a release PR:

- [ ] All CI checks pass
- [ ] Documentation is updated
- [ ] Breaking changes are documented
- [ ] Migration guide updated (if needed)

## Community

### Getting Help

- 📖 Read the documentation first
- 🔍 Search existing issues
- 💬 Ask in discussions
- 🐛 File detailed bug reports

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📖 Improve documentation
- 🔧 Submit pull requests
- 👥 Help others in discussions
- ⭐ Star the repository

### Recognition

Contributors are recognized in:

- GitHub contributors page
- Release notes
- Special mentions for significant contributions

## Questions?

If you have questions about contributing:

1. Check this guide
2. Search existing issues/discussions
3. Open a new discussion
4. Contact maintainers

Thank you for contributing to @space-rock/jsonrpc! 🚀
