import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_genesis_configSchema,
  JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function genesisConfig(
  client: RpcClient,
  params: ApiParams<'genesis_config'>,
  options?: RequestOptions,
): Promise<ApiResponse<'genesis_config'>> {
  return client.call(
    'genesis_config',
    params,
    JsonRpcRequest_for_genesis_configSchema,
    JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
    options,
  );
}
