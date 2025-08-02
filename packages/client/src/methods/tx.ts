import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_txSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function tx(
  client: RpcClient,
  params: ApiParams<'tx'>,
  options?: RequestOptions,
): Promise<ApiResponse<'tx'>> {
  return client.call(
    'tx',
    params,
    JsonRpcRequest_for_txSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
    options,
  );
}
