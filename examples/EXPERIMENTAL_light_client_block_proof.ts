import {
  createRpcClient,
  EXPERIMENTALLightClientBlockProof,
} from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleExperimentalLightClientBlockProof() {
  console.log('\n=== EXPERIMENTAL_LIGHT_CLIENT_BLOCK_PROOF Example ===');

  // Example 1: Basic usage
  try {
    const response = await EXPERIMENTALLightClientBlockProof(client, {
      blockHash: 'GLCuCE2yNJWH2EfWJu7pSM8swd5qd1RG71pwV4YFbUz7',
      lightClientHead: '',
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
  exampleExperimentalLightClientBlockProof().catch(console.error);
}
