import { createRpcClient, tx } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleTx() {
  console.log('\n=== TX Example ===');

  // Example 1: Get transaction status by hash and sender
  try {
    const response = await tx(client, {
      txHash: 'EfuaqL1ZLQbmPEFHTF7ttBB7sSCwt8SzoWqCjt2E85vV',
      senderAccountId: 'example.near',
      waitUntil: 'EXECUTED',
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
  exampleTx().catch(console.error);
}
