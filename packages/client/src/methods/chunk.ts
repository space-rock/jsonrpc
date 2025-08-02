import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_chunkSchema,
  JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
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
    JsonRpcRequest_for_chunkSchema,
    JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
    options,
  );
}
