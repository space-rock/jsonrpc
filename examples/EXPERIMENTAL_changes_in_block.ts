import {
  createRpcClient,
  EXPERIMENTALChangesInBlock,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleExperimentalChangesInBlock() {
  console.log('\n=== EXPERIMENTAL_CHANGES_IN_BLOCK Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALChangesInBlock(client, {
      finality: 'final',
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
  exampleExperimentalChangesInBlock().catch(console.error);
}
