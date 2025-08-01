import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function EXPERIMENTALTxStatus(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_tx_status'>,
): Promise<ApiResponse<'EXPERIMENTAL_tx_status'>> {
  return client.call(
    'EXPERIMENTAL_tx_status',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
    JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  );
}
