# @space-rock/jsonrpc-types

TypeScript types and Zod schemas for NEAR Protocol JSON-RPC API, automatically generated from the official OpenAPI specification.

## Installation

```bash
npm install @space-rock/jsonrpc-types
# or
yarn add @space-rock/jsonrpc-types
# or
pnpm add @space-rock/jsonrpc-types
```

## Usage

### TypeScript Types

Import types for full type safety without runtime overhead:

```typescript
import type { BlockReference } from '@space-rock/jsonrpc-types';

// Use types in your code
const blockRef: BlockReference = {
  finality: 'final',
};

// Types for specific methods
import type { ApiRequest, ApiResponse } from '@space-rock/jsonrpc-types';

// Request type for a method
type BlockRequest = ApiRequest<'block'>;

// Response type for a method
type BlockResponse = ApiResponse<'block'>;
```

## Integration with @space-rock/jsonrpc-client

The types package is designed to work seamlessly with the client:

```typescript
import { createRpcClient } from '@space-rock/jsonrpc-client';
import type { ApiRequest, ApiResponse } from '@space-rock/jsonrpc-types';

// Initialize client
const client = createRpcClient('https://near.lava.build:443');

// Types are automatically inferred
const request: ApiRequest<'block'> = {
  id: 'dontcare',
  jsonrpc: '2.0',
  method: 'block',
  params: { finality: 'final' },
};

// Types are automatically inferred
const response: ApiResponse<'block'> = await client.call(request);

if ('error' in response) {
  console.log(response.error.message);
} else {
  console.log(response.result.header.hash);
}
```

## License

MIT
