import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_changesSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function changes(
  client: RpcClient,
  params: ApiParams<'changes'>,
): Promise<ApiResponse<'changes'>> {
  return client.call(
    'changes',
    params,
    JsonRpcRequest_for_changesSchema,
    JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  );
}
