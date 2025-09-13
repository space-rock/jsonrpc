import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForBlockEffectsSchema,
  JsonRpcResponseForRpcStateChangesInBlockByTypeResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function blockEffects(
  client: RpcClient,
  params: ApiParams<'block_effects'>,
  options?: RequestOptions,
): Promise<ApiResponse<'block_effects'>> {
  return client.call(
    'block_effects',
    params,
    JsonRpcRequestForBlockEffectsSchema,
    JsonRpcResponseForRpcStateChangesInBlockByTypeResponseAndRpcErrorSchema,
    options,
  );
}
