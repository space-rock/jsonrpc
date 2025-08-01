import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_statusSchema,
  JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function status(
  client: RpcClient,
  params: ApiParams<'status'>,
): Promise<ApiResponse<'status'>> {
  return client.call(
    'status',
    params,
    JsonRpcRequest_for_statusSchema,
    JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
  );
}
