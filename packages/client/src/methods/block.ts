import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForBlockSchema,
  JsonRpcResponseForRpcBlockResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function block(
  client: RpcClient,
  params: ApiParams<'block'>,
  options?: RequestOptions,
): Promise<ApiResponse<'block'>> {
  return client.call(
    'block',
    params,
    JsonRpcRequestForBlockSchema,
    JsonRpcResponseForRpcBlockResponseAndRpcErrorSchema,
    options,
  );
}
