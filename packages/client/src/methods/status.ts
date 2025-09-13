import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForStatusSchema,
  JsonRpcResponseForRpcStatusResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function status(
  client: RpcClient,
  params: ApiParams<'status'>,
  options?: RequestOptions,
): Promise<ApiResponse<'status'>> {
  return client.call(
    'status',
    params,
    JsonRpcRequestForStatusSchema,
    JsonRpcResponseForRpcStatusResponseAndRpcErrorSchema,
    options,
  );
}
