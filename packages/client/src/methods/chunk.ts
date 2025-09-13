import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForChunkSchema,
  JsonRpcResponseForRpcChunkResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function chunk(
  client: RpcClient,
  params: ApiParams<'chunk'>,
  options?: RequestOptions,
): Promise<ApiResponse<'chunk'>> {
  return client.call(
    'chunk',
    params,
    JsonRpcRequestForChunkSchema,
    JsonRpcResponseForRpcChunkResponseAndRpcErrorSchema,
    options,
  );
}
