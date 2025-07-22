# Code Generation Guide

This guide explains the code generation system used in @space-rock/jsonrpc, which automatically generates TypeScript types, Zod schemas, and tests from the NEAR Protocol OpenAPI specification.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Generation Pipeline](#generation-pipeline)
- [Running Code Generation](#running-code-generation)
- [OpenAPI Specification](#openapi-specification)
- [Automated Updates](#automated-updates)
- [Troubleshooting](#troubleshooting)

## Overview

The code generation system provides:

- **Type Safety**: TypeScript types generated directly from OpenAPI spec
- **Runtime Validation**: Zod schemas for all types
- **Comprehensive Testing**: Automatically generated test suites
- **Always Up-to-Date**: Daily synchronization with NEAR Protocol

### Why Code Generation?

1. **Single Source of Truth**: OpenAPI spec defines everything
2. **No Manual Maintenance**: Types always match the API
3. **Consistency**: All packages use the same definitions
4. **Type-First Design**: Types generated directly, not inferred

## Architecture

```
codegen/
├── openapi.json         # Input: OpenAPI specification
├── src/
│   ├── types.ts        # Generates TypeScript types
│   ├── schemas.ts      # Generates Zod schemas
│   ├── tests.ts        # Generates test suites
│   └── validate.ts     # Validates generated code
├── package.json
└── tsconfig.json

↓ Generates ↓

packages/types/src/
├── types.ts            # TypeScript interfaces and types
├── schemas.ts          # Zod validation schemas
├── mappings.ts         # Method-to-type mappings
├── helpers.ts          # Utility types
└── index.ts            # Public exports

tests/
├── unit/               # Unit tests for each type
├── integration/        # Integration tests
└── validation/         # Schema validation tests
```

## Generation Pipeline

### 1. Type Generation (`codegen/src/types.ts`)

Generates TypeScript types from OpenAPI specification:

**Features:**

- Uses `openapi-typescript` for accurate generation
- Handles complex OpenAPI schemas (oneOf, allOf, anyOf)
- Generates method-to-request/response mappings
- Preserves JSDoc comments from OpenAPI

### 2. Schema Generation (`codegen/src/schemas.ts`)

Generates Zod schemas from TypeScript types:

**Features:**

- Uses `ts-to-zod` for schema generation
- Maintains type safety between types and schemas
- Handles complex type relationships
- Generates schema mappings for each method

### 3. Test Generation (`codegen/src/tests.ts`)

Generates comprehensive test suites:

**Features:**

- Uses `zod-mock` for test data generation
- Creates validation tests for each schema
- Generates integration tests for client methods
- Ensures >98% code coverage

## Running Code Generation

### Basic Usage

```bash
# Run complete generation pipeline
pnpm codegen

# This executes:
# 1. Type generation
# 2. Schema generation
# 3. Test generation
# 4. Code formatting
```

### Individual Steps

```bash
# From the codegen directory
cd codegen

# Generate only types
pnpm generate:types

# Generate only schemas (requires types)
pnpm generate:schemas

# Generate only tests (requires types and schemas)
pnpm generate:tests

# Validate generated code
pnpm validate
```

### Watch Mode

For development, you can watch for changes:

```bash
# Watch OpenAPI spec and regenerate on changes
cd codegen
pnpx nodemon --watch openapi.json --exec "pnpm generate"
```

## OpenAPI Specification

### Source

The OpenAPI specification (`codegen/openapi.json`) is the source of truth for all generated code.

### Updating the Spec

#### Manual Update

```bash
# Download latest spec
curl -L -o codegen/openapi.json https://raw.githubusercontent.com/near/nearcore/refs/heads/master/chain/jsonrpc/openapi/openapi.json

# Regenerate code
pnpm codegen

# Check changes
git diff
```

#### Automated Updates

GitHub Actions workflow runs daily:

```yaml
# .github/workflows/generate.yml
on:
  schedule:
    - cron: '0 0 * * *' # Daily at midnight UTC
```

### Spec Validation

Before generation, the spec is validated:

```bash
# Validate OpenAPI spec
cd codegen
pnpm validate:spec
```

## Automated Updates

### GitHub Action Workflow

The project automatically fetches and processes the latest OpenAPI spec:

1. **Daily Schedule**: Runs every day at midnight UTC
2. **Fetch Spec**: Downloads from configured URL
3. **Generate Code**: Runs the generation pipeline
4. **Create PR**: If changes detected, creates a pull request

### Configuration

Set the OpenAPI URL in repository settings:

```
Repository Settings → Secrets and variables → Actions → Variables
Name: INPUT_JSON_URL
Value: https://example.com/near-rpc-openapi.json
```

### Manual Trigger

```bash
# Using GitHub CLI
gh workflow run generate.yml

# With custom URL
gh workflow run generate.yml -f openapi_url=https://custom.url/spec.json
```

## Troubleshooting

### Common Issues

#### Generation Fails

```bash
# Error: Cannot read openapi.json
# Solution: Ensure file exists
ls -la codegen/openapi.json

# Error: Invalid OpenAPI specification
# Solution: Validate the spec
npx @apidevtools/swagger-cli validate codegen/openapi.json
```

#### Type Conflicts

```bash
# Error: Duplicate identifier
# Solution: Clean and regenerate
rm -rf packages/types/src/*
pnpm codegen
```

#### Schema Generation Issues

```bash
# Error: Could not generate schema for type X
# Solution: Check if type is too complex
# May need custom schema generator
```

#### Test Generation Problems

```bash
# Error: Cannot generate mock for type
# Solution: Add custom mock generator
# Edit codegen/src/tests.ts
```

## Contributing to Code Generation

See [CONTRIBUTING.md](./CONTRIBUTING.md) for general guidelines.

Specific to code generation:

1. Test generators with various OpenAPI specs
2. Ensure generated code is readable
3. Maintain backwards compatibility
4. Document any custom logic
5. Add tests for generators themselves
