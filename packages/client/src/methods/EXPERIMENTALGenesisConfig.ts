import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
  JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALGenesisConfig(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_genesis_config'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_genesis_config'>> {
  return client.call(
    'EXPERIMENTAL_genesis_config',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
    JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
    options,
  );
}
