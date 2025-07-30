import {
  createRpcClient,
  EXPERIMENTALTxStatus,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleExperimentalTxStatus() {
  console.log('\n=== EXPERIMENTAL_TX_STATUS Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALTxStatus(client, {
      txHash: 'EfuaqL1ZLQbmPEFHTF7ttBB7sSCwt8SzoWqCjt2E85vV',
      waitUntil: 'EXECUTED',
      senderAccountId: 'sarinr.near',
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
  exampleExperimentalTxStatus().catch(console.error);
}
