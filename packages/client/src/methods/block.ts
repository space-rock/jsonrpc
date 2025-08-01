import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_blockSchema,
  JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function block(
  client: RpcClient,
  params: ApiParams<'block'>,
): Promise<ApiResponse<'block'>> {
  return client.call(
    'block',
    params,
    JsonRpcRequest_for_blockSchema,
    JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
  );
}
