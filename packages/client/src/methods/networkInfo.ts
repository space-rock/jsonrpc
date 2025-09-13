import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForNetworkInfoSchema,
  JsonRpcResponseForRpcNetworkInfoResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function networkInfo(
  client: RpcClient,
  params: ApiParams<'network_info'>,
  options?: RequestOptions,
): Promise<ApiResponse<'network_info'>> {
  return client.call(
    'network_info',
    params,
    JsonRpcRequestForNetworkInfoSchema,
    JsonRpcResponseForRpcNetworkInfoResponseAndRpcErrorSchema,
    options,
  );
}
