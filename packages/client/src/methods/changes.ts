import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForChangesSchema,
  JsonRpcResponseForRpcStateChangesInBlockResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function changes(
  client: RpcClient,
  params: ApiParams<'changes'>,
  options?: RequestOptions,
): Promise<ApiResponse<'changes'>> {
  return client.call(
    'changes',
    params,
    JsonRpcRequestForChangesSchema,
    JsonRpcResponseForRpcStateChangesInBlockResponseAndRpcErrorSchema,
    options,
  );
}
