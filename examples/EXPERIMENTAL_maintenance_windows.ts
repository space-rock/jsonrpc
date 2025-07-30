import {
  createRpcClient,
  EXPERIMENTALMaintenanceWindows,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://neart.lava.build:443');

export async function exampleExperimentalMaintenanceWindows() {
  console.log('\n=== EXPERIMENTAL_MAINTENANCE_WINDOWS Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALMaintenanceWindows(client, {
      accountId: 'flipside.pool.near',
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
  exampleExperimentalMaintenanceWindows().catch(console.error);
}
