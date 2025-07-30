import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_tx_status,
  type JsonRpcResponse_for_RpcTransactionResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALTxStatus(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_tx_status['params'],
): Promise<JsonRpcResponse_for_RpcTransactionResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_tx_status',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  );
}
