import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_broadcast_tx_asyncSchema,
  JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function broadcastTxAsync(
  client: RpcClient,
  params: ApiParams<'broadcast_tx_async'>,
  options?: RequestOptions,
): Promise<ApiResponse<'broadcast_tx_async'>> {
  return client.call(
    'broadcast_tx_async',
    params,
    JsonRpcRequest_for_broadcast_tx_asyncSchema,
    JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
    options,
  );
}
