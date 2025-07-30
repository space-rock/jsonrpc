# @space-rock/jsonrpc

<div align="center">
  <h3>
    <strong>Type-safe, high-performance JSON-RPC client for NEAR Protocol</strong>
  </h3>
  <p>
    <a href="https://github.com/space-rock/jsonrpc/actions/workflows/ci-cd.yml">
      <img src="https://github.com/space-rock/jsonrpc/actions/workflows/ci-cd.yml/badge.svg" alt="CI/CD" />
    </a>
    <a href="https://codecov.io/github/space-rock/jsonrpc">
      <img src="https://codecov.io/gh/space-rock/jsonrpc/branch/main/graph/badge.svg?token=SHQZTQA89C" alt="Coverage" />
    </a>
    <a href="https://www.npmjs.com/package/@space-rock/jsonrpc-client">
      <img src="https://img.shields.io/npm/v/@space-rock/jsonrpc-client.svg" alt="Client npm version" />
    </a>
    <a href="https://www.npmjs.com/package/@space-rock/jsonrpc-client">
      <img src="https://img.shields.io/npm/dm/@space-rock/jsonrpc-client.svg" alt="Client npm downloads" />
    </a>
    <a href="https://www.npmjs.com/package/@space-rock/jsonrpc-types">
      <img src="https://img.shields.io/npm/v/@space-rock/jsonrpc-types.svg" alt="Types npm version" />
    </a>
    <a href="https://www.npmjs.com/package/@space-rock/jsonrpc-types">
      <img src="https://img.shields.io/npm/dm/@space-rock/jsonrpc-types.svg" alt="Types npm downloads" />
    </a>
  </p>
</div>

## 🚀 Features

- **🎯 Type-First Design**: TypeScript types generated directly from OpenAPI spec (not inferred from schemas)
- **⚡ Blazing Fast Autocomplete**: Clean, responsive IntelliSense with zero runtime overhead
- **🛡️ Runtime Validation**: Zod schema validation for request/response
- **📦 Tree-Shakable**: Optimized builds with code splitting for both ESM and CJS
- **🧪 98%+ Test Coverage**: Comprehensive automated testing with dynamically generated test suites
- **🔄 Auto-Updated**: Daily synchronization with NEAR Protocol's latest OpenAPI specification
- **🎭 Mock Generation**: Test data generation using zod-schema-faker
- **🔌 Modular Architecture**: Separate packages for types and client implementation

## 📚 Table of Contents

- [Overview](#overview)
- [Packages](#packages)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Documentation Overview](#documentation-overview)
- [Development](#development)
- [Code Generation](#code-generation)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [Architecture](#architecture)

## Overview

This monorepo provides a type-safe, high-performance JSON-RPC client for interacting with NEAR Protocol nodes. It features automatic code generation from OpenAPI specifications, comprehensive type safety, and extensive test coverage.

## Packages

| Package                                         | Version                                                             | Description                                   |
| ----------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------- |
| [@space-rock/jsonrpc-client](./packages/client) | ![npm](https://img.shields.io/npm/v/@space-rock/jsonrpc-client.svg) | JSON-RPC fetch client with runtime validation |
| [@space-rock/jsonrpc-types](./packages/types)   | ![npm](https://img.shields.io/npm/v/@space-rock/jsonrpc-types.svg)  | TypeScript types and Zod schemas              |

## Quick Start

```bash
# Install the client
pnpm add @space-rock/jsonrpc-client

# If you need types
pnpm add @space-rock/jsonrpc-types
```

```typescript
import { createRpcClient } from '@space-rock/jsonrpc-client';

// Initialize client
const client = createRpcClient('https://near.lava.build:443');

// Use the simplified request method
const response = await client.request('block', { finality: 'final' });

// Use the full JSON-RPC call method
const response = await client.call({
  id: 'dontcare',
  jsonrpc: '2.0',
  method: 'block',
  params: { finality: 'final' },
});

if ('error' in response) {
  console.log(response.error.message);
} else {
  console.log(response.result.header.hash);
}
```

## Installation

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/@space-rock/jsonrpc-client.git
cd jsonrpc-client

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## Documentation Overview

| Document                                   | Description                  |
| ------------------------------------------ | ---------------------------- |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Contribution guidelines      |
| [SETUP.md](./SETUP.md)                     | Development setup guide      |
| [CODE_GENERATION.md](./CODE_GENERATION.md) | Code generation guide        |
| [DEPLOYMENT.md](./DEPLOYMENT.md)           | Deployment and release guide |

## Development

### Available Scripts

```bash
# Generate types, schemas, and tests from OpenAPI spec
pnpm codegen

# Build all packages
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch

# Type checking
pnpm typecheck

# Format code
pnpm format

# Clean build artifacts
pnpm clean
```

## Code Generation

The project uses a sophisticated code generation pipeline to ensure type safety and maintainability:

### Generation Flow

1. **TypeScript Types** (`codegen/src/types.ts`)
   - Generates TypeScript interfaces from `openapi.json`
   - Uses `openapi-typescript` for accurate type generation
   - Creates method-to-request/response mappings

2. **Zod Schemas** (`codegen/src/schemas.ts`)
   - Generates Zod schemas from TypeScript types
   - Uses `ts-to-zod` for schema generation
   - Maintains runtime validation capabilities

3. **Test Suites** (`codegen/src/tests.ts`)
   - Dynamically generates comprehensive tests
   - Uses `zod-schema-faker` for mock data generation
   - Ensures high test coverage across all methods

### Running Code Generation

```bash
# Generate all artifacts
pnpm codegen

# This runs:
# 1. Type generation
# 2. Schema generation
# 3. Test generation
# 4. Code formatting
```

### Updating OpenAPI Specification

The project automatically fetches the latest OpenAPI specification daily:

```bash
# Manual trigger (requires repository access)
# Set INPUT_JSON_URL repository variable or use workflow dispatch

# Local update
curl -L -o codegen/openapi.json <openapi-spec-url>
pnpm codegen
```

## Testing

### Test Strategy

- **Dynamic Test Generation**: Tests are automatically generated for all RPC methods
- **Mock Data**: Uses `zod-schema-faker` to generate valid test data
- **Coverage Target**: Maintains >80% code coverage
- **Validation Testing**: Tests both validated and non-validated request paths

### Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage report
pnpm test:coverage

# Watch mode for development
pnpm test:watch

# Run tests for specific package
pnpm --filter @space-rock/jsonrpc-client test
```

### Coverage Reports

Coverage reports are generated in the `coverage/` directory and include:

- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

## CI/CD

### Continuous Integration (`ci-cd.yml`)

Runs on every push and pull request:

- **Code Quality**
  - Formatting check (Prettier)
  - Type checking (TypeScript)
  - Linting
- **Testing**
  - Unit tests across all packages
  - Coverage reporting to Codecov
  - Coverage threshold enforcement (>80%)

- **Build Verification**
  - Package builds (ESM & CJS)
  - Tree-shaking verification
  - Bundle size checks

- **Release Dry Run**
  - Validates package publishing configuration
  - Checks version consistency

### Automated Updates (`generate.yml`)

Daily workflow that:

1. Fetches latest OpenAPI specification from NEAR Protocol
2. Regenerates types, schemas, and tests
3. Creates PR with updates if changes detected
4. Runs full CI pipeline on generated code

### Release Management (`publish.yml`)

Uses `release-please` for automated releases:

- **Version Management**: Semantic versioning based on conventional commits
- **Changelog Generation**: Automatic changelog from commit messages
- **Package Publishing**: Automated npm publishing
- **GitHub Releases**: Creates GitHub releases with notes

## Contributing

Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Code of Conduct
- Development workflow
- Commit conventions
- Pull request process
- Code review guidelines

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit with conventional commits (`feat: add amazing feature`)
6. Push to your fork
7. Open a Pull Request

## Architecture

### Design Principles

1. **Type-First Development**
   - Types are the source of truth
   - Runtime validation
   - Zero runtime overhead for type information

2. **Modular Design**
   - Separate concerns (types vs. client)
   - Tree-shakable exports
   - Framework agnostic

3. **Developer Experience**
   - Fast autocomplete
   - Clear error messages
   - Comprehensive documentation

### Performance Optimizations

- **Code Splitting**: Separate entry points for different functionalities
- **Tree Shaking**: Unused code elimination in production builds
- **Lazy Loading**: Schemas loaded only when validation is enabled
- **Bundle Optimization**: Dual ESM/CJS builds with optimized chunks

## License

MIT License - see [LICENSE](./LICENSE) for details

## Links

- [RPC Documentation](https://docs.near.org/api/rpc/introduction)
- [Client Package Documentation](./packages/client/README.md)
- [Types Package Documentation](./packages/types/README.md)
- [NPM - Client](https://www.npmjs.com/package/@space-rock/jsonrpc-client)
- [NPM - Types](https://www.npmjs.com/package/@space-rock/jsonrpc-types)
- [NEAR Protocol](https://near.org)

---

Built with ❤️ for the NEAR community
