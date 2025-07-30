import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_broadcast_tx_commit,
  type JsonRpcResponse_for_RpcTransactionResponse_and_RpcError,
  JsonRpcRequest_for_broadcast_tx_commitSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function broadcastTxCommit(
  client: RpcClient,
  params: JsonRpcRequest_for_broadcast_tx_commit['params'],
): Promise<JsonRpcResponse_for_RpcTransactionResponse_and_RpcError> {
  return await client.call(
    'broadcast_tx_commit',
    params,
    JsonRpcRequest_for_broadcast_tx_commitSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  );
}
