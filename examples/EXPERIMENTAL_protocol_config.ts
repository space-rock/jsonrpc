import {
  createRpcClient,
  EXPERIMENTALProtocolConfig,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://neart.lava.build:443');

export async function exampleExperimentalProtocolConfig() {
  console.log('\n=== EXPERIMENTAL_PROTOCOL_CONFIG Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALProtocolConfig(client, {
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
  exampleExperimentalProtocolConfig().catch(console.error);
}
