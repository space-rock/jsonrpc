import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_broadcast_tx_async,
  type JsonRpcResponse_for_CryptoHash_and_RpcError,
  JsonRpcRequest_for_broadcast_tx_asyncSchema,
  JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function broadcastTxAsync(
  client: RpcClient,
  params: JsonRpcRequest_for_broadcast_tx_async['params'],
): Promise<JsonRpcResponse_for_CryptoHash_and_RpcError> {
  return await client.call(
    'broadcast_tx_async',
    params,
    JsonRpcRequest_for_broadcast_tx_asyncSchema,
    JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
  );
}
