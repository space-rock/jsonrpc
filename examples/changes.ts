import { createRpcClient, changes } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleChanges() {
  console.log('\n=== CHANGES Example ===');

  // Example 1: Get account changes
  try {
    const response = await changes(client, {
      finality: 'final',
      changesType: 'account_changes',
      accountIds: ['relay.tg'],
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 2: Get all access key changes
  try {
    const response = await changes(client, {
      finality: 'final',
      changesType: 'all_access_key_changes',
      accountIds: ['relay.tg'],
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 3: Get all gas key changes
  try {
    const response = await changes(client, {
      finality: 'final',
      changesType: 'all_gas_key_changes',
      accountIds: ['relay.tg'],
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 4: Get contract code changes
  try {
    const response = await changes(client, {
      finality: 'final',
      changesType: 'contract_code_changes',
      accountIds: ['relay.tg'],
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 5: Get data changes
  try {
    const response = await changes(client, {
      finality: 'final',
      changesType: 'data_changes',
      accountIds: ['relay.tg'],
      keyPrefixBase64: '',
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 6: Get single access key changes
  try {
    const response = await changes(client, {
      finality: 'final',
      changesType: 'single_access_key_changes',
      keys: [
        {
          accountId: 'relay.tg',
          publicKey: 'ed25519:GcF6WpDfTQqdaDkVoGeLufJ2ByZB7gbuT98tW4z91iSh',
        },
      ],
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 7: Get single access key changes
  try {
    const response = await changes(client, {
      finality: 'final',
      changesType: 'single_gas_key_changes',
      keys: [
        {
          accountId: 'relay.tg',
          publicKey: 'ed25519:GcF6WpDfTQqdaDkVoGeLufJ2ByZB7gbuT98tW4z91iSh',
        },
      ],
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
  exampleChanges().catch(console.error);
}
