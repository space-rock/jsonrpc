import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalReceiptSchema,
  JsonRpcResponseForRpcReceiptResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALReceipt(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_receipt'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_receipt'>> {
  return client.call(
    'EXPERIMENTAL_receipt',
    params,
    JsonRpcRequestForExperimentalReceiptSchema,
    JsonRpcResponseForRpcReceiptResponseAndRpcErrorSchema,
    options,
  );
}
