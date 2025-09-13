import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForBroadcastTxAsyncSchema,
  JsonRpcResponseForCryptoHashAndRpcErrorSchema,
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
    JsonRpcRequestForBroadcastTxAsyncSchema,
    JsonRpcResponseForCryptoHashAndRpcErrorSchema,
    options,
  );
}
