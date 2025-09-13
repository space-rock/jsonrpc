import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForHealthSchema,
  JsonRpcResponseForNullableRpcHealthResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function health(
  client: RpcClient,
  params: ApiParams<'health'>,
  options?: RequestOptions,
): Promise<ApiResponse<'health'>> {
  return client.call(
    'health',
    params,
    JsonRpcRequestForHealthSchema,
    JsonRpcResponseForNullableRpcHealthResponseAndRpcErrorSchema,
    options,
  );
}
