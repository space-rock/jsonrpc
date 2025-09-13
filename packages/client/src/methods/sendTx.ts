import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForSendTxSchema,
  JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function sendTx(
  client: RpcClient,
  params: ApiParams<'send_tx'>,
  options?: RequestOptions,
): Promise<ApiResponse<'send_tx'>> {
  return client.call(
    'send_tx',
    params,
    JsonRpcRequestForSendTxSchema,
    JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
    options,
  );
}
