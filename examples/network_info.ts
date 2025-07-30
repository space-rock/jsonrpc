import { createRpcClient, networkInfo } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleNetworkInfo() {
  console.log('\n=== NETWORK_INFO Example ===');

  // Example 1: Basic usage
  try {
    const response = await networkInfo(client, null);

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
  exampleNetworkInfo().catch(console.error);
}
