import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_healthSchema,
  JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
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
    JsonRpcRequest_for_healthSchema,
    JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
    options,
  );
}
