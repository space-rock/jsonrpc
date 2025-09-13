import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForTxSchema,
  JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function tx(
  client: RpcClient,
  params: ApiParams<'tx'>,
  options?: RequestOptions,
): Promise<ApiResponse<'tx'>> {
  return client.call(
    'tx',
    params,
    JsonRpcRequestForTxSchema,
    JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
    options,
  );
}
