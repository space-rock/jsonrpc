import { createRpcClient, query } from '@space-rock/jsonrpc-client';

const client = createRpcClient('https://near.lava.build:443');

export async function exampleQuery() {
  console.log('\n=== QUERY Example ===');

  // Example 1: View account information
  try {
    const response = await query(client, {
      requestType: 'view_account',
      finality: 'final',
      accountId: 'sarinr.near',
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 2: Call contract function
  try {
    const response = await query(client, {
      requestType: 'call_function',
      finality: 'final',
      accountId: 'wrap.near',
      methodName: 'ft_metadata',
      argsBase64: '',
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 3: View access key
  try {
    const response = await query(client, {
      requestType: 'view_access_key',
      accountId: 'sarinr.near',
      finality: 'final',
      publicKey: 'ed25519:4C68GBMUsrbMDb64wNfXSBqSbyLRNS44C98gTpWpszHb',
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 4: View access key list
  try {
    const response = await query(client, {
      requestType: 'view_access_key_list',
      accountId: 'sarinr.near',
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

  // Example 5: View contract code
  try {
    const response = await query(client, {
      requestType: 'view_code',
      accountId: 'wrap.near',
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

  // Example 6: View global contract code
  try {
    const response = await query(client, {
      requestType: 'view_global_contract_code',
      finality: 'final',
      codeHash: '',
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 7: View global contract code by account id
  try {
    const response = await query(client, {
      requestType: 'view_global_contract_code_by_account_id',
      finality: 'final',
      accountId: 'wrap.near',
    });

    if ('error' in response) {
      console.error('❌ Error:', response.error.message);
    } else {
      console.log('✅ Success:', response.result);
    }
  } catch (error) {
    console.error('💥 Request failed:', error);
  }

  // Example 8: View contract state
  try {
    const response = await query(client, {
      requestType: 'view_state',
      finality: 'final',
      accountId: 'nearone.pool.near',
      prefixBase64: '',
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
  exampleQuery().catch(console.error);
}
