import { createRpcClient, lightClientProof } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleLightClientProof() {
  console.log('\n=== LIGHT_CLIENT_PROOF Example ===');

  // Example 1: Basic usage
  try {
    const response = await lightClientProof(client, {
      lightClientHead: '',
      receiptId: '',
      receiverId: 'relay.tg',
      type: 'receipt',
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
  exampleLightClientProof().catch(console.error);
}
