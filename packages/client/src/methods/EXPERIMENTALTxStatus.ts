import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalTxStatusSchema,
  JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALTxStatus(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_tx_status'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_tx_status'>> {
  return client.call(
    'EXPERIMENTAL_tx_status',
    params,
    JsonRpcRequestForExperimentalTxStatusSchema,
    JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
    options,
  );
}
