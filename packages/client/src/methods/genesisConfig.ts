import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForGenesisConfigSchema,
  JsonRpcResponseForGenesisConfigAndRpcErrorSchema,
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
    JsonRpcRequestForGenesisConfigSchema,
    JsonRpcResponseForGenesisConfigAndRpcErrorSchema,
    options,
  );
}
