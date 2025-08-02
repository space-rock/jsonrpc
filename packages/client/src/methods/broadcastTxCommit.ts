import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_broadcast_tx_commitSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function broadcastTxCommit(
  client: RpcClient,
  params: ApiParams<'broadcast_tx_commit'>,
  options?: RequestOptions,
): Promise<ApiResponse<'broadcast_tx_commit'>> {
  return client.call(
    'broadcast_tx_commit',
    params,
    JsonRpcRequest_for_broadcast_tx_commitSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
    options,
  );
}
