import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALChanges(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_changes'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_changes'>> {
  return client.call(
    'EXPERIMENTAL_changes',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
    JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
    options,
  );
}
