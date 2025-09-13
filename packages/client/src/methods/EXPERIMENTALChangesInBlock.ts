import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalChangesInBlockSchema,
  JsonRpcResponseForRpcStateChangesInBlockByTypeResponseAndRpcErrorSchema,
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
    JsonRpcRequestForExperimentalChangesInBlockSchema,
    JsonRpcResponseForRpcStateChangesInBlockByTypeResponseAndRpcErrorSchema,
    options,
  );
}
