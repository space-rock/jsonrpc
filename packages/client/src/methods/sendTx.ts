import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_send_txSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function sendTx(
  client: RpcClient,
  params: ApiParams<'send_tx'>,
): Promise<ApiResponse<'send_tx'>> {
  return client.call(
    'send_tx',
    params,
    JsonRpcRequest_for_send_txSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  );
}
