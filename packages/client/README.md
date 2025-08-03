# @space-rock/jsonrpc-client

Type-safe JSON-RPC client for NEAR Protocol with runtime validation and automatic type inference.

## Installation

```bash
npm install @space-rock/jsonrpc-client
# or
yarn add @space-rock/jsonrpc-client
# or
pnpm add @space-rock/jsonrpc-client
```

## Quick Start

```typescript
import { block, createRpcClient } from '@space-rock/jsonrpc-client';

// Initialize client
const client = createRpcClient('https://near.lava.build:443');

// Make type-safe requests with autocomplete
const response = await block(client, { finality: 'final' });

if ('error' in response) {
  console.log(response.error.message);
} else {
  console.log(response.result.header.hash);
}
```

## Advanced Usage

```typescript
import { block, createRpcClient } from '@space-rock/jsonrpc-client';

// Basic initialization
const client = createRpcClient('https://near.lava.build:443');

// Use the full JSON-RPC call method
const response = await block(client, { finality: 'final' });

// Initialize with custom headers
const client = createRpcClient('https://near.lava.build:443', {
  headers: {
    Authorization: 'Bearer your-token-here',
    'X-API-Key': 'your-api-key',
    'X-Custom-Header': 'custom-value',
  },
});

// Initialize with AbortController signal
// Create an abort controller
const controller = new AbortController();

const client = createRpcClient('https://near.lava.build:443', {
  signal: controller.signal,
});

// Abort after 10 seconds
setTimeout(() => controller.abort(), 10000);

try {
  const response = await block(client, { finality: 'final' });
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was aborted');
  }
}

// Disable validation globally
const client = createRpcClient('https://near.lava.build:443', {
  disableValidation: true,
});

// Or disable validation for specific method
const response = await block(client, { finality: 'final' }, {
  disableValidation: true,
});
```

## License

MIT
