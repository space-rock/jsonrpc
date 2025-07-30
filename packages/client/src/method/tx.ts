import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_tx,
  type JsonRpcResponse_for_RpcTransactionResponse_and_RpcError,
  JsonRpcRequest_for_txSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function tx(
  client: RpcClient,
  params: JsonRpcRequest_for_tx['params'],
): Promise<JsonRpcResponse_for_RpcTransactionResponse_and_RpcError> {
  return await client.call(
    'tx',
    params,
    JsonRpcRequest_for_txSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  );
}
