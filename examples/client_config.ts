import { createRpcClient } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://free.rpc.fastnear.com');

export async function exampleClientConfig() {
  console.log('\n=== CLIENT_CONFIG Example ===');

  // Example 1: Basic usage
  try {
    const response = await client.call({
      id: 'dontcare',
      jsonrpc: '2.0',
      method: 'client_config',
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
  exampleClientConfig().catch(console.error);
}
