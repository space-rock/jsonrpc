import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_send_tx,
  type JsonRpcResponse_for_RpcTransactionResponse_and_RpcError,
  JsonRpcRequest_for_send_txSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function sendTx(
  client: RpcClient,
  params: JsonRpcRequest_for_send_tx['params'],
): Promise<JsonRpcResponse_for_RpcTransactionResponse_and_RpcError> {
  return await client.call(
    'send_tx',
    params,
    JsonRpcRequest_for_send_txSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  );
}
