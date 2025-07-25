/**
 * TypeScript type tests for JSON RPC methods.
 * This file was auto-generated - do not edit manually.
 */

import { expectType, expectAssignable } from 'tsd';
import type {
  RpcMethod,
  ApiRequest,
  ApiResponse,
  MethodMap,
} from '@space-rock/jsonrpc-types';
import { methodSchemas } from '@space-rock/jsonrpc-types';
import { z } from 'zod';

// Test that all methods are properly typed as RpcMethod
expectAssignable<RpcMethod>('EXPERIMENTAL_changes');
expectAssignable<RpcMethod>('EXPERIMENTAL_changes_in_block');
expectAssignable<RpcMethod>('EXPERIMENTAL_congestion_level');
expectAssignable<RpcMethod>('EXPERIMENTAL_genesis_config');
expectAssignable<RpcMethod>('EXPERIMENTAL_light_client_block_proof');
expectAssignable<RpcMethod>('EXPERIMENTAL_light_client_proof');
expectAssignable<RpcMethod>('EXPERIMENTAL_maintenance_windows');
expectAssignable<RpcMethod>('EXPERIMENTAL_protocol_config');
expectAssignable<RpcMethod>('EXPERIMENTAL_receipt');
expectAssignable<RpcMethod>('EXPERIMENTAL_split_storage_info');
expectAssignable<RpcMethod>('EXPERIMENTAL_tx_status');
expectAssignable<RpcMethod>('EXPERIMENTAL_validators_ordered');
expectAssignable<RpcMethod>('block');
expectAssignable<RpcMethod>('broadcast_tx_async');
expectAssignable<RpcMethod>('broadcast_tx_commit');
expectAssignable<RpcMethod>('changes');
expectAssignable<RpcMethod>('chunk');
expectAssignable<RpcMethod>('client_config');
expectAssignable<RpcMethod>('gas_price');
expectAssignable<RpcMethod>('health');
expectAssignable<RpcMethod>('light_client_proof');
expectAssignable<RpcMethod>('network_info');
expectAssignable<RpcMethod>('next_light_client_block');
expectAssignable<RpcMethod>('query');
expectAssignable<RpcMethod>('send_tx');
expectAssignable<RpcMethod>('status');
expectAssignable<RpcMethod>('tx');
expectAssignable<RpcMethod>('validators');

// Test that methodSchemas contains all methods with correct structure
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_changes'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_changes_in_block'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_congestion_level'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_genesis_config'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_light_client_block_proof'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_light_client_proof'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_maintenance_windows'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_protocol_config'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_receipt'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_split_storage_info'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_tx_status'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['EXPERIMENTAL_validators_ordered'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['block'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['broadcast_tx_async'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['broadcast_tx_commit'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['changes'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['chunk'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['client_config'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['gas_price'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['health'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['light_client_proof'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['network_info'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['next_light_client_block'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['query'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['send_tx'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['status'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['tx'],
);
expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(
  methodSchemas['validators'],
);

// Test request/response type inference

// EXPERIMENTAL_changes type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_changes'>;
  type Res = ApiResponse<'EXPERIMENTAL_changes'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_changes'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['EXPERIMENTAL_changes'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['EXPERIMENTAL_changes'].response);
}

// EXPERIMENTAL_changes_in_block type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_changes_in_block'>;
  type Res = ApiResponse<'EXPERIMENTAL_changes_in_block'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_changes_in_block'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_changes_in_block'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_changes_in_block'].response,
  );
}

// EXPERIMENTAL_congestion_level type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_congestion_level'>;
  type Res = ApiResponse<'EXPERIMENTAL_congestion_level'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_congestion_level'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_congestion_level'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_congestion_level'].response,
  );
}

// EXPERIMENTAL_genesis_config type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_genesis_config'>;
  type Res = ApiResponse<'EXPERIMENTAL_genesis_config'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_genesis_config'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_genesis_config'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_genesis_config'].response,
  );
}

// EXPERIMENTAL_light_client_block_proof type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_light_client_block_proof'>;
  type Res = ApiResponse<'EXPERIMENTAL_light_client_block_proof'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_light_client_block_proof'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_light_client_block_proof'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_light_client_block_proof'].response,
  );
}

// EXPERIMENTAL_light_client_proof type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_light_client_proof'>;
  type Res = ApiResponse<'EXPERIMENTAL_light_client_proof'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_light_client_proof'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_light_client_proof'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_light_client_proof'].response,
  );
}

// EXPERIMENTAL_maintenance_windows type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_maintenance_windows'>;
  type Res = ApiResponse<'EXPERIMENTAL_maintenance_windows'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_maintenance_windows'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_maintenance_windows'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_maintenance_windows'].response,
  );
}

// EXPERIMENTAL_protocol_config type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_protocol_config'>;
  type Res = ApiResponse<'EXPERIMENTAL_protocol_config'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_protocol_config'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_protocol_config'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_protocol_config'].response,
  );
}

// EXPERIMENTAL_receipt type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_receipt'>;
  type Res = ApiResponse<'EXPERIMENTAL_receipt'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_receipt'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['EXPERIMENTAL_receipt'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['EXPERIMENTAL_receipt'].response);
}

// EXPERIMENTAL_split_storage_info type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_split_storage_info'>;
  type Res = ApiResponse<'EXPERIMENTAL_split_storage_info'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_split_storage_info'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_split_storage_info'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_split_storage_info'].response,
  );
}

// EXPERIMENTAL_tx_status type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_tx_status'>;
  type Res = ApiResponse<'EXPERIMENTAL_tx_status'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_tx_status'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_tx_status'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_tx_status'].response,
  );
}

// EXPERIMENTAL_validators_ordered type tests
{
  type Req = ApiRequest<'EXPERIMENTAL_validators_ordered'>;
  type Res = ApiResponse<'EXPERIMENTAL_validators_ordered'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'EXPERIMENTAL_validators_ordered'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_validators_ordered'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['EXPERIMENTAL_validators_ordered'].response,
  );
}

// block type tests
{
  type Req = ApiRequest<'block'>;
  type Res = ApiResponse<'block'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'block'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['block'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['block'].response);
}

// broadcast_tx_async type tests
{
  type Req = ApiRequest<'broadcast_tx_async'>;
  type Res = ApiResponse<'broadcast_tx_async'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'broadcast_tx_async'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['broadcast_tx_async'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['broadcast_tx_async'].response);
}

// broadcast_tx_commit type tests
{
  type Req = ApiRequest<'broadcast_tx_commit'>;
  type Res = ApiResponse<'broadcast_tx_commit'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'broadcast_tx_commit'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['broadcast_tx_commit'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['broadcast_tx_commit'].response);
}

// changes type tests
{
  type Req = ApiRequest<'changes'>;
  type Res = ApiResponse<'changes'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'changes'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['changes'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['changes'].response);
}

// chunk type tests
{
  type Req = ApiRequest<'chunk'>;
  type Res = ApiResponse<'chunk'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'chunk'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['chunk'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['chunk'].response);
}

// client_config type tests
{
  type Req = ApiRequest<'client_config'>;
  type Res = ApiResponse<'client_config'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'client_config'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['client_config'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['client_config'].response);
}

// gas_price type tests
{
  type Req = ApiRequest<'gas_price'>;
  type Res = ApiResponse<'gas_price'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'gas_price'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['gas_price'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['gas_price'].response);
}

// health type tests
{
  type Req = ApiRequest<'health'>;
  type Res = ApiResponse<'health'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'health'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['health'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['health'].response);
}

// light_client_proof type tests
{
  type Req = ApiRequest<'light_client_proof'>;
  type Res = ApiResponse<'light_client_proof'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'light_client_proof'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['light_client_proof'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['light_client_proof'].response);
}

// network_info type tests
{
  type Req = ApiRequest<'network_info'>;
  type Res = ApiResponse<'network_info'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'network_info'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['network_info'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['network_info'].response);
}

// next_light_client_block type tests
{
  type Req = ApiRequest<'next_light_client_block'>;
  type Res = ApiResponse<'next_light_client_block'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'next_light_client_block'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(
    methodSchemas['next_light_client_block'].request,
  );
  expectAssignable<z.ZodSchema>(
    methodSchemas['next_light_client_block'].response,
  );
}

// query type tests
{
  type Req = ApiRequest<'query'>;
  type Res = ApiResponse<'query'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'query'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['query'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['query'].response);
}

// send_tx type tests
{
  type Req = ApiRequest<'send_tx'>;
  type Res = ApiResponse<'send_tx'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'send_tx'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['send_tx'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['send_tx'].response);
}

// status type tests
{
  type Req = ApiRequest<'status'>;
  type Res = ApiResponse<'status'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'status'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['status'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['status'].response);
}

// tx type tests
{
  type Req = ApiRequest<'tx'>;
  type Res = ApiResponse<'tx'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'tx'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['tx'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['tx'].response);
}

// validators type tests
{
  type Req = ApiRequest<'validators'>;
  type Res = ApiResponse<'validators'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'validators'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['validators'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['validators'].response);
}

// Test MethodMap structure for each method
expectType<{
  request: ApiRequest<'EXPERIMENTAL_changes'>;
  response: ApiResponse<'EXPERIMENTAL_changes'>;
}>(({} as MethodMap)['EXPERIMENTAL_changes']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_changes_in_block'>;
  response: ApiResponse<'EXPERIMENTAL_changes_in_block'>;
}>(({} as MethodMap)['EXPERIMENTAL_changes_in_block']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_congestion_level'>;
  response: ApiResponse<'EXPERIMENTAL_congestion_level'>;
}>(({} as MethodMap)['EXPERIMENTAL_congestion_level']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_genesis_config'>;
  response: ApiResponse<'EXPERIMENTAL_genesis_config'>;
}>(({} as MethodMap)['EXPERIMENTAL_genesis_config']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_light_client_block_proof'>;
  response: ApiResponse<'EXPERIMENTAL_light_client_block_proof'>;
}>(({} as MethodMap)['EXPERIMENTAL_light_client_block_proof']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_light_client_proof'>;
  response: ApiResponse<'EXPERIMENTAL_light_client_proof'>;
}>(({} as MethodMap)['EXPERIMENTAL_light_client_proof']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_maintenance_windows'>;
  response: ApiResponse<'EXPERIMENTAL_maintenance_windows'>;
}>(({} as MethodMap)['EXPERIMENTAL_maintenance_windows']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_protocol_config'>;
  response: ApiResponse<'EXPERIMENTAL_protocol_config'>;
}>(({} as MethodMap)['EXPERIMENTAL_protocol_config']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_receipt'>;
  response: ApiResponse<'EXPERIMENTAL_receipt'>;
}>(({} as MethodMap)['EXPERIMENTAL_receipt']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_split_storage_info'>;
  response: ApiResponse<'EXPERIMENTAL_split_storage_info'>;
}>(({} as MethodMap)['EXPERIMENTAL_split_storage_info']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_tx_status'>;
  response: ApiResponse<'EXPERIMENTAL_tx_status'>;
}>(({} as MethodMap)['EXPERIMENTAL_tx_status']);
expectType<{
  request: ApiRequest<'EXPERIMENTAL_validators_ordered'>;
  response: ApiResponse<'EXPERIMENTAL_validators_ordered'>;
}>(({} as MethodMap)['EXPERIMENTAL_validators_ordered']);
expectType<{
  request: ApiRequest<'block'>;
  response: ApiResponse<'block'>;
}>(({} as MethodMap)['block']);
expectType<{
  request: ApiRequest<'broadcast_tx_async'>;
  response: ApiResponse<'broadcast_tx_async'>;
}>(({} as MethodMap)['broadcast_tx_async']);
expectType<{
  request: ApiRequest<'broadcast_tx_commit'>;
  response: ApiResponse<'broadcast_tx_commit'>;
}>(({} as MethodMap)['broadcast_tx_commit']);
expectType<{
  request: ApiRequest<'changes'>;
  response: ApiResponse<'changes'>;
}>(({} as MethodMap)['changes']);
expectType<{
  request: ApiRequest<'chunk'>;
  response: ApiResponse<'chunk'>;
}>(({} as MethodMap)['chunk']);
expectType<{
  request: ApiRequest<'client_config'>;
  response: ApiResponse<'client_config'>;
}>(({} as MethodMap)['client_config']);
expectType<{
  request: ApiRequest<'gas_price'>;
  response: ApiResponse<'gas_price'>;
}>(({} as MethodMap)['gas_price']);
expectType<{
  request: ApiRequest<'health'>;
  response: ApiResponse<'health'>;
}>(({} as MethodMap)['health']);
expectType<{
  request: ApiRequest<'light_client_proof'>;
  response: ApiResponse<'light_client_proof'>;
}>(({} as MethodMap)['light_client_proof']);
expectType<{
  request: ApiRequest<'network_info'>;
  response: ApiResponse<'network_info'>;
}>(({} as MethodMap)['network_info']);
expectType<{
  request: ApiRequest<'next_light_client_block'>;
  response: ApiResponse<'next_light_client_block'>;
}>(({} as MethodMap)['next_light_client_block']);
expectType<{
  request: ApiRequest<'query'>;
  response: ApiResponse<'query'>;
}>(({} as MethodMap)['query']);
expectType<{
  request: ApiRequest<'send_tx'>;
  response: ApiResponse<'send_tx'>;
}>(({} as MethodMap)['send_tx']);
expectType<{
  request: ApiRequest<'status'>;
  response: ApiResponse<'status'>;
}>(({} as MethodMap)['status']);
expectType<{
  request: ApiRequest<'tx'>;
  response: ApiResponse<'tx'>;
}>(({} as MethodMap)['tx']);
expectType<{
  request: ApiRequest<'validators'>;
  response: ApiResponse<'validators'>;
}>(({} as MethodMap)['validators']);

// Compile-time verification that methods extend RpcMethod
export type EXPERIMENTAL_changes_extends_RpcMethod =
  'EXPERIMENTAL_changes' extends RpcMethod ? true : never;
export type EXPERIMENTAL_changes_in_block_extends_RpcMethod =
  'EXPERIMENTAL_changes_in_block' extends RpcMethod ? true : never;
export type EXPERIMENTAL_congestion_level_extends_RpcMethod =
  'EXPERIMENTAL_congestion_level' extends RpcMethod ? true : never;
export type EXPERIMENTAL_genesis_config_extends_RpcMethod =
  'EXPERIMENTAL_genesis_config' extends RpcMethod ? true : never;
export type EXPERIMENTAL_light_client_block_proof_extends_RpcMethod =
  'EXPERIMENTAL_light_client_block_proof' extends RpcMethod ? true : never;
export type EXPERIMENTAL_light_client_proof_extends_RpcMethod =
  'EXPERIMENTAL_light_client_proof' extends RpcMethod ? true : never;
export type EXPERIMENTAL_maintenance_windows_extends_RpcMethod =
  'EXPERIMENTAL_maintenance_windows' extends RpcMethod ? true : never;
export type EXPERIMENTAL_protocol_config_extends_RpcMethod =
  'EXPERIMENTAL_protocol_config' extends RpcMethod ? true : never;
export type EXPERIMENTAL_receipt_extends_RpcMethod =
  'EXPERIMENTAL_receipt' extends RpcMethod ? true : never;
export type EXPERIMENTAL_split_storage_info_extends_RpcMethod =
  'EXPERIMENTAL_split_storage_info' extends RpcMethod ? true : never;
export type EXPERIMENTAL_tx_status_extends_RpcMethod =
  'EXPERIMENTAL_tx_status' extends RpcMethod ? true : never;
export type EXPERIMENTAL_validators_ordered_extends_RpcMethod =
  'EXPERIMENTAL_validators_ordered' extends RpcMethod ? true : never;
export type block_extends_RpcMethod = 'block' extends RpcMethod ? true : never;
export type broadcast_tx_async_extends_RpcMethod =
  'broadcast_tx_async' extends RpcMethod ? true : never;
export type broadcast_tx_commit_extends_RpcMethod =
  'broadcast_tx_commit' extends RpcMethod ? true : never;
export type changes_extends_RpcMethod = 'changes' extends RpcMethod
  ? true
  : never;
export type chunk_extends_RpcMethod = 'chunk' extends RpcMethod ? true : never;
export type client_config_extends_RpcMethod = 'client_config' extends RpcMethod
  ? true
  : never;
export type gas_price_extends_RpcMethod = 'gas_price' extends RpcMethod
  ? true
  : never;
export type health_extends_RpcMethod = 'health' extends RpcMethod
  ? true
  : never;
export type light_client_proof_extends_RpcMethod =
  'light_client_proof' extends RpcMethod ? true : never;
export type network_info_extends_RpcMethod = 'network_info' extends RpcMethod
  ? true
  : never;
export type next_light_client_block_extends_RpcMethod =
  'next_light_client_block' extends RpcMethod ? true : never;
export type query_extends_RpcMethod = 'query' extends RpcMethod ? true : never;
export type send_tx_extends_RpcMethod = 'send_tx' extends RpcMethod
  ? true
  : never;
export type status_extends_RpcMethod = 'status' extends RpcMethod
  ? true
  : never;
export type tx_extends_RpcMethod = 'tx' extends RpcMethod ? true : never;
export type validators_extends_RpcMethod = 'validators' extends RpcMethod
  ? true
  : never;

// Test generic method handling
{
  function handleMethod<M extends RpcMethod>(
    _method: M,
  ): {
    request: ApiRequest<M>;
    response: ApiResponse<M>;
  } {
    return {} as any;
  }

  // Test with sample methods
  expectType<ApiRequest<'EXPERIMENTAL_changes'>>(
    handleMethod('EXPERIMENTAL_changes').request,
  );
  expectType<ApiResponse<'EXPERIMENTAL_changes'>>(
    handleMethod('EXPERIMENTAL_changes').response,
  );
  expectType<ApiRequest<'EXPERIMENTAL_changes_in_block'>>(
    handleMethod('EXPERIMENTAL_changes_in_block').request,
  );
  expectType<ApiResponse<'EXPERIMENTAL_changes_in_block'>>(
    handleMethod('EXPERIMENTAL_changes_in_block').response,
  );
  expectType<ApiRequest<'EXPERIMENTAL_congestion_level'>>(
    handleMethod('EXPERIMENTAL_congestion_level').request,
  );
  expectType<ApiResponse<'EXPERIMENTAL_congestion_level'>>(
    handleMethod('EXPERIMENTAL_congestion_level').response,
  );
  expectType<ApiRequest<'EXPERIMENTAL_genesis_config'>>(
    handleMethod('EXPERIMENTAL_genesis_config').request,
  );
  expectType<ApiResponse<'EXPERIMENTAL_genesis_config'>>(
    handleMethod('EXPERIMENTAL_genesis_config').response,
  );
  expectType<ApiRequest<'EXPERIMENTAL_light_client_block_proof'>>(
    handleMethod('EXPERIMENTAL_light_client_block_proof').request,
  );
  expectType<ApiResponse<'EXPERIMENTAL_light_client_block_proof'>>(
    handleMethod('EXPERIMENTAL_light_client_block_proof').response,
  );
}

// Verify that MethodMap keys match RpcMethod union
expectAssignable<RpcMethod>('' as keyof MethodMap);
expectAssignable<keyof MethodMap>('' as RpcMethod);
