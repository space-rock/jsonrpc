# @near-jsonrpc

A TypeScript monorepo for NEAR Protocol JSON-RPC client with automatic type generation and camelCase support.

## Overview

This project provides a fully typed TypeScript client for interacting with NEAR Protocol's JSON-RPC API. It features:

- 🚀 **Automatic Type Generation** - Types are generated directly from the OpenAPI specification
- 🐪 **CamelCase Types** - All generated types use camelCase properties for idiomatic JavaScript/TypeScript, with automatic conversion to/from NEAR's snake_case API
- ✅ **Runtime Validation** - Zod schemas validate all requests and responses
- 📦 **Modular Architecture** - Separate packages for types, client, and code generation
- 🔧 **Type Safety** - Full TypeScript support with precise request/response types for each RPC method

## Architecture

The monorepo consists of the following packages:

### `packages/types`

Contains all TypeScript types, Zod schemas, and method mappings generated from the OpenAPI specification.

### `packages/client`

The JSON-RPC client that handles requests, responses, and automatic case conversion between camelCase and snake_case.

### `codegen`

Code generation scripts that process the OpenAPI specification to generate types, schemas, and tests.

## Development

### Prerequisites

- Node.js 18+
- pnpm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/@space-rock/near-jsonrpc.git
cd near-jsonrpc

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Code Generation

The types and schemas are generated from the OpenAPI specification:

```bash
# Generate types from OpenAPI spec
cd codegen
pnpm run generate:types

# Generate Zod schemas from types
pnpm run generate:schemas

# Generate tests
pnpm run generate:tests

# Run all generators
pnpm run generate
```

### How Code Generation Works

1. **Type Generation** (`codegen/src/types.ts`)
   - Reads the OpenAPI specification (`codegen/openapi.json`)
   - Generates TypeScript types with all properties converted to camelCase
   - Creates method mappings for request/response types
   - All generated types are immediately usable with camelCase properties

2. **Schema Generation** (`codegen/src/schemas.ts`)
   - Uses `ts-to-zod` to convert TypeScript types to Zod schemas
   - Schemas validate camelCase data structures
   - Provides runtime validation for requests and responses

3. **Test Generation** (`codegen/src/tests.ts`)
   - Automatically generates comprehensive test suites
   - Creates type tests, unit tests, and integration tests

### Project Structure

```
@near-jsonrpc/
├── codegen/
│   ├── openapi.json          # NEAR RPC OpenAPI specification
│   └── src/
│       ├── types.ts          # Type generation script
│       ├── schemas.ts        # Zod schema generation
│       └── tests.ts          # Test generation
├── packages/
│   ├── client/               # RPC client implementation
│   │   └── src/
│   │       ├── client.ts     # Main client code
│   │       ├── utils.ts      # Case conversion utilities
│   │       └── index.ts      # Public exports
│   └── types/                # Generated types and schemas
│       └── src/
│           ├── types.ts      # TypeScript types
│           ├── schemas.ts    # Zod schemas
│           ├── mappings.ts   # Method mappings
│           └── helpers.ts    # Type utilities
```

## Getting Started

### Installation

```bash
# Install both packages
npm install @space-rock/jsonrpc-types @space-rock/jsonrpc-client

# Or install individually
npm install @space-rock/jsonrpc-types
npm install @space-rock/jsonrpc-client
```

### Basic Usage

```typescript
import { createClient } from '@space-rock/jsonrpc-client';
import type { BlockReference } from '@space-rock/jsonrpc-types';

// Create a client instance
const client = createClient('https://rpc.mainnet.near.org');

// Query blockchain data with full type safety
const blockRef: BlockReference = { finality: 'final' };
const block = await client.request('block', blockRef);

console.log('Latest block height:', block.header.height);
```

### Tree Shaking Support

Import only what you need for optimal bundle size:

```typescript
// Import specific types
import type {
  BlockResponse,
  AccountView,
  AccessKeyView,
} from '@space-rock/jsonrpc-types/types';

// Import specific utilities
import { createClient } from '@space-rock/jsonrpc-client/client';
import { formatError } from '@space-rock/jsonrpc-client/utils';
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm format && pnpm test` and `pnpm build` to ensure everything works
5. Submit a pull request

## License

MIT
