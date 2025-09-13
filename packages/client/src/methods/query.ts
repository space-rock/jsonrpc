import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForQuerySchema,
  JsonRpcResponseForRpcQueryResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function query(
  client: RpcClient,
  params: ApiParams<'query'>,
  options?: RequestOptions,
): Promise<ApiResponse<'query'>> {
  return client.call(
    'query',
    params,
    JsonRpcRequestForQuerySchema,
    JsonRpcResponseForRpcQueryResponseAndRpcErrorSchema,
    options,
  );
}
