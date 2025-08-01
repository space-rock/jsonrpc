import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
  JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function EXPERIMENTALReceipt(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_receipt'>,
): Promise<ApiResponse<'EXPERIMENTAL_receipt'>> {
  return client.call(
    'EXPERIMENTAL_receipt',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
    JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
  );
}
