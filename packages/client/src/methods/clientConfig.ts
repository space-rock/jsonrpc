import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForClientConfigSchema,
  JsonRpcResponseForRpcClientConfigResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function clientConfig(
  client: RpcClient,
  params: ApiParams<'client_config'>,
  options?: RequestOptions,
): Promise<ApiResponse<'client_config'>> {
  return client.call(
    'client_config',
    params,
    JsonRpcRequestForClientConfigSchema,
    JsonRpcResponseForRpcClientConfigResponseAndRpcErrorSchema,
    options,
  );
}
