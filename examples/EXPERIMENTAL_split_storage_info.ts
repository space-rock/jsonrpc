import {
  createRpcClient,
  EXPERIMENTALSplitStorageInfo,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleExperimentalSplitStorageInfo() {
  console.log('\n=== EXPERIMENTAL_SPLIT_STORAGE_INFO Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALSplitStorageInfo(client, {});

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
  exampleExperimentalSplitStorageInfo().catch(console.error);
}
