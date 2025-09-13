import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForBroadcastTxCommitSchema,
  JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
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
    JsonRpcRequestForBroadcastTxCommitSchema,
    JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
    options,
  );
}
