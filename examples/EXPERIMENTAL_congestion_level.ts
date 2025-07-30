import {
  createRpcClient,
  EXPERIMENTALCongestionLevel,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleExperimentalCongestionLevel() {
  console.log('\n=== EXPERIMENTAL_CONGESTION_LEVEL Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALCongestionLevel(client, {
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
  exampleExperimentalCongestionLevel().catch(console.error);
}
