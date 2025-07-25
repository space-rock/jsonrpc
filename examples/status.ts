import { createRpcClient } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleStatus() {
  console.log('\n=== STATUS Example ===');

  // Example 1: Basic usage
  try {
    const response = await client.call({
      id: 'dontcare',
      jsonrpc: '2.0',
      method: 'status',
      params: null,
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exampleStatus().catch(console.error);
}
