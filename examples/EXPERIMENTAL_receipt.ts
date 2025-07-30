import {
  createRpcClient,
  EXPERIMENTALReceipt,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleExperimentalReceipt() {
  console.log('\n=== EXPERIMENTAL_RECEIPT Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALReceipt(client, {
      receiptId: '1hQdiKb1kZbs9nuGVxdzVA1oZm2ogot3mEymjC2jTCy',
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
  exampleExperimentalReceipt().catch(console.error);
}
