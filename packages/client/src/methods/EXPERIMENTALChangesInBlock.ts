import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALChangesInBlock(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_changes_in_block'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_changes_in_block'>> {
  return client.call(
    'EXPERIMENTAL_changes_in_block',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
    JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
    options,
  );
}
