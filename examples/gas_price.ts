import { createRpcClient, gasPrice } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleGasPrice() {
  console.log('\n=== GAS_PRICE Example ===');

  // Example 1: Get current gas price
  try {
    const response = await gasPrice(client, {
      blockId: null,
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 2: Get gas price at specific block
  try {
    const result = await gasPrice(client, {
      blockId: 104325446,
    });

    console.log('✅ Success:', result);
  } catch (error) {
    console.error('💥 Request failed:', error);
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exampleGasPrice().catch(console.error);
}
