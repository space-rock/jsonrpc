import { createRpcClient, chunk } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleChunk() {
  console.log('\n=== CHUNK Example ===');

  // Example 1: Basic usage
  try {
    const response = await chunk(client, {
      chunkId: '541mW2ZjoJypo3KcHudoMi3RYs3VYBFagBYbdBQLhwFD',
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
  exampleChunk().catch(console.error);
}
